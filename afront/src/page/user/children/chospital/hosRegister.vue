<template>
<div>
  <YShelf title="医院信息">
    <div slot="content" class="content">
        <!-- <div slot="content" class="md" :data-id="msg.addressId"> -->
          <el-form :model="msg" ref="msg" :rules="rules" status-icon style="width:80%;" label-width="100px">
            <el-form-item label="医院名称" prop="hospitalName">
              <el-input placeholder="医院名称" v-model="msg.hospitalName"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input placeholder="医院电话号码" v-model="msg.phone"></el-input>
            </el-form-item>            
            <el-form-item label="医院地址" prop="address">
              <el-input placeholder="医院地址" v-model="msg.address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  @click="save()">保存</el-button>
              <el-button @click="resetForm('msg')">重置</el-button>
            </el-form-item>
          </el-form>

        <!-- </div> -->
        <!-- <span>这是一段信息</span> -->


    </div>
  </YShelf>

</div>
</template>

<script>
import { hospitalInfo, hospitalInfoUpdate} from '@/api/index'
import { getStore } from '@/utils/storage'
import YShelf from '@/components/shelf';

export default {
  components:{
    YShelf
  },
  data () {
    return {
      msg: {
        hospitalName: '',
        phone:'',
        address:'',
      },
      userId: '',
      rules: {
        hospitalName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入医院地址', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.msg.image = URL.createObjectURL(file.raw);
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //初始化殡葬馆信息
    _hospitalInfo () {
      hospitalInfo({userId: this.userId}).then(res => {
        if(res.data.code == 1 ){
          if(res.data.hospitalName && res.data.phone && res.data.address){
            this.msg = {
              hospitalName: res.data.hospitalName,
              phone: res.data.phone,
              address: res.data.address
            }
          }else{
            this.msg = {
              hospitalName: '',
              phone:'',
              address:'',
            }
          }
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    // 保存
    save () {
      this.$refs.msg.validate(valid=>{
        if(valid){
          let obj = {
            userId:this.userId,
            hospitalName: this.msg.hospitalName,
            phone: this.msg.phone,
            address: this.msg.address,
            }
            this._hospitalInfoUpdate(obj)
          }
        })
    },

    //修改信息
    _hospitalInfoUpdate (params) {
      hospitalInfoUpdate(params).then(res => {  
        this._hospitalInfo() //修改完成后重新获取地址列表
      })
    },
  },
  created () {
    this.userId = getStore('userId')
    this._hospitalInfo()
  },
};
</script>

<style scoped>
  .content{
    margin-top: 0.5rem;
  }
  .avatar-uploader .el-upload {
    border: 1px solid #ebebeb;
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
<style>
.el-upload {
  background: #ebebeb !important
}
</style>