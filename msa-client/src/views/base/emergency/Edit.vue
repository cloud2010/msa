<template>
  <div class="animated fadeIn">
    <!-- 使用组件，绑定数据到引用组件的标题 -->
    <e-add :caption="captionTitle" :no-disabled="true" :fileds="items">
      <!-- 替换引用组件的插槽数据 -->
      <h3 slot="form-title">编辑项目编号：{{id}}</h3>
    </e-add>
  </div>
</template>

<script>
// 导入添加模板
import eAdd from './Add.vue'

export default {
  name: 'emergencyEdit',
  components: { eAdd },
  data: () => {
    return {
      captionTitle: '编辑数据',
      id: '0',
      items: { no: '' }
    }
  },
  created () {
    this.id = this.$route.params.eId
    this.items.no = this.$route.params.eId
  }
}
</script>
