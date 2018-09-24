<template>
  <div>
    <div class="content-bj">
      <navTitle :navArr="['用户','学校管理','已审核','编辑']"></navTitle>
      <div style="margin-top: 52px;">
        <el-button type="text" @click="closeFn(false)">返回上一页</el-button>
        <el-row type="flex" align="middle">
          <div class="condition-container"></div>
        </el-row>
        <el-form :model="tableData" ref="colObj" label-width="120px" class="demo-ruleForm">
          <!-- <el-row type="flex" justify="center" style="margin-bottom: 18px;">
            <el-col :span="18" style="text-align: center;">
              <div style="margin:0 auto; width:315px; " class="clearfix">
                <div class="fl">

                  <el-upload class="avatar-uploader"
                             :action="projectRootUrl+'/upload'"
                             :on-success="handleAvatarSuccess">
                    <img v-if="colObj.imgUrl" :src="colObj.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </div>
                <div class="describe fl">
                  <div class="title">*上传头像</div>
                </div>
              </div>
            </el-col>
          </el-row> -->
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12">
              <el-form-item label="学校名称：" prop="name" size="small">
                <el-input v-model="tableData.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12">
              <el-form-item label="学校类型：" size="small">
                <el-select v-model="tableData.schoolLevelName" placeholder="请选择学校类型" style="width:652px;">
                  <el-option label="幼儿园" value="幼儿园"></el-option>
                  <el-option label="小学" value="小学"></el-option>
                  <el-option label="初中" value="初中"></el-option>
                  <el-option label="高中" value="高中"></el-option>
                  <el-option label="大学" value="大学"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12">
              <el-form-item label="学校座机：" prop="contacts" size="small">
                <el-input v-model="tableData.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12">
              <el-form-item label="负责任姓名：" prop="name" size="small">
                <el-input v-model="tableData.responsible"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12">
              <el-form-item label="手机号码：" prop="contacts" size="small">
                <el-input v-model="tableData.responsiblePhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12">
              <el-form-item label="学校地址" size="small">
                <el-cascader v-model="tableData.cityOptions" style="width: 100%;"

                             :options="cityOptionsArr"
                             :props="cityProps"
                             @change="changeProvince"
                             change-on-select
                >
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12">
              <el-form-item label="学校地址：" size="small">
                <el-input v-model="tableData.address" placeholder="" style="width:280px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-form-item style="text-align:center; margin-top: 50px;">
            <el-button type="danger" @click="_deleteSchool(colObj.id)" size="small">注销</el-button>
            <el-button type="primary" @click="updateSchoolDetail" size="small">保存</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  import cityOptions from "common/chinaCity/city_data2017_element";
  import navTitle from "components/navTitle";

  export default {
    components: {navTitle},
    props: {
      colObj: {
        type: Number,
        default: {}
      }
    },
    data() {
      return {
        cityProps: {
          value: 'id',
          children: 'children'
        },
        input: null,
        load_data: false,
        cityOptionsArr: [],
        tableData: {
          cityOptions: [172, 194, 196]
        },
        formInline: {
          user: "",
          region: ""
        }
      };
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.cityOptionsArr = cityOptions
        this._getSchoolDetail(this.colObj)

      });
    },
    computed: {},
    watch: {},
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit("resetForm");
      },


      // 获取信息
      _getSchoolDetail(school) {
        let params = {
          school: school,
        }
        this.$fetch.dataApi.getSchoolDetail(params).then(({data, msg, total}) => {
          this.tableData = data;
          this.tableData.cityOptions = [];

          if (data.province) {
            this.tableData.cityOptions.push(data.province)
          }
          if (data.city) {
            this.tableData.cityOptions.push(data.city)
          }
          if (data.area) {
            this.tableData.cityOptions.push(data.area)
          }
          this.tableData.birthplace = this.tableData.cityOptions;
        })
      },

      //点击注销按钮
      _deleteSchool(id) {
        let self = this;
        let params = {
          schoolId: id
        };
        self
          .$confirm("确认注销吗？", "提示", {
            type: "error"
          })
          .then(() => {
            self.$fetch.dataApi.deleteSchool(params).then(res => {
              self.closeFn(true);
            });
          });
      },

      //返回
      closeFn(bool) {
        this.$emit("closeFn", bool);
      },
      changeProvince() {
      },

      // 保存
      updateSchoolDetail() {
        let self = this;
        let params = self.tableData;

        if (this.tableData.cityOptions.length > 0) {
          params.province = this.tableData.cityOptions[0]
        }
        if (this.tableData.cityOptions.length > 1) {
          params.city = this.tableData.cityOptions[1]
        }
        if (this.tableData.cityOptions.length > 2) {
          params.area = this.tableData.cityOptions[2]
        }

        self
          .$confirm("确认提交吗？", "提示", {
            type: "warning"
          })
          .then(() => {
            self.$fetch.dataApi.updateSchoolDetail(params).then(res => {
              self.$message({
                message: res.msg,
                type: "success"
              });
              self.closeFn(true);
            });
          });
      }
    }
  };
</script>

<style scoped>
  /* .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
    }
    .title{
      line-height: 120px;
      margin-left: 20px;
    } */
</style>
