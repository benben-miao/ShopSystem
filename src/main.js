import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/main.css'
import './assets/css/iconfont.css'
import api from './api/index'

// import i18n from './i18n'
import i18n from './lang/index'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;

Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
