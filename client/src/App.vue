<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="container">
      <div class="row mt-2">
        <div class="col-12"><h1 class="display-4">监管支持系统数据库维护</h1><hr></div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="list-group font-weight-bold">
            <!-- 使用 router-link 组件来导航. -->
            <!-- 通过传入 `to` 属性指定链接. -->
            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <router-link to="/" :class="'list-group-item list-group-item-action'">
              首页
            </router-link>
            <router-link to="/cargoship" :class="'list-group-item list-group-item-action'" :active-class="'active'">
              液货船作业检查数据
            </router-link>
            <router-link to="/emergency" :class="'list-group-item list-group-item-action'" :active-class="'active'">
              应急处置支持数据
            </router-link>
            <router-link to="/dbinfo" :class="'list-group-item list-group-item-action'" :active-class="'active'">
              危险货物数据
            </router-link>
          </div>
        </div>
        <div class="col-9">
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <transition name="slide">
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
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
