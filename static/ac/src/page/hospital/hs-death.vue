<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>
    <div class="main-content-wrap">
      <img src="../../assets/images/gone/pexels-photo-1930851.jpg" alt="">
      <el-row :gutter="20" style="padding: 0.2rem 1rem; background:#ebebeb;">
        <el-col :span="6"><div class="grid-content bg-purple"><img src="../../assets/images/gone/new1.jpg" alt="">宠物公墓</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><img src="../../assets/images/gone/new1.jpg" alt="">宠物墓地</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><img src="../../assets/images/gone/new1.jpg" alt="">宠物安乐死</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><img src="../../assets/images/gone/new1.jpg" alt="">宠物火化</div></el-col>
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
  background:#ebebeb;
  height:2rem;
  width:3.85rem;
}
.grid-content{
  width:100%;
  height:85%;
}
.el-col img{
  width:100%;
  height: 100%;
}
</style>
