<template>
  <div class="wrapper">
    <headernav style="width:100%"></headernav>

    <div class="content">
      <div class="img-content">
        <el-image :src="good.goodImg" fit="contain"></el-image>
      </div>
      <div class="text-content">
        <p style="font-size:0.4rem;font-weight:bold">{{good.goodName}}</p>
        <p style="margin-top:0.2rem;">
          <span style="margin-right:0.3rem;font-size:0.16rem">{{good.descript}}</span>
          <span style="color:rgba(245,108,108,1);font-weight:bold;font-size:0.24rem">¥{{good.goodPrice.split(".")[0]}}.{{good.goodPrice.split(".")[1]}}</span>
        </p>
        <el-divider></el-divider>
        <p>
          <span style="margin-right:0.5rem;font-size:0.32rem;color:#535353">数量</span>
          <span><el-input-number v-model="num" :step="1" size="small"></el-input-number></span>
        </p>
        <el-divider></el-divider>
        <el-button
        @click="addCart">加入购物车</el-button>
        <el-button
        style="background:#ffffff"
        @click="">现在购买</el-button>
      </div>
    </div>

    <foot></foot>
  </div>
</template>
<script>
import headernav from "@/components/headernav";
// import {}
import foot from "@/components/foot"
export default {
  components:{
    headernav,
    foot
  },
  data() {
    return {
      good:{
        goodImg:require("@/assets/images/shop/1.jpg"),
        descript:"这是适合小型犬的食物，营养丰富...",
        goodName:'宠物狗食品',
        goodPrice: '100.00',
        goodId:'10000'
      },
      num:1
      
    }
  },
}
</script>
<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  display:flex;
  justify-content:center;
  flex-direction: column;
  align-items: center;
}
.content{
  width: 80%;

  border: 1px #ededed solid;
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.5rem;
}
.img-content{
  width: 5rem;
  height: 5rem;
  float: left;
  left: 1rem;
}
.text-content{
  width: 8rem;
  float: right;
  right: 1rem;
}
</style>


