const getters = {
  token: state => state.user.token, // 令牌
  name: state => state.user.name, // 用户名
  roles: state => state.user.roles, // 用户角色
  avatar: state => state.user.avatar, // 用户头像
  routers: state => state.permission.routers, // 静态路由
  addRouters: state => state.permission.addRouters // 动态路由
}
export default getters
