<template>
  <div>
    <div class="content-bj">
      <navTitle :navArr="['设置','权限设置']"></navTitle>
      <div v-if="action == 'list'">
        <el-row type="flex" align="middle">
          <div class="condition-container">
            <el-button class="item" type="primary" @click="editFn" size="small">添加管理员</el-button>
          </div>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="6" style="min-width: 200px; height:433px;" class="userTypeLeft">
            <div style="background: #f5f5f5;height: 100%">
              <div class="jurisdictionListTitle">
                角色管理
              </div>
              <ul>
                <li v-for="(x,key) in tableDataList" :class="{'zhong' :radioTab==key}" @click="changeRadio(key)">
                  {{x.roleName}}
                  <el-dropdown trigger="click" style="float:right; margin-right:20px;">
                  <span style="color:#fff;">
                    <i class="el-icon-edit"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown" style="margin-left:22%;">
                      <i class="jurisdictionBtn" @click="_getFunctionList(x.id)">编辑</i>
                      <i class="jurisdictionBtn" @click="_deleteRole(x.id)" style="color:red;">删除</i>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </ul>
              <div class="addUser">
                <el-button style="border:none; width:100%;" @click="_getFunctionList()" size="small">添加角色</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="18" class="backg-bor-style"><!--v-for="(x,key) in tableDataList" v-if="radioTab==key"-->
            <el-table class="backg-bor-style"  :data="tableData" width="100%" size="medium">

              <!-- 人员 -->

              <el-table-column
                label="人员">
                <template slot-scope="scope">
                  <span>{{scope.row.userName}}</span>
                  <img :src="scope.row.imgUrl" style="height: 50px; width: 50px; border-radius: 50%;"/>
                </template>
              </el-table-column>

              <!-- 角色类型 -->
              <el-table-column
                label="角色类型"
                prop="roleType"
                :formatter="userTypeFormate"
              >
              </el-table-column>

              <!-- 手机号码 -->
              <el-table-column
                label="手机号码"
                show-overflow-tooltip
                prop="phone"
              >
              </el-table-column>

              <!-- 邮箱地址 -->
              <el-table-column
                label="邮箱地址"
                show-overflow-tooltip
                prop="email"
              >
              </el-table-column>

              <!-- 创建时间 -->
              <el-table-column
                label="创建时间"
                show-overflow-tooltip
                prop="createTime"
              >
              </el-table-column>

              <!-- 操作 -->
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="editFn(scope.row)" type="text" size="mini">编辑</el-button>
                  <el-button @click="_deleteUser(scope.row.id)" type="text" size="mini">删除</el-button>
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
          </el-col>
        </el-row>
        <div class="dialog">
          <el-dialog :visible.sync="dialogVisible" width="45%">
            <div style="margin-left:20px; margin-bottom:20px;">
              角色姓名设置
              <el-input v-model="roleName" placeholder="请输入添加的角色名称" style="width:400px; margin-left:20px;"></el-input>
            </div>
            <div style="margin-left:20px; margin-bottom:20px;">
              配置角色权限
              <el-tree :data="data2" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
                       :default-checked-keys="checkList">
              </el-tree>
            </div>
            <span slot="footer" style="width:164px; margin-right:40%; display: inline-block; ">
                <el-button @click="closeFn(false)">取 消</el-button>
                <el-button type="primary" @click="_saveOrUpdateRole()">确 定</el-button>
              </span>
          </el-dialog>
        </div>
      </div>
    </div>

    <div v-if="action == 'add' || action == 'edit'">
      <editAdd :action="action" @closeFn="closeFn" :colObj="colObj"></editAdd>
    </div>
  </div>
</template>
<script>
  import bottomToolBar from "components/bottomToolBar";
  import navTitle from "components/navTitle";
  import editAdd from "./authorityAddEdit/authAddEdit.vue";
  export default {
    components: {
      navTitle, bottomToolBar, editAdd
    },
    props: {},
    data() {
      return {
        data2: [],
        roleName: "",
        roleId: "",
        checkList: [],
        input: "",
        tableData: [],
        tableDataList: [],
        tableDataSaveOrUpdateRole: [],
        radioTab: 0,
        //分页
        currentPage: 1,
        total: 0,
        pageSize: 10,
        action: "list",
        dialogVisible: false,
        // 用于保存一条数据
        colObj: {},
        imageUrl: require("../img/logo.png"),
        img: require("../img/logo.png"),
        roleIdJl:undefined,
      };
    },
    watch: {},
    computed: {},
    created() {

    },
    mounted() {
      this.$nextTick(() => {
        this._getRoleList('init');
      //  this._getUserList(3, null);
      });
    },
    dialogVisibleFn() {
      this.dialogVisible = true;
    },
    methods: {
      changeRadio(radio) {
        this.radioTab = radio;
        let tableData = this.tableDataList[radio];
        this.roleIdJl = tableData.id
        this._getUserList(3, this.roleIdJl);
      },
      //点击添加角色按钮
      addUserFn() {
        this.dialogVisible = true;
      },
      _deleteRole(roleId) {
        this.roleId = roleId;
        let params = {
          roleId: roleId
        };
        this.$fetch.dataApi.deleteRole(params).then(({data, msg}) => {
          this._getRoleList();

        });
      },
      //获取指定角色对用的功能列表
      _getFunctionList(roleId) {
        this.dialogVisible = true;
        this.roleId = roleId;
        let params = {
          roleId: roleId
        };
        this.$fetch.dataApi.getFunctionList(params).then(({data}) => {
          this.data2 = data.authorFunctionVoList;
          this.checkList = data.checkList;
          console.info(this.checkList)
          this.roleName = data.roleName;
        });

      },

      //角色编辑或新增
      _saveOrUpdateRole() {
        let self = this
        let data = {
          functionIdList: this.$refs.tree.getCheckedKeys(),
          id: this.roleId,
          roleName: this.roleName
        };

        self.$fetch.dataApi.saveOrUpdateRole(data).then(res => {
          this.dialogVisible = false;
          this._getRoleList();
        });

      },

      //获取管理员列表，传值（3）
      _getUserList(userType, roleId) {
        let params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          userType: userType,
          roleId: roleId
        };
        this.$fetch.dataApi
          .getUserList(params)
          .then(({data, msg, total}) => {
            this.tableData = data;
            this.total = total;
            this.load_data = false;
          })
          .catch(() => {
            this.load_data = false;
          });
      },

      // 获取角色列表
      _getRoleList(flag) {
        this.$fetch.dataApi.getRoleList({}).then(({data}) => {

            if (data && data.length > 0) {
              this.tableDataList = data;
              if (flag==='init'){
                this.roleIdJl = this.tableDataList[0].id
                this._getUserList(3, this.roleIdJl);

              } else {
                this._getUserList(3, this.roleIdJl);
              }
            }
          })
          .catch(() => {
            // this.load_data = false
          });
      },
      // 删除
      _deleteUser(ids) {
        let params = {
          userId: ids
        };
        this.$fetch.dataApi
          .deleteUser(params)
          .then(({data, msg, total}) => {
            this.changeRadio(this.radioTab);
          })
          .catch(() => {
          });
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this._getAdminUserList();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this._getAdminUserList();
      },
      // 点击编辑按钮
      editFn(obj) {
        this.colObj = Object.assign({}, obj);
        this.action = "edit";
      },
      addPageFn() {
        this.colObj = Object.assign(
          {},
          {imagePath: "", level: 2, title: "", content: "", id: ""}
        );
        this.action = "add";
      },
      // 取消
      closeFn(bool) {
        this.action = "list";
       // this.dialogVisible = bool;
        if (bool) {
          this._getRoleList();
        }
      },
      userTypeFormate(userType) {
        // return userType == 1 ? "普通管理员" : "超级管理员";
        return this.tableDataList[this.radioTab].roleName;
      }
    }
  };
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .jurisdictionListTitle {
    text-indent: 2em;
    line-height: 55px;
    font-size: 14px;
    color: #000;
    font-weight: bold;
    background: #cccccc;
  }

  .userTypeLeft ul {
    height: 85%;
    margin-top: 12px;
  }

  .userTypeLeft li {
    display: inline-block;
    width: 100%;
    color: #333;
    font-size: 14px;
    line-height: 30px;
    text-indent: 2em;
    cursor: pointer;
  }

  .zhong {
    background-color: #009ee0;
    color: #fff !important;
  }

  .addUser {
    width: 60%;
    line-height: 30px;
    color: #009ee0;
    margin-left: 20%;
    border: 1px solid #009ee0;
    position: relative;
    top: -50px;
  }

  .jurisdictionBtn {
    display: block;
    width: 70px;
    line-height: 32px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
  }

  .jurisdictionBtn:hover {
    background-color: rgb(185, 231, 250);
  }
</style>
