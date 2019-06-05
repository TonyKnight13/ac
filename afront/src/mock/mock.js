import Mock from 'mockjs'
import qs from 'querystring'
import { getStore,setStore } from '@/utils/storage'
var Random = require('mockjs').Random;
const fs = require('fs')
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

let docData=[
  {
    img:require('@/assets/images/doc/1.jpg'),
    realName: '王大刚',
    special:'狗',
    area:'浙江'
  },
  {
    img:require('@/assets/images/doc/2.jpg'),
    realName: '李莉',
    special:'猫',
    area:'浙江'
  },
  {
    img:require('@/assets/images/doc/3.jpg'),
    realName: '邱雪',
    special:'水生',
    area:'浙江'
  },
  {
    img:require('@/assets/images/doc/4.jpg'),
    realName: '赵思思',
    special:'兔子',
    area:'南京'
  },
  {
    img:require('@/assets/images/doc/5.jpg'),
    realName: '王晓梦',
    special:'狗',
    area:'北京'
  },
  {
    img:require('@/assets/images/doc/6.jpg'),
    realName: '吴小兰',
    special:'狗',
    area:'上海'
  }
]
let HospitalData=[
  {
    img:require('@/assets/images/hospital/1.jpg'),
    name: '爱宠医院001',
    address:'杭州电子科技大学东边'
  },
  {
    img:require('@/assets/images/hospital/2.jpg'),
    name: '爱宠医院002',
    address:'杭州电子科技大学西边'
  }
]
// 用户
let userDate=[
  // {  //内容
  //   userId:null,
  //   identity:null,
  //   account:null,
  //   password:null,
  //   addressList:null,  //地址列表 Array[]
  //   cartList:null,  //购物车列表 Array[]
  //   orderList:null, //订单列表  Array[]
  //   userInfo:{},  //用户详细信息  Object{}
  //   goodsList:null  //商品列表 只有专业用户才有 数组
  // }
]

// 商品
let goodsDate=[]
  // goodsListAll: [
  //   {
  //     ownerId: null, // == stateKey为1的userId  不需要
  //     goodImg: null,
  //     goodName: null,
  //     goodPrice: null,
  //     isPut: null,  //是否上架 '1'是上架 '0' 是下架
  //     goodId: null,
  //     detail: null,
  //     goodKind: null, // 商品种类 单选 筛选用[宠物牌, 牵引线, 宠物窝, 宠物食品, 宠物食具, 宠物服装, 宠物玩具, 宠物清洁用品, 其他宠物用品]
  //     goodUserKind: null // 使用商品的宠物种类 多选 筛选用[狗, 猫咪, 水族, 兔子, 仓鼠, 乌龟, 鸟, 其他宠物]
  
  //   }
  // ] //所有专业用户的goodsList总和
    


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
  username:null,
  realname:null,
  sex: null,
  phone: null,
  address:null,
  hobby:null,
  intro:null,
  special:null,
  img:null
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
let userIdArry = [] // 存放已有的用户id
let accountArry = [] // 存放已有的账户名

// Mock.mock( url, post/get , 返回的数据)；返回前端传来的数据
// 注册
Mock.mock('http://localhost:8080/users/register', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let user = JSON.parse(msg.body)
  let id = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
  let flag = false

  if (accountArry.indexOf(user.account) != -1) {
    return {
      code: false,
      msg: '账号已注册'
    }
  } else {
    accountArry.push(user.account)
    while (flag === false) {
      if (userIdArry.indexOf(id) == -1) { //遍历数组查看是否存在id，没有返回-1
        userIdArry.push(id)
        flag = true
      } else {
        id = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
      }
    }
    console.log(user)
    userDate.push({
      userId: id,
      account: user.account,
      password: user.password1,
      identity: user.identity,
      addressList:[],
      orderList:[],
      userInfo:{},
      goodsList:[],
    })
    return {
      code: 1
    }
  }
})
// 登录
Mock.mock('http://localhost:8080/users/login', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let obj = JSON.parse(msg.body)
  if(accountArry.indexOf(obj.account) != -1) { //判断是否存在账号
    for(let i=0;i<userDate.length;i++){
      if(userDate[i].account == obj.account){
        if(userDate[i].password == obj.password){
          return{
            code:1,
            id: userDate[i].userId,
            account:obj.account,
            identity:userDate[i].identity,
          }
        }else{
          return{
            code:0,
            msg:"密码错误"
          }
        }
      }
    }
  }else{
    return{
      code:0,
      msg:'账号不存在'
    }
  }
})

// 登出
Mock.mock('http://localhost:8080/users/logout', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  return{
    code:1
  }
})

//用户信息
Mock.mock('http://localhost:8080/users/userInfo', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let obj = JSON.parse(msg.body)
  for(let i=0; i<)
  return {
    code:1
  }
})

//用户信息修改
Mock.mock('http://localhost:8080/users/userInfoUpdate', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  
  return{
    code:1
  }

})

// 修改密码
Mock.mock('http://localhost:8080/users/changePass', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let obj = JSON.parse(msg.body)
  for(let i=0;i<userDate.length;i++){
    if(userDate[i].userId == obj.userId){
      userDate[i].password = obj.password
      return{
        code:1
      }
    }
  }
})
// 获取地址列表
Mock.mock(RegExp('http://localhost:8080/users/addressList'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // console.log(msg)
  let obj = JSON.parse(msg.body)
  for(let i=0;i<userDate.length;i++){
    if(userDate[i].userId == obj.userId){
      return{
        code:1,
        data:userDate[i].addressList
      }
    }
  }

})
// 修改收货地址
Mock.mock(RegExp('http://localhost:8080/users/updateAddress'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let obj = JSON.parse(msg.body)
  for(let i=0;i<userDate.length;i++){
    if(userDate[i].userId == obj.userId){
      delete obj.userId
      userDate[i].addressList.forEach((item,j) => {
        if(item.addressId == obj.addressId){
          userDate[i].addressList[j]=obj
          return{
            code:1
          }
        }
      });
    }
  }
})
// 添加收货地址
Mock.mock(RegExp('http://localhost:8080/users/addAddress'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let obj = JSON.parse(msg.body)
  obj.addressId = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
  for(let i=0;i<userDate.length;i++){
    if(userDate[i].userId == obj.userId){
      delete obj.userId
      userDate[i].addressList.push(obj)
      return{
        code:1
      }
    }
  }

})
// 删除收货地址
Mock.mock(RegExp('http://localhost:8080/users/delAddress'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let obj = JSON.parse(msg.body)
  for(let i=0;i<userDate.length;i++){
    if(userDate[i].userId == obj.userId){
      delete obj.userId
      userDate[i].addressList.forEach((item,j) => {
        if(item.addressId == obj.addressId){
          
          userDate[i].addressList.splice(j,1)
          console.log(111,userDate[i])
        }
      });
      return{
        code:1
      }
    }
  }
})



// 获取商品管理页面的商品列表
Mock.mock('http://localhost:8080/users/goodsList', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // console.log(msg)
  let obj = JSON.parse(msg.body)
  for(let i=0;i<userDate.length;i++){
    if(userDate[i].userId == obj.userId){
      return{
        code:1,
        data:userDate[i].goodsList
      }
    }
  }
})
// 修改商品管理页面的商品列表
Mock.mock('http://localhost:8080/users/goodsUpdate', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let obj = JSON.parse(msg.body)
  for(let i=0;i<userDate.length;i++){
    if(userDate[i].userId == obj.userId){
      delete obj.userId
      userDate[i].goodsList.forEach((item,j) => {
        if(item.goodId == obj.goodId){
          userDate[i].goodsList[j]=obj
        }
      });
      goodsDate.forEach((item,k)=>{
        if(item.goodId == obj.goodId){
          goodsDate[k]=obj
        }
      })
      console.log(goodsDate, '')
      return{
            code:1
          }
    }
  }
})
// 添加商品管理页面的商品列表
Mock.mock('http://localhost:8080/users/goodsAdd', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let obj = JSON.parse(msg.body)
  obj.goodId = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
  for(let i=0;i<userDate.length;i++){
    if(userDate[i].userId == obj.userId){
      delete obj.userId
      userDate[i].goodsList.push(obj)
      goodsDate.push(obj)
      return{
        code:1
      }
    }
  }
})


// 商品列表
Mock.mock(RegExp('http://localhost:8080/shop/navList' + '.*'), 'get', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
  return {
    code: 1,
    data: goodsDate
  }
})

// 商品详情页
Mock.mock(RegExp('http://localhost:8080/shop/goodsDetail'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
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
Mock.mock(RegExp('http://localhost:8080/shop/goodsListSelect'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
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

// 加入购物车
Mock.mock(RegExp('http://localhost:8080/shop/cartAdd'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // console.log(msg)
  return {
  }
})
// 获取购物车列表对应api中的getCartList()
Mock.mock(RegExp('http://localhost:8080/shop/cartList'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
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

// 生成订单
Mock.mock(RegExp('http://localhost:8080/shop/orderAdd'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // console.log(msg)
  return {
    msg: 'success',
    orderId: '300000'
  }
})

// 编辑购物车
Mock.mock(RegExp('http://localhost:8080/shop/cartEdit'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // console.log(msg)
  return {
    msg: 'success',
    orderId: '300000'
  }
})
// 删除一条购物车记录
Mock.mock(RegExp('http://localhost:8080/shop/cartDel'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // console.log(msg)
  return {
    msg: 'success',
    orderId: '300000'
  }
})
// 获取订单列表
Mock.mock(RegExp('http://localhost:8080/shop/orderList' + '.*'), 'get', function (msg) {
  console.log(JSON.parse(msg.body))
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
Mock.mock(RegExp('http://localhost:8080/shop/orderDel' + '.*'), 'get', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
  // console.log(msg.url, option)
  return {
    msg: 'success'
  }
})
// 生成订单
Mock.mock(RegExp('http://localhost:8080/shop/orderAdd' + '.*'), 'get', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
  // console.log(msg.url, option)
  return {
  }
})
//医院列表
Mock.mock(RegExp('http://localhost:8080/hospital/hospitalNavList' + '.*'), 'get', function (msg) {
  console.log(JSON.parse(msg.body)) 
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
  return {
    success: true,
    code: 1,
    data: [
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李珊珊',
        address: 'xxxxx',
        physicId: 100000 // 医生或医院的id
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '童晓红',
        address: 'xxxxx',
        physicId: 100010 // 医生或医院的id
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李莉',
        address: 'xxxxx',
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李珊珊',
        address: 'xxxxx',
        physicId: 100110 // 医生或医院的id

      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '童晓红',
        address: 'xxxxx',
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李莉',
        address: 'xxxxx',
      },
      {
        image: require('@/assets/images/shop/1.jpg'),
        name: '李珊珊',
        address: 'xxxxx',
      }

    ]
  }
})
// 医生列表
Mock.mock(RegExp('http://localhost:8080/hospital/docNavList' + '.*'), 'get', function (msg) {
  console.log(JSON.parse(msg.body))

  return {
    code:1,
    data:docData,
  }
})
// 医生筛选
Mock.mock(RegExp('http://localhost:8080/hospital/docSelect'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let obj=JSON.parse(msg.body)
  let arr=[]
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
  docData.forEach((item,i)=>{
    if(obj.specialcheked.length==0){
      if(obj.areachecked.length ==0){
        arr=docData
      }
    }
    if(item.special == obj.specialcheked[0] && item.area ==  obj.areachecked[0]){
      arr.push(item)
    }

  })
  return {
    code:1,
    data:arr,
  }
})
//殡葬管理
Mock.mock(RegExp('http://localhost:8080/death/deathManage' + '.*'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
  console.log(msg.data)
  return {
    code:1,

  }
})
//殡葬信息修改
Mock.mock(RegExp('http://localhost:8080/death/deathManageUpdate'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
  console.log(msg.data)
  return {
    code:1,
    
  }
})
//经验列表
Mock.mock(RegExp('http://localhost:8080/baike/experience'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
  console.log(msg.data)
  return {
  }
})
//上传文章
Mock.mock(RegExp('http://localhost:8080/baike/addArticle'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
  console.log(msg.data)
  return {
  }
})