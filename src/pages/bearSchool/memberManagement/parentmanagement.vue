<template>
  <div>
    <div class="content-bj">
      <navTitle :navArr="['用户','家长管理']"></navTitle>
      <div v-if="action == 'list'">
      <!--  <el-row type="flex" align="middle">
          <div class="condition-container">

            <el-input class="searchTxt" v-model="input" placeholder="搜索" size="small" style="width: 400px;right: 10%;"
                      suffix-icon="el-icon-search"></el-input>
            <el-button class="searchBtn" type="primary" size="small">导出数据</el-button>
          </div>
        </el-row>-->

        <el-row type="flex" align="middle">
          <div class="condition-container">
            <div class="searchTxt">
              <el-input class="input" v-model="input" placeholder="昵称/姓名/手机号" size="small"></el-input>
              <el-button class="searchBtn" @click="_getParentList" type="primary" size="small">查询</el-button>
              <!--<el-button class="searchBtn" @click="" type="primary" size="small">导出数据-->
              <!--</el-button>-->
            </div>
          </div>
        </el-row>

        <el-table
          class="backg-bor-style"
          v-loading="load_data"
          :data="tableData"
          style="width: 100%;"
        size="medium">
          <el-table-column
            prop="nickName"
            label="昵称">
            <template slot-scope="scope">
              {{isNull(scope.row.nickName)}}
            </template>


          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
            <template slot-scope="scope">
              {{isNull(scope.row.name)}}
            </template>

          </el-table-column>

          <el-table-column
            prop="phone"
            label="手机号码">
          </el-table-column>

          <el-table-column
            label="性别">
            <template slot-scope="scope">
              {{scope.row.sex == 1 ? '男' : !scope.row.sex ? '-': '女'}}
            </template>
          </el-table-column>

          <el-table-column
            prop="createTime"
            label="注册时间">
          </el-table-column>

          <el-table-column
            label="操作"
            width="130">
            <template slot-scope="scope">
              <el-button @click="editFn(scope.row.id)" type="text" size="mini">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <bottom-tool-bar>
          <!--分页-->
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
      <div v-if="action == 'add' || action == 'edit'">
        <editAdd :action="action" @closeFn="closeFn" :colObj="colObj"></editAdd>
      </div>

    </div>
  </div>
</template>


<script>
  import bottomToolBar from 'components/bottomToolBar'
  import navTitle from 'components/navTitle'
  import editAdd from './school/parentdetails.vue'

  export default {
    components: {navTitle, bottomToolBar, editAdd},
    props: {},
    data() {
      return {
        load_data: false,
        input: '',
        tableData: [],
        // 分页
        currentPage: 1, // 分页
        total: 0,
        pageSize: 10,
        action: 'list',
        // 用于保存一条数据
        colObj: {},
      }
    },
    watch: {},
    computed: {},
    created() {
      this._getParentList()
    },
    mounted() {
    },
    methods: {


      // 获取家长信息
      _getParentList() {
        let params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.input
        }
        this.$fetch.dataApi.getParentList(params).then(({data, msg, total}) => {
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
        this._getParentList()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._getParentList()
      },
      // 点击查看详情按钮
      editFn(obj) {
        console.info(obj)
        this.colObj = obj
        this.action = 'edit'
      },

      // 取消
      closeFn(bool) {
        this.action = 'list'
        if (bool) {
          this._getParentList()
        }
      },
      //判断性别
      sexFormate(sex) {
        return sex == '1' ? "男" : "2";
      }

    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
