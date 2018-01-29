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
import styles from './page4_3.m.scss';
import tmpls from './page4_3.t.html';


//页面容器组件
@inject('store')
@observer
@registerTmpl('page4_3')
export default class page4_3 extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  @autobind
  handleChange(value){
    this.text = value;
  }

  render() {
    
    return tmpls.page4_3(this.state, this.props, this, {
      styles,
    });
  }
}
