import Vue from 'vue'
import Vuex from 'vuex'
import {setStore, getStore, removeStore} from '../utils/storage'
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
  state: {
    token: null, // 保存用户登录后持有的token
    user: null, // 当前用户
    userInfo: null, // 用户信息
    cartList: [] // 加入购物车列表
  },
  getters: { // 获取属性的状态
  },
  // 设置属性状态
  mutations: { // 用来修改state里的状态
    // 保存登录状态
    // 将token保存到sessionStorage里，token表示登陆状态
    SET_TOKEN: (state, data) => {
      state.token = data
      setStore('token', data)
    },
    // 获取用户id
    GET_USERNAME: (state, data) => {
      // 把用户名存起来
      state.user = data
      setStore('user', data)
    },
    // 登出
    LOGOUT: (state) => {
      // 登出的时候要清除token
      state.token = null
      state.user = null
      removeStore('token')
      removeStore('user')
    },
    // 加入购物车
    ADD_CART: (state, {productId, productPrice, productName, productImg, productNum = 1}) => {
      let cart = state.cartList // 购物车
      let falg = true // 购物车是否由商品
      let goods = {
        productId,
        productPrice,
        productName,
        productImg
      }
      if (cart.length) { // 有内容
        cart.forEach(item => {
          if (item.productId === productId) {
            if (item.productNum >= 0) {
              falg = false
              item.productNum += productNum
            }
          }
        })
      }
      if (!cart.length || falg) {
        goods.productNum = productNum
        goods.checked = '1'
        cart.push(goods)
      }
      state.cartList = cart
      // 存入localStorage
      setStore('buyCart', cart)
    },
    // 移除商品
    REDUCE_CART: (state, {productId}) => {
      let cart = state.cartList
      cart.forEach((item, i) => {
        if (item.productId === productId) {
          if (item.productNum > 1) {
            item.productNum--
          } else {
            cart.splice(i, 1)
          }
        }
      })
      state.cartList = cart
      // 存入localStorage
      setStore('buyCart', state.cartList)
    },
    // 修改购物车
    EDIT_CART: (state, {productId, productNum, checked}) => {
      let cart = state.cartList
      if (productNum) {
        cart.forEach((item, i) => {
          if (item.productId === productId) {
            item.productNum = productNum
            item.checked = checked
          }
        })
      } else if (productId) {
        cart.forEach((item, i) => {
          if (item.productId === productId) {
            cart.splice(i, 1)
          }
        })
      } else {
        cart.forEach((item) => {
          item.checked = checked ? '1' : '0'
        })
      }
      state.cartList = cart
      // 存入localStorage
      setStore('buyCart', state.cartList)
    },
    // 记录用户信息
    RECORD_USERINFO: (state, info) => {
      state.userInfo = info
      state.login = true
      setStore('userInfo', info)
    },
    // 获取用户信息
    GET_USERINFO: (state, info) => {
      if (state.userInfo && (state.userInfo.username !== info.username)) {
        return
      }
      if (!state.login) {
        return
      }
      if (!info.message) {
        state.userInfo = {...info}
      } else {
        state.userInfo = null
      }
    }
  }
  // // 应用mutations
  // actions: { // vue运用他来执行mutations
  //   setToken ({commit}, data) {
  //     commit('SET_TOKEN', data)
  //   },
  //   // 获取用户名
  //   setUsername ({commit}, data) {
  //     commit('GET_USERNAME', data)
  //   },
  //   // 登出
  //   logout ({commit}) {
  //     commit('LOGOUT')
  //   }

  // }
})
