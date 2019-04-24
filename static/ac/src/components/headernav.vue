<template>
  <div class="headernav-wrap">
    <div class="nav-wrap">
      <el-menu :default-active="this.$router.path" class="el-menu-demo" mode="horizontal" router style="padding-left:1rem">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/hunjie">宠物婚介</el-menu-item>
        <el-menu-item index="/shop">宠物商店</el-menu-item>
        <el-submenu index="/hospital">
          <template slot="title">宠物医院</template>
            <el-menu-item index="/hs_inquiry">宠物问诊</el-menu-item>
            <el-menu-item index="/hs_death">宠物殡葬</el-menu-item>
        </el-submenu>
        <el-menu-item index="/baike">宠物百科</el-menu-item>
        <el-menu-item index="/login" style="float:right;">登录</el-menu-item>
      </el-menu>
      
    </div>
  </div>
</template>
<script>
export default {
  name:'headernav',
  data(){
    return{
      
    }
  },
  methods: {

  }
}
</script>
<style scoped>

</style>
