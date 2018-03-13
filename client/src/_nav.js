export default {
  items: [
    {
      name: '发布数据库',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: '数据维护',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: '危险货物',
      url: '/dbinfo',
      icon: 'fa fa-anchor',
      children: [
        {
          name: '查看编辑数据',
          url: '/dbinfo/view',
          icon: 'fa fa-table'
        },
        {
          name: '添加数据',
          url: '/dbinfo/add',
          icon: 'fa fa-pencil'
        }
      ]
    },
    {
      name: '应急处置支持',
      url: '/emergency',
      icon: 'fa fa-support',
      children: [
        {
          name: '查看编辑数据',
          url: '/emergency/view',
          icon: 'fa fa-table'
        },
        {
          name: '添加数据',
          url: '/emergency/add',
          icon: 'fa fa-pencil'
        }
      ]
    },
    {
      name: '液货船作业检查',
      url: '/cargoship',
      icon: 'fa fa-ship',
      children: [
        {
          name: '查看编辑数据',
          url: '/cargoship/view',
          icon: 'fa fa-table'
        },
        {
          name: '添加数据',
          url: '/cargoship/add',
          icon: 'fa fa-pencil'
        }
      ]
    },
    {
      title: true,
      name: '设置'
    },
    {
      name: '用户管理',
      url: '/users',
      icon: 'fa fa-users',
      children: [
        {
          name: '用户管理',
          url: '/users/view',
          icon: 'fa fa-sign-in'
        },
        {
          name: '用户添加',
          url: '/users/add',
          icon: 'fa fa-user-plus'
        }
      ]
    }
  ],
  uItems: [
    {
      name: '控制台',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: '数据维护',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: '危险货物',
      url: '/dbinfo',
      icon: 'fa fa-anchor',
      children: [
        {
          name: '查看数据',
          url: '/dbinfo/view',
          icon: 'fa fa-table'
        }
      ]
    },
    {
      name: '应急处置支持',
      url: '/emergency',
      icon: 'fa fa-support',
      children: [
        {
          name: '查看数据',
          url: '/emergency/view',
          icon: 'fa fa-table'
        }
      ]
    },
    {
      name: '液货船作业检查',
      url: '/cargoship',
      icon: 'fa fa-ship',
      children: [
        {
          name: '查看数据',
          url: '/cargoship/view',
          icon: 'fa fa-table'
        }
      ]
    }
  ]
}
