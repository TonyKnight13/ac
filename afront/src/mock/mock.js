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
    identity:null,
    addressList:null,  //地址列表 Array[]
    cartList:null,  //购物车列表 Array[]
    orderList:null, //订单列表  Array[]
    userInfo:{},  //用户详细信息  Object{}
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
var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
let userIdArry = [] // 存放已有的用户id
let accountArry = [] // 存放已有的账户名

// Mock.mock( url, post/get , 返回的数据)；返回前端传来的数据
// 注册
Mock.mock('http://localhost:8080/users/register', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let user = JSON.parse(msg.body)
  let id = randomNum
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
        id = randomNum
      }
    }
    console.log(user)
    userDate.push({
      userId: id,
      userInfo: {
        account: user.account,
        password: user.password1,
      }
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
      if(userDate[i].userInfo.account == obj.account){
        if(userDate[i].userInfo.password == obj.password){
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
  }
})

//用户信息
Mock.mock(RegExp('http://localhost:8080/users/userInfo'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
  var imgsss = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd1XVe53XvvD2eGQ/lXQcKuDwc2eFlCAGnUn7kT6T86J/+aNTgsWPchJJYciEOCQ8hF+G0hFCIHRSEqAuJBCqRaUEIEbmBppAIBGnESwZje8COZ+y587j3PLq+ffadGJix53HvPevcuz60xPjec89ZZ+39nf04+9vLSZKEFArFzHA1BAqFEkShUIIoFEoQhUIJolAoQRQKJYhCoQRRKJQgCoUSRKFQKEEUCiWIQrFo+Gv/8/YH+f/nsMWSHHMChyhxqPTTdyncWyJ3ScD/ztipiB3wXSqu6P17avN+TyFC5ggv4tRnmoxWTP1+5F+Mz17GPvPl49EKBWd3UsfXllPiso8VcYtmPba3fNuKrBVXrGFCbrdPwXndFL49ltI367roOpSUI4pGypv9s7q+ltj6JxqOQ07Bo/DgxGb2/a8cX0CnAWXJ5etz2TqdHiXHKlKj9w6i9XX8Ic41DmI8FVHhmmXk85MmRhCzJoiTWnig9LfJRHihgydxzAxJhBr7Bh/hK3yu+p9568FliTJF2aKMZfVd/kQOcKP6OBmS9+Rjm4zJ6faoeN0gOUn61MncLX4CJ+MRhe+P/dRxhfew2Df4CF/hs4jWg8vQYUKYMuWyRRkLjeHQ8YP0Z9mekVjA8Qj3VVcuoeDiXu63lkUE0ym6FA5PXBaNVr7qtPumGyPR4Bt8hK/wWUR5chn6XJYoU5StUHL8l+XEx2axhkS6yk+chJuP4rXLyOkIKJkS0B67adcqfL/0Y4pixxSysK6V8Yl9Mz7i3272NRFlhzJsu24Z5l9E9Ahmwfrpoj7uw3fZtktsRZKjIXnndlLxin7+W8ZTBwPf6I+Tg9HwxK2Ob8citbCoBoaxBxMCvsFH+CqjHCtUvLzflKWUcpwB91gupG5f9/Rtx39ZZBtmWyJtphKzHTQW0diP36b4aJmcLj/zGaSkHJPb4SWFi/tOJd8bTqd9s48VBRh4RKeUX/vjgXg8cpyCmz05xkJylxSoa8M5RF0eJaVIIkGOsg2yTc3UgpD94psiWxEOqDNYoOIXuHnGwE5AXUTFi46FTnRw4l/dwEm7/pSxcYnCF/gE3zInh52RRJkVP7/MlKFQcgCbjifHTAQBfsb2qsgBO3e1Cpf3UXBej3nRJKKrxU/rcH/pKzz4vNIQuRJTEmZklbg6EL4SPsE3GQPzinmfhbJDGQolB+r8w58abs5y8DqRt4ABeptLRR7koY9NleybEYw/MPisvF/ayT1/SvDewcnIcG32wfiCAbEvoCZyGaGsitdyz6XdTctQJq6fcT5mloNfYvu5yFZkpEz+RT0UrFoqpxVBV+vQxIrkaPnrbqdvXs6hcjbU+Jq4Nvvwd/BFRNeq2npwWfkX95iyE9p6PM72P/MhCPANTBSKu5WITHcC074Y9CUTkYglKBgcV/aVtlM5Kpp/RHFjDdfka7MP/2wG6m72661QNigjlBXKTGBtsjWKNs5atCf44Uds3xc5YD8Wknd2BxWuGjCzIxLWQzlFj+IjU108OL7bafM5sm5DDdfka/8T+9AJXyTMpqFsUEYoK5SZ0NbjVlvX500Q4Ha2A+JuCcEvhVS8qp/8MzspHhMSfO7mVPaP35BMRp9JsCQldbX+hmvxNfnamzJfqVvtWnGZoGxQRigroYs6UbfvOGHn4ORVkTaIbEWwtqg3MNO+Zql0JGCdVuCayhDuG9uJB7vp+oR17FbZc+NauCauLWLmKkqXr6NsUEYoK6GtxwY6CXXnEs0n2faIHLCPhhR8bikFKwRN+xZddHWu5a7Ol9yCZ2ZwHKdOxufGNeKRqS/hmnLWW1VMmQSrl5oyEkqOPbZu02IJAsic9sU7B+5uF9cOmqUfeLOdOaAZYb/CA+M/Ic9NxUoYMNfD/PT84f7xB807EAnrrbgMUBZt1w1SEpCIqfjF1Om5EuQNth0iu1r8tPLP76LCpX2yWpHDk2dGH018p6brtD5hOHf04cR3okOTZ0lqPVAW3gVdlMhdrfsTW6drRhDgRrYJcbeKZQxTkenvegNt6YBQwrQvOxG+P3ZHEia9TuClS9Br1XKge8XnxLlxjelzZ/2w4tijDMxyoHIsVQg1zvYPcy7KeZx4jG2zyFakFJF7Whu1XT2QvhfJeryeVNdplYPo4Pi9hKd7VVxVC8O5cH4+N65hXgoKuGfEHmWAskjGxI49Ntu6XHOCAD9ie1PcLSepjDNY00fB8m6KpSyJx/jgg9LfJEfLK40818w+LXY5e5zKaMfKl+DcIlSCZp0cd3U59igDI4+WOa2LunvfvDoD9RrcNLqAjDy3yzfrtKqbAkggSDIZmSlYxzz9a8BaJ101zF2rh3BuSTJaCKGMDEGujHbedXch0X2ebbdEkkDC6a9cQoWVguS53P0JP5xcHY1W/tppD9KxgrdAw5QxnwPn4nOukrPeqkzBJb0m9oJltLtt3a07QYD1IkMAeS7/hw0BXMhzJwXJc/eV7kuiyIN8OOGuUhLP06JUeoxz4FxiZLRouTsDM9WO2OdBRtsIgrzHtk3kgH00JO+cTipc2S9jqyCaluf2xwcnfuB6LndHuEsSzdP4N/gtzoFzSZHRIsaQQiPmidyXgttsnW0YQYDvsh2ROGBPxkMqXjNA/qlCFsnZ8UdlX+kfk0pymlnMWH2JOBfz0sWI+C3OMS1dzPphhPVWHOPC5wdMzIUOzFFHb1lwB2ARF+ZOPt0gshWBPLe/wCRZlu6CIkSei/cE0fD4g2ZbVWceyxH5WPwGvzXrrSTJaDnG7oBoGS3qaCULggCPsv1W5IAd8tzLllJwvpx1WthMIfyg9OVotHy1WVQ4V37wsfgNfkuSZLQcW8Q4lruU/RVbRykrggDXiwwN3uQWnXTa1xMkz2W/on2lndNajpNtAGePw2/MOicBMlqs+8K7GBNbjrFgGe2iX0nUgiAvs+0S2YpgndaFPVRc3SdmVanZlfGjifOiw5PrT/oGvPpG/vDkEH4jZ70Vt86rl5rYimmdP41/s3Uzc4Isup9XNxwvz+0tyNAlONPrtO6hctR+QnluKqNt52O3pxvtClhvxTH0egtmEwbBMlrUxU21OFGtCHKYbavIATv3j90z26kIea4QZRtahfhIuT0anrjH7O3rpjNVHzPIaLG3Lh8Tj5TbRQihjlNyehxTwTLarbZOiiEIcBfbPnGhMtroChXW9JN/VqeYdyPEY4nwwPj6ZCL8C1T+T61JhDqRv8MxZgwlJG2BxzEsrBmgeEzseqt9ti6SNIIA8t6wm901eFDZ66d7M4UkQ56LVgTTvvtKaRqFqoTWymjxGb6LpUzrImYcuzaOIWKJmAptPWpaB2sd+V+yvSB1wB6s7qXgwiUyBpbJdBqFq6MjU18mKCKhRsTyEbx558/wnRmYJzLiV+DYBat6JQ/MX7B1UCxBAKHy3IQrH6W7MhY9MWkUMNAN948/8Mm35/jMDIKlpC3gmBWQtsAjifkE61b36kGQP7DdL7KrVZXnXiYpjYKZxj09Gh7f4kB4yIa/8ZmU1brIIYiYIXaJ3Nbjflv3xBME+DZbSVwIzfIIK89dJkSea18Ihu+XflD9yPztCJnW5Ri5VRntpNh8giVb5ygvBIHu9yaRrchYRO6fFU0CSTPQlDLte6zshx9O3g3D3yJajySd4EDaAsQMsRPaetxk61zty+YTCXRqjf9jO19cOLnyYV+p8QffpcreMXJ7BeRgh77Ds6SIYhGbMBgB2tld1DW0nGL4VxbZfKBbdUHdhol1dl7mOi0MOjttGgWT11lAwU9r1mMSsX0oxwSxgYyWOvKXtiAvBPkV239I7GqZdVqX9FDw2V5+UoYipn2nt/WRMK3LMQlW9poYCZ7WfcrWsdwSBNggMrRYdcLdhjas0+q28lzJOc8bOU7jWLh2AwzEyLxclYm6Z2ZuBEE+YLtTZEVA9tzPdBh5biJ3q5rGD8yRjXbNAPkcm0RuyjTUqf3NQBDge2yHJFaGeDyi4tUD5J3WIXmzs8Y9NDgG3un80OCYIDZCHxqHbJ2iZiEIGmnB8twgzYIkd7vMxiBON59GLJyBQLKMdiM1qOPXyMn2f2f7X5EDdshzkUbhAtED0oZMXCAGiIXgtAW/YXusURdr9NsoufLcgmP20zKy2ErrNSNGRuunMUAshL7zABq61q/RBPkd2yNSn57+X3ZTQZA8t7H3H5p7RwwEt6KP2DrUtAQBIIUsiwt99Kf+tydFntuocVhVRltNWyBTRlumGslopRNkhO1mkRVlLCT3jHYzqyU48WSN+1ZWRou0BZDRyp3Ju9nWnaYnCHA3216JlQWy0gKy557dJSaNQn0nKNL1VrhnwTLavbbOUKsQBBApzzVpFHqsPFdIGoW6AfeG7cMwrcv3TC0io80LQZ5me07kU3WkYqSlhYvkpFGoz8C8bO7RyGjlpi14ztaVliMIIFOeizQKbpI+WdsDGfLcWvcmsaK53b4gdUW3lENZXjxrgrzNdq/IAftohbzzOql4eV/zjUUcu96K7w33KFhGi7rxVisTBEBSxWPiiqYqz71mGfmDQuS5tSIHstHyPZnd7+XKaI+RgKSxEggySWmKaXkVaSwi5xSbRmGiSdZpxVZGy/eEexMso73R1o2WJwiwk+11kQNZrNO6oo+Cc7vz39Wy07q4l+CKfnNvQu/ndVsnSAkifcCOAXq7R8W1y9JdRvI87QvfnTRtgdPeujLavBLkv9meEPnUHS2Tf1EPFT67lOKRnE77munrsrkH/+IeydPXqAO/VoLMDMhz5T2irTzXpFHoKeRPnluV0XYX0mlduTLamIRJtKUR5CDbbSIrGPfX/eUdVFyTQ3luku6OaNIW/HmH5LQFt9k6oAQ5Ab7PNiyxkmGndUhRvTNyJM9F1wrZaM9IZbQmG63MocewxIejRIKg+DaKbEXGI3KWBtT2hUFKyonUZeEfB3xkX4vsM3wXvIx/IwmMqCu0WH/B9qLIpzG6Wp/rpWBFj/x1WnaCAb4G7LPgad0XbZmTEmTukDnti0yzgZvKcwNPtDzXyGjZR5ONFincVEbbVAR5je0hkU/lkTL5F3TZzQ2EvjysJr1hH/0LuiVPTz9ky1oJsgB8iwQsN5hplISns5Hn9hXl9eurMlr2zUzrVsQuk5m0ZUxKkIXhKNsWkQN2yHNPhzx3WbqQMRZGYCOjXWZ8FDzjtsWWsRJkEfgh2zvyOvhWnovsucu75GTPtdlo4RN8i+W+s3nHli0pQRaPIXEeVeW53V46YJciz2Uf4IvxiX0juW/9h/JQ8fJCkGfZnpE5YK9QsHIJBZcIkOdW141d3Gt8EiyjfcaWqRKk6Z84kOc6duODjmzluUZGyz4g6Q18UhltaxHkXbbtIgfsRyvknQt5bobZc6dltP3Gl0SudmW7LUslSJ1mPUbFeWVUepDnDpB3SgazRtW0BXxt+ABfhE7rypyVbCKCTLF9U2QrgjQKg3b7zskGv3eI0+XsuDZ8EJy2YJMtQyVIHfEztldFDtghz728j4LzGphGoZq2gK9ZMDuwiH3ngTJ7OG+VLY8EAeTKc9ts9lwk42zEOi2st+JrYZIA1xYso12Xx4qWV4K8xPZzka3ISCrPDVY1YJ1WtfVYZWW0ctdbPW7LTAnSQHyDJCoykEYhTNdpuUsK6YDZqQ85cG5cw6y3CsWmLYBXG/NayfJMkI8oVR/KG7AfC8k7u4MKVw2kM1r1eB2RpDNXuAauJVhGe6stKyVIBrid7YA4r6o5N5BG4cxOI3mtaeWtymj53LiG4FwmKJs78lzB8k4QVIsN4ryqynN7AzP1ShXIc2tYg3GuSpJO6/aKltHK3KWmhQgCPMm2R+SAfTSkANlzV9Rw2rc6MDcyWtHZaPfYsiElSPaQOYVYiSnxiIprB8kpeGn+v8U2mZD8FjxzTpybKjqtqwQ5Od5g2yGyq4Xsued3UeHSvsW3IlUZLZ8L5xSctmCHLRMliCBgN/AJcV7F6SpbjBe8gUWkUaimLeBzmOUsU2JltOMkcbd+JQiNkYB8ErNVbPe0Nmq72i4kXMiwNUnfe+AcOJfgfCWbbVkoQQTiR2xvivPKynODNX0ULF9AGoVq2gL+Lc4hWEaL2N/XTBWq2Qgic3BYled2+ekeVfOV51az0WKNF59DsIx2XbNVpmYkyPNsuyWSBBJYf+USKsxHnlvNRsu/8WXLaHfb2CtBcoD1Ir2CPJf/wxSt2xmkupGT9c6QtoCPNdO66FfJldGub8aK1KwEeY9tm8gB+2hI3jmdVLii/+RbBdktfHAsfpPIfSm4zcZcCZIjfJftiMQBO1IQQBrrn3qCRYZ20SOOMTLacbHrrRDjW5q1EjUzQbiTTzeIbEUgz+232XNne59RfX+CbLT9omW0iHFFCZJPPMr2W5EDdshzL1tKwfkzrNOqrrfi73CMYBntKzbGpATJL64X6RXWZRVtxlnP+VgaBZO2wEu/wzGatkAJUk+8zLZLZCuCdVoXciux+rhVuXYVMD7Dd7Hc9Va7bGyVIE0Amf3kaXnuIHm9qTwXhr/xmWAZbUXk+E4JsmAcZtsqcsAOee6Z7VS08lwY/sZngmW0W21MlSBNhLvY9onzCqtIxipUuKqf3L6iMfyNz4RO6+6zsWwJ+NRawNvep8S1IhMxucie+8VT0o+6PIqPiB17rG+lCtNqBPkl2wts14gbsCONwqVLzT8Fr7d6wcawZeBS60Hm1GSSTu+a6d5EY6cEyQ5/YLtf4oCd4iQ1ma3H/TZ2SpAWwLfZSqSYK0o2ZqQEaQ1AN32T1vs54yYbMyVIC+GBVuwyLLBL+kCr3rzb4oV/vdZ/jZESZHb8iqS9F5GFp2yMlCAtjCENgcZGCTI79rPdqWH4FO60sVGCKOh7bIc0DNM4ZGNCShAFEFKOsyDVARttTJQgGoJpPMb2Gw2DicFjGgYlyExYpyHQGChBZsfv2B5p4ft/xMZAoQSZFZso3TKo1VC2965QgpwQI2w3t+B932zvXaEEOSnuZtvbQve7196zQgkyZ6zXe1UoQWbH02zPtcB9PmfvVaEEmTeG9B6VIIrZ8RbbvU18f/fae1QoQRYMJKU81oT3dYwkJj1VguQOk9REaY2Pw4323hRKkEVjJ9vrTXQ/r9t7UihBaobr9V6UIIrZ8Wu2J5rgPp6w96JQgtQcG2jmhGl5QWzvQaEEqQsOst2WY/9vs/egUILUtZIN59Dv4ZyTWwmSEyDnUx7luRtJar4qJUjT4RdsL+bI3xetzwolSMOwTn1Vgihmx2tsD+XAz4esrwolSMPxLZK9XGPS+qhQgmSCo2xbBPu3xfqoUIJkhh+yvSPQr3esbwolSOYYUp+UIIrZ8SzbM4L8ecb6pFCC6BNbWw8lSB7wLtt2AX5st74olCDikPWskfRZNSVIi2OKst2+c5P1QaEEEYuH2V7N4Lqv2msrlCDisa5FrqkEUSwIL7E93sDrPW6vqVCC5AaN0l/kVZ+iBGlxfMR2awOuc6u9lkIJkjvcwXagjuc/YK+hUILkEgnVdxeRDfYaCiVIbvEk2546nHePPbdCCZJ7rMvJORVKkEzwBtuOGp5vhz2nQgnSNMBu6uM1OM84Nedu80qQFscY1SYfx2Z7LoUSpOlwH9ubi/j9m/YcCiWIDth1YK4EaUU8z7Z7Ab/bbX+rUII0PdY36DcKJUgu8R7btnkcv83+RqEEaRncwnZkDscdsccqlCAthQrbDXM47gZ7rEIJ0nJ4lO2VE3z/ij1GoQRpWaxb4HcKJUhL4GW2XTN8vst+p1CCtDw+Oc6Y6/hEoQRpCRxm23rcv7fazxRKEIXFXZRuwBDZvxUC4GsIREHflguDkyQqaVYotIulUChBFAoliEKhBFEolCAKhRJEoVCCKBRKEIVCCaJQKJQgCoUSRKFQgigUShCFIhP8vwADACog5YM65zugAAAAAElFTkSuQmCC"
  return {
    code:1,
    img:imgsss
  }
})
//用户信息修改
Mock.mock(RegExp('http://localhost:8080/users/userInfoUpdate'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
 let imgssss = JSON.parse(msg.body).img
  return {
    code:1,
    img:img
  }
})
// 修改密码
Mock.mock('http://localhost:8080/users/changePass', 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  return{
  }
})
// 获取地址列表
Mock.mock(RegExp('http://localhost:8080/users/addressList'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
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
// 修改收货地址
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
// 添加收货地址
Mock.mock(RegExp('http://localhost:8080/users/addAddress'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  let arr = JSON.parse(msg.body)
  arr.addressId = randomNum
  return {
    msg: 'success'
  }
})
// 删除收货地址
Mock.mock(RegExp('http://localhost:8080/users/delAddress'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
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
  console.log(JSON.parse(msg.body))
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
  console.log(JSON.parse(msg.body))
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
  console.log(JSON.parse(msg.body))
  
  OBJ = JSON.parse(msg.body)
  console.log(OBJ)
  return {
    msg: 'success',
  }
})
// 删除商品管理页面的商品列表
Mock.mock(RegExp('http://localhost:8080/users/goodsPut'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // console.log(msg)
  let arr = JSON.parse(msg.body)
  arr.addressId = randomNum
  return {
    success: true
  }
})

// 商品列表
Mock.mock(RegExp('http://localhost:8080/shop/navList' + '.*'), 'get', function (msg) {
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
Mock.mock(RegExp('http://localhost:8080/shop/goodsDetail' + '.*'), 'get', function (msg) {
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
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
  return {
    success: true,
    code: 1,
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
// 医生筛选
Mock.mock(RegExp('http://localhost:8080/hospital/docSelect'), 'post', function (msg) {
  console.log(JSON.parse(msg.body))
  // let option = msg.url.split('?')[1]
  // console.log(msg, option)
  return {
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