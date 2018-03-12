import express from 'express'
import path from 'path'
// import favicon from 'serve-favicon'
// import logger from 'morgan'
import { configure, getLogger, connectLogger } from 'log4js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import index from './routes/index'
import exporter from './routes/exporter'
import users from './routes/users'

const app = express()

/**
 * Initialise log4js first, so we don't miss any log messages
 */
configure(path.join(__dirname, './config/log4js.json'))
const logger = getLogger('error')

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// replace this with the log4js connect-logger
app.use(connectLogger(getLogger('http'), { level: 'auto' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))
// 禁用 X-Powered-By 头
app.disable('x-powered-by')

app.use('/', index)
app.use('/export', exporter)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // 使用es6模版字符串``方法
  logger.error(`${err.message} Request path: ${req.path}`)
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
