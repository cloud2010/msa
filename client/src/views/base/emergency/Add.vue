<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="9">
        <b-card header="添加数据">
          <slot name="form-title">
            <h4>添加数据</h4>
          </slot>
          <hr>
          <!-- 提交按钮方法绑定 -->
          <b-form @submit="addItem">
            <b-form-group id="fd-1" label="项目编号" :description="`系统自动生成的编号为：${items.no}`" label-for="input-no">
              <b-form-input id="input-no" type="number" placeholder="请输入项目编号" required="true" v-model="items.no">
              </b-form-input>
            </b-form-group>
            <!-- <b-form-group id="fd-2" label="污染类别" label-for="input-capital">
              <b-form-input id="input-capital" type="text" placeholder="请输入污染类别" required="true" v-model="items.capital">
              </b-form-input>
            </b-form-group> -->
            <b-form-group id="fd-3" label="中文名" label-for="input-name">
              <b-form-select id="input-name" required :options="names" v-model="items.name">
              </b-form-select>
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
            <b-button type="submit" variant="primary">添加</b-button>
            <b-button type="reset" variant="danger">重置</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <!-- Modal Component -->
    <b-modal title="提示" class="modal-primary" centered="true" ok-title="确定" cancel-title="取消" v-model="infoModal" @ok="infoModal = false">
      <p>{{msg}}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'emergencyAdd',
  data: () => {
    return {
      msg: '添加消息内容',
      // 货物中文名称
      names: [{ text: '请选择', value: null }],
      items: {
        no: '',
        capital: '',
        name: null,
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
    // 覆写提交事件
    addItem(evt) {
      evt.preventDefault()
      // 发送客户端添加请求
      this.addEmergencyItem(this.items)
      // 打开模态对话框
      // alert(JSON.stringify(this.items))
      this.infoModal = true
      // 添加完成后命名路由跳转
      this.$router.push({ name: 'emergencyView' })
    },
    addEmergencyItem(item) {
      // 发送异步请求
      this.$http
        .post('/api/emergency/add', item)
        .then(response => {
          // console.log(response)
          // 绑定数据到提示框
          this.msg = response.data.info
          alert(this.msg)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getMaxNumber() {
      // 发送异步请求
      this.$http
        .get('/api/emergency/max')
        .then(response => {
          // 绑定数据
          this.items.no = response.data.maxNum + 1
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取货物名称绑定下拉框
    getDbinfoNames() {
      // 发送异步请求
      this.$http
        .get('/api/db-info/names')
        .then(response => {
          // 绑定数据
          this.names = this.names.concat(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    this.getMaxNumber()
    this.getDbinfoNames()
  }
}
</script>
