import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as action from './action'

Vue.use(Vuex)
// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
//  state : {
//  user: window.sessionStorage.getItem('user'),
//  token: window.sessionStorage.getItem('token')
// }
//  mutations : {
//  //将token保存到sessionStorage里，token表示登陆状态
//  SET_TOKEN: (state, data) => {
//  state.token : data
//  window.sessionStorage.setItem('token', data) 
//  },
//  //获取用户名
//  GET_USER: (state, data) => {
//  // 把用户名存起来
//  state.user : data
//  window.sessionStorage.setItem('user', data)
//  },
//  //登出
//  LOGOUT: (state) => {
//  // 登出的时候要清除token
//  state.token : null
//  state.user : null
//  window.sessionStorage.removeItem('token')
//  window.sessionStorage.removeItem('user')
//  }
// }


export default new Vuex.Store({
  state : {
    token:sessionStorage.getItem('token'),//保存用户登录后持有的token
    user:window.sessionStorage.getItem('user'), //当前用户
    userInfo: null, // 用户信息
  },
  
  getters : { // 获取属性的状态
    isLogin: state => state.isLogin, //获取登录状态
  },
  
    // 设置属性状态
  mutations : {   //用来修改state里的状态
    //保存登录状态

    //将token保存到sessionStorage里，token表示登陆状态
    SET_TOKEN: (state, data) => {
      state.token = data
      sessionStorage.setItem('token', data) 
    },
    //获取用户名
    GET_USERNAME: (state, data) => {
      // 把用户名存起来
      state.user = data
      window.sessionStorage.setItem('user', data)
    },
    //登出
    LOGOUT: (state) => {
      // 登出的时候要清除token
      state.token = null
      state.user = null
      state.isLogin=false
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('user')
    }
  },
  
  // 应用mutations
  actions:{   //vue运用他来执行mutations
    setToken({commit}, data){
      commit("SET_TOKEN", data)
    },
    //获取用户名
    setUsername({commit}, data){
      commit("GET_USERNAME", data)
    },
    //登出
    logout({commit}){
      commit("LOGOUT")
    },

  }
})


