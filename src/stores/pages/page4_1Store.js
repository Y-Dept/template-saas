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
    self.isChecked = checked;
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
})
.volatile(self => ({
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
}))
.actions(self => {
  return {
    getSummaryData(){
      return fetchData(
        `${__HOST}/page4_1/getSummaryData`, 
        self.setSummaryData, 
        null, 
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
            self.summaryData[key] = parseFloat((data[key] * 100).toFixed(2));
          }
          self.summaryData.gmv = data.gmv || 0,
          self.summaryData.gmvYOY = data.gmvYOY ? parseFloat((data.gmvYOY * 100).toFixed(2)) : 0;
          self.summaryData.gmvMOM = data.gmvMOM ? parseFloat((data.gmvMOM * 100).toFixed(2)) : 0;
          self.summaryData.uv = data.uv || 0;
          self.summaryData.uvYOY = data.uvYOY ? parseFloat((data.uvYOY * 100).toFixed(2)) : 0;
          self.summaryData.uvMOM = data.uvMOM ? parseFloat((data.uvMOM * 100).toFixed(2)) : 0;
          self.summaryData.uvRates = data.uvRates ? parseFloat((data.uvRates * 100).toFixed(2)) : 0;
          self.summaryData.uvRatesYOY = data.uvRatesYOY ? parseFloat((data.uvRatesYOY * 100).toFixed(2)) : 0;
          self.summaryData.uvRatesMOM = data.uvRatesMOM ? parseFloat((data.uvRatesMOM * 100).toFixed(2)) : 0;
          self.summaryData.userCount = data.userCount || 0;
          self.summaryData.userCountYOY = data.userCountYOY ? parseFloat((data.userCountYOY * 100).toFixed(2)) : 0;
          self.summaryData.userCountMOM = data.userCountMOM ? parseFloat((data.userCountMOM * 100).toFixed(2)) : 0;
        }else{
          self.summaryData = {
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
        `${__HOST}/page4_1/growthData`, 
        self.setGrowthData,
        params, 
        { method: 'get' })
        .catch((ex) => {
          Notification.error({ description: '获取整体生意评估数据异常:' + ex, duration: null });
        });
    },
    setGrowthData(result){
      if (result.success) {
        const data = result.data;
        self.salesData = data.salesData;
        self.salesRatesData = data.salesRatesData;
        self.growthDataUV = data.growthDataUV;
        self.growthDataUVConvert = data.growthDataUVConvert;
        self.growthDataUser = data.growthDataUser;
        self.growthDataPrice = data.growthDataPrice;
  
        if(data.growthDataTable == null || data.growthDataTable.length == 0){
          self.growthDataTable = [[0,0,0,0],[0,0,0,0]];
        }else{
          if(data.growthDataTable[0].length == 0 && data.growthDataTable[1].length == 0){
            self.growthDataTable = [[0,0,0,0],[0,0,0,0]];
          }else{
            self.growthDataTable = data.growthDataTable;
          }
        }
        
      } else {
        Notification.error({ description: '获取整体生意评估数据异常:' + result.message, duration: null });
      }
    },
    getSubCategoryData(params){
      return fetchData(
        `${__HOST}/page4_1/getSubCategoryData`, 
        self.setSubCategoryData,
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
          self.pieSubCategoryData = [data[0], data[1], data[2]];
          self.setShowSubCategoryBlock(true);
        }else{
          self.setShowSubCategoryBlock(false);
        }
      } else {
        // Notification.error({ description: '获取下级品类数据异常:' + result.message, duration: null });
        self.setShowSubCategoryBlock(false);
      }
    },
    getBarSubCategoryData(params){
      return fetchData(
        `${__HOST}/page4_1/getBarSubCategoryData`, 
        self.setBarSubCategoryData,
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
          self.barSubCategoryData = [data[0], data[1], data[2]];
        }
      } else {
        Notification.error({ description: '获取下级品类数据异常:' + result.message, duration: null });
      }
    },
    getTableSubCategoryData(params){
      return fetchData(
        `${__HOST}/page4_1/getTableSubCategoryData`, 
        self.setTableSubCategoryData,
        params, 
        { method: 'get' })
        .catch((ex) => {
          Notification.error({ description: '获取下级品类数据异常:' + ex, duration: null });
        });
    },
    setTableSubCategoryData(result){
      if (result.success) {
        const data = result.data;
        self.tableSubCategoryData = data;
      } else {
        Notification.error({ description: '获取下级品类数据异常:' + result.message, duration: null });
      }
    },
    getBrandCompareList(params) {
      return fetchData(
        `${__HOST}/page4_1/getBrandCompareList`, 
        self.setBrandCompareList,
        params, 
        { method: 'get' })
        .catch((ex) => {
          Notification.error({ description: '获取品牌生意对比数据异常:' + ex, duration: null });
        });
    },
    setBrandCompareList(result) {
      if (result.success) {
        const data = result.data;
        self.brandCompareList = data.map(item=>{
          item.salesAmount = parseFloat((item.salesAmount/10000).toFixed(2));
          return item
        });
        self.brandCompareListTotalCount = result.total;
      } else {
        Notification.error({ description: '获取品牌生意对比数据错误:' + result.message, duration: null });
      }
    },
    setCompareDockData(item){
      if(self.compareDockData){
        self.compareDockData.push(item);
      }else{
        self.compareDockData = [item];
      }
    },
    removeCompareDockData(item){
      self.compareDockData && self.compareDockData.splice(self.compareDockData.findIndex((i) => i.id == item.id), 1);    
    },
    clearCompareDockData(){
      self.compareDockData  =  self.compareDockData && toJS(self.compareDockData).splice(0,1);
      self.brandCompareList = self.brandCompareList.map(item => {
        item.isChecked = false;
        return item;
      })
    },
    setCompareDockVisible(visible){
      self.compareDockVisible = visible;
    },
    setShowCompareTable(visible){
      self.showCompareTable = visible;
    },
    getBrandCompareItemForCategory(params) {
      return fetchData(
        `${__HOST}/page4_1/getBrandCompareItemForCategory`, 
        self.setBrandCompareItemForCategory,
        params, 
        { method: 'get' })
        .catch((ex) => {
          Notification.error({ description: '获取品牌生意对比数据异常:' + ex, duration: null });
        });
    },
    setBrandCompareItemForCategory(result) {
      if (result.success) {
        let data = result.data;
        if(self.compareDockData){
          self.compareDockData.splice(self.compareDockData.findIndex((i) => i.id == data.id), 1);
          data.salesAmount = null;
          data.salesAmountRates = null;
          data.userCount = null;
          data.userCountRates = null;
          data.uv = null;
          data.uvRates = null;
          self.compareDockData.splice(0,0,data);    
        }else{
          data.salesAmount = null;
          data.salesAmountRates = null;
          data.userCount = null;
          data.userCountRates = null;
          data.uv = null;
          data.uvRates = null;
          self.setCompareDockData(data);
        }
      } else {
        Notification.error({ description: '获取品牌生意对比数据错误:' + result.message, duration: null });
      }
    },
    setShowSubCategoryBlock(value){
      self.showSubCategoryBlock = value;
    },
    setChecked(checkedItem, checked){
      self.brandCompareList = self.brandCompareList.map((item, i)=>{
        if(checkedItem.id == item.id){
          item.isChecked = checked;
        }
        return item;
      });
    }
  }
})

export default Page4_1Store;