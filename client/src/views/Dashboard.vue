<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="8">
        <b-card :header="caption">
          <b-alert show variant="primary">欢迎登陆监管支持系统！</b-alert>
          <hr>
          <b-row>
            <b-col cols="9">
              <b-alert show variant="success">危险货物数据库版本：{{items.dVer}}</b-alert>
            </b-col>
            <b-col cols="3">
              <b-button class="btn-block" v-show="btnIsShow" type="button" size="lg" variant="primary" @click="publishDModal = true">发布危险货物数据库</b-button>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col cols="9">
              <b-alert show variant="success">应急处置支持数据库版本：{{items.eVer}}</b-alert>
            </b-col>
            <b-col cols="3">
              <b-button class="btn-block" v-show="btnIsShow" type="button" size="lg" variant="primary" @click="publishEModal = true">发布应急处置支持数据库</b-button>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col cols="9">
              <b-alert show variant="success">液货船作业检查数据库版本：{{items.cVer}}</b-alert>
            </b-col>
            <b-col cols="3">
              <b-button class="btn-block" v-show="btnIsShow" type="button" size="lg" variant="primary" @click="publishCModal = true">发布液货船作业检查数据库</b-button>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col cols="9">
              <b-alert show variant="success">用户数据库版本：{{items.lVer}}</b-alert>
            </b-col>
            <b-col cols="3">
              <b-button class="btn-block" v-show="btnIsShow" type="button" size="lg" variant="primary" @click="publishLModal = true">发布用户数据库</b-button>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col cols="8">
              <!-- <b-button type="button" variant="success" @click="backupModal = true">备份全部数据库</b-button> -->
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-img fluid rounded block src="static/img/apk-link.png" />
        <h4 class="ml-2"><b>扫描上方二维码下载客户端</b></h4>
      </b-col>
    </b-row>
    <!-- Modal Component -->
    <b-modal title="发布数据库" class="modal-primary" centered="true" ok-title="发布" cancel-title="取消" v-model="publishCModal" @ok="publish('cargoship', $event.target)">
      <p>{{publishCInfo}}</p>
    </b-modal>
    <b-modal title="发布数据库" class="modal-primary" centered="true" ok-title="发布" cancel-title="取消" v-model="publishDModal" @ok="publish('dbInfo', $event.target)">
      <p>{{publishDInfo}}</p>
    </b-modal>
    <b-modal title="发布数据库" class="modal-primary" centered="true" ok-title="发布" cancel-title="取消" v-model="publishLModal" @ok="publish('loginInfo', $event.target)">
      <p>{{publishLInfo}}</p>
    </b-modal>
    <b-modal title="发布数据库" class="modal-primary" centered="true" ok-title="发布" cancel-title="取消" v-model="publishEModal" @ok="publish('emergency', $event.target)">
      <p>{{publishEInfo}}</p>
    </b-modal>
    <b-modal title="备份数据库" class="modal-success" centered="true" ok-title="备份" cancel-title="取消" v-model="backupModal" @ok="backupModal = false" ok-variant="success">
      <p>{{backupInfo}}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data: () => {
    return {
      items: {
        eVer: '',
        cVer: '',
        dVer: '',
        lVer: ''
      },
      caption: '发布数据库',
      publishCModal: false,
      publishDModal: false,
      publishLModal: false,
      publishEModal: false,
      backupModal: false,
      publishCInfo: '是否发布液货船作业检查数据库？',
      publishDInfo: '是否发布危险货物数据库？',
      publishLInfo: '是否发布用户数据库？',
      publishEInfo: '是否发布应急处置支持数据库？',
      backupInfo: '是否备份全部数据库？'
    }
  },
  // 计算属性动态更新 value
  computed: {
    btnIsShow: function() {
      if (this.$store.state.user.roles.indexOf('admin') >= 0) {
        return true
      } else {
        // 非管理员禁止相关按钮显示
        return false
      }
    }
  },
  methods: {
    // 向服务端请求数据
    getDatabaseInfo() {
      // do something
      this.$http
        .get('/api/export/ver-check')
        .then(response => {
          console.log(response)
          // 绑定数据
          // this.items = response.data
          response.data.forEach(element => {
            switch (element.name) {
              case 'emergency':
                this.items.eVer = new Date(element.timestamp).toLocaleString()
                break
              case 'cargoship':
                this.items.cVer = new Date(element.timestamp).toLocaleString()
                break
              case 'dbInfo':
                this.items.dVer = new Date(element.timestamp).toLocaleString()
                break
              case 'loginInfo':
                this.items.lVer = new Date(element.timestamp).toLocaleString()
                break
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 发布对应数据库
    publish(dbname, button) {
      // alert(dbname)
      this.$http
        .get(`/api/export/publish/${dbname}`)
        .then(response => {
          alert(response.data.info)
          this.getDatabaseInfo()
        })
        .catch(error => {
          alert(error)
        })
      this.publishCModal = false
      this.publishDModal = false
      this.publishEModal = false
      this.publishLModal = false
    }
  },
  created() {
    this.getDatabaseInfo()
  }
}
</script>
