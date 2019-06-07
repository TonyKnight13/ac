<template>
  <div class="wrapper">
    <headernav style="width:100%"></headernav>

    <div class="content">
      <div class="img-content">
        <el-image :src="imgUrl" fit="contain"></el-image>
      </div>
      <div class="text-content">
        <p style="font-size:0.4rem;font-weight:bold">{{name}}</p>
        <p style="margin-top:0.2rem;">
          <span style="margin-right:0.3rem;font-size:0.16rem">{{intro}}</span>
          <span style="color:rgba(245,108,108,1);font-weight:bold;font-size:0.24rem">¥{{price.split(".")[0]}}.{{price.split(".")[1]}}</span>
        </p>
        <el-divider></el-divider>
        <p>
          <span style="margin-right:0.5rem;font-size:0.32rem;color:#535353">数量</span>
          <span><el-input-number v-model="num" :step="1" size="small"></el-input-number></span>
        </p>
        <el-divider></el-divider>
        <el-button
        @click="_addCart(goodId,imgUrl, name, price)">加入购物车</el-button>
        <el-button
        style="background:#ffffff"
        @click="payCheck(goodId,num)">现在购买</el-button>
      </div>
    </div>

    <foot></foot>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import headernav from "@/components/headernav";
import {productDet, addCart} from "@/api/index"
import foot from "@/components/foot"
import { getStore } from '@/utils/storage'
export default {
  components:{
    headernav,
    foot
  },
  data() {
    return {
      // good:{
      imgUrl:'',
      intro:'',
      name:'',
      price: '',
      goodId:'',
      // },
      num:1,
      userId:''
    }
  },
  computed:{
    
  },
  methods: {
    ...mapMutations(['ADD_CART']),
    _productDet (goodId) { 
      productDet({goodId:goodId}).then(res => {  
        console.log(res)
        let result = res.data
        this.name = result.name
        this.intro = result.intro || ''
        this.goodId = result.goodId
        this.price = result.price
        this.imgUrl = result.imgUrl
      })
    },
    _addCart(id,img, name,price){
      if(this.userId){
        addCart({userId: this.userId, goodId: id, goodNum: this.num}).then(res => {
          // 并不重新请求数据
          this.ADD_CART({
            goodId: id,
            price: price,
            imgUrl: name,
            imgUrl: img,
            goodNum: this.num
          })
        })
      }
    },
    payCheck(goodId,goodNum){
      this.$router.push({path: '/payCheck', query: {goodId, goodNum}})
    }
  },
  created() {
    let id=this.$route.query.goodId
    this._productDet(id)
    this.userId = getStore('user')
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


