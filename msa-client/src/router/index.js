import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Login from '@/views/users/Login'
import Register from '@/views/users/Register'
import Rbac from '@/views/users/Rbac'
import DBinfo from '@/views/base/DBinfo'
import Cargoship from '@/views/base/Cargoship'
import Emergency from '@/views/base/Emergency'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: '首页',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: '主控制台',
          component: Dashboard
        },
        {
          path: '/base',
          redirect: '/base/dbinfo',
          name: '数据维护',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'dbinfo',
              name: '危险货物数据',
              component: DBinfo
            },
            {
              path: 'cargoship',
              name: '液货船作业检查数据',
              component: Cargoship
            },
            {
              path: 'emergency',
              name: '应急处置支持数据',
              component: Emergency
            }
          ]
        },
        {
          path: '/users',
          redirect: '/users/Login',
          name: '用户管理',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'login',
              name: '登录管理',
              component: Login
            },
            {
              path: 'register',
              name: '注册管理',
              component: Register
            },
            {
              path: 'rbac',
              name: '权限管理',
              component: Rbac
            }
          ]
        }
      ]
    }
  ]
})
