import Mock from 'mockjs'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// Mock.mock( url, post/get , 返回的数据)；返回前端传来的数据
// 注册
Mock.mock('http://localhost:8080/users/register', 'post', function (msg) {
  console.log(JSON.parse(msg.body), msg.body)
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
    'result': 'success',
    'data': {
      'account': 'chenwen',
      'userId': '100101',
      identity:'1'
    },
    'token': '10011',
    'status': 200
  }
})

// 获取商品列表
Mock.mock(RegExp('http://localhost:8080/goods/goodsListSelect' + '.*'), 'get', function (msg) {
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
  return {
    success: true,
    data: [
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: 100.00,
        goodId: 100000
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: 100.00,
        goodId: 100001
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: 100.00,
        goodId: 100002
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: 100.00,
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
        goodPrice: 100.00,
        goodId: 100000
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: 100.00,
        goodId: 100001
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: 100.00,
        goodId: 100002
      },
      {
        goodImg: require('@/assets/images/shop/1.jpg'),
        goodName: '宠物狗食品',
        goodPrice: 100.00,
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

// 获取商品管理页面的商品列表
Mock.mock(RegExp('http://localhost:8080/users/goodsList'), 'post', function (msg) {
  // console.log(msg)
  return {
    msg: 'success',
    data: [{
      ownerId: 100000,
      goodId: 200000,
      goodImg: require('@/assets/images/shop/1.jpg'),
      goodName: '宠物狗食品',
      goodPrice: 100,
      isput: '0',
      goodKind: '宠物牌',
      goodUserKind: ['狗', '猫咪'] // 使用商品的宠物种类
    }]
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
  console.log(msg)
  let arr = JSON.parse(msg.body)
  arr.addressId = randomNum
  return {
    msg: 'success'
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
