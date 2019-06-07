<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>

    <div class="main-content-wrap">
      <el-carousel indicator-position="outside" :interval="3000" type="card" >
        <el-carousel-item v-for="(item,index) in imgs" :key="index">
          <el-image :src="item" fit="contain"></el-image>
        </el-carousel-item>
      </el-carousel>

      <div class="main-content">
        <!-- 搜索 -->
        <div class="screen-content">
          <div class="screen-item">
            <span>商品种类：</span>
            <div class="item-check">
              <el-checkbox-group  @change="onChange1" v-model="speci" :max='2'>
                <el-checkbox v-for="spe in goodKind" :key="spe" >{{spe}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>

          <div class="screen-item">
            <span>宠物种类：</span>
            <div class="item-check">
              <el-checkbox-group @change="onChange2" v-model="province">
                <el-checkbox v-for="provin in goodUserKind" :key="provin">{{provin}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>

          <!-- <div class="screen-item">
            <span>产地：</span>
            <div class="item-check">
              <el-checkbox-group @change="onChange3" v-model="place">
                <el-checkbox v-for="place in places" :label="place" :key="place">{{place}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div> -->
          <el-button type="primary" @click="search" style="float:right;" size="small">搜索</el-button>
        </div>

        <p class="result-text">为您找到{{resultnum}}条相关结果</p>
        <!-- 搜索结果 -->
        <div class="screen-result-wrap" style="width:100%">
          <ul class="result-select">
            <li>综合</li>
            <li>
              <el-select v-model="value" placeholder="请选择" @change="sort(value)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
          </ul>

            <el-row>
              <el-col :span="8" :offset="index%2 == 0 ? 2 : 4" 
              style="margin-top:0.5rem"
              v-for="(item,index) in resultGood.slice((currentPage-1)*6,currentPage*6)" :key="index">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                      <el-image fit="container"  :src="item.imgUrl"></el-image>
                      <div style="padding: 10px;text-align:left">
                        <span class="good-name">{{item.name}}</span>
                        <span class="price">¥{{item.price}}</span>
                      </div>
                      <div style="padding: 10px;text-align:left">
                        <el-button type="danger" size="mini" @click.native="toDescript(item.goodId)">查看详情</el-button>
                        <el-button type="danger" size="mini" style="float:right" @click.native="_addCart(item.goodId, item.name, item.price, item.imgUrl)">加入购物车</el-button>
                      </div>
                </el-card>
              </el-col>
            </el-row>
            
            <el-pagination
              style="margin-top:0.5rem"
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  

        </div>
      </div>
    
    </div>

    
    <!-- 底部 -->
    <foot></foot>
  </div>
</template>
<script>
import headernav from "@/components/headernav.vue";
import foot from "@/components/foot"
import {getCartList, goodsListSelect, navList, addCart} from "@/api/index"
import {getStore} from "@/utils/storage"
import { mapMutations } from 'vuex'

const goodKind=['宠物牌', '牵引线', '宠物窝', '宠物食品', '宠物食具', '宠物服装', '宠物玩具', '清洁用品', '宠物药品', '其他用品']
const goodUserKind=['狗', '猫', '兔', '鸟', '小型', '水生', '两栖', '其他宠物']
export default {
  components:{
      headernav,foot 
  },
  data(){
    return{
      imgs: [
              require('@/assets/images/background/4.jpg'),
              require('@/assets/images/background/5.jpg'),
              require('@/assets/images/background/6.jpg'),
            ],
      options:[{
        value:'ASCE',
        label:'升序'
      },{
        value:'DESC',
        label:'降序'
      }],
      value:'',//升序降序的值
      selectObj:{},
      resultnum:0,
      goodKind,
      goodUserKind,
      // places:['国内','进口'], //产地
      num:1,
      speci:[],  //选中的商品种类
      province:[],  //选中的宠物种类
      place:'',
      currentPage:1,
      total:0,
      userId:'',
      resultGood:[],

      //  筛选按钮
      // rateMenuArrow:true,
      // rangeMenuArrow:true
    }
  },
  computed:{
    
  },
  created:function() {
    console.log(this.resultGood.length)
    let num=this.resultGood.length
    this.total=num
    console.log(this.total)
    // this.total=this.resultGood.length
  },
  methods: {
    ...mapMutations(['INIT_BUYCART','ADD_CART']),
    onChange1(value){
      if(value.length>1){
        value.splice(0,1);
      }console.log(value)
      this.selectObj.speci=value
    },
    onChange2(value){
      console.log(value)
      this.selectObj.province=value
    },
    onChange3(value){
      if(value[0] == '国内'){
        this.selectObj.place=0
      }else{
        this.selectObj.place=1
      }
    },    //搜索
    search(){
      console.log(this.selectObj)
      _search()
    },
    //排序
    sort(value){
      this.selectObj.sort=value
      console.log(this.selectObj)
      this._search()
    },

    currentPageChange(val){
      this.currentPage=val;
    },
    //查看详情
    toDescript(id){
      this.$router.push({path: "/goodsDetails",query:{goodId:id}})
    },
    //立刻购买
    _addCart(id, name, price, img){
        addCart({userId: this.userId, goodId: id, goodNum: this.num}).then(res => {
          // 并不重新请求数据
          this.ADD_CART({
            goodId: id,
            price: price,
            name: name,
            imgUrl: img,
            goodNum: this.num
          })
        })
    },
    //获取商品列表
    _navList(){
      navList().then(res => {
        if(res.data.code == 1){
          this.resultGood = res.data.data
          this.resultnum = this.total =res.data.data.length
          console.log(this.resultGood, '')
        }else{
          this.$message.error('获取商品列表失败')
        }
      })
    },
    //获取购物车列表
    _getCartList () { 
      getCartList({userId: this.userId}).then(res => {
        let cartList = res.data.goods;
        this.INIT_BUYCART(cartList)
      })
    },
    priceMenuChange(visible){  
      this.rateMenuArrow=!visible;
    },
    rangeMenuChange(visible){
      this.rangeMenuArrow=!visible;
    },
    //筛选和排序时返回的数据
    _search(){  
      goodsListSelect(this.selectObj).then(res =>{
        if(res.data.success==true){
          this.resultGood = res.data.data
          this.resultnum = this.total =res.data.data.length
        }else{
          this.$message.error('获取商品列表失败')
        }
      })
    }
  },
  created() {
    this.userId= getStore('userId')
    this._getCartList()
    this._navList()
  },
}
</script>
<style scoped> 
/* scoped:作用当前组件 */

.main-content-wrap{
  display:flex;
  flex-direction: column;
  align-items: center;
  margin:0.1rem 0;
}
.main-content{
  display:flex;
  justify-content:center;
  flex-direction: column;
  align-items: center;
  width: 70%;
}
.screen-content{
  width:100%;
  border:1px solid #ebebeb;
  padding: 0.2rem 0.1rem 0.2rem 0.3rem; 
  background: rgba(242, 242, 242, 0.2)
}
.screen-item{
  width: 100%;
  margin-bottom: 0.14rem;
}
.screen-item span{
  display: inline-block;
  width: 8%;
  vertical-align: top;
}
.screen-item .item-check{
  display: inline-block;
  width: 90%
}
.el-checkbox-group{
  width: 100%;
  height: 100%;
}

.result-text{
  color:rgba(64,158,255,1);
  margin: 0.2rem 0;
  width: 100%;
}

.result-select{
  background:rgba(242,242,242,1);
  border:1px solid rgba(230,230,230,1);
  margin-bottom: 0;
}
.result-select span,.result-select li{
  font-size: 0.2rem;
}
.result-select li{
  display: inline-block;
  list-style: none;
  cursor: pointer;
  padding:0 0.3rem;
  border: 1px solid #ebebeb
}

.result-content{
  /* width:50%;
  float: left; */
}
.good-name{
  display: inline-block;
  font-size:0.30rem;
  font-weight:bold;
  color:rgba(48,49,51,1);
  margin-bottom: 0.2rem;
}
.price{
  float: right;
  font-size:0.32rem;
  font-weight:bold;
  color:rgba(245,108,108,1);
}

.el-carousel{
  width: 80%;
  height: 5rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
}


  
</style>

