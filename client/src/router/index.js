import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// LoginPage
import Login from '@/views/Login'

// Views - Dashboard
import Dashboard from '@/views/Dashboard'

// Views - User
import LoginInfo from '@/views/base/userinfo/LoginInfo'
import UserEdit from '@/views/base/userinfo/Edit'
import UserAdd from '@/views/base/userinfo/Add'

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

// Views - Notifications
// import Alerts from '@/views/notifications/Alerts'
// import Badges from '@/views/notifications/Badges'
// import Modals from '@/views/notifications/Modals'

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
            label: '发布数据库'
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
            render(c) {
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
                render(c) {
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
              redirect: 'cargoship/view',
              name: 'Cargoship',
              meta: {
                label: '液货船作业检查'
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
                render(c) {
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
          redirect: '/users/view',
          name: 'Users',
          meta: {
            label: '用户管理'
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
                label: '用户查看'
              },
              component: LoginInfo
            },
            {
              path: 'edit/:uId',
              name: 'userEdit',
              meta: {
                label: '用户编辑'
              },
              component: UserEdit
            },
            {
              path: 'add',
              name: 'userAdd',
              meta: {
                label: '用户添加'
              },
              component: UserAdd
            }
          ]
        }
        // {
        //   path: 'notifications',
        //   redirect: '/notifications/alerts',
        //   name: 'Notifications',
        //   component: {
        //     render (c) {
        //       return c('router-view')
        //     }
        //   },
        //   children: [
        //     {
        //       path: 'alerts',
        //       name: 'Alerts',
        //       component: Alerts
        //     },
        //     {
        //       path: 'badges',
        //       name: 'Badges',
        //       component: Badges
        //     },
        //     {
        //       path: 'modals',
        //       name: 'Modals',
        //       component: Modals
        //     }
        //   ]
        // }
      ]
    }
  ]
})
