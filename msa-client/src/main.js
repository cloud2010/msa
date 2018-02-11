// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
// 挂载Vue ajax组件为第三方模块axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
// new Vue({
//   router,
//   template: '<App/>',
//   components: {
//     App
//   }
// }).$mount('#app')
