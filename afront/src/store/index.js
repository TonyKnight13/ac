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
    ADD_CART: (state, {goodId, goodPrice, goodName, goodImg, goodNum = 1}) => {
      let cart = JSON.parse(getStore('buyCart')) // 购物车
      let falg = true // 购物车是否由商品
      let goods = {
        goodId,
        goodPrice,
        goodName,
        goodImg
      }
      if (cart.length) { // 有内容
        cart.forEach(item => {
          if (item.goodId === goodId) {
            if (item.goodNum >= 0) {
              falg = false
              item.goodNum += goodNum
            }
          }
        })
      }
      if (!cart.length || falg) {
        goods.goodNum = goodNum
        goods.checked = '0' // 购物车中默认商品不选中
        cart.push(goods)
      }
      state.cartList = cart
      // 存入localStorage
      setStore('buyCart', cart)
    },
    // 移除商品
    REDUCE_CART: (state, {goodId}) => {
      let cart = JSON.parse(getStore('buyCart'))
      cart.forEach((item, i) => {
        if (item.goodId === goodId) {
          if (item.goodNum > 1) {
            item.goodNum--
          } else {
            cart.splice(i, 1)
          }
        }
      })
      state.cartList=cart
      // 存入localStorage
      setStore('buyCart', cart)
    },
    // 商店网页初始化时获取购物车数据
    INIT_BUYCART: (state, data) => {
      setStore('buyCart', data)
      let initCart = data
      if (initCart) {
        state.cartList = initCart
      }
      // console.log(state.cartList)
    },
    // 修改购物车
    EDIT_CART: (state, {goodId, goodNum}) => {
      let cart = JSON.parse(getStore('buyCart'))
      if (goodNum) {
        cart.forEach((item, i) => {
          if (item.goodId === goodId) {
            item.goodNum = goodNum
            // item.checked = checked
          }
        })
      } else if (goodId) {
        cart.forEach((item, i) => {
          if (item.goodId === goodId) {
            cart.splice(i, 1)
          }
        })
      } /* else {
        cart.forEach((item) => {
          item.checked = checked ? '1' : '0'
        })
      } */
      state.cartList = cart
      // 存入localStorage
      setStore('buyCart', cart)
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
  },
  // // 应用mutations
  actions: { // vue运用他来执行mutations
    setToken ({commit}, data) {
      commit('SET_TOKEN', data)
    },
    // 获取用户名
    setUsername ({commit}, data) {
      commit('GET_USERNAME', data)
    },
    // 登出
    logout ({commit}) {
      commit('LOGOUT')
    }

  }
})