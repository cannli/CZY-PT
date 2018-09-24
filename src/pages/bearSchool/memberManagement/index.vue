<template>
  <div class="content-bj">
    <div v-if="action == 'list'">
      <navTitle :navArr="['用户','学校管理']"></navTitle>

      <el-row type="flex" align="middle">
        <div class="condition-container">

          <div class="x-panel-body">
            <ul class="items clearfix">
              <li class="item fl" style="position:unset" :class="{'zhong': radioTab==2}" @click="changeRadio(2)">
                <span>已审核</span>
              </li>
              <li class="item fl" style="position:unset" :class="{'zhong': radioTab==1}" @click="changeRadio(1)"
                  name="right">
                <span>未审核</span>
              </li>
            </ul>
            <!-- <div class="boxFloat">
               <el-input v-model="input" placeholder="搜索" size="small" style="width: 300px;"></el-input>
               <el-button type="primary" size="small">查询</el-button>
               <el-button type="primary" size="small">导出数据</el-button>
             </div>-->
          </div>

          <!--<el-row type="flex" align="middle">-->
          <!--<div class="condition-container">-->
          <!--<div class="searchTxt">-->
          <!--<el-input class="input" v-model="input" placeholder="搜索" size="small"></el-input>-->
          <!--<el-button class="searchBtn" @click="" type="primary" size="small">查询</el-button>-->
          <!--<el-button class="searchBtn" @click="" type="primary" size="small">导出数据-->
          <!--</el-button>-->
          <!--</div>-->
          <!--</div>-->
          <!--</el-row>-->
          <el-row v-if="radioTab==2">
            <el-table class="backg-bor-style"
                      v-loading="load_data"
                      :data="tableData"
                      style="width: 100%"
                      size="medium">
              <el-table-column
                prop="name"
                label="学校名称">
              </el-table-column>

              <el-table-column
                prop="schoolLevelName"
                label="学校类型">
              </el-table-column>

              <el-table-column
                prop="telephone"
                label="学校座机">
              </el-table-column>

              <el-table-column
                prop="responsible"
                label="负责人名称">
              </el-table-column>

              <el-table-column
                prop="responsiblePhone"
                label="手机号码" show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                prop="address"
                label="学校地址" show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                prop="createTime"
                label="注册日期">
              </el-table-column>

              <el-table-column
                label="操作"
                width="130">
                <template slot-scope="scope">
                  <el-button @click="editFn(scope.row.id)" type="text" size="mini">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row v-if="radioTab==1">
            <el-table class="backg-bor-style"
                      size="medium"
                      v-loading="load_data"
                      :data="tableData"
                      style="width: 100%">
              <el-table-column
                prop="name"
                label="学校名称">
              </el-table-column>

              <el-table-column
                prop="schoolLevel"
                label="学校类型">
              </el-table-column>

              <el-table-column
                prop="telephone"
                label="学校座机">
              </el-table-column>

              <el-table-column
                prop="responsible"
                label="负责人名称">
              </el-table-column>

              <el-table-column
                prop="responsiblePhone"
                label="手机号码" show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                prop="address"
                label="学校地址" show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                prop="createTime"
                label="注册日期">
              </el-table-column>

              <el-table-column
                label="操作"
                width="130">
                <template slot-scope="scope">
                  <el-button @click="_updateSchoolPass(scope.row.id)" type="text" size="mini">通过</el-button>
                  <el-button @click="_deleteSchool(scope.row.id)" type="text" size="mini" style="color:red;">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
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
      </el-row>


    </div>
    <div v-if="action == 'add' || action == 'edit'">
      <editAdd @closeFn="closeFn" :colObj="colObj" :cityOptionsArr="cityOptionsArr"></editAdd>
    </div>

  </div>


</template>

<script>
  import navTitle from 'components/navTitle'
  import bottomToolBar from 'components/bottomToolBar'
  import editAdd from './school/schoolManagement.vue'

  export default {
    components: {navTitle, bottomToolBar, editAdd},
    props: {},
    data() {
      return {
        radioTab: 2,
        input: null,
        load_data: true,
        phone: '',
        tableData: [],
        status: 2,
        cityOptionsArr: [],
        // 分页
        currentPage: 1, // 分页
        total: 0,
        pageSize: 10,
        action: 'list',
        // 用于保存一条数据
        colObj: undefined,
      }
    },
    watch: {},
    computed: {},
    created() {
      this._getSchoolList()
     // this._getAreaList();
    },
    methods: {

      _getAreaList() {
        this.$fetch.dataApi.getAreaList({})
          .then(({data, msg, total}) => {

            this.cityOptionsArr = data;
            console.log(data, '3333')
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },

      //学生 项目 切换
      changeRadio(radio) {
        this.radioTab = radio;
        this._getSchoolList()
      },
      // 获取用户
      _getSchoolList() {
        let params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          status: this.radioTab
        }
        this.$fetch.dataApi.getSchoolList(params).then(({data, msg, total}) => {
          this.tableData = data
          this.total = total
          this.load_data = false
        }).catch(() => {
          this.load_data = false
        })
      },
      // 点击编辑按钮
      editFn(obj) {
        console.info(obj)
        this.colObj = obj
        this.action = 'edit'
      },

      //点击通过按钮
      _updateSchoolPass(id) {

        let self = this
        let params = {
          schoolId: id
        }
        self.$confirm('确认通过吗？', '提示', {
          type: 'warning'
        }).then(() => {
          self.$fetch.dataApi.updateSchoolPass(params).then(res => {
            self._getSchoolList(1)
          }).catch(() => {
            this.load_data = false
          })
        })
      },

      //点击删除按钮
      _deleteSchool(id) {

        let self = this
        let params = {
          schoolId: id
        }
        self.$confirm('确认删除吗？', '提示', {
          type: 'error'
        }).then(() => {
          self.$fetch.dataApi.deleteSchool(params).then(res => {
            self._getSchoolList(1)
          }).catch(() => {
            this.load_data = false
          })
        })
      },

      //取消
      closeFn(bool) {
        this.action = 'list'
        if (bool) {
          this._getSchoolList()
        }
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val
        this.currentPage = 1
        this._getUserList()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._getUserList()
      },
    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .zhong {
    background: #009EE0 !important;
    color: #fff;
    border-radius: 3px;
  }

  .boxFloat {
    float: right;
    margin-top: -34px;
  }

  .boxFloat:after {
    height: 0;
    content: '';
    visibility: hidden;
    overflow: hidden;
    clear: both;
  }
</style>

