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
                        <b-form>
                            <b-form-group id="fd-1" label="用户工号" label-for="input-account">
                                <b-form-input id="input-account" type="number" placeholder="请输入用户工号" required v-model="items.account">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="fd-2" label="用户密码" label-for="input-password">
                                <b-form-input id="input-password" type="text" placeholder="请输入用户密码" required v-model="items.password">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="fd-3" label="用户名称" label-for="input-user">
                                <b-form-input id="input-user" type="text" placeholder="请输入用户名称" required v-model="items.user">
                                </b-form-input>
                            </b-form-group>
                        </b-form>
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
  name: 'userAdd',
  data: () => {
    return {
      msg: '添加消息内容',
      items: {
        account: '',
        password: '',
        user: '',
        roles: ['viewer']
      }
    }
  },
  methods: {
    // 覆写提交事件
    addItem(evt) {
      evt.preventDefault()
      // 发送客户端添加请求
      this.addLoginInfoItem(this.items)
      // 打开模态对话框
      // alert(JSON.stringify(this.items))
      this.infoModal = true
      // 添加完成后命名路由跳转
      this.$router.push({ name: 'userView' })
    },
    addLoginInfoItem(item) {
      // 发送异步请求
      this.$http
        .post('/api/login-info/add', item)
        .then(response => {
          console.log(response)
          // 绑定数据到提示框
          this.msg = response.data.info
          alert(this.msg)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {}
}
</script>
