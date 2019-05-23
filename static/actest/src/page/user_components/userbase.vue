<template>
  <!-- <div class="main-wrap" > -->
    <YShelf title="个人资料">
      <div slot="content" class="content">
        <el-form :v-model="formData" :rules="rules" label-width="100px" style="width:70%">
          <el-form-item label="用户名" prop="username" >
            <el-input v-model="formData.username"></el-input>
          </el-form-item>      
          <el-form-item label="性别" prop="sex" >
              <el-radio v-model="formData.radio" label="man">男</el-radio>
              <el-radio v-model="formData.radio" label="woman">女</el-radio>
          </el-form-item>     
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item> 
          <el-form-item label="年龄" prop="age">
            <el-input v-model="formData.age"></el-input>
          </el-form-item> 
          <el-form-item>
            <el-button
            @click="save('formData')">
            保存</el-button>
          </el-form-item>     
        </el-form>
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
        radio: 'man',
        phone:'',
        age:'',
      },
      userId:'',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        sex:[
          { required: true, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        age:[
          {type: 'number', message: '年龄必须为数字值',trigger: 'blur' }
        ]
      }

    };
  },
  methods:{
    save(formName){
            console.log('error submit!!');
    }
  }
}
</script>
<style scoped>
.content{
  margin-top: 0.2rem;
}
</style>


