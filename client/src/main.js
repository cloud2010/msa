// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
// import store from './store'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
// 挂载Vue ajax组件为第三方模块axios
import axios from 'axios'
Vue.prototype.$http = axios
// 挂载RBAC权限管理模块
// import '@/rbac'

Vue.use(BootstrapVue)
// 引入状态管理模块
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: {
    App
  },
  template: '<App/>'
})

