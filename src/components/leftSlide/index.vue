<template>
  <div class="left-side" style="z-index:100;" v-if="true">
    <div class="left-side-inner">
      <!-- <router-link to="/home" class="logo block">
         <img src="./images/logo.png" alt="AdminX">
         <span>天玺教育后台管理系统</span>
       </router-link>-->
      <el-menu
        :defaultOpeneds="defaultOpeneds"
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div v-for="(item, index) in nav_menu_data" :key="index">
          <el-menu-item class="menu-list" v-if="typeof item.children === 'undefined'" :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.label" class="text"></span>
          </el-menu-item>

          <el-submenu :index="item.path" v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.label" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.children"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;{{sub_item.label}}</span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {cookieStorage} from 'common/storage'

  export default {
    name: 'slide',
    data() {
      return {
        defaultOpeneds: ['/home', '/report', '/memberManagement', '/setFile'],
        nav_menu_data: [
          {
            label: "概况",
            path: "/home",
            icon: "fa-home",
          },
          {
            label: "报告",
            path: "/report",
            icon: "fa-table",
            children: [

              {
                label: "学生体检管理",
                path: "/report/xueShengReport"
              },
              {
                label: "项目体检管理",
                path: "/report/produceReport"
              },
              {
                label: "报告分析",
                path: "/report/caseReport"
              },
              {
                label: "上传成绩",
                path: "/report/achievement"
              }
            ]
          },
          {
            label: "用户",
            path: "/memberManagement",
            icon: "el-icon-service",
            children: [
              {
                label: "学校管理",
                path: "/memberManagement/index"
              },
              {
                label: "家长管理",
                path: "/memberManagement/parentmanagement"
              }
            ]
          },
          {
            label: "运营",
            path: "/memberManagement",
            icon: "fa-table",
            children: [
              {
                label: "运营管理",
                path: "/operate/index"
              }

            ]
          },
          {
            label: "设置",
            path: "/setFile",
            icon: "fa-table",
            children: [
              {
                label: "权限设置",
                path: "/setFile/authorityManagement"
              }, {
                label: "发布文章",
                path: "/article/issue"
              }
            ]
          }
        ]
      }
    },
    mounted() {
      this.getLeftFn()
    },
    methods: {
      getLeftFn() {
        this.$fetch.dataApi.getMenuFn().then(({data, msg}) => {
          if (data && data.length > 0) {
            data[0].children.push(
              {
                label: "平台概况",
                path: "/home"
              }
            )
            /*data[4].children.push(
              {
                label: "发布文章",
                path: "/article/issue"
              }
              , {
                label: "编辑文章",
                path: "/article/edit"
              }
            )*/
            this.nav_menu_data = data;
            this.load_data = false
          }

        })
          .catch(() => {
            this.load_data = false
          })
      },
    }
  }
</script>
