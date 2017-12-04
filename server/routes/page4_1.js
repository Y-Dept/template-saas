'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { resultData } = require('../common/utils');

router.get('/getSummaryData', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    data: {
      gmv:_.random(0, 1000),
      gmvYOY:_.random(0, 1,true),
      gmvMOM:_.random(0, 1,true),
      uv:_.random(0,1000),
      uvYOY:_.random(0, 1,true),
      uvMOM:-_.random(0, 1,true),
      uvRates:_.random(0, 1,true),
      uvRatesYOY:_.random(0, 1,true),
      uvRatesMOM:-_.random(0, 1,true),
      userCount:123132123,
      userCountYOY:_.random(0, 1,true),
      userCountMOM:_.random(0, 1,true)
    }
  });

  res.send(ret);
});

router.get('/growthData', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    data: {
      salesData:[
        [20.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        [10, 52, 200, 334, 390, 330, 220],
        ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
      ],
      salesRatesData:[
        [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        [10, 52, 200, 334, 390, 330, 220],
        ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
      ],
      growthDataUV:[
        [20.6, 5.9, 9.0, 26.4, 208.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        [10, 52, 200, 334, 30, 330, 220],
        ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
      ],
      growthDataUVConvert:[
        [12.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 382.2, 48.7, 18.8, 6.0, 2.3],
        [10, 52, 200, 334, 390, 330, 220],
        ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
      ],
      growthDataUser:[
        [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        [100, 52, 200, 334, 390, 330, 220],
        ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
      ],
      growthDataPrice:[
        [2.6, 5.9, 90.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        [10, 52, 200, 334, 390, 330, 220],
        ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
      ],
      growthDataTable:[
        // [_.random(0, 1,true),-_.random(0, 1,true),12313.1231313,_.random(0, 1,true)],
        // [_.random(0, 1,true),-_.random(0, 1,true),12313.1231313,_.random(0, 1,true)]
        [1,2,3,4],[]
      ]
    }
  });

  res.send(ret);
});


router.get('/getSubCategoryData', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    data: [
      [_.random(1, 1000), 810, 13,234, 80],
      [_.random(1, 1000), 810, 13,234, 800],
      ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    ]
  });
  res.send(ret);
});

router.get('/getBarSubCategoryData', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    data: [
      [_.random(1, 1000), 810, 13,234, 80],
      [_.random(1, 1000), 810, 13,234, 800],
      ['1月月月', '2月月月', '3月月月', '4月月月', '5月月月', '6月月月', '7月月月', '8月月月', '9月月月', '10月月月']
    ]
  });

  res.send(ret);
});


router.get('/getTableSubCategoryData', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    data: [
      {
        rank:1,
        name:'洗发',
        salesAmount:_.random(1, 1000), 
        salesRates:_.random(1, 100), 
        salesGrowthRates:_.random(1, 100),
        uvGrowth: _.random(1, 100), 
        uvConvert:_.random(1, 100),
        price: _.random(1, 10000), 
        userGrowth:_.random(1, 100),
        salesRates1: _.random(1, 100),
        salesGrowthRates1: _.random(1, 100), 
        uvGrowth1:_.random(1, 100),
        uvConvert1:_.random(1, 100), 
        price1:_.random(1, 10000),
        userGrowth1: _.random(1, 100)
      },
      {
        rank:2,
        name:'护发',
        salesAmount:_.random(1, 1000), 
        salesRates:_.random(1, 100), 
        salesGrowthRates:_.random(1, 100),
        uvGrowth: _.random(1, 100), 
        uvConvert:_.random(1, 100),
        price: _.random(1, 10000), 
        userGrowth:_.random(1, 100),
        salesRates1: _.random(1, 100),
        salesGrowthRates1: _.random(1, 100), 
        uvGrowth1:_.random(1, 100),
        uvConvert1:_.random(1, 100), 
        price1:_.random(1, 10000),
        userGrowth1: _.random(1, 100)
      }
    ]
  });

  res.send(ret);
});

router.get('/getBrandCompareList', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    total:100,
    data: [
      {
          "id": 114, 
          "rank": 1, 
          "brandLogo":'//img30.360buyimg.com/popshop/jfs/t934/198/911579725/8999/a9779c6d/55598e22N474e1ab8.jpg',
          "brandName": "海飞丝", 
          "salesAmount": 32467855.72, 
          "uvGrowth": -0.38, 
          "uvConversion": 0.13, 
          "userGrowth": 0, 
          "price": 138.92, 
          "salesAmountGrowth": 0.36, 
          "categoryGrowth": 0.43, 
          "trendsData": [
              [
                  -0.11
              ], 
              [ 123], 
              [
                  32467855.72
              ], 
              [
                  "2017-06"
              ]
          ], 
          "salesAmountRates": 0, 
          "userCount": 0, 
          "userCountRates": 0, 
          "uv": 1781774, 
          "uvRates": 0.5
      },
        {
          "id": 115, 
          "rank": 2, 
          "brandLogo":'//img30.360buyimg.com/popshop/jfs/t934/198/911579725/8999/a9779c6d/55598e22N474e1ab8.jpg',
          "brandName": "海飞丝2", 
          "salesAmount": 32467855.72, 
          "uvGrowth": -0.38, 
          "uvConversion": 0.13, 
          "userGrowth": 0, 
          "price": 138.92, 
          "salesAmountGrowth": 0.36, 
          "categoryGrowth": 0.43, 
          "trendsData": [
              [
                  -0.11
              ], 
              [ 123], 
              [
                  32467855.72
              ], 
              [
                  "2017-06"
              ]
          ], 
          "salesAmountRates": 0, 
          "userCount": 0, 
          "userCountRates": 0, 
          "uv": 1781774, 
          "uvRates": 0.5
      },
        {
          "id": 116, 
          "rank": 3, 
          "brandLogo":'//img30.360buyimg.com/popshop/jfs/t934/198/911579725/8999/a9779c6d/55598e22N474e1ab8.jpg',
          "brandName": "海飞丝", 
          "salesAmount": 32467855.72, 
          "uvGrowth": -0.38, 
          "uvConversion": 0.13, 
          "userGrowth": 0, 
          "price": 138.92, 
          "salesAmountGrowth": 0.36, 
          "categoryGrowth": 0.43, 
          "trendsData": [
              [
                  -0.11
              ], 
              [ 123], 
              [
                  32467855.72
              ], 
              [
                  "2017-06"
              ]
          ], 
          "salesAmountRates": 0, 
          "userCount": 0, 
          "userCountRates": 0, 
          "uv": 1781774, 
          "uvRates": 0.5
      },
        {
          "id": 117, 
          "rank": 4, 
          "brandLogo":'//img30.360buyimg.com/popshop/jfs/t934/198/911579725/8999/a9779c6d/55598e22N474e1ab8.jpg',
          "brandName": "海飞丝", 
          "salesAmount": 32467855.72, 
          "uvGrowth": -0.38, 
          "uvConversion": 0.13, 
          "userGrowth": 0, 
          "price": 138.92, 
          "salesAmountGrowth": 0.36, 
          "categoryGrowth": 0.43, 
          "trendsData": [
              [
                  -0.11
              ], 
              [ 123], 
              [
                  32467855.72
              ], 
              [
                  "2017-06"
              ]
          ], 
          "salesAmountRates": 0, 
          "userCount": 0, 
          "userCountRates": 0, 
          "uv": 1781774, 
          "uvRates": 0.5
      },
        {
            "id": 114, 
            "rank": 5, 
            "brandLogo": "", 
            "brandName": "玉兰油", 
            "salesAmount": 32467855.72, 
            "uvGrowth": -0.38, 
            "uvConversion": 0.13, 
            "userGrowth": 0, 
            "price": 138.92, 
            "salesAmountGrowth": -0.11, 
            "categoryGrowth": 0.43, 
            "trendsData": [
                [
                    -0.11
                ], 
                [ 123], 
                [
                    32467855.72
                ], 
                [
                    "2017-06"
                ]
            ], 
            "salesAmountRates": 0.36, 
            "userCount": 0, 
            "userCountRates": 0, 
            "uv": 1781774, 
            "uvRates": 0.5
        }
    ]
  });

  res.send(ret);
});

router.get('/getBrandCompareItemForCategory', function(req, res) {
  res.type('json');
  let params = req.body,
    ret = {};

  Object.assign(ret, resultData, {
    "data":{"id":0,"rank":0,"brandLogo":"","brandName":"品类","salesAmount":1.5959233409E8,"uvGrowth":0.17,"uvConversion":0.22,"userGrowth":0.0,"price":100.51,"salesAmountGrowth":0.49,"categoryGrowth":0.0,"trendsData":[[]],"salesAmountRates":0.0,"userCount":0,"userCountRates":0.0,"uv":0,"uvRates":0.0}
  });

  res.send(ret);
});

module.exports = router;