<template>
  <div class="animated fadeIn">
    <b-card :header="caption">
      <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
        <template slot="show_details" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2" variant="primary">
            详细内容
          </b-button>
        </template>
        <template slot="edit_details" slot-scope="row">
          <b-button size="sm" class="mr-2" variant="success">
            修改
          </b-button>
        </template>
        <template slot="del_details" slot-scope="row">
          <b-button size="sm" class="mr-2" variant="danger">
            删除
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <small>
            <b-card>
              <b-row class="mb-2">
                <b-col sm="1">
                  <b>基础信息:</b>
                </b-col>
                <b-col sm="11">
                  <p>
                    <b> 英文名:</b>{{ row.item.basicInfo.EnglishName }}
                    <b> 别名:</b>{{ row.item.basicInfo.vulgo }}
                    <b> 分类:</b>{{ row.item.basicInfo.classification }}
                    <b> 联合国编号:</b>{{ row.item.basicInfo.Unnum }}
                    <b> CAS编号:</b>{{ row.item.basicInfo.CASNum }}
                    <b> 污染类别（有毒液体物质）:</b>{{ row.item.basicInfo.XYZ }}
                    <b> 持久性（油类）:</b>{{ row.item.basicInfo.persistance }}
                    <b> 危害性（IBC）:</b>{{ row.item.basicInfo.Harmfulness }}
                    <b> 分子式:</b>{{ row.item.basicInfo.formula }}</p>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="1">
                  <b>理化特性:</b>
                </b-col>
                <b-col sm="11">
                  <p>
                    <b> 熔点（凝固点）℃:</b>{{ row.item.property.meltingpoint }}
                    <b> 沸点℃:</b>{{ row.item.property.boilingpoint }}
                    <b> 闪点℃:</b>{{ row.item.property.flashingpoint }}
                    <b> 爆炸上限、下限%:</b>{{ row.item.property.boom }}
                    <b> 相对密度(水=1):</b>{{ row.item.property.density }}
                    <b> 溶解性:</b>{{ row.item.property.dissolution }}</p>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="1">
                  <b>作业要求:</b>
                </b-col>
                <b-col sm="11">
                  <p>
                    <b> 围油栏:</b>{{ row.item.jobRequirements.oilfence }}
                    <b> 应急待命协议（1万总吨以下）:</b>{{ row.item.jobRequirements.emergencyStandby }}
                    <b> 强制预洗:</b>{{ row.item.jobRequirements.MandatoryPrewash }}</p>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="1">
                  <b>构造要求:</b>
                </b-col>
                <b-col sm="11">
                  <p>
                    <b-list-group>
                      <b-list-group-item>
                        <b>化学品：</b>
                      </b-list-group-item>
                      <b-list-group-item>
                        <b>船型要求（IBC）:</b>{{ row.item.StructuralRequest.Chemical.IBCType }}</b-list-group-item>
                      <b-list-group-item>
                        <b>舱型要求:</b>{{ row.item.StructuralRequest.Chemical.TankType }}</b-list-group-item>
                      <b-list-group-item>
                        <b>液货舱透气要求:</b>{{ row.item.StructuralRequest.Chemical.ventilating }}</b-list-group-item>
                      <b-list-group-item>
                        <b>液货舱环境控制要求:</b>{{ row.item.StructuralRequest.Chemical.environmentCtrl }}</b-list-group-item>
                    </b-list-group>
                  </p>
                  <p>
                    <b-list-group>
                      <b-list-group-item>
                        <b>液化气：</b>
                      </b-list-group-item>
                      <b-list-group-item>
                        <b>船型要求（IGC）:</b>{{ row.item.StructuralRequest.Liquidgas.IGCType }}</b-list-group-item>
                      <b-list-group-item>
                        <b>是否要求C型独立液货舱:</b>{{ row.item.StructuralRequest.Liquidgas.independentTank }}</b-list-group-item>
                      <b-list-group-item>
                        <b>液货舱内蒸气空间的控制:</b>{{ row.item.StructuralRequest.Liquidgas.steamCtrl }}</b-list-group-item>
                    </b-list-group>
                  </p>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="1">
                  <b>设备要求:</b>
                </b-col>
                <b-col sm="11">
                  <p>
                    <b-list-group>
                      <b-list-group-item>
                        <b>化学品：</b>
                      </b-list-group-item>
                      <b-list-group-item>
                        <b>电气设备-温度等级要求:</b>{{ row.item.EquipmentRequest.Chemical.I1 }}</b-list-group-item>
                      <b-list-group-item>
                        <b>电气设备-设备分类要求:</b>{{ row.item.EquipmentRequest.Chemical.I2 }}</b-list-group-item>
                      <b-list-group-item>
                        <b>电气设备-闪点要求:</b>{{ row.item.EquipmentRequest.Chemical.I3 }}</b-list-group-item>
                      <b-list-group-item>
                        <b>测量要求（IBC）:</b>{{ row.item.EquipmentRequest.Chemical.IBCMeasurement }}</b-list-group-item>
                      <b-list-group-item>
                        <b>蒸气探测要求:</b>{{ row.item.EquipmentRequest.Chemical.steamDetection }}</b-list-group-item>
                      <b-list-group-item>
                        <b>防火要求:</b>{{ row.item.EquipmentRequest.Chemical.fireproofing }}</b-list-group-item>
                      <b-list-group-item>
                        <b>应急设备要求:</b>{{ row.item.EquipmentRequest.Chemical.emergencyEquipment }}</b-list-group-item>
                    </b-list-group>
                  </p>
                  <p>
                    <b-list-group>
                      <b-list-group-item>
                        <b>液化气：</b>
                      </b-list-group-item>
                      <b-list-group-item>
                        <b>气体探测要求:</b>{{ row.item.EquipmentRequest.Liquidgas.gasDetection }}</b-list-group-item>
                      <b-list-group-item>
                        <b>测量要求（IGC）:</b>{{ row.item.EquipmentRequest.Liquidgas.IGCMeasurement }}</b-list-group-item>
                    </b-list-group>
                  </p>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="1">
                  <b>特殊要求:</b>
                </b-col>
                <b-col sm="11">
                  <p>
                    <b-list-group>
                      <b-list-group-item>
                        <b>化学品：</b>
                      </b-list-group-item>
                      <b-list-group-item>
                        <b>IBC 特殊要求及操作要求</b>
                      </b-list-group-item>
                      <b-list-group-item>
                        <div v-for="(i, index) in row.item.specialRequest.Chemical.IBCspecialRequest" :key="index">
                          <p>
                            <b>标题：</b>{{i.title}}</p>
                          <p>
                            <b>内容：</b>{{i.content}}</p>
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                  </p>
                  <p>
                    <b-list-group>
                      <b-list-group-item>
                        <b>液化气：</b>
                      </b-list-group-item>
                      <b-list-group-item>
                        <b>IBC 特殊要求及操作要求</b>
                      </b-list-group-item>
                      <b-list-group-item>
                        <div v-for="(i, index) in row.item.specialRequest.Liquidgas.IGCspecialRequest" :key="index">
                          <p>
                            <b>标题：</b>{{i.title}}</p>
                          <p>
                            <b>内容：</b>{{i.content}}</p>
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                  </p>
                </b-col>
              </b-row>
              <b-button size="sm" variant="primary" @click="row.toggleDetails">隐藏</b-button>
            </b-card>
          </small>
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
  name: 'dbinfo',
  props: {
    caption: {
      type: String,
      default: '危险货物数据'
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
        { key: 'Number', label: '编号', sortable: true },
        { key: 'capital', label: '污染类别' },
        { key: 'Unnum', label: '联合国编号' },
        { key: 'ChineseName', label: '中文名' },
        { key: 'classification', label: '分类' },
        { key: 'ChineseName', label: '项目归属' },
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
    // 向服务端请求dbinfo数据
    getDbInfo() {
      // do something
      this.$http
        .get('/api/db-info')
        .then(response => {
          console.log(response)
          // 绑定数据
          this.items = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 读取元素个数用于分页
    getRowCount(items) {
      return items.length
    }
  },
  // 钩子函数created期间读取数据
  created() {
    this.getDbInfo()
  },
  mounted() {
    // do something
  }
}
</script>
