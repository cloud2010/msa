<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="10">
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
            <hr>
            <label>检查要点</label>
            <b-button @click.stop="addCp()" size="sm" variant="success" class="mb-1 ml-1">
              添加一项检查要点
            </b-button>
            <b-table :items="items.proContent.checkPoint" :fields="fields.cp" :small="small" responsive="sm">
              <!-- A custom column -->
              <template slot="title" slot-scope="data">
                <b-form-input id="input-cp-item" type="text" v-model="items.proContent.checkPoint[data.index]">
                </b-form-input>
              </template>
              <template slot="del_item" slot-scope="data">
                <b-button @click.stop="delCp(data.index)" size="sm" variant="danger">
                  删除
                </b-button>
              </template>
            </b-table>
            <hr>
            <label>检查依据</label>
            <b-button @click.stop="addCr()" size="sm" variant="success" class="mb-1 ml-1">
              添加一项依据点
            </b-button>
            <b-table :items="items.proContent.checkReason" :fields="fields.cr" :small="small" responsive="sm">
              <template slot="edit_details" slot-scope="row">
                <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="primary">
                  详细修改
                </b-button>
              </template>
              <template slot="del_details" slot-scope="row">
                <b-button @click.stop="delCr(row.index)" size="sm" class="mr-2" variant="danger">
                  删除
                </b-button>
              </template>
              <template slot="row-details" slot-scope="row">
                <b-form-group horizontal label="依据点" label-for="input-cr-name">
                  <b-form-input id="input-cr-name" type="text" v-model="row.item.reasonName">
                  </b-form-input>
                </b-form-group>
                <b-form-group horizontal label="内容" label-for="input-cr-item">
                  <b-form-textarea :rows="5" id="input-cr-item" type="text" v-model="row.item.item">
                  </b-form-textarea>
                </b-form-group>
                <b-button size="sm" variant="primary" @click="row.toggleDetails">确定</b-button>
              </template>
            </b-table>
            <hr>
            <label>常见缺陷</label>
            <b-button @click.stop="addWeak()" size="sm" variant="success" class="mb-1 ml-1">
              添加一项缺陷点
            </b-button>
            <b-table :items="items.proContent.weaknessItem" :fields="fields.weak" :small="small" responsive="sm">
              <!-- A custom column -->
              <template slot="title" slot-scope="data">
                <b-form-input id="input-weak-item" type="text" v-model="items.proContent.weaknessItem[data.index]">
                </b-form-input>
              </template>
              <template slot="del_item" slot-scope="data">
                <b-button @click.stop="delWeak(data.index)" size="sm" variant="danger">
                  删除
                </b-button>
              </template>
            </b-table>
            <b-button variant="primary" @click="updateItem">更新</b-button>
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
      small: true,
      infoModal: false,
      // 数据绑定 part 字段
      parts: [
        { text: '请选择', value: null },
        'partA',
        'partB',
        'partC',
        'partD'
      ],
      fields: {
        cp: [
          { key: 'title', label: '要点' },
          { key: 'del_item', label: '删除' }
        ],
        cr: [
          { key: 'reasonName', label: '依据点' },
          { key: 'edit_details', label: '编辑' },
          { key: 'del_details', label: '删除' }
        ],
        weak: [
          { key: 'title', label: '缺陷点' },
          { key: 'del_item', label: '删除' }
        ]
      },
      items: {
        id: '0',
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
    // 嵌入列表的添加删除及修改方法
    addCp() {
      this.items.proContent.checkPoint.push('请输入内容')
    },
    delCp(index) {
      this.items.proContent.checkPoint.splice(index, 1)
    },
    addCr() {
      this.items.proContent.checkReason.push({
        reasonName: '请输入标题',
        item: '请输入内容'
      })
    },
    delCr(index) {
      this.items.proContent.checkReason.splice(index, 1)
    },
    addWeak() {
      this.items.proContent.weaknessItem.push('请输入内容')
    },
    delWeak(index) {
      this.items.proContent.weaknessItem.splice(index, 1)
    },
    // 组件自定义方法onSubmit覆写
    updateItem() {
      // 发送客户端更新请求
      this.updateCargoshipItem(this.items)
      // this.msg = JSON.stringify(this.items)
      // 打开模态对话框
      this.infoModal = true
    },
    updateCargoshipItem(item) {
      // do something
      this.$http
        .post('/api/cargoship/update', item)
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
          // 绑定数据
          this.items.proName = response.data.proName
          this.items.proTitle = response.data.proTitle
          this.items.part = response.data.part
          this.items.proContent.checkPoint = response.data.proContent.checkPoint
          this.items.proContent.checkReason =
            response.data.proContent.checkReason
          this.items.proContent.weaknessItem =
            response.data.proContent.weaknessItem
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
    this.items.id = this.$route.params.cId
    // 获取修改数据
    this.getCargoshipItem(this.items.id)
  }
}
</script>
