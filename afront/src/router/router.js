import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home.vue'
import login from '../page/login.vue'
import regist from '../page/regist.vue'
import hsDeath from '../page/hospital/hsDeath.vue'
import hsInquiry from '../page/hospital/hsInquiry.vue'
import shop from '../page/shop/shop.vue'
import usercenter from '../page/user/usecenter.vue'
import chart from '../page/hospital/chart.vue'
import store from '../store/index'
import {getStore} from '../utils/storage'

Vue.use(Router);

const router = new Router({
  routes:[
    {
      path:'/',
      name:'home',
      component:home,
    },
    {
      path:'/hunjie',
      name:'hunjie',
      component:resolve => require(['../page/hunjie.vue'], resolve),
    },
    {
      path:'/login',
      name:'login',
      component:login,
      hidden:true
    },
    {
      path:'/regist',
      name:'regist',
      component:regist,
    },
    {
      path:'/hsDeath',
      name:'hsDeath',
      component:hsDeath,
      meta: {
        isLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path:'/hsInquiry',
      name:'hsInquiry',
      component:hsInquiry,
      meta: {
        isLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/chart',  //聊天室
      name: 'chart',
      component: chart
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      children: [],
      meta: {
        isLogin: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path:'/goodsDetails',
      name:'goodsDetails',
      component:resolve => require(['../page/shop/children/goodsDetails.vue'], resolve)
    },
    {
      path:'/payCheck',
      name:'payCheck',
      component:resolve => require(['../page/shop/payCheck.vue'], resolve)
    },
    {
      path: '/orderPay',
      name: 'orderPay',
      component:resolve => require(['../page/shop/orderPay.vue'], resolve)
    },
    {
      path:'/cart',
      name:'cart',
      component:resolve => require(['../page/shop/children/cart.vue'], resolve)
    },
    {
      path:'/usercenter',
      name:'usercenter',  
      component:usercenter,
      children:[
        {
          path:'/userbase',
          name:'userbase',
          component:resolve => require(['../page/user/children/cbase/userbase.vue'], resolve)
        },
        {
          path:'/changepwd',
          name:'changepwd',
          component:resolve => require(['../page/user/children/cbase/changepwd.vue'], resolve)
        },
        {
          path:'/myAddress',
          name:'myAddress',
          component:resolve => require(['../page/user/children/cshop/myAddress.vue'], resolve)
        },
        {
          path: '/goodsManage',
          name: 'goodsManage',
          component: resolve => require(['../page/user/children/cshop/goodsManage.vue'], resolve),
          meta: {
            status: true
          }
        },
        {
          path:'/order',
          name:'oeder',
          component:resolve => require(['../page/user/children/cshop/order.vue'], resolve)
        },
        {
          path: '/orderDetail',
          name: 'orderDetail',
          component:resolve => require(['../page/user/children/cshop/orderDetail.vue'], resolve)
        },
        {
          path: '/deathRegist',
          name: 'deathRegist',
          component:resolve => require(['../page/user/children/chospital/deathRegist.vue'], resolve)
        },
        {
          path: '/docRegister',
          name: 'docRegister',
          component:resolve => require(['../page/user/children/chospital/docRegister.vue'], resolve)
        },{
          path: '/deathRegist',
          name: 'hosRegister',
          component:resolve => require(['../page/user/children/chospital/hosRegister.vue'], resolve)
        },
      ],
      meta: {
        isLogin: true // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  let user = getStore('userId')
  if (to.meta.isLogin) { // 判断该路由是否需要登录权限
    if (user) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login'
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
  let identity = getStore('identity') 
  if (to.meta.status) { // 判断该路由是否需要用户身份标签
    if (identity === '1') {
      next()
    } else {
      alert('你没有权限进入')
      next({
        path: '/userbase'
      })
    }
  } else {
    next()
  }
})
export default router