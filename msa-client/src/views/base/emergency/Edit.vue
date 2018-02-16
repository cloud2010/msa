<template>
  <div class="animated fadeIn">
    <!-- 使用组件，绑定数据到引用组件的标题 -->
    <!-- https://alligator.io/vuejs/add-v-model-support/ -->
    <e-edit :caption="captionTitle" :no-disabled="true" :res-info="msg" v-model="items" v-on:customFunc="updateItem">
      <!-- 替换引用组件的插槽数据 -->
      <h3 slot="form-title">编辑项目编号：{{id}}</h3>
    </e-edit>
  </div>
</template>

<script>
// 导入添加模板
import eEdit from './Form.vue'

export default {
  name: 'emergencyEdit',
  components: { eEdit },
  data: () => {
    return {
      captionTitle: '编辑数据',
      msg: '更新消息内容',
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
        submit: '更新'
      }
    }
  },
  methods: {
    // 组件自定义方法onSubmit覆写
    updateItem() {
      // alert(this.items.capital)
      this.msg = this.items.capital
    },
    // 向服务端请求cargoship数据
    getEmergencyItem(id) {
      // do something
      this.$http
        .get(`/api/emergency/${id}`) // 模板字符串
        .then(response => {
          console.log(response)
          // 绑定数据
          this.items.no = response.data.Number
          this.items.capital = response.data.capital
          this.items.name = response.data.ChineseName
          this.items.extinguishing = response.data.extinguishing
          this.items.oilfence = response.data.oilfence
          this.items.protection = response.data.PersonalProtection
          this.items.skin = response.data.skinExposure
          this.items.eye = response.data.eyeExposure
          this.items.inhalation = response.data.inhalation
          this.items.ingestion = response.data.ingestion
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    this.id = this.$route.params.eId
    // 获取修改数据
    this.getEmergencyItem(this.id)
  }
}
</script>
