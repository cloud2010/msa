<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="container">
      <div style="margin-top: 2rem; padding-bottom: 1rem;"><h1>Vue Learning</h1></div>
      <!-- Alerts -->
      <h3>v-for learning</h3>
      <div style="padding: 1rem;">
        <div v-for="brand in ['success', 'info', 'warning', 'danger']" :key="brand" class="alert" :class="'alert-' + brand">
          <strong>Well done!</strong> You successfully read this {{brand}} alert message.
        </div>
      </div>
      <p>
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </p>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
