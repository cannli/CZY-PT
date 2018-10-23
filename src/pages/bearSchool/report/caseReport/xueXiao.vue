<template>
  <div>
    <el-row :gutter="20" class="backg-bor-style mar-top20 ">
      <el-col :lg="24" class="card-panel-col20">
        <h4>A学校选择</h4>
      </el-col>
      <el-col :span="6" class="card-panel-col20">
        <!-- <div class="a-col-title">地区：</div>-->
        <div class="lucencyInput">

          <el-cascader v-model="formA.city" style="width: 80%;"
                       :options="areaA.cityOptionsArr"
                       :props="areaA.cityProps"
                       @change="selectChangeCityA"
                       placeholder="请选择地区"
                       change-on-select
                       clearable
          >
          </el-cascader>
        </div>
      </el-col>
      <el-col :span="6" class="card-panel-col20">
        <!--  <div class="a-col-title">学校类型：</div>-->
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="formA.schoolType" filterable placeholder="请选择学校类型" clearable
                     default-first-option>
            <el-option v-for="item in schoolTypeArrA" :key="item.id" :label="item.label"
                       :value="item.id"></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="6" class="card-panel-col20">
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="formA.schoolId" filterable clearable
                     @change="selectChangeCchoolIdFnA"
                     placeholder="请选择学校"
                     default-first-option>
            <el-option v-for="item in schoolArrA" :key="item.id" :label="item.schoolName"
                       :value="item.id"></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="6" class="card-panel-col20">
        <!--  <div class="a-col-title">时间：</div>-->
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="formA.time" filterable placeholder="请选择时间" clearable
                     default-first-option @change="changeFn1">
            <el-option v-for="item in timeArrA" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="backg-bor-style mar-top20 ">
      <el-col :lg="24" class="card-panel-col20">
        <h4>B学校选择</h4>
      </el-col>
      <el-col :span="6" class="card-panel-col20">
        <!-- <div class="a-col-title">地区：</div>-->
        <div class="lucencyInput">

          <el-cascader v-model="formB.city" style="width: 80%;"
                       placeholder="请选择地区"
                       :options="areaB.cityOptionsArr"
                       :props="areaB.cityProps"
                       @change="selectChangeCityB"
                       change-on-select
                       clearable
          >
          </el-cascader>
        </div>
      </el-col>
      <el-col :span="6" class="card-panel-col20">
        <!--  <div class="a-col-title">学校类型：</div>-->
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="formB.schoolType" filterable placeholder="请选择学校类型" clearable
                     default-first-option>
            <el-option v-for="item in schoolTypeArrB" :key="item.id" :label="item.label"
                       :value="item.id"></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="6" class="card-panel-col20">
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="formB.schoolId" filterable clearable
                     @change="selectChangeCchoolIdFnB"
                     placeholder="请选择学校"
                     default-first-option>
            <el-option v-for="item in schoolArrB" :key="item.id" :label="item.schoolName"
                       :value="item.id"></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="6" class="card-panel-col20">
        <!--  <div class="a-col-title">时间：</div>-->
        <div class="lucencyInput">
          <el-select size="medium" style="width: 80%;" v-model="formB.time" clearable
                     filterable placeholder="请选择时间"
                     @change="changeFn2"
                     default-first-option>
            <el-option v-for="item in timeArrB" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :lg="24" class="card-panel-col20" style="margin-top: 30px;">
        <div class="lucencyInput" style="text-align: center;">
          <el-button type="primary" @click="handelFn">确认对比</el-button>
          <el-button type="success" @click="resetFn">重置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="tip_pro mar-top20 backg-bor-style"
            style="margin-bottom: 20px; text-align: center; height: 100%;">
      <!-- <el-col :span="24" style="padding: 20px 0 40px 0;">
         <el-select size="medium" style="width: 15%; margin-right: 10%;" v-model="xueXiao1" filterable
                    placeholder="请选择学校"
                    default-first-option>
           <el-option v-for="item in dataEnum.schoolArr" :key="item.val" :label="item.name"
                      :value="item.val"></el-option>
         </el-select>
         <img src="../../img/duiB.png"/>
         <el-select size="medium" style="width: 15%; margin-left: 10%;" v-model="xueXiao2" filterable placeholder="请选择学校"
                    default-first-option>
           <el-option v-for="item in dataEnum.schoolArr" :key="item.val" :label="item.name"
                      :value="item.val"></el-option>
         </el-select>
       </el-col>-->
      <el-col :span="12" class="boxAll">
        <div class="box1">
          <div class="box box-c">
            <span class="span1 title">A区</span><span class="span2">{{stbObjA.schoolNum || 0}}人</span>
          </div>
          <div class="box">
            <span class="span1">
              <el-popover placement="top" width="200" trigger="hover">
                <div>
                  <p>
                    <span>该数值为系统针对每个问题综合计算得出，
                      预测代表5～10年内不做纠偏后可能出现下列症状的预估人数，
                      对于问题较严重者， 或已出现症状前兆，仅作参考。
                    </span>
                  </p>
                </div>
                <span slot="reference">
                  <span class="ext-poptip-btn1">BMI：</span>
                </span>
          </el-popover>
            </span><span class="span2">{{stbObjA.bim  || 0}}</span>
            <!-- <span class="span2">严重偏低</span>-->
          </div>
          <div class="box">
            <span class="span1"><el-popover placement="top" width="200" trigger="hover">
                <div>
                  <p>
                    <span>该数值为系统针对每个问题综合计算得出，
                      预测代表5～10年内不做纠偏后可能出现下列症状的预估人数，
                      对于问题较严重者， 或已出现症状前兆，仅作参考。
                    </span>
                  </p>
                </div>
                <span slot="reference">
                  <span class="ext-poptip-btn2">体重：</span>
                </span>
          </el-popover></span><span class="span2">{{stbObjA.tz  || 0}}KG</span>
            <!--<span class="span2">&#45;&#45;&lt;!&ndash;标准&ndash;&gt;</span>-->
          </div>
          <div class="box">
            <span class="span1"> <el-popover placement="top" width="200" trigger="hover">
                <div>
                  <p>
                    <span>该数值为系统针对每个问题综合计算得出，
                      预测代表5～10年内不做纠偏后可能出现下列症状的预估人数，
                      对于问题较严重者， 或已出现症状前兆，仅作参考。
                    </span>
                  </p>
                </div>
                <span slot="reference">
                  <span class="ext-poptip-btn3">身高：</span>
                </span>
          </el-popover></span><span class="span2">{{stbObjA.sg  || 0}}CM</span>
            <!--<span class="span2">&lt;!&ndash;偏低&ndash;&gt;&#45;&#45;</span>-->
          </div>
          <div class="tip_pro">
            <div class="tip_left">
              <span></span>
              <span>轻度头侧歪:{{isNull(reTiObjA.headCount)}}% </span>
              <span>轻度头前倾:{{isNull(reTiObjA.headForeCount)}}% </span>
              <span>弓腰驼背:{{isNull(reTiObjA.humpCount)}}%</span>
              <span>骨盆前/后倾:{{isNull(reTiObjA.pelvispitchCount)}}% </span>
              <span>高低肩:{{isNull(reTiObjA.shoulderCount)}}%</span>
              <span>躯干偏移:{{isNull(reTiObjA.bodyCenterCount)}}%</span>
              <span>腿型异常:{{isNull(reTiObjA.legxoCount)}}%</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="box">
        <div class="box2 ">
          <div class="box box-c">
            <span class="span1">B区</span><span class="span2">{{stbObjB.schoolNum || 0}}人</span>
          </div>
          <div class="box">
            <span class="span1">
              <el-popover placement="top" width="200" trigger="hover">
                <div>
                  <p>
                    <span>该数值为系统针对每个问题综合计算得出，
                      预测代表5～10年内不做纠偏后可能出现下列症状的预估人数，
                      对于问题较严重者， 或已出现症状前兆，仅作参考。
                    </span>
                  </p>
                </div>
                <span slot="reference">
                  <span class="ext-poptip-btn1">BMI：</span>
                </span>
          </el-popover>
            </span><span class="span2">{{stbObjB.bim || 0}}</span>
            <!-- <span class="span2">&#45;&#45;&lt;!&ndash;严重偏低&ndash;&gt;</span>-->
          </div>
          <div class="box">
            <span class="span1"><el-popover placement="top" width="200" trigger="hover">
                <div>
                  <p>
                    <span>该数值为系统针对每个问题综合计算得出，
                      预测代表5～10年内不做纠偏后可能出现下列症状的预估人数，
                      对于问题较严重者， 或已出现症状前兆，仅作参考。
                    </span>
                  </p>
                </div>
                <span slot="reference">
                  <span class="ext-poptip-btn2">体重：</span>
                </span>
          </el-popover></span><span class="span2">{{stbObjB.tz || 0}}KG</span>
          </div>
          <div class="box">
            <span class="span1"> <el-popover placement="top" width="200" trigger="hover">
                <div>
                  <p>
                    <span>该数值为系统针对每个问题综合计算得出，
                      预测代表5～10年内不做纠偏后可能出现下列症状的预估人数，
                      对于问题较严重者， 或已出现症状前兆，仅作参考。
                    </span>
                  </p>
                </div>
                <span slot="reference">
                  <span class="ext-poptip-btn3">身高：</span>
                </span>
          </el-popover></span><span class="span2">{{stbObjB.sg || 0}}CM</span>
            <!--<span class="span2">&#45;&#45;&lt;!&ndash;偏低&ndash;&gt;</span>-->
          </div>
          <div class="tip_pro">
            <div class="tip_left">
              <span></span>
              <span>轻度头侧歪:{{isNull(reTiObjB.headCount)}}% </span>
              <span>轻度头前倾:{{isNull(reTiObjB.headForeCount)}}% </span>
              <span>弓腰驼背:{{isNull(reTiObjB.humpCount)}}%</span>
              <span>骨盆前/后倾:{{isNull(reTiObjB.pelvispitchCount)}}% </span>
              <span>高低肩:{{isNull(reTiObjB.shoulderCount)}}%</span>
              <span>躯干偏移:{{isNull(reTiObjB.bodyCenterCount)}}%</span>
              <span>腿型异常:{{isNull(reTiObjB.legxoCount)}}%</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-bottom: 20px;margin-top:20px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="backg-bor-style" style="padding: 10px 0 10px 10px;">
          <el-popover placement="top" width="200" trigger="hover">
            <div>
              <p>
                <span>
                  该数值为系统针对每个问题综合计算得出，
                  预测代表5～10年内不做纠偏后可能出现下列症状的预估人数，
                  对于问题较严重者， 或已出现症状前兆，仅作参考。
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
          <echartLine
            v-if="seriesData&&seriesData.length>0"
            :seriesData="seriesData"
            :xAxisData="xAxisData"
            :legendData="xxDuiB.legendData"
            :color="['#ff0000','#00ff00']"
          ></echartLine>
           <no-data v-else></no-data>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import navTitle from 'components/navTitle'
  import echartLine from 'components/echarts/line'
  import noData from 'components/noData'

  export default {
    components: {
      navTitle, echartLine, noData
    },
    props: {},
    data() {
      return {
        /*???????????????AAAAA??????????*/
        // 获取人体数据
        reTiObjA: {
          bodyCenterCount: '',
          headCount: '',
          headForeCount: '',
          humpCount: '',
          legxoCount: '',
          pelvispitchCount: '',
          shoulderCount: ''
        },
        stbObjA: {
          schoolNum: '',
          tz: '',
          sg: '',
          bim: ''
        },
        formA: {
          city: [],
          schoolType: '',
          schoolId: '',
          //nj: '',
          // age: '',
          time: '',
          // sex: ''
        },
        areaA: {
          cityProps: {
            value: 'id',
            children: 'children'
          },
          //  birthplace: [],
          cityOptions: [],
          cityOptionsArr: []
        },
        // 获取学校的类型
        schoolTypeArrA: [],
        //获取学校
        schoolArrA: [],
        // 体检时间
        timeArrA: [],
        /*BBBBBBBBBBBBBBBBBBBBBBBBBBBBB*/
        // 获取人体数据
        reTiObjB: {
          bodyCenterCount: '',
          headCount: '',
          headForeCount: '',
          humpCount: '',
          legxoCount: '',
          pelvispitchCount: '',
          shoulderCount: ''
        },
        stbObjB: {
          schoolNum: '',
          tz: '',
          sg: '',
          bim: ''
        },
        formB: {
          city: [],
          schoolType: '',
          schoolId: '',
          // nj: '',
          // age: '',
          time: '',
          // sex: ''
        },
        areaB: {
          cityProps: {
            value: 'id',
            children: 'children'
          },
          //  birthplace: [],
          cityOptions: [],
          cityOptionsArr: []
        },
        // 获取学校的类型
        schoolTypeArrB: [],
        //获取学校
        schoolArrB: [],
        // 体检时间
        timeArrB: [],

        /**/
        flagA: false,
        flagB: false,

//        xueXiao1: undefined,
//        xueXiao2: undefined,
        xAxisData: ['颈椎退化', '骨刺', '头痛', '头晕', '手脚麻', '便秘',
          '颈肩痛', '背痛', '腰痛', '腰椎间盘突出', '膝关节痛', '胸闷气短',
          '失眠', '脊柱变形', '慢性劳损', '眼睛干涩', '身体疲倦', '耳鸣'],
        seriesData: [],
      }
    },
    watch: {},
    computed: {},
    created() {
      this._getAreaSchoolList()
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    methods: {
      changeFn1(val) {
        //  alert(val)
      },
      changeFn2(val) {
        //  alert(val)
      },
      // 确认按钮
      handelFn() {
        this._getAreaReportRiskA()

        this._getZongHeAnalysis('A')
        this._getZongHeAnalysis('B')
        this._getTiTaiAnalysis('A')
        this._getTiTaiAnalysis('B')
      },
      // 地区
      selectChangeCityA(val) {
        this.flagA = true
        this._getAreaSchoolList('A')

        this.formA.schoolType = ''
        this.formA.schoolId = ''
        this.formA.time = ''


      },
      // 类型A
      selectChangeSchTypeA(val) {
        if (this.flagA) {
          this._getAreaSchoolList('A')
        }
        this.formA.schoolIdA = ''
        this.formA.time = ''
      },
      // 学校
      selectChangeCchoolIdFnA(val) {
        if (this.flagA) {
          this._getAreaSchoolList('A')
        }

        this.formA.time = ''
      },

      /*BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB*/
      // 地区
      selectChangeCityB(val) {
        this.flagB = true
        this._getAreaSchoolList('B')

        this.formB.schoolType = ''
        this.formB.schoolId = ''
        this.formB.time = ''


      },
      // 类型
      selectChangeSchTypeB(val) {
        if (this.flagB) {
          this._getAreaSchoolList('B')
        }
        this.formB.schoolId = ''
        this.formB.time = ''
      },
      // 学校
      selectChangeCchoolIdFnB(val) {
        if (this.flagB) {
          this._getAreaSchoolList('B')
        }

        this.formB.time = ''
      },
      resetFn() {
        this.formA = {city: [], schoolType: '', schoolId: '', time: ''}
        this.formB = {city: [], schoolType: '', schoolId: '', time: ''}
        this._getAreaSchoolList()
        this.flagA = false
        this.flagB = false
      },
      //查询
      _getAreaSchoolList(flag) {
        let params = {}
        if (flag === 'A') {
          let [provinceCode, cityCode, areaCode] = this.formA.city
          params = {
            provinceCode: provinceCode,
            cityCode: cityCode,
            areaCode: areaCode,
            schoolLevel: this.formA.schoolType,
            schoolId: this.formA.schoolId,
          }
        } else {
          let [provinceCode, cityCode, areaCode] = this.formB.city
          params = {
            provinceCode: provinceCode,
            cityCode: cityCode,
            areaCode: areaCode,
            schoolLevel: this.formB.schoolType,
            schoolId: this.formB.schoolId,
          }
        }

        this.$fetch.dataApi.getAreaSchoolList(params)
          .then(({data, msg, total}) => {
            if (flag === 'A') {
              //获取地区
              this.areaA.cityOptionsArr = data.areaList;
              // 获取学校类型
              this.schoolTypeArrA = data.gradeList
              //获取学校
              this.schoolArrA = data.schoolList
              // 获取时间
              this.timeArrA = data.exanTimeList
            } else if (flag === 'B') {
              this.areaB.cityOptionsArr = data.areaList;
              this.schoolTypeArrB = data.gradeList
              this.schoolArrB = data.schoolList
              this.timeArrB = data.exanTimeList
            } else {
              this.areaA.cityOptionsArr = data.areaList;
              this.schoolTypeArrA = data.gradeList
              this.schoolArrA = data.schoolList
              this.timeArrA = data.exanTimeList

              this.areaB.cityOptionsArr = data.areaList;
              this.schoolTypeArrB = data.gradeList
              this.schoolArrB = data.schoolList
              this.timeArrB = data.exanTimeList
            }

          })
      },
      //风险预测
      _getAreaReportRiskA() {
        if (!this.formA.time || this.formA.time == '') {
          this.$alert('A学校时间不能为空~', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        if (!this.formB.time || this.formB.time == '') {
          this.$alert('B学校时间不能为空~', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        let [provinceCode, cityCode, areaCode] = this.formA.city
        let params = {
          provinceCode: provinceCode,
          cityCode: cityCode,
          areaCode: areaCode,
          schoolLevel: this.formA.schoolType,
          schoolId: this.formA.schoolId,
          checkTime: this.formA.time
        }

        this.$fetch.dataApi.getAreaReportRisk(params).then(({data, msg, total}) => {
          this.seriesData = []

          if (data && data.cur.length > 0) {
            let datas = data.cur[0]
            this.seriesData.push([
              datas.lumbago, datas.dizzy, datas.headache,
              datas.hemp, datas.cervicalDege, datas.nsPain,
              datas.spur, datas.constipation, datas.backache, datas.ringEar,
              datas.deforeSpine, datas.chronicStrain, datas.lumbaDisk,
              datas.physicalFatigue, datas.kjPain, datas.dryEye, datas.insomnia,
              datas.shortBreath
            ])
          }

          console.log(this.seriesData, 888888)
          this._getAreaReportRiskB()
        })
      },

      //风险预测
      _getAreaReportRiskB() {
        let [provinceCode, cityCode, areaCode] = this.formB.city
        let params = {
          provinceCode: provinceCode,
          cityCode: cityCode,
          areaCode: areaCode,
          schoolLevel: this.formB.schoolType,
          schoolId: this.formB.schoolId,
          checkTime: this.formB.time
        }
        this.$fetch.dataApi.getAreaReportRisk(params).then(({data, msg, total}) => {

          if (data && data.cur.length > 0) {
            let datas = data.cur[0]
            this.seriesData.push([
              datas.lumbago, datas.dizzy, datas.headache,
              datas.hemp, datas.cervicalDege, datas.nsPain,
              datas.spur, datas.constipation, datas.backache, datas.ringEar,
              datas.deforeSpine, datas.chronicStrain, datas.lumbaDisk,
              datas.physicalFatigue, datas.kjPain, datas.dryEye, datas.insomnia,
              datas.shortBreath
            ])
            console.log(this.seriesData, 999999999)
          }
        })
      },
      //人形的体态数据
      _getTiTaiAnalysis(flag) {
        let params = {}
        if (!this.formA.time || this.formA.time == '') {
          this.$alert('A学校时间不能为空~', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        if (!this.formB.time || this.formB.time == '') {
          this.$alert('B学校时间不能为空~', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        if (flag === 'A') {
          let [provinceCode, cityCode, areaCode] = this.formA.city
          params = {
            provinceCode: provinceCode,
            cityCode: cityCode,
            areaCode: areaCode,
            schoolLevel: this.formA.schoolType,
            schoolId: this.formA.schoolId,
            checkTime: this.formA.time
          }
        } else {
          let [provinceCode, cityCode, areaCode] = this.formB.city
          params = {
            provinceCode: provinceCode,
            cityCode: cityCode,
            areaCode: areaCode,
            schoolLevel: this.formB.schoolType,
            schoolId: this.formB.schoolId,
            checkTime: this.formB.time
          }
        }
        this.$fetch.dataApi.getTiTaiAnalysis(params)
          .then(({data, msg, total}) => {
            if (flag === 'A') {
              if (data && data.cur && data.cur.length > 0) {
                let dataA = data.cur[0]
                this.reTiObjA = {
                  bodyCenterCount: dataA.bodyCenterCount,
                  headCount: dataA.headCount,
                  headForeCount: dataA.headForeCount,
                  humpCount: dataA.humpCount,
                  legxoCount: dataA.legxoCount,
                  pelvispitchCount: dataA.pelvispitchCount,
                  shoulderCount: dataA.shoulderCount
                }
              } else {
                this.reTiObjB = {
                  bodyCenterCount: '',
                  headCount: '',
                  headForeCount: '',
                  humpCount: '',
                  legxoCount: '',
                  pelvispitchCount: '',
                  shoulderCount: ''
                }
              }
            } else {
              if (data && data.cur && data.cur.length > 0) {
                let dataA = data.cur[0]
                this.reTiObjB = {
                  bodyCenterCount: dataA.bodyCenterCount,
                  headCount: dataA.headCount,
                  headForeCount: dataA.headForeCount,
                  humpCount: dataA.humpCount,
                  legxoCount: dataA.legxoCount,
                  pelvispitchCount: dataA.pelvispitchCount,
                  shoulderCount: dataA.shoulderCount
                }
              } else {
                this.reTiObjB = {
                  bodyCenterCount: '',
                  headCount: '',
                  headForeCount: '',
                  humpCount: '',
                  legxoCount: '',
                  pelvispitchCount: '',
                  shoulderCount: ''
                }
              }
            }
          })
      }
      ,
      //本次检测数据综合分析评级
      _getZongHeAnalysis(flag) {
        let params = {}
        if (!this.formA.time || this.formA.time == '') {
          this.$alert('A学校时间不能为空~', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        if (!this.formB.time || this.formB.time == '') {
          this.$alert('B学校时间不能为空~', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        if (flag === 'A') {
          let [provinceCode, cityCode, areaCode] = this.formA.city
          params = {
            provinceCode: provinceCode,
            cityCode: cityCode,
            areaCode: areaCode,
            schoolLevel: this.formA.schoolType,
            schoolId: this.formA.schoolId,
            checkTime: this.formA.time
          }
        } else {
          let [provinceCode, cityCode, areaCode] = this.formB.city
          params = {
            provinceCode: provinceCode,
            cityCode: cityCode,
            areaCode: areaCode,
            schoolLevel: this.formB.schoolType,
            schoolId: this.formB.schoolId,
            checkTime: this.formB.time
          }
        }
        this.$fetch.dataApi.getZongHeAnalysis(params).then(({data, msg, total}) => {
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
            if (flag === 'A') {
              if (data && data.curHw) {
                let dataA = data.curHw
                this.stbObjA = {
                  schoolNum: this.isNull(dataA.manCount + dataA.femaleCount),
                  tz: this.isNull(dataA.curBmi.avgWeight),
                  sg: this.isNull(dataA.curBmi.avgHeight),
                  bim: this.isNull(dataA.curBmi.bmi)
                }
              }
            } else {
              if (data && data.curHw) {
                let dataA = data.curHw
                this.stbObjB = {
                  schoolNum: this.isNull(dataA.manCount + dataA.femaleCount),
                  tz: this.isNull(dataA.curBmi.avgWeight),
                  sg: this.isNull(dataA.curBmi.avgHeight),
                  bim: this.isNull(dataA.curBmi.bmi)
                }
              }
            }

          }
        })
      }
    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .ext-poptip-btn1:after {
    content: '?';
    position: absolute;
    top: 66px;
    font-weight: bold;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border-radius: 50%;
    color: #fff;
    background-color: #0000ff;
    text-align: center;
    font-size: 10px;
  }

  .ext-poptip-btn2:after {
    content: '?';
    position: absolute;
    top: 105px;
    font-weight: bold;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border-radius: 50%;
    color: #fff;
    background-color: #ff0000;
    text-align: center;
    font-size: 10px;
  }

  .ext-poptip-btn3:after {
    content: '?';
    position: absolute;
    top: 148px;
    font-weight: bold;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border-radius: 50%;
    color: #fff;
    background-color: #00ff00;
    text-align: center;
    font-size: 10px;
  }

  .box {
    padding: 10px 30px;
    .span1 {
      display: inline-block;
      width: 30%;
      text-align: left;
      font-size: 16px;
      font-weight: bold;
    }
    .span2 {
      display: inline-block;
      width: 30%;
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      color: #f00;
    }
    .title {
      font-size: 18px;
      font-weight: 800;
    }
  }

  .box-c {
    text-align: center;
    color: #0000ff;
    font-weight: 800;
    border-bottom: 1px #cccccc solid;
    /*  padding: 10px;*/
  }

  .box1 {
    width: 400px;
    position: relative;
    display: inline-block;
    padding: 10px;
  }

  .box2 {
    width: 400px;
    position: relative;
    display: inline-block;
    padding: 10px;
  }

  .tip_pro {
    height: 400px;
    .tip_left {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 400px;
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
      background: #feffbe;
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
