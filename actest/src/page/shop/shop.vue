<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>

    <div class="main-content-wrap">
      <div class="main-content">

        <el-carousel indicator-position="outside" :interval="3000" type="card" >
          <el-carousel-item v-for="(item,index) in imgs" :key="index">
            <el-image :src="item" fit="contain"></el-image>
          </el-carousel-item>
        </el-carousel>

        <!-- 搜索 -->
        <div class="screen-content">
          <div class="screen-item">
            <span>商品种类：</span>
            <div class="item-check">
              <el-checkbox-group  @change="onChange1" v-model="goodKindcheked" :max='1'>
                <el-checkbox v-for="speci in goodKind" :label="speci" :key="speci" >{{speci}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>

          <div class="screen-item">
            <span>适用商品的宠物种类：</span>
            <div class="item-check">
              <el-checkbox-group @change="onChange2" v-model="goodUserKindchecked">
                <el-checkbox v-for="province in goodUserKind" :label="province" :key="province">{{province}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <el-button type="primary" @click="onSubmit" style="float:right;" size="small">搜索</el-button>
        </div>

        <p class="result-text">为您找到{{resultnum}}条相关结果</p>
        <!-- 搜索结果 -->
        <div class="screen-result-wrap" style="width:70%">
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

          <ul class="result-content-wrap" style="width:100%">
            <li v-for="(item,index) in resultGood.slice((currentPage-1)*5,currentPage*5)" :key="index">
              <div class="result-content">
                <el-row>
                  <el-col :span="24">
                    <el-card class="good-content">
                        <figure class="good-figure">
                            <img :src="item.goodImg" alt="">
                            <figcaption class="good-text">
                              <p class="good-name">{{item.goodName}}</p>
                              <span class="price">¥{{item.goodPrice.split(".")[0]}}.<mark>{{item.goodPrice.split(".")[1]}}</mark></span>
                              <div class="good-discribe">{{item.goodDiscribe}}</div>
                              <div class="good-price">
                                <el-button type="danger" @click.native="toDescript(item.goodId)">查看详情</el-button>
                                <el-button type="danger">加入购物车</el-button>
                              </div>
                          </figcaption>
                          </figure>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </li>
            <el-pagination
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  
          </ul>
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
import {getCartList, goodsListSelect, navList} from "@/api/index"
import {getStore} from "@/utils/storage"
import { mapMutations } from 'vuex'

const goodKind=['宠物牌', '牵引线', '宠物窝', '宠物食品', '宠物食具', '宠物服装', '宠物玩具', '宠物清洁用品', '其他宠物用品']
const goodUserKind=['狗', '猫咪', '水族', '兔子', '仓鼠', '乌龟', '鸟', '其他宠物']
export default {
  name:"shop",
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
      selectObj:{},
      value:'',
      resultnum:30,
      goodKind,
      goodUserKind,
      goodKindcheked:[],
      goodUserKindchecked:[],
      currentPage:1,
      total:50,
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
    ...mapMutations(['INIT_BUYCART']),
    onChange1(value){
      console.log(value)
      this.selectObj.goodKindcheked=value
      // let len=value.length-1
      // // 当前不限未选中，选中不限后的结果
      // if(value[len]=="不限"){
      //   value.splice(0,len);
      //   value.push("不限")
      // }//当前不限选中
      // if(value[len]!="不限"){
      //   if(value[0]=="不限"){
      //     value.splice(0,1);
      //   }
      // }
    },
    onChange2(value){
       console.log(value)
       this.selectObj.goodUserKindchecked=value
    },
    //排序
    sort(value){
      console.log(value)
    },
    //搜索
    onSubmit(){
      console.log(this.selectObj)
    },
    currentPageChange(val){
      this.currentPage=val;
    },
    toDescript(id){
      this.$router.push({path: "/goodsDetails",query:{goodId:id}})
    },
    //获取购物车列表
    _getCartList () { 
      getCartList({userId: this.userId}).then(res => {
        let cartList = res.data.goods;
        this.INIT_BUYCART(cartList)
      })
    },
    // priceMenuChange(visible){  
    //   this.rateMenuArrow=!visible;
    // },
    // rangeMenuChange(visible){
    //   this.rangeMenuArrow=!visible;
    // }
  },
  created() {
    this.userId= getStore('user')
    this._getCartList()
  },
}
</script>
<style scoped> 
/* scoped:作用当前组件 */
.main-content{
  display:flex;
  justify-content:center;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.main-content-wrap{
  margin:0.1rem 0;
}
.screen-content{
  width:70%;
  border:1px solid #ebebeb;
  padding: 0.2rem 0.1rem 0.2rem 0.6rem; 
  background: rgba(242, 242, 242, 0.2)
}
.screen-item{
  width: 100%;
  margin-bottom: 0.14rem;
}
.screen-item span{
  display: inline-block;
}
.item-check{
  display: inline-block;
}
.el-checkbox-group{
  width: 100%;
  height: 100%;
}
.result-text{
  color:rgba(64,158,255,1);
  margin: 0.2rem 0;
  width: 70%;
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

.good-figure img{
  width: 2.11rem;
  height: 1.36rem;
  position: absolute;
}
.good-text{
  display: inline-block;
  margin-left: 2.35rem;
  width:calc(100% - 2.35rem);
  padding-top: 0.07rem;
}
.good-text .good-name{
  display: inline-block;
  font-size:0.23rem;
  font-weight:bold;
  color:rgba(48,49,51,1);
  margin-bottom: 0.2rem;
}
.good-text .price{
  float: right;
  font-size:0.32rem;
  font-weight:bold;
  color:rgba(245,108,108,1);
}
.good-text .price mark{
  font-size:0.32rem;
  color:rgba(245,108,108,1);
  background: transparent;
}
.good-price{
  float: right;
}
.good-discribe{
  font-size:0.14rem;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(96,98,102,1);
  line-height:0.2rem;
  height: 0.4rem;
  margin-bottom: 0.08rem;
}

.el-carousel{
  width: 80%;
  height: 5rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
}


  
</style>

