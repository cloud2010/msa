<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="9">
        <b-card header="更新数据">
          <slot name="form-title">
            <h4>更新数据</h4>
          </slot>
          <hr>
          <b-form>
            <b-form-group id="fd-1" label="项目编号" label-for="input-no">
              <b-form-input id="input-no" type="text" placeholder="请输入项目编号" disabled="true" v-model="items.no">
              </b-form-input>
            </b-form-group>
            <!-- <b-form-group id="fd-2" label="污染类别" label-for="input-capital">
              <b-form-input id="input-capital" type="text" placeholder="请输入污染类别" v-model="items.capital">
              </b-form-input>
            </b-form-group> -->
            <b-form-group id="fd-3" label="中文名" label-for="input-name">
              <b-form-input id="input-name" type="text" placeholder="请输入中文名" v-model="items.name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-4" label="灭火方法" label-for="input-extinguishing">
              <b-form-textarea :rows="3" id="input-extinguishing" type="text" placeholder="请输入" v-model="items.extinguishing">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="fd-5" label="围油栏布设" label-for="input-oilfence">
              <b-form-textarea :rows="3" id="input-oilfence" type="text" placeholder="请输入" v-model="items.oilfence">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="fd-6" label="应急处置人员个人防护" label-for="input-protection">
              <b-form-textarea :rows="3" id="input-protection" type="text" placeholder="请输入" v-model="items.protection">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="fd-7" label="急救-皮肤接触" label-for="input-skin">
              <b-form-textarea :rows="3" id="input-skin" type="text" placeholder="请输入" v-model="items.skin">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="fd-8" label="急救-眼睛接触" label-for="input-eye">
              <b-form-textarea :rows="3" id="input-eye" type="text" placeholder="请输入" v-model="items.eye">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="fd-9" label="急救-吸入" label-for="input-inhalation">
              <b-form-textarea :rows="3" id="input-inhalation" type="text" placeholder="请输入" v-model="items.inhalation">
              </b-form-textarea>
            </b-form-group>
            <b-form-group id="fd-10" label="急救-食入" label-for="input-ingestion">
              <b-form-textarea :rows="3" id="input-ingestion" type="text" placeholder="请输入" v-model="items.ingestion">
              </b-form-textarea>
            </b-form-group>
            <b-button variant="primary" @click="updateItem">更新</b-button>
            <b-button type="reset" variant="danger">重置</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <!-- Modal Component -->
    <b-modal title="提示" class="modal-primary" centered="true" @ok="handleOk" ok-title="确定" cancel-title="取消" v-model="infoModal">
      <p>{{msg}}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'emergencyEdit',
  data: () => {
    return {
      captionTitle: '编辑数据',
      msg: '更新消息内容',
      infoModal: false,
      items: {
        id: '0',
        no: '',
        capital: '',
        name: '',
        extinguishing: '',
        oilfence: '',
        protection: '',
        skin: '',
        eye: '',
        inhalation: '',
        ingestion: ''
      }
    }
  },
  methods: {
    // 组件自定义方法onSubmit覆写
    updateItem() {
      // 发送客户端更新请求
      this.updateEmergencyItem(this.items)
      // 打开模态对话框
      this.infoModal = true
    },
    updateEmergencyItem(item) {
      // do something
      this.$http
        .post('/api/emergency/update', item)
        .then(response => {
          console.log(response)
          // 绑定数据到提示框
          this.msg = response.data.info
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 向服务端请求数据
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
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault()
      this.infoModal = false
      // 命名路由跳转
      this.$router.push({ name: 'emergencyView' })
    }
  },
  created() {
    this.items.id = this.$route.params.eId
    // 获取修改数据
    this.getEmergencyItem(this.items.id)
  }
}
</script>
