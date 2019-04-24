<template>
    <div class="wrapper">
    <!-- 头部 -->
    <headernav></headernav>

    <div class="main-content-wrap">
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
      specis,
      provinces,
      checkedspeci:["不限"],
      checkedprovince:["不限"],
    }
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
  },
}
</script>
<style scoped>
.screen-item{
  width: 100%;
  margin-bottom: 0.14rem;
}
.screen-item span{
  display: inline-block;
  width: 1rem;
  text-align: right;
}
.screen-content{
  padding-left:2rem 
}
.item-check{
  display: inline-block;
}
.result-text{
  color:rgba(64,158,255,1);
  margin: 0.18rem 0;
}
.result-select{
  background:rgba(242,242,242,1);
  border:1px solid rgba(230,230,230,1);
}
.el-checkbox-group{
  width: 100%;
  height: 100%;
}
</style>

