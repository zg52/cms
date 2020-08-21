// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import store from './store'
import router from './router'
import Mock from '../Mock'

import '@/permission' // permission control
console.log("环境：" +process.env.NODE_ENV　+ ' 开发DEV环境：' + process.env.DEV_ENV);
if (process.env.DEV_ENV === 'mock') {
  Mock.init();
}
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
