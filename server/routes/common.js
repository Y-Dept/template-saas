'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { resultData } = require('../common/utils');

router.get('/logout', function(req, res) {
  res.redirect('http://localhost:8080/dist/web');
});

router.get('/getCurrentUserInfo', function(req, res) {
  //res.type('json');
  res.send(`${req.query.callback}({
    "data":
      {
        "name": "李琳琳"
      },
    "message": "测试内容6h8s",
    "success": true
  })`);
});

module.exports = router;