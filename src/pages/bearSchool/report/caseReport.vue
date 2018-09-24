<template>
  <div>
    <div class="content-bj">
      <navTitle :navArr="['报告','报告分析']"></navTitle>
      <el-radio-group v-model="radioVal">
        <el-radio-button label="单项分析"></el-radio-button>
        <el-radio-button label="学校对比"></el-radio-button>
      </el-radio-group>
      <div v-show="radioVal==='单项分析'">
        <single></single>
      </div>
       <div v-show="radioVal==='学校对比'">
        <xueXiao></xueXiao>
      </div>
    </div>
  </div>
</template>
<script>
import navTitle from 'components/navTitle'
import single from './caseReport/single'
import xueXiao from './caseReport/xueXiao.vue'
export default {
    components: { navTitle, single,xueXiao },
    props: {},
    data() {
        return {
            radioVal: '单项分析'
        }
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {
        this.$nextTick(() => {})
    },
    methods: {}
}
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
