import Mock from 'mockjs'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// Mock.mock( url, post/get , 返回的数据)；返回前端传来的数据
Mock.mock('http://101.71.41.226:8081/users/register', 'post', function(msg){
  return msg;
})