import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Login from '@/views/users/Login'
import Register from '@/views/users/Register'
import Rbac from '@/views/users/Rbac'
import DBinfo from '@/views/base/dbinfo/DBinfo'
import DBinfoEdit from '@/views/base/dbinfo/Edit'
import DBinfoAdd from '@/views/base/dbinfo/Add'
import Cargoship from '@/views/base/cargoship/Cargoship'
import CargoshipEdit from '@/views/base/cargoship/Edit'
import CargoshipAdd from '@/views/base/cargoship/Add'
import Emergency from '@/views/base/emergency/Emergency'
import EmergencyEdit from '@/views/base/emergency/Edit'
import EmergencyAdd from '@/views/base/emergency/Add'

// Views - Notifications
import Alerts from '@/views/notifications/Alerts'
import Badges from '@/views/notifications/Badges'
import Modals from '@/views/notifications/Modals'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      meta: {
        label: '首页'
      },
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            label: '控制台'
          }
        },
        {
          path: '/base',
          redirect: '/base/dbinfo',
          name: 'Base',
          meta: {
            label: '数据维护'
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'dbinfo',
              name: 'DBinfo',
              meta: {
                label: '危险货物'
              },
              component: {
                render (c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: 'view',
                  name: 'dbinfoView',
                  meta: {
                    label: '数据查看'
                  },
                  component: DBinfo
                },
                {
                  path: 'edit/:dId',
                  name: 'dbinfoEdit',
                  meta: {
                    label: '数据编辑'
                  },
                  component: DBinfoEdit
                },
                {
                  path: 'add',
                  name: 'dbinfoAdd',
                  meta: {
                    label: '数据添加'
                  },
                  component: DBinfoAdd
                }
              ]
            },
            {
              path: 'cargoship',
              name: 'Cargoship',
              meta: {
                label: '液货船作业检查'
              },
              component: {
                render (c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: 'view',
                  name: 'cargoshipView',
                  meta: {
                    label: '数据查看'
                  },
                  component: Cargoship
                },
                {
                  path: 'edit/:cId',
                  name: 'cargoshipEdit',
                  meta: {
                    label: '数据编辑'
                  },
                  component: CargoshipEdit
                },
                {
                  path: 'add',
                  name: 'cargoshipAdd',
                  meta: {
                    label: '数据添加'
                  },
                  component: CargoshipAdd
                }
              ]
            },
            {
              path: 'emergency',
              redirect: 'emergency/view',
              name: 'Emergency',
              meta: {
                label: '应急处置支持'
              },
              component: {
                render (c) {
                  return c('router-view')
                }
              },
              children: [
                {
                  path: 'view',
                  name: 'emergencyView',
                  meta: {
                    label: '数据查看'
                  },
                  component: Emergency
                },
                {
                  path: 'edit/:eId',
                  name: 'emergencyEdit',
                  meta: {
                    label: '数据编辑'
                  },
                  component: EmergencyEdit
                },
                {
                  path: 'add',
                  name: 'emergencyAdd',
                  meta: {
                    label: '数据添加'
                  },
                  component: EmergencyAdd
                }
              ]
            }
          ]
        },
        {
          path: '/users',
          redirect: '/users/Login',
          name: 'Users',
          meta: {
            label: '用户管理'
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'login',
              name: 'Login',
              meta: {
                label: '登陆管理'
              },
              component: Login
            },
            {
              path: 'register',
              name: 'Register',
              meta: {
                label: '注册管理'
              },
              component: Register
            },
            {
              path: 'rbac',
              name: 'Rbac',
              meta: {
                label: '权限管理'
              },
              component: Rbac
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    }
  ]
})
