<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>

    <!-- 主内容 -->
    <div class="main-content-wrap">
      <img src="../assets/images/timg.jpg" alt="">
    </div>

    <!-- 底部 -->
    <foot></foot>
  </div>
</template>
<script>
import headernav from "../components/headernav.vue";
import foot from "../components/foot"
export default {
  name:"home",
  components:{
      headernav,foot 
  },
  data(){
    return{
    }
  },
  watch:{
    
  },
  methods: {
  },
}
</script>
<style scoped>
.main-content-wrap{
  display: block;
}

</style>
