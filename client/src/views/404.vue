<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="6">
                    <b-card-group>
                        <b-card class="p-4">
                            <b-card-body>
                                <b-row class="justify-content-center">
                                    <h2>页面未找到</h2>
                                </b-row>
                                <hr>
                                <b-row class="justify-content-center">
                                    <b-button size="lg" variant="success" :to="{ path: 'Dashboard' }">返回控制台</b-button>
                                </b-row>
                            </b-card-body>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NoFound',
  data: () => {
    return {}
  },
  methods: {}
}
</script>
