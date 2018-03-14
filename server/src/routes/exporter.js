import { Router } from 'express'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import { VerCheck, Emergency, DBInfo, Cargoship, LoginInfo } from './db'
import { getLogger } from 'log4js'
const router = Router()
const logger = getLogger('DbExporter')
// Promise 对象封装后的 fs.writeFile 方法
const writeFileAsync = promisify(fs.writeFile)
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
  // ES6 匿名箭头函数，写入数据库，利用 Promise 链式回调
  let writeDb = (dbpath, data) => {
    writeFileAsync(
      path.join(__dirname, `../../public/data/${dbpath}`),
      JSON.stringify(data),
      'utf-8'
    )
      .then(exportVer('verCheck.json')) // 导出任意库后均再次导出 verCheck.json
      .catch(errs => {
        logger.error('数据库写入错误：', errs)
      })
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
            res.json({ info: 'LoginInfo.json 数据库发布成功' })
          }
        })
      break
  }
})

/* 向客户端响应数据库版本信息 */
// router.get('/ver', function (req, res) {
//   let dbVer = exportVer('verCheck.json')
//   if (dbVer === 0) {
//     console.log(dbVer)
//     res.json({ info: '数据库导出成功' })
//   } else {
//     res.json({ info: '数据库导出失败' })
//   }
// })

const exportVer = jsonName => {
  let ver = { verCheck: [] }
  VerCheck.find({}, {})
    .exec((err, docs) => {
      if (err) {
        logger.error(`版本查询出错-${err}`)
      } else {
        logger.info('版本查询成功')
        ver.verCheck = docs
      }
    })
    .then(
      // 链式调用导出版本库
      writeFileAsync(
        path.join(__dirname, `../../public/data/${jsonName}`),
        JSON.stringify(ver),
        'utf-8'
      ).catch(errs => {
        logger.error('版本导出错误:', errs)
      })
    )
}

export default router
