import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import 'flarej/lib/components/antd/table';
import 'flarej/lib/components/antd/input';
import 'flarej/lib/components/antd/button';
import 'flarej/lib/components/antd/pagination';
import 'flarej/lib/components/antd/tabs';
import 'flarej/lib/components/antd/tree';
import 'flarej/lib/components/antd/checkbox';
import Breadcrumb from 'flarej/lib/components/antd/breadcrumb';
import Modal from 'flarej/lib/components/antd/modal';
import Tree from 'flarej/lib/components/antd/tree';
import Input from 'flarej/lib/components/antd/input';
import Message from 'flarej/lib/components/antd/message';
import Notification from '../../../utils/notification';
import styles from './page0_1.m.scss';
import tmpls from './page0_1.t.html';
// import 'template-saas-theme/theme/theme-jd-red.scss';

//页面容器组件
@registerTmpl('Page0_1')
@inject('store')
@observer
export default class Page0_1 extends Component {
  @observable detailModalVisible = false;
  @observable inputRole = '';
  @observable detailData = [];
  @observable selectedRowKeys = [];
  @observable selectedRows = [];

  componentDidMount() {
    const { store: { page0_1 } } = this.props;

    const closeLoading = Message.loading('正在获取数据...', 0);
    Promise.all([
      page0_1.getRoleManagementData(),
      page0_1.getRoleMenuTree().then(() => page0_1.initTree())
    ]).then(() => {
      closeLoading()
    });
  }

  @autobind
  onInputRole(e) {
    this.inputRole = e.target.value;
  }

  @autobind
  onSearch() {
    if (this.inputRole == '') {
      const closeLoading = Message.loading('正在获取数据...', 0);
      Promise.all([
        this.props.store.page0_1.getRoleManagementData(),
      ]).then(() => {
        closeLoading()
      });
    } else {
      const { store: { page0_1 } } = this.props;
      const searchRole = page0_1.tableDataO.filter(n => n.name.indexOf(this.inputRole.trim()) > -1)
      page0_1.setTableData(searchRole);
    }
  }

  @autobind
  onAddRole() {
    const { store: { page0_1 } } = this.props;
    page0_1.setAddModalVisible(true);
    page0_1.setDisable(true);
    page0_1.setActiveKey('tab1');
    page0_1.setAddInputRole('');
    page0_1.setAddInputDes('');
  }

  @autobind
  onDeleteRole() {
    const { store: { page0_1 } } = this.props;
    if (this.selectedRowKeys.length == 0) {
      Notification.error({ description: '请勾选要删除的角色！', duration: 3 });
    } else {
      Modal.confirm({
        title: '你确认要删除角色吗？',
        onOk: () => {
          const closeLoading = Message.loading('正在获取数据...', 0);
          const roleId = this.selectedRows.map((item) => item.roleId);

          Promise.all([
            page0_1.deleteRole({ roleId: roleId })
          ]).then(() => {
            page0_1.getRoleManagementData();
          }).then(() => {
            this.selectedRowKeys = [];
            closeLoading();
          });
        }
      });
    }
  }

  @computed get tableColumns() {
    return [{
      title: '序号',
      dataIndex: 'key',
    }, {
      title: '角色名称',
      dataIndex: 'name',
    }, {
      title: '角色描述',
      dataIndex: 'describe',
    }, {
      title: '创建时间',
      dataIndex: 'cTime',
    }, {
      title: '修改时间',
      dataIndex: 'mTime',
    }, {
      title: '操作',
      dataIndex: 'handler',
      render: (text, record, index) => nj `
        <span>
          <a href="javascript:;" onClick=${()=>this.onEdit(record, index)} className="btn-link">编辑</a>
          <a href="javascript:;" onClick=${()=>this.onDetail(record, index)} className="btn-link">用户明细</a>
        </span>
      ` (),
    }];
  }

  @autobind
  onEdit(record, index) {
    const { store: { page0_1 } } = this.props;
    page0_1.setEditModalVisible(true);
    page0_1.setSaveBtnDisabled(true);
    page0_1.setActiveKey('tab1');
    page0_1.setAddInputRole(record.name);
    page0_1.setAddInputDes(record.describe);
    page0_1.setRoleId(record.roleId);
    page0_1.setDisable(false);

    const closeLoading = Message.loading('正在获取数据...', 0);
    Promise.all([
      page0_1.getRoleMenuTree({ roleId: record.roleId }).then(() => page0_1.initTree()),
    ]).then(() => {
      closeLoading()
    });
  }

  @autobind
  onDetail(record, index) {
    const { store: { page0_1 } } = this.props;
    page0_1.setDetailModalVisible(true);
    page0_1.setDetailData(record.users);
  }

  getRowSelection() {
    return {
      selectedRowKeys: this.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
      }
    }
  }

  render() {
    const { store: { page0_1 } } = this.props;
    const { Item } = Breadcrumb;
    return tmpls.container(this.props, this, {
      styles,
      page0_1,
      tableData: toJS(page0_1.tableData),
      rowSelection: this.getRowSelection(),
      Item
    });
  }
}

@registerTmpl('ModalFormPage0_1')
@inject('store')
@observer
class ModalForm extends Component {
  @observable autoExpandParent = false;

  //获取树节点的展开形式
  getExpandedKeys(arr) {
    return arr.filter(n => n.level == 1 || n.level == 2).map(m => { return m.id.toString() });
  }

  getDefaultCheckedKeys() {
    let keys = [];
    this.props.store.page0_1.menuData.filter(n => n.level == 3)
      .forEach(item => {
        if (item.selected) {
          keys.push(item.id.toString());
        }
      });
    return keys;
  }

  //获取选中的 checkbox 包含父级未选中状态
  getAllCheckedKeys(key) {
    const _map = toJS(this.props.store.page0_1.authTreeDataMap);
    if (key.length > 1) {
      let pids = key.map(item => { return _map[item].pids })
      return Array.from(new Set([].concat(...pids)));
    } else {
      return _map[key].pids;
    }
  }

  @autobind
  onExpand(expandedKeys) {
    const { store: { page0_1 } } = this.props;
    page0_1.setExpandedKeys(expandedKeys);
    this.autoExpandParent = true;
  }

  @autobind
  onCheck(checkedKeys) {
    const { store: { page0_1 } } = this.props;
    page0_1.setSaveBtnDisabled(false);
    page0_1.setCheckedKeys(checkedKeys);

    if (checkedKeys.length == 0) {
      page0_1.setMenuIds([]);
    } else {
      let allChecked = Array.from(new Set(this.getAllCheckedKeys(checkedKeys).concat(checkedKeys)));
      page0_1.setMenuIds(allChecked);
    }
  }

  @autobind
  onAddModalCancel() {
    if (this.props.tabName == '增加角色') {
      this.props.store.page0_1.setAddModalVisible(false);
    }
    else {
      this.props.store.page0_1.setEditModalVisible(false);
    }
    this.props.store.page0_1.setSaveBtnDisabled(false);
  }

  @autobind
  onTabChange(key) {
    this.props.store.page0_1.setActiveKey(key);
  }

  @autobind
  onAddInputRoleChange(e) {
    this.props.store.page0_1.setAddInputRole(e.target.value);
  }

  @autobind
  onAddInputDesChange(e) {
    this.props.store.page0_1.setAddInputDes(e.target.value);
  }

  @autobind
  onAddSaveRole() {
    const { store: { page0_1 } } = this.props;

    if (page0_1.addInputRole.trim() == '') {
      Notification.error({ description: '请输入角色名称！', duration: 1 });
    } else {
      const closeLoading = Message.loading('正在获取数据...', 0);
      let params = {
        roleName: page0_1.addInputRole,
        roleDescribe: page0_1.addInputDes
      }
      if (this.props.tabName == '编辑角色' && page0_1.roleId != null) {
        params.roleId = page0_1.roleId;
      }

      Promise.all([
        page0_1.saveRole(params)
      ]).then(() => {
        page0_1.getRoleManagementData();
      }).then(() => {
        page0_1.setActiveKey('tab2');
        closeLoading();
      });
    }
  }

  @autobind
  onAddCancel() {
    const { store: { page0_1 } } = this.props;
    if (this.props.tabName == '增加角色') {
      page0_1.setAddModalVisible(false);
    } else {
      page0_1.setEditModalVisible(false);
    }
  }

  @autobind
  onSavePermission() {
    const { store: { page0_1 } } = this.props;

    if (this.props.tabName == '增加角色') {
      console.log(page0_1.menuIds);
      page0_1.saveRolePermission({
        roleId: page0_1.addRoleId,
        menuIds: page0_1.menuIds
      }).then(() => page0_1.setAddModalVisible(false));
    } else {
      page0_1.saveRolePermission({
        roleId: page0_1.roleId,
        menuIds: page0_1.menuIds
      }).then(() => page0_1.setEditModalVisible(false));
    }
  }

  disabledTreeNodes = ['权限管理', '角色管理'];

  render() {
    const { store: { page0_1 } } = this.props;
    const TreeNode = Tree.TreeNode;
    let level = 1;
    const loop = data => data.map((item) => {
      const disableCheckbox = this.disabledTreeNodes.indexOf(item.title) > -1 ? true : false;

      if (item.children) {
        const disabled = level == 1 ? true : item.children.filter(n => this.disabledTreeNodes.indexOf(n.title) > -1).length > 0
        level++;

        return nj `
          <${TreeNode} key=${item.key} title=${item.title} disableCheckbox=${disableCheckbox} disabled=${disabled}>
            ${loop(item.children)}
          </${TreeNode}>
        ` ();
      }
      return nj `<${TreeNode} key=${item.key} title=${item.title} disableCheckbox=${disableCheckbox} />` ();
    });

    return tmpls.modalForm({
      components: { 'ant-TextArea': Input.TextArea },
      styles,
      page0_1,
      loop,
      treeData: toJS(page0_1.authTreeData) || [],
    }, this.props, this);
  }
}

@registerTmpl('ModalDetailPage0_1')
@inject('store')
@observer
class ModalDetail extends Component {
  @autobind
  onDetailModalCancel() {
    const { store: { page0_1 } } = this.props;
    page0_1.setDetailModalVisible(false);
  }

  @computed get detailColumns() {
    return [{
      title: '序号',
      dataIndex: 'key',
    }, {
      title: '登录名',
      dataIndex: 'loginName',
    }, {
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '邮箱',
      dataIndex: 'email',
    }, {
      title: '部门',
      dataIndex: 'department',
    }, {
      title: '职务',
      dataIndex: 'duty',
    }, {
      title: '开通时间',
      dataIndex: 'oTime',
    }];
  }

  render() {
    const { store: { page0_1 } } = this.props;
    return tmpls.modalDetail(this.props, this, {
      styles,
      page0_1,
      getDetailRowKey: (record, index) => `${record.key}-${index}`
    });
  }
}