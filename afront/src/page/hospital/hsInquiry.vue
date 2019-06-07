<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>

    <div class="main-content-wrap">
      <!-- <div style="padding:0 2rem;background:#FFB90F;width:80%;margin-bottom:0.5rem;">
        <el-carousel :interval="3000" arrow="always" loop> 
          <el-carousel-item v-for="(item,index) in imgs" :key="index">
            <el-image :src="item" fit="scale-down"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div> -->
        
      <div class="map-content">
        <div id="l-map"></div>
      </div>

      <div class="main-content">
        <div style="align-self: flex-start;width:100%">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="医生" name="doctor">
                <!-- 搜索 -->
                <div class="screen-content">
                  <div class="screen-item">
                    <span>种类：</span>
                    <div class="item-check">
                      <el-checkbox-group  @change="onChange1" v-model="specialcheked" :max='2'>
                        <el-checkbox v-for="speci in specials" :label="speci" :key="speci" >{{speci}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>

                  <div class="screen-item">
                    <span>地区：</span>
                    <div class="item-check">
                      <el-checkbox-group @change="onChange2" v-model="areachecked">
                        <el-checkbox v-for="province in areas" :label="province" :key="province">{{province}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                  <el-button type="primary" @click="search"  size="small" style="background:#FFB90F;border-color:#FFB90F">搜索</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="医院" name="hospital">
            </el-tab-pane>
          </el-tabs>
        </div>


        <!-- 医生搜索结果 -->
        <div style="width:100%" v-if="this.activeName == 'doctor'">
          <el-table :data="docList.slice((currentPage-1)*5,currentPage*5)"
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
                <template >
                <el-button type="danger" size="small"  @click="goChart()">问诊</el-button>
              </template>
            </el-table-column>        
          </el-table>

          <el-pagination
            :current-page="currentPage"
            :total="total"
            @current-change="currentPageChange"  
            :page-size="5" >
          </el-pagination>  
        </div>

        <!-- 医院搜索结果 -->
        <div  style="width:100%" v-else>
          <el-table :data="hosList.slice((currentPage-1)*5,currentPage*5)"
          style="width: 100%" :header-cell-style="{background:'#F3F4F7',color:'#555'}">
            <el-table-column  width="200">
              <template slot-scope="scope">
                <el-image :src="scope.row.image" fit="contain"></el-image>
              </template>
            </el-table-column>
            <el-table-column  width="">
              <template slot-scope="scope">
                <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span><br>
                <span style="font-weight:600;font-size:0.26rem;">地址：{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                <el-button type="danger" size="small"  @click="selectMap(scope.row.name)">查询</el-button>
              </template>
            </el-table-column>        
          </el-table>

          <el-pagination
            :total="total"
            :current-page="currentPage"
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
import { docNavList,docSelect, hospitalNavList} from "@/api/index"
import {getStore} from "@/utils/storage"
import { mapMutations } from 'vuex'
import BMap from 'BMap'

const specials=['狗', '猫', '兔子', '水生', '鸟', '两栖']
const areas=['浙江', '上海', '江苏', '北京', '四川', '台湾', '云南', '西藏', '黑龙江']
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
      center:{
        lng:120.15,
        lat:30.28
      },
      map: null,
      input:'',
      options:[{
        value:'ASCE',
        label:'升序'
      },{
        value:'DESC',
        label:'降序'
      }],
      activeName:'doctor',  //当前选中的tab标签
      selectObj:{      //筛选用的数据体
        // physicTag:'',//physicTag  选中的是医生还是医院标签
        specialcheked:[], //选中的宠物种类
        areachecked:[] //选中的地区
      },    
      specials,
      areas,
      num:1,
      special:['不限'],
      area:['不限'],
      currentPage:1,
      total:0,
      userId:'',
      docList:[], //接受后台传来的医生列表数据
      hosList:[], //接受后台传来的医院列表数据

    }
  },

  watch: {
    activeName(){
      if(this.activeName == 'doctor'){
        return this.total = this.docList.length ;
      }else{
        this.currentPage=1
        return this.total = this.hosList.length;
      }
    },
  },
  mounted () {
   this.initMap()
  },
  methods: {
    ...mapMutations(['INIT_BUYCART']),    
    currentPageChange(val){
      this.currentPage=val;
    },
    handleClick(tab, event){
      this.currentPageChange(1)
      console.log(tab.name, event);
    },
    initMap(){
        let map = new BMap.Map("l-map");            // 创建Map实例
        let point = new BMap.Point(this.center.lng, this.center.lat)
        map.centerAndZoom(point, 11);
        map.enableScrollWheelZoom(true)
        map.enableDoubleClickZoom(true)
        var geolocation = new BMap.Geolocation();
      	geolocation.getCurrentPosition((r) => {
          console.log(r)
          if(r){
            this.center.lng=r.longitude
            this.center.lat=r.latitude
            let mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            map.centerAndZoom(r.point, 14)
            this.map = map
            console.log(this.center)
          }       
        },{enableHighAccuracy: true})
    },
    selectMap(name){
      this.input = name
      let map = this.map;            // 创建Map实例
      let point = new BMap.Point(this.center.lng, this.center.lat)        
      map.centerAndZoom(point, 14);      
      var myKeys = this.input;
      var local = new BMap.LocalSearch(map, {
        renderOptions:{map: map},
      });
      local.searchInBounds(myKeys, map.getBounds());  
    },
    onChange1(value){
      if(value.length>1){
        value.splice(0,1);
      }console.log(value)
      this.selectObj.specialcheked=value
    },
    onChange2(value){
      console.log(value)
      this.selectObj.areachecked=value
    },


    //搜索
    search(){
      // this.selectObj.physicTag=this.activeName  
      console.log(this.selectObj)
      this._search()
    },
    selectMap(){

    },

    //前往聊天室
    goChart(){
      this.$router.push({path:'/chart'})
    },

    //获取医院列表
    _hospitalNavList(){
      hospitalNavList().then(res => {
        if(res.data.code == 1){
          this.hosList = res.data.data;
        }else{
          this.$message.error('获取医院列表失败')
        }
      })
    },
    //获取医生列表
    _docNavList(){
      docNavList().then(res => {
        if(res.data.code == 1){
          this.docList = res.data.data;
          this.total = res.data.data.length
        }else{
          this.$message.error('获取医生列表失败')
        }
      })
    },

    //医生筛选时返回的数据
    _search(){  
      docSelect(this.selectObj).then(res =>{
        if(res.data.code == 1){
          this.docList=res.data.data
        }
      })
    }
  },
  created() {
    this.userId= getStore('user')
    this._hospitalNavList()
    this._docNavList()
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

#allmap {width: 100%;height: 100%; margin:0;font-family:"微软雅黑";}
.map-content{
  width: 80%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  background:#FFB90F;
  margin-bottom:0.2rem;
}
#l-map{
  height:7rem;
  width:70%;
  text-align:center;
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
  color: #FFB90F;
}
.el-tabs__item:hover{
  border-color:#FFB90F !important;
  color: #FFB90F;
}
.el-tabs__header{
  margin-bottom: 0 ;
}
.el-tabs__nav.is-top{
  padding-left: 0;
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
.BMap_cpyCtrl {
  display: none;
}
</style>

