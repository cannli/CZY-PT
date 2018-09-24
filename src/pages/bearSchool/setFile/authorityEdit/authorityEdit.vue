<template>
  <div>
    <div class="content-bj">
      <!--<navTitle :navArr="['设置','资料设置']"></navTitle>-->
      <div style="margin-top: 52px;">

        <el-form :model="colObj" ref="colObj" label-width="120px" class="demo-ruleForm">
          <el-row type="flex" justify="center" style="margin-bottom: 18px;">
            <el-col :span="18" style="text-align: center;">
              <div style="margin-left: 8px;margin-bottom:22px;" class="clearfix">
                <div class="fl">
                  <el-upload class="avatar-uploader"
                             :action="projectRootUrl+'/upload'"
                             :on-success="handleAvatarSuccess">
                    <img v-if="imagePathStr" :src="imagePathStr" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <!--<avatar-upload ref="logoUpload" :tips="logoUploadObj.tips" :name="logoUploadObj.name" @imgSrc="imgSrc" width="120px" height="120px"></avatar-upload>-->
                </div>
                <div class="describe fl">
                  <div class="title">*上传封面</div>
                  <div style="margin-top:26px;">
                    <p>支持JPG/PNG/BMP等格式图片</p>
                    <p>请使用高分辨透明矢量图片最佳</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="18">
              <el-form-item label="标题：" prop="title" size="small">
                <el-input v-model="colObj.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="18">
              <el-form-item label="文章排序：" size="small">
                <el-radio-group v-model="colObj.level">
                  <el-radio :label=1>正常显示</el-radio>
                  <el-radio :label=2>置顶</el-radio>
                  <el-radio :label=3>推荐</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item style="text-align:center; margin-top: 50px;">
            <el-button @click="closeFn" size="small">取消</el-button>
            <el-button type="primary" @click="saveOrUpdate" size="small">确认</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import cityOptions from 'common/chinaCity/city_data2017_element'
  import navTitle from 'components/navTitle'

  export default {
    components: {navTitle},
    props: {
      action: {
        type: String
      },
      colObj: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {

        loading: false,
        editorOption: {},
        projectRootUrl: window.projectRootUrl,
        imagePathStr: this.colObj.imagePath,

        colObj: {

          title: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        console.log(this.colObj, '5555555')
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
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    watch: {},
    /*  // 编辑里面的提交
      editSubmit() {
        let self = this
        let url = '/system/update.do'
        let params = {
          systemId: self.dataRowObj.fsysId,
          systemName: self.dataRowObj.fsysName,
          systemNameCN: self.dataRowObj.fchSysname,
          systemUrl: self.dataRowObj.flinkUrl,
          desc: self.dataRowObj.fdesc,
          extendFiled: self.dataRowObj.fextFiled,
          headOfTechnology: self.dataRowObj.headOfTechnology,
          headOfProduct: self.dataRowObj.headOfProduct,
        }
        self.$refs.dataRowObj.validate((valid) => {
          if (valid) {
            self.$confirm('确认提交吗？', '提示', {
              type: 'warning'
            }).then(() => {
              self.editLoading = true;
              self.ajaxDate('POST', authorUrl + url, params, (result) => {
                console.log(result)
                self.$message({message: '提交成功', type: 'success'});
                self.editLoading = false
                self.$refs['dataRowObj'].resetFields()
                self.dataRowObjVisible = false
                self.$emit('getDataList')
              }, (msg) => {
                self.$alert(msg, '提示', {confirmButtonText: '确定', type: 'error'})
                self.editLoading = false
              })
            })
          }
        })
      },*/
    methods: {
      submitForm() {
        let self = this
        self.$refs.colObj.validate((valid) => {
          if (valid) {
            self.$confirm('确认提交吗？', '提示', {
              type: 'warning'
            }).then(() => {
              console.log(self.colObj, '666666666666')
              self.editLoading = true;
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('resetForm')
      },
      changeProvince() {
      },

      handleAvatarSuccess(res, file) {
        console.log(res, '33333')
        console.log(file, '44444')
        this.colObj.imagePath = res.data.fileName
        this.imagePathStr = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJPG && isLt2M;
      },
      // 保存
      saveOrUpdate() {
        let self = this
        console.log(self.colObj, '666666666666')
        let params = {
          id: self.colObj.id,
          type: 1,
          title: self.colObj.title,
          imagePath: self.colObj.imagePath,
          content: self.colObj.content,
          level: self.colObj.level,
        }
        self.$refs.colObj.validate((valid) => {
          if (valid) {
            self.$confirm('确认提交吗？', '提示', {
              type: 'warning'
            }).then(() => {
              self.$fetch.dataApi.saveOrUpdateArticle(params).then(res => {
                console.log(res, 'res')
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                self.closeFn()
              })
            })
          }
        })

      },

      // 取消
      closeFn() {
        this.$emit('closeFn')
      }
    }

  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  /*.clearfix {*/
  /*&:after {*/
  /*visibility: hidden;*/
  /*display: block;*/
  /*font-size: 0;*/
  /*content: ' ';*/
  /*clear: both;*/
  /*height: 0;*/
  /*}*/
  /*}*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
