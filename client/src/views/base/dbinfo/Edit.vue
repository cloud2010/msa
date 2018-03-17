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
            <b-form-group id="fd-1" label="项目编号" label-for="input-number">
              <b-form-input id="input-number" type="text" disabled="true" v-model="items.Number">
              </b-form-input>
            </b-form-group>
            <!-- <b-form-group id="fd-2" label="污染类别" label-for="input-capital">
              <b-form-input id="input-capital" type="text" v-model="items.capital">
              </b-form-input>
            </b-form-group> -->
            <b-form-group id="fd-3" label="联合国编号" label-for="input-Unnum">
              <b-form-input id="input-Unnum" type="text" v-model="items.Unnum">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-4" label="中文名" label-for="input-ChineseName">
              <b-form-input id="input-ChineseName" type="text" v-model="items.ChineseName">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-5" label="分类" label-for="input-classification">
              <b-form-select id="input-classification" :options="classifications" v-model="items.classification">
              </b-form-select>
            </b-form-group>
            <hr>
            <label>
              <b>基础信息</b>
            </label>
            <b-form-group id="fd-6" horizontal label="英文名" label-for="input-EnglishName">
              <b-form-input id="input-EnglishName" type="text" v-model="items.basicInfo.EnglishName">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-7" horizontal label="别名" label-for="input-vulgo">
              <b-form-input id="input-vulgo" type="text" v-model="items.basicInfo.vulgo">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-8" horizontal label="分类" label-for="input-b-classification">
              <b-form-input id="input-b-classification" type="text" disabled="true" v-model="items.classification">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-9" horizontal label="联合国编号" label-for="input-b-Unnum">
              <b-form-input id="input-b-Unnum" type="text" disabled="true" v-model="items.Unnum">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-10" horizontal label="CAS编号" label-for="input-CASNum">
              <b-form-input id="input-CASNum" type="text" v-model="items.basicInfo.CASNum">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-11" horizontal label="污染类别（有毒液体物质）" label-for="input-XYZ">
              <b-form-input id="input-XYZ" type="text" v-model="items.basicInfo.XYZ">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-12" horizontal label="持久性（油类）" label-for="input-persistance">
              <b-form-input id="input-persistance" type="text" v-model="items.basicInfo.persistance">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-13" horizontal label="危害性（IBC）" label-for="input-Harmfulness">
              <b-form-input id="input-Harmfulness" type="text" v-model="items.basicInfo.Harmfulness">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-14" horizontal label="分子式:" label-for="input-formula">
              <b-form-input id="input-formula" type="text" v-model="items.basicInfo.formula">
              </b-form-input>
            </b-form-group>
            <hr>
            <label>
              <b>理化特性</b>
            </label>
            <b-form-group id="fd-15" horizontal label="熔点（凝固点）℃" label-for="input-meltingpoint">
              <b-form-input id="input-meltingpoint" type="text" v-model="items.property.meltingpoint">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-16" horizontal label="沸点℃" label-for="input-boilingpoint">
              <b-form-input id="input-boilingpoint" type="text" v-model="items.property.boilingpoint">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-17" horizontal label="闪点℃" label-for="input-flashingpoint">
              <b-form-input id="input-flashingpoint" type="text" v-model="items.property.flashingpoint">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-18" horizontal label="爆炸上限、下限%" label-for="input-boom">
              <b-form-input id="input-boom" type="text" v-model="items.property.boom">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-19" horizontal label="相对密度(水=1)" label-for="input-density">
              <b-form-input id="input-density" type="text" v-model="items.property.density">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-20" horizontal label="溶解性" label-for="input-dissolution">
              <b-form-input id="input-dissolution" type="text" v-model="items.property.dissolution">
              </b-form-input>
            </b-form-group>
            <hr>
            <label>
              <b>作业要求</b>
            </label>
            <b-form-group id="fd-21" horizontal label="围油栏" label-for="input-oilfence">
              <b-form-input id="input-oilfence" type="text" v-model="items.jobRequirements.oilfence">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-22" horizontal label="应急待命协议（1万总吨以下）" label-for="input-emergencyStandby">
              <b-form-input id="input-emergencyStandby" type="text" v-model="items.jobRequirements.emergencyStandby">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-23" horizontal label="强制预洗" label-for="input-MandatoryPrewash">
              <b-form-input id="input-MandatoryPrewash" type="text" v-model="items.jobRequirements.MandatoryPrewash">
              </b-form-input>
            </b-form-group>
            <hr>
            <label>
              <b>构造要求-化学品</b>
            </label>
            <b-form-group id="fd-24" horizontal label="船型要求（IBC）" label-for="input-IBCType">
              <b-form-input id="input-IBCType" type="text" v-model="items.StructuralRequest.Chemical.IBCType">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-25" horizontal label="舱型要求" label-for="input-TankType">
              <b-form-input id="input-TankType" type="text" v-model="items.StructuralRequest.Chemical.TankType">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-26" horizontal label="液货舱透气要求" label-for="input-ventilating">
              <b-form-input id="input-ventilating" type="text" v-model="items.StructuralRequest.Chemical.ventilating">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-27" horizontal label="液货舱环境控制要求" label-for="input-environmentCtrl">
              <b-form-input id="input-environmentCtrl" type="text" v-model="items.StructuralRequest.Chemical.environmentCtrl">
              </b-form-input>
            </b-form-group>
            <hr>
            <label>
              <b>构造要求-液化气</b>
            </label>
            <b-form-group id="fd-28" horizontal label="船型要求（IBC）" label-for="input-IGCType">
              <b-form-input id="input-IGCType" type="text" v-model="items.StructuralRequest.Liquidgas.IGCType">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-29" horizontal label="是否要求C型独立液货舱" label-for="input-independentTank">
              <b-form-input id="input-independentTank" type="text" v-model="items.StructuralRequest.Liquidgas.independentTank">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-30" horizontal label="液货舱内蒸气空间的控制" label-for="input-steamCtrl">
              <b-form-input id="input-steamCtrl" type="text" v-model="items.StructuralRequest.Liquidgas.steamCtrl">
              </b-form-input>
            </b-form-group>
            <hr>
            <label>
              <b>设备要求-化学品</b>
            </label>
            <b-form-group id="fd-31" horizontal label="电气设备-温度等级要求" label-for="input-I1">
              <b-form-input id="input-I1" type="text" v-model="items.EquipmentRequest.Chemical.I1">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-32" horizontal label="电气设备-设备分类要求" label-for="input-I2">
              <b-form-input id="input-I2" type="text" v-model="items.EquipmentRequest.Chemical.I2">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-33" horizontal label="电气设备-闪点要求" label-for="input-I3">
              <b-form-input id="input-I3" type="text" v-model="items.EquipmentRequest.Chemical.I3">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-34" horizontal label="测量要求（IBC）" label-for="input-IBCMeasurement">
              <b-form-input id="input-IBCMeasurement" type="text" v-model="items.EquipmentRequest.Chemical.IBCMeasurement">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-35" horizontal label="蒸气探测要求" label-for="input-steamDetection">
              <b-form-input id="input-steamDetection" type="text" v-model="items.EquipmentRequest.Chemical.steamDetection">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-36" horizontal label="防火要求" label-for="input-fireproofing">
              <b-form-input id="input-fireproofing" type="text" v-model="items.EquipmentRequest.Chemical.fireproofing">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-37" horizontal label="应急设备要求" label-for="input-emergencyEquipment">
              <b-form-input id="input-emergencyEquipment" type="text" v-model="items.EquipmentRequest.Chemical.emergencyEquipment">
              </b-form-input>
            </b-form-group>
            <hr>
            <label>
              <b>设备要求-液化气</b>
            </label>
            <b-form-group id="fd-38" horizontal label="气体探测要求" label-for="input-gasDetection">
              <b-form-input id="input-gasDetection" type="text" v-model="items.EquipmentRequest.Liquidgas.gasDetection">
              </b-form-input>
            </b-form-group>
            <b-form-group id="fd-39" horizontal label="测量要求（IGC）" label-for="input-IGCMeasurement">
              <b-form-input id="input-IGCMeasurement" type="text" v-model="items.EquipmentRequest.Liquidgas.IGCMeasurement">
              </b-form-input>
            </b-form-group>
            <hr>
            <label><b>IBC 特殊要求及操作要求-化学品</b></label>
            <b-button @click.stop="addChemical()" size="sm" variant="success" class="mb-1 ml-1">
              添加一项要求
            </b-button>
            <b-table :items="items.specialRequest.Chemical.IBCspecialRequest" :fields="fields.chemical" :small="small" responsive="sm">
              <template slot="edit_details" slot-scope="row">
                <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="primary">
                  详细修改
                </b-button>
              </template>
              <template slot="del_details" slot-scope="row">
                <b-button @click.stop="delChemical(row.index)" size="sm" class="mr-2" variant="danger">
                  删除
                </b-button>
              </template>
              <template slot="row-details" slot-scope="row">
                <b-form-group horizontal label="标题" label-for="input-c-title">
                  <b-form-input id="input-c-title" type="text" v-model="row.item.title">
                  </b-form-input>
                </b-form-group>
                <b-form-group horizontal label="内容" label-for="input-c-content">
                  <b-form-textarea :rows="5" id="input-c-content" type="text" v-model="row.item.content">
                  </b-form-textarea>
                </b-form-group>
                <b-button size="sm" variant="primary" @click="row.toggleDetails">确定</b-button>
              </template>
            </b-table>
            <hr>
            <label><b>IBC 特殊要求及操作要求-液化气</b></label>
            <b-button @click.stop="addLiquidgas()" size="sm" variant="success" class="mb-1 ml-1">
              添加一项要求
            </b-button>
            <b-table :items="items.specialRequest.Liquidgas.IGCspecialRequest" :fields="fields.liquidgas" :small="small" responsive="sm">
              <template slot="edit_details" slot-scope="row">
                <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="primary">
                  详细修改
                </b-button>
              </template>
              <template slot="del_details" slot-scope="row">
                <b-button @click.stop="delLiquidgas(row.index)" size="sm" class="mr-2" variant="danger">
                  删除
                </b-button>
              </template>
              <template slot="row-details" slot-scope="row">
                <b-form-group horizontal label="标题" label-for="input-l-title">
                  <b-form-input id="input-l-title" type="text" v-model="row.item.title">
                  </b-form-input>
                </b-form-group>
                <b-form-group horizontal label="内容" label-for="input-l-content">
                  <b-form-textarea :rows="5" id="input-l-content" type="text" v-model="row.item.content">
                  </b-form-textarea>
                </b-form-group>
                <b-button size="sm" variant="primary" @click="row.toggleDetails">确定</b-button>
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
  name: 'dbinfoEdit',
  data: () => {
    return {
      captionTitle: '编辑数据',
      msg: '更新消息内容',
      small: true,
      infoModal: false,
      // 数据绑定 classifications 字段
      classifications: [
        { text: '请选择', value: null },
        '油类',
        '液化气类',
        '化学品'
      ],
      fields: {
        chemical: [
          { key: 'title', label: '要点' },
          { key: 'edit_details', label: '编辑' },
          { key: 'del_details', label: '删除' }
        ],
        liquidgas: [
          { key: 'title', label: '要点' },
          { key: 'edit_details', label: '编辑' },
          { key: 'del_details', label: '删除' }
        ]
      },
      items: {
        id: '0',
        Number: '',
        capital: '',
        Unnum: '',
        ChineseName: '',
        classification: '',
        basicInfo: [],
        property: [],
        jobRequirements: [],
        StructuralRequest: [],
        EquipmentRequest: [],
        specialRequest: []
      }
    }
  },
  methods: {
    // 嵌入列表的添加删除及修改方法
    addChemical() {
      this.items.specialRequest.Chemical.IBCspecialRequest.push({
        title: '请输入标题',
        content: '请输入内容'
      })
    },
    delChemical(index) {
      this.items.specialRequest.Chemical.IBCspecialRequest.splice(index, 1)
    },
    addLiquidgas() {
      this.items.specialRequest.Liquidgas.IGCspecialRequest.push({
        title: '请输入标题',
        content: '请输入内容'
      })
    },
    delLiquidgas(index) {
      this.items.specialRequest.Liquidgas.IGCspecialRequest.splice(index, 1)
    },
    // 组件自定义方法onSubmit覆写
    updateItem() {
      // 发送客户端更新请求
      this.updateDbinfoItem(this.items)
      // this.msg = JSON.stringify(this.items)
      // 打开模态对话框
      this.infoModal = true
    },
    updateDbinfoItem(item) {
      // do something
      this.$http
        .post('/api/db-info/update', item)
        .then(response => {
          // console.log(response)
          // 绑定数据到提示框
          this.msg = response.data.info
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 向服务端请求数据
    getDbinfoItem(id) {
      // do something
      this.$http
        .get(`/api/db-info/${id}`) // 模板字符串
        .then(response => {
          // 绑定数据
          this.items.Number = response.data.Number
          this.items.capital = response.data.capital
          this.items.Unnum = response.data.Unnum
          this.items.ChineseName = response.data.ChineseName
          this.items.classification = response.data.classification
          this.items.basicInfo = response.data.basicInfo
          this.items.property = response.data.property
          this.items.jobRequirements = response.data.jobRequirements
          this.items.StructuralRequest = response.data.StructuralRequest
          this.items.EquipmentRequest = response.data.EquipmentRequest
          this.items.specialRequest = response.data.specialRequest
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
      this.$router.push({ name: 'dbinfoView' })
    }
  },
  created() {
    this.items.id = this.$route.params.dId
    // 获取修改数据
    this.getDbinfoItem(this.items.id)
  }
}
</script>
