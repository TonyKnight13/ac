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

import store from './store/index'
// import Vuex from 'vuex' ; //引入状态管理
// Vue.use(Vuex) ;

// const ADD_COUNT = 'ADD_COUNT'; // 用常量代替事件类型，使得代码更清晰
// const REMOVE_COUNT = 'REMOVE_COUNT';

// var store = new Vuex.Store({
//   state : {
//     token:'',
//     userID:''
//   },
  // const actions = {
  //   loginAction({commit}){
  //     commit('changeLogin',1);
  //   }
  // }
//   mutations : {
//     //写法与getters相类似
//     //组件想要对于vuex 中的数据进行的处理
//     //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
//     //内部操作必须在此刻完成(同步)
//     [ADD_COUNT] (state, token) { // 第一个参数为 state 用于变更状态 登录
//       sessionStorage.setItem("token", token);
//       state.token = token;
//     },
//     [REMOVE_COUNT] (state, token) { // 退出登录
//       sessionStorage.removeItem("token", token);
//       state.token = token;
//     },
//   },
// })

//返回参数时的拦截
// axios.interceptors.response.use(
//   response => {
//     if(response.data.status == 90002 || response.data.status == 90003){

//       iView.Notice.error({title: '请求验证未通过',desc:response.data.msg,duration: 5});
//       router.replace({ //跳转到登录页面
//         path: '/login',
//         query: { redirect: router.history.current.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       });
//     }

//     return response;
//   },
//   error => {
//     if (error.response) {
//       return Promise.reject(error.response.data) //返回接口返回的错误信息
//     }
//   }
// );



new Vue({
  router,
  store,
  el: '#app',
  render:h=>h(App),
  // components: { App },
  // template: '<App/>'
});