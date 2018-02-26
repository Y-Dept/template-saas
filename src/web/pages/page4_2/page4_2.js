import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react';
import nj, { taggedTmpl as njs, registerComponent } from 'nornj';
import { registerTmpl } from 'nornj-react';
import 'flarej/lib/components/antd/radio';
import 'flarej/lib/components/antd/button';
import 'flarej/lib/components/antd/cascader';
import 'flarej/lib/components/antd/datepicker';
import 'flarej/lib/components/antd/checkbox';
import 'flarej/lib/components/antd/pagination';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/calendar';
import 'flarej/lib/components/ECharts/barChart';
import 'flarej/lib/components/ECharts/lineChart';
import 'flarej/lib/components/ECharts/pieChart';
import Message from 'flarej/lib/components/antd/message';
import Notification from 'flarej/lib/components/antd/notification';
import graphic from 'echarts/lib/util/graphic.js'
import { autobind } from 'core-decorators';
import '../../components/react-ueditor';
import styles from './page4_2.m.scss';
import tmpls from './page4_2.t.html';

//页面容器组件
@registerTmpl('page4_2')
@inject('store')
@observer
export default class page4_2 extends Component {
  uploadImage = e => {
    return new Promise((resolve, reject) => {
      const { store: { page4_2 } } = this.props;

      const formData = new FormData();
      formData.append('file', e.target.files[0]);    
      page4_2.uploadFile(formData).then(imgUrl => resolve(imgUrl));
    });
  }

  updateEditorContent = content => {
    const { store: { page4_2 } } = this.props;
    page4_2.setContent(content);
  }

  render() {
    const { store: { page4_2 } } = this.props;

    return tmpls.page4_2(this.props, this, {
      styles,
      page4_2,
      __JSPATH
    });
  }
}