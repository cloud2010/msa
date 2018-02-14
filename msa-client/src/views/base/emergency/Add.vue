<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="8">
                <b-card :header="caption">
                    <slot name="form-title">
                        <h4 class="alert-heading">添加项目</h4>
                    </slot>
                    <hr>
                    <b-form>
                        <b-form-group id="fd-1" label="项目编号" label-for="input-no">
                            <b-form-input id="input-no" type="text" placeholder="请输入项目编号" :disabled="noDisabled" :value="fileds.no">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-2" label="污染类别" label-for="input-capital">
                            <b-form-input id="input-capital" type="text" placeholder="请输入污染类别" :value="fileds.capital">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-3" label="中文名" label-for="input-name">
                            <b-form-input id="input-name" type="text" placeholder="请输入中文名" :value="fileds.name">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-4" label="灭火方法" label-for="input-extinguishing">
                            <b-form-input id="input-extinguishing" type="text" placeholder="请输入" :value="fileds.extinguishing">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-5" label="围油栏布设" label-for="input-oilfence">
                            <b-form-input id="input-oilfence" type="text" placeholder="请输入" :value="fileds.oilfence">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-6" label="应急处置人员个人防护" label-for="input-protection">
                            <b-form-input id="input-protection" type="text" placeholder="请输入" :value="fileds.protection">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-7" label="急救-皮肤接触" label-for="input-skin">
                            <b-form-input id="input-skin" type="text" placeholder="请输入" :value="fileds.skin">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-8" label="急救-眼睛接触" label-for="input-eye">
                            <b-form-input id="input-eye" type="text" placeholder="请输入" :value="fileds.eye">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-9" label="急救-吸入" label-for="input-inhalation">
                            <b-form-input id="input-inhalation" type="text" placeholder="请输入" :value="fileds.inhalation">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="fd-10" label="急救-食入" label-for="input-ingestion">
                            <b-form-input id="input-ingestion" type="text" placeholder="请输入" :value="fileds.ingestion">
                            </b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary">{{fileds.submit}}</b-button>
                        <b-button type="reset" variant="danger">重置</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
  name: 'e-Add',
  // 使用props暴露变量给外部组件（传递数据）
  props: {
    caption: {
      type: String,
      default: '添加项目'
    },
    noDisabled: {
      type: Boolean,
      default: false
    },
    fileds: {
      type: Object,
      default: {
        no: '',
        capital: '',
        name: '',
        extinguishing: '',
        oilfence: '',
        protection: '',
        skin: '',
        eye: '',
        inhalation: '',
        ingestion: '',
        submit: '添加'
      }
    }
  }
}
</script>
