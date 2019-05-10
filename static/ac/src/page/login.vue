<template>
  <div class="wrapper">
    <div class="main">
      <div class="signHeader">
        <img src="../assets/images/ac.png" style="height:82.5px;width:176px;">
        <span>爱宠社区 ，宠你所爱</span>
      </div>
      <el-form :model='form' :rules="loginRules" ref="loginForm" style="padding:0 40px">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" autoComplete="on" required autofocus value></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" @keyup.enter.native="handleLogin" show-password required autofocus value></el-input>
        </el-form-item>
        <el-form-item style="margin-top:80px;">
          <el-button type="primary" @click.native.prevent="handleLogin" :loading="loading" style="width:100%;background: #FFB90F;border: #FFB90F;">登录</el-button>
        </el-form-item>
      </el-form>
      <router-link to="" class="forget-password">忘记密码？</router-link>
      <div class="switch">
        没有帐号?&nbsp;<router-link to="regist" style="color:#175199">注册</router-link>
      </div>
      <el-button class="iconfont" @click="toHome">&#xe600;</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions,mapState } from 'vuex'
export default {
  name:"login",
  components:{

  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length<1) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.trim().length < 1) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    };  
    return {
      form:{
        name:'',
        password:''
      },
      loginRules: {
        name: [{required: true, f: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      loading: false,

    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.form).then(() => {
            this.loading = false;
            this.$router.push({path: '/'});
          }).catch((e) => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
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
