import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'store';
// import 'nprogress/nprogress.css';

//import components
//view page warp component
const viewPageComponent = resolve => require(['pages/App'], resolve)
//home
const homeComponent = resolve => require(['pages/home/index'], resolve)
//404
const noPageComponent = resolve => require(['pages/error/404'], resolve)
//login
const loginComponent = resolve => require(['pages/user/login'], resolve)


//produceReport
const xueShengReport = resolve => require(['pages/bearSchool/report/xueShengReport'], resolve)
const produceReport = resolve => require(['pages/bearSchool/report/produceReport'], resolve)
//成绩
const achievement = resolve => require(['pages/bearSchool/report/achievement'], resolve)
// 报告分析
const caseReport = resolve => require(['pages/bearSchool/report/caseReport'], resolve)
// 体检预约
const yuYue = resolve => require(['pages/bearSchool/report/yuYue'], resolve)
// 学校管理
const memberManagement = resolve => require(['pages/bearSchool/memberManagement/index'], resolve)
// 家长管理
const parentmanagement = resolve => require(['pages/bearSchool/memberManagement/parentmanagement'], resolve)

// 运营
const operate = resolve => require(['pages/bearSchool/operate/index'], resolve)


/*
// 咨询导师
const counselor = resolve => require(['pages/bearSchool/setFile/counselor'],resolve)
*/

// 权限管理
const authorityManagement = resolve => require(['pages/bearSchool/setFile/authorityManagement'], resolve)
// 发布文章
const issue = resolve => require(['pages/article/issue'], resolve)
// 编辑文章
const edit = resolve => require(['pages/article/edit'], resolve)
/*// 权限管理
const maintainCore = resolve => require(['pages/bearSchool/setFile/maintainCore'],resolve)*/


Vue.use(VueRouter);

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [
    {
      path: '/404',
      name: 'notPage',
      component: noPageComponent
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/user/login',
      name: 'login',
      component: loginComponent
    },
    {
      path: '/',
      redirect: '/home',
      component: viewPageComponent,
      children: [
        {
          path: '/home',
          name: 'home',
          component: homeComponent,
          meta: {
            title: '概况',
            auth: true
          }
        },
        {
          path: '/report/yuYue',
          name: 'yuYue',
          component: yuYue,
          meta: {
            title: '体检预约',
            auth: true
          }
        },
        {
          path: '/report/xueShengReport',
          name: 'xueShengReport',
          component: xueShengReport,
          meta: {
            title: '学生体检管理',
            auth: true
          }
        }
        ,
        {
          path: '/report/produceReport',
          name: 'produceReport',
          component: produceReport,
          meta: {
            title: '项目体检管理',
            auth: true
          }
        }
        ,
        {
          path: '/report/achievement',
          name: 'achievement',
          component: achievement,
          meta: {
            title: '上传成绩',
            auth: true
          }
        }
        ,
        {
          path: '/report/caseReport',  // caseReport
          name: 'caseReport',
          component: caseReport,
          meta: {
            title: '报告分析',
            auth: true
          }
        }
        ,
        {
          path: '/memberManagement/index',
          name: 'memberManagement',
          component: memberManagement,
          meta: {
            title: '学校管理',
            auth: true
          }
        }
        ,
        {
          path: '/memberManagement/parentmanagement',
          name: 'parentmanagement',
          component: parentmanagement,
          meta: {
            title: '家长管理',
            auth: true
          }
        }
        ,
        {
          path: '/operate/index',
          name: 'operate',
          component: operate,
          meta: {
            title: '运营',
            auth: true
          }
        },
        {
          path: 'article/edit',
          name: 'edit',
          component: edit,
          meta: {
            title: '编辑文章',
            auth: true
          }
        },
        {
          path: 'setFile/authorityManagement',
          name: 'authorityManagement',
          component: authorityManagement,
          meta: {
            title: '权限管理',
            auth: true
          }
        },
        {
          path: 'article/issue',
          name: 'issue',
          component: issue,
          meta: {
            title: '发布文章',
            auth:
              true
          }
        },
      ]
    }
  ]
;

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  }
});

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  // NProgress.done().start();
  let toName = to.name;
  // let fromName = from.name
  let is_login = store.state.user_info.login;

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    });
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      });
    } else {
      next();
    }
  }
});

//路由完成之后的操作
/*
router.afterEach(route => {
  NProgress.done();
});
*/

export default router;
