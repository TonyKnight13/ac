<template>
  <div class="main-wrap">
    <div class="add-title">
      <h1>添加收货地址</h1>
    </div>
    <div class="add-box">
      <el-form :v-model="formData" label-position="left" :rules="ruleInline" label-width="80px">
        <el-form-item label="收件人" prop="name">
          <el-input v-model="formData.name" size="large"></el-input>
        </el-form-item>
        <el-form-item label="收件地区" prop="address">
          <v-distpicker :province="formData.province" :city="formData.city" :area="formData.area" @province="getProvince" @city="getCity" @area="getArea"></v-distpicker>
        </el-form-item>
        <el-form-item label="收件地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>      
        <el-form-item label="邮政编码" prop="postalcode">
          <el-input v-model="formData.postalcode"></el-input>
        </el-form-item>    
      </el-form>
    </div>
    <div class="add-submit">
      <el-button type="primary" @click="handleSubmit('formInline')">添加地址</el-button>
    </div>
  </div>
</template>
<script>
// import Distpicker from  'v-distpicker';
import store from '../../store/index.js';
import { mapActions } from 'vuex';
export default {
  name:'addAddress',
  // components:{
  //   Distpicker
  // },
  store,
  data() {
    return {
      formData:{
        name:'',
        address:'',
        phone: '',
        postalcode: '',
        province: '浙江省',
        city: '杭州市',
        area: '江干区'
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        postalcode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['addAddress']),
    
    getProvince (data) {
      this.formData.province = data.value;
    },
    getCity (data) {
      this.formData.city = data.value;
    },
    getArea (data) {
      this.formData.area = data.value;
    },
     handleSubmit (name) {
      // const father = this;
      console.log(this.formData.name);
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addAddress(this.formData).then(data => {
            if (data) {
              this.$Message.success('添加成功');
              this.$router.push('/home/myAddress');
            } else {
              this.$Message.error('添加失败，请重新尝试');
            }
          });
        } else {
          this.$Message.error('请填写正确的地址信息');
        }
      });
    }
  },
}
</script>
<style scoped>
.add-container {
  margin: 0.15rem auto;
  width: 60%;
  min-width: 6rem;
}
.add-title {
  margin-bottom: 0.15rem;
  text-align: center;
}
.add-submit {
  display: flex;
  justify-content: center;
}
.el-input{
  width: 60%;
}
.distpicker-address-wrapper{
  width: 100%;
  font-size: 0.16rem;
}
.distpicker-address-wrapper select:nth-child(1){
  width: 50%;
}
.distpicker-address-wrapper select:nth-child(2){
  margin-left: 2rem !important;
}
.distpicker-address-wrapper select:nth-child(2), .distpicker-address-wrapper select:nth-child(3){
  width: 25%;
}


</style>