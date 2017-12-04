import { types } from "mobx-state-tree";
import { fetchData } from 'vic-common/lib/common/fetchConfig';
import Notification from '../../utils/notification';
import { toJS } from 'mobx'

const BrandCompareItem = types.model("BrandCompareItem", {
  id:types.number,
  rank:types.number,
  brandLogo:types.string,
  brandName:types.string,
  salesAmount:types.number,
  uvGrowth:types.number,
  uvConversion:types.number,
  userGrowth:types.number,
  price:types.number,
  salesAmountGrowth:types.number,
  categoryGrowth:types.number,
  isChecked:types.optional(types.boolean, () => false),
  trendsData:types.array(types.union(types.array(types.number),types.array(types.string))),
  //销售额占比
  salesAmountRates:types.number,
  //用户数
  userCount:types.number,
  //用户数占比
  userCountRates:types.number,
  uv:types.number,
  uvRates:types.number
}, {
  setChecked(checked){
    this.isChecked = checked;
  }
});


const Summary = types.model("Summary", {
  gmv:0,
  gmvYOY:0,
  gmvMOM:0,
  uv:0,
  uvYOY:0,
  uvMOM:0,
  uvRates:0,
  uvRatesYOY:0,
  uvRatesMOM:0,
  userCount:0,
  userCountYOY:0,
  userCountMOM:0
}, {
  
});


const Page4_1Store = types.model("Page4_1Store", {
  /**
   * 顶部数据看版
   */
  summaryData:types.optional(Summary, () => {
    return {
      gmv:0,
      gmvYOY:0,
      gmvMOM:0,
      uv:0,
      uvYOY:0,
      uvMOM:0,
      uvRates:0,
      uvRatesYOY:0,
      uvRatesMOM:0,
      userCount:0,
      userCountYOY:0,
      userCountMOM:0
    }
  }),
  /**
   * 整体生意评估
   */
  // salesData:types.optional(types.array(types.array(types.number)), () => [[0],[0]]),
  // salesRatesData:types.optional(types.array(types.array(types.number)), () => [[0],[0]]),
  // growthDataUV:types.optional(types.array(types.array(types.number)), () => [[0],[0]]),
  // growthDataUVConvert:types.optional(types.array(types.array(types.number)), () => [[0],[0]]),
  // growthDataUser:types.optional(types.array(types.array(types.number)), () => [[0],[0]]),
  // growthDataPrice:types.optional(types.array(types.array(types.number)), () => [[0],[0]]),
  growthDataTable:types.optional(types.array(types.array(types.number)), () => [[0,0,0,0],[0,0,0,0]]),
  /**
   * 下级品类
   */
  // barSubCategoryData:types.optional(types.array(types.array(types.number)), () => [[0],[0]]),
  /**
   * 品牌生意对比
   */
  // brandCompareList:types.optional(types.array(BrandCompareItem), () => []),
  brandCompareListTotalCount:types.optional(types.number, ()=>0),
  // compareDockData:types.optional(types.array(types.reference(BrandCompareItem)), () => []),
  compareDockVisible:types.optional(types.boolean, () => false),
  showCompareTable:types.optional(types.boolean, ()=>false),
  showSubCategoryBlock:types.optional(types.boolean, ()=>true)
},
{
  salesData:null,
  salesRatesData:null,
  growthDataUV:null,
  growthDataUVConvert:null,
  growthDataUser:null,
  growthDataPrice:null,
  tableSubCategoryData:null,
  pieSubCategoryData:null,
  barSubCategoryData:null,
  compareDockData:null,
  brandCompareList:null
},
 {
  getSummaryData(params){
    return fetchData(
      `${__HOST}/businessEval/getSummaryData`, 
      this.setSummaryData, 
      params, 
      { method: 'get' })
      .catch((ex) => {
        Notification.error({ description: '获取数据看版数据异常:' + ex, duration: null });
      });
  },
  setSummaryData(result){
    if (result.success) {
      const data = result.data;
      if(data){
        for(let key of Object.keys(data)){
          this.summaryData[key] = parseFloat((data[key] * 100).toFixed(2));
        }
        this.summaryData.gmv = data.gmv || 0,
        this.summaryData.gmvYOY = data.gmvYOY ? parseFloat((data.gmvYOY * 100).toFixed(2)) : 0;
        this.summaryData.gmvMOM = data.gmvMOM ? parseFloat((data.gmvMOM * 100).toFixed(2)) : 0;
        this.summaryData.uv = data.uv || 0;
        this.summaryData.uvYOY = data.uvYOY ? parseFloat((data.uvYOY * 100).toFixed(2)) : 0;
        this.summaryData.uvMOM = data.uvMOM ? parseFloat((data.uvMOM * 100).toFixed(2)) : 0;
        this.summaryData.uvRates = data.uvRates ? parseFloat((data.uvRates * 100).toFixed(2)) : 0;
        this.summaryData.uvRatesYOY = data.uvRatesYOY ? parseFloat((data.uvRatesYOY * 100).toFixed(2)) : 0;
        this.summaryData.uvRatesMOM = data.uvRatesMOM ? parseFloat((data.uvRatesMOM * 100).toFixed(2)) : 0;
        this.summaryData.userCount = data.userCount || 0;
        this.summaryData.userCountYOY = data.userCountYOY ? parseFloat((data.userCountYOY * 100).toFixed(2)) : 0;
        this.summaryData.userCountMOM = data.userCountMOM ? parseFloat((data.userCountMOM * 100).toFixed(2)) : 0;
      }else{
        this.summaryData = {
          gmv:0,
          gmvYOY:0,
          gmvMOM:0,
          uv:0,
          uvYOY:0,
          uvMOM:0,
          uvRates:0,
          uvRatesYOY:0,
          uvRatesMOM:0,
          userCount:0,
          userCountYOY:0,
          userCountMOM:0
        };
      }
      

      
    } else {
      Notification.error({ description: '获取数据看版数据异常:' + result.message, duration: null });
    }
  },
  getGrowthData(params){
    return fetchData(
      `${__HOST}/businessEval/growthData`, 
      this.setGrowthData,
      params, 
      { method: 'get' })
      .catch((ex) => {
        Notification.error({ description: '获取整体生意评估数据异常:' + ex, duration: null });
      });
  },
  setGrowthData(result){
    if (result.success) {
      const data = result.data;
      this.salesData = data.salesData;
      this.salesRatesData = data.salesRatesData;
      this.growthDataUV = data.growthDataUV;
      this.growthDataUVConvert = data.growthDataUVConvert;
      this.growthDataUser = data.growthDataUser;
      this.growthDataPrice = data.growthDataPrice;

      if(data.growthDataTable == null || data.growthDataTable.length == 0){
        this.growthDataTable = [[0,0,0,0],[0,0,0,0]];
      }else{
        if(data.growthDataTable[0].length == 0 && data.growthDataTable[1].length == 0){
          this.growthDataTable = [[0,0,0,0],[0,0,0,0]];
        }else{
          this.growthDataTable = data.growthDataTable;
        }
      }
      
    } else {
      Notification.error({ description: '获取整体生意评估数据异常:' + result.message, duration: null });
    }
  },
  getSubCategoryData(params){
    return fetchData(
      `${__HOST}/businessEval/getSubCategoryData`, 
      this.setSubCategoryData,
      params, 
      { method: 'get' })
      .catch((ex) => {
        Notification.error({ description: '获取下级品类数据异常:' + ex, duration: null });
      });
  },
  setSubCategoryData(result){
    if (result.success) {
      if(result.data){
        const data = result.data || [[],[],[]];
        this.pieSubCategoryData = [data[0], data[1], data[2]];
        this.setShowSubCategoryBlock(true);
      }else{
        this.setShowSubCategoryBlock(false);
      }
    } else {
      // Notification.error({ description: '获取下级品类数据异常:' + result.message, duration: null });
      this.setShowSubCategoryBlock(false);
    }
  },
  getBarSubCategoryData(params){
    return fetchData(
      `${__HOST}/businessEval/getBarSubCategoryData`, 
      this.setBarSubCategoryData,
      params, 
      { method: 'get' })
      .catch((ex) => {
        Notification.error({ description: '获取下级品类数据异常:' + ex, duration: null });
      });
  },
  setBarSubCategoryData(result){
    if (result.success) {
      if(result.data){
        const data = result.data || [[],[],[]];
        this.barSubCategoryData = [data[0], data[1], data[2]];
      }
    } else {
      Notification.error({ description: '获取下级品类数据异常:' + result.message, duration: null });
    }
  },
  getTableSubCategoryData(params){
    return fetchData(
      `${__HOST}/businessEval/getTableSubCategoryData`, 
      this.setTableSubCategoryData,
      params, 
      { method: 'get' })
      .catch((ex) => {
        Notification.error({ description: '获取下级品类数据异常:' + ex, duration: null });
      });
  },
  setTableSubCategoryData(result){
    if (result.success) {
      const data = result.data;
      this.tableSubCategoryData = data;
    } else {
      Notification.error({ description: '获取下级品类数据异常:' + result.message, duration: null });
    }
  },
  getBrandCompareList(params) {
    return fetchData(
      `${__HOST}/businessEval/getBrandCompareList`, 
      this.setBrandCompareList,
      params, 
      { method: 'get' })
      .catch((ex) => {
        Notification.error({ description: '获取品牌生意对比数据异常:' + ex, duration: null });
      });
  },
  setBrandCompareList(result) {
    if (result.success) {
      const data = result.data;
      this.brandCompareList = data.map(item=>{
        item.salesAmount = parseFloat((item.salesAmount/10000).toFixed(2));
        return item
      });
      this.brandCompareListTotalCount = result.total;
    } else {
      Notification.error({ description: '获取品牌生意对比数据错误:' + result.message, duration: null });
    }
  },
  setCompareDockData(item){
    if(this.compareDockData){
      this.compareDockData.push(item);
    }else{
      this.compareDockData = [item];
    }
  },
  removeCompareDockData(item){
    this.compareDockData && this.compareDockData.splice(this.compareDockData.findIndex((i) => i.id == item.id), 1);    
  },
  clearCompareDockData(){
    this.compareDockData  =  this.compareDockData && toJS(this.compareDockData).splice(0,1);
    this.brandCompareList = this.brandCompareList.map(item => {
      item.isChecked = false;
      return item;
    })
  },
  setCompareDockVisible(visible){
    this.compareDockVisible = visible;
  },
  setShowCompareTable(visible){
    this.showCompareTable = visible;
  },
  getBrandCompareItemForCategory(params) {
    return fetchData(
      `${__HOST}/businessEval/getBrandCompareItemForCategory`, 
      this.setBrandCompareItemForCategory,
      params, 
      { method: 'get' })
      .catch((ex) => {
        Notification.error({ description: '获取品牌生意对比数据异常:' + ex, duration: null });
      });
  },
  setBrandCompareItemForCategory(result) {
    if (result.success) {
      let data = result.data;
      if(this.compareDockData){
        this.compareDockData.splice(this.compareDockData.findIndex((i) => i.id == data.id), 1);
        data.salesAmount = null;
        data.salesAmountRates = null;
        data.userCount = null;
        data.userCountRates = null;
        data.uv = null;
        data.uvRates = null;
        this.compareDockData.splice(0,0,data);    
      }else{
        data.salesAmount = null;
        data.salesAmountRates = null;
        data.userCount = null;
        data.userCountRates = null;
        data.uv = null;
        data.uvRates = null;
        this.setCompareDockData(data);
      }
    } else {
      Notification.error({ description: '获取品牌生意对比数据错误:' + result.message, duration: null });
    }
  },
  setShowSubCategoryBlock(value){
    this.showSubCategoryBlock = value;
  },
  setChecked(checkedItem, checked){
    this.brandCompareList = this.brandCompareList.map((item, i)=>{
      if(checkedItem.id == item.id){
        item.isChecked = checked;
      }
      return item;
    });
  },
  afterCreate() {

  }
});

export default Page4_1Store;