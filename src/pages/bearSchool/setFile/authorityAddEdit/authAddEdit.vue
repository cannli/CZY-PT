<template>
  <div>
    <div class="content-bj">
      <!--权限设置详情页-->
      <div style="margin-top: 52px;">

        <el-form :model="colObj2" ref="colObj2" :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-row type="flex" justify="center" style="margin-bottom: 18px;">
            <el-col :span="18" style="text-align: center;">
              <div style="margin:0 auto; background-color:red; width:315px; " class="clearfix">
                <div class="fl">
                  <el-upload class="avatar-uploader"
                             :show-file-list="false"
                             :action="projectRootUrl+'/users/uploadImg.do'"
                             :on-success="handleAvatarSuccess">
                    <img v-if="colObj2.imgUrl" :src="colObj2.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </div>
                <div class="describe fl">
                  <div class="title">*上传头像</div>
                  <div style="margin-top:26px;">
                    <p>支持JPG/PNG/BMP等格式图片</p>
                    <p>请使用高分辨透明矢量图片最佳</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <div style="width:85%; ">

              <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="18">
                    <el-form-item label="角色归属：" prop="roleId">
                        <el-select v-model="colObj2.roleId" style="width:100%;" placeholder="请选择角色归属">
                          <el-option v-for="x in RoleList" :label="x.roleName" :value="x.id"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="18">
                  <el-form-item label="设置账户：" prop="userName" size="small">
                    <el-input v-model="colObj2.userName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="18">
                  <el-form-item  prop="sex" label="性别：" size="small">
                    <el-radio-group v-model="colObj2.sex">
                      <el-radio label="1">男</el-radio>
                      <el-radio label="2">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="18">
                  <el-form-item label="*员工手机：" prop="phone" size="small">
                    <el-input v-model="colObj2.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="18">
                  <el-form-item label="真实姓名：" prop="name" size="small">
                    <el-input v-model="colObj2.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="18">
                  <el-form-item label="*邮箱地址：" prop="email" size="small">
                    <el-input v-model="colObj2.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            <el-form-item style="text-align:center; margin-top: 50px;">
              <el-button @click="closeFn(false)" size="small">取消</el-button>
              <el-button type="primary" @click="saveOrUpdateUser('colObj2')" size="small">确认</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import cityOptions from "common/chinaCity/city_data2017_element";
import navTitle from "components/navTitle";
import {checkPhone, checkEmail} from 'assets/js/jiaoyan.js'
export default {
  components: { navTitle },
  props: {

    colObj: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      colObj2: {},
      colObjParent: Object.assign({}, this.colObj),
      loading: false,
      editorOption: {},
      projectRootUrl: window.projectRootUrl,
      RoleList:[],

      rules: {
        userName: [{required: true, message: "请设置账户", trigger: "blur"}],
        roleId: [{required: true, message: "请选择角色归属", trigger: "change"}],
        set: [{required: true, message: "请选择性别", trigger: "change"}],
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        name: [{required: true, message: "请输入真实姓名", trigger: "blur"}],
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ],
      }
    };
  },
  created() {

    this._getRoleList()
  },
  mounted() {
    this._getUserDetail();
    this.$nextTick(() => {
      console.log(this.colObj, "5555555");
    });
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  watch: {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.colObj2.imgUrl = res.data;
      // this.imagePathStr = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },

    // 获取角色列表
    _getRoleList() {
      this.$fetch.dataApi
        .getRoleList()
        .then(({ data }) => {
          this.RoleList = data;

        })
        .catch(() => {
          // this.load_data = false
        });
    },
    // 获取角色列表
    _getUserDetail() {
      if(!this.colObjParent.id){
         return;
      }
      let params = {"userId":this.colObjParent.id};
      this.$fetch.dataApi
        .getUserDetail(params)
        .then(({ data }) => {
          this.colObj2 = data;

        })
        .catch(() => {
          // this.load_data = false
        });
    },

    // 保存
    saveOrUpdateUser(formName) {
      let self = this;
      let params = self.colObj2;
      params.userType=3;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        this.$confirm('确定保存？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$fetch.dataApi.saveOrUpdateUser(params).then(res => {
            self.$message({
              message: res.msg,
              type: "success"
            });
            self.closeFn(true);
          });
        })
      })

    },
    // 取消
    closeFn(bool) {
      this.$emit("closeFn", bool);
    }
  }
};
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}

.avatar {
  width: 118px;
  height: 118px;
  display: block;
}

.describe {
  position: relative;
  margin: 30px 12px 0px 12px;
  .title {
    font-size: 14px;
    margin-bottom: 12px;
    font-weight: bold;
  }
  p {
    font-size: 12px;
    color: #ccc;
    line-height: 20px;
  }
}
</style>
