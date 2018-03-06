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
                        <b-form-group id="fd-1" label="用户工号" label-for="input-account">
                            <b-form-input id="input-account" type="text" disabled="true" v-model="items.account">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-2" label="用户密码" label-for="input-password">
                            <b-form-input id="input-password" type="text" placeholder="请输入用户密码" v-model="items.password">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-3" label="用户名称" label-for="input-user">
                            <b-form-input id="input-user" type="text" placeholder="请输入用户名称" v-model="items.user">
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
  name: 'userEdit',
  data: () => {
    return {
      captionTitle: '编辑数据',
      msg: '更新消息内容',
      infoModal: false,
      items: {
        id: '0',
        account: '',
        password: '',
        user: ''
      }
    }
  },
  methods: {
    // 组件自定义方法onSubmit覆写
    updateItem() {
      // 发送客户端更新请求
      this.updateLoginInfoItem(this.items)
      // 打开模态对话框
      this.infoModal = true
    },
    updateLoginInfoItem(item) {
      // do something
      this.$http
        .post('/api/login-info/update', item)
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
    getLoginInfoItem(id) {
      // do something
      this.$http
        .get(`/api/login-info/${id}`) // 模板字符串
        .then(response => {
          console.log(response)
          // 绑定数据
          this.items.account = response.data.account
          this.items.password = response.data.password
          this.items.user = response.data.user
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
      this.$router.push({ name: 'userView' })
    }
  },
  created() {
    this.items.id = this.$route.params.lId
    // 获取修改数据
    this.getLoginInfoItem(this.items.id)
  }
}
</script>
