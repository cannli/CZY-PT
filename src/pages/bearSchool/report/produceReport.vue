<template>
  <div>
    <div class="content-bj" v-if="active===1">
      <navTitle :navArr="['报告','项目体检管理']"></navTitle>
      <el-row type="flex" align="middle">
        <div class="condition-container">
          <div class="searchTxt">
            <el-input class="input200" v-model="school" placeholder="学校" size="small" clearable></el-input>
            <el-input class="input200" v-model="input" placeholder="项目编号" size="small" clearable></el-input>
            <el-select v-model="schoolType" clearable placeholder="请选择学校类型" size="small" clearable>
              <el-option
                class="input200"
                v-for="item in dataEnum.schoolType"
                :key="item.val"
                :label="item.name"
                :value="item.val">
              </el-option>
            </el-select>
            <el-button class="searchBtn" @click="_getExamProjectList" type="primary" size="small">查询
            </el-button>
          </div>
        </div>
      </el-row>

      <el-row class="backg-bor-style">

        <el-table :data="examProjectTableData" style="width: 100%;" size="medium">
          <el-table-column prop="code" label="项目编号"></el-table-column>

          <el-table-column prop="schoolName" label="学校" show-overflow-tooltip></el-table-column>

          <el-table-column prop="schoolLevelName" label="类型"></el-table-column>

          <el-table-column prop="responsible" label="负责人"></el-table-column>

          <el-table-column prop="responsiblePhone" label="联系方式" show-overflow-tooltip></el-table-column>

          <el-table-column width="250" prop="address" label="地址" show-overflow-tooltip></el-table-column>

          <el-table-column prop="score" :formatter="_scoreFormatter" label="综合评分"></el-table-column>

          <el-table-column prop="examDate" label="体检时间"></el-table-column>

          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status==-1" style="color: red;" type="text" size="mini">拒绝</el-button>
              <el-button v-if="scope.row.status==0" style="color: gray" type="text" size="mini">已取消</el-button>
              <el-button @click="_modifyStatusExam(scope.row,2)" v-if="scope.row.status==1" type="text" size="mini">同意
              </el-button>
              <el-button @click="_modifyStatusExam(scope.row,-1)" v-if="scope.row.status==1" type="text" size="mini">
                拒绝
              </el-button>
              <el-button type="text" size="mini" @click="_examStudentDetail(scope.row.code)" v-if="scope.row.status==2">
                查看学生
              </el-button>
              <el-button type="text" size="mini" @click="_getReport(scope.row.code)" v-if="scope.row.status==2">获取体检报告
              </el-button>
              <el-button @click="examProjectDetial(scope.row.code,scope.row.schoolId)" v-if="scope.row.status==4||scope.row.status==3"
                         type="text" size="mini">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <bottom-tool-bar>
        <div slot="page" class="pagination-sty">
          <el-pagination
            @size-change="examProjectHandleSizeChange"
            @current-change="examProjectHandleCurrentChange"
            :current-page="examProjectCurrentPage"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="examProjectTotal"
          >
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>

    <div v-if="active===2"> <!--参看详情-->
      <produce :page="page" :projectCode="projectCode" :schoolId="schoolId" @closeFn="closeFn"></produce>
    </div>
    <div v-if="active===3"> <!--查看学生-->
      <students :projectCode="projectCode" @closeFn="closeFn"></students>
    </div>
  </div>

</template>
<script>
  import bottomToolBar from 'components/bottomToolBar'
  import navTitle from 'components/navTitle'
  import produce from './produce/index.vue'
  import Students from "./produce/students";

  export default {
    components: {
      Students,
      navTitle, bottomToolBar, produce
    },
    props: {},
    data() {
      return {
        school: '',
        schoolType: '',
        input: '',
        tableData: [],
        examProjectTableData: [],
        // 分页
        examProjectCurrentPage: 1,
      //  examStudentCurrentPage: 1,
        studnetTotal: 0,
        examProjectTotal: 0,
        examProjectPageSize: 10,
        examStudentPageSize: 10,
        active: 1,
        projectCode: null,
        // 用于保存一条数据
        colObj: {},
        SPtitle: ['学生', '项目'],
        page: 1,
        schoolId: ''
      }
    },
    watch: {},
    computed: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this._getExamProjectList()
      })
    },
    methods: {
      closeFn() {
        this.active = 1
      },
      // 获取项目列表
      _scoreFormatter(row) {
        return row.score ? row.score : "--";
      },
      _getReport(code) {
        let params = {
          projectCode: code
        }
        this.$fetch.dataApi
          .getReport(params)
          .then(({data, msg, total}) => {
            this.$alert("项目编号为：" + code + '的学生信息正在同步，大概需要' + data + "分钟", '提示框', {
              confirmButtonText: '确定'
            });
          })
          .catch(() => {
          })
      },
      _getExamProjectList() {
        let params = {
          pageNum: this.examProjectCurrentPage,
          pageSize: this.examStudentPageSize,
          schoolName: this.school,
          schoolLevel: this.schoolType,
          projectCode: this.input,
        }
        this.$fetch.dataApi
          .getExamProjectList(params)
          .then(({data, msg, total}) => {
            this.examProjectTableData = data
            this.examProjectTotal = total
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      examProjectHandleCurrentChange(val) {
        this.examProjectCurrentPage = val
        this._getExamProjectList()
      },
      examProjectHandleSizeChange(val) {
        this.examProjectPageSize = val
        this.examProjectCurrentPage = 1
        this._getExamProjectList()
        console.log(`每页 ${val} 条`)
      },
      _examStudentDetail(code) {
        this.projectCode = code;
        this.active = 3;
      },
      examProjectDetial(code,schoolId) {
        this.projectCode = code;
        this.schoolId=schoolId;
        this.active = 2;
        this.page = 1;
      },
      // 取消
      closeFn(bool) {
        this.active = 1
        if (bool) {
        }
      },

      _modifyStatusExam(row, val) {
        this.$fetch.dataApi
          .modifyStatusExam({status: val, id: row.id})
          .then(({data, msg, total}) => {
            row.status = val
          })
          .catch(() => {
            this.load_data = false
          })
      }


    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .zhong {
    background: #009ee0 !important;
    color: #fff;
    border-radius: 3px;
  }
</style>
