<template>
  <div class="wrapper" style="position:relative">
    <!-- 头部 -->
    <headernav></headernav>

    <div class="img-content" @click="mapShow()" v-if="mapshow"> 
        <el-tooltip content="点击图片显示地图" placement="bottom" effect="light">
          <img style="width:80%;" title="" src="@/assets/images/gone/pexels-photo-1930851.jpg" alt="">
        </el-tooltip>
    </div>
          
    <div class="map-content">
      <!-- <div style="width:100%"> -->
        <div style="margin-bottom:0.7rem;">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select" >
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
        <div id="l-map"></div>
      <!-- </div> -->
    </div>
    <div class="main-content-wrap">
              <!-- 医院搜索结果 -->
        <div  style="width:100%">
          <el-table :data="deList.slice((currentPage-1)*5,currentPage*5)"
          style="width: 100%" :header-cell-style="{background:'#F3F4F7',color:'#555'}">
            <el-table-column  width="200">
              <template slot-scope="scope">
                <el-image :src="scope.row.Img" fit="contain"></el-image>
              </template>
            </el-table-column>
            <el-table-column  width="">
              <template slot-scope="scope">
                <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Name}}</span><br>
                <span style="font-weight:600;font-size:0.26rem;">地址：{{scope.row.Address}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                <el-button type="danger" size="small"  @click="yuyue()">预约</el-button>
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

      <!-- <el-row :gutter="20" style="padding: 0.2rem 1rem; background:#ebebeb;">
        <el-col :span="8" style="padding: 0"><img src="@/assets/images/gone/公墓.jpg" alt="">宠物公墓</el-col>
        <el-col :span="8" style="padding: 0"><img src="@/assets/images/gone/安乐死.jpg" alt="">宠物安乐死</el-col>
        <el-col :span="8" style="padding: 0"><img src="@/assets/images/gone/玑珠.jpg" alt="">宠物玑珠</el-col>
      </el-row> -->
    </div>

    <el-dialog title="" :visible.sync="dialogVisible" center @close="closeDilog()">
        <el-form :model="msg" :rules="rules" status-icon label-width="100px" style="width:80%;" ref="msg">
          <el-form-item label="联系人">
            <el-input v-model="msg.name"> </el-input>
          </el-form-item>          
          <el-form-item label="联系方式">
            <el-input v-model="msg.phone"> </el-input>
          </el-form-item>

          <el-form-item label="预约时间" inline-message>
            <el-date-picker
              v-model="msg.dateValue"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="送别方式">
            <el-checkbox-group v-model="msg.checkList" :max="1">
              <el-checkbox label="宠物火化"></el-checkbox>
              <el-checkbox label="宠物树葬"></el-checkbox>
              <el-checkbox label="纪念品留存"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>  

          <el-form-item label="预约备注">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="msg.textarea">
              </el-input>
          </el-form-item>       
        </el-form>
        <el-button @click='submit()' style="width:4rem;margin-top:1rem">立即预约</el-button>
        <el-button @click='edit()' style="width:4rem;margin-top:1rem">取消</el-button>
    </el-dialog>

    <!-- 底部 -->
    <foot></foot>
  </div>
</template>
<script>
import headernav from "@/components/headernav";
import foot from "@/components/foot"
import {deathNavList} from "@/api/index"
import BMap from 'BMap'
const mapStyle=[
          {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                              "color": "#ffe599ff"
                    }
          },
          {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": {
                              "color": "#ffffffff"
                    }
          }
]
export default {
  name:"hs_death",
  components:{
      headernav,foot 
  },
  data(){
    return{
      deList:[],
      input:'',
      center:{
        lng:120.15,
        lat:30.28
      },
      msg:{
        name:'',
        phone:'',
        dateValue:'',
        checkList:[],
        textarea:''
      },
      total:0,
      currentPage:1,
      map: null,
      mapshow:true,
      dialogVisible:false,
      rules:{

      }
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    currentPageChange(val){
      this.currentPage=val;
    },
    mapShow(){
      this.mapshow = false
    },
    initMap(){
        let map = new BMap.Map("l-map");            // 创建Map实例
        map.setMapStyle({
          styleJson:mapStyle
        });
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
    yuyue(){
      this.dialogVisible=true
    },
    closeDilog(){
      this.dialogVisible = false
    },    
    edit(){
      this.dialogVisible = false
    },
    //获取殡葬列表
    _deathNavList(){
      deathNavList().then(res => {
        if(res.data.code == 1){
          this.deList = res.data.data;
        }else{
          this.$message.error('获取殡葬列表失败')
        }
      })
    },
    search(){
      this.setMap()
    }
  },
  created() {
    this._deathNavList()
  },
}
</script>
<style scoped>
#allmap {width: 100%;height: 100%; margin:0;font-family:"微软雅黑";}
.img-content{
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    position: absolute;
    background: rgb(235, 235, 235);
    z-index: 1;
}
.map-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background:rgb(235, 235, 235);
}
#l-map{
  height:7rem;
  width:80%;
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
.el-tooltip__popper{
  position: absolute;
  top:400px !important;
}
</style>
