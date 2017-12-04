import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import 'vic-common/lib/components/antd/radio';
import 'vic-common/lib/components/antd/button';
import 'vic-common/lib/components/antd/cascader';
import 'vic-common/lib/components/antd/datepicker';
import 'vic-common/lib/components/antd/checkbox';
import 'vic-common/lib/components/antd/pagination';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/calendar';
import 'vic-common/lib/components/ECharts/barChart';
import 'vic-common/lib/components/ECharts/lineChart';
import 'vic-common/lib/components/ECharts/pieChart';
import Message from 'vic-common/lib/components/antd/message';
import Notification from 'vic-common/lib/components/antd/notification';
import graphic from 'echarts/lib/util/graphic.js'
import { autobind } from 'core-decorators';
import styles from './page4_1.m.scss';
import tmpls from './page4_1.t.html';


//页面容器组件
@inject('store')
@observer
@registerTmpl('page4_1')
export default class page4_1 extends Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
    this.onSearch()
  }

  @autobind
  onSearch(){
    const closeLoading = Message.loading('正在获取数据...', 0)
    Promise.all([
      this.props.store.page4_1.getSummaryData(),
      this.props.store.page4_1.getGrowthData(),
      this.props.store.page4_1.getSubCategoryData(),
      this.props.store.page4_1.getBarSubCategoryData(),
      this.props.store.page4_1.getTableSubCategoryData(),
      this.props.store.page4_1.getBrandCompareList(),
      this.props.store.page4_1.getBrandCompareItemForCategory()
    ]).then(() => {
      this.props.store.page4_1.clearCompareDockData();
      closeLoading();
    });
  }

  render() {
    const { store: { page4_1 } } = this.props;
    return tmpls.page4_1(this.state, this.props, this, {
      styles,
      page4_1
    });
  }
}

@registerTmpl('evalSummary')
@inject('store')
@observer
class EvalSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
  }

  render() {
    const { store: { page4_1 } } = this.props;
    return tmpls.evalSummary(this.state, this.props, this, {
      styles,
      page4_1
    });
  }
}


@registerTmpl('totalCompare')
@inject('store')
@observer
class TotalCompare extends Component {

  @observable switchIndex = 'a';

  @observable showMode = '';

  componentDidMount() {
    this.showMode = this.props.store.common.userInfo.viewDataRole;
  }

  @computed get salesOptions(){
    return {
      grid: {
          left: '0',
          right: '4%',
          top:'15%',
          bottom:'3%',
          containLabel: true
      },
      legend:{
        show:true,
        right:0,
        top:0,
        data: this.showMode === null ? ['品牌商'] :['品牌商', '品类']
      },
      tooltip: {
          show: true,
          trigger: 'axis',
          formatter: (params) => {
              if(this.showMode === 'viewDataRoleLine') {
                params = params.slice(0,1);
              }
              var result = `<div>${params[0].name}</div>`;
              params.forEach(function (item) {
                result += `<div>
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span>
                                <span>${item.seriesName}:</span>
                                <span>${item.data || '--'}</span>
                            </div>`;
              });
              return result
          }
      },
      toolbox:{show:false},
      xAxis: {
          type: 'category',
          boundaryGap: true,
          splitLine:{
              show:true,
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLine:{
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLabel:{
              textStyle:{
                  color:'#333'
              }
          },
          data: toJS(this.props.store.page4_1.salesData && this.props.store.page4_1.salesData[2])
      },
      yAxis: {
          show:false,
          type: 'value',
          scale:true,
          splitLine:{
              show:true,
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLine:{
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLabel:{
              textStyle:{
                  color:'#333'
              }
          }
      }
    };
  }
  @computed get salesData(){
    const lineData = toJS(this.props.store.page4_1.salesData && this.props.store.page4_1.salesData[1].map(item=>(item/10000).toFixed(2)))
    return [
      {
        name: '品牌商',
        type:'bar',
        barWidth: '30px',
        data: toJS(this.props.store.page4_1.salesData && this.props.store.page4_1.salesData[0].map(item=>(item/10000).toFixed(2)))
      },
      {
        name:'品类',
        type:'line',
        data: this.showMode === null ? [] : lineData
      }
    ];
  };

  @computed get salesRatesOptions(){
    return {
      grid: {
          left: '3%',
          right: '4%',
          top:'15%',
          bottom:'5%',
          containLabel: true
      },
      legend:{
        show:true,
        right:0,
        top:0,
        data: this.showMode === null ? ['品牌商'] : ['品牌商', '品类']
      },
      tooltip: {
          show: true,
          trigger: 'axis',
          formatter:(params) => {
            if(this.showMode === 'viewDataRoleLine') {
              params = params.slice(0,1);
            }
            var result = `<div>${params[0].name}</div>`;
            params.forEach(function (item) {
                result += `<div>
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span>
                                <span>${item.seriesName}:</span>
                                <span>${item.data || '--'}%</span>
                            </div>`;
            });
            return result
          }
      },
      toolbox:{show:false},
      xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine:{
              show:true,
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLine:{
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLabel:{
              textStyle:{
                  color:'#333'
              }
          },
          data: toJS(this.props.store.page4_1.salesRatesData && this.props.store.page4_1.salesRatesData[2])
      },
      yAxis: {
          type: 'value',
          scale:true,
          splitLine:{
              show:true,
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLine:{
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLabel:{
              textStyle:{
                  color:'#333'
              },
              formatter:'{value}%'
          }
      }
    };
  };
  @computed get salesRatesData(){
    const lineData = toJS(this.props.store.page4_1.salesRatesData && this.props.store.page4_1.salesRatesData[1].map(item=>(item*100).toFixed(2)));
    return [
      {
        name: '品牌商',
        type: 'line',
        data: toJS(this.props.store.page4_1.salesRatesData && this.props.store.page4_1.salesRatesData[0].map(item=>(item*100).toFixed(2)))
      },
      {
        name:'品类',
        type:'line',
        data: this.showMode === null ? [] : lineData
      }
    ];
  };

  //增长驱动力趋势
  @computed get growthOptions(){
    let dataX = [], unit = '';
    switch (this.switchIndex) {
      case 'a':
        dataX = toJS(this.props.store.page4_1.growthDataUV && this.props.store.page4_1.growthDataUV[2]);
        unit = '%';
        break;
      case 'b':
        dataX = toJS(this.props.store.page4_1.growthDataUVConvert && this.props.store.page4_1.growthDataUVConvert[2]);
        unit = '%'
        break;
      case 'c':
        dataX = toJS(this.props.store.page4_1.growthDataUser && this.props.store.page4_1.growthDataUser[2]);
        unit = '%';
        break;
      case 'd':
        dataX = toJS(this.props.store.page4_1.growthDataPrice && this.props.store.page4_1.growthDataPrice[2]);
        unit = '';
        break;
    }
    return {
      grid: {
          left: '3%',
          right: '4%',
          top:'15%',
          bottom:'5%',
          containLabel: true
      },
      legend:{
        show:true,
        right:0,
        top:0,
        data: this.showMode === null ? ['品牌商'] : ['品牌商', '品类']
      },
      tooltip: {
          show: true,
          trigger: 'axis',
          formatter: (params) => {
            if(this.showMode === 'viewDataRoleLine') {
              params = params.slice(0,1);
            }
            var result = `<div>${params[0].name}</div>`;
            params.forEach(function (item) {
              result += `<div>
                            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span>
                            <span>${item.seriesName}:</span>
                            <span>${item.data || '--'}${unit}</span>
                        </div>`;
            });
            return result
          }
      },
      toolbox:{show:false},
      xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine:{
              show:true,
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLine:{
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLabel:{
              textStyle:{
                  color:'#333'
              }
          },
          data: dataX
      },
      yAxis: {
          type: 'value',
          scale:true,
          splitLine:{
              show:true,
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLine:{
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLabel:{
              textStyle:{
                  color:'#333'
              },
              formatter:`{value}${unit}`
          }
      }
    };
  };
  @computed get growthData(){
    let data1 = [], data2 = [];
    switch (this.switchIndex) {
      case 'a':
        data1 = toJS(this.props.store.page4_1.growthDataUV && this.props.store.page4_1.growthDataUV[0].map(item=>(item*100).toFixed(2)));
        data2 = toJS(this.props.store.page4_1.growthDataUV && this.props.store.page4_1.growthDataUV[1].map(item=>(item*100).toFixed(2)));
        break;
      case 'b':
        data1 = toJS(this.props.store.page4_1.growthDataUVConvert && this.props.store.page4_1.growthDataUVConvert[0].map(item=>(item*100).toFixed(2)));
        data2 = toJS(this.props.store.page4_1.growthDataUVConvert && this.props.store.page4_1.growthDataUVConvert[1].map(item=>(item*100).toFixed(2)));
        break;
      case 'c':
        data1 = toJS(this.props.store.page4_1.growthDataUser && this.props.store.page4_1.growthDataUser[0].map(item=>(item*100).toFixed(2)));
        data2 = toJS(this.props.store.page4_1.growthDataUser && this.props.store.page4_1.growthDataUser[1].map(item=>(item*100).toFixed(2)));
        break;
      case 'd':
        data1 = toJS(this.props.store.page4_1.growthDataPrice && this.props.store.page4_1.growthDataPrice[0].map(item=>(item).toFixed(2)));
        data2 = toJS(this.props.store.page4_1.growthDataPrice && this.props.store.page4_1.growthDataPrice[1].map(item=>(item).toFixed(2)));
        break;
    }
    return [
      {
        name: '品牌商',
        type:'line',
        data: data1
      },
      {
        name:'品类',
        type:'line',
        data: this.showMode === null ? [] : data2
      }
    ];
  };

  constructor(props) {
    super(props);
  }

  @autobind
  onGrowthTypeChange(e){
    this.switchIndex = e.target.value
  }

  render() {
    const { store: { page4_1, common } } = this.props;
    return tmpls.totalCompare(this.state, this.props, this, {
      styles,
      page4_1,
    });
  }
}


/**
 * 下级品类对比
 *
 * @class CategoryCompare
 * @extends {Component}
 */
@registerTmpl('categoryCompare')
@inject('store')
@observer
class CategoryCompare extends Component {

  @observable currentView = 1; // 1:'chart' | 2:'table'

  //下级品类对比
  @computed get pieCategoryOptions(){
    return {
      grid: {
          left: '3%',
          right: '3%',
          top:0,
          bottom:0,
          containLabel: true
      },
      tooltip : {
          trigger: 'item',
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
          formatter:function(params){
              var result = `<div>${params.name}</div>`;
              result += `<div>
                              <span>${params.seriesName}:</span>
                              <span>${params.seriesName == '品类'? '' : '('+params.data.value+')'} ${params.percent}%</span>
                          </div>`;
              return result
          }
      },
      toolbox:{show:false},
      legend: {
        left: 'center',
        data: toJS(this.props.store.page4_1.pieSubCategoryData && this.props.store.page4_1.pieSubCategoryData[2])
      }
    };
  };
  @computed get pieCategoryData(){

    let _data1 = [], _data2 = [];
    if(this.props.store.page4_1.pieSubCategoryData){
      this.props.store.page4_1.pieSubCategoryData[0].forEach((item, i)=>{
        _data1.push({
          value:(item/10000).toFixed(2),
          name:this.props.store.page4_1.pieSubCategoryData[2][i]
        });
      });
      this.props.store.page4_1.pieSubCategoryData[1].forEach((item, i)=>{
        _data2.push({
          value:(item/10000).toFixed(2),
          name:this.props.store.page4_1.pieSubCategoryData[2][i]
        });
      });
    }

    return [
      {
        name: '品类',
        radius : '40%',
        center: ['25%', '50%'],
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: true
            }
        },
        lableLine: {
            normal: {
                show: false
            },
            emphasis: {
                show: true
            }
        },
        data:_data1,
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
      },
      {
        name:'品牌商',
        type: 'pie',
        radius : '40%',
        center: ['75%', '50%'],
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: true
            }
        },
        lableLine: {
            normal: {
                show: false
            },
            emphasis: {
                show: true
            }
        },
        data:_data2,
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
      }
    ];
  };
  //销售额同比增长率对比
  @computed get barCategoryOptions(){
    return {
      grid: {
          left: '3%',
          right: '4%',
          top:'15%',
          bottom:'5%',
          containLabel: true
      },
      legend:{
        show:true,
        right:0,
        top:0,
        data: ['品牌商', '品类']
      },
      tooltip: {
          show: true,
          trigger: 'axis'
      },
      toolbox:{show:false},
      xAxis: {
          type: 'category',
          boundaryGap: true,
          splitLine:{
              show:true,
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLine:{
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLabel:{
              textStyle:{
                  color:'#333'
              },
              rotate:30,
              interval:0
          },
          data: toJS(this.props.store.page4_1.barSubCategoryData && this.props.store.page4_1.barSubCategoryData[2])
      },
      yAxis: {
          type: 'value',
          scale:true,
          splitLine:{
              show:true,
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLine:{
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLabel:{
              textStyle:{
                  color:'#333'
              },
              formatter:`{value}%`
          }
      },
      series: [
        {
            name:'品牌商',
            type:'bar',
            smooth: true,
            itemStyle:{
                normal:{
                    color:'#616dd3'
                }
            },
            lineStyle:{
                normal:{
                    color:'#616dd3'
                }
            },
            areaStyle:{
                normal:{
                    color: new graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: .5,
                        color: 'rgba(97, 109, 211, .3)'
                    }, {
                        offset: 1,
                        color: 'rgba(255, 255, 255, .2)'
                    }])
                }
            }
        }
      ]
    };
  };
  @computed get barCategoryData(){
    return [
      {
        name: '品牌商',
        type:'bar',
        data: toJS(this.props.store.page4_1.barSubCategoryData && this.props.store.page4_1.barSubCategoryData[0].map(item=>(item*100).toFixed(2)))
      },
      {
        name:'品类',
        type:'bar',
        data: toJS(this.props.store.page4_1.barSubCategoryData && this.props.store.page4_1.barSubCategoryData[1].map(item=>(item*100).toFixed(2)))
      }
    ];
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const closeLoading = Message.loading('正在获取数据...', 0);
    // Promise.all([
    //   this.props.store.page4_1.getSubCategoryData(),
    //   this.props.store.page4_1.getBarSubCategoryData(),
    //   this.props.store.page4_1.getTableSubCategoryData()
    // ]).then(() => {
    //   closeLoading();
    //   this.pieCategoryData[0].data = this.pieCategoryData[0].data.map((item, i) => {
    //     item.value = this.props.store.page4_1.pieSubCategoryData[0][i];
    //     return item;
    //   });
    //   this.pieCategoryData[1].data = this.pieCategoryData[1].data.map((item, i) => {
    //     item.value = this.props.store.page4_1.pieSubCategoryData[1][i];
    //     return item;
    //   });
    // });
  }

  @autobind
  switchView(index){
    return (e) => {
      this.currentView = index;
    };
  }

  render() {
    const { store: { page4_1, conditions, common } } = this.props;

    return tmpls.categoryCompare(this.state, this.props, this, {
      styles,
      page4_1,
      conditions,
      common
    });
  }
}

/**
 * 品牌生意对比
 *
 * @class BrandCompare
 * @extends {Component}
 */
@registerTmpl('brandCompare')
@inject('store')
@observer
class BrandCompare extends Component {

  @observable trendsChartVisible = false;
  @observable trendsChartDataX = [];
  @computed get trendsChartOptions(){
    return {
      grid: {
          left: '3%',
          right: '4%',
          top:'15%',
          bottom:'3%',
          containLabel: true
      },
      legend:{
        show:true,
        right:0,
        top:0,
        data: [this.showMode != null ? '品类增长率' : null, '品牌增长率', '销售额']
      },
      tooltip: {
          show: true,
          trigger: 'axis',
          formatter:(params) => {
              if(this.showMode === 'viewDataRoleLine') {
                params = params.slice(1);
              }
              var result = `<div>${params[0].name}</div>`;
              params.forEach((item) => {
                  result += `<div>
                                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span>
                                  <span>${item.seriesName}:</span>
                                  <span>${item.data || '--'}${item.seriesName=='销售额'?'':'%'}</span>
                              </div>`;
              });
              return result
          }
      },
      toolbox:{show:false},
      xAxis: {
          type: 'category',
          boundaryGap: true,
          splitLine:{
              show:true,
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLine:{
              lineStyle:{
                  color:'#e5e5e5'
              }
          },
          axisLabel:{
              textStyle:{
                  color:'#333'
              }
          },
          data: toJS(this.trendsChartDataX)
      },
      yAxis: [
        {
            type: 'value',
            scale:true,
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#e5e5e5'
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#e5e5e5'
                }
            },
            axisLabel:{
                textStyle:{
                    color:'#333'
                }
            }
        },
        {
            type: 'value',
            scale:true,
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#e5e5e5'
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#e5e5e5'
                }
            },
            axisLabel:{
                textStyle:{
                    color:'#333'
                }
            }
        }
      ],
      series: [
        {
          name: '品类增长率',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          itemStyle: {
            normal: {
              color: '#616dd3'
            }
          },
          lineStyle: {
            normal: {
              color: '#616dd3'
            }
          },
          areaStyle: {
            normal: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [{
                offset: .5,
                color: 'rgba(97, 109, 211, .3)'
              }, {
                offset: 1,
                color: 'rgba(255, 255, 255, .2)'
              }])
            }
          }
        },
        {
          name: '品牌增长率',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          itemStyle: {
            normal: {
              color: '#616dd3'
            }
          },
          lineStyle: {
            normal: {
              color: '#616dd3'
            }
          },
          areaStyle: {
            normal: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [{
                offset: .5,
                color: 'rgba(97, 109, 211, .3)'
              }, {
                offset: 1,
                color: 'rgba(255, 255, 255, .2)'
              }])
            }
          }
        },
        {
          name: '销售额',
          type: 'bar',
          barWidth: '60%'
        }
      ]
    };
  };
  @observable trendsChartData = [
    {
      name: '品类增长率',
      type:'line',
      data: [],
      yAxisIndex: 1
    },
    {
      name: '品牌增长率',
      type:'line',
      data: [],
      yAxisIndex: 1
    },
    {
      name:'销售额',
      type:'bar',
      barWidth:'50px',
      data:[]
    }
  ];
  @observable trendsChartTop = 1;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.showMode = this.props.store.common.userInfo.viewDataRole;
  }

  @autobind
  onBrandChecked(item){
    return (e) => {
      if(e.target.checked){
        this.props.store.page4_1.setCompareDockVisible(true);
        if(this.props.store.page4_1.compareDockData){
          if(this.props.store.page4_1.compareDockData.length + 1 < 5){
            this.props.store.page4_1.setChecked(item, true);
            this.props.store.page4_1.setCompareDockData(item);
          }else{
            e.target.checked = false;
            Notification.error({ description: '最多可以对比三个品牌', duration: 2 });
          }
        }else{
            this.props.store.page4_1.setChecked(item, true);
            this.props.store.page4_1.setCompareDockData(item);
        }
      }else{
        this.props.store.page4_1.setChecked(item, false);
        this.props.store.page4_1.removeCompareDockData(item);
      }
    }
  }

  @autobind
  viewTrends(item, index){
    return (e) => {
      this.trendsChartTop = index * 135 + index+1 + (15 * index)
      setTimeout(()=>{
        this.trendsChartVisible = true;
        this.trendsChartData[0].data = this.showMode === null ? [] : toJS(item.trendsData[0].map(item=>parseFloat((item*100).toFixed(2))));
        this.trendsChartData[1].data = toJS(item.trendsData[1].map(item=>parseFloat((item*100).toFixed(2))));
        this.trendsChartData[2].data = toJS(item.trendsData[2].map(item=>parseFloat((item/10000).toFixed(2))));
        this.trendsChartDataX = toJS(item.trendsData[3]);
      },300)
    }
  }

  @autobind
  closeTrendsChart(){
    this.trendsChartVisible = false
  }

  @autobind
  closeCompareTable(){
    this.props.store.page4_1.setShowCompareTable(false);
    this.props.store.page4_1.clearCompareDockData();
  }

  @autobind
  onPaging(page, pageSize){
    const closeLoading = Message.loading('正在获取数据...', 0)
    Promise.all([
      this.props.store.page4_1.getBrandCompareList()
    ]).then(() => {
      closeLoading();
    });
  }

  render() {
    const { store: { page4_1, common } } = this.props;

    return tmpls.brandCompare(this.state, this.props, this, {
      styles,
      page4_1,
      common
    });
  }
}


/**
 * compare dock
 *
 * @class EvalSummary
 * @extends {Component}
 */
@registerTmpl('compareDock')
@inject('store')
@observer
class CompareDock extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  @autobind
  deleteCompareItem(item){
    return (e) => {
      this.props.store.page4_1.removeCompareDockData(item);
      this.props.store.page4_1.setChecked(item, false);
    }
  }

  @autobind
  closeCompareDock(){
    this.props.store.page4_1.setCompareDockVisible(false);
  }

  @autobind
  compareIt(){
    this.props.store.page4_1.setShowCompareTable(true);
    this.props.store.page4_1.setCompareDockVisible(false);
  }

  render() {

    const { store: { page4_1, common } } = this.props;
    return tmpls.compareDock(this.state, this.props, this, {
      styles,
      page4_1,
      common
    });
  }
}
