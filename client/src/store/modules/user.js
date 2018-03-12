// 抽取方法至 login API
// import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
/** 用户模块 state */
const user = {
  state: {
    code: -1, // 登录状态码
    token: getToken(),
    name: '',
    roles: []
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  /**
   * actions 内可以使用异步方法
   * mutations 只能使用同步方法
   * 前者可以 commit 触发后者
   * */

  actions: {
    // 登录提交
    Login({ commit }, userInfo) {
      this.$http
        .post('/api/users/login', userInfo)
        .then(response => {
          // 返回登录数据
          const authedData = response.data
          switch (authedData.code) {
            case 0: // 登录成功
              // 调用对应的 mutations
              // 设定本地 Cookie Token
              commit('SET_CODE', authedData.code)
              commit('SET_TOKEN', authedData.token)
              commit('SET_NAME', authedData.user)
              commit('SET_ROLES', authedData.roles)
              break
            default:
              // 设定异常登录状态码
              commit('SET_CODE', authedData.code)
              break
          }
        })
        .catch(error => {
          console.log(error)
          return error
        })
    },

    // 注销提交
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            // 清除角色和令牌信息
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端注销
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        // 清除角色和令牌信息
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`/api/users/getUserInfo/${state.token}`)
          .then(response => {
            // 返回登录数据
            let userInfo = response.data
            // 调用对应的 mutations
            // 设定本地 Cookie Token
            commit('SET_NAME', userInfo.user)
            commit('SET_ROLES', userInfo.roles)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  }
}

export default user
