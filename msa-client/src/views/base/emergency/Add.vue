<template>
  <div class="animated fadeIn">
    <!-- 使用组件，绑定数据到引用组件的标题 -->
    <!-- https://alligator.io/vuejs/add-v-model-support/ -->
    <e-add :caption="captionTitle" :no-disabled="false" :res-info="msg" v-model="items" v-on:customFunc="addItem">
      <!-- 替换引用组件的插槽数据 -->
      <h3 slot="form-title">添加数据</h3>
    </e-add>
  </div>
</template>

<script>
// 导入添加模板
import eAdd from './Form.vue'

export default {
  name: 'emergencyAdd',
  components: { eAdd },
  data: () => {
    return {
      captionTitle: '添加数据',
      msg: '添加消息内容',
      id: '0',
      items: {
        no: '',
        capital: '',
        name: '',
        extinguishing: '',
        oilfence: '',
        protection: '',
        skin: '',
        eye: '',
        inhalation: '',
        ingestion: '',
        submit: '添加'
      }
    }
  },
  methods: {
    // 组件自定义方法customFunc覆写
    addItem() {
      // alert(this.items.capital)
      this.msg = '添加成功后的返回消息'
    }
  },
  created() {
    this.id = this.$route.params.eId
  }
}
</script>
