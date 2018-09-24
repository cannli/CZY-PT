<template>
  <div>
    <div class="content-bj">
      <el-button class="block-but" @click="blockFn">返回</el-button>
      <navTitle :navArr="['报告','学生体检管理', '成长轨迹']"></navTitle>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="12">
          <div class="backg-bor-style padding-c">
            <span style="font-weight: bold;">身高曲线图（cm）</span>
          </div>
          <div class="">
            <dataSG
              v-if="dataSG.seriesData&&dataSG.seriesData.length>0"
              :xAxisData="dataSG.legendData"
              :unit="'CM'"
              :seriesData="dataSG.seriesData"
              :min="150"
            ></dataSG>
            <!--  <noData></noData>-->
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :lg="12">
          <div class="backg-bor-style padding-c">
            <span style="font-weight: bold;">体重曲线图（kg）</span>
          </div>
          <div>
            <dataSG
              v-if="dataKG.seriesData&&dataKG.seriesData.length>0"
              :xAxisData="dataKG.legendData"
              :unit="'KG'"
              :seriesData="dataKG.seriesData"
              :min="30"
            ></dataSG>
            <noData v-else></noData>
          </div>
        </el-col>


        <el-col :xs="24" :sm="24" :lg="24" class="mar-top20">
          <div class="backg-bor-style padding-c">
            <span style="font-weight: bold;">风险预测</span>
          </div>
          <div>
            <echartLine
              v-if="dataFXDBObj.seriesData && dataFXDBObj.seriesData.length>0"
              :seriesData="dataFXDBObj.seriesData"
              :xAxisData="dataFXDBObj.xAxisData"
              :legendData="dataFXDBObj.legendData"
              :color="['#0000ff','#cccccc','#ff0000','#00ff00']"
            ></echartLine>
            <noData v-else></noData>
          </div>
        </el-col>
      </el-row>

      <el-row class="backg-bor-style mar-top20">
        <div class=" padding-c">
          <span style="font-weight: bold;">体态判定</span>
        </div>
        <el-carousel :interval="4000" height="460px" class="backg-bor-style" v-if="shapeData.length>0">
          <el-carousel-item style="text-align: center;">
            <el-col :span="24/shapeData.length" v-for=" x in shapeData">
              <h5 class="h3">{{x.createTime}}</h5>
              <div class="tip_left">
                <span></span>
                <span>头侧歪:{{isNull(x.headCoronal)}}</span>
                <span>头前倾:{{isNull(x.headFore)}}</span>
                <span>弓腰驼背:{{isNull(x.humpBack)}}</span>
                <span>骨盆前/后倾:{{isNull(x.pelvisPitch)}}</span>
                <span>高低肩:{{isNull(x.shoulderCorenal)}}</span>
                <span>躯干偏移:{{isNull(x.bodyCenter)}}</span>
                <span>腿型异常:{{isNull(x.legXo)}}</span>

              </div>
            </el-col>
          </el-carousel-item>
        </el-carousel>
        <noData v-else></noData>
      </el-row>
    </div>
  </div>

</template>

<script>
  import navTitle from 'components/navTitle'
  import dataSG from 'components/echarts/bar'
  import echartLine from 'components/echarts/line'
  import noData from 'components/noData'

  export default {
    components: {
      navTitle, dataSG, echartLine, noData
    },
    props: {
      studentId: [Number, String]
    },
    data() {
      return {
        shapeData: [
          {
            bodyCenter: "正常",
            headCoronal: "正常",
            headFore: "正常",
            humpBack: "驼背",
            legXo: "正常",
            pelvisPitch: "正常",
            shoulderCorenal: "高低肩"
          },
          {
            bodyCenter: "正常",
            headCoronal: "正常",
            headFore: "正常",
            humpBack: "驼背",
            legXo: "正常",
            pelvisPitch: "正常",
            shoulderCorenal: "高低肩"
          }
        ],
        shenDaoData: {},
        fenXData: {},
        tZhongData: {},

        // 身高数据
        dataSG: {},
        // dataKG
        dataKG: {},
        // 风险预测数据
        dataFXDBObj: {},
      }
    },
    watch: {},
    computed: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this._getHeightTrail()
        this._getRiskTrail()
        this._getShapeTrail()
        this._getWeightTrail()
      })
    },
    methods: {
      blockFn() {
        this.$emit('blockFn')
      },
      // 获取学生/ 成长轨迹/身高
      _getHeightTrail() {
        let params = {
          studentId: this.studentId,
        }
        this.$fetch.dataApi.getHeightTrail(params).then(({data, msg, total}) => {
          if (!data || data.length <= 0) {
            this.dataSG = {}
            return
          }
          let legendData = []
          let seriesData = []
          for (let x in data) {
            legendData.push(data[x].checkTime)
            seriesData.push(data[x].height)
          }
          this.dataSG = {
            legendData, seriesData
          }
        })
      },
      // 获取学生/ 成长轨迹/体重
      _getWeightTrail() {
        let params = {
          studentId: this.studentId,
        }
        this.$fetch.dataApi.getWeightTrail(params).then(({data, msg, total}) => {
          if (!data || data.length <= 0) {
            this.dataKG = {}
            return
          }
          let legendData = []
          let seriesData = []
          for (let x in data) {
            legendData.push(data[x].checkTime)
            seriesData.push(data[x].weight)
          }
          this.dataKG = {
            legendData, seriesData
          }
        })
      },
      // 获取学生/ 成长轨迹/风险预测
      _getRiskTrail() {
        let params = {
          studentId: this.studentId,
        }
        this.$fetch.dataApi.getRiskTrail(params).then(({data, msg, total}) => {
          if (!data || data.length <= 0) {
            this.dataFXDBObj = {}
            return
          }
          let xAxisData = ['颈椎退化', '骨刺', '头痛', '头晕', '手脚麻', '便秘',
            '颈肩痛', '背痛', '腰痛', '腰椎间盘突出', '膝关节痛', '胸闷气短',
            '失眠', '脊柱变形', '慢性劳损', '眼睛干涩', '身体疲倦', '耳鸣']
          let seriesData = []
          let legendData = []
          for (let x in data) {
            legendData.push(data[x].createTime)
            seriesData.push([
              data[x].lumbago, data[x].dizzy, data[x].headache,
              data[x].hemp, data[x].cervicalDege, data[x].nsPain,
              data[x].spur, data[x].constipation, data[x].backache, data[x].ringEar,
              data[x].deforeSpine, data[x].chronicStrain, data[x].lumbaDisk,
              data[x].physicalFatigue, data[x].kjPain, data[x].dryEye, data[x].insomnia,
              data[x].shortBreath
            ])
          }
          this.dataFXDBObj = {
            xAxisData, legendData, seriesData
          }
          console.log(this.dataFXDBObj, 'ssdddddd')
        })
      },
      // 获取学生体态
      _getShapeTrail() {
        let params = {
          studentId: this.studentId,
        }
        this.$fetch.dataApi.getShapeTrail(params).then(({data, msg, total}) => {
          // this.getData = data
          if (data && data.length > 0) {
            this.shapeData = data
          }
        }).catch(() => {
        })
      },
    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

  .tip_left {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 400px;
    background: url("../../../img/rentian1.png") no-repeat;
    /*  background-size: cover;*/
    background-position: center top;
    background-size: contain;
    text-align: center;
    position: relative;
    span {
      color: #fff;
      padding: 5px;
      font-size: 12px;
      position: absolute;
      left: 50%;
      width: 97px;
    }
    span:nth-child(2) {
      background: #f36cbe;
      top: 11px;
      margin-left: -150px;
    }
    span:nth-child(3) {
      background: #37a1da;
      top: 45px;
      margin-left: 30px;
    }
    span:nth-child(4) {
      background: #a78ae7;
      top: 94px;
      margin-left: -175px;
    }
    span:nth-child(5) {
      background: #fec70a;
      top: 169px;
      margin-left: -175px;
    }
    span:nth-child(6) {
      background: #02789a;
      top: 107px;
      margin-left: 65px;
    }
    span:nth-child(7) {
      background: #48c0e3;
      top: 153px;
      margin-left: 59px;
    }
    span:nth-child(8) {
      background: #ff9a8e;
      bottom: 14px;
      margin-left: 40px;
    }
  }
</style>
