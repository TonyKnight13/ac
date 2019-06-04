<template>
  <div class="headernav-wrap">
    <div class="nav-wrap">
      <el-menu :default-active="this.$router.path" class="el-menu-demo" mode="horizontal" router>

        <el-menu-item style="width:1rem"><img src="../assets/images/ac.png" alt="" style="width:100%;margin-top:-3px"> </el-menu-item>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/hunjie">宠物婚介</el-menu-item>
        <el-menu-item index="/shop">宠物商店</el-menu-item>
        <el-submenu index="/hospital">
          <template slot="title">宠物医院</template>
          <el-menu-item index="/hsInquiry">宠物问诊</el-menu-item>
          <el-menu-item index="/hsDeath">宠物殡葬</el-menu-item>
        </el-submenu>
        <el-submenu index="/baike">
          <template slot="title">宠物百科</template>
          <el-menu-item index="/baike">社区分享</el-menu-item>
          <el-menu-item index="/">词条百科</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="/usercenter">关于我们</el-menu-item> -->
        <el-menu-item style="float:right;">
          <i class="el-icon-shopping-cart-2" @click="toCart"></i>
        </el-menu-item> 

        <el-menu-item style="float:right;">
            <i class="el-icon-user-solid" @click="toLogin" v-if="!isLogin"></i>
            <el-dropdown v-if="isLogin">
              <i class="el-icon-user-solid"></i>
              <el-dropdown-menu slot="dropdown" split-button><!-- split-button 为 true 时，点击左侧按钮的回调 -->
                <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="loginout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item>     

      </el-menu>
      
    </div>
  </div>
</template>
<script>
import { loginOut } from '@/api/index.js';
export default {
  name:'headernav',
  data(){
    return{
      
    }
  },
  computed: {
    isLogin(){
      if(sessionStorage.getItem("userId")){
        return true
      }
    }
  },
  methods: {
    toLogin(){
      this.$router.push({path:'/login'})
    },
    toUser(){
      this.$router.push({path:'/userbase'})
    },
    loginout(){
      this.$store.dispatch("logout");
      loginOut({userId: sessionStorage.getItem("userId")}).then(res => {
        if(res.data.code == 1){
          this.$router.replace({path:'/'})
        }
      })
    },

    toCart(){
      this.$router.push({path:'/cart'})
    }
  }
}
</script>
<style scoped>
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>