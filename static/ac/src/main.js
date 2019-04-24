import Vue from 'vue';
import App from './App';
import router from './router/router';

/* 引入element */
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementUI)

/**
 *引入axios
 */
import axios from 'axios';
Vue.prototype.$http=axios;

/**
 *引入iconfont
 */
import  "./assets/iconfont/iconfont.css";

Vue.config.debug = true;//开启错误提示

import Vuex from 'vuex';
Vue.use(Vuex);
var state = {
  isLogin:0,          //初始时候给一个  isLogin=0  表示用户未登录
};
const actions = {
  loginAction({commit}){
    commit('changeLogin',1);
  }
}
const mutations = {
  changeLogin(state,data){
    state.isLogin = data;
  }
};
export default new Vuex.Store({
  state,
  actions,
  mutations
})

new Vue({
  router,
  el: '#app',
  render:h=>h(App),
  // components: { App },
  // template: '<App/>'
});