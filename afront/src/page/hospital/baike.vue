<template>
  <div class="swipper">
    <!-- 头部 -->
    <headernav></headernav>

    <div class="main-content">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="background:">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>        </el-tabs>
    </div>

    <!-- 底部 -->
    <foot></foot>
  </div>
</template>
<script>
import headernav from "@/components/headernav.vue";
import foot from "@/components/foot"
import {baikeData} from "@/api/index"
export default {
  components:{
      headernav,foot 
  },
  data() {
    return {
      
    }
  },
  created() {
    this._baike()
  },
  methods: {
    _baike(){
      baike().then(res => {
        if(res.data.code == 1){
          
        }
      })
    }
  },
}
</script>
<style scoped>

</style>
