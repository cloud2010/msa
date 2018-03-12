import { Router } from 'express'
import { LoginInfo } from './db'
import { getLogger } from 'log4js'
const router = Router()
const logger = getLogger('UserLogin')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    title: 'User Auth'
  })
})

/* 用户登录验证 */
router.post('/login', function (req, res) {
  console.log('\n------POST传入的登录验证数据------\n')
  console.log(req.body)
  let userInfo = req.body
  LoginInfo.findOne({ account: userInfo.account }, function (err, docs) {
    if (err) {
      res.json({ info: '用户验证失败', code: -1 })
      logger.error(`用户验证失败-${err}`)
    } else if (docs !== null) {
      //   console.log(docs)
      if (docs.password === userInfo.password) {
        res.json({
          info: '登录成功',
          code: 0,
          token: docs._id,
          name: docs.user,
          roles: docs.roles
        })
      } else {
        res.json({ info: '密码错误', code: 1 })
      }
    } else {
      res.json({ info: '用户不存在', code: 2 })
    }
  })
})

export default router
