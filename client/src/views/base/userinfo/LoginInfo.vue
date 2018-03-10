<template>
  <div class="animated fadeIn">
    <b-card header-tag="header">
      <div slot="header">
        <i class="fa fa-align-justify"></i>
        <strong>{{caption}}</strong>
        <div class="card-actions">
          <!-- 命名路由 -->
          <strong>
            <b-link :to="{ name: 'userAdd' }">添加</b-link>
          </strong>
        </div>
      </div>
      <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
        <template slot="edit_details" slot-scope="row">
          <b-button :to="{ name: 'userEdit', params: { lId: row.item._id }}" size="sm" class="mr-2" variant="success">
            修改
          </b-button>
        </template>
        <template slot="del_details" slot-scope="row">
          <b-button size="sm" @click.stop="info(row.item.user, row.item._id, $event.target)" class="mr-2" variant="danger">
            删除
          </b-button>
        </template>
      </b-table>
      <nav>
        <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="前一页" next-text="后一页" hide-goto-end-buttons/>
      </nav>
    </b-card>
    <!-- Info modal -->
    <b-modal id="modalInfo" ref="modal" class="modal-danger" @ok="handleDel" @hide="resetModal" :title="modalInfo.title" ok-title="确定" ok-variant="danger" cancel-title="取消">
      <p class="lead">{{ modalInfo.content }}</p>
      <hr>
      <p>提示：请尽量在做删除操作前备份数据库</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'logininfo',
  props: {
    caption: {
      type: String,
      default: '用户数据'
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      items: {},
      fields: [
        { key: 'account', label: '用户工号', sortable: true },
        { key: 'password', label: '用户密码' },
        { key: 'user', label: '用户名称' },
        { key: 'edit_details', label: '修改' },
        { key: 'del_details', label: '删除' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0,
      modalInfo: { id: 0, title: '', content: '' }
    }
  },
  methods: {
    // 向服务端请求数据
    getLoginInfo() {
      // do something
      this.$http
        .get('/api/login-info')
        .then(response => {
          console.log(response)
          // 绑定数据
          this.items = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 向服务端请求删除指定数据
    delLoginItem(id) {
      // do something
      this.$http
        .get(`/api/login-info/del/${id}`)
        .then(response => {
          // 反馈响应数据
          alert(response.data.info)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 读取元素个数用于分页
    getRowCount(items) {
      return items.length
    },
    // 弹出删除确认框
    info(item, index, button) {
      this.modalInfo.id = index
      this.modalInfo.title = `删除项人员: ${item}`
      // this.modalInfo.content = JSON.stringify(item, null, 2)
      this.modalInfo.content = '是否确定删除?'
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    // 确认删除
    handleDel(evt) {
      // Prevent modal from closing
      evt.preventDefault()
      // alert(`${this.modalInfo.id} 删除成功`)
      this.delLoginItem(this.modalInfo.id)
      this.$refs.modal.hide()
      // 刷新页面重新绑定表格数据
      this.getLoginInfo()
    },
    resetModal() {
      this.modalInfo.id = 0
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    }
  },
  /**
   * 不要在选项属性或回调上使用箭头函数，
   * 比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。
   * 因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例，
   * 经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。
   */
  // 钩子函数created期间读取数据
  created() {
    this.getLoginInfo()
  },
  mounted() {
    // do something
  }
}
</script>
