<template>
  <div class="wrapper">
    <div class="main">
      <div class="signHeader">
        <img src="../assets/images/ac.png" style="height:82.5px;width:176px;">
        <span>爱宠社区 ，宠你所爱</span>
      </div>
      <el-form :model='loginForm' :rules="loginRules" ref="loginForm" style="padding:0 40px" status-icon>
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="请输入用户名" required autofocus value></el-input>
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
import { mapMutations,mapState } from 'vuex';// 将 `this.add_cart()` 映射为 `this.$store.commit('add_cart')`  `this.add_cart()` 映射为 `this.$store.dispatch('add_cart')`
import { userLogin } from '@/api/index.js';
import { setStore, getStore, removeStore } from '../utils/storage';
var captcha;
export default {
  name:"login",
  components:{

  },
  data() {
    // <!--验证账号是否为空-->
    let checkAccount = (rule, value, callback) => {
      if (value ==="") {
        callback(new Error('请输入手机号或邮箱'))
      } else {
          if (value !== '') { 
            let reg1=/^1[3456789]\d{9}$/;
            let reg2=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(!reg1.test(value) && !reg2.test(value)){
              callback(new Error('请输入有效的手机号码或邮箱'));
            }
          }
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
        account:'',
        password:''
      },
      loginRules: {
        account: [
          { validator: checkAccount, trigger: 'blur',},
        ],
        password: [{ validator: validatePass, trigger: 'blur',}]
      },
      loading: false,

    }
  },
  computed:{
    // count(){
    //   return this.$store.state.isLogin
    // }
  },
  methods: {
    ...mapMutations(['SET_TOKEN','GET_USERID']),
    handleLogin(){
      this.$refs.loginForm.validate(valid=>{
        if(valid){
          // this.disabled=true;
          this.loading=true;
          userLogin({
            account:this.loginForm.account,
            password:this.loginForm.password,
          }).then(res=>{
            //登录失败,先不讨论
            if (res.data.code == 0) {
              //element的友好提示
              this.$message.error(res.data.message);
              this.loading=false;
            //登录成功
            } else {
              this.GET_USERID(res.data.id);
              // this.SET_TOKEN(res.data.token);
              console.log(res.data)
              setStore('userName', res.data.account)
              setStore('identity',res.data.identity)
              //element的友好提示
              this.$message.success(res.data.message);
              //登录成功后跳转到指定页面
              this.$router.replace("/");
              if(res.data.identity == '1'){ //如果是商家用户，则新开一个窗口并跳转到聊天室页面
                let route =this.$router.resolve({path: '/chart'});
                window.open(route.href,'_blank')
              }
            }
          })
        }else{
          this.disabled=false;
          return false;
        }
      })
    },
    toHome(){
      this.$router.push({
        path:'/'
      })
    },
  },
  mounted(){  //在html渲染完后加载
  }
}
</script>
<style scoped>
.wrapper{
  width: 100%;
  min-height: 10rem;
  height: 100%;
  background:url('../assets/images/background/1.jpg') no-repeat center center fixed;
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
