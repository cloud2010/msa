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
            <b-form-group id="fd-1" label="项目名称" label-for="input-proName">
              <b-form-input id="input-proName" type="text" placeholder="请输入项目名称" disabled="true" v-model="items.proName">
              </b-form-input>
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
  name: 'cargoshipEdit',
  data: () => {
    return {
      captionTitle: '编辑数据',
      msg: '更新消息内容',
      id: '0',
      infoModal: false,
      items: {
        proName: '',
        proTitle: '',
        part: '',
        proContent: {
          proTitle: '',
          checkPoint: [],
          checkReason: [],
          weakness: '',
          weaknessItem: []
        }
      }
    }
  },
  methods: {
    // 组件自定义方法onSubmit覆写
    updateItem() {
      // 发送客户端更新请求
      this.updateCargoshipItem(JSON.stringify(this.items))
      // 打开模态对话框
      this.infoModal = true
    },
    updateCargoshipItem(item) {
      // do something
      this.$http
        .post(`/api/cargoship/update/${item}`)
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
    getCargoshipItem(id) {
      // do something
      this.$http
        .get(`/api/cargoship/${id}`) // 模板字符串
        .then(response => {
          console.log(response)
          // 绑定数据
          this.items.no = response.data.Number
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
      this.$router.push({ name: 'cargoshipView' })
    }
  },
  created() {
    this.id = this.$route.params.eId
    // 获取修改数据
    this.getCargoshipItem(this.id)
  }
}
</script>
