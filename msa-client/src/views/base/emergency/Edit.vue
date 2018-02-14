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
