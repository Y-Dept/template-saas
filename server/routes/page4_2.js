'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { resultData } = require('../common/utils');
const multer = require('multer');
const upload = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
}) });

router.post('/uploadFile', upload.single('file'), function(req, res) {
  res.type('html');
  let params = req.body,
    ret = {};

  console.log(req.file);
  Object.assign(ret, resultData, {
    data: 'http://localhost:8089/uploads/' + req.file.originalname
  });

  res.send(ret);
});

module.exports = router;