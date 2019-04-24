<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>
    <div class="main-content-wrap">
      <img src="../../assets/images/gone/pexels-photo-1930851.jpg" alt="">
      <el-row :gutter="20" style="padding: 0.2rem 1rem; background:#ebebeb;">
        <el-col :span="8" style="padding: 0"><img src="../../assets/images/gone/公墓.jpg" alt="">宠物公墓</el-col>
        <el-col :span="8" style="padding: 0"><img src="../../assets/images/gone/安乐死.jpg" alt="">宠物安乐死</el-col>
        <el-col :span="8" style="padding: 0"><img src="../../assets/images/gone/玑珠.jpg" alt="">宠物玑珠</el-col>
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
.el-row{
    display: flex;
    align-items: center;
    justify-content: center;
}
.el-col{
  border: 1px solid #ebebeb;
  background:#ffffff;
  height:5.5rem;
  width:5rem;
  margin:0 0.3rem;
  font-size: 0.32rem;
  text-align: center;
}
.grid-content{
  width:100%;
  height:85%;
}
.el-col img{
  width:100%;
  height: 88%;
}
</style>
