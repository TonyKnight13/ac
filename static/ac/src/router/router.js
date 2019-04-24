import Vue from 'vue';
import Router from 'vue-router';
import home from '../page/home.vue';
import login from '../page/login.vue';
import register from '../page/register.vue';
import hs_death from '../page/hospital/hs-death.vue';
import hs_inquiry from '../page/hospital/hs-inquiry.vue';
import shop from '../page/shop/shop.vue';
Vue.use(Router);

export default new Router({
  routes:[
    {
      path:'/',
      name:'home',
      component:home,
      // children:[
      //   {
      //     path:'/hs_death',
      //     name:'hs_death',
      //     component:resolve=> require(["../page/hospital/hs-death.vue"],resolve),
      //   },
      //   {
      //     path:'/hs_inquiry',
      //     name:'hs_inquiry',
      //     component:resolve=> require(["../page/hospital/hs-inquiry.vue"],resolve),
      //   },
      // ]
    },
    {
      path:'/login',
      name:'login',
      component:login,
    },
    {
      path:'/register',
      name:'register',
      component:register,
    },
    {
      path:'/hs_death',
      name:'hs_death',
      component:hs_death,
    },
    {
      path:'/hs_inquiry',
      name:'hs_inquiry',
      component:hs_inquiry,
    },
    {
      path:'/shop',
      name:'shop',
      component:shop,
    },
  ]
})