<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav" />
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import {
  Header as AppHeader,
  Sidebar,
  Footer as AppFooter,
  Breadcrumb
} from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    // AppAside,
    AppFooter,
    Breadcrumb
  },
  data() {
    return {
      nav: nav.items
    }
  },
  // 计算属性动态更新 value
  computed: {
    // 当前路由名称
    name: function() {
      return this.$route.name
    },
    // 当前路由列表
    list: function() {
      return this.$route.matched
    }
  }
}
</script>
