<template>
  <div class="wrapper">
    <div class="main">
      <div class="signHeader">
        <img src="../assets/images/ac.png" style="height:82.5px;width:176px;">
        <span>爱宠社区 ，宠你所爱</span>
      </div>
      <el-form :model='form' style="padding:0 40px" status-icon :rules="rules" ref="form">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="请输入用户名" required autofocus value></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input v-model="form.pass" placeholder="请输入密码" show-password required autofocus value></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="form.checkPass" placeholder="请确认密码" show-password required autofocus value></el-input>
        </el-form-item>
        <el-form-item prop="identity"> 
          <el-select v-model="form.identity" placeholder="请选择身份">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button 
          type="primary" 
          @click="regist('form')" 
          style="width:100%;border: #FFB90F;background: #FFB90F;"
          >{{registxt}}</el-button>
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
import { register} from '@/api/index.js'
export default {
  name:"regist",
  components:{

  },
  data() {
    // <!--验证用户是否为空-->
    let checkName = (rule, value, callback) => {
      if (value === '') {
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
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      options: [{
          value: '0',
          label: '普通用户'
        }, {
          value: '1',
          label: '商家用户'
        }, {
          value: '2',
          label: '医方用户'
        }],
      form:{
        account:'',
        pass:'',
        checkPass:'',
        identity:null, //身份标签
      },
      loading:false,
      registxt:'注册',
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        account: [{ validator: checkName, trigger: 'blur' }],
        identity: [{  required: true, message: '请选择身份', trigger: 'blur'  }],
      },
    }
  },
  methods: {
    regist(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          this.loading=true;
          register({
            account:this.form.account,
            password1:this.form.pass,
            password2:this.form.checkPass,
            identity:this.form.identity
          }).then(res=>{
            console.log(res)
            if(res.data.code === 1){  //后台返回信息中code==1 注册成功
              this.$message.success(res.data.message);
              this.$router.replace({path:'/login'})
            }else{
              this.$message.error(res.data.message);
              this.loading  = false;
              return false;
            }
          })
        }else{
          this.loading=false;
          return false;
        }
      })
       
    }
  },
}
</script>
<style scoped>
.wrapper{
  width: 100%;
  min-height: 9.37rem;
  height: 100%;
  background:url('../assets/images/background/1.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main{
  position: relative;
  height: 520px;
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
