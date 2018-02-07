var express = require('express');
// 读取数据库信息
var cargoship = require('../data/cargoship.json')
var dbinfo = require('../data/DBInfo.json')
var emergency = require('../data/emergency.json')
var login_info = require('../data/LoginInfo.json')
var vercheck = require('../data/verCheck.json')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MSA Database version check' });
});

/* 向客户端响应Login数据库信息 */
router.get('/login-info', function (req, res) {
  res.send(login_info);
});

/* 向客户端响应cargoship数据库信息 */
router.get('/cargoship', function (req, res) {
  res.send(cargoship);
});

/* 向客户端响应emergency数据库信息 */
router.get('/emergency', function (req, res) {
  res.send(emergency);
});

/* 向客户端响应数据库信息 */
router.get('/db-info', function (req, res) {
  res.send(dbinfo);
});

/* 向客户端响应数据库版本信息 */
router.get('/ver', function (req, res) {
  res.send(vercheck);
});

module.exports = router;
