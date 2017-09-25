// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//导入Vue框架
import Vue from 'vue'
//导入主视图文件
import App from './App'
//导入路由
import router from './router'
//导入element组件
import ElementUI from 'element-ui'

//导入样式
//import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  router,
 ...App
}).$mount('mainbody')

