<template>
<div>
  <YShelf title="殡葬馆">
    <div slot="content" class="content">
        <!-- <div slot="content" class="md" :data-id="msg.addressId"> -->
          <el-form :model="msg" ref="msg" :rules="rules" status-icon style="width:80%;text-align:center" label-width="100px">
            <el-form-item label="殡葬馆名" prop="realname">
              <el-input placeholder="殡葬馆名" v-model="msg.realname"></el-input>
            </el-form-item>
            <el-form-item  label="电话号码" prop="phone">
              <el-input placeholder="电话号码" v-model="msg.phone"></el-input>
            </el-form-item>
            <el-form-item  label="殡葬馆地址" prop="address">
              <el-input placeholder="殡葬馆地址" v-model="msg.address"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="image">
              <el-upload
                class="avatar-uploader" 
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="msg.goodImg" :src="msg.goodImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item> -->
            <el-form-item>
              <el-button  @click="save('msg')">保存</el-button>
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
import { userInfo, userInfoUpdate} from '@/api/index'
import { getStore,setStore } from '@/utils/storage'
import YShelf from '@/components/shelf';
export default {
  components:{
    YShelf
  },
  data () {
    return {
      msg: {
        realname: '',
        address: '',
        phone: '',
        // image:null
      },
      userId: '',
      rules: {
        realname: [
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
  },
  methods: {
    // handleAvatarSuccess(res, file) {
    //   this.msg.image = URL.createObjectURL(file.raw);
    // },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //初始化殡葬馆信息
    _userInfo () {
      userInfo({userId: this.userId}).then(res => {
        let obj = JSON.parse(getStore("userInfo"))
        if(res.data.code == 1 ){
          // if(res.data.realname && res.data.address && res.data.phone){
            this.msg = {
              realname: obj.realname,
              address: obj.address,
              phone: obj.phone,
              
            }
          // }else{
          //   this.msg = {
          //     realname: '',
          //     address: '',
          //     phone: '',
          //     // image: null
          //   }
          // }
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    // 保存
    save (formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
          let obj = {
            userId:this.userId,
            realname:this.msg.realname,
            phone:this.msg.phone,
            address:this.msg.address
            }
            this._userInfoUpdate(obj)
          }
        })
    },

    //修改信息
    _userInfoUpdate (params) {
      setStore("userInfo",params)
      userInfoUpdate(params).then(res => {  
        this._userInfo() //修改完成后重新获取信息
      })
    },
  },
  created () {
    this.userId = getStore('userId')
    this._userInfo()
   
  },
};
</script>

<style scoped>
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