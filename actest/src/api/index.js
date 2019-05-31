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


// 注册账号
export const register = (params) => {
  return axios.post(baseUrl + '/users/register', JSON.stringify(params))
}
// 登陆
export const userLogin = (params) => {
  // return axios.post(`${base}/yyzt-web/auth/login.do`,  query.stringify(params));
  return axios.post(baseUrl + '/users/login', JSON.stringify(params))
}
// // 退出登陆
// export const loginOut = (params) => {
//   return axios.get(baseUrl + '/users/loginOut', params)
// }

/* 个人中心 */
// 用户信息
export const userInfo = (params) => {
  return axios.get(baseUrl + '/users/userInfo', params)
}
// 修改密码
export const changePass = (params) => {
  return axios.post(baseUrl + '/users/changePass', JSON.stringify(params))
}
/* 我的地址 */
// 获取用户地址
export const addressList = (params) => {
  return axios.post(baseUrl + '/users/addressList', JSON.stringify(params))
}
// 修改收货地址
export const addressUpdate = (params) => {
  return axios.post(baseUrl + '/users/updateAddress', JSON.stringify(params))
}
// 添加收货地址
export const addressAdd = (params) => {
  return axios.post(baseUrl + '/users/addAddress', JSON.stringify(params))
}
// 删除收货地址
export const addressDel = (params) => {
  return axios.post(baseUrl + '/users/delAddress', JSON.stringify(params))
}
/* 商品管理 */
// 获取商品管理页面的商品列表
export const goodsList = (params) => {
  return axios.post(baseUrl + '/users/goodsList', JSON.stringify(params))
}
// 修改商品管理页面的商品列表
export const goodsUpdate = (params) => {
  return axios.post(baseUrl + '/users/goodsUpdate', JSON.stringify(params))
}
// 添加商品管理页面的商品列表
export const goodsAdd = (params) => {
  return axios.post(baseUrl + '/users/goodsAdd', JSON.stringify(params))
}
// 删除商品管理页面的商品列表
export const goodsPut = (params) => {
  return axios.post(baseUrl + '/users/goodsPut', JSON.stringify(params))
}

/* 商店 */
// 商品列表接口
export const navList = (params) => {
  return axios.get(baseUrl + '/goods/navList', params)
}
// 商品详情
export const productDet = (params) => {
  return axios.get(baseUrl + '/goods/productDet', params)
}
// 商品筛选
export const goodsListSelect = (params) => {
  return axios.post(baseUrl + '/goods/goodsListSelect', JSON.stringify(params))
}

/* 医院 */
// 医院商品列表接口
export const hospitalNavList = (params) => {
  return axios.get(baseUrl + '/hospital/hospitalNavList', params)
}
// 医院、医生筛选
export const hospitalSelect = (params) => {
  return axios.post(baseUrl + '/hospital/hospitalSelect', JSON.stringify(params))
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
  return axios.post(baseUrl + '/goods/addOrder', params)
}






// 上传图片
// export const upload = (params) => {
//   return axios.post(baseUrl + '/users/imgaeUpload', JSON.stringify(params))
// }
// // 删除购物车所有商品
// export const delCartChecked = (params) => {
//   return axios.post(baseUrl + '/goods/delCartChecked', params)
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