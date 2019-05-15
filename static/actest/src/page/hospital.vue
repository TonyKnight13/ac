<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>

    <!-- 底部 -->
    <foot></foot>
  </div>
</template>
<script>
import headernav from "../components/headernav.vue";
import foot from "../components/foot"
export default {
  name:"hospital",
  components:{
      headernav,foot 
  },
  data(){
    return{
      activekey: 'hospital',
    }
  },

}
</script>