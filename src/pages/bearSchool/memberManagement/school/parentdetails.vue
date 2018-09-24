<template>
  <div>
    <div class="content-bj">
      <el-button type="text" @click="closeFn">返回上一页</el-button>
      <div class="parentinformation" >
        <div style="text-align: center;margin-top: 10px;">
          <img :src="imgUrl" style="width: 150px; height: 150px;border-radius: 50%;"/>
        </div>
         <el-form :model="tableData" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="nickName">
            <el-input v-model="tableData.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sec">
            <el-select v-model="tableData.sex" placeholder="性别" style="width:400px;">
              <el-option label="男" value="1" ></el-option>
              <el-option label="女" value="2" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="tableData.phone"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <h3 style="text-align: center;">绑定的学生信息</h3>
      <div v-if="action == 'list'">

        <el-table
          class="backg-bor-style"
          :data="tableData.childrenList"
          style="width: 100%;">

          <el-table-column
            prop="id"
            label="编号">
          </el-table-column>

          <el-table-column
            prop="username"
            label="学生">
          </el-table-column>

          <el-table-column
            prop="sex"
            label="性别"
            :formatter="sexFormate">
          </el-table-column>

          <el-table-column
            prop="birth"
            label="出生日">
          </el-table-column>

          <el-table-column
            prop="schoolName"
            label="学校">
          </el-table-column>

          <el-table-column
            prop="gradeName"
            label="年级">
          </el-table-column>

          <el-table-column
            prop="className"
            label="班级">
          </el-table-column>
        </el-table>

      </div>


    </div>
  </div>
</template>


<script>
  import bottomToolBar from 'components/bottomToolBar'
  import navTitle from 'components/navTitle'


  export default {
    components: {navTitle, bottomToolBar},
    props: {
      colObj:[Number]
    },
    data() {
      return {

         ruleForm: {
          name: '',
          sex: '',
          phonenumber:'',
        },
        input: '',
        tableData: {},
        imgUrl:'',//用户头像
        total: 0,
        action: 'list',
        // 用于保存一条数据
       // colObj: {},
      }
    },
    watch: {},
    computed: {},
    created() {

    },
    mounted() {
      this.$nextTick(() => {
        // console.info(this.colObj,"111111111111111111111111111111111111111111")
        this._parentDetail(this.colObj)
      })
    },
    methods: {


      // 获取信息
      _parentDetail(userId) {
        let params={

          userId:userId,
        }
        this.$fetch.dataApi.parentDetail(params).then(({data, msg, total}) => {
          this.tableData = data;
          this.imgUrl=data.imgUrl;
          this.total = total;
          this.load_data = false
        }).catch(() => {
          this.load_data = false
        })
      },

      sexFormate(sex){
        return sex ==1 ?"女":"男";
      },
      closeFn(){
        this.$emit('closeFn')
      }
    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
