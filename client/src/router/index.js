import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// LoginPage
import Login from '@/views/Login'

// 404 Page
import NoFound from '@/views/404'

// Views - Dashboard
import Dashboard from '@/views/Dashboard'

// Views - User
import LoginInfo from '@/views/base/userinfo/LoginInfo'
import UserEdit from '@/views/base/userinfo/Edit'
import UserAdd from '@/views/base/userinfo/Add'
import Password from '@/views/base/userinfo/Password'

// Views - DBinfo
import DBinfo from '@/views/base/dbinfo/DBinfo'
import DBinfoEdit from '@/views/base/dbinfo/Edit'
import DBinfoAdd from '@/views/base/dbinfo/Add'

// Views - Cargoship
import Cargoship from '@/views/base/cargoship/Cargoship'
import CargoshipEdit from '@/views/base/cargoship/Edit'
import CargoshipAdd from '@/views/base/cargoship/Add'

// Views - Emergency
import Emergency from '@/views/base/emergency/Emergency'
import EmergencyEdit from '@/views/base/emergency/Edit'
import EmergencyAdd from '@/views/base/emergency/Add'

Vue.use(Router)

// 静态路由
export const constantRouterMap = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/404', name: 'NoFound', component: NoFound }
]

export default new Router({
  // mode: 'hash', // 路由模式
  linkActiveClass: 'open active', // CSS样式控制
  scrollBehavior: () => ({ y: 0 }), // 滚动行为
  routes: constantRouterMap
})

// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    meta: {
      label: '首页',
      roles: ['admin', 'viewer']
    },
    component: Full,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          label: '发布数据库',
          roles: ['admin', 'viewer']
        }
      },
      {
        path: '/password',
        name: 'Password',
        component: Password,
        meta: {
          label: '修改密码',
          roles: ['admin', 'viewer']
        }
      },
      {
        path: '/dbinfo',
        redirect: '/dbinfo/view',
        name: 'DBinfo',
        meta: {
          label: '危险货物',
          roles: ['admin', 'viewer']
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'view',
            name: 'dbinfoView',
            meta: {
              label: '数据查看',
              roles: ['admin', 'viewer']
            },
            component: DBinfo
          },
          {
            path: 'edit/:dId',
            name: 'dbinfoEdit',
            meta: {
              label: '数据编辑',
              roles: ['admin']
            },
            component: DBinfoEdit
          },
          {
            path: 'add',
            name: 'dbinfoAdd',
            meta: {
              label: '数据添加',
              roles: ['admin']
            },
            component: DBinfoAdd
          }
        ]
      },
      {
        path: '/cargoship',
        redirect: '/cargoship/view',
        name: 'Cargoship',
        meta: {
          label: '液货船作业检查',
          roles: ['admin', 'viewer']
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'view',
            name: 'cargoshipView',
            meta: {
              label: '数据查看',
              roles: ['admin', 'viewer']
            },
            component: Cargoship
          },
          {
            path: 'edit/:cId',
            name: 'cargoshipEdit',
            meta: {
              label: '数据编辑',
              roles: ['admin']
            },
            component: CargoshipEdit
          },
          {
            path: 'add',
            name: 'cargoshipAdd',
            meta: {
              label: '数据添加',
              roles: ['admin']
            },
            component: CargoshipAdd
          }
        ]
      },
      {
        path: '/emergency',
        redirect: '/emergency/view',
        name: 'Emergency',
        meta: {
          label: '应急处置支持',
          roles: ['admin', 'viewer']
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'view',
            name: 'emergencyView',
            meta: {
              label: '数据查看',
              roles: ['admin', 'viewer']
            },
            component: Emergency
          },
          {
            path: 'edit/:eId',
            name: 'emergencyEdit',
            meta: {
              label: '数据编辑',
              roles: ['admin']
            },
            component: EmergencyEdit
          },
          {
            path: 'add',
            name: 'emergencyAdd',
            meta: {
              label: '数据添加',
              roles: ['admin']
            },
            component: EmergencyAdd
          }
        ]
      },
      {
        path: '/users',
        redirect: '/users/view',
        name: 'Users',
        meta: {
          label: '用户管理',
          roles: ['admin']
        },
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'view',
            name: 'userView',
            meta: {
              label: '用户查看',
              roles: ['admin']
            },
            component: LoginInfo
          },
          {
            path: 'edit/:uId',
            name: 'userEdit',
            meta: {
              label: '用户编辑',
              roles: ['admin']
            },
            component: UserEdit
          },
          {
            path: 'add',
            name: 'userAdd',
            meta: {
              label: '用户添加',
              roles: ['admin']
            },
            component: UserAdd
          }
        ]
      }
    ]
  },
  // 无访问权限则跳转到404页面
  { path: '*', redirect: '/404' }
]
