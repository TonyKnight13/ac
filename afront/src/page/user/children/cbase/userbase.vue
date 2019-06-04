<template>
  <!-- <div class="main-wrap" > -->
    <YShelf title="个人资料">
      <div slot="content" class="content">
        <el-form :model="msg" :rules="rules" status-icon label-width="100px" style="width:80%;" ref="msg">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="msg.username"></el-input>
          </el-form-item>      
          <el-form-item label="真名" prop="username" >
            <el-input v-model="msg.realname"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex" >
              <el-radio v-model="msg.sex" label="0">男</el-radio>
              <el-radio v-model="msg.sex" label="1">女</el-radio>
          </el-form-item>     
          <el-form-item label="爱好" prop="hobby">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="msg.hobby">
            </el-input>          
          </el-form-item> 

          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="msg.phone"></el-input>
          </el-form-item> 
          <el-form-item label="地址">
            <el-input v-model="msg.phone"></el-input>
          </el-form-item> 
          <el-form-item label="专业" prop="major">
              <el-select v-model="msg.special" placeholder="专业">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>  
          <el-form-item label="用户简介" >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="msg.intro">
            </el-input>  
          </el-form-item> 
          <el-form-item label="用户头像" prop="userImg">
              <el-upload
                class="avatar-uploader" 
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="msg.userImg" :src="msg.userImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="save('msg')"> 保存</el-button>
            <el-button @click="resetForm('msg')">重置</el-button>  
          </el-form-item>   
        </el-form>
      </div>
    </YShelf>
  <!-- </div> -->
</template>
<script>
import { userInfo, userInfoUpdata} from '@/api/index'
import { getStore } from '@/utils/storage'
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
export default {
  name: 'userbase',
  components:{
    YShelf
  },
  data () {
    return {
      options:op2,
      identity:null,
      msg:{
        username:'',
        realname:'',
        sex: '0',
        hobby:'',
        userImg:null,
        /* 医生用户可见 */
        address:'',
        phone:'',
        special:'',
        intro:''
      },
      userId:'',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        // phone: [
        //   { required: true, message: '手机号不能为空', trigger: 'blur' },
        //   { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        // ],
        userImg:[
          {required: true, message: '头像不能为空', trigger: 'blur' }
        ]
      }

    };
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.msg.image = URL.createObjectURL(file.raw);
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //初始化用户信息
    _userInfo () {
      userInfo({userId: this.userId}).then(res => {
        if(res.data.code == 1 ){
          // if(res.data.username && res.data.sex && res.data.phone && res.data.userImg){
            this.msg = {
              username: res.data.username,
              realname:res.data.realname,
              sex: res.data.sex,
              hobby:res.data.hobby,
              userImg: res.data.coverUrl,

              phone: res.data.phone,
              address:res.data.address,
              special:res.data.special,
              intro:res.data.intro,
            }
          // }else{
          //   this.msg = {
          //     username: '',
          //     sex: '',
          //     phone: '',
          //     age: null,
          //     userImg:'',
          //   }
          // }
        }else{
          this.$message.error(res.data.message)
        }
      })
    },
        // 保存
    save () {
      this.$refs.msg.validate(valid=>{
        if(valid){
          let obj = {
            userId:this.userId,
            username:this.msg.username,
            realname:this.msg.realname,
            sex:parseInt(this.msg.sex) ,
            hobby:this.msg.hobby,
            coverUrl:this.msg.userImg,

            phone:this.msg.phone,
            address:this.msg.address,
            special:this.msg.special,
            intro:this.msg.intro,
           
          }
          this._userInfoUpdate(obj)
        }
      })
    },

    //修改信息
    _userInfoUpdate (params) {
      userInfoUpdate(params).then(res => {  
        this._userInfo() //修改完成后重新获取信息
      })
    },
  },
  created () {
    this.userId = getStore('userId')
    this._userInfo()
    this.identity =getStore("identity")
  },
}
</script>
<style scoped>
.content{
  margin-top: 0.2rem;
}
</style>
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

