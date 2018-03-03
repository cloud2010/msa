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
      name: '危险货物',
      url: '/base/dbinfo',
      icon: 'fa fa-anchor',
      children: [
        {
          name: '查看编辑数据',
          url: '/base/dbinfo/view',
          icon: 'fa fa-table'
        },
        {
          name: '添加数据',
          url: '/base/dbinfo/add',
          icon: 'fa fa-pencil'
        }
      ]
    },
    {
      name: '应急处置支持',
      url: '/base/emergency',
      icon: 'fa fa-support',
      children: [
        {
          name: '查看编辑数据',
          url: '/base/emergency/view',
          icon: 'fa fa-table'
        },
        {
          name: '添加数据',
          url: '/base/emergency/add',
          icon: 'fa fa-pencil'
        }
      ]
    },
    {
      name: '液货船作业检查',
      url: '/base/cargoship',
      icon: 'fa fa-ship',
      children: [
        {
          name: '查看编辑数据',
          url: '/base/cargoship/view',
          icon: 'fa fa-table'
        },
        {
          name: '添加数据',
          url: '/base/cargoship/add',
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
    }
    // {
    //   name: '通知类组件',
    //   url: '/notifications',
    //   icon: 'icon-bell',
    //   children: [
    //     {
    //       name: '模态对话框',
    //       url: '/notifications/modals',
    //       icon: 'icon-bell'
    //     }
    //   ]
    // }
  ]
}
