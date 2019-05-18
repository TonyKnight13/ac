<template>
  <!-- <div class="main-wrap" > -->
    <YShelf title="个人资料">
      <div slot="content" class="content">
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
        <el-button
        @click="save({userId:userId,userName:formData.username,})"></el-button>
      </div>
    </YShelf>
  <!-- </div> -->
</template>
<script>
import YShelf from '../../components/shelf';
export default {
  name: 'userbase',
  components:{
    YShelf
  },
  data () {
    return {
      formData:{
        username:'',
        radio: '1',
        phone:'',
      },
      userId:'',
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
<style scoped>
.content{
  margin-top: 0.2rem;
}
</style>


