import http from './public'
const baseUrl = '/api'  //接口以api开头
// 登陆
export const userLogin = (params) => {
  return http.fetchPost('${baseUrl}/member/login', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet('${baseUrl}/member/loginOut', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchGet('${baseUrl}/member/checkLogin', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost('${baseUrl}/member/register', params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost('/member/imgaeUpload', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost('/member/updateheadimage', params)
}

// 首页接口
export const productHome = (params) => {
  return http.fetchGet('/goods/home', params)
}
// 首页接口
export const navList = (params) => {
  return http.fetchGet('/goods/navList', params)
}
// // 推荐板块
// export const recommend = (params) => {
//   return http.fetchGet('/goods/recommend', params)
// }
// // 捐赠板块
// export const thank = (params) => {
//   return http.fetchGet('/goods/thank', params)
// }
// // 极验验证码
// export const geetest = (params) => {
//   return http.fetchGet('/member/geetestInit?t=' + (new Date()).getTime(), params)
// }
