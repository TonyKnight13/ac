<template>
<div>
  <YShelf title="收货地址">
    <span slot="right"><el-button style="margin: 0" @btnClick="update()">添加收货地址</el-button></span>
    <div slot="content" class="content">
      <div class="content-title">
        <span class="name">姓名</span>
        <span class="address">地址</span>
        <span class="phont">电话</span>
      </div>
      <div v-if="addressList.length">
        <div class="address-item" v-for="(addItem,index) in addressList" :key="index">
          <div class="name">{{addItem.realName}}</div>
          <div class="address">{{addItem.address}}</div>
          <div class="phone">{{addItem.phone}}</div>
          <div class="operation">
            <el-button type="primary" icon="edit" size="small"  @click="update(addItem)"></el-button>
            <el-button type="danger" icon="delete" size="small" :data-id="addItem.addressId" @click="del(item.addressId,i)"></el-button>
          </div>
        </div>
      </div>
      <div v-else>
        <div style="padding: 80px 0;text-align: center">
          <div style="font-size: 20px">你还未添加收货地址</div>
          <div style="margin: 20px ">
            <el-button @click="dialogVisible = true">添加地址</el-button>
          </div>
        </div>
      </div>
    </div>
  </YShelf>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center @close="closeDilog('msg')">
      <!-- <div slot="content" class="md" :data-id="msg.addressId"> -->
        <el-form :model="msg" ref="msg" :rules="rules" :data-id="msg.addressId">
          <el-form-item prop="realName">
            <el-input placeholder="收货人姓名" v-model="msg.realName"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input placeholder="手机号码" v-model="msg.phone"></el-input>
          </el-form-item>
          <el-form-item prop="address">
            <el-input placeholder="收货地址" v-model="msg.address"></el-input>
          </el-form-item>
        </el-form>
        <el-button 
        class="btn"
        :disabled=trueORfalse
        @click="save({userId:userId,addressId:msg.addressId,realName:msg.realName,phone:msg.phone,address:msg.address})">
        保存</el-button>

      <!-- </div> -->
      <!-- <span>这是一段信息</span> -->
    </el-dialog>
</div>
</template>

<script>
// import { addressList, addressUpdate, addressAdd, addressDel } from '/api/goods'
// import { getStore } from '/utils/storage'
import YShelf from '@/components/shelf';
export default {
  name: 'MyAddress',
  components:{
    YShelf
  },
  data () {
    return {
      addressList:[],
      dialogTitle:"修改收货地址",
      dialogVisible:true,
      msg: {
        addressId: '',
        realName: '',
        address: '',
        phone: '',
      },
      userId: '',
      rules: {
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    trueORfalse () {
      let msg = this.msg
      
      return  !Boolean(msg.addressId && msg.phone && msg.address)
    }
  },
  methods: {
    closeDilog:function(form){
        this.dialogFormVisible = false;
        this.$refs[form].resetFields();//将form表单重置
    },
  //   message (m) {
  //     this.$message.error({
  //       message: m
  //     })
  //   },
  //   _addressList () {
  //     addressList({userId: this.userId}).then(res => {
  //       let data = res.result
  //       if (data.length) {
  //         this.addList = res.result
  //         this.addressId = res.result[0].addressId || '1'
  //       } else {
  //         this.addList = []
  //       }
  //     })
  //   },
  //   _addressUpdate (params) {
  //     addressUpdate(params).then(res => {
  //       this._addressList()
  //     })
  //   },
  //   _addressAdd (params) {
  //     addressAdd(params).then(res => {
  //       if (res.success === true) {
  //         this._addressList()
  //       } else {
  //         this.message(res.message)
  //       }
  //     })
  //   },

  //   // 保存
  //   save (obj) {
  //     this.popupOpen = false
  //     if (obj.addressId) {
  //       this._addressUpdate(obj)
  //     } else {
  //       delete obj.addressId
  //       this._addressAdd(obj)
  //     }
  //   },

  //   // 删除
  //   del (addressId, i) {
  //     addressDel({addressId: addressId}).then(res => {
  //       if (res.success === true) {
  //         this.addressList.splice(i, 1)
  //       } else {
  //         this.message('删除失败')
  //       }
  //     })
  //   },

  //   // 修改
  //   update(item){
  //     this.dialogVisible=true;
  //     if(item){
  //       this.dialogTitle = '修改收货地址'
  //       this.msg.name = item.name
  //       this.msg.phone = item.phone
  //       this.msg.address = item.address
  //       this.msg.addressId = item.addressId
  //     }else {
  //       this.popupTitle = '新增收货地址'
  //       this.msg.name = ''
  //       this.msg.phone = ''
  //       this.msg.address = ''
  //       this.msg.addressId = ''
  //     }
  //   }
  // },
  // created () {
  //   this.userId = getStore('userId')
  //   this._addressList()
  },
};
</script>

<style scoped>
.content-title{
  position: relative;
  z-index: 1;
  line-height: 0.8rem;
  height: 0.8rem;
  padding: 0 0 0 0rem;
  font-size: 12px;
  background: #eee;
  border-bottom: 1px solid #dbdbdb;
  border-bottom-color: rgba(0, 0, 0, .08);
}
.content-title span {
  text-align: center;
  color: #838383;
  width: 3rem;
  display: inline-block;
}
.content-title .address {
  width: 5rem
}
.content-title .tel {

}

.operation{
  width: 1rem;
}
</style>
