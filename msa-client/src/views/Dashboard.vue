<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="8">
        <b-card :header="caption">
          <b-alert show variant="primary">欢迎登陆监管支持系统！</b-alert>
          <b-row>
            <b-col cols="6">
              <b-button type="button" variant="primary" @click="publishModal = true">发布数据库</b-button>
              <b-button type="button" variant="success" @click="backupModal = true">备份数据库</b-button>
            </b-col>
            <b-col cols="6">
              <small class="float-right mt-2"><b>当前时间：{{datetime}}</b></small>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <!-- Modal Component -->
    <b-modal title="发布数据库" class="modal-primary" centered="true" ok-title="发布" cancel-title="取消" v-model="publishModal" @ok="publishModal = false">
      <p>{{publishInfo}}</p>
    </b-modal>
    <b-modal title="备份数据库" class="modal-success" centered="true" ok-title="发布" cancel-title="取消" v-model="backupModal" @ok="backupModal = false" ok-variant="success">
      <p>{{backupInfo}}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data: () => {
    return {
      caption: '控制台',
      publishModal: false,
      backupModal: false,
      publishInfo: '发布数据库对话框测试',
      backupInfo: '备份数据库对话框测试',
      datetime: new Date().toString()
    }
  }
}
</script>
