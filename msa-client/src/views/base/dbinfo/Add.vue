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
          <b-form @submit.prevent="addItem">
            
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
  name: 'dbinfoAdd',
  data: () => {
    return {
      msg: '添加消息内容',
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
        proName: '',
        proTitle: '',
        part: null,
        proContent: {
          checkPoint: ['请输入检查要点'],
          checkReason: [
            {
              reasonName: '请输入标题',
              item: '请输入内容'
            }
          ],
          weaknessItem: ['请输入常见缺陷']
        }
      }
    }
  },
  methods: {
    // 嵌入列表的添加删除及修改方法
    addCp() {
      this.items.proContent.checkPoint.push('请输入检查要点')
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
      this.items.proContent.weaknessItem.push('请输入常见缺陷')
    },
    delWeak(index) {
      this.items.proContent.weaknessItem.splice(index, 1)
    },
    // 覆写提交事件
    addItem(evt) {
      evt.preventDefault()
      // 发送客户端添加请求
      this.addDbinfoItem(this.items)
      // 打开添加完成后信息反馈对话框
      // alert(JSON.stringify(this.items))
      // this.infoModal = true
      // 添加完成后命名路由跳转
      this.$router.push({ name: 'dbinfoView' })
    },
    addDbinfoItem(item) {
      // 发送异步请求
      this.$http
        .post('/api/db-info/add', item)
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
