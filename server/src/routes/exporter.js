import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { VerCheck, Emergency, DBInfo, Cargoship, LoginInfo } from './db'
import { getLogger } from 'log4js'
const router = Router()
const logger = getLogger('DbExporter')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    title: 'MSA Database exporter'
  })
})

/* 向客户端响应 verCheck 数据库信息 */
router.get('/ver-check', function (req, res) {
  VerCheck.find({}, {})
    .sort({ name: 1 })
    .exec(function (err, docs) {
      if (err) {
        logger.error(`查询出错-${err}`)
      } else {
        res.json(docs)
      }
    })
})

/* 按条件发布指定数据库信息 */
router.get('/publish/:name', function (req, res) {
  // ES6 匿名箭头函数，写入数据库
  let writeDb = (dbpath, data) => {
    fs.writeFile(
      path.join(__dirname, `../../public/data/${dbpath}`),
      JSON.stringify(data),
      'utf-8',
      err => {
        if (err) {
          logger.error(`写入JSON文件出错-${err}`)
          res.json({ info: `数据库导出JSON文件出错-${err}` })
        }
      }
    )
  }
  // 更新 verCheck 数据库中对应库的版本信息
  let updateVer = (dbname, verTime) => {
    VerCheck.updateOne({ name: dbname }, { timestamp: verTime }).exec(function (
      err,
      docs
    ) {
      if (err) {
        logger.error(`数据库发布时间更新出错-${err}`)
        res.json({ info: `数据库发布时间更新出错-${err}` })
      } else {
        logger.info(`更新版本成功-${dbname}`)
      }
    })
  }
  switch (req.params.name) {
    case 'dbInfo':
      DBInfo.find({}, {})
        .sort({ Number: 1 })
        .exec(function (err, docs) {
          if (err) {
            logger.error(`导出出错-${err}`)
            res.json({ info: `导出出错-${err}` })
          } else {
            // 构建写入数据
            let gTime = Date.now()
            let wData = {
              timestamp: gTime,
              DBInfo: docs
            }
            // 更新 verCheck 数据并导出数据库为 json 文件
            updateVer('dbInfo', gTime)
            writeDb('DBInfo.json', wData)
            // 导出整体库
            exportVer('verCheck.json')
            res.json({ info: 'DBInfo.json 数据库发布成功' })
          }
        })
      break
    case 'emergency':
      Emergency.find({}, {})
        .sort({ Number: 1 })
        .exec(function (err, docs) {
          if (err) {
            logger.error(`导出出错-${err}`)
            res.json({ info: `导出出错-${err}` })
          } else {
            // 构建写入数据
            let gTime = Date.now()
            let wData = {
              timestamp: gTime,
              Emergency: docs
            }
            // 更新 verCheck 数据并导出数据库为 json 文件
            updateVer('emergency', gTime)
            writeDb('emergency.json', wData)
            // 导出整体库
            exportVer('verCheck.json')
            res.json({ info: 'emergency.json 数据库发布成功' })
          }
        })
      break
    case 'cargoship':
      Cargoship.find({}, {})
        .sort({ proName: 1 })
        .exec(function (err, docs) {
          if (err) {
            logger.error(`导出出错-${err}`)
            res.json({ info: `导出出错-${err}` })
          } else {
            // 构建写入数据
            let gTime = Date.now()
            let wData = {
              timestamp: gTime,
              cargoshipInfo: docs
            }
            // 更新 verCheck 数据并导出数据库为 json 文件
            updateVer('cargoship', gTime)
            writeDb('cargoship.json', wData)
            // 导出整体库
            exportVer('verCheck.json')
            res.json({ info: 'cargoship.json 数据库发布成功' })
          }
        })
      break
    case 'loginInfo':
      LoginInfo.find({}, {})
        .sort({ account: 1 })
        .exec(function (err, docs) {
          if (err) {
            logger.error(`导出出错-${err}`)
            res.json({ info: `导出出错-${err}` })
          } else {
            // 构建写入数据
            let gTime = Date.now()
            let wData = {
              timestamp: gTime,
              members: docs
            }
            // 更新 verCheck 数据并导出数据库为 json 文件
            updateVer('loginInfo', gTime)
            writeDb('LoginInfo.json', wData)
            // 导出整体库
            exportVer('verCheck.json')
            res.json({ info: 'LoginInfo.json 数据库发布成功' })
          }
        })
      break
  }
})

/* 向客户端响应数据库版本信息 */
router.get('/ver', function (req, res) {
  let dbVer = exportVer('verCheck.json')
  if (dbVer === 0) {
    console.log(dbVer)
    res.json({ info: '数据库导出成功' })
  } else {
    res.json({ info: '数据库导出失败' })
  }
})

const exportVer = jsonName => {
  VerCheck.find({}, {}).exec(function (err, docs) {
    if (err) {
      logger.error(`版本查询出错-${err}`)
      return -1
    } else {
      logger.info(`版本查询成功`)
      let ver = { verCheck: docs }
      // fs模块写入文件测试
      fs.writeFile(
        path.join(__dirname, `../../public/data/${jsonName}`),
        JSON.stringify(ver),
        'utf-8',
        err => {
          if (err) {
            logger.error(`写入JSON文件出错-${err}`)
            return -1
          }
        }
      )
    }
  })
  return 0
}

export default router
