import { Router } from 'express'
import fs from 'fs'
import path from 'path'
// 数据库模型
// import dbutil from './db'
import { Emergency, DBInfo, Cargoship, LoginInfo } from './db'
import { getLogger } from 'log4js'
// 读取数据库信息
// var vercheck = require("../data/verCheck.json");
const router = Router()
const logger = getLogger('CRUD')
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'MSA Database version check' })
  res.json({
    title: 'MSA Database version check'
  })
})

/* 向客户端响应Login数据库信息 */
router.get('/login-info', function (req, res) {
  LoginInfo.find({}, {}, function (err, docs) {
    if (err) {
      // console.log('查询出错：' + err)
      logger.error(`查询出错${err}`)
    } else {
      res.json(docs)
    }
  })
})

/* 向客户端响应 cargoship 数据库信息 */
router.get('/cargoship', function (req, res) {
  // find(Conditions,fields,callback);
  // 省略或为空，返回所有记录；只包含cargoshipInfo字段，去掉默认的_id字段；执行回调函数
  Cargoship.find({}, {}).exec(function (err, docs) {
    if (err) {
      logger.error(`查询出错${err}`)
    } else {
      // logger.info('查询结果：' + docs[0].cargoshipInfo.length)
      res.json(docs)
    }
  })
})

/* 按条件查询 cargoship 数据库信息 */
router.get('/cargoship/:id', function (req, res) {
  Cargoship.findById(req.params.id, function (err, docs) {
    if (err) {
      logger.error(`查询出错${err}`)
      res.json({ Error: err })
    } else {
      logger.info(req.path)
      console.log(docs)
      res.json(docs)
    }
  })
})

/* 按条件删除 cargoship 数据库信息 */
router.get('/cargoship/del/:id', function (req, res) {
  Cargoship.findByIdAndRemove(req.params.id, function (err, res) {
    if (err) {
      logger.error(`删除出错${err}`)
      res.json({ info: err })
    } else {
      logger.info(req.path)
      console.log(res)
      res.json({ info: '删除成功' })
    }
  })
})

/**
 * 添加 cargoship 数据库
 * POST方法，传入json文件格式
 */
router.post('/cargoship/add/:data', function (req, res) {
  console.log('\n------POST传入的添加数据------\n')
  console.log(JSON.parse(req.params.data))
  let addItem = JSON.parse(req.params.data)
  let newCargoship = new Cargoship({
    proName: addItem.proName,
    proTitle: addItem.proTitle,
    part: addItem.part,
    proContent: {
      proTitle: addItem.proTitle,
      checkPoint: addItem.proContent.checkPoint,
      checkReason: addItem.proContent.checkReason,
      weaknessItem: addItem.proContent.weaknessItem
    }
  })
  newCargoship.save(function (err, docs) {
    if (err) {
      logger.error(`添加出错-${err}-${addItem.proName}`)
      res.json({ info: '添加失败，请重试！' })
    } else {
      logger.info(`添加成功-${addItem.proName}`)
      res.json({ info: '添加成功' })
    }
  })
})

/**
 * 更新 cargoship 数据库
 * POST方法，传入json文件格式
 */
router.post('/cargoship/update/:data', function (req, res) {
  console.log('\n------POST传入的更新数据------\n')
  console.log(JSON.parse(req.params.data))
  let updateItem = JSON.parse(req.params.data)
  Cargoship.findByIdAndUpdate(
    updateItem.id,
    {
      proName: updateItem.proName,
      proTitle: updateItem.proTitle,
      part: updateItem.part,
      proContent: {
        proTitle: updateItem.proTitle,
        checkPoint: updateItem.proContent.checkPoint,
        checkReason: updateItem.proContent.checkReason,
        weaknessItem: updateItem.proContent.weaknessItem
      }
    },
    function (err, docs) {
      if (err) {
        logger.error(`更新出错-${err}-${updateItem.id}-${updateItem.proName}`)
        res.json({ info: '更新失败，请重试！' })
      } else {
        logger.info(`更新成功-${updateItem.id}-${updateItem.proName}`)
        res.json({ info: '更新成功' })
      }
    }
  )
})

/* 向客户端响应 emergency 数据库信息 */
router.get('/emergency', function (req, res) {
  Emergency.find({}, {})
    .sort({ Number: 1 })
    .exec(function (err, docs) {
      if (err) {
        logger.error(`查询出错${err}`)
      } else {
        res.json(docs)
      }
    })
})

/* 按条件查询 emergency 数据库信息 */
router.get('/emergency/:number', function (req, res) {
  Emergency.findOne({ Number: req.params.number }, function (err, docs) {
    if (err) {
      logger.error(`查询出错${err}`)
      res.json({ Error: err })
    } else {
      // console.log(req.params.number)
      logger.info(req.path)
      console.log(docs)
      res.json(docs)
    }
  })
})

/* 按条件删除 emergency 数据库信息 */
router.get('/emergency/del/:number', function (req, res) {
  Emergency.remove({ Number: req.params.number }, function (err, docs) {
    if (err) {
      logger.error(`删除出错${err}`)
      res.json({ info: err })
    } else {
      logger.info(req.path)
      console.log(docs)
      res.json({ info: '删除成功' })
    }
  })
})

/**
 * 添加 emergency 数据库
 * POST方法，传入json文件格式
 */
router.post('/emergency/add/:data', function (req, res) {
  console.log('\n------POST传入的添加数据------\n')
  console.log(JSON.parse(req.params.data))
  let addItem = JSON.parse(req.params.data)
  let newEmergency = new Emergency({
    Number: addItem.no,
    capital: addItem.capital,
    ChineseName: addItem.name,
    extinguishing: addItem.extinguishing,
    oilfence: addItem.oilfence,
    PersonalProtection: addItem.protection,
    skinExposure: addItem.skin,
    eyeExposure: addItem.eye,
    inhalation: addItem.inhalation,
    ingestion: addItem.ingestion
  })
  newEmergency.save(function (err, docs) {
    if (err) {
      logger.error(`添加出错-${err}-${addItem.no}-${addItem.name}`)
      res.json({ info: '添加失败，请重试！' })
    } else {
      logger.info(`添加成功-${addItem.no}-${addItem.name}`)
      res.json({ info: '添加成功' })
    }
  })
})

/**
 * 更新 emergency 数据库
 * POST方法，传入json文件格式
 */
router.post('/emergency/update/:data', function (req, res) {
  console.log('\n------POST传入的更新数据------\n')
  console.log(JSON.parse(req.params.data))
  let updateItem = JSON.parse(req.params.data)
  Emergency.updateOne(
    { Number: updateItem.no },
    {
      capital: updateItem.capital,
      ChineseName: updateItem.name,
      extinguishing: updateItem.extinguishing,
      oilfence: updateItem.oilfence,
      PersonalProtection: updateItem.protection,
      skinExposure: updateItem.skin,
      eyeExposure: updateItem.eye,
      inhalation: updateItem.inhalation,
      ingestion: updateItem.ingestion
    },
    function (err, docs) {
      if (err) {
        logger.error(`更新出错-${err}-${updateItem.no}-${updateItem.name}`)
        res.json({ info: '更新失败，请重试！' })
      } else {
        logger.info(`更新成功-${updateItem.no}-${updateItem.name}`)
        res.json({ info: '更新成功' })
      }
    }
  )
})

/* 向客户端响应数据库信息 */
router.get('/db-info', function (req, res) {
  DBInfo.find({}, {})
    .sort({ Number: 1 })
    .exec(function (err, docs) {
      if (err) {
        logger.error(`查询出错${err}`)
      } else {
        res.json(docs)
      }
    })
})

/* 向客户端响应数据库版本信息 */
router.get('/ver', function (req, res) {
  var releaseDate = Date.now()
  var ver = {
    verCheck: [
      {
        name: 'loginInfo',
        timestamp: releaseDate,
        url: 'http://47.96.21.222/data/LoginInfo.json'
      },
      {
        name: 'cargoship',
        timestamp: releaseDate,
        url: 'http://47.96.21.222/data/cargoship.json'
      },
      {
        name: 'emergency',
        timestamp: releaseDate,
        url: 'http://47.96.21.222/data/emergency.json'
      },
      {
        name: 'dbInfo',
        timestamp: releaseDate,
        url: 'http://47.96.21.222/data/DBInfo.json'
      }
    ]
  }
  // fs模块写入文件测试
  fs.writeFile(
    path.join(__dirname, '../../public/data/verCheck.json'),
    JSON.stringify(ver),
    'utf-8',
    err => {
      if (err) {
        logger.error(`写入JSON文件出错${err}`)
      }
    }
  )
  res.json(ver)
})

export default router
