<template>
  <div class="content-bj">
    <navTitle :navArr="['设置','文章发布']"></navTitle>

    <el-form
      :label-position="'top'"
      :inline="true"
      :model='articleData'
      ref="articleData"
      :rules="rules"
      class="demo-form-inline">
        <el-row>
          <el-col :span="24">
            <div class="publish-container">
              <el-button type="primary" class="publish" @click='publishArticle("articleData","publish")'>发布
              </el-button>
              <el-button type="warning" class="saveNote" @click='publishArticle("articleData","draft")'>草稿</el-button>
              <!--publishArticle("articleData","draft")-->
            </div>
          </el-col>
          <div class="title-container">
            <el-col :span="24">
              <el-form-item label="标题:" prop="title">
                <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入标题"
                          v-model="articleData.title">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="摘要:" prop="abstracts">
                <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入摘要"
                          v-model="articleData.abstracts">
                </el-input>
              </el-form-item>
            </el-col>
          </div>


          <el-col :span="6">
            <el-form-item label="作者:" prop="author">
              <el-select v-model="articleData.author" placeholder="作者">
                <el-option v-for="item in authorData" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="文章类别:" prop="important">
              <el-select v-model="articleData.type" placeholder="重要性">
                <el-option v-for="item in typeArr" :key="item.val" :label="item.name"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="重要性:" prop="important">
              <el-select v-model="articleData.important" placeholder="重要性">
                <el-option v-for="item in importantData" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发布日期:" prop="publishDate">
              <el-date-picker
                v-model="articleData.publishDate"
                type="datetime"
                class="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd:HH-mm-ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="form-tinymce-container">
          <!--组件-->
          <el-col :span="24">
            <Tinymce ref="editor" v-model="articleData.content"></Tinymce>
          </el-col>
        </el-row>
    </el-form>
  </div>
</template>

<script>
  import navTitle from 'components/navTitle'
  import Tinymce from 'components/Tinymce';
  export default {
    components: {

      navTitle, Tinymce
    },
    data() {
      return {
        typeArr:[
          {name:'家庭运动',val:1},
          {name:'亲子手工',val:2},
          {name:'育儿知识',val:3},
          {name:'公司资讯',val:4},
          {name:'产品咨询',val:5}
        ],
        articleData: {
          title: '',
          abstracts: '',
          type: '',
          author: '',
          important: '',
          publishDate: '',
          content: ''
        },
        authorData: [
          {'label': '张小明', 'value': 0},
          {'label': '李鹏飞', 'value': 1},
          {'label': '王亚兰', 'value': 2},
          {'label': '吴明东', 'value': 3},
          {'label': '张琪格', 'value': 4},
          {'label': '黄雅丽', 'value': 5}
        ],
        importantData: [
          {'label': '1', 'value': 0},
          {'label': '2', 'value': 1},
          {'label': '3', 'value': 2},
          {'label': '4', 'value': 3},
          {'label': '5', 'value': 4}
        ],
        rules: {
          title: [{required: true, message: '文章标题为必填项~', trigger: 'blur'}],
          abstracts: [{required: true, message: '文章摘要为必填项~', trigger: 'blur'}],
          author: [{required: true, message: '请选择文章作者', trigger: 'change'}],
          comeFrom: [{required: true, message: '请选择文章来源', trigger: 'change'}],
          important: [{required: true, message: '请选择文章重要性', trigger: 'change'}],
          publishDate: [{required: true, message: '请选择发布日期', trigger: 'change'}]
        },
        //详情弹框信息
        dialog: {
          width: '400px',
          show: false,
          title: '修改资金信息',
          formLabelWidth: '120px'
        }

      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    computed: {},
    watch: {},
    methods: {
      //发布文章
      publishArticle(articleData, type) {
        this.$refs[articleData].validate((valid) => {
          if (valid) {//表单数据验证完成之后，提交数据;
            let content = this[articleData].content;
            if (content === '') {
              this.$message({
                message: '输入内容为必填项',
                type: 'error'
              });
              return;
            }
            /* let formData = this[articleData];
             let data = {};
             for(var i in formData){
               data.title = formData['title']
               data.abstracts = formData['abstracts']
               data.author = this.authorData[formData['author']]['label']
               data.category = this.categoryData[formData['category']]['label']
               data.comeFrom = this.comeFromData[formData['comeFrom']]['label']
               data.important = this.importantData[formData['important']]['label']
               data.publishDate = dtime(formData['publishDate']).format('YYYY-MM-DD HH:mm:ss')
               data.content = formData['content']
             }
             if(type == 'publish'){
               data.status = '1';  // 发布
             }else{
               data.status = '2';  // 草稿
             }*/
            console.log(this.articleData, 444444444);
            // this.addFundArtices(data)
          }
        })
      },
      addFundArtices(data) {
        axios({
          type: 'get',
          path: '/api/article/addFundArtices',
          data: data,
          fn: res => {
            console.log(res);
            if (res.status == 1) {
              this.$message({title: '新增成功,您可以去编辑文章页面查看哦~', type: 'success'});
              //实现菜单跳转，重定向
              this.$router.push({path: '/modifyFundArticle'});
            } else {
              this.$message.error('新增失败请重试')
            }
          },
          errFn: (err) => {
            this.$message.error('新增失败请重试,' + err)
          }
        })
      }
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .publish-container {
    height: 50px;
    line-height: 50px;
    background-color: #38A884;
    border-color: #4db3ff;
    color: #fff;
    text-align: right;
    padding: 0 10px;
    margin-bottom: 10px;
  }

  .title-container {
    margin-bottom: 20px;
    .article-textarea {
      width: 1100px;
    }
  }

  .condition-container {
    /*.item {
      float: left;
    }*/
  }

  .form-tinymce-container {
    // margin-top: 100px;
    margin-bottom: 100px;
  }

</style>
