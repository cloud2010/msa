# MSA 数据库 CRUD 接口

[![Build Status](https://travis-ci.org/cloud2010/msa.svg?branch=master)](https://travis-ci.org/cloud2010/msa)

前端基于 Vue，后端基于 Nodejs + Express + Mongoose

## 前端实现

主要技术：`vue 2.5 + vue-router 3 + vuex 3 + webpack 3 + axios + babel + sass + eslint + js-cookie + CoreUI-Vue + Bootstrap-Vue`

基于 [CoreUI](https://github.com/mrholek/CoreUI-Vue) 提供的后台管理 UI 进行二次开发

主要参考：

1. [https://github.com/mrholek/CoreUI-Vue](https://github.com/mrholek/CoreUI-Vue)
2. [https://github.com/bootstrap-vue/bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue)
3. [https://github.com/mgbq/vue-permission](https://github.com/mgbq/vue-permission)
4. [https://segmentfault.com/a/1190000009506097](https://segmentfault.com/a/1190000009506097)

## 后端实现

主要技术：`express + mongoose`

辅助技术：`babel + eslint + prettier + nodemon`

语法升级为 ES6,搭配 eslint 和 prettier 完成代码风格检查和 autofix

主要参考：

1. [https://egoist.moe/2017/12/11/write-better-code-with-eslint-and-prettier/](https://egoist.moe/2017/12/11/write-better-code-with-eslint-and-prettier/)
2. [https://github.com/openyun/express-babel-es6](https://github.com/openyun/express-babel-es6)
3. [https://github.com/vmasto/express-babel](https://github.com/vmasto/express-babel)
4. [http://www.cnblogs.com/zhongweiv/p/mongoose.html](http://www.cnblogs.com/zhongweiv/p/mongoose.html)

## 生产环境部署注意事项

1. 利用[cross-env](https://www.npmjs.com/package/cross-env)设置`NODE_ENV`为`production`
2. 结合`babel`完成 Server-end 的编译，利用[nodemon](https://github.com/remy/nodemon)启动Web服务
3. `Express`中间件设定静态目录 `app.use(express.static(path.join(__dirname, '../public')))`
4. `Webpack`编译好的 Front-end 文件存放到`Express`的静态目录，完成前后端的整合