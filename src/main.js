import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import './permission.js'
import Vant from 'vant'
import execApi from '@/apis'
// 引入全部样式
import 'vant/lib/index.less'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.prototype.$execApi = execApi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
