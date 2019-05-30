<template>
  <div>
     <y-shelf title="我的订单" v-loading="loading">
      <div slot="content">
            <el-table :data="orderList" style="width: 100%;;" height="10rem" :header-cell-style="{background:'#F3F4F7',color:'#555'}">
              <el-table-column align="center" type="expand">
                <template slot-scope="props"><!-- 通过porps.row获取orderList中每一行的数据-->
                  <el-table :data="props.row.goodsList" align="center" stripe :header-cell-style="{background:'#F3F4F7',color:'#555'}">
                    <el-table-column label="商品图片" align="center" width="100">
                      <template  slot-scope="scope"><!-- scope指向props.row.goodsList -->
                        <el-image :src="scope.row.goodImg" fit="contain" @click="goodsDetails(scope.row.productId)"></el-image>
                      </template>
                    </el-table-column>
                    <el-table-column  prop="goodName" label="商品名字"  align="center">
                    </el-table-column>
                    <el-table-column prop="goodPrice" label="商品单价" width="180" align="center">
                        <template slot-scope="scope">
                            <span>￥{{scope.row.goodPrice}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodNum" label="商品数量" width="200" align="center" >
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column header-align="center" align="center" prop="orderId" label="订单编号" width="200">
              </el-table-column>
              <el-table-column header-align="center" align="center" prop="orderTotal" label="应付金额" width="150">
              </el-table-column>              
              
              <el-table-column header-align="center" align="center" label="订单操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="_delOrder(scope.row.orderId)">删除订单</el-button>
                  <el-button type="primary" size="mini" @click="orderPayment(scope.row.orderId)">现在付款</el-button>
                  <el-button size="mini"  @click="orderDetail(scope.row.orderId)">查看详情</el-button>
                </template>
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
export default{
  components:{
    YShelf
  },
  data() {
    return {
      orderList:[],
      userId: '',
      loading:true
    }
  },
  created () {
    this.userId = getStore('user')
    console.log(this.userId, '')
    this._orderList()
    
  },
  methods: {
    //获取订单列表
    _orderList () {
      let options = {
          userId: this.userId,
          // size: this.pageSize,
          // page: this.currentPage
      }
      orderList({params:{options}}).then(res => {
        if(res.data.data){
          this.orderList = res.data.data
        }
        console.log(this.orderList, '')
        this.loading = false
      })
    },
    //点击图片跳转到商品详情页面
    goodsDetails (goodId) {
      this.$router.push({path:'/goodsDetails', query:{goodId}})
    },
    //跳转到订单详情页面
    orderDetail(id){
      // let arr = []
      this.orderList.forEach((item,i) => { //将选中的订单信息存入session中
        if(item.orderId == id){
          // arr.push(item)
          setStore('orderDetail', item)
        }
      });
      
      this.$router.push({
        path: '/orderDetail',
        query: {
          orderId: id
        }
      })
    },
    //删除订单
    _delOrder (orderId) {
      let params = {
        userId:this.userId,
        orderId: orderId
      }
      delOrder(params).then(res => {  //后台删除订单
        if (res.data.msg == "success") {
          this.orderList.splice(i, 1)
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    //跳转到支付页面
    orderPayment (orderId) {
      // 需要拿到订单id
      this.$router.push({
        path: '/orderPay',
        query: {
          'orderId': orderId
        }
      })
    },
  },
}
</script>
<style scoped>

</style>

