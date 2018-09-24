<template>
  <div class="content-bj">
    <navTitle :navArr="['设置','文章编辑']"></navTitle>
    <el-table
      :data="tableData"
      style="width:100%"
    >
      <el-table-column
        prop="sortnum"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        v-if="idFlag"
        prop="id"
        label="id"
        >
      </el-table-column>
      <el-table-column
        v-if="idFlag"
        prop="content"
        label="content"
       >
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        >
        <template slot-scope="scope">
          <span class="title" @click="showFundArticle(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="publishDate"
        label="发布时间"
        >
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        >
      </el-table-column>
      <el-table-column
        prop="important"
        label="重要性"
        >
        <template slot-scope="scope">
          <el-rate
            class="irate"
            v-model="rate_value"
            :max='parseInt(scope.row.important)'
            disabled>
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width='92'
        :filters="fields.articleStatus.filter.list"
        :filter-method="filterStatus"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="articleStatusTag(scope.row.status)"
            close-transition>
            {{scope.row.status == "1" ? "已发布":((scope.row.status == "2") ? "待发布":"已删除")}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="operation"px
        label="操作"
        width="250">
        <template slot-scope='scope'>
          <el-button v-if="scope.row.status!='1'" size="mini" type="success"
                     @click="handleModifyStatus(scope.row,'1')">发布
          </el-button>
          <el-button v-if="scope.row.status!='2'" size="mini" @click="handleModifyStatus(scope.row,'2')">草稿
          </el-button>
          <el-button v-if="scope.row.status!='3'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'3')">
            删除
          </el-button>
          <el-button v-if="scope.row.status!='3'" size="mini" type="primary" @click="handleModifyStatus(scope.row,'3')">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import navTitle from 'components/navTitle'

  export default {
    components: {navTitle},
    data() {
      return {
        rate_value:null,
        idFlag: false,
        tableData: [
          {
            sortnum:1,
            abstracts: "rewkoew w人提供pkERP【 额头的人；开通个人【平台可人而帕克也让【皮一块",
            author: "张小明",
            category: "财经",
            comeFrom: "人民网",
            content: "<p>城市的发热问题尔特让他也</p>",
            important: "2",
            publishDate: "2018-08-01:00-00-00",
            status: "1",
            title: "lican "
          },
          {
            sortnum:2,
            abstracts: "rewkoew w人提供pkERP【 额头的人；开通个人【平台可人而帕克也让【皮一块",
            author: "张小明",
            category: "财经",
            comeFrom: "人民网",
            content: "<p>城市的发热问题尔特让他也</p>",
            important: "4",
            publishDate: "2018-08-01:00-00-00",
            status: "2",
            title: "lican "
          }
        ],
        fields: {
          articleStatus:{
            filter: {
              list: [{
                text: '已发布',
                value: 1
              },{
                text: '待发布',
                value: 2
              }, {
                text: '已删除',
                value: 3
              }],
              multiple: true
            }
          }
        },
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
      filterStatus(value, item) {
        const type = parseInt(item.status);
        return this.format_type_list[value] == this.format_type_list[type];
      },
      articleStatusTag(item){
        let basic = "";
        switch (item) {
          case '1':
            basic = 'success';
            break;
          case '2':
            basic = 'warning';
            break;
          case '3':
            basic = 'danger';
            break;
        }
        return basic;
      },
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
  .search_container{
    height: 36px;
    line-height: 36px;
    margin-bottom:10px;
  }
  .search-form{
    width:100%;
    min-width:750px;
  }
  .pagination{
    text-align: left;
    margin-top: 10px;
  }
  .modifyFundArticlesTable .title{
    color:#3399cc;
    cursor:pointer;
  }
  .modifyFundArticlesTable{
    .el-table td, .el-table th{
      padding:6px 0;
    }
  }
</style>
