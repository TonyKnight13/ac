<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>
    <div class="main-content-wrap">
      <img src="../../assets/images/gone/pexels-photo-1930851.jpg" alt="">
      <el-row style="padding: 0.2rem 1rem; background:#ebebeb;">
        <el-col :span="6"><img src="../../assets/images/gone/new1.jpg" alt="">宠物公墓</el-col>
        <el-col :span="6"><img src="../../assets/images/gone/new1.jpg" alt="">宠物墓地</el-col>
        <el-col :span="6"><img src="../../assets/images/gone/new1.jpg" alt="">宠物安乐死</el-col>
        <el-col :span="6"><img src="../../assets/images/gone/new1.jpg" alt="">宠物火化</el-col>
      </el-row>
    </div>
    <!-- 底部 -->
    <foot></foot>
  </div>
</template>
<script>
import headernav from "../../components/headernav.vue";
import foot from "../../components/foot"
export default {
  name:"hs_death",
  components:{
      headernav,foot 
  },
  data(){
    return{
      
    }
  },

}
</script>
<style scoped>
.main-content-wrap{
  width: 100%;
  background: #ffffff
}
.main-content-wrap > img{
  width: 100%;
}
.el-col{
  border: 1px solid #ffffff;
  background:#ffffff;
  height:3rem;
  width:3.6rem;
  padding:0;
  margin:0 0.1rem;
}
.el-col img{
  width:100%;
  height:85%;
}
</style>
