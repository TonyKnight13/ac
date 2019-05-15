<template>
  <div class="main-wrap">
    <div class="add-title">
      <h1>添加收货地址</h1>
    </div>
    <div class="add-box">
      <el-form :v-model="formData" label-position="left" :label-width="100" :rules="ruleInline">
        <el-form-item label="收件人" prop="name">
          <el-input v-model="formData.name" size="large"></el-input>
        </el-form-item>
        <el-form-item label="收件地区" prop="address">
          <Distpicker :province="formData.province" :city="formData.city" :area="formData.area" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
        </el-form-item>
        <el-from-item label="收件地址" prop="address">
          <el-input v-model="formData.address" size="large"></el-input>
        </el-from-item>
        <el-from-item label="手机号码" prop="phone">
          <el-input v-model="formData.phone" size="large"></el-input>
        </el-from-item>      
        <el-from-item label="邮政编码" prop="postalcode">
          <el-input v-model="formData.postalcode" size="large"></el-input>
        </el-from-item>    
      </el-form>
    </div>
    <div class="add-submit">
      <el-button type="primary">添加地址</el-button>
    </div>
  </div>
</template>
<script>
import Distpicker from  'v-distpicker';
import store from 
export default {
  name:'addAddress',
    components:{
    Distpicker
  },
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
    getProvince (data) {
      this.formData.province = data.value;
    },
    getCity (data) {
      this.formData.city = data.value;
    },
    getArea (data) {
      this.formData.area = data.value;
    }
  },
}
</script>
<style scoped>
.add-container {
  margin: 15px auto;
  width: 60%;
  min-width: 600px;
}
.add-title {
  margin-bottom: 15px;
  text-align: center;
}
.add-submit {
  display: flex;
  justify-content: center;
}
</style>