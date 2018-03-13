import { Router } from 'express'
import { Emergency, DBInfo, Cargoship, LoginInfo } from './db'
import { getLogger } from 'log4js'

const router = Router()
const logger = getLogger('CRUD')
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'MSA Database version check' })
  res.json({
    title: 'MSA Database version check'
  })
})

/* 向客户端响应 LoginInfo 数据库信息 */
router.get('/login-info', function (req, res) {
  LoginInfo.find({}, {}, function (err, docs) {
    if (err) {
      // console.log('查询出错：' + err)
      logger.error(`查询出错-${err}`)
    } else {
      res.json(docs)
    }
  })
})

/* 按条件查询 LoginInfo 数据库信息 */
router.get('/login-info/:id', function (req, res) {
  LoginInfo.findById(req.params.id, function (err, docs) {
    if (err) {
      logger.error(`查询出错-${err}`)
      res.json({ Error: err })
    } else {
      logger.info(`查询路径-${req.path}`)
      // console.log(docs)
      res.json(docs)
    }
  })
})

/* 按条件删除 LoginInfo 数据库信息 */
router.get('/login-info/del/:id', function (req, res) {
  LoginInfo.findByIdAndRemove(req.params.id, function (err, docs) {
    if (err) {
      logger.error(`删除出错-${err}`)
      res.json({ info: err })
    } else {
      logger.info(`删除成功-${req.path}`)
      // console.log(res)
      res.json({ info: '删除成功' })
    }
  })
})

/**
 * 添加 LoginInfo 数据库
 * POST方法，传入json文件格式
 */
router.post('/login-info/add', function (req, res) {
  console.log('\n------POST传入的 login-info 添加数据------\n')
  console.log(req.body)
  let addItem = req.body
  let newLoginInfo = new LoginInfo({
    account: addItem.account,
    password: addItem.password,
    user: addItem.user,
    roles: addItem.roles
  })
  newLoginInfo.save(function (err, docs) {
    if (err) {
      logger.error(`添加出错-${err}-${addItem.account}-${addItem.user}`)
      res.json({ info: '添加失败，请重试！' })
    } else {
      logger.info(`添加成功-${addItem.account}-${addItem.user}`)
      res.json({ info: '添加成功' })
    }
  })
})

/**
 * 更新 LoginInfo 数据库
 * POST方法，传入json文件格式
 */
router.post('/login-info/update', function (req, res) {
  console.log('\n------POST传入的 login-info 更新数据------\n')
  console.log(req.body)
  let updateItem = req.body
  LoginInfo.findByIdAndUpdate(
    updateItem.id,
    {
      account: updateItem.account,
      password: updateItem.password,
      user: updateItem.user
    },
    function (err, docs) {
      if (err) {
        res.json({ info: '更新失败，请重试！' })
        logger.error(`更新出错-${err}-${updateItem.id}-${updateItem.user}`)
      } else {
        logger.info(`更新成功-${updateItem.id}-${updateItem.user}`)
        res.json({ info: '更新成功' })
      }
    }
  )
})

/* 向客户端响应 cargoship 数据库信息 */
router.get('/cargoship', function (req, res) {
  // find(Conditions,fields,callback);
  // 省略或为空，返回所有记录；只包含cargoshipInfo字段，去掉默认的_id字段；执行回调函数
  Cargoship.find({}, {}).exec(function (err, docs) {
    if (err) {
      logger.error(`查询出错-${err}`)
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
      logger.error(`查询出错-${err}`)
      res.json({ Error: err })
    } else {
      logger.info(`查询路径-${req.path}`)
      // console.log(docs)
      res.json(docs)
    }
  })
})

/* 按条件删除 cargoship 数据库信息 */
router.get('/cargoship/del/:id', function (req, res) {
  Cargoship.findByIdAndRemove(req.params.id, function (err, docs) {
    if (err) {
      logger.error(`删除出错-${err}`)
      res.json({ info: err })
    } else {
      logger.info(`删除成功-${req.path}`)
      // console.log(res)
      res.json({ info: '删除成功' })
    }
  })
})

/**
 * 添加 cargoship 数据库
 * POST方法，传入json文件格式
 */
router.post('/cargoship/add', function (req, res) {
  console.log('\n------POST传入的 cargoship 添加数据------\n')
  console.log(req.body)
  let addItem = req.body
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
router.post('/cargoship/update', function (req, res) {
  console.log('\n------POST传入的 cargoship 更新数据------\n')
  console.log(req.body)
  let updateItem = req.body
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
        res.json({ info: '更新失败，请重试！' })
        logger.error(`更新出错-${err}-${updateItem.id}-${updateItem.proName}`)
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
        logger.error(`查询出错-${err}`)
      } else {
        res.json(docs)
      }
    })
})

/* 向客户端响应 emergency 编号最大值 */
router.get('/emergency/max', function (req, res) {
  Emergency.findOne()
    .sort({ Number: -1 })
    .exec(function (err, docs) {
      if (err) {
        logger.error(`查询出错-${err}`)
      } else {
        res.json({ maxNum: docs.Number })
      }
    })
})

/* 按条件查询 emergency 数据库信息 */
router.get('/emergency/:id', function (req, res) {
  Emergency.findById(req.params.id, function (err, docs) {
    if (err) {
      logger.error(`查询出错-${err}`)
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
router.get('/emergency/del/:id', function (req, res) {
  Emergency.findByIdAndRemove(req.params.id, function (err, docs) {
    if (err) {
      logger.error(`删除出错-${err}`)
      res.json({ info: err })
    } else {
      logger.info(`删除成功-${req.path}`)
      // console.log(docs)
      res.json({ info: '删除成功' })
    }
  })
})

/**
 * 添加 emergency 数据库
 * POST方法，传入json文件格式
 */
router.post('/emergency/add', function (req, res) {
  console.log('\n------POST传入的 emergency 添加数据------\n')
  console.log(req.body)
  let addItem = req.body
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
router.post('/emergency/update', function (req, res) {
  console.log('\n------POST传入的 emergency 更新数据------\n')
  console.log(req.body)
  let updateItem = req.body
  Emergency.findByIdAndUpdate(
    updateItem.id,
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
        logger.error(`更新出错-${err}-${updateItem.id}-${updateItem.name}`)
        res.json({ info: '更新失败，请重试！' })
      } else {
        logger.info(`更新成功-${updateItem.id}-${updateItem.name}`)
        res.json({ info: '更新成功' })
      }
    }
  )
})

/* 向客户端响应 dbinfo 数据库信息 */
router.get('/db-info', function (req, res) {
  DBInfo.find({}, {})
    .sort({ Number: 1 })
    .exec(function (err, docs) {
      if (err) {
        logger.error(`查询出错-${err}`)
      } else {
        res.json(docs)
      }
    })
})

/* 向客户端响应 dbinfo 编号最大值 */
router.get('/db-info/max', function (req, res) {
  DBInfo.findOne()
    .sort({ Number: -1 })
    .exec(function (err, docs) {
      if (err) {
        logger.error(`查询出错-${err}`)
      } else {
        res.json({ maxNum: docs.Number })
      }
    })
})

/* 按条件查询 dbinfo 数据库信息 */
router.get('/db-info/:id', function (req, res) {
  DBInfo.findById(req.params.id, function (err, docs) {
    if (err) {
      logger.error(`查询出错-${err}`)
      res.json({ Error: err })
    } else {
      // console.log(req.params.number)
      logger.info(req.path)
      console.log(docs)
      res.json(docs)
    }
  })
})

/* 按条件删除 dbinfo 数据库信息 */
router.get('/db-info/del/:id', function (req, res) {
  DBInfo.findByIdAndRemove(req.params.id, function (err, docs) {
    if (err) {
      logger.error(`删除出错-${err}`)
      res.json({ info: err })
    } else {
      logger.info(req.path)
      // console.log(docs)
      res.json({ info: '删除成功' })
    }
  })
})

/**
 * 添加 dbinfo 数据库
 * POST方法，传入json文件格式
 */
router.post('/db-info/add/', function (req, res) {
  console.log('\n------POST传入的 dbinfo 添加数据------\n')
  console.log(req.body)
  let addItem = req.body
  let newDBInfo = new DBInfo({
    Number: addItem.Number,
    capital: addItem.capital,
    ChineseName: addItem.ChineseName,
    classification: addItem.classification,
    Unnum: addItem.Unnum,
    basicInfo: addItem.basicInfo,
    property: addItem.property,
    jobRequirements: addItem.jobRequirements,
    StructuralRequest: addItem.StructuralRequest,
    EquipmentRequest: addItem.EquipmentRequest,
    specialRequest: addItem.specialRequest
  })
  newDBInfo.save(function (err, docs) {
    if (err) {
      logger.error(`添加出错-${err}-${addItem.Number}`)
      res.json({ info: '添加失败，请重试！' })
    } else {
      logger.info(`添加成功-${addItem.Number}`)
      res.json({ info: '添加成功' })
    }
  })
})

/**
 * 更新 dbinfo 数据库
 * POST方法，传入json文件格式
 */
router.post('/db-info/update', function (req, res) {
  console.log('\n------POST传入的 dbinfo 更新数据------\n')
  console.log(req.body)
  let updateItem = req.body
  DBInfo.findByIdAndUpdate(
    updateItem.id,
    {
      Number: updateItem.Number,
      capital: updateItem.capital,
      ChineseName: updateItem.ChineseName,
      classification: updateItem.classification,
      Unnum: updateItem.Unnum,
      basicInfo: updateItem.basicInfo,
      property: updateItem.property,
      jobRequirements: updateItem.jobRequirements,
      StructuralRequest: updateItem.StructuralRequest,
      EquipmentRequest: updateItem.EquipmentRequest,
      specialRequest: updateItem.specialRequest
    },
    function (err, docs) {
      if (err) {
        logger.error(`更新出错-${err}-${updateItem.id}-${updateItem.Number}`)
        res.json({ info: '更新失败，请重试！' })
      } else {
        logger.info(`更新成功-${updateItem.id}-${updateItem.Number}`)
        res.json({ info: '更新成功' })
      }
    }
  )
})

export default router
