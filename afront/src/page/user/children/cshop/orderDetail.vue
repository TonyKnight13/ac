<template>
  <div>
    <y-shelf :title="title">
      <div slot="content">
        <el-table :data="goodsList" style="width: 100%"
        :header-cell-style="{background:'#F3F4F7',color:'#555'}">
          <el-table-column prop="goodImg" label="商品图片" width="120" align="center">
            <template slot-scope="scope">            
              <el-image :src="scope.row.goodImg" fit="contain" @click="goodsDetails(scope.row.goodId)"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="goodName" label="商品名称" width="" align="center">
          </el-table-column>
          <el-table-column prop="goodPrice" label="商品单价(￥)" width="" align="center">
          </el-table-column>
          <el-table-column prop="goodNum" label="数量" width="" align="center">
          </el-table-column>
          <el-table-column label="小计(￥)" align="center" >
              <template slot-scope="scope">
                  <span>{{scope.row.goodPrice*scope.row.goodNum}}</span>
              </template>
          </el-table-column>
        </el-table>

        <!-- 合计 -->
        <div style="float:right;font-size:0.36rem;padding:10px;">
            <span style="">应付总额：<span style="color:#F56C6C;font-weight:bold">￥{{checkPrice}}</span></span>
        </div>

        <el-table :data="address" style="width: 100%" 
        :header-cell-style="{background:'#F3F4F7',color:'#555'}">
          <el-table-column prop="realName" label="姓名" width="" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="电话号码" width="" align="center">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="" align="center">
          </el-table-column>
        </el-table>
      </div>
    </y-shelf>
  </div>
</template>
<script>
import { orderList, delOrder } from '@/api/index'
import { getStore, setStore } from '@/utils/storage'
import YShelf from '@/components/shelf';
export default {
  components:{
    YShelf
  },
  data() {
    return {
      orderId:null,
      goodsList:[],
      address:[]

    }
  },
  computed:{
    title(){
      return "订单号："+this.orderId
    },
    checkPrice() {
      var totalPrice = 0
      for(let i=0;i<this.goodsList.length;i++){
          totalPrice += this.goodsList[i].goodPrice * this.goodsList[i].goodNum
      }
      return totalPrice
    },
  },
  created(){
    this.orderId = this.$route.query.orderId
    let obj = JSON.parse(getStore('orderDetail'))
    let item = {
      address : obj.address,
      realName : obj.realName,
      phone : obj.phone
    }
    this.address.push(item)
    this.goodsList = obj.goodsList
    console.log(this.address)
  }
}
</script>
<style scoped>

</style>
