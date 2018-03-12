const getters = {
  token: state => state.user.token, // 令牌
  name: state => state.user.name, // 用户名
  roles: state => state.user.roles, // 用户角色
  routers: state => state.permission.routers, // 静态路由
  addRouters: state => state.permission.addRouters // 动态路由
}
export default getters
