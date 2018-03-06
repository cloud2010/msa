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
    <b-navbar-nav class="d-md-down-none mr-auto">
      <b-nav-item class="px-3">APP下载</b-nav-item>
      <b-nav-item class="px-3">帮助文档</b-nav-item>
    </b-navbar-nav>
  </header>
</template>
<script>
export default {
  name: 'c-header',
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }
}
</script>
