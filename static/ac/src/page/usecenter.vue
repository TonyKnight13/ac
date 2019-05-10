<template>
  <div class="wrapper">
    <headernav></headernav>

    <div class="mian-content-wrap">
      <div class="user-center-wrap">
        <div class="content-left-wrap">
          <el-menu>
            
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
  .mian-content-wrap{
    background: rgb(246, 243, 243)
  }
</style>


