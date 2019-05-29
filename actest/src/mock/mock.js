import Mock from 'mockjs'
import qs from 'querystring'
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 用户
let userDate=[
  // {  内容
  //   userId:null, //用户Id
  //   stateKey:null, //用户身份标签  0 普通 1 专业
  //   addressList:null,  //地址列表 Array[]
  //   cartList:null,  //购物车列表 Array[]
  //   orderList:null, //订单列表  Array[]
  //   userInfo:null,  //用户详细信息  Object{}
  //   goodsList:null  //商品列表 只有专业用户才有 数组
  // }
]

// 商品
let goodsDate={
  // goodsListAll: null  //所有专业用户的商品列表总和
}

// 内容格式
//地址列表 Array[]  
let addressList=[
  {
    addressId:null,
    realName: null,
    phone: null,
    address: null
  }
]

//购物车列表 Array[]
let cartList=[
  {
    goodImg: null,
    goodName: null,
    goodPrice: null,
    goodId: null,
    goodNum: null,
  }
]

//订单列表  Array[]
let orderList=[
  {
    orderId:null,
    goodsList: [
      {
        goodImg: null,
        goodName: null,
        goodPrice: null,
        goodId: null,
        goodNum: null,
      }
    ],
    addressId: '1',
    realName: 'chen',
    phone: '18100171666',
    address: '浙江省杭州市天台县',
    orderTotal: '750.00'
  }
]

//用户详细信息
let userInfo={
  userName:null,
  password:null,
  sex:null,
  phone:null,
  age:null,
}
//商品列表
let goodsList=[
  {
    ownerId:null,  // ==stateKey为1的用户id 
    goodImg: null,
    goodName: null,
    goodPrice: null,
    goodId: null,
    detail:null,
    goodKind: null,  //商品种类 String 筛选用[宠物牌, 牵引线, 宠物窝, 宠物食品, 宠物食具, 宠物服装, 宠物玩具, 宠物清洁用品, 其他宠物用品]
    goodUserKind:null  //使用商品的宠物种类  筛选用[狗, 猫咪, 水族, 兔子, 仓鼠, 乌龟, 鸟, 其他宠物]
  }
]

// Mock.mock( url, post/get , 返回的数据)；返回前端传来的数据
// 登录
Mock.mock('http://localhost:8080/users/login', 'post', function (msg) {
  // console.log(JSON.parse(msg.body).account, msg)
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
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
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
  // console.log(msg)
  return {
    msg: 'success',
    data: [{
      addressId: '0',
      realName: 'chenwei',
      phone: '18100171881',
      address: '浙江省杭州市天台县'
    },
    {
      addressId: '1',
      realName: 'chen',
      phone: '18100171666',
      address: '浙江省杭州市天台县'
    }]
  }
})
// 修改地址列表
Mock.mock(RegExp('http://localhost:8080/users/updateAddress'), 'post', function (msg) {
  // console.log(msg)
  return {
    msg: 'success',
    data: [{
      addressId: '0',
      realName: 'chenwei',
      phone: '18100171881',
      address: '浙江省杭州市天台县'
    },
    {
      addressId: '1',
      realName: 'chen',
      phone: '18100171666',
      address: '浙江省杭州市天台县'
    }]
  }
})
// 添加地址列表
Mock.mock(RegExp('http://localhost:8080/users/addAddress'), 'post', function (msg) {
  // console.log(msg)
  let arr = JSON.parse(msg.body)
  let userId = arr.userId
  delete arr.userId  //删除arr中的userID
  var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);  //生成地址id
  arr.addressId = randomNum
    
  return {
    msg: 'success',
  }
})
// 生成订单
Mock.mock(RegExp('http://localhost:8080/goods/addOrder'), 'post', function (msg) {
  // console.log(msg)
  return {
    msg: 'success',
    orderId: '300000'
  }
})
// 获取购物车列表对应api中的getCartList()
Mock.mock(RegExp('http://localhost:8080/goods/cartList'), 'post', function (msg) {
  // console.log(msg)
  return {
    msg: 'success',
    goods: [
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: '200000',
        goodNum: 3,
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '150.00',
        goodId: '200001',
        goodNum: 2,

      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '200.00',
        goodId: '200002',
        goodNum: 2,
      }
    ]
  }
})
// 编辑购物车
Mock.mock(RegExp('http://localhost:8080/goods/cartEdit'), 'post', function (msg) {
  // console.log(msg)
  return {
    msg: 'success',
    orderId: '300000'
  }
})
// 删除一条购物车记录
Mock.mock(RegExp('http://localhost:8080/goods/cartDel'), 'post', function (msg) {
  // console.log(msg)
  return {
    msg: 'success',
    orderId: '300000'
  }
})
// 获取订单列表
Mock.mock(RegExp('http://localhost:8080/goods/orderList' + '.*'), 'get', function (msg) {
  // let option = msg.url.split('?')[1]
  // console.log(msg.url, option)
  return {
    msg: 'success',
    data: [
      {
        orderId: 30000,
        goodsList: [{
          goodImg: require('@/assets/images/shop/1.jpg'),
          goodName: '宠物狗初级食品',
          goodPrice: '100.00',
          goodId: '200000',
          goodNum: 3
        },
        {
          goodImg: require('@/assets/images/shop/1.jpg'),
          goodName: '宠物狗中级食品',
          goodPrice: '150.00',
          goodId: '200001',
          goodNum: 3
        }],
        addressId: '1',
        realName: 'chen',
        phone: '18100171666',
        address: '浙江省杭州市天台县',
        orderTotal: '750.00'
      },
      {
        orderId: 30001,
        goodsList: [{
          goodImg: require('@/assets/images/shop/1.jpg'),
          goodName: '宠物狗中级食品',
          goodPrice: '150.00',
          goodId: '200000',
          goodNum: 3
        }],
        addressId: '1',
        realName: 'chen',
        phone: '18100171666',
        address: '浙江省杭州市天台县',
        orderTotal: '450.00'
      },
      {
        orderId: 30002,
        goodsList: [{
          goodImg: require('@/assets/images/shop/1.jpg'),
          goodName: '宠物狗高级食品',
          goodPrice: '200.00',
          goodId: '200000',
          goodNum: 3
        }],
        addressId: '1',
        realName: 'chen',
        phone: '18100171666',
        address: '浙江省杭州市天台县',
        orderTotal: '600.00'
      }
    ]
  }
})
// 删除订单
Mock.mock(RegExp('http://localhost:8080/goods/delOrder' + '.*'), 'get', function (msg) {
  // let option = msg.url.split('?')[1]
  // console.log(msg.url, option)
  return {
    msg: 'success'
  }
})
