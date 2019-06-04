<template>
  <div class="swipper">
    <headernav style="width:100%"></headernav>
    <div class="container" style="padding:0.5rem">
      <y-shelf title="收货信息">   <!-- 收货地址 -->
        <div slot="content" style="padding:0.5rem;">
          <el-row :gutter="0">
            <el-col :span="7" v-for="(item,i) in addList" :key="i" 
                    style="padding: 0;margin-right:0.5rem;cursor:pointer;"
                    :class="{checked:addressId === item.addressId}"
                    @click.native="chooseAddress(item.addressId, item.realName, item.phone, item.address)">
              <el-card>
                <div class="text item">
                  <p><span>收货人: </span><span>{{item.realName}}</span></p>
                  <p><span>收货地址:</span> <span>{{item.address}}</span></p>
                  <p><span>手机号码:</span> <span>{{item.phone}}</span></p>
                </div>
             </el-card>
             </el-col>
          </el-row>
        </div>
      </y-shelf>

       <!-- 购物清单 -->
      <y-shelf title="购物清单">
        <div slot="content">
          <!--标题-->
          <div class="cart-table-title">
            <span class="name">商品信息</span>
            <span class="subtotal">小计</span>
            <span class="num">数量</span>
            <span class="price">单价</span>
          </div>
          <ul>
            <li v-for="(item,i) in cartList" :key="i" :data-goodId="item.goodId" style="padding-left:0.5rem;">
              <div class="cart-items" style="width:100%;position:relative;">
                  <!--图片-->
                    <div class="items-msg" @click="goodsDetails(item.goodId)">
                      <el-image :src="item.goodImg" fit="contain" style="width: 100px; height: 100px"></el-image>
                      <span style="margin-left:0.5rem;">{{item.goodName}}</span>
                    </div>
                    <!--价格-->
                    <div class="price rg" style="right:5rem;">¥ {{item.goodPrice}}</div>
                    <!--数量-->
                    <div class="num rg" style="right:2.5rem;">{{item.goodNum}}</div>
                    <!--总价格-->
                    <div class="subtotal rg" style="font-size: 14px">¥ {{item.goodPrice * item.goodNum}}</div>
              </div>
            </li>
          </ul>
          <!-- 合计 -->
          <div class="pay"> 
            <div style="margin-right:0.5rem;font-size:0.32rem;">
              <span>应付总额</span>
              <span style="font-size:0.36rem;color:red;font-weight:bold">￥{{checkPrice}}</span>
            </div>
            <el-button type="primary" :loading="isLoad" @click="_submitOrder">提交订单</el-button>
          </div>
          <!--列表-->
        </div>
      </y-shelf>
    </div>

    
    <foot></foot>
  </div>
</template>
<script>
import { getCartList, addressList, productDet, submitOrder } from '@/api/index'
import YShelf from '@/components/shelf'
import { getStore, setStore } from '@/utils/storage'
import headernav from "@/components/headernav";
import foot from "@/components/foot"

export default {
  components:{
    headernav,
    foot,
    YShelf
  },
  data() {
    return {
      isLoad: false,
      cartList:[],
      addList:[],
      goodNum:'',
      goodId:'',
      addressId:null,
      realName:'',
      phone:'',
      address:'',
      userId:'',
      orderTotal: 0,
    }
  },
  computed:{
    // 选中的总价格
    checkPrice(){
      let totalPrice = 0
      this.cartList && this.cartList.forEach(item => {
          totalPrice += (item.goodNum * item.goodPrice)
      })
      this.orderTotal = totalPrice
      return totalPrice
      
    }
  },
  methods: {
    message (m) {  //错误提醒
      this.$message.error({
        message: m
      })
    },
    // 付款
    payment (orderId) {
      // 需要拿到订单id
      this.$router.push({
        path: '/orderPay',
        query: {
          'orderId': orderId
        }
      })
    },
    // _getCartList () { //获取购物车列表
    //   getCartList({userId: this.userId}).then(res => {
    //     this.cartList = res.result
    //   })
    // },
    _productDet (goodId,num) {
      productDet({goodId:goodId}).then(res => {
        if(res.data.code ==1){
          this.cartList.push(goodId)
        }
      })
    },
    _addressList () {//获取地址列表
      addressList({userId: this.userId}).then(res => {
        // console.log(res.data, '')
        let data = res.data.data
        if (data) {
          this.addList=data
          this.addressId = data[0].addressId
          this.realName = data[0].realName
          this.phone = data[0].phone
          this.address = data[0].address
          console.log(this.addressId,  this.realName,this.phone,this.address)
        } else {
          this.addList = []
        }
      })
    },
    // 选择地址
    chooseAddress (addressId, realName, phone, address) {
      this.addressId = addressId
      this.realName = realName
      this.phone = phone
      this.address = address
    },
    goodsDetails (goodId) {
      this.$router.push({path:'/goodsDetails', query:{goodId}})
    },
    // 提交订单后跳转付款页面
    _submitOrder () {
      this.isLoad = true
      var array = []
      if (this.addressId===null) {
        this.message('请选择收货地址')
        this.isLoad = false
        return
      }
      if (this.cartList.length === 0) {
        this.message('非法操作')
        this.isLoad = false
        return
      }
      for (var i = 0; i < this.cartList.length; i++) {
        array.push(this.cartList[i].goodId)
      }
      let params = {
        userId: this.userId,
        phone: this.phone,
        realName: this.realName,
        address: this.address,
        goodsList: array,
        orderTotal: this.orderTotal
      }
      setStore('order', params)
      // console.log(JSON.parse(getStore('order')))
      submitOrder(params).then(res => {
        console.log(res, '')
        if (res.data.msg == 'success') {
          this.payment(res.data.orderId)
          //生成订单后更新购物车
          let newCartList=JSON.parse(getStore())
          let delCarList=this.cartList
          delCartList.forEach((item,i)=>{
            newCartList.forEach((option,j)=>{
              if(option.goodId==item.good){
                newCartList.splice(j, 1)
              }
            })
          })
          setStore('buyCart',newCartList)
        } else {
          this.message(res.data.msg)
          this.isLoad = false
        }
      })
    },
    // 付款
    payment (orderId) {
      // 需要拿到订单id
      this.$router.push({
        path: '/orderPay',
        query: {
          'orderId': orderId
        }
      })
    },

  },
  created(){
    this.userId = getStore('user')
    let query=this.$route.query
    if (query.goodId && query.goodNum) {
      this.goodId = query.goodId
      this.goodNum = query.goodNum
      this._productDet(this.goodId, this.goodNum)
    } else {
      // this._getCartList()
      this.cartList = JSON.parse(getStore('payCart'))  //获取选中的购物车商品
      // console.log(JSON.parse(getStore('payCart')), '')
    }
    this._addressList()
  }
}
</script>
<style scoped>
  .el-col{
    border: 1px solid #E5E5E5;
  }
  div.checked{
    border-color: #fa0a1e
  }

  .item p{
    margin-bottom: 0.2rem;
    line-height: 0.5rem
  }
/*   <!-- 购物清单 --> */
  .cart-table-title{
    position: relative;
    z-index: 1;
    line-height: 0.8rem;
    height: 0.8rem;
    padding: 0 0 0 0.5rem;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, .08);
  }
  .cart-table-title span {
    width: 2.5rem;
    float: right;
    text-align: center;
    color: #838383;
    
  }
  .cart-table-title .name{
    float:left;
    text-align: left;
    width: 8rem
  }
  .cart-items{
    display: flex;
    align-items: center;
    justify-content:flex-end;
  }
  .items-msg{
    display: flex;
    align-items: center;
    width:10rem;
    cursor:pointer;
  }
  .rg{
    width: 2.5rem;
    text-align: center;
  }
  .pay{
    display: flex;
    align-items: center;
    justify-content:flex-end;
    margin: 0 0.2rem 0.2rem 0;
  }

</style>
