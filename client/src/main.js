import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
// import { Button, Table, TableColumn } from 'element-ui'
import ElementUI from 'element-ui'
import { isDevOnline, toNewPage } from './components/common/action'
// import './assets/css/font.css'
import * as apis from './utils/apis.js'
Vue.config.productionTip = false
// 跳转路由
Vue.prototype.toNewPage = toNewPage
Vue.prototype.isDevOnline = isDevOnline
Vue.prototype.apis = apis
Vue.use(ElementUI)
// Vue.use(Button).use(Table).use(TableColumn)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
