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
                <el-menu-item index="/myAddress">我的地址</el-menu-item>
                <el-menu-item index="/goodsManage">商品管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2" style="overflow:hidden">
                <span slot="title">交易管理</span>
                <el-menu-item index="/order">商城订单</el-menu-item>
                <!-- <el-menu-item index="1-2">我的收藏</el-menu-item> -->
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
  export default {
    name:"home",
    components:{
        headernav,foot 
    },
    data(){
      return{
        openeds: ['1','2','3'],
      }
    },
    watch:{
      
    },
    methods: {
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
    height: 12rem;
    background: #ffffff;
  }
</style>


