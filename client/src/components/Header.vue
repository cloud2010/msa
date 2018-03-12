<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- <b-link class="font-weight-bold ml-2 disabled" to="#">监管支持系统</b-link> -->
    <span class="lead font-weight-bold mx-4">监管支持系统</span>
    <!-- <b-link class="navbar-brand" to="#"></b-link> -->
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-navbar-nav class="d-md-down-none ml-auto">
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <i class="fa fa-user mr-2"></i>{{username}}
        </template>
        <b-dropdown-header tag="div" class="text-center">
          <strong>基本信息</strong>
        </b-dropdown-header>
        <!-- <b-dropdown-item href="#">修改密码</b-dropdown-item> -->
        <b-dropdown-item @click="handleLogout">注销</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item class="px-3">APP下载</b-nav-item>
      <b-nav-item class="px-3">帮助文档</b-nav-item>
    </b-navbar-nav>
  </header>
</template>
<script>
export default {
  name: 'c-header',
  data: () => {
    return {}
  },
  computed: {
    username() {
      const username = localStorage.getItem('msa_username')
      return username
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('msa_username')
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    sidebarToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }
}
</script>
