<template>
<div>
  <YShelf title="商品管理">
    <div slot="content" class="content" >
          <!-- 个人信息 -->
        <el-form :model="msg1" ref="msg" status-icon label-width="100px" style="width:70%;">
          <el-form-item label="用户名" >
            <el-input v-model="msg1.username"></el-input>
          </el-form-item> 
          <el-form-item label="性别" >
              <el-radio v-model="msg1.sex" label="0">男</el-radio>
              <el-radio v-model="msg1.sex" label="1">女</el-radio>
          </el-form-item>     
          <el-form-item label="用户手机号码">
            <el-input v-model="msg1.phone"></el-input>
          </el-form-item> 
          <el-form-item label="年龄">
            <el-input v-model="msg1.age"></el-input>
          </el-form-item>
          <el-form-item label="用户图片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="msg1.userImg" :src="msg1.userImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        
          <!-- 收货地址 -->
        <el-form :model="msg2" ref="msg" status-icon label-width="100px" style="width:70%;">
          <el-form-item label="收货人姓名">
            <el-input placeholder="收货人姓名" v-model="msg2.realName"></el-input>
          </el-form-item>
          <el-form-item label="收货手机号码">
            <el-input v-model="msg2.phone"></el-input>
          </el-form-item> 
          <el-form-item label="收货地址">
            <el-input placeholder="收货地址" v-model="msg2.address"></el-input>
          </el-form-item>
        </el-form>

          <!-- 殡葬管理 -->
        <el-form :model="msg3" ref="msg" status-icon label-width="100px" style="width:70%;">
          <el-form-item label="殡葬馆名">
            <el-input placeholder="殡葬馆名" v-model="msg3.name"></el-input>
          </el-form-item>
          <el-form-item label="殡葬电话号码">
            <el-input v-model="msg3.phone"></el-input>
          </el-form-item> 
          <el-form-item label="殡葬馆地址">
            <el-input placeholder="殡葬馆地址" v-model="msg3.address"></el-input>
          </el-form-item>
        </el-form>

          <!-- 医生管理 -->
        <el-form :model="msg4" ref="msg" status-icon label-width="100px" style="width:70%;">
          <el-form-item label="医生名字">
            <el-input placeholder="医生名字" v-model="msg4.realName"></el-input>
          </el-form-item>
          <el-form-item label="专业">
              <el-select v-model="msg4.major" multiple collapse-tags placeholder="专业">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>         
        </el-form>

          <!-- 医院管理 -->
        <el-form :model="msg5" ref="msg" status-icon label-width="100px" style="width:70%;">
          <el-form-item label="医院名称">
            <el-input placeholder="医院名称" v-model="msg5.hospitalName"></el-input>
          </el-form-item>
          <el-form-item label="医院电话号码">
            <el-input v-model="msg5.phone"></el-input>
          </el-form-item> 
          <el-form-item label="医院地址">
            <el-input placeholder="医院地址" v-model="msg5.address"></el-input>
          </el-form-item>
        </el-form>

          <!-- 商品上架 -->
        <el-form :model="msg6" ref="msg6" status-icon label-width="100px" style="width:70%;">
          <el-form-item label="商品名称">
            <el-input placeholder="商品名称" v-model="msg6.goodName"></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" placeholder="商品描述" :rows="2" v-model="msg6.detail"></el-input>
          </el-form-item>
          <el-form-item label="商品单价(￥)">
            <el-input placeholder="商品单价(￥)" v-model="msg6.goodPrice"></el-input>
          </el-form-item>
          <el-form-item label="商品种类">
            <el-select v-model="msg6.goodKind" placeholder="商品种类">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宠物种类">
              <el-select v-model="msg6.goodUserKind" multiple collapse-tags placeholder="宠物种类">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <!-- <el-form-item label="上架/下架">
              <el-radio v-model="msg.isPut" label="0">下架</el-radio>
              <el-radio v-model="msg.isPut" label="1">上架</el-radio>
          </el-form-item> -->
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="msg6.goodImg" :src="msg6.goodImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>

          <!-- 购物车 -->
        <el-form :model="msg7" ref="msg" status-icon label-width="100px" style="width:70%;">
          <el-form-item label="用户ID">
            <el-input placeholder="用户ID" v-model="msg7.userId"></el-input>
          </el-form-item>
          <el-form-item label="商品ID">
            <el-input placeholder="商品ID" v-model="msg7.goodId"></el-input>
          </el-form-item>

          <el-form-item label="商品数量">
            <el-input-number v-model="msg7.num" :min="1" :max="10" ></el-input-number>
          </el-form-item>

          <el-form-item label="订单总价格">
            <el-input-number v-model="msg7.orderTotal" ></el-input-number>
          </el-form-item>          
        </el-form>

          <!-- 订单 -->
        <el-form :model="msg8" ref="msg" status-icon label-width="100px" style="width:70%;">
          <el-form-item label="用户ID">
            <el-input placeholder="用户ID" v-model="msg8.userId"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input placeholder="电话" v-model="msg8.phone"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input placeholder="姓名" v-model="msg8.realName"></el-input>
          </el-form-item>
          <el-form-item label="商品ID">
            <el-input placeholder="商品ID" v-model="msg8.goodsList"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input placeholder="电话" v-model="msg8.address"></el-input>
          </el-form-item>
          <el-form-item label="订单总价格">
            <el-input-number v-model="msg8.orderTotal" ></el-input-number>
          </el-form-item>          
        </el-form>
        <el-button 
        class="btn"
        @click="save()">
        保存</el-button>

    </div>
  </YShelf>
</div>
</template>

<script>
import { test } from '@/api/index'
import YShelf from '@/components/shelf';

var op2 = [{
          value: '狗',
          label: '狗'
        }, {
          value: '猫',
          label: '猫'
        }, {
          value: '兔',
          label: '兔'
        }, {
          value: '鸟',
          label: '鸟'
        }, {
          value: '小型',
          label: '小型'
        }, {
          value: '水生',
          label: '水生'
        }, {
          value: '两栖',
          label: '两栖'
        }, {
          value: '其他宠物',
          label: '其他宠物'
        }];
var op1= [{
          value: '宠物牌',
          label: '宠物牌'
        }, {
          value: '牵引线',
          label: '牵引线'
        }, {
          value: '宠物窝',
          label: '宠物窝'
        }, {
          value: '宠物食品',
          label: '宠物食品'
        }, {
          value: '宠物食具',
          label: '宠物食具'
        }, {
          value: '宠物服装',
          label: '宠物服装'
        }, {
          value: '宠物玩具',
          label: '宠物玩具'
        }, {
          value: '清洁用品',
          label: '清洁用品'
        },  {
          value: '宠物药品',
          label: '宠物药品'
        }, {
          value: '其他用品',
          label: '其他用品'
        }]
export default {
  components:{
    YShelf
  },
  data () {
    return {
      options1:op1,
      options2:op2,
      msg1: {
      /* 个人信息 */
        username:null, //用户名
        sex: '0', //性别
        phone:null, //电话
        age:null,//年龄
        userImg:null,
      },

      /* 收货地址 */
      msg2: {
        realName:null, //真名
        phone:null, //电话号码
        address:null, //收货地址
      },

      /* 殡葬管理 */
      msg3: {
        name:null, //殡葬馆名
        phone:null, //殡葬电话号码
        address:null, //殡葬馆地址
      },

      /* 医生管理 */
      msg4: {
        realName:null, //医生真名
        major:null, //专业
      },
      /* 医院管理 */
      msg5: {
        hospitalName:null, //医院名
        phone:null,  //医院电话号码
        address:null, //医院地址
      },
      
      /* 商品上架 */
      msg6: {
        goodName:null,   //商品名称
        detail:null,  //商品描述
        goodPrice:null, //商品价格
        goodImg:null, //商品图片
        // isPut:'1',   //上架、下架
        goodKind:null,//商品种类
        goodUserKind:[],//使用商品的宠物种类
      },
      /*  购物车 */
      msg7: {
        num:1,
        userId:null,
        goodId:null,
        orderTotal:null,
      },
      /* 订单生成 */
      msg8: {
        userId: null,
        phone: null,
        realName: null,
        address: null,
        goodsList: null,
        orderTotal: null,
      },
    };
  },
  computed: {

  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.msg.goodImg = URL.createObjectURL(file.raw);
    },
    closeDilog:function(form){
        this.dialogFormVisible = false;
        this.$refs[form].resetFields();//将form表单重置
    },

    // 保存
    save () {
      let obj = {
        /* 个人信息 */
        username:this.msg1.username, 
        sex: this.msg1.sex, 
        phone: this.msg1.phone,        
        age:this.msg1.age, 
        userImg: this.msg1.userImg, 
        /* 收货地址 */
        realName:this.msg2.realName, 
        phone: this.msg2.phone, 
        address: this.msg2.address, 
        /* 殡葬管理 */
        name:this.msg3.name, 
        phone: this.msg3.phone, 
        address: this.msg3.address, 
        /* 医生管理 */
        realName:this.msg4.realName, 
        major: this.msg4.major,
        /* 医院管理 */
        hospitalName:this.msg5.hospitalName, 
        phone: this.msg5.phone, 
        address: this.msg5.address,
        /* 商品上架 */
        goodName: this.msg6.goodName, 
        goodPrice: this.msg6.goodPrice, 
        goodImg: this.msg6.goodImg, 
        // isPut:this.msg.isPut,
        detail:this.msg6.detail,
        goodKind:this.msg6.goodKind,//商品种类
        goodUserKind:this.msg6.goodUserKind, //使用商品的宠物种类

        /*  购物车 */
        num:this.msg7.num,
        userId:this.msg7.userId,
        goodId:this.msg7.goodId,
        orderTotal:this.msg7.orderTotal,
      
            /* 订单生成 */
        userId: this.msg8.userId,
        phone: this.msg8.phone,
        realName:  this.msg8.realName,
        address:  this.msg8.address,
        goodsList:  this.msg8.goodsList,
        orderTotal:  this.msg8.orderTotal,
      }

    },



  },
  created () {
  },
};
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-form-item__content{
    margin-left: 150px !important;
  }
</style>
<style>
.el-upload {
  background: #ebebeb !important
}

</style>
