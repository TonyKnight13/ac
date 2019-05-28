import axios from 'axios'
// import qs from 'querystring'
// axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json'
const baseUrl = 'http://localhost:8080' // 服务器地址

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
  return axios.post(baseUrl + '/users/login', JSON.stringify(params))
}
// 退出登陆
export const loginOut = (params) => {
  return axios.get(baseUrl + '/users/loginOut', params)
}
// 用户信息
export const userInfo = (params) => {
  return axios.get(baseUrl + '/users/checkLogin', params)
}
// 注册账号
export const register = (params) => {
  return axios.post(baseUrl + '/users/register', params)
}
// 获取用户地址
export const addressList = (params) => {
  return axios.post(baseUrl + '/users/addressList', params)
}
// 上传图片
export const upload = (params) => {
  return axios.post(baseUrl + '/goods/imgaeUpload', params)
}

// 商品列表接口
export const navList = (params) => {
  return axios.get(baseUrl + '/goods/navList', params)
}
// 商品详情
export const productDet = (params) => {
  return axios.get(baseUrl + '/goods/productDet', params)
}
// 加入购物车
export const addCart = (params) => {
  return axios.post(baseUrl + '/goods/addCart', params)
}
// 获取购物车列表
export const getCartList = (params) => {
  return axios.post(baseUrl + '/goods/cartList', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return axios.post(baseUrl + '/goods/cartEdit', params)
}
// 全选
export const editCheckAll = (params) => {
  return axios.post(baseUrl + '/goods/editCheckAll', params)
}
// 删除一条购物车商品
export const cartDel = (params) => {
  return axios.post(baseUrl + '/goods/cartDel', params)
}
// // 删除购物车所有商品
// export const delCartChecked = (params) => {
//   return axios.post(baseUrl + '/goods/delCartChecked', params)
// }

// 生成订单
export const submitOrder = (params) => {
  return axios.post(baseUrl + '/goods/addOrder', params)
}
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
