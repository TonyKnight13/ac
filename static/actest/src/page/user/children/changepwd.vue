<template>
    <YShelf title="修改密码">
      <div slot="content">
        <el-form ref="psdForm" :model="psdForm" label-width="100px" :rules="rules" status-icon >
            <el-form-item label="密码" prop="pass"><!-- prop 属性为需校验的字段名 -->
              <el-input placeholder="请输入密码" v-model="psdForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input placeholder="请再输入密码" v-model="psdForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('psdForm')">提交</el-button>
              <el-button @click="resetForm('psdForm')">重置</el-button>
            </el-form-item>
        </el-form>        
      </div>

    </YShelf>

</template>
<script>
import YShelf from '@/components/shelf';

export default {
  name: 'changepwd',
  components:{
    YShelf
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.psdForm.checkPass !== '') {
          this.$refs.psdForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.psdForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      psdForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style scoped>
.main-content{
  width: 100%;
  height: 100%;
}
</style>
