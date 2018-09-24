<template>
  <div>
    <div class="content-bj">
      <el-button class="block-but" @click="blockFn">返回</el-button>
      <navTitle :navArr="['报告','学生体检管理', '详情']"></navTitle>
      <el-row class="mar-bot20" :gutter="20">
        <el-col :span="8" class="cardDetails">
          <div class="img1">
            <!--<img src="../../../img/lican.jpg"/>-->
          </div>
          <ul>
            <li class="ul-tip">
              <span>{{isNull(student.username)}}</span>
            </li>
            <li>
              <span class="span1">编号：</span>
              <span class="span2">{{isNull(studentExam.custCode)}}</span>
            </li>
            <li>
              <span class="span1">性别：</span>
              <span class="span2">{{verifySet(student.sex)}}</span>
            </li>
            <li>
              <span class="span1">年龄：</span>
              <span class="span2">{{isNull(studentExam.age)}}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8" class="cardDetails backg-bor-style">
          <ul>
            <li>
              <span class="span1">出生地：</span>
              <span class="span2">
                {{student.birthProvinceName}}
                     {{student.birthCityName}}
                  {{student.birthCountyName}}
              </span>
            </li>
            <li>
              <span class="span1">家长联系方式：</span>
              <span class="span2">{{isNull(student.parentsPhone)}}</span>
            </li>
            <li>
              <span class="span1">体检日期：</span>
              <span class="span2">{{isNull(studentExamRecord.testTime)}}</span>
            </li>
            <li>
              <span class="span1 spanT">综合得分 {{isNull(studentExamRecord.score)}}</span>
              <span class="span2">击败了 <span class="spanT">{{isNull(studentExamRecord.beats)}}%</span></span>
            </li>
          </ul>
        </el-col>
        <el-col :span="8" class="cardDetails backg-bor-style">
          <ul>
            <li>
              <span class="span1">学校：</span>
              <span class="span2">{{isNull(studentExam.schoolName)}}</span>
            </li>
            <li>
              <span class="span1">年级：</span>
              <span class="span2">{{arrValToName(dataEnum.fgrade, studentExam.gradeId)}}</span>
            </li>
            <li>
              <span class="span1">班级：</span>
              <span class="span2">{{studentExam.schoolClassName}}</span>
            </li>
            <li>
              <span class="span1 spanT">检测排名 {{isNull(studentExamRecord.ranking)}}</span>
              <span class="span2">总人数 {{isNull(studentExam.examNum)}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>

      <el-row :gutter="100" style="margin-bottom: 20px;">
        <el-col :xs="24" :sm="24" :lg="24" class="backg-bor-style">
          <h3 class="h3">基本数据分析</h3>
        </el-col>
        <!-- <div class="backg-bor-style" style="padding: 10px 0 10px 10px;">
           <span style="font-weight: bold;">基本数据分析</span>
         </div>-->
        <el-col :span="8" class="tip2 backg-bor-style">
          <div class="box">
            <span class="span1">身高</span><span class="span2">{{isNull(heightObj.height)}}CM</span><span class="span2">排名：{{isNull(heightObj.rank )}}</span>
          </div>
          <div class="text">
            身高说明：身高是指从头顶点(v)至地面的垂距，一般以厘米（cm）作单位，也较经常用“米”（m）。身高排名指身高在本次所有被检测人数中的排名情况
          </div>
        </el-col>
        <el-col :span="8" class="tip2 backg-bor-style">
          <div class="box">
            <span class="span1">体重</span><span class="span2">{{isNull(weightObj.weight)}}KG</span><span class="span2">排名：{{isNull(weightObj.rank )}}</span>
          </div>
          <div class="text">
            体重说明：体重是指穿着已知重量的工作衣称量得到的身体重量。体重排名指体重在本次所有被检测人数中的排名情况
          </div>
        </el-col>


        <el-col :span="8" class="tip2 backg-bor-style">
          <div class="box">
            <span class="span1">BMI</span><span class="span2">{{isNull(bmiObj.bmiNum)}}</span><span class="span2">{{isNull(bmiObj.result)}}</span>
          </div>
          <div class="text">
            BMI说明：BMI[Body Mass Index]
            即BMI指数，也叫身体质量指数，是用体重公斤数除以身高米数平方得出的数字，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。主要用于统计用途，当我们需要比较及分析一个人的体重对于不同高度的人所带来的健康影响时，BMI值是一个中立而可靠的指标。
          </div>
        </el-col>

      </el-row>

      <el-row :gutter="10" class="tip_pro" style="margin-bottom: 20px; height: 500px;">
        <el-col :span="8" class="">
          <el-card class="card">
            <h3 class="h3">体态检测分析</h3>
            <div class="tip_left">
              <span></span>
              <span>轻度头侧歪:{{isNull(studentExamRecord.headCoronalMain)}} </span>
              <span>轻度头前倾:{{isNull(studentExamRecord.headForeMain)}} </span>
              <span>弓腰驼背:{{isNull(studentExamRecord.humpBackMain)}}</span>
              <span>骨盆前/后倾:{{isNull(studentExamRecord.pelvisPitchMain)}} </span>
              <span>高低肩:{{isNull(studentExamRecord.shoulderCoronalMain)}}</span>
              <span>躯干偏移:{{isNull(studentExamRecord.bodyCenterMain)}}</span>
              <span>腿型:{{isNull(studentExamRecord.legXoMain)}}</span>
            </div>
          </el-card>
        </el-col>


        <el-col :span="8" class="">
          <el-card class="card">
            <div class="page-part">
              <h3 title="足弓发育分析">身体姿态评估</h3>
              <div class="cont flex" id="flex3">
                <div v-for="(item,n) in pgData" :key="n" class="imgTip" @click="chooseThis2(item)">
                  <!--@click="chooseThis3(item)"-->
                  <div class="text">{{item.key}}</div>
                  <img :src="item.val" alt="">
                </div>
              </div>
              <div class="cont" v-for="(x , index) in studentExamRecord.mainContent2">
                <div class="black-bold">{{x.name}}</div>
                <p class="tipP">{{x.mContent}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" class=" mar-bot20">
          <el-card class="card">
            <div class="page-part">
              <h3 title="3D骨骼肌肌筋状况">3D骨骼肌肌筋状况</h3>
              <div class="cont flex" id="flex3">
                <div v-for="(item,n) in pgData1" :key="n" class="imgTip" style="width: 50%;" @click="chooseThis2(item)">
                  <!--@click="chooseThis3(item)"-->
                  <div class="text">{{item.key}}</div>
                  <img :src="item.val" style="">
                </div>
              </div>
              <div class="cont" v-for="x in pgData2">
                <div class="black-bold">{{x.name}}</div>
                <p class="tipP">{{x.mContent}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-bottom: 20px;">
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
            <fenxian :tableData="tableData" v-if="tableData.length>0"></fenxian>
            <noData v-else></noData>
          </div>
        </el-col>
      </el-row>
      <imgCarousel :isLoading="isLoading" :imgUrl="imgUrl" @showFn="showFn"></imgCarousel>
    </div>
  </div>
</template>

<script>
  import imgCarousel from 'components/imgCarousel.vue'
  import fenxian from './bash/fenxian'
  import navTitle from 'components/navTitle'
  import pieData from 'components/echarts/pieT.vue'
  import noData from 'components/noData'
  //import vueImages from 'vue-images'
  export default {
    components: {navTitle, pieData, fenxian, noData, imgCarousel},
    props: {
      studentId: [Number, String]
    },
    data() {
      return {
        isLoading: false,
        imgUrl: '',
        images: [
          {
            imageUrl: 'https://static.littlewin.wang/blog/1-thumb.png',
            caption: '<a href="#">Photo by 1</a>'
          },
          {
            imageUrl: 'https://static.littlewin.wang/blog/2-thumb.png',
            caption: 'Photo by 2'
          },
          {
            imageUrl: 'https://static.littlewin.wang/blog/3-thumb.jpeg',
            caption: 'Photo by 3'
          },
          {
            imageUrl: 'https://static.littlewin.wang/blog/4-thumb.png',
            caption: 'Photo by 4'
          },
          {
            imageUrl: 'https://static.littlewin.wang/blog/5-thumb.png',
            caption: 'Photo by 5'
          },
          {
            imageUrl: 'https://static.littlewin.wang/blog/6-thumb.jpeg',
            caption: 'Photo by 6'
          },
          {
            imageUrl: 'https://static.littlewin.wang/blog/7-thumb.jpg',
            caption: 'Photo by 7'
          },
          {
            imageUrl: 'https://static.littlewin.wang/blog/8-thumb.png',
            caption: 'Photo by 8'
          },
          {
            imageUrl: 'https://static.littlewin.wang/blog/9-thumb.png',
            caption: 'Photo by 9'
          },
          {
            imageUrl: 'https://static.littlewin.wang/blog/10-thumb.png',
            caption: 'Photo by 10'
          }
        ],
        modalclose: true,
        keyinput: true,
        mousescroll: true,
        showclosebutton: true,
        showcaption: true,
        imagecountseparator: 'of',
        showimagecount: true,
        showthumbnails: true,
        pgData: [
          /*{
            key: '正面',
            val: require('../../../img/1.jpg')
          },
          {
            key: '反面',
            val: require('../../../img/2.jpg')
          },
          {
            key: '左侧面',
            val: require('../../../img/3.jpg')
          },
          {
            key: '右侧面',
            val: require('../../../img/4.jpg')
          }*/
        ],
        pgData1: [
          /*  {
              key: '正面',
              val: require('../../../img/5.jpg'),
            },
            {
              key: '反面',
              val: require('../../../img/6.jpg'),
            }*/
        ],
        pgData2: [],
        studentExam: {},
        student: {},
        getData: {},
        shape: {},
        studentExamRecord: {},
        getData2: [],
        // 体重
        weightObj: {},
        // 身高
        heightObj: {},
        // BMI
        bmiObj: {},
        // 获取风险数据
        tableData: []
      }
    },
    watch: {},
    computed: {},
    mounted() {
      this.$nextTick(() => {
        this._getExamStudent()
        //  this._getShapeTrail()
      })
    },
    created() {
    },
    methods: {
      showFn() {
        this.isLoading = false
      },
      chooseThis2(item) {
        this.isLoading = true
        this.imgUrl = item.val
      },
      blockFn() {
        this.$emit('blockFn')
      },
      // 获取学生列表
      _getExamStudent() {
        let params = {
          id: this.studentId,
        }
        this.$fetch.dataApi.getExamdetail(params).then(({data, msg, total}) => {
          if (!data.student) {
            this.student = {}
          } else {
            this.student = data.student
          }
          if (!data.studentExam) {
            this.studentExam = {}
          } else {
            this.studentExam = data.studentExam
          }
          if (!data.shape) {
            this.shape = {}
          } else {
            this.shape = data.shape
          }
          if (!data.studentExamRecord) {
            this.studentExamRecord = {}
          } else {
            this.studentExamRecord = data.studentExamRecord
            //  this.studentExamRecord.mainContent = JSON.parse(data.studentExamRecord.mainContent)
            this.studentExamRecord.mainContent2 = [
              {name: data.studentExamRecord.headCoronal, mContent: data.studentExamRecord.headCoronalDes},
              {name: data.studentExamRecord.humpBack, mContent: data.studentExamRecord.humpBackDes},
              {name: data.studentExamRecord.pelvisPitch, mContent: data.studentExamRecord.pelvisPitchDes},
              {name: data.studentExamRecord.legXo, mContent: data.studentExamRecord.legXoDes},
            ]
            this.pgData = [
              {key: '正面', val: data.studentExamRecord.frontImageUrl},
              {key: '反面', val: data.studentExamRecord.behindImageUrl},
              {key: '左侧面', val: data.studentExamRecord.leftImageUrl},
              {key: '右侧面', val: data.studentExamRecord.rightImageUrl}
            ]
            this.pgData1 = [
              {key: '正面', val: data.studentExamRecord.frontPerImageUrl},
              {key: '反面', val: data.studentExamRecord.behindPerImageUrl}
            ]
            console.log(data.studentExamRecord.mainContent, '888888')
            this.pgData2 = JSON.parse(data.studentExamRecord.mainContent)

          }
          // 获取风险数据
          this.tableData = [
            data.studentExamRecord.lumbago, data.studentExamRecord.dizzy, data.studentExamRecord.headache,
            data.studentExamRecord.hemp, data.studentExamRecord.cervicalDege, data.studentExamRecord.nsPain,
            data.studentExamRecord.spur, data.studentExamRecord.constipation, data.studentExamRecord.backache, data.studentExamRecord.ringEar,
            data.studentExamRecord.deforeSpine, data.studentExamRecord.chronicStrain, data.studentExamRecord.lumbaDisk,
            data.studentExamRecord.physicalFatigue, data.studentExamRecord.kjPain, data.studentExamRecord.dryEye, data.studentExamRecord.insomnia,
            data.studentExamRecord.shortBreath
          ]
          // weightObj
          if (!data.weight) {
            this.weightObj = {}
          } else {
            this.weightObj = data.weight
          }
          // heightObj
          if (!data.height) {
            this.heightObj = {}
          } else {
            this.heightObj = data.height
          }
          // bmiObj
          if (!data.weight) {
            this.bmiObj = {}
          } else {
            this.bmiObj = data.bmi
          }
          this.getData = data
        }).catch(() => {
        })
      }
    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .cardDetails {
    height: 200px;
    position: relative;
    ul {
      display: inline-block;
      margin-top: 20px;
      padding: 0 10px;
      li {
        color: #666666;
        font-size: 14px;
        padding: 10px;
        .spanT {
          font-size: 16px;
          font-weight: bold;
          display: inline-block;
          margin-right: 10px;
        }
      }
      .ul-tip {
        color: #000000;
        font-size: 16px;
        font-weight: bold;
      }

    }
    .img1 {
      float: left;
      display: inline-block;
      width: 150px;
      height: 150px;
      margin-top: 25px;
      img {
        display: inline-block;
        vertical-align: middle;
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }
  }

  .img1:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  /*tip2*/
  .tip2 {
    .box {
      padding: 30px 0 10px 0;
      border-bottom: 1px #cccccc solid;
      .span1 {
        display: inline-block;
        width: 30%;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
      .span2 {
        display: inline-block;
        width: 30%;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #f00;
      }
    }
    .text {
      font-size: 14px;
      color: #666666;
      padding: 20px;
      height: 150px;
    }
  }

  /*tip3*/
  .tip_pro {

    .tip_left {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 400px;
      background: url("../../../img/renti2.png") no-repeat;
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
        margin-left: -160px;
      }
      span:nth-child(3) {
        background: #37a1da;
        top: 45px;
        margin-left: 25px;
      }
      span:nth-child(4) {
        background: #a78ae7;
        top: 94px;
        margin-left: -185px;
      }
      span:nth-child(5) {
        background: #fec70a;
        top: 166px;
        margin-left: -185px;
      }
      span:nth-child(6) {
        background: #02789a;
        top: 107px;
        margin-left: 60px;
      }
      span:nth-child(7) {
        background: #48c0e3;
        top: 151px;
        margin-left: 53px;
      }
      span:nth-child(8) {
        background: #ff9a8e;
        bottom: 14px;
        margin-left: 40px;
      }
    }
  }

  /*tip4*/
  .page-part {
    height: 445.3px;
    overflow-y: auto;
    h3 {
      padding: 10px 0;
    }
    .cont {
      padding-left: 1%;
      .imgTip {
        display: inline-block;
        width: 25%;
        .text {
          font-size: 14px;
          color: #535351;
          text-align: center;
        }
        img {
          width: 98%;
        }
      }
      .black-bold {
        padding: 5px 0;
        font-size: 16px;
        font-weight: bold;
        color: #019DE0;
      }
      .tipP {
        margin-bottom: 10px;
        font-size: 14px;
        color: #535351;
      }
    }
  }

  .card {
    margin-right: 10px;
  }
</style>
