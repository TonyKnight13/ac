import Mock from 'mockjs'
import qs from 'querystring'
var Random = require('mockjs').Random;
const fs = require('fs')
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 用户
let userDate=[
  {  //内容
    userId:null,
    addressList:null,  //地址列表 Array[]
    cartList:null,  //购物车列表 Array[]
    orderList:null, //订单列表  Array[]
    userInfo:null,  //用户详细信息  Object{}
    goodsList:null  //商品列表 只有专业用户才有 数组
  }
]

// 商品
let goodsDate={
  goodsListAll: [
    {
      ownerId: null, // == stateKey为1的userId  不需要
      goodImg: null,
      goodName: null,
      goodPrice: null,
      isPut: null,  //是否上架 '1'是上架 '0' 是下架
      goodId: null,
      detail: null,
      goodKind: null, // 商品种类 单选 筛选用[宠物牌, 牵引线, 宠物窝, 宠物食品, 宠物食具, 宠物服装, 宠物玩具, 宠物清洁用品, 其他宠物用品]
      goodUserKind: null // 使用商品的宠物种类 多选 筛选用[狗, 猫咪, 水族, 兔子, 仓鼠, 乌龟, 鸟, 其他宠物]
  
    }
  ] //所有专业用户的goodsList总和
    
}

// 内容格式
// 地址列表 Array[]  
let addressList=[
  {
    addressId:null,
    realName: null,
    phone: null,
    address: null
  }
]

// 购物车列表 Array[]
let cartList=[
  {
    goodId: null,
    goodImg: null,
    goodName: null,
    goodPrice: null,
    goodNum: null
  }
]

// 订单列表  Array[]
let orderList=[
  {
    orderId: null,
    goodsList: [
      {
        goodImg: null,
        goodName: null,
        goodPrice: null,
        goodId: null,
        goodNum: null
      }
    ],
    addressId: null,
    realName: null,
    phone: null,
    address: null,
    orderTotal: null
  }
]

// 用户详细信息
let userInfo = {
  account: null,
  password: null,
  stateKey: null, // 用户身份标签  0 普通 1 专业 //用户Id  buyer seller
  sex: null,
  phone: null,
  age: null
}
// 商品列表
let goodsList=[
  {
    goodImg: null,
    goodName: null,
    goodPrice: null,
    isPut: null,  //是否上架 '1'是上架 '0' 是下架
    goodId: null,
    detail: null,
    goodKind: null, // 商品种类 单选 筛选用[宠物牌, 牵引线, 宠物窝, 宠物食品, 宠物食具, 宠物服装, 宠物玩具, 宠物清洁用品, 其他宠物用品]
    goodUserKind: null // 使用商品的宠物种类 多选 筛选用[狗, 猫咪, 水族, 兔子, 仓鼠, 乌龟, 鸟, 其他宠物]
  }
]
// 随机生成6位数字
var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
let userIdArry = [] // 存放已有的用户id
let accountArry = [] // 存放已有的用户名

// Mock.mock( url, post/get , 返回的数据)；返回前端传来的数据
// 注册
Mock.mock('http://localhost:8080/users/register', 'post', function (msg) {
  console.log(JSON.parse(msg.body), msg)
  let user = JSON.parse(msg.body)
  let id = randomNum
  let flag = false

  if (accountArry.indexOf(user.account) != -1) {
    return {
      success: false,
      msg: '用户名已注册'
    }
  } else {
    accountArry.push(user.account)
    while (flag === false) {
      if (userIdArry.indexOf(id) == -1) {
        userIdArry.push(id)
        flag = true
      } else {
        id = randomNum
      }
    }
    console.log(user)
    userDate.push({
      userId: id,
      userInfo: {
        account: user.account,
        password: user.password1,
        identity: user.identity
      }
    })
    console.log(userDate)
    return {
      success: true
    }
  }
})
// 登录
Mock.mock('http://localhost:8080/users/login', 'post', function (msg) {
  // console.log(JSON.parse(msg.body).account, msg)
  return {
    code: 1,
    account: 'chenwen',
    id: '100101',
    identity: '1',
    message:'ssss'
  }
})

// 商品列表
Mock.mock(RegExp('http://localhost:8080/goods/navList' + '.*'), 'get', function (msg) {
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
  return {
    success: true,
    data: [
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100000
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100001
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100002
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100003
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100000
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100001
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100002
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100003
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100000
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100001
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100002
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100003
      }

    ]
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
// 商品筛选
Mock.mock(RegExp('http://localhost:8080/goods/goodsListSelect'), 'post', function (msg) {
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
  return {
    success: true,
    data: [
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100000
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100001
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100002
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: '100.00',
        goodId: 100003
      }
    ]
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
  console.log(msg)
  let arr = JSON.parse(msg.body)
  arr.addressId = randomNum
  return {
    msg: 'success'
  }
})
// 删除地址列表
Mock.mock(RegExp('http://localhost:8080/users/delAddress'), 'post', function (msg) {
  // console.log(msg)
  let arr = JSON.parse(msg.body)
  arr.addressId = randomNum
  return {
    success: true
  }
})


var OBJ
// 获取商品管理页面的商品列表
Mock.mock(RegExp('http://localhost:8080/users/goodsList'), 'post', function (msg) {
  // console.log(msg)
  let data =[]
  if(OBJ){
    data.push(OBJ)
  }
  return {
    
    msg: 'success',
    data:data
  }
})
// 修改商品管理页面的商品列表
Mock.mock(RegExp('http://localhost:8080/users/goodsUpdate'), 'post', function (msg) {
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
// 添加商品管理页面的商品列表
Mock.mock(RegExp('http://localhost:8080/users/goodsAdd'), 'post', function (msg) {
  
  OBJ = JSON.parse(msg.body)
  console.log(OBJ)
  return {
    msg: 'success',
  }
})
// 上、下架商品管理页面的商品列表
Mock.mock(RegExp('http://localhost:8080/users/goodsPut'), 'post', function (msg) {
  // console.log(msg)
  let arr = JSON.parse(msg.body)
  arr.addressId = randomNum
  return {
    success: true
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


// 医生、医院列表
Mock.mock(RegExp('http://localhost:8080/hospital/hospitalNavList' + '.*'), 'get', function (msg) {
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
  return {
    success: true,
    data: [
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李珊珊',
        speciality: ['猫', '狗'],
        physicId: 100000 // 医生或医院的id
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '童晓红',
        speciality: ['两栖类'],
        physicId: 100010 // 医生或医院的id
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李莉',
        speciality: ['水生']
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李珊珊',
        speciality: ['猫', '狗'],
        physicId: 100110 // 医生或医院的id

      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '童晓红',
        speciality: ['两栖类']
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李莉',
        speciality: ['水生']
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李珊珊',
        speciality: ['猫', '狗']
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '童晓红',
        speciality: ['两栖类']
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李莉',
        speciality: ['水生']
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李珊珊',
        speciality: ['猫', '狗']
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '童晓红',
        speciality: ['两栖类']
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李莉',
        speciality: ['水生']
      },
    ]
  }
})

//殡葬管理
Mock.mock(RegExp('http://localhost:8080/hospital/deathRegist' + '.*'), 'post', function (msg) {
  // let option = msg.url.split('?')[1]
  console.log(msg.data)
  return {
    code:1,

  }
})
//殡葬信息修改
Mock.mock(RegExp('http://localhost:8080/hospital/deathRegistUpdate'), 'post', function (msg) {
  // let option = msg.url.split('?')[1]
  console.log(msg.data)
  return {
    code:1,
    
  }
})