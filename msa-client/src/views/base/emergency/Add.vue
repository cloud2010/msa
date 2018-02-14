<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="8">
                <b-card :header="caption">
                    <slot name="form-title">
                        <h4 class="alert-heading">添加项目</h4>
                    </slot>
                    <hr>
                    <b-form-group id="fd-e" label="项目编号" label-for="inputNo">
                        <b-form-input id="inputNo" type="text" placeholder="请输入项目编号" :disabled="noDisabled" :value="fileds.no">
                        </b-form-input>
                    </b-form-group>
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
      default: {no: ''}
    }
  }
}
</script>
