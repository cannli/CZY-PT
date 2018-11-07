<template>
  <div>
    <el-row class="backg-bor-style">

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="studentId" label="学生编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="custCode" label="体检编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="userName" label="学生姓名">
        </el-table-column>
        <el-table-column prop="schoolName" label="学校名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gradeName" label="年级">
        </el-table-column>
        <el-table-column prop="schoolClassName" label="班级">
        </el-table-column>
        <el-table-column label="身高">
          <template slot-scope="scope">
            {{isNull(scope.row.custHeight)}}
          </template>

        </el-table-column>
        <el-table-column label="体重">
          <template slot-scope="scope">
            {{isNull(scope.row.custWeight)}}
          </template>
        </el-table-column>
        <!--<el-table-column label="鞋码">-->
        <!--<template slot-scope="scope">-->
        <!--{{isNull(scope.row.custShoeSize)}}-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" v-if="scope.row.status==1" type="text" size="small">添加
            </el-button>
            <el-button v-if="scope.row.status==3" type="text" size="small" @click="syncExamFn(scope.row.custCode)">同dd步
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div class="dialog">
      <el-dialog :visible.sync="dialogVisible" width="45%">
        <div style="margin-left:20px; margin-bottom:20px;">
          身高
          <el-input v-model="modifyHWS.custHeight" placeholder="请输入身高"
                    style="width:400px; margin-left:20px;"></el-input>
        </div>
        <div style="margin-left:20px; margin-bottom:20px;">
          体重
          <el-input v-model="modifyHWS.custWeight" placeholder="请输入体重"
                    style="width:400px; margin-left:20px;"></el-input>
        </div>
        <!--<div style="margin-left:20px; margin-bottom:20px;">-->
        <!--鞋码-->
        <!--<el-input v-model="modifyHWS.custShoeSize" placeholder="请输入鞋码"-->
        <!--style="width:400px; margin-left:20px;"></el-input>-->
        <!--</div>-->
        <span slot="footer" style="width:164px; margin-right:40%; display: inline-block; ">
                <el-button @click="closeFn">取 消</el-button>
                <el-button type="primary" @click="_addStudentHeightWeight()">确 定</el-button>
              </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import bottomToolBar from 'components/bottomToolBar'

  export default {
    name: "student-exam",
    components: {bottomToolBar},

    data() {
      return {
        modifyHWS: {},
        dialogVisible: false,
      }
    },
    props: {
      tableData: Array,
      projectCode: [String, Number]
    },//["tableData"],
    mounted() {
    },
    created() {
    },
    methods: {
      closeFn() {
        this.modifyHWS = {};
        this.dialogVisible = false
      },
      handleClick(row) {
        this.modifyHWS = Object.assign({}, row)
        this.dialogVisible = true
      },
      _addStudentHeightWeight() {
        let params = this.modifyHWS;
        this.$fetch.dataApi.addStudentHeightWeight(params).then(({data, msg, total}) => {
          this.$emit('_getExamStudent');
          this.dialogVisible = false
        }).catch(() => {
          this.load_data = false
        })
      },
      syncExamFn(custCode) {
        alert(custCode)
        let self = this
        let params = {
          projectCode: self.projectCode,
          custCode
        }
        self.$fetch.dataApi.syncExam(params).then(({data, msg, total}) => {
          self.$message({
            message: '操作成功',
            type: 'success'
          });
        }).catch(() => {

        })
      }
    },
  }
</script>

<style scoped>

</style>
