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
import styles from './page4_2.m.scss';
import tmpls from './page4_2.t.html';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

registerComponent({'reactQuill': ReactQuill});


//页面容器组件
@inject('store')
@observer
@registerTmpl('page4_2')
export default class page4_2 extends Component {

  @observable text;
  @observable modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  @observable formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

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
    const renderHTML = (html) => React.createElement("div", { dangerouslySetInnerHTML: { __html: html } });

    return tmpls.page4_2(this.state, this.props, this, {
      styles,
      convertedText: renderHTML(this.text)
    });
  }
}
