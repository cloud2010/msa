export default {
  items: [
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
      name: '危险货物数据',
      url: '/base/dbinfo',
      icon: 'fa fa-anchor'
    },
    {
      name: '应急处置支持数据',
      url: '/base/emergency',
      icon: 'fa fa-support'
    },
    {
      name: '液货船作业检查数据',
      url: '/base/cargoship',
      icon: 'fa fa-ship'
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
          name: '登录管理',
          url: '/users/rbac',
          icon: 'fa fa-sign-in'
        },
        {
          name: '注册管理',
          url: '/users/rbac',
          icon: 'fa fa-user-plus'
        },
        {
          name: '权限管理',
          url: '/users/rbac',
          icon: 'fa fa-cog'
        }
      ]
    },
    {
      name: '通知类组件',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: '模态对话框',
          url: '/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    }
  ]
}
