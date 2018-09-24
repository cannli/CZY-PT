<template>
  <div>
    <div class="content-bj" v-if="active===1">
      <navTitle :navArr="['报告','学生体检管理']"></navTitle>

      <el-row type="flex" align="middle">
        <div class="condition-container">
          <div class="searchTxt">
            <el-input class="input200" v-model="school" placeholder="学校" size="small" clearable></el-input>
            <el-input class="input200" v-model="input" placeholder="学生姓名/学生编号" size="small" clearable></el-input>
            <el-select v-model="schoolType" clearable placeholder="请选择学校类型" size="small" clearable>
              <el-option
                class="input200"
                v-for="item in dataEnum.schoolType"
                :key="item.val"
                :label="item.name"
                :value="item.val">
              </el-option>
            </el-select>
            <el-select v-model="fgrade" clearable placeholder="请选择班级/年级" size="small">
              <el-option
                class="input200"
                v-for="item in dataEnum.fgrade"
                :key="item.val"
                :label="item.name"
                :value="item.val">
              </el-option>
            </el-select>
            <el-button class="searchBtn" @click="_getExamStudent" type="primary" size="small">查询
            </el-button>
          </div>
        </div>
      </el-row>

      <el-row class="backg-bor-style">
        <el-table :data="tableData" style="width: 100%;">

          <el-table-column prop="studentId" label="学生编号"></el-table-column>

          <el-table-column prop="userName" label="学生姓名"></el-table-column>

          <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>

          <el-table-column prop="gradeName" label="年级"></el-table-column>

          <el-table-column prop="schoolClassName" label="班级"></el-table-column>

          <el-table-column prop="createTime" label="体检时间"></el-table-column>

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="detailsFn(1,scope.row.studentId)" type="text" size="mini">查看详情</el-button>
              <el-button @click="detailsFn(2,scope.row.studentId)" type="text" size="mini">成长轨迹</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <bottom-tool-bar> <!-- :disabled="batch_select.length === 0"-->
        <!--分页-->
        <div slot="page" class="pagination-sty">
          <el-pagination
            @size-change="examStudentHandleSizeChange"
            @current-change="examStudenthandleCurrentChange"
            :current-page="examStudentCurrentPage"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="studnetTotal">
          </el-pagination>
        </div>
      </bottom-tool-bar>

    </div>

    <div v-if="active===2">
      <xue-sheng :page="page" @blockFn="blockFn" :studentId="studentId"></xue-sheng>
    </div>
  </div>
</template>

<script>
  import bottomToolBar from 'components/bottomToolBar'
  import navTitle from 'components/navTitle'
  import xueSheng from './xueSheng/xueSheng.vue'

  export default {
    components: {navTitle, bottomToolBar, xueSheng},
    props: {},
    data() {
      return {

        school: '',
        fgrade: '',
        schoolType: '',
        input: '',

        page: 1,
        tableData: [],
        examProjectTableData: [],
        // 分页
        examStudentCurrentPage: 1,
        studnetTotal: 0,
        examStudentPageSize: 10,
        active: 1,
        // 用于保存一条数据
        colObj: {},
        SPtitle: [
          '学生', '项目'
        ],
        studentId: "",
      }
    },
    watch: {},
    computed: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this._getExamStudent()
      })
    },

    methods: {
      // 获取学生列表
      _getExamStudent() {
        //         schoolName 学校名  studentName学生名或者编号 schoolLevel学校类别 gradeId年级

        let params = {
          pageNum: this.examStudentCurrentPage,
          pageSize: this.examStudentPageSize,
          status: 2,

          schoolName: this.school,
          gradeId: this.fgrade,
          schoolLevel: this.schoolType,
          studentName: this.input,
        }
        this.$fetch.dataApi.getExamStudent(params).then(({data, msg, total}) => {
          this.tableData = data
          this.studnetTotal = total
          this.load_data = false
        }).catch(() => {
          this.load_data = false
        })
      },


      // 学生
      examStudentHandleSizeChange(val) {
        this.examStudentPageSize = val
        this.examStudentCurrentPage = 1
        this._getExamStudent()
      },
      //学生列表分页条数变化
      examStudenthandleCurrentChange(val) {
        this.examStudentCurrentPage = val
        this._getExamStudent()
      },
      detailsFn(num, studentId) {
        this.active = 2
        this.page = num
        this.studentId = studentId
      },
      blockFn() {
        this.active = 1
      }
    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .zhong {
    background: #009EE0 !important;
    color: #fff;
    border-radius: 3px;
  }
</style>
