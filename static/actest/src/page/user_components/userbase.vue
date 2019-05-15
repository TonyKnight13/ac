<template>
  <div class="main-wrap">
    <h1>个人资料</h1>
    <div class="person-box">
      <el-form :v-model="formData" label-position="left" :rules="ruleInline" label-width="80px">
              
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>      
        <el-form-item label="性别" prop="sex" >
            <el-radio v-model="formData.radio" label="1">男</el-radio>
            <el-radio v-model="formData.radio" label="2">女</el-radio>
        </el-form-item>     
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>      
 

      </el-form>
      
    </div>
    
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData:{
        username:'',
        radio: '1',
        phone:'',
      },
      ruleInline: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        sex:[
          { required: true, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }

    };
  }
}
</script>


