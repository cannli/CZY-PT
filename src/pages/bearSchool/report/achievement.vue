<template>
  <div>
    <div class="content-bj">
      <navTitle :navArr="['报告','上传成绩']"></navTitle>
      <div class="backg-bor-style" v-if="action == 'list'">
        <el-table
          :data="tableData"
          style="width: 100%;" size="medium">

          <el-table-column
            prop="projectCode"
            label="项目编号">
          </el-table-column>

           <el-table-column
            prop="checkTime"
            label="体检时间">
          </el-table-column>

          <el-table-column
            prop="attendNum"
            label="参与人数">
          </el-table-column>

          <el-table-column
            prop="maxDisk"
            label="风险预测最高">
          </el-table-column>

          <el-table-column
            prop="maxDiskGrade"
            label=健康异常最高年级>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="130">
            <template slot-scope="scope">
              <el-upload :action="projectRootUrl+'/admin/score/uploadScoreFile.do?examId='+scope.row.id"  :on-success="handleAvatarSuccess.bind(this,scope.row)" :show-file-list="false">
                <el-button v-if="scope.row.fileUploaded=='1'" type="text" size="mini" style="color:#787878;">重新上传</el-button>
                <el-button v-else type="text" size="mini">上传成绩</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <bottom-tool-bar>
        <div slot="page" class="pagination-sty">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>

    </div>
  </div>
</template>


<script>
  import bottomToolBar from 'components/bottomToolBar'
  import navTitle from 'components/navTitle'

  export default {
    components: {navTitle, bottomToolBar},
    props: {},
    data() {
      return {
        projectRootUrl:window.projectRootUrl,
        load_data : true,
        input: '',
        tableData: [],
        // 分页
        currentPage: 1, // 分页
        total: 0,
        pageSize: 10,
        action: 'list',


      }
    },
    watch: {},
    computed: {},
    created() {
      this._getScoreList()
      },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      handleAvatarSuccess(row,res,file,fileList){

        row.fileUploaded=1
      },
      // 获取文章
      _getScoreList() {
        let params={
          pageNum: this.currentPage,
          pageSize: this.pageSize,

        }
        this.$fetch.dataApi.getScoreList(params).then(({data, msg, total}) => {
          this.tableData = data
          this.total = total;
          this.load_data = false
        }).catch(() => {
          this.load_data = false
        })
      },

      //上传体检成绩
      _uploadScoreFile(upload) {
        let params={
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          upload:upload,
        }
        this.$fetch.dataApi.uploadScoreFile(params).then(({data, msg, total}) => {
          this.tableData = data
          this.total = total
          this.load_data = false
        }).catch(() => {
          this.load_data = false
        })
      },

      // 分页
      handleSizeChange(val) {
        this.pageSize = val
        this.currentPage = 1
        this._getScoreList()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._getScoreList()
      },

    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
