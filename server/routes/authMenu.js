'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/authManagement/menu/getSystemMenus', function(req, res) {
  //res.type('json');
  res.send(`${req.query.callback}({
    "data": [{
        "iconName": "appstore-o",
        "name": "总览",
        "urlId": "page0_1"
      },
      {
        "iconName": "idcard",
        "name": "权限管理",
        "subMenus": [{
            "iconName": "userManage",
            "name": "用户管理",
            "urlId": "page1_1"
          },
          {
            "iconName": "groupManage",
            "name": "群组管理",
            "urlId": "page1_2"
          },
          {
            "iconName": "roleManage",
            "name": "角色管理",
            "urlId": "page1_3"
          },
          {
            "iconName": "organizationManage",
            "name": "组织管理",
            "urlId": "page1_4"
          }
        ],
        "urlId": "authManage"
      },
      {
        "iconName": "area-chart",
        "name": "图表示例",
        "urlId": "page4_1"
      },
      {
        "iconName": "phone",
        "name": "编辑器示例",
        "urlId": "page4_2"
      }
    ],
    "message": "测试内容eik2",
    "success": true
  })`);
});

module.exports = router;