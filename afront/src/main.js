import Vue from 'vue'
import App from './App'
import router from './router/router' // 路由
import store from './store/index' // 状态管理
import VueCookie from 'vue-cookie'

/* 引入element */
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/**
 *引入iconfont
 */
import './assets/iconfont/iconfont.css'

/**
 *引入axios
 */

Vue.use(elementUI)
Vue.use(VueCookie)
// import Distpicker from 'v-distpicker';
// Vue.component('v-distpicker', Distpicker);

// require('./mock/mock')

Vue.config.debug = true // 开启错误提示
new Vue({
  router,
  store,
  el: '#app',
  render:h=>h(App),
  // components: { App },
  // template: '<App/>'
});