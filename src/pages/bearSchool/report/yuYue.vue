<template>
  <div class="content-bj">
    <navTitle :navArr="['报告','体检预约']"></navTitle>
    <el-table
              :data="tableData"
              style="width: 100%">

      <el-table-column
        prop="name1"
        label="学校">
      </el-table-column>
      <el-table-column
        prop="name2"
        label="类型">
      </el-table-column>

      <el-table-column
        prop="name3"
        label="负责人">
      </el-table-column>

      <el-table-column
        prop="name4"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="name5"
        label="地址">
      </el-table-column>

      <el-table-column
        prop="name6"
        label="体检日期">
      </el-table-column>

      <el-table-column
        prop="name7"
        label="开始时间">
      </el-table-column>

      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="trueFn" type="text">同意</el-button>
          <el-button @click="falseFn" type="text">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <bottom-tool-bar>
      <!--分页-->
      <div slot="page" style="text-align: center; margin-top: 30px;">
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
</template>

<script>
  import navTitle from 'components/navTitle'
  import bottomToolBar from "components/bottomToolBar";
  export default {
    components: {navTitle,bottomToolBar},
    data() {
      return {
        tableData: [
          {
            name1: '深大',
            name2: '大学',
            name3: '陈拉倒',
            name4: '17620317582',
            name5: '深圳市',
            name6: '2018-08-28',
            name7: '09:00'
          }
        ],
        //分页
        currentPage:1,
        total: 0,
        pageSize: 10,
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
    computed: {},
    watch: {},
    methods: {
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
       // this._getAdminUserList();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
       // this._getAdminUserList();
      },
      trueFn(){
        this.$confirm('是否确认同意', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      falseFn(){
        this.$confirm('是否确认取消', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已取消删除!'
          });
        }).catch(() => {

        });
      }
    },

  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
