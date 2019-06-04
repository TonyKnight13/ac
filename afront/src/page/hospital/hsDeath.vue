<template>
  <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>
    <div class="map-content">
      <div style="margin-bottom:1rem;">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select" >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div id="l-map"></div>
    </div>
    <div class="main-content-wrap">
      <div style="padding:0 1rem;width:100%;box-sizing:border-box;"> 
      <img style="width:100%; " src="@/assets/images/gone/pexels-photo-1930851.jpg" alt=""></div>
      <el-row :gutter="20" style="padding: 0.2rem 1rem; background:#ebebeb;">
        <el-col :span="8" style="padding: 0"><img src="@/assets/images/gone/公墓.jpg" alt="">宠物公墓</el-col>
        <el-col :span="8" style="padding: 0"><img src="@/assets/images/gone/安乐死.jpg" alt="">宠物安乐死</el-col>
        <el-col :span="8" style="padding: 0"><img src="@/assets/images/gone/玑珠.jpg" alt="">宠物玑珠</el-col>
      </el-row>
    </div>
    <!-- 底部 -->
    <foot></foot>
  </div>
</template>
<script>
import headernav from "@/components/headernav";
import foot from "@/components/foot"
import BMap from 'BMap'
export default {
  name:"hs_death",
  components:{
      headernav,foot 
  },
  data(){
    return{
      input:'',
      center:{
        lng:120.15,
        lat:30.28
      },
      map: null,
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
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
          }       
        },{enableHighAccuracy: true})
    },
    setMap(){
        let map = this.map;            // 创建Map实例
        let point = new BMap.Point(this.center.lng, this.center.lat)        
        map.centerAndZoom(point, 14);      
        var myKeys = this.input;

        var local = new BMap.LocalSearch(map, {
          renderOptions:{map: map},
        });
        local.searchInBounds(myKeys, map.getBounds());  

    },
    search(){
      this.setMap()
    }
  },

}
</script>
<style scoped>
#allmap {width: 100%;height: 100%; margin:0;font-family:"微软雅黑";}
.map-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background:#FFB90F
}
#l-map{
  height:7rem;
  width:70%;
  text-align:center;
}
.main-content-wrap{
  width: 100%;
  background: #ffffff
}
.main-content-wrap > img{
  width: 100%;
}
.el-row{
    display: flex;
    align-items: center;
    justify-content: center;
}
.el-col{
  border: 1px solid #ebebeb;
  background:#ffffff;
  height:5.5rem;
  width:5rem;
  margin:0 0.3rem;
  font-size: 0.32rem;
  text-align: center;
}
.grid-content{
  width:100%;
  height:85%;
}
.el-col img{
  width:100%;
  height: 88%;
}
</style>
<style>

/* .anchorBL {
    display: none;
} */
.BMap_cpyCtrl {
  display: none;
}
</style>
