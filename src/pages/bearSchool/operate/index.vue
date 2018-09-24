<template>
  <div class="content-bj">
    <div v-if="action == 'list'">
      <navTitle :navArr="['运营','运营管理']"></navTitle>

      <el-row type="flex" align="middle">
        <div class="condition-container">

          <div class="x-panel-body">
              <ul class="items clearfix" >
                <li class="item fl" style="position:unset" :class="{'zhong': radioTab==1}" @click="changeRadio(1)" >
                  <span>学生</span>
                </li>
                <li class="item fl" style="position:unset" :class="{'zhong': radioTab==2}" @click="changeRadio(2)" >
                  <span>项目</span>
                </li>
              </ul>
          </div>
          <h3 class="feedbacktitle" >反馈信息</h3>
          <el-row v-if="radioTab==1">
            <ul v-for="x in tableData">
                  <li>
                    <div class="feedbackbox">
                      <div class="feedbackTime">
                        {{x.userName}} | {{x.createTime}}
                        <el-button type="text" @click="_deleteAdvise(x.id,userType)" style=" float: right; overflow: hidden; color: red;" >删除</el-button>
                      </div>
                      <div class="feedbackContent">
                       {{x.contents}}
                      </div>
                    </div>
                  </li>
                </ul>

          </el-row>
          <el-row v-if="radioTab==2">
            <ul v-for="x in tableData">
                  <li>
                    <div class="feedbackbox">
                      <div class="feedbackTime">
                        {{x.userName}} | {{x.createTime,userType}}
                        <el-button type="text" @click="_deleteAdvise(x.id,userType)" style=" float: right; overflow: hidden; color: red;" >删除</el-button>
                      </div>
                      <div class="feedbackContent">
                        {{x.contents}}
                      </div>
                    </div>
                  </li>
                </ul>
          </el-row>
          <bottom-tool-bar v-if="total!=0" >
              <div slot="page" style="text-align: center;">
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
        <editAdd :action="action" @closeFn="closeFn" :colObj="colObj"></editAdd>
    </div>

  </div>




</template>

<script>
  import navTitle from 'components/navTitle'
  import bottomToolBar from 'components/bottomToolBar'

  export default {
    components: {navTitle,bottomToolBar},
    props: {},
    data() {
      return {
        load_data: true,
        radioTab:1,
        tableData: [],
        userType: 1,
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
      this._adviseList(1)
    },
    methods: {

      //学生 项目 切换
      changeRadio(radio){
        this.radioTab=radio;
        this.currentPage = 1
        if(this.radioTab==1){
          this.userType = 1;
          this._adviseList(this.userType);
        }else if(this.radioTab==2){
          this.userType = 2;
          this._adviseList(this.userType);
        }
      },

      // 获取用户
      _adviseList(userType) {
        let params={
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          userType: userType
        }
        this.$fetch.dataApi.getAdviseList(params).then(({data, msg, total}) => {
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
        this._adviseList(this.userType)
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._adviseList(this.userType)
      },
      //删除
      _deleteAdvise(id,userType) {
        let self = this
        let params = {
          id:id
        }
        self.$confirm('确认删除吗？', '提示', {
          type: 'warning'
        }).then(() => {
          self.$fetch.dataApi.deleteAdvise(params).then(res => {
            self._adviseList(userType);
          }).catch(() => {
            this.load_data = false
          })
        })
      },
    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .zhong{
    background-color: #009EE0 !important;
    color: #fff;
  }
</style>

