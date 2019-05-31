import axios from 'axios'
import qs from 'querystring'
// axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json'
const baseUrl = 'http://localhost:8080'  //服务器地址

// // 请求拦截器
// axios.interceptors.request.use(function(config) {
//   return config;
// }, function(error) {
//   return Promise.reject(error);
// })
// // 响应拦截器
// axios.interceptors.response.use(function(response) {
// return response;
// }, function(error) {
// return Promise.reject(error);
// })

// 登陆
export const userLogin = (params) => {
  // return axios.post(`${base}/yyzt-web/auth/login.do`,  query.stringify(params));
  return axios.post(baseUrl+'/users/login', JSON.stringify(params))
}
// 退出登陆
export const loginOut = (params) => {
  return axios.get(baseUrl+'/users/loginOut', params)
}
// 用户信息
export const userInfo = (params) => {
  return axios.get(baseUrl+'/users/checkLogin', params)
}
// 商品筛选
export const goodsListSelect = (params) => {
  return axios.post(baseUrl + '/goods/goodsListSelect', JSON.stringify(params))
}

/* 购物车 */
// 加入购物车
export const addCart = (params) => {
  return axios.post(baseUrl + '/goods/addCart', JSON.stringify(params))
}
// 获取购物车列表
export const getCartList = (params) => {
  return axios.post(baseUrl + '/goods/cartList', JSON.stringify(params))
}
// 编辑购物车
export const cartEdit = (params) => {
  return axios.post(baseUrl + '/goods/cartEdit', JSON.stringify(params))
}
// // 全选
// export const editCheckAll = (params) => {
//   return axios.post(baseUrl + '/goods/editCheckAll', JSON.stringify(params))
// }
// 删除一条购物车商品
export const cartDel = (params) => {
  return axios.post(baseUrl + '/goods/cartDel', JSON.stringify(params))
}

// 订单
// 获取用户订单
export const orderList = (params) => {
  return axios.get(baseUrl + '/goods/orderList', params)
}
// 删除订单
export const delOrder = (params) => {
  return axios.get(baseUrl + '/goods/delOrder', params)
}
// 生成订单
export const submitOrder = (params) => {
  return axios.post(baseUrl + '/goods/addOrder', JSON.stringify(params))
}
// // 上传图片
// export const upload = (params) => {
//   return axios.post('/member/imgaeUpload', params)
// }
// // 修改头像
// export const updateheadimage = (params) => {
//   return axios.post('/member/updateheadimage', params)
// }

// // 首页接口
// export const productHome = (params) => {
//   return axios.get('/goods/home', params)
// }
// // 首页接口
// export const navList = (params) => {
//   return axios.get('/goods/navList', params)
// }
// // 推荐板块
// export const recommend = (params) => {
//   return axios.get('/goods/recommend', params)
// }
// // 捐赠板块
// export const thank = (params) => {
//   return axios.get('/goods/thank', params)
// }
// // 极验验证码
// export const geetest = (params) => {
//   return axios.get('/member/geetestInit?t=' + (new Date()).getTime(), params)
// }
