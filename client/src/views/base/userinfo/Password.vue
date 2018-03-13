<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="6">
                <b-card header="修改密码">
                    <slot name="form-title">
                        <h4>修改密码</h4>
                    </slot>
                    <hr>
                    <b-form>
                        <b-form-group id="fd-1" label="用户工号" label-for="input-account">
                            <b-form-input id="input-account" type="text" disabled="true" v-model="items.account">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-2" label="用户名称" label-for="input-user">
                            <b-form-input id="input-user" type="text" disabled="true" placeholder="请输入用户名称" v-model="items.user">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-3" label="新密码" label-for="input-password">
                            <b-form-input id="input-password-1" :state="passwdState" aria-describedby="inputLiveFeedback-passwd" type="password" placeholder="请输入用户密码" v-model.trim="items.password">
                            </b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback-passwd">
                                <!-- This will only be shown if the preceeding input has an invalid state -->
                                请至少输入6位以上密码
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group id="fd-4" label="再次确认密码" label-for="input-password">
                            <b-form-input id="input-password-2" :state="confirmState" aria-describedby="inputLiveFeedback-confirm" type="password" placeholder="请再次输入密码" v-model.trim="passwordConfirm">
                            </b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback-confirm">
                                <!-- This will only be shown if the preceeding input has an invalid state -->
                                两次密码输入不一致
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-button variant="primary" @click="updateItem">修改</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
        <!-- Modal Component -->
        <b-modal title="更新密码" class="modal-primary" centered="true" @ok="handleOk" ok-title="确定" cancel-title="取消" v-model="infoModal">
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
      },
      passwordConfirm: ''
    }
  },
  computed: {
    // 计算方法验证密码输入正确性
    passwdState() {
      return this.items.password.length >= 6 ? true : false
    },
    confirmState() {
      return this.items.password === this.passwordConfirm ? true : false
    }
  },
  methods: {
    // 组件自定义方法onSubmit覆写
    updateItem() {
      if (
        this.items.password.length >= 6 &&
        this.items.password === this.passwordConfirm
      ) {
        // 发送客户端更新请求
        this.updateLoginInfoItem(this.items)
        // 打开模态对话框
        this.infoModal = true
      } else {
        alert('密码输入不正确，请根据提示重新输入！')
      }
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
          // 绑定账号和用户名数据
          this.items.account = response.data.account
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
      this.$router.push({ name: 'Dashboard' })
    }
  },
  created() {
    // 获取用户令牌
    this.items.id = this.$store.state.user.token
    // 获取对应用户数据
    this.getLoginInfoItem(this.items.id)
  }
}
</script>
