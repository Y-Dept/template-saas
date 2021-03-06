import { types } from "mobx-state-tree";
import { CommonStore } from "./commonStore";
import { HeaderStore, workbenchMenusUrl, systemMenusUrl, userTenantListUrl, switchTenantUrl } from 'saas-common';
import SiderStore from "./siderStore";
import Page0_1Store from "./pages/page0_1Store";
import Page1_1Store from "./pages/page1_1Store";
import Page1_2Store from "./pages/page1_2Store";
import Page4_1Store from "./pages/page4_1Store";
import Page4_2Store from "./pages/page4_2Store";
//{importStore}//

const RootStore = types.model("RootStore", {
  common: types.optional(CommonStore, {}),

  header: types.optional(HeaderStore, {
    current: 0,
    workbenchMenusUrl: `${__COMMONHOST}${workbenchMenusUrl}`,
    userTenantListUrl: `${__COMMONHOST}${userTenantListUrl}`,
    switchTenantUrl: `${__COMMONHOST}${switchTenantUrl}`
  }),

  sider: types.optional(SiderStore, {
    isOpen: false,
    current: 'Page1_1',
    systemMenusUrl: `${__COMMONHOST}${systemMenusUrl}`,
    menuData: [{
      type: 'group',
      index: 'Menu1_1',
      name: '控制台',
      expanded: false,
      children: [
        // {
        //   type: 'link-item',
        //   index: 'Page0_1',
        //   name: '总览',
        //   expanded: false,
        //   icon: 'appstore-o',
        //   link: '/Page0_1',
        //   children: []
        // }, {
        //   type: 'group',
        //   index: 'Menu2_2',
        //   name: '权限管理',
        //   expanded: false,
        //   icon: 'idcard',
        //   children: [
        //     { type: 'item', level: 3, link: '/Page1_1', index: 'Page1_1', name: '用户管理' },
        //     { type: 'item', level: 3, link: '/Page1_2', index: 'Page1_2', name: '群组管理' },
        //     { type: 'item', level: 3, link: '/Page1_3', index: 'Page1_3', name: '角色管理' },
        //     { type: 'item', level: 3, link: '/Page1_4', index: 'Page1_4', name: '组织管理' }
        //   ]
        // },
        // {
        //   type: 'link-item',
        //   index: 'Menu2_3',
        //   name: '用户中心',
        //   expanded: false,
        //   icon: 'user',
        //   link: '/Page2_1',
        //   children: []
        // },
        // {
        //   type: 'link-item',
        //   index: 'Menu2_4',
        //   name: '财务中心',
        //   expanded: false,
        //   icon: 'area-chart',
        //   link: '/Page3_1',
        //   children: []
        // },
        // {
        //   type: 'link-item',
        //   index: 'Page4_1',
        //   name: '客服管理',
        //   expanded: false,
        //   icon: 'phone',
        //   link: '/Page4_1',
        //   children: []
        // },
        // {
        //   type: 'link-item',
        //   index: 'Page4_2',
        //   name: '编辑器Demo',
        //   expanded: false,
        //   icon: 'phone',
        //   link: '/Page4_2',
        //   children: []
        // }
      ]
    }, {
      type: 'dropdown',
      index: 'Workbench',
      name: '工作台',
      expanded: false,
    }, {
      type: 'group',
      index: 'Menu1_2',
      name: '产品服务',
      expanded: false,
      children: [{
        type: 'group',
        index: 'Menu2_3',
        name: '二级菜单3',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/Page6_1', index: 'Page6_1', name: '页面6-1' },
          { type: 'item', level: 3, link: '/Page6_2', index: 'Page6_2', name: '页面6-2' },
        ]
      }, {
        type: 'group',
        index: 'Menu2_4',
        name: '二级菜单4',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/Page7_1', index: 'Page7_1', name: '页面7-1' },
          { type: 'item', level: 3, link: '/Page7_2', index: 'Page7_2', name: '页面7-2' },
        ]
      }]
    }]
  }),

  page0_1: types.optional(Page0_1Store, {}),
  page1_1: types.optional(Page1_1Store, {}),
  page1_2: types.optional(Page1_2Store, {}),
  page4_1: types.optional(Page4_1Store, {}),
  page4_2: types.optional(Page4_2Store, {}),
  //{pageStore}//
});

export default RootStore;