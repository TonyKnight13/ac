<template>
  <div class="swrapper">
    <headernav style="width:100%"></headernav>

    <div class="main">
      <y-shelf title="购物车">
        <!-- 内容 -->
        <div slot="content">
          <div v-if="cartList.length" v-loading="isloading">

            <el-table :data="cartList" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange"
            :header-cell-style="{background:'#F3F4F7',color:'#555'}">
              <el-table-column  width="100" style="color:red" align="center"  type="selection">
              </el-table-column>

              <el-table-column prop="goodImg" label="商品图片" width="120" align="center">
                <template slot-scope="scope">            
                  <el-image :src="scope.row.goodImg" fit="contain" @click="goodsDetails(scope.row.goodId)"></el-image>
                </template>
              </el-table-column>

              <el-table-column prop="goodName" label="商品名称" width="180" align="center">
              </el-table-column>
              <el-table-column prop="goodPrice" label="商品单价" width="180" align="center">
                  <template slot-scope="scope">
                      <span>￥{{scope.row.goodPrice}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="goodNum" label="商品数量" width="200" align="center" >
                  <template slot-scope="scope">
                      <el-input-number v-model="scope.row.goodNum" size="small" @change="EditNum(scope.row.goodNum,scope.row.goodId)"></el-input-number>
                  </template>
              </el-table-column>
              <el-table-column label="商品总价" align="center">
                  <template slot-scope="scope">
                      <span>￥{{scope.row.goodPrice*scope.row.goodNum}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="删除功能" align="center">
                  <template slot-scope="scope">
                  <el-button type="danger" circle size="mini" icon="el-icon-close"  @click="cartdel(scope.row.goodId)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <!-- 合计 -->
            <div class="pay"> 
              <div style="text-align:center;color:#959595;font-size:0.20rem;">
                <span style="color:black">已选择<span style="font-size:0.36rem;color:#F56C6C;font-weight:bold">{{checkNum}}</span>商品</span> <br />
                <span>共计<span style="font-size:0.30rem;font-weight:bold">{{totalNum}}</span>商品</span>
              </div>
              <div style="margin-right:0.5rem;font-size:0.24rem;">
                <el-divider direction="vertical" style="height:100%"></el-divider>
                <div style="display:inline-block">
                  <span style="">应付总额：<span style="font-size:0.30rem;color:#F56C6C;font-weight:bold">￥{{checkPrice}}</span></span>
  
                </div>
              </div>
              <el-button type="primary" :loading="loading" @click="checkout">现在结算</el-button>
            </div>
          
          </div>

          <div v-else style="padding:50px">
            <div class="cart-e"><el-image :src="require('@/assets/images/shop/cart-empty_@2x.png')"></el-image></div>
            <p style="text-align: center;padding: 20px;color: #8d8d8d">你的购物车空空如也</p>
            <div style="text-align: center">
              <router-link to="/shop">
                <el-button style="color: #8d8d8d">现在选购</el-button>
              </router-link>
            </div>

          </div>
        </div>
      </y-shelf>
    </div>

  <foot></foot>
  </div>
</template>
<script>
import headernav from "@/components/headernav";
import foot from "@/components/foot"
import YShelf from '@/components/shelf'
import { getCartList, cartEdit, editCheckAll, cartDel } from '@/api/index'
import { mapMutations, mapState } from 'vuex'
import { getStore, setStore} from '@/utils/storage';
export default {
  components:{
    headernav,foot,YShelf
  },
  data() {
    return {
      cartList:[],
      userId:'',
      checkoutNow: '现在结算',
      loading: false,
      checked:false,
      multipleSelection: [],
      checkedList:[],
      isloading:true
    }
  },
  computed: {
    // 是否全选
    // checkAllFlag () {
    //   return this.checkedCount === this.cartList.length
    // },
    // 勾选的数量
    // checkedCount () {
    //   var i = 0
    //   this.cartList && this.cartList.forEach((item) => {
    //     if (item.checked === '1') i++
    //   })
    //   return Number(i)
    // },
    // 计算总数量
    totalNum () {
      var totalNum = 0
      this.cartList && this.cartList.forEach(item => {
        totalNum += (item.goodNum)
      })
      return Number(totalNum)
    },
    // 选中的总价格
    checkPrice () {
      var totalPrice = 0
      for(let i=0;i<this.cartList.length;i++){
        if(this.cartList[i].checked==true){
          totalPrice += this.cartList[i].goodPrice * this.cartList[i].goodNum
        }
      }
      return totalPrice
    },
    // 选中的商品数量
    checkNum () {
      var checkNum = 0
      this.cartList && this.cartList.forEach(item => {
        if (item.checked === '1') {
          checkNum += (item.goodNum)
        }
      })
      return checkNum
    }
  },
  methods: {
    ...mapMutations([
      'INIT_BUYCART', 'EDIT_CART'
    ]),
    message (m) {
      this.$message.error({
        message: m
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      for(let k=0; k<this.cartList.length; k++){
        this.cartList[k].checked='0'
      }
      for(let i=0;i<val.length;i++){  //只需修改本实例中的数据  （选中）
        val[i].checked='1'
        
      }  
      // console.log(this.cartList)

    },
    goodsDetails (goodId) {
      this.$router.push({path:'/goodsDetails', query:{goodId}})
    },
    // 修改购物车
    _cartEdit (userId, goodId, goodNum) {
      cartEdit({  //修改后台数据
          userId,
          goodId,
          goodNum,  
      }).then(res => {
        if (res.data.msg === 'success') {
          this.EDIT_CART({  //修改本地存储中的数据
              goodId,
              goodNum
          })
          // console.log(getStore('buyCart'))  //检查每次vuex执行后sessionStorage中的buyCart是否更新了
        }
      })
    },
    // 修改商品数量
    EditNum (goodNum, goodId) { 
      this._cartEdit(this.userId, goodId, goodNum)
      // console.log(this.cartList)  //检查每次数量改变，本实例中的cartList的数据是否改变
    },
    // 删除整条购物车
    cartdel (goodId) {
      cartDel({userId: this.userId, goodId}).then(res => {  //修改数据库中的购物车数据
        this.EDIT_CART({goodId})  //修改sessionStorage中的购物车数据
      })
      if (goodId) {  //修改本实例中的购物车数据
        this.cartList.forEach((item, i) => {
          if (item.goodId === goodId) {
            this.cartList.splice(i, 1)
          }
        })
      }
      // console.log(this.cartList) //检查删除购物车记录后，本实例中的cartList的数据是否改变
      
    },

    checkout(){
      this.loading = true
      let cart=[]
      for(let i=0; i<this.cartList.length; i++){
        
        if(this.cartList[i].checked == '1'){
          cart.push(this.cartList[i])
        }
      }
      // console.log(cart)
      setStore('payCart', cart) //将选中的商品存入要支付的购物车商品
      this.$router.push({path: 'payCheck'})
    },

    //获取购物车列表
    _getCartList () { 
      getCartList({userId: this.userId}).then(res => {
        let cartList = res.data.goods;
        this.INIT_BUYCART(cartList)  //将其存入state.carList和session中
        this.isloading=false
        this.cartList=JSON.parse(getStore('buyCart'))//seesionStorage中的是字符串
      })
    },

  },
  created() {
    this.userId=getStore('user')
    this._getCartList()
  },
}
</script>
<style scoped>
  .swrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .main{
    width: 90%;
    margin-top: 1rem;
  }
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
    width: 6rem
  }
  .cart-items{
    display: flex;
    align-items: center;
    justify-content:flex-end;
  }
  .items-msg{
    display: flex;
    align-items: center;
    width:6rem;
    cursor:pointer;
  }
  .rg{
    width: 2.5rem;
    text-align: center;
  }
  .pay{
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content:flex-end;
    margin: 0.2rem 0.2rem 0.2rem 0;
    height: 1rem;
  }

   .cart-e {
    margin: 0 auto;
    /* background: url("/static/images/cart-empty_@2x.png") no-repeat; */
    width: 3rem;
    height: 3rem;
    color: #8d8d8d;
  }
</style>
