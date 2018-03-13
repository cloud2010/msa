<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="navData" />
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
    return {}
  },
  // 计算属性动态更新 value
  computed: {
    // 根据角色信息返回菜单项名称
    navData: function() {
      if (this.$store.state.user.roles.indexOf('admin') >= 0) {
        return nav.items
      } else {
        // 非管理员则返回其它菜单项
        return nav.uItems
      }
    },
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
