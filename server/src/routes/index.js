import { Router } from 'express'
import fs from 'fs'
// 数据库模型
import dbutil from './db'
import { getLogger } from 'log4js'
// 读取数据库信息
// var vercheck = require("../data/verCheck.json");
const router = Router()
const logger = getLogger('app')
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'MSA Database version check' })
  res.json({
    title: 'MSA Database version check'
  })
})

/* 向客户端响应Login数据库信息 */
router.get('/login-info', function (req, res) {
  dbutil.loginInfo.find(
    {},
    { timestamp: 1, isPublished: 1, members: 1, _id: 0 },
    function (err, docs) {
      if (err) {
        console.log('查询出错：' + err)
      } else {
        logger.info('查询结果：' + docs[0].members.length)
        res.json(docs[0])
      }
    }
  )
})

/* 向客户端响应cargoship数据库信息 */
router.get('/cargoship', function (req, res) {
  // find(Conditions,fields,callback);
  // 省略或为空，返回所有记录；只包含cargoshipInfo字段，去掉默认的_id字段；执行回调函数
  dbutil.cargoship.find(
    {},
    { timestamp: 1, isPublished: 1, cargoshipInfo: 1, _id: 0 },
    function (err, docs) {
      if (err) {
        console.log('查询出错：' + err)
      } else {
        logger.info('查询结果：' + docs[0].cargoshipInfo.length)
        res.json(docs[0])
      }
    }
  )
})

/* 向客户端响应emergency数据库信息 */
router.get('/emergency', function (req, res) {
  dbutil.emergency.find(
    {},
    { timestamp: 1, isPublished: 1, Emergency: 1, _id: 0 },
    function (err, docs) {
      if (err) {
        console.log('查询出错：' + err)
      } else {
        logger.info('查询结果：' + docs[0].Emergency.length)
        res.json(docs[0])
      }
    }
  )
})

/* 向客户端响应数据库信息 */
router.get('/db-info', function (req, res) {
  dbutil.dbInfo.find(
    {},
    { timestamp: 1, isPublished: 1, DBInfo: 1, _id: 0 },
    function (err, docs) {
      if (err) {
        console.log('查询出错：' + err)
      } else {
        logger.info('查询结果：' + docs[0].DBInfo.length)
        res.json(docs[0])
      }
    }
  )
})

/* 向客户端响应数据库版本信息 */
router.get('/ver', function (req, res) {
  var releaseDate = Date.now()
  var ver = {
    verCheck: [
      {
        name: 'loginInfo',
        timestamp: releaseDate,
        url: 'http://47.96.21.222/login-info'
      },
      {
        name: 'cargoship',
        timestamp: releaseDate,
        url: 'http://47.96.21.222/cargoship'
      },
      {
        name: 'emergency',
        timestamp: releaseDate,
        url: 'http://47.96.21.222/emergency'
      },
      {
        name: 'dbInfo',
        timestamp: releaseDate,
        url: 'http://47.96.21.222/db-info'
      }
    ]
  }
  // fs模块写入文件测试
  fs.writeFile('./dist/ver.json', JSON.stringify(ver), 'utf-8', err => {
    if (err) {
      console.log(err)
    }
  })
  res.json(ver)
})

export default router
