<template>
  <div>
    <div class="content-bj">
      <el-button class="block-but" @click="closeFn">返回</el-button>
      <navTitle :navArr="['报告','项目体检管理','详情']"></navTitle>
      <el-row class="tip_pro backg-bor-style" :gutter="40">

        <el-col :xs="8" :sm="8" :lg="8" style="padding-top: 20px;">

          <div class="">
            <h3 style="max-width: 360px;min-width:120px;margin:20px auto;text-align: center;">{{baseInfo.schoolName}}</h3>
            <div>{{baseInfo.checkTime}}</div>
            <div style="max-width: 360px;min-width:120px;margin:25px auto 5px">
              本次参与检测人数{{baseInfo.total}}人、有效数据{{baseInfo.validTotal}}条。
            </div>
            <div style="max-width: 360px;min-width:120px;margin:15px auto">本次检测为本年度第{{baseInfo.rank}}次检测，对比统计已出。</div>
            <div style="max-width: 360px;min-width:120px;margin:15px auto" v-if="baseInfo.isReport==false">专家定制报告仍在审核，预计三日后可查看。</div>
            <div style="max-width: 360px;min-width:120px;margin:15px auto" v-if="baseInfo.isReport">专家定制报告已出。</div>
            <div style="max-width: 360px;min-width:120px;margin:15px auto;font-size: 12px;text-align: right;">
              （点击右侧导航栏、查看对比、定制报告）
            </div>
            <div
              style="max-width: 360px;min-width:120px;margin:15px auto;font-size: 12px;margin-top: 30px; color: cadetblue;">
              本次数据统计由红运天传公司提供技术支持
            </div>
            <div style="max-width: 360px;min-width:120px;margin:15px auto;font-size: 12px; color: cadetblue;">
              本次报告由中康健康管理研究所提供专家支持
            </div>

          </div>

        </el-col>

        <el-col :xs="8" :sm="8" :lg="8" style="padding-top: 20px;">

          <div class="tip_left">
            <span></span>
            <span>头侧歪:{{isNull(shapeData.head,1)}}% </span>
            <span>头前倾:{{isNull(shapeData.headfore,1)}}% </span>
            <span>弓腰驼背:{{isNull(shapeData.hump,1)}}%</span>
            <span>骨盆前/后倾:{{isNull(shapeData.pelvispitch,1)}}% </span>
            <span>高低肩:{{isNull(shapeData.shoulder,1)}}%</span>
            <span>躯干偏移:{{isNull(shapeData.bodyCenter,1)}}%</span>
            <span>腿型异常:{{isNull(shapeData.legxo,1)}}%</span>
          </div>

        </el-col>

        <el-col :xs="8" :sm="8" :lg="8" class="">
          <div class="tip_right">
           <!-- <div class="text">本次检测数据综合分析评级： <span>提高</span></div>-->
            <div class="content">
              <div class="left">
                <img src="../../img/nan.png"/>
              </div>
              <div class="right">
                <ul class="ui">
                  <li class="li">
                    <img src="../../img/icon.png"/>
                    <span>风险最高症状：</span>
                    <span>{{zongheData.man.maxDisk || '--'}}（参考）</span>
                  </li>
                  <li class="li">
                    <img src="../../img/icon.png"/>
                    <span>体态问题高发年级/年龄：</span>
                    <span>{{zongheData.man.gradeName || '--'}} {{zongheData.man.age || 0}}岁</span>
                  </li>
                  <li class="li">
                    <img src="../../img/icon.png"/>
                    <span>男生人数：</span>
                    <span>{{zongheData.man.allcount || 0}}人</span>
                  </li>
                  <li class="li">
                    <img src="../../img/icon.png"/>
                    <span>平均身高：</span>
                    <span>{{zongheData.man.avgHeight || 0}}CM</span>
                  </li>
                  <li class="li">
                    <img src="../../img/icon.png"/>
                    <span>平均体重</span>
                    <span>{{zongheData.man.avgWeight || 0}}KG </span>
                  </li>
                  <li class="li">
                    <img src="../../img/icon.png"/>
                    <span>体重超重：</span>
                    <span>{{zongheData.man.avgWeight || 0}}%</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="content">
              <div class="left">
                <img src="../../img/sexWon.png" style="width: 50px;"/>
              </div>
              <div class="right">
                <ul class="ui">
                  <li class="li">
                    <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                    <span>风险最高症状：</span>
                    <span>{{zongheData.female.maxDisk || '--'}}（参考）</span>
                  </li>
                  <li class="li">
                    <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                    <span>体态问题高发年级/年龄：</span>
                    <span>{{zongheData.female.gradeName || '--'}} {{zongheData.female.age || 0}}岁</span>
                  </li>
                  <li class="li">
                    <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                    <span>女生人数：</span>
                    <span>{{zongheData.female.allcount || 0}}人</span>
                  </li>
                  <li class="li">
                    <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                    <span>平均身高：</span>
                    <span>{{zongheData.female.avgHeight || 0}}CM</span>
                  </li>
                  <li class="li">
                    <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                    <span>平均体重：</span>
                    <span>{{zongheData.female.avgWeight || 0}}KG</span>
                  </li>
                  <li class="li">
                    <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                    <span>体重超重：</span>
                    <span>{{zongheData.female.avgWeight || 0}}%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </el-col>
      </el-row>

      <el-row :gutter="32">
        <el-col :xs="24" :sm="12" :lg="12" style="margin-bottom: 20px;">
          <div class="backg-bor-style titleText">
            <span style="font-weight: bold;">身高统计</span>
            <div style="font-size: 12px;line-height: 25px;">
              <!-- <span>BMI指标：最高{{146}}cm<span>&nbsp;&nbsp;</span></span> <span>最低{{146}}cm<span>&nbsp;&nbsp;</span></span>
               <span>平均{{146}}cm</span>-->
              <span>总体平均身高：{{isNull(sgPJ,1)}}CM</span>
            </div>
            <div class="bot-tip">
              <el-button :class="{'n-ji':tiZhongStu=='nJi'}"
                         @click="tiZhongStu='nJi',  _studentBaseInfo('nj','height')" size="mini">年级
              </el-button>
              <el-button class="n-ling" :class="{'n-ji':tiZhongStu=='nLing'}"
                         @click="tiZhongStu='nLing', _studentBaseInfo('nl','height')" size="mini">
                年龄
              </el-button>
            </div>
          </div>
          <div>
            <barMultiple
              v-if="heiDataObj.seriesData&&heiDataObj.seriesData.length>0"
              :seriesData="heiDataObj.seriesData"
              :xAxisData="heiDataObj.xAxisData"
              :legendData="heiDataObj.legendData"
              :color="heiDataObj.color"
              valMin="100"
              unit="CM">
            </barMultiple>
            <noData v-else></noData>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :lg="12" style="margin-bottom: 20px;">
          <div class="backg-bor-style titleText">
            <span style="font-weight: bold;">体重统计</span>
            <div style="font-size: 12px;line-height: 25px;">
              <!-- <span>BMI指标：最高{{53}}kg<span>&nbsp;&nbsp;</span></span> <span>最低{{45}}kg<span>&nbsp;&nbsp;</span></span>
               <span>平均{{50}}kg</span>-->
              <span>总体平均体重：{{isNull(tzPJ,1)}}KG</span>
            </div>
            <div class="bot-tip">
              <el-button
                :class="{'n-ji':shenGaoStu=='nJi'}"
                @click="shenGaoStu='nJi', _studentBaseInfo('nj','weight')"
                size="mini">年级
              </el-button>
              <el-button class="n-ling" :class="{'n-ji':shenGaoStu=='nLing'}"
                         @click="shenGaoStu='nLing', _studentBaseInfo('nl','weight')" size="mini">
                年龄
              </el-button>
            </div>
          </div>

          <div class="">
            <barMultiple
              v-if="weiDataObj.seriesData&&weiDataObj.seriesData.length>0"
              :seriesData="weiDataObj.seriesData"
              :xAxisData="weiDataObj.xAxisData"
              :legendData="weiDataObj.legendData"
              :color="weiDataObj.color"
              valMin="20"
              unit="KG">
            </barMultiple>
            <noData v-else></noData>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32" style="margin-bottom: 20px;">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="backg-bor-style" style="padding: 10px 0 10px 10px;">
            <span style="font-weight: bold;">体态判定</span>
          </div>
          <div class="">
             <bar-chart :projectCode="projectCode"></bar-chart>
            <!--<noData></noData>-->
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :lg="12">
          <div class="backg-bor-style" style="padding: 10px 0 10px 10px;">
            <span style="font-weight: bold;">足弓分析</span>
          </div>
          <div class="">
              <gongZu :seriesData="dataGongZu.seriesData"
                      :legendData="dataGongZu.legendData"
                      :color="['#6BCA66','#008A00','#A6AAA8','#6C6F6F']"></gongZu>
            <!--<noData></noData>-->
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32" style="margin-bottom: 20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="backg-bor-style" style="padding: 10px 0 10px 10px;">
            <el-popover
              placement="top"
              width="200"
              trigger="hover">
              <div>
                <p>
                    <span>该数值为系统针对每个问题综合计算得出，
                      预测代表5～10年内不做纠偏后可能出现下列症状的预估人数，对于问题较严重者，
                      或已出现症状前兆，仅作参考。</span>
                </p>

              </div>
              <span slot="reference"><span class="ext-poptip-btn">风险预测：</span></span>
            </el-popover>
            <!-- <span style="font-weight: bold;">风险预测</span>-->
          </div>
          <div class="">
             <fenxian :projectCode="projectCode"></fenxian>
            <!--<noData></noData>-->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import navTitle from 'components/navTitle'
  import BarChart from './echarts/BarChart'
  import xinL from './echarts/xinL'
  import dongNeng from './echarts/dongNeng'
  import fenxian from './echarts/fenxian'
  import barMultiple from 'components/echarts/barMultiple'
  import gongZu from 'components/echarts/pieT'
  import noData from 'components/noData'

  export default {
    components: {
      navTitle, BarChart, xinL, gongZu, dongNeng, fenxian, barMultiple, noData
    },
    props: ["projectCode","schoolId"],
    data() {
      return {
        zongheData: {
          female:{},
          man:{}
        },
        tiZhongStu: 'nJi',
        shenGaoStu: 'nJi',

        shapeData: {
          legxo: '',
          pelvispitch: '',
          headfore: '',
          bodyCenter: '',
          shoulder: '',
          hump: '',
          head: ''
        },
        baseInfo:{},
        // 身高
        heiDataObj: {},
        // 体重
        weiDataObj: {},
        // 平均身高
        sgPJ: undefined,
        // 平均体重
        tzPJ: undefined
      }
    },
    watch: {},
    computed: {
      dataEnum2() {
        return this.dataEnum
      }
    },
    created() {
      this._zongheCp()
      this._studentBaseInfo('nj');
      this._shapeReport()
      this._baseProjectInfo();
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    methods: {
      closeFn() {
        this.$emit('closeFn')
      },
      //获取成长报告
      _shapeReport() {
        let params = {
          projectCode: this.projectCode
        };
        this.$fetch.dataApi
          .shapeReport(params)
          .then(({data, msg, total}) => {
            if (data.allCount == 0) {
              return;
            }
            let allCount = data.allCount
            this.shapeData = {
              legxo: (Number(data.legxo.ycFelMan) + Number(data.legxo.ycMan)) / allCount,
              pelvispitch: (Number(data.pelvispitch.ycFelMan) + Number(data.pelvispitch.ycMan)) / allCount,
              headfore: (Number(data.headfore.ycFelMan) + Number(data.headfore.ycMan)) / allCount,
              bodyCenter: (Number(data.bodyCenter.ycFelMan) + Number(data.bodyCenter.ycMan)) / allCount,
              shoulder: (Number(data.shoulder.ycFelMan) + Number(data.shoulder.ycMan)) / allCount,
              hump: (Number(data.hump.ycFelMan) + Number(data.hump.ycMan)) / allCount,
              head: (Number(data.head.ycFelMan) + Number(data.head.ycMan)) / allCount
            }
          })
      },
      _baseProjectInfo(){
        let params = {
          projectCode: this.projectCode,
          schoolId:this.schoolId
        };
        this.$fetch.dataApi
          .baseProjectInfo(params)
          .then(({data, msg, total}) => {
            this.baseInfo = data;
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },
      _zongheCp() {
        let params = {
          projectCode: this.projectCode
        };
        this.$fetch.dataApi
          .zongheCp(params)
          .then(({data, msg, total}) => {
            this.zongheData = data;
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },

      //获取成长报告
      _studentBaseInfo(flag, tjType) {
        let baseType = null;
        if (flag === 'nj') {
          baseType = "grade";
        } else {
          baseType = "age";
        }
        let params = {
          projectCode: this.projectCode,
          baseType: baseType
        };
        this.$fetch.dataApi
          .studentBaseInfo(params)
          .then(({data, msg, total}) => {
            if (tjType == null) {
              this.dataShenGFn(flag, data);
              this.dataTZ(flag, data);
            } else if (tjType == "height") {
              this.dataShenGFn(flag, data);
            } else if (tjType == "weight") {
              this.dataTZ(flag, data);
            }
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },
      dataShenGFn(flag, data) { // 身高
        let self = this
        self.heiDataObj = []
        let dataAll = data
        let xAxisData = []
        let seriesData = []
        let height = []  // 总平均
        let manHeight = []  // 男平均
        let felmanHeight = [] // 女平均
        let legendData = []

       // let sgPJ = undefined
        let peopleAll = 0   // 总人数
        let sgAll = 0      // 总身高

        for (let x in dataAll) {
          if (flag === 'nj') {
            xAxisData.push(self.arrValToName(self.dataEnum.fgrade, dataAll[x].name))
          } else {
            xAxisData.push(dataAll[x].name + '岁')
          }
          if (dataAll[x].manHeight) { // 平均男
            manHeight.push(dataAll[x].manHeight.toFixed(2))
          }
          if (dataAll[x].height) {
            height.push(dataAll[x].height.toFixed(2))
          }
          if (dataAll[x].felmanHeight) {
            felmanHeight.push(dataAll[x].felmanHeight.toFixed(2))
          }
          peopleAll += dataAll[x].manCount + dataAll[x].femaleCount
          sgAll += ((dataAll[x].manCount || 0) * (dataAll[x].manHeight || 0)) + ((dataAll[x].femaleCount || 0) * (dataAll[x].femaleHeight || 0))
        }

        if (manHeight && manHeight.length > 0) {
          seriesData.push({
            type: 'bar', data: manHeight
          })
          legendData.push('男生平均身高')
        }
        if (felmanHeight && felmanHeight.length > 0) {
          seriesData.push({
            type: 'bar', data: felmanHeight
          })
          legendData.push('女生平均身高')
        }
        if (height && height.length > 0) {
          seriesData.push({
            type: 'bar', data: height
          })
          legendData.push('总体平均身高')
        }
        // sgPJ = height.reduce(function (pre, cur, index, height) {
        //   return Number(pre) + Number(cur)
        // });
        // self.sgPJ = sgPJ / height.length
        self.sgPJ = sgAll / peopleAll
        self.heiDataObj.xAxisData = xAxisData
        self.heiDataObj.seriesData = seriesData
        self.heiDataObj.color = ['#0166FF', '#EB0D93', "#01B200"]
        self.heiDataObj.legendData = legendData
      },
      dataTZ(flag, data) { // 体重
        let self = this
        self.weiDataObj = []
        let dataAll = data
        let xAxisData = []
        let seriesData = []
        let weight = []  // 总平均
        let manweight = []  // 男平均
        let felmanweight = [] // 女平均
        let legendData = []

        let peopleAll = 0   // 总人数
        let tzAll = 0      // 总身高
        for (let x in dataAll) {
          if (flag === 'nj') {
            xAxisData.push(self.arrValToName(self.dataEnum.fgrade, dataAll[x].name))
          } else {
            xAxisData.push(dataAll[x].name + '岁')
          }
          if (dataAll[x].manweight) { // 平均男
            manweight.push(dataAll[x].manweight.toFixed(2))
          }
          if (dataAll[x].weight) {
            weight.push(dataAll[x].weight.toFixed(2))
          }
          if (dataAll[x].felmanweight) {
            felmanweight.push(dataAll[x].felmanweight.toFixed(2))
          }
          peopleAll += dataAll[x].manCount + dataAll[x].femaleCount
          tzAll += ((dataAll[x].manCount || 0) * (dataAll[x].manweight || 0)) + ((dataAll[x].femaleCount || 0) * (dataAll[x].femaleweight || 0))
        }

        if (manweight && manweight.length > 0) {
          seriesData.push({
            type: 'bar', data: manweight
          })
          legendData.push('男生平均体重')
        }
        if (felmanweight && felmanweight.length > 0) {
          seriesData.push({
            type: 'bar', data: felmanweight
          })
          legendData.push('女生平均体重')
        }
        if (weight && weight.length > 0) {
          seriesData.push({
            type: 'bar', data: weight
          })
          legendData.push('总体平均体重')
        }
        // let tzPJ = weight.reduce(function (pre, cur, index, weight) {
        //   return Number(pre) + Number(cur)
        // });
        // self.tzPJ = tzPJ / weight.length
        self.tzPJ = tzAll / peopleAll
        self.weiDataObj =
          {
            xAxisData,
            seriesData,
            color: ['#0166FF', '#EB0D93', "#01B200"],
            legendData
          }
      },

    },
  }
</script>


<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .ext-poptip-btn:after {
    content: '?';
    position: absolute;
    top: 15px;
    font-weight: bold;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border-radius: 50%;
    color: #fff;
    background-color: #9c8585;
    text-align: center;
    font-size: 10px;
  }

  .titleText {
    height: 56px;
    padding: 10px 0 0 10px;
    .bot-tip {
      float: right;
      display: inline-block;
      margin-top: -37px;
      margin-right: 20px;
      .n-ling {
        margin-left: -5px;
      }
      .n-ji {
        background: #409EFF;
        color: #ffffff;
      }
    }
  }

  .tip_pro {
    height: 470px;
    margin: 20px 0;
    .tip_left {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 411px;
      background: url("../../img/rentian1.png") no-repeat;
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
        margin-left: -179px;
      }
      span:nth-child(3) {
        background: #37a1da;
        top: 45px;
        margin-left: 40px;
      }
      span:nth-child(4) {
        background: #a78ae7;
        top: 94px;
        margin-left: -191px;
      }
      span:nth-child(5) {
        background: #fec70a;
        top: 169px;
        margin-left: -195px;
      }
      span:nth-child(6) {
        background: #02789a;
        top: 107px;
        margin-left: 79px;
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
  }

  .tip_right {
    width: 356px;
    padding: 10px;
    box-sizing: border-box;
    .text {
      padding: 10px;
      background: #FEFFBE;
      color: #000;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 15px;
      span {
        display: inline-block;
        margin-left: 30px;
        color: #f00;
      }
    }
    .content {
      height: 200px;
      .left, .right {
        float: left;
      }
      .left:after, .right:after {

      }
      .left {
        height: 100%;
        margin-right: 15px;

        img {
          margin-top: 40px;
          vertical-align: middle;
        }
      }
      .right {
        width: 80%;
        .ui {
          .li {
            padding: 5px;
            border-bottom: 1px solid #cccccc;
            img {
              width: 13px;
              height: 13px;
            }
            span {
              color: #000;
              display: inline-block;
              margin-left: 10px;
              font-size: 12px;
            }
          }

        }
      }
    }
  }
</style>


