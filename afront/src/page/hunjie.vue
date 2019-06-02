<template>
<div>
  <YShelf title="商品管理">
    <div slot="content" class="content" label-width="100px" >
        <el-form :model="msg" ref="msg" >
          <!-- 个人信息 -->
          <el-form-item label="用户名" >
            <el-input v-model="msg.username"></el-input>
          </el-form-item> 
          <el-form-item label="性别" >
              <el-radio v-model="msg.sex" label="0">男</el-radio>
              <el-radio v-model="msg.sex" label="1">女</el-radio>
          </el-form-item>     
          <el-form-item label="用户手机号码">
            <el-input v-model="msg.phone1"></el-input>
          </el-form-item> 
          <el-form-item label="年龄">
            <el-input v-model="msg.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="msg.goodImg" :src="msg.userImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          
          <!-- 收货地址 -->
          <el-form-item>
            <el-input placeholder="收货人姓名" v-model="msg.realName1"></el-input>
          </el-form-item>
          <el-form-item label="收货手机号码">
            <el-input v-model="msg.phone2"></el-input>
          </el-form-item> 
          <el-form-item >
            <el-input placeholder="收货地址" v-model="msg.address1"></el-input>
          </el-form-item>

          <!-- 殡葬管理 -->
          <el-form-item>
            <el-input placeholder="殡葬馆名" v-model="msg.name"></el-input>
          </el-form-item>
          <el-form-item label="殡葬电话号码">
            <el-input v-model="msg.phone3"></el-input>
          </el-form-item> 
          <el-form-item >
            <el-input placeholder="殡葬馆地址" v-model="msg.address2"></el-input>
          </el-form-item>


          <!-- 医生管理 -->
          <el-form-item label="医生名字">
            <el-input placeholder="医生名字" v-model="msg.realName2"></el-input>
          </el-form-item>
          <el-form-item label="专业">
              <el-select v-model="msg.major" multiple collapse-tags placeholder="专业">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>         


          <!-- 医院管理 -->
          <el-form-item>
            <el-input placeholder="医院名称" v-model="msg.hospitalName"></el-input>
          </el-form-item>
          <el-form-item label="医院电话号码">
            <el-input v-model="msg.phone4"></el-input>
          </el-form-item> 
          <el-form-item >
            <el-input placeholder="医院地址" v-model="msg.address3"></el-input>
          </el-form-item>

          <!-- 商品上架 -->
          <el-form-item >
            <el-input placeholder="商品名称" v-model="msg.goodName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="textarea" placeholder="商品描述" :rows="2" v-model="msg.detail"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="商品单价(￥)" v-model="msg.goodPrice"></el-input>
          </el-form-item>
          <el-form-item >
            <el-select v-model="msg.goodKind" placeholder="商品种类">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
              <el-select v-model="msg.goodUserKind" multiple collapse-tags placeholder="宠物种类">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item >
              <el-radio v-model="msg.isPut" label="0">下架</el-radio>
              <el-radio v-model="msg.isPut" label="1">上架</el-radio>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="msg.goodImg" :src="msg.goodImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 零散的 -->
          <el-form-item >
            <el-input-number v-model="msg.num" :min="1" :max="10" label="商品数量"></el-input-number>
          </el-form-item>

          <el-form-item >
            <el-input-number v-model="msg.orderTotal" label="订单总价格"></el-input-number>
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
      options2: op2,
      msg: {
        /* 个人信息 */
        username:null, //用户名
        sex: '1', //性别
        phone1:null, //电话
        age:null,//年龄
        userImg:null,

        /* 收货地址 */
        realName:null, //真名
        phone2:null, //电话号码
        address:null, //收货地址

        /* 殡葬管理 */
        name:null, //殡葬馆名
        phone3:null, //殡葬电话号码
        address2:null, //殡葬馆地址

        /* 医生管理 */
        realName2:null, //医生真名
        options3:op2, //专业
        
        /* 医院管理 */
        hospitalName:null, //医生真名
        phone4:null,  //医院电话号码
        address3:null, //医院地址

        /* 商品上架 */
        goodName:null,   //商品名称
        detail:null,  //商品描述
        goodPrice:null, //商品价格
        goodImg:null, //商品图片
        isPut:'1',   //上架、下架
        goodKind:null,//商品种类
        goodUserKind:[],//使用商品的宠物种类

        /* 订单生成 购物车生成额外用到的 */
        num:1,
        orderTotal:null,
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
        goodId:this.msg.goodId,
        goodImg:this.msg.goodImg,
        goodName:this.msg.goodName,
        goodPrice:this.msg.goodPrice,
        isPut:this.msg.isPut,
        detail:this.msg.detail,
        goodKind:this.msg.goodKind,//商品种类
        goodUserKind:this.msg.goodUserKind//使用商品的宠物种类
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
</style>
