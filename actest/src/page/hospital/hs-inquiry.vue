<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>

    <div class="main-content-wrap">
      <div style="padding:0 2rem;background:#FFB90F;width:80%;margin-bottom:0.5rem;">
        <el-carousel :interval="3000" arrow="always" loop> 
          <el-carousel-item v-for="(item,index) in imgs" :key="index">
            <el-image :src="item" fit="scale-down"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
        
      <div class="main-content">

        <div style="align-self: flex-start;width:100%">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="医生" name="doctor">
                <!-- 搜索 -->
                <div class="screen-content">
                  <div class="screen-item">
                    <span>种类：</span>
                    <div class="item-check">
                      <el-checkbox-group  @change="onChange1" v-model="specialcheked" :max='2'>
                        <el-checkbox v-for="speci in special" :label="speci" :key="speci" >{{speci}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>

                  <div class="screen-item">
                    <span>地区：</span>
                    <div class="item-check">
                      <el-checkbox-group @change="onChange2" v-model="areachecked">
                        <el-checkbox v-for="province in area" :label="province" :key="province">{{province}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                  <el-button type="primary" @click="search"  size="small" style="background:#FFB90F;border-color:#FFB90F">搜索</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="医院" name="hospital">
              <!-- 搜索 -->
              <div class="screen-content">
                  <div class="screen-item">
                    <span>种类：</span>
                    <div class="item-check">
                      <el-checkbox-group  @change="onChange1" v-model="specialcheked" :max='1'>
                        <el-checkbox v-for="speci in special" :label="speci" :key="speci" >{{speci}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>

                  <div class="screen-item">
                    <span>地区：</span>
                    <div class="item-check">
                      <el-checkbox-group @change="onChange2" v-model="areachecked">
                        <el-checkbox v-for="province in area" :label="province" :key="province">{{province}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                  <el-button type="primary" @click="search" size="small" style="background:#FFB90F;border-color:#FFB90F">搜索</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>


        <p class="result-text">为您找到{{resultnum}}条相关结果</p>
        <!-- 搜索结果 -->
        <!-- <div class="screen-result-wrap" style="width:100%">
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
                                <el-button type="danger" @click.native="_addCart(item.goodId, item.goodName, item.goodPrice, item.goodImg)">加入购物车</el-button>
                              </div>
                          </figcaption>
                          </figure>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </li>

          </ul>
        </div> -->
        
        <div style="width:100%">
          <el-table :data="resultList.slice((currentPage-1)*5,currentPage*5)"
          style="width: 100%" :header-cell-style="{background:'#F3F4F7',color:'#555'}">
            <el-table-column  width="200">
              <template slot-scope="scope">
                <el-image :src="scope.row.image" fit="contain"></el-image>
              </template>
            </el-table-column>
            <el-table-column  width="">
              <template slot-scope="scope">
                <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span><br>
                <span style="font-weight:600;font-size:0.26rem;">专业：{{scope.row.speciality.join('/')}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                <el-button type="danger" size="small"  @click="wenzhen(scope.row.physicId)">问诊</el-button>
              </template>
            </el-table-column>        
          </el-table>

          <el-pagination
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
import { hospitalSelect, hospitalNavList} from "@/api/index"
import {getStore} from "@/utils/storage"
import { mapMutations } from 'vuex'

const special=['不限', '狗', '猫', '兔子', '水生', '鸟', '两栖']
const area=['不限', '浙江', '上海', '江苏', '北京', '四川', '台湾', '云南', '西藏', '黑龙江']
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
      activeName:'doctor',  //当前选中的tab标签
      selectObj:{      //筛选用的数据体
        physicTag:'',//physicTag  选中的是医生还是医院标签
        specialcheked:['不限'], //选中的种类
        areachecked:['不限'] //选中的地区
      },    
      resultnum:0,
      special,
      area,
      num:1,
      specialcheked:['不限'],
      areachecked:['不限'],
      currentPage:1,
      total:0,
      userId:'',
      resultList:[], //接受后台传来的医生、医院列表数据
      //  筛选按钮
      // rateMenuArrow:true,
      // rangeMenuArrow:true
    }
  },
  computed:{
    
  },

  created:function() {
    let num=this.resultList.length
    this.total=num
    console.log(this.total)
    // this.total=this.resultList.length
  },
  methods: {
    ...mapMutations(['INIT_BUYCART']),
    onChange1(value){
      if(value.length>1){
        value.splice(0,1);
      }   
      // console.log(value)
      this.selectObj.specialcheked=value
    },
    onChange2(value){
      // 当前不限未选中，选中不限后的结果
      let len=value.length-1
      if(value[len]=="不限"){
        value.splice(0,len);
        value.push("不限")
      }//当前不限选中
      if(value[len]!="不限"){
        if(value[0]=="不限"){
          value.splice(0,1);
        }
      }
      // console.log(value)
      this.selectObj.areachecked=value
    },
    //搜索
    search(){
      this.selectObj.physicTag=this.activeName  
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
            goodPrice: price,
            goodImg: name,
            goodImg: img,
            goodNum: this.num
          })
        })
    },
    //获取商品列表
    _hospitalNavList(){
      hospitalNavList().then(res => {
        if(res.data.success == true){
          this.resultList = res.data.data
          this.resultnum = this.total =res.data.data.length
        }else{
          this.$message.error('获取商品列表失败')
        }
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
      hospitalSelect(this.selectObj).then(res =>{
        if(res.data.success==true){
          this.resultList = res.data.data
          this.resultnum = this.total =res.data.data.length
        }else{
          this.$message.error('获取商品列表失败')
        }
      })
    }
  },
  created() {
    this.userId= getStore('user')
    this._hospitalNavList()
  },
}
</script>
<style scoped> 
/* scoped:作用当前组件 */
.main-content-wrap{
  display: flex;
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
  border-top: 0px;
  padding: 0.2rem 0.1rem 0.2rem 0.3rem; 
  background: rgba(242, 242, 242, 0.2);
  text-align: right
}

.screen-item{
  width: 100%;
  margin-bottom: 0.14rem;
  text-align: left;
}

.screen-item span{
  display: inline-block;
  width: 5%;
  vertical-align: top;
}
.screen-item .item-check{
  display: inline-block;
  width: 94%
}
.el-checkbox-group{
  width: 100%;
  height: 100%;
}

.result-text{
  color:#FFB90F;
  margin: 0.2rem 0;
  width: 100%;
}

.el-carousel{
  width: 100%;
  overflow: hidden;
}


</style>
<style>
/* 多选框 */
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #FFB90F !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #FFB90F !important;
    border-color: #FFB90F !important;
}
.el-checkbox__input:hover{
  border-color:#FFB90F !important;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:#FFB90F !important;
}

.el-tabs__item.is-active {
  color: #FFB90F !important;
}
.el-tabs__item:hover{
  border-color:#FFB90F !important;
  color: #FFB90F;
}
.el-tabs__header{
  margin-bottom: 0 ;
}
.el-pager li.active {
    color: #FFB90F;
    cursor: default;
}
.el-pager li:hover {
    color: #FFB90F;
}
.el-carousel__container{
  height:6.2rem;
}
</style>

