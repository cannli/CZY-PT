<template>
  <div>
    <div class="content-bj">
      <el-button class="block-but" @click="closeFn">返回</el-button>
      <navTitle :navArr="['报告','项目体检管理','学生']"></navTitle>
      <div class="x-panel-body">

        <el-radio-group v-model="radioVal" @change="change">
          <el-radio-button label="待体检"></el-radio-button>
          <el-radio-button label="已体检"></el-radio-button>
        </el-radio-group>
        <el-row class="mar-bot20" style="margin-top: 20px;">
          <el-col :lg="24">
            <div class="col_sty">
              <el-cascader v-model="gradeVal" style="width:210px;" clearable
                           :options="gradeArr"
                           :props="cityProps"
                           @change=""
                           change-on-select
              >
              </el-cascader>

              <el-input v-model="search" placeholder="学生编号/学生姓名/体检编号" size="medium" clearable
                        style="width: 210px;"></el-input>
              <el-button @click="_getExamStudent" type="primary" size="medium">查询</el-button>

              <!-- <el-button type="primary" size="medium" style="float: right;">打印导出</el-button>-->
            </div>
          </el-col>
        </el-row>
        <student-exam :tableData="tableData" :projectCode="projectCode"
                      @_getExamStudent="_getExamStudent"></student-exam>
        <bottom-tool-bar>
          <!--分页-->
          <div slot="page" class="pagination-sty">
            <el-pagination @size-change="examProjectHandleSizeChange" @current-change="examProjectHandleCurrentChange"
                           :current-page="examProjectCurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                           layout="total, sizes, prev, pager, next, jumper" :total="examProjectTotal">
            </el-pagination>
          </div>
        </bottom-tool-bar>
      </div>
    </div>
  </div>
</template>

<script>
  import navTitle from 'components/navTitle'
  import StudentExam from "../caseReport/studentExam";
  import bottomToolBar from 'components/bottomToolBar'

  export default {
    components: {
      StudentExam,
      navTitle,
      bottomToolBar
    },
    data() {
      return {
        cityProps: {
          value: 'id',
          children: 'children'
        },

        radioVal: '待体检',
        status: 1,
        tableData: [],

        examProjectTotal: 0,
        examProjectCurrentPage: 1,
        examProjectPageSize: 10,

        search: '',
        gradeVal: [],
        gradeArr: []
      }
    },
    props: {
      projectCode: [String, Number],
      schoolId: [String, Number]
    },
    mounted() {
      this.$nextTick(() => {
        this._getExamStudent()
        this._getGradeClassList()
      })
    },
    methods: {
      closeFn() {
        this.$emit('closeFn')
      },
      // 获取年级班级
      _getGradeClassList() {
        let params = {
          schoolId: this.schoolId
        };
        this.$fetch.dataApi
          .getGradeClassList(params)
          .then(({data}) => {
            if (data && data.length > 0) {
              this.gradeArr = data
            }
          })
      },
      change() {
        if (this.status === 1) {
          this.status = 2
        } else {
          this.status = 1
        }
        this._getExamStudent()
      },
      _getExamStudent(examProjectCurrentPage = 1) {
        // gradeId 年级  classId班级
        let [gradeId, classId] = this.gradeVal
        this.examProjectCurrentPage = this.examProjectCurrentPage
        let params = {
          pageNum: this.examProjectCurrentPage,
          pageSize: this.examProjectPageSize,
          projectCode: this.projectCode,
          status: this.status,
          search: this.search,
          gradeId,
          classId,
        }
        this.$fetch.dataApi.getExamStudent(params).then(({data, msg, total}) => {
          this.tableData = data
          this.examProjectTotal = total
          this.load_data = false
        }).catch(() => {
          this.load_data = false
        })
      },

      examProjectHandleCurrentChange(val) {
        this.examProjectCurrentPage = val
        this._getExamStudent()
      },
      examProjectHandleSizeChange(val) {
        this.examProjectPageSize = val
        this.examProjectCurrentPage = 1
        console.log(`每页 ${val} 条`)
        this._getExamStudent()
      },
    }
  }
</script>

<style scoped>

</style>
