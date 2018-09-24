
//导入样式
// import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
//import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
//导入Vue框架
import Vue from 'vue'
//导入element组件
import ElementUI from 'element-ui'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入请求框架
import api from './api'
//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key: '96632301a018e3bc3084e9d439d4ac76',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
//导入mock数据
//import './mock'
// js
import ku from "./assets/js/ku.js"
import common from "./assets/js/common.js"
import './ui.js'
//导入地区插件
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css';
//使用element-ui
//Vue.use(ElementUI)
//富文本
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// window.projectRootUrl = 'http://39.107.74.125/bghealth/api'
//window.projectRootUrl = 'http://39.107.74.125/bghealth/api'  172.16.30.206
window.projectRootUrl = 'http://www.egrowth.cn/api' // 'http://health.junlz.com/bghealth/api'
// window.projectRootUrl = 'http://localhost'

//使用地区插件
Vue.use(VueAreaLinkage)

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
})
//使用自定义插件
Vue.use(Plugins)

//使用api
Vue.use(api)

Vue.use(ku)
Vue.use(common)
//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  ...App
}).$mount('mainbody')
