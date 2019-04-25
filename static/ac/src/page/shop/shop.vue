<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>

    <div class="main-content-wrap">
      <div class="main-content">

        <div class="screen-content">
          <div class="screen-item">
            <span>种类：</span>
            <div class="item-check">
              <el-checkbox-group  @change="onChange" v-model="checkedspeci" text-color="#ffb90f" fill="#ffb90f">
                <el-checkbox v-for="speci in specis" :label="speci" :key="speci" >{{speci}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>

          <div class="screen-item">
            <span>地区：</span>
            <div class="item-check">
              <el-checkbox-group @change="onChange" v-model="checkedprovince">
                <el-checkbox v-for="province in provinces" :label="province" :key="province">{{province}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <el-button type="primary" @click="onSubmit" style="float:right;" size="small">搜索</el-button>
        </div>

        <p class="result-text">为您找到{{resultnum}}条相关结果</p>

        <div class="screen-result-wrap" style="width:70%">
          <ul class="result-select">
            <li>综合</li>
            <li>
              <el-dropdown trigger="click" :hide-on-click="false">
                <span class="el-dropdown-link">价格<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item> 升序</el-dropdown-item>
                    <el-dropdown-item> 降序</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>

          <ul class="result-content-wrap" style="width:100%">
            <li v-for="(item,index) in resultGood.slice((currentPage-1)*5,currentPage*5)" ::key="index">
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
                                <el-button type="danger">查看详情</el-button>
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
import headernav from "../../components/headernav.vue";
import foot from "../../components/foot"

const specis=['不限','狗','猫','兔子','鱼']
const provinces=['不限','浙江','上海','江苏','北京']
export default {
  name:"shop",
  components:{
      headernav,foot 
  },
  data(){
    return{
      resultnum:30,
      specis,
      provinces,
      checkedspeci:["不限"],
      checkedprovince:["不限"],
      currentPage:1,
      total:50,
      resultGood:[
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '100.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '100.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '100.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '100.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '100.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '200.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '200.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '200.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '200.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '200.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '300.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '300.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '300.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '300.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '300.00',
        },
        {
          goodImg:require("../../assets/images/shop/1.jpg"),
          goodName:'宠物狗食品',
          goodPrice: '300.00',
        },
      ],

      //  筛选按钮
      // rateMenuArrow:true,
      // rangeMenuArrow:true
    }
  },
  created:function() {
    console.log(this.resultGood.length)
    let num=this.resultGood.length
    this.total=num
    console.log(this.total)
    // this.total=this.resultGood.length
  },
  methods: {
    onChange(value){
      let len=value.length-1
      // 当前不限未选中，选中不限后的结果
      if(value[len]=="不限"){
        value.splice(0,len);
        value.push("不限")
      }//当前不限选中
      if(value[len]!="不限"){
        if(value[0]=="不限"){
          value.splice(0,1);
        }
      }
    },
    onSubmit(){
      console.log("xxx")
    },
    currentPageChange(val){
      this.currentPage=val;
    },
    // priceMenuChange(visible){
    //   this.rateMenuArrow=!visible;
    // },
    // rangeMenuChange(visible){
    //   this.rangeMenuArrow=!visible;
    // }
  },
}
</script>
<style scoped>
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
  font-size:0.23rem;
  font-weight:bold;
  color:rgba(245,108,108,1);
}
.good-text .price mark{
  font-size:18px;
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
</style>

