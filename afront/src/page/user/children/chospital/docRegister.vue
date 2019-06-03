<template>
<div>
  <YShelf title="医生信息">
    <div slot="content" class="content">
        <!-- <div slot="content" class="md" :data-id="msg.addressId"> -->
          <el-form :model="msg" ref="msg" :rules="rules" status-icon style="width:80%;" label-width="100px">
            <el-form-item label="姓名" prop="realName">
              <el-input placeholder="姓名" v-model="msg.realName"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
                <el-select v-model="msg.major" multiple collapse-tags placeholder="专业">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>   

            <el-form-item>
              <el-button  @click="save()">保存</el-button>
              <el-button @click="resetForm('msg')">重置</el-button>
            </el-form-item>
          </el-form>

        <!-- </div> -->
        <!-- <span>这是一段信息</span> -->


    </div>
  </YShelf>

</div>
</template>

<script>
import { doctuorInfo, doctuorInfoUpdate} from '@/api/index'
import { getStore } from '@/utils/storage'
import YShelf from '@/components/shelf';
var op2 = [{
          value: '狗',
          label: '狗'
        }, {
          value: '猫',
          label: '猫'
        }, {
          value: '兔',
          label: '兔'
        }, {
          value: '鸟',
          label: '鸟'
        }, {
          value: '小型',
          label: '小型'
        }, {
          value: '水生',
          label: '水生'
        }, {
          value: '两栖',
          label: '两栖'
        }, {
          value: '其他宠物',
          label: '其他宠物'
        }];

export default {
  components:{
    YShelf
  },
  data () {
    return {
      options:op2,
      msg: {
        realName: '',
        major:[],
      },
      userId: '',
      rules: {
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请选择专业', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.msg.image = URL.createObjectURL(file.raw);
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //初始化殡葬馆信息
    _doctuorInfo () {
      doctuorInfo({userId: this.userId}).then(res => {
        if(res.data.code == 1 ){
          if(res.data.realName && res.data.major){
            this.msg = {
              realName: res.data.realName,
              major: res.data.major,
            }
          }else{
            this.msg = {
              realName:null,
              major:[],
            }
          }
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    // 保存
    save () {
      this.$refs.msg.validate(valid=>{
        if(valid){
          let obj = {
            userId:this.userId,
            realName: this.msg.realName,
            major: this.msg.major,
            }
            this._doctuorInfoUpdate(obj)
          }
        })
    },

    //修改信息
    _doctuorInfoUpdate (params) {
      doctuorInfoUpdate(params).then(res => {  
        this._doctuorInfo() //修改完成后重新获取地址列表
      })
    },
  },
  created () {
    this.userId = getStore('userId')
    this._doctuorInfo()
  },
};
</script>

<style scoped>
  .content{
    margin-top: 0.5rem;
  }
  .avatar-uploader .el-upload {
    border: 1px solid #ebebeb;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style>
.el-upload {
  background: #ebebeb !important
}
</style>