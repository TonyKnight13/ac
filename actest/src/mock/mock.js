import Mock from 'mockjs'
import qs from 'querystring'
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// Mock.mock( url, post/get , 返回的数据)；返回前端传来的数据
// 登录
Mock.mock('http://localhost:8080/users/login', 'post', function (msg) {
  console.log(JSON.parse(msg.body).account, msg)
  return {
    'result': 'success',
    'data': {
      'account': 'chenwen',
      'userId': '100101'
    },
    'token': '10011',
    'status': 200
  }
})

// 商品详情页
Mock.mock(RegExp('http://localhost:8080/goods/productDet' + '.*'), 'get', function (msg) {
  let option = msg.url.split('?')[1]
  console.log(msg, option)
  return {
    goodImg: require('@/assets/images/shop/1.jpg'),
    goodName: '宠物狗食品',
    goodPrice: '100.00',
    detail: '这是适合小型犬的食物，营养丰富...',
    goodId: '200000'
  }
})
// 获取地址列表
Mock.mock(RegExp('http://localhost:8080/users/addressList'), 'post', function (msg) {
  console.log(msg)
  return {
    addressId: '0',
    realName: 'chenwei',
    phone: '18100171881',
    address: '浙江省杭州市天台县'
  }
})
// 生成订单
Mock.mock(RegExp('http://localhost:8080/goods/addOrder'), 'post', function (msg) {
  console.log(msg)
  return {
    msg: 'success',
    orderId: '300000'
  }
})
// 获取购物车列表对应api中的getCartList()
Mock.mock(RegExp('http://localhost:8080/goods/cartList'), 'post', function (msg) {
  console.log(msg)
  return {
    msg: 'success',
    goods: [
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: '200000',
        goodNum: 3,
        checked: '0'
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '150.00',
        goodId: '200001',
        goodNum: 2,
        checked: '0'

      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '200.00',
        goodId: '200002',
        goodNum: 2,
        checked: '0'
      }
    ]
  }
})
