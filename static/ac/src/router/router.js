import Vue from 'vue';
import Router from 'vue-router';
import home from '../page/home.vue';
import login from '../page/login.vue';
import regist from '../page/regist.vue';
import hs_death from '../page/hospital/hs-death.vue';
import hs_inquiry from '../page/hospital/hs-inquiry.vue';
import shop from '../page/shop/shop.vue';
import usercenter from '../page/usecenter.vue';
import store from '../store/index'

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
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
    },
    {
      path:'/hs_inquiry',
      name:'hs_inquiry',
      component:hs_inquiry,
      // meta: {
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
    },
    {
      path:'/shop',
      name:'shop',
      component:shop,
      // meta: {
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
    },
    {
      path:'/usercenter',
      name:'usercenter',
      component:usercenter,
      children:[
        {
          path:'/userbase',
          name:'userbase',
          component:resolve => require(['../page/user_components/userbase.vue'], resolve)
        },
        {
          path:'/changepwd',
          name:'changepwd'
        }
      ]
      // meta: {
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
    }
  ]
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
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
})
export default router