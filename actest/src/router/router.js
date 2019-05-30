import Vue from 'vue';
import Router from 'vue-router';
import home from '../page/home.vue';
import login from '../page/login.vue';
import regist from '../page/regist.vue';
import hs_death from '../page/hospital/children/hs-death.vue';
import hs_inquiry from '../page/hospital/children/hs-inquiry.vue';
import shop from '../page/shop/shop.vue';
import usercenter from '../page/user/usecenter.vue';
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
      path:'/hs_death',
      name:'hs_death',
      component:hs_death,
      // meta: {
      //   isLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
    },
    {
      path:'/hs_inquiry',
      name:'hs_inquiry',
      component:hs_inquiry,
      // meta: {
      //   isLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
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
          component:resolve => require(['../page/user/children/userbase.vue'], resolve)
        },
        {
          path:'/changepwd',
          name:'changepwd',
          component:resolve => require(['../page/user/children/changepwd.vue'], resolve)
        },
        {
          path:'/myAddress',
          name:'myAddress',
          component:resolve => require(['../page/user/children/myAddress.vue'], resolve)
        },
        {
          path: '/goodsManage',
          name: 'goodsManage',
          component: resolve => require(['../page/user/children/goodsManage.vue'], resolve),
          meta: {
            status: true
          }
        },
        {
          path:'/order',
          name:'oeder',
          component:resolve => require(['../page/user/children/order.vue'], resolve)
        },
        {
          path: '/orderDetail',
          name: 'orderDetail',
          component:resolve => require(['../page/user/children/orderDetail.vue'], resolve)
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
  let user = getStore('user')
  if (to.meta.isLogin) { // 判断该路由是否需要登录权限
    if (user) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/login'
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
  let statusKey = getStore('statusKey') 
  if (to.meta.status) { // 判断该路由是否需要用户身份标签
    if (statusKey === '1') {
      next()
    } else {
      alert('你没有权限进入')
    }
  } else {
    next()
  }
})
export default router