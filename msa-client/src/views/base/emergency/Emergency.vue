<template>
  <div class="animated fadeIn">
    <b-card header-tag="header">
      <div slot="header">
        <i class="fa fa-align-justify"></i> <strong>{{caption}}</strong>
        <div class="card-actions">
          <!-- 命名路由 -->
          <strong><b-link :to="{ name: 'emergencyAdd' }">添加</b-link></strong>
        </div>
      </div>
      <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
        <template slot="show_details" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="primary">
            详细内容
          </b-button>
        </template>
        <template slot="edit_details" slot-scope="row">
          <b-button :to="{ name: 'emergencyEdit', params: { eId: row.item.Number }}" size="sm" class="mr-2" variant="success">
            修改
          </b-button>
        </template>
        <template slot="del_details" slot-scope="row">
          <b-button size="sm" class="mr-2" variant="danger">
            删除
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3">
                <b>1、灭火方法:</b>
              </b-col>
              <b-col sm="9">
                <p>{{ row.item.extinguishing }}</p>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3">
                <b>2、围油栏布设:</b>
              </b-col>
              <b-col sm="9">
                <p>{{ row.item.oilfence }}</p>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3">
                <b>3、应急处置人员个人防护:</b>
              </b-col>
              <b-col sm="9">
                <p>{{ row.item.PersonalProtection }}</p>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3">
                <b>4、急救-皮肤接触:</b>
              </b-col>
              <b-col sm="9">
                <p>{{ row.item.skinExposure }}</p>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3">
                <b>5、急救-眼睛接触:</b>
              </b-col>
              <b-col sm="9">
                <p>{{ row.item.eyeExposure }}</p>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3">
                <b>6、急救-吸入:</b>
              </b-col>
              <b-col sm="9">
                <p>{{ row.item.inhalation }}</p>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3">
                <b>7、急救-食入:</b>
              </b-col>
              <b-col sm="9">
                <p>{{ row.item.ingestion }}</p>
              </b-col>
            </b-row>
            <b-button size="sm" variant="primary" @click="row.toggleDetails">隐藏</b-button>
          </b-card>
        </template>
      </b-table>
      <nav>
        <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="前一页" next-text="后一页" hide-goto-end-buttons/>
      </nav>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'emergency',
  props: {
    caption: {
      type: String,
      default: '应急处置支持数据'
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
        { key: 'Number', label: '编号' },
        { key: 'capital', label: '污染类别' },
        { key: 'ChineseName', label: '中文名' },
        { key: 'show_details', label: '详细内容' },
        { key: 'edit_details', label: '修改' },
        { key: 'del_details', label: '删除' }
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: 0
    }
  },
  methods: {
    // 向服务端请求cargoship数据
    getEmergencyInfo () {
      // do something
      this.$http
        .get('/api/emergency')
        .then(response => {
          console.log(response)
          // 绑定数据
          this.items = response.data.Emergency
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 读取元素个数用于分页
    getRowCount (items) {
      return items.length
    }
  },
  /**
   * 不要在选项属性或回调上使用箭头函数，
   * 比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。
   * 因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例，
   * 经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。
   */
  // 钩子函数created期间读取数据
  created () {
    this.getEmergencyInfo()
  },
  mounted () {
    // do something
  }
}
</script>
