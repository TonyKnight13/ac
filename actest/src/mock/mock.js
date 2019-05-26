import Mock from 'mockjs'
import qs from 'querystring'
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// Mock.mock( url, post/get , 返回的数据)；返回前端传来的数据
// 登录
Mock.mock('http://localhost:8080/users/login', 'post', function(msg){
  console.log(JSON.parse(msg.body).account,msg)
  return {
    "result":"success",
    "data":{
      "account":"chenwen",
    },
    "token":'10011',
    "status":200
  }
})