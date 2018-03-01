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
            <b-form-group id="fd-2" label="项目标题" label-for="input-proTitle">
              <b-form-input id="input-proTitle" type="text" placeholder="请输入项目标题" required v-model="items.proTitle">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-3" label="部分" label-for="input-part">
              <b-form-select id="input-part" :options="parts" v-model="items.part">
              </b-form-select>
            </b-form-group>
            <b-form-group id="fd-4" label="检查要点">
              <b-form-input :ref="'fd-cp-' + index" v-for="(i, index) in items.proContent.checkPoint" :key="index" type="text" :value="i">
              </b-form-input>
            </b-form-group>
            <label><b>检查依据</b></label>
              <div v-for="(i, index) in items.proContent.checkReason" :key="index">
                <b-form-group :label="'依据 ' + (index + 1)" :label-for="'fd-cr-reason-' + index">
                  <b-form-input :ref="'fd-cr-reason-' + index" type="text" :value="i.reasonName">
                  </b-form-input>
                </b-form-group>
                <b-form-group :label="'内容'" :label-for="'fd-cr-item-' + index">
                <b-form-textarea :rows="3" :ref="'fd-cr-item-' + index" type="text" :value="i.item">
                </b-form-textarea>
                </b-form-group>
              </div>
           
            <b-form-group id="fd-6" label="常见缺陷">
              <b-form-input :ref="'fd-weak-' + index" v-for="(i, index) in items.proContent.weaknessItem" :key="index" type="text" :value="i">
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
      // 数据绑定 part 字段
      parts: [
        { text: '请选择', value: null },
        'partA',
        'partB',
        'partC',
        'partD'
      ],
      items: {
        proName: '',
        proTitle: '',
        part: '',
        proContent: {
          checkPoint: [],
          checkReason: [],
          weaknessItem: []
        }
      }
    }
  },
  methods: {
    // 组件自定义方法onSubmit覆写
    updateItem() {
      // 发送客户端更新请求
      // this.updateCargoshipItem(JSON.stringify(this.items))
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
          // console.log(response)
          // 绑定数据
          this.items.proName = response.data.proName
          this.items.proTitle = response.data.proTitle
          this.items.part = response.data.part
          this.items.proContent.checkPoint = response.data.proContent.checkPoint
          this.items.proContent.checkReason = response.data.proContent.checkReason
          this.items.proContent.weaknessItem = response.data.proContent.weaknessItem
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
    this.id = this.$route.params.cId
    // 获取修改数据
    this.getCargoshipItem(this.id)
  }
}
</script>
