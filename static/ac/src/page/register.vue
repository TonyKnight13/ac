<template>
  <div class="wrapper">
    <div class="main">
      <div class="signHeader">
        <img src="../assets/images/ac.png" style="height:82.5px;width:176px;">
        <span>爱宠社区 ，宠你所爱</span>
      </div>
      <el-form :model='form' style="padding:0 40px">
        <el-form-item>
          <el-input v-model="form.phone" placeholder="请输入手机号" required autofocus value></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="请输入密码" show-password required autofocus value></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="请确认密码" show-password required autofocus value></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="onSubmit" style="width:100%;background: #FFB90F;border: #FFB90F;">注册</el-button>
        </el-form-item>
      </el-form>
      <!-- <router-link to="" class="forget-password">忘记密码？</router-link> -->
      <div class="switch">
        已有帐号!&nbsp;<router-link to="login">登录</router-link>
      </div>
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
    return {
      form:{
        phone:'',
        password:''
      }
    }
  },
  methods: {
    onSubmit(){

    }
  },
}
</script>
<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  background:url('../assets/images/2.jpg') no-repeat;
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
</style>
