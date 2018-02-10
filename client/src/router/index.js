import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Cargoship = { template: '<div>液货船作业检查</div>' }
const DbInfo = { template: '<div>危险货物数据库</div>' }
const Emergency = { template: '<div>应急处置支持</div>' }
const Home = { template: '<div>首页内容</div>' }

Vue.use(Router)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/emergency',
      name: 'Emergency',
      component: Emergency
    },
    {
      path: '/cargoship',
      name: 'Cargoship',
      component: Cargoship
    },
    {
      path: '/dbinfo',
      name: 'DbInfo',
      component: DbInfo
    }
  ]
})
