<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card class="p-4">
              <b-card-body>
                <b-row class="justify-content-center">
                  <h2>监管支持系统登录</h2>
                </b-row>
                <hr>
                <b-form @submit="handleLogin">
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <input type="text" class="form-control" required placeholder="用户名" v-model.trim="userInfo.account">
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <input type="password" class="form-control" required placeholder="密码" v-model.trim="userInfo.password">
                  </b-input-group>
                  <b-row class="justify-content-center">
                    <b-button type="submit" variant="primary">登录</b-button>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
      <!-- Modal Component -->
      <b-modal title="提示" class="modal-primary" centered="true" @ok="handleOk" ok-title="确定" cancel-title="取消" v-model="infoModal">
        <p>{{msg}}</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      msg: '更新消息内容',
      infoModal: false,
      userInfo: { account: '', password: '' }
    }
  },
  methods: {
    handleLogin(evt) {
      evt.preventDefault()
      this.$store
        .dispatch('Login', this.userInfo)
        .then(() => {
          // 读取登录验证状态码
          // alert(this.$store.state.user.code)
          switch (this.$store.state.user.code) {
            case 0: // 登录成功
              // 命名路由跳转
              localStorage.setItem('msa_username', this.$store.state.user.name)
              this.$router.push({ path: '/dashboard' })
              break
            case 1:
              this.msg = '密码错误'
              this.infoModal = true
              break
            case 2:
              this.msg = '用户不存在'
              this.infoModal = true
              break
            case -1:
              this.msg = '用户验证失败，请重试'
              this.infoModal = true
              break
          }
        })
        .catch(() => {
          // alert(this.$store.state.user.token)
          this.msg = '登录失败'
          this.infoModal = true
        })
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault()
      this.infoModal = false
      // 命名路由跳转
      // this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>
