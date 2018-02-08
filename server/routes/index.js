var express = require("express");
// 读取数据库信息
// var cargoship = require("../data/cargoship.json");
// var dbinfo = require("../data/DBInfo.json");
// var emergency = require("../data/emergency.json");
// var login_info = require("../data/LoginInfo.json");
var vercheck = require("../data/verCheck.json");
var router = express.Router();
// 数据库模型
var dbutil = require("./db.js");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "MSA Database version check" });
});

/* 向客户端响应Login数据库信息 */
router.get("/login-info", function(req, res) {
  dbutil.loginInfo.find({}, { members: 1, _id: 0 }, function(err, docs) {
    if (err) {
      console.log("查询出错：" + err);
    } else {
      console.log("查询结果为：");
      console.log(docs[0].members.length);
      res.send(docs[0]);
    }
  });
});

/* 向客户端响应cargoship数据库信息 */
router.get("/cargoship", function(req, res) {
  // find(Conditions,fields,callback);
  // 省略或为空，返回所有记录；只包含cargoshipInfo字段，去掉默认的_id字段；执行回调函数
  dbutil.cargoship.find(
    {},
    { timestamp: 1, cargoshipInfo: 1, _id: 0 },
    function(err, docs) {
      if (err) {
        console.log("查询出错：" + err);
      } else {
        console.log("查询结果为：");
        console.log(docs[0].cargoshipInfo.length);
        res.send(docs[0]);
      }
    }
  );
});

/* 向客户端响应emergency数据库信息 */
router.get("/emergency", function(req, res) {
  dbutil.emergency.find({}, { Emergency: 1, _id: 0 }, function(err, docs) {
    if (err) {
      console.log("查询出错：" + err);
    } else {
      console.log("查询结果为：");
      console.log(docs[0].Emergency.length);
      res.send(docs[0]);
    }
  });
});

/* 向客户端响应数据库信息 */
router.get("/db-info", function(req, res) {
  dbutil.dbInfo.find({}, { DBInfo: 1, _id: 0 }, function(err, docs) {
    if (err) {
      console.log("查询出错：" + err);
    } else {
      console.log("查询结果为：");
      console.log(docs[0].DBInfo.length);
      res.send(docs[0]);
    }
  });
});

/* 向客户端响应数据库版本信息 */
router.get("/ver", function(req, res) {
  res.send(vercheck);
});

module.exports = router;
