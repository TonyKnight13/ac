<template>
  <div class="wrapper">
    <div class="main">
      <div class="signHeader">
        <!-- <img src="../assets/images/ac.png" style="height:82.5px;width:176px;"> -->
        <!-- <span>爱宠社区 ，宠你所爱</span> -->
      </div>
      <el-form :model='loginForm' :rules="loginRules" ref="loginForm" style="padding:0 40px" status-icon>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" required autofocus value></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" show-password required autofocus value></el-input>
        </el-form-item>
        <el-form-item style="margin-top:80px;">
          <el-button 
          type="primary" 
          @click.native.prevent="handleLogin" 
          :loading="loading" 
          style="width:100%;background: #FFB90F;border: #FFB90F;">登录</el-button>
        </el-form-item>
      </el-form>
      <!-- <router-link to="" class="forget-password">忘记密码？</router-link> -->
      <div class="switch">
        没有帐号?&nbsp;<router-link to="regist" style="color:#175199">注册</router-link>
      </div>
      <el-button class="iconfont" @click="toHome">&#xe600;</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions,mapState } from 'vuex';
// import { USER_SIGNIN } from '../store/user.js'
import { userLogin } from '@/api/index.js';
import { setStore, getStore, removeStore } from '../utils/storage';
var captcha;
export default {
  name:"login",
  components:{

  },
  data() {
    // <!--验证用户是否为空-->
    let checkName = (rule, value, callback) => {
      if (value ==="") {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入密码"))
      } else {
        callback()
      }
    } 
    return {
      loading:'false',
      loginForm:{
        username:'',
        password:''
      },
      loginRules: {
        username: [
          { validator: checkName, trigger: 'blur'},
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
         password: [{ validator: validatePass, trigger: 'blur',}]
      },
      loading: false,

    }
  },
  computed:{
    count(){
      return this.$store.state.login
    }
  },
  methods: {

    handleLogin(){
      this.$refs.loginForm.validate(valid=>{
        if(valid){
          // this.disabled=true;
          this.loading=true;
          userLogin({
            username:this.loginForm.username,
            password:this.loginForm.password,
          }).then(res=>{
            console.log(res.data)
           
            // if(res.success === true){  //后台返回信息中success：true
            //   this.successMsg()
            //   this.$router.replace({path:'/login'})
            // }else{
            //   this.errorMsg(res.message)
            //   this.loading  = false;
            //   this.disabled=false;
            //   return false;
            // }
          })
        }else{
          // this.registxt  = '注册';
          // this.disabled=false;
          return false;
        }
      })
    },
    toHome(){
      this.$router.push({
        path:'/'
      })
    }
  },

}
</script>
<style scoped>
.wrapper{
  width: 100%;
  min-height: 10rem;
  height: 100%;
  /* background:url('../assets/images/background/1.jpg') no-repeat center center fixed; */
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main{
  position: relative;
  height: 500px;
  width: 450px;
  margin: 1rem 0;
  border: 1px solid white;
  background-color: #ffffff63; 
}
.signHeader{
  margin: 30px auto 0 auto;
  color: #FFB90F;
  font-family: "黑体";
  font-size: 23px;
  display: flex;
  flex-direction: column ;
  align-items: center;
}
.signHeader span{
  margin: 0.2rem auto 0.2rem auto;
}
.forget-password{
  position: absolute;
  top: 300px;
  right: 40px;
  font-size: 16px;
  color: #175199;
}
.switch{
  width: 100%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #ebebeb;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.iconfont{
  position: fixed;
  bottom: 0.5rem;
  right: 1rem;
}
</style>
