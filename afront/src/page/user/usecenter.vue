<template>
  <div class="wrapper">
    <headernav></headernav>

    <div class="mian-content-wrap">
      <div class="user-center-wrap">
        <div class="content-left-wrap">
          <el-menu class="menu-style" :default-openeds="openeds" background-color="#f6f3f3" router>
            <el-submenu index="1" style="overflow:hidden">
                <span slot="title">个人设置</span>
                <el-menu-item index="/userbase">个人资料</el-menu-item>
                <el-menu-item index="/changepwd">密码更改</el-menu-item>
            </el-submenu>
            <el-submenu index="2" style="overflow:hidden">
                <span slot="title">商城管理</span>
                <el-menu-item index="/myAddress">收货地址</el-menu-item>
                <el-menu-item index="/order">商城订单</el-menu-item>
                <el-menu-item index="/goodsManage" v-if="userId">商品管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3" style="overflow:hidden" v-if="userId">
                <span slot="title">医院管理</span>
                <el-menu-item index="/deathRegist">殡葬馆</el-menu-item>
                <el-menu-item index="/docRegister">医生信息</el-menu-item>
                <el-menu-item index="/hosRegister">医院信息</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="3" style="overflow:hidden">
                <span slot="title">收货地址</span>
                <el-menu-item index="/myAddress">我的地址</el-menu-item>
                <el-menu-item index="/addAddress">添加地址</el-menu-item>
            </el-submenu> -->

            
          </el-menu>
        </div>
        <div class="content-right-wrap">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <foot></foot>
  </div>
</template>
<script>
  import headernav from "@/components/headernav.vue";
  import foot from "@/components/foot"
  import {getStore} from "@/utils/storage"
  export default {
    name:"home",
    components:{
        headernav,foot 
    },
    data(){
      return{
        openeds: ['1'],
        userId:null,
      }
    },
    watch:{
      
    },
    methods: {

    },
    created() {
      this.userId=getStore('userId')
    },
  }
</script>
<style scoped>
  .mian-content-wrap{
    background: #f6f3f3;
    width: 100%;
    height: 100%;
  }
  .user-center-wrap{
    width: 100%;
    padding: 0.5rem 0.2rem;
    display: flex;
    align-items: flex-start;
  }
  .content-left-wrap{
    width: 15%;
  }
  .content-left-wrap .el-menu{
    width: 100%;
  }
  .content-left-wrap .menu-style{
    border:none;
    
  }
  .content-right-wrap{
    width: calc(85% - 0.4rem);
    height: 10rem;
    background: #ffffff;
  }
</style>


