<template>
  <div>
    <el-row :gutter="20" class="backg-bor-style mar-top20 ">
      <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col20">
        <div class="a-col-title">地区：</div>
        <div class="lucencyInput">

          <el-cascader v-model="form.city" style="width: 80%;" clearable
                       :options="area.cityOptionsArr"
                       :props="area.cityProps"
                       @change="selectChangeCity"
                       change-on-select
          >
          </el-cascader>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col20">
        <div class="a-col-title">学校类型：</div>
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="form.schoolType" filterable clearable placeholder="请选择学校类型"
                     @change="selectChangeSchType" default-first-option>
            <el-option v-for="item in schoolTypeArr" :key="item.id" :label="item.label"
                       :value="item.id"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col20">
        <div class="a-col-title">学校：</div>
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="form.schoolId" filterable placeholder="请选择学校" clearable
                     @change="selectChangeCchoolIdFn" default-first-option>
            <el-option v-for="item in schoolArr" :key="item.id" :label="item.schoolName"
                       :value="item.id"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col20">
        <div class="a-col-title">年级：</div>
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="form.nj" filterable placeholder="请选择年级" clearable
                     @change="selectChangeNj" default-first-option>
            <el-option v-for="item in gradeArr" :key="item.id" :label="item.label"
                       :value="item.id"></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col20">
        <div class="a-col-title">时间：</div>
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="form.time" filterable placeholder="请选择时间" clearable
                     @change="selectChangeTime" default-first-option>
            <el-option v-for="item in timeArr" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </div>
      </el-col>

      <!--<el-col :xs="12" :sm="8" :lg="6" class="card-panel-col20">-->
        <!--<div class="a-col-title">年龄：</div>-->
        <!--<div class="lucencyInput">-->
          <!--<el-select size="medium" style="width: 80%;" v-model="form.age" filterable placeholder="请选择年龄"-->
                     <!--@change="selectChangeAge" default-first-option>-->
            <!--<el-option v-for="item in ageArr" :key="item" :label="item+'岁'" :value="item"></el-option>-->
          <!--</el-select>-->
        <!--</div>-->
      <!--</el-col>-->

      <!--  <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col20">
          <div class="a-col-title">性别</div>
          <div class="lucencyInput">
            <el-select size="medium" style="width: 80%;" v-model="form.sex" filterable placeholder="请选择性别"
                       default-first-option @change="selectChangeSex">
              <el-option v-for="item in dataEnum.sex" :key="item.val" :label="item.name" :value="item.val"></el-option>
            </el-select>
          </div>
        </el-col>-->

      <el-col :xs="12" :sm="8" :lg="6" class="card-panel-col20">
        <div class="a-col-title">&emsp;</div>
        <div class="lucencyInput">
          <el-button type="primary" @click="handelFn">确认</el-button>
          <el-button type="success" @click="resetFn()">重置</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="tip_pro mar-top20" style="margin-bottom: 20px; height: 500px;">
      <el-col :xs="12" :sm="12" :lg="12" class="backg-bor-style">
        <div class="tip_left">
          <span></span>
          <span>轻度头侧歪:{{isNull(reTiObj.headCount)}}% </span>
          <span>轻度头前倾:{{isNull(reTiObj.headForeCount)}}% </span>
          <span>弓腰驼背:{{isNull(reTiObj.humpCount)}}%</span>
          <span>骨盆前/后倾:{{isNull(reTiObj.pelvispitchCount)}}% </span>
          <span>高低肩:{{isNull(reTiObj.shoulderCount)}}%</span>
          <span>躯干偏移:{{isNull(reTiObj.bodyCenterCount)}}%</span>
          <span>腿型异常:{{isNull(reTiObj.legxoCount)}}%</span>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="">
        <div class="tip_right backg-bor-style">
          <div class="text">&emsp;
            <span></span>
          </div>
          <div class="content">
            <div class="left">
              <img src="../../img/nan.png"/>
            </div>
            <div class="right">
              <ul class="ui">
                <li class="li">
                  <img src="../../img/icon.png"/>
                  <span>男生人数：</span>
                  <span>{{isNull(curHwArr.manCount)}}人</span>
                </li>
                <li class="li">
                  <img src="../../img/icon.png"/>
                  <span>平均身高：</span>
                  <span>{{isNull(curHwArr.manHeight,1)}}CM</span>
                </li>
                <li class="li">
                  <img src="../../img/icon.png"/>
                  <span>平均体重</span>
                  <span>{{isNull(curHwArr.manweight,1)}}KG </span>
                </li>
                <!-- <li class="li">
                   <img src="../../img/icon.png"/>
                   <span>体重超重：</span>
                   <span>{{'&#45;&#45;'}}%</span>
                 </li>-->
                <li class="li">
                  <img src="../../img/icon.png"/>
                  <span>体态问题高发年级/年龄：</span>
                  <span>{{isNull(curHwArr.curManGrade)}}/{{isNull(curHwArr.curManAge)}}岁</span>
                </li>
                <li class="li">
                  <img src="../../img/icon.png"/>
                  <span>风险最高症状：</span>
                  <span>{{isNull(curHwArr.curManMaxRisk)}}</span>
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
                  <span>女生人数：</span>
                  <span>{{isNull(curHwArr.femaleCount)}}人</span>
                </li>
                <li class="li">
                  <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                  <span>平均身高：</span>
                  <span>{{isNull(curHwArr.femaleHeight,1)}}CM</span>
                </li>
                <li class="li">
                  <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                  <span>平均体重：</span>
                  <span>{{isNull(curHwArr.femaleweight,1)}}KG</span>
                </li>
                <!-- <li class="li">
                   <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                   <span>体重超重：</span>
                   <span>&#45;&#45;%</span>
                 </li>-->
                <li class="li">
                  <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                  <span>体态问题高发年级/年龄：</span>
                  <span>{{isNull(curHwArr.curFemaleGrade)}}/{{isNull(curHwArr.curFemaleAge)}}岁</span>
                </li>
                <li class="li">
                  <img src="../../img/nu.png" style="width: 11px;height: 11px;"/>
                  <span>风险最高症状：</span>
                  <span>{{isNull(curHwArr.curFemaleMaxRisk)}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-bottom: 20px;margin-top: -80px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="backg-bor-style" style="padding: 10px 0 10px 10px;">
          <el-popover placement="top" width="200" trigger="hover">
            <div>
              <p>
                                <span>该数值为系统针对每个问题综合计算得出， 预测代表5～10年内不做纠偏后可能出现下列症状的预估人数，对于问题较严重者， 或已出现症状前兆，仅作参考。
                                </span>
              </p>
            </div>
            <span slot="reference">
                            <span class="ext-poptip-btn">风险预测：</span>
                        </span>
          </el-popover>
          <!-- <span style="font-weight: bold;">风险预测</span>-->
        </div>
        <div class="">
          <fenxian :tableData="tableData" v-if="tableData&&tableData.length>0"></fenxian>
          <noData v-else></noData>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import navTitle from 'components/navTitle'
  import fenxian from '../xueSheng/bash/bash/fenxian'
  import noData from 'components/noData'

  export default {
    components: {navTitle, fenxian, noData},
    props: {},
    data() {
      return {
        area: {
          cityProps: {
            value: 'id',
            children: 'children'
          },
          //  birthplace: [],
          cityOptions: [],
          cityOptionsArr: []
        },

        form: {
          city: [],
          schoolType: '',
          schoolId: '',
          nj: '',
          age: '',
          time: '',
          sex: ''
        },
        // 获取学校的类型
        schoolTypeArr: [],
        //获取学校
        schoolArr: [],
        //获取年级
        gradeArr: [],
        // 体检时间
        timeArr: [],
        // 年龄
        ageArr: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        //定一个标识，只有先选择了地区后，学校类型跟学校才会里面的获取数据方法
        flagA: false,

        // 获取人体数据
        reTiObj: {
          bodyCenterCount: '',
          headCount: '',
          headForeCount: '',
          humpCount: '',
          legxoCount: '',
          pelvispitchCount: '',
          shoulderCount: ''
        },
        // 风险数据
        tableData: [],
        // 检测数据综合分析评级：
        curHwArr: {
          curFemaleAge: '',
          curFemaleGrade: '',
          curFemaleMaxRisk: '',
          femaleCount: '',
          femaleHeight: '',
          femaleweight: '',

          curManAge: '',
          curManGrade: '',
          curManMaxRisk: '',
          manCount: '',
          manHeight: '',
          manweight: '',
          // height: 129.2763,

          // weight: 46.1579,
        }
      }
    },
    watch: {},
    computed: {},
    created() {
      this._getAreaSchoolList()
      this.$notify({
        title: '提示',
        type: 'warning',
        duration: '3000',
        offset: 130,
        message: '最少选择一个时间才可以查询数据~'
      });
    },

    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      // 确认按钮
      handelFn() {
        this._getAreaReportRisk()
        this._getZongHeAnalysis()
        this._getTiTaiAnalysis()
      },
      // 重置
      resetFn() {
        this.form = {city: [], schoolType: '', schoolId: '', nj: '', age: '', time: '', sex: ''}
        this._getAreaSchoolList()
        this.flagA = false
      },
      // 地区
      selectChangeCity(val) {
        this.flagA = true
        this._getAreaSchoolList()

        this.form.schoolType = ''
        this.form.schoolId = ''
        this.form.nj = ''
        this.form.age = ''
        this.form.time = ''
        this.form.sex = ''

      },
      // 类型
      selectChangeSchType(val) {
        if (this.flagA) {
          this._getAreaSchoolList()
        }
        this.gradeArr = this.schoolTypeArr[0].children
        this.form.schoolId = ''
        this.form.nj = ''
        this.form.age = ''
        this.form.time = ''
        this.form.sex = ''
      },
      // 学校
      selectChangeCchoolIdFn(val) {
        if (this.flagA) {
          this._getAreaSchoolList()
        }

        this.form.nj = ''
        this.form.age = ''
        this.form.time = ''
        this.form.sex = ''
      },
      selectChangeNj(val) {

      },
      selectChangeAge(val) {

      },
      selectChangeTime(val) {

      },
      selectChangeSex(val) {

      },

      //查询
      _getAreaSchoolList(level) {
        let [provinceCode, cityCode, areaCode] = this.form.city
        let params = {
          provinceCode: provinceCode,
          cityCode: cityCode,
          areaCode: areaCode,
          schoolLevel: this.form.schoolType,
          schoolId: this.form.schoolId,
        }
        this.$fetch.dataApi.getAreaSchoolList(params)
          .then(({data, msg, total}) => {
            //获取地区
            this.area.cityOptionsArr = data.areaList;
            // 获取学校类型
            this.schoolTypeArr = data.gradeList
            //获取学校
            this.schoolArr = data.schoolList
            // 获取时间
            this.timeArr = data.exanTimeList
            // 获取年龄
            this.ageArr = data.ageList

          })
      },

      //风险预测
      _getAreaReportRisk() {
        let [provinceCode, cityCode, areaCode] = this.form.city
        let params = {
          provinceCode: provinceCode,
          cityCode: cityCode,
          areaCode: areaCode,
          schoolLevel: this.form.schoolType,
          schoolId: this.form.schoolId,
          sex: this.form.sex,
          // age: this.form.age,
          gradeId: this.form.nj,
          checkTime: this.form.time
        };
        this.$fetch.dataApi.getAreaReportRisk(params)
          .then(({data, msg, total}) => {
            if (data && data.cur && data.cur.length > 0) {
              let dataA = data.cur[0]
              this.tableData = [
                dataA.lumbago, dataA.dizzy, dataA.headache,
                dataA.hemp, dataA.cervicalDege, dataA.nsPain,
                dataA.spur, dataA.constipation, dataA.backache, dataA.ringEar,
                dataA.deforeSpine, dataA.chronicStrain, dataA.lumbaDisk,
                dataA.physicalFatigue, dataA.kjPain, dataA.dryEye, dataA.insomnia,
                dataA.shortBreath
              ]
            }
          })
          .catch(() => {
            console.log("请求失败");
          });
      },
      //本次检测数据综合分析评级
      _getZongHeAnalysis() {
        let [provinceCode, cityCode, areaCode] = this.form.city
        let params = {
          provinceCode: provinceCode,
          cityCode: cityCode,
          areaCode: areaCode,
          schoolLevel: this.form.schoolType,
          schoolId: this.form.schoolId,
          sex: this.form.sex,
          // age: this.form.age,
          gradeId: this.form.nj,
          checkTime: this.form.time
        };
        this.$fetch.dataApi.getZongHeAnalysis(params)
          .then(({data, msg, total}) => {
            if (data && data.curHw) {
              let dataA = data.curHw
              this.curHwArr = {
                curFemaleAge: dataA.curFemaleAge,
                curFemaleGrade: dataA.curFemaleGrade,
                curFemaleMaxRisk: dataA.curFemaleMaxRisk,
                femaleCount: dataA.femaleCount,
                femaleHeight: dataA.femaleHeight,
                femaleweight: dataA.femaleweight,

                curManAge: dataA.curManAge,
                curManGrade: dataA.curManGrade,
                curManMaxRisk: dataA.curManMaxRisk,
                manCount: dataA.manCount,
                manHeight: dataA.manHeight,
                manweight: dataA.manweight,
              }
            }
          })

      },

      //人形的体态数据
      _getTiTaiAnalysis() {
        let [provinceCode, cityCode, areaCode] = this.form.city
        let params = {
          provinceCode: provinceCode,
          cityCode: cityCode,
          areaCode: areaCode,
          schoolLevel: this.form.schoolType,
          schoolId: this.form.schoolId,
          sex: this.form.sex,
          // age: this.form.age,
          gradeId: this.form.nj,
          checkTime: this.form.time
        };
        this.$fetch.dataApi.getTiTaiAnalysis(params)
          .then(({data, msg, total}) => {
            if (data && data.cur && data.cur.length > 0) {
              let dataA = data.cur[0]
              this.reTiObj = {
                bodyCenterCount: dataA.bodyCenterCount,
                headCount: dataA.headCount,
                headForeCount: dataA.headForeCount,
                humpCount: dataA.humpCount,
                legxoCount: dataA.legxoCount,
                pelvispitchCount: dataA.pelvispitchCount,
                shoulderCount: dataA.shoulderCount
              }
            } else {
              this.reTiObj = {
                bodyCenterCount: '',
                headCount: '',
                headForeCount: '',
                humpCount: '',
                legxoCount: '',
                pelvispitchCount: '',
                shoulderCount: ''
              }
            }
          })
          .catch(() => {
            console.log("请求失败");
          });
      },
    }

  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .tip_pro {
    height: 400px;
    .tip_left {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 410px;
      background: url('../../img/rentian1.png') no-repeat;
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
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    .text {
      padding: 10px;
      color: #000;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      span {
        display: inline-block;
        margin-left: 30px;
        color: #f00;
      }
    }
    .content {
      height: 179px;
      margin-left: 20%;
      .left {
        position: relative;
        top: 0;
        display: inline-block;
      }
      .right {
        // float: right;
        display: inline-block;
      }
      .left:after,
      .right:after {
        height: 0;
        content: '';
        visibility: hidden;
        overflow: hidden;
        clear: both;
      }
      .left {
        height: 100%;
        margin-right: 15px;

        img {
          // margin-top: 40px;
          vertical-align: sub;
        }
      }
      .right {
        .ui {
          .li {
            padding: 4px;
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
