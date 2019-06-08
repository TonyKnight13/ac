<template>
  <!-- <div class="main-wrap" > -->
    <YShelf title="个人资料">
      <div slot="content" class="content">
        <el-form :model="msg" :rules="rules" status-icon label-width="100px" style="width:80%;" ref="msg">
          <el-form-item label="用户名(医院用户，殡葬用户请填医院名或殡葬馆名)" prop="Username">
            <el-input v-model="msg.Username"></el-input>
          </el-form-item>      
          <el-form-item label="真名" prop="Realname" v-if="identity==0||identity==2">
            <el-input v-model="msg.Realname"></el-input>
          </el-form-item>           
          <el-form-item label="性别" v-if="identity==0||identity==2">
              <el-radio v-model="msg.Sex " label="0">男</el-radio>
              <el-radio v-model="msg.Sex " label="1">女</el-radio>
          </el-form-item>     
          <el-form-item label="电话号码" prop="Phone">
            <el-input v-model="msg.Phone "></el-input>
          </el-form-item> 
          <el-form-item label="地址" prop="Address" v-if="identity==3||identity==4">
            <el-input v-model="msg.Address"></el-input>
          </el-form-item>           
          <el-form-item label="用户简介" >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="msg.Intro">
            </el-input>  
          </el-form-item> 
          <el-form-item label="爱好" v-if="identity==0||identity==2">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="msg.Hobby">
            </el-input>          
          </el-form-item> 
          <el-form-item label="专业" prop="Special" v-if="identity == 2">
              <el-select v-model="msg.Special" placeholder="专业">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>  
          <el-form-item label="省份" prop="Province" v-if="identity == 0||identity == 2||identity == 3||identity == 4">
              <el-select v-model="msg.Province" placeholder="专业">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>  
          <el-form-item label="用户头像" prop="Img">
              <input @change="uploadPhoto($event)" type="file" class="kyc-passin">
              <img :src="msg.Img" alt="">
          </el-form-item>

          <el-form-item>
            <el-button @click="save('msg')"> 保存</el-button>
            <el-button @click="resetForm('msg')">重置</el-button>  
          </el-form-item>   
        </el-form>
      </div>
    </YShelf>
  <!-- </div> -->
</template>
<script>
import { userInfo, userInfoUpdate} from '@/api/index'
import { getStore, setStore } from '@/utils/storage'
import YShelf from '@/components/shelf';
var op1 = [{
          value: '北京市',
          label: '北京市'
        }, {
          value: '天津市',
          label: '天津市'
        }, {
          value: '上海市',
          label: '上海市'
        }, {
          value: '重庆市',
          label: '重庆市'
        }, {
          value: '河北省',
          label: '河北省'
        }, {
          value: '山西省',
          label: '山西省'
        }, {
          value: '台湾省',
          label: '台湾省'
        }, {
          value: '辽宁省',
          label: '辽宁省'
        }, {
          value: '吉林省',
          label: '吉林省'
        }, {
          value: '黑龙江省',
          label: '黑龙江省',
        }, {
          value: '江苏省',
          label: '江苏省'
        }, {
          value: '浙江省',
          label: '浙江省'
        }, {
          value: '安徽省',
          label: '安徽省'
        }, {
          value: '福建省',
          label: '福建省'
        }, {
          value: '江西省',
          label: '江西省'
        }, {
          value: '山东省',
          label: '山东省'
        }, {
          value: '河南省',
          label: '河南省'
        }, {
          value: '湖北省',
          label: '湖北省'
        }, {
          value: '湖南省',
          label: '湖南省'
        }, {
          value: '湖北省',
          label: '湖北省'
        }, {
          value: '广东省',
          label: '广东省'
        }, {
          value: '甘肃省',
          label: '甘肃省'
        }, {
          value: '四川省',
          label: '四川省'
        }, {
          value: '贵州省',
          label: '贵州省'
        }, {
          value: '海南省',
          label: '海南省'
        }, {
          value: '云南省',
          label: '云南省'
        }, {
          value: '青海省',
          label: '青海省'
        }, {
          value: '陕西省',
          label: '陕西省'
        }, {
          value: '广西壮族自治区',
          label: '广西壮族自治区'
        }, {
          value: '西藏自治区',
          label: '西藏自治区'
        }, {
          value: '宁夏回族自治区',
          label: '宁夏回族自治区'
        }, {
          value: '新疆维吾尔自治区',
          label: '新疆维吾尔自治区'
        }, {
          value: '内蒙古自治区',
          label: '内蒙古自治区'
        }];
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
      options2:op1,
      identity:null,
      msg:{
        Username :'',
        Realname :'',
        Sex : null,
        Phone:'',
        Hobby:'',
        Province:'',
        Img:null,
        Address:'',
        
        Special:'',
        Intro:''
      },
      userId:'',
      rules: {
        Username : [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        // Realname :[
        //   { required: true, message: '请输入真名', trigger: 'blur' }
        // ],
        // Address:[
        //   { required: true, message: '请输入地址', trigger: 'blur' }
        // ],
        // Special:[
        //   { required: true, message: '请输入专业', trigger: 'blur' }
        // ],
        Phone : [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        // Img:[
        //   {required: true, message: '头像不能为空', trigger: 'blur' }
        // ]
      }
    };
  },
  methods:{
    uploadPhoto (e) {
        // 利用fileReader对象获取file
        var file = e.target.files[0];
        var filesize = file.size;
        var filename = file.name;
        // 2,621,440   2M
        if (filesize > 2101440) {
            // 图片大于2MB
            alert("图片过大")
            return false
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
            var imgcode = e.target.result;
            this.msg.Img=imgcode
            console.log(this.msg.Img);
        }
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //初始化用户信息
    _userInfo () {
      userInfo({userId: this.userId}).then(res => {
        // let obj = JSON.parse(getStore("userInfo"))
        // console.log(obj)
        let obj = res.data.data
        if(res.data.code == 1 ){
          // if(res.data.Username  && res.data.Sex  && res.data.Phone  && res.data.Img){
            this.msg = {
              Username : obj.Username,
              Realname :obj.Realname,
              Sex : String(obj.Sex),
              Phone : obj.Phone,
              Hobby : obj.Hobby,
              Img: obj.Img,
              Address : obj.Address,
              Special : obj.Special, //医生专业
              Province : obj.Province, //省份
              Intro : obj.Intro, //
            }
        }else{
            this.msg = {
              Username : null,
              Realname :null,
              Sex : null,
              Phone : null,
              Hobby : null,
              Img: null,
              Address : null,
              Special : null, //医生专业
              Province : null, //省份
              Intro : null, //
            }
           this.$message.error(res.data.message)
        }
      })
    },
        // 保存
    save (formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
          var obj = {
            userId:this.userId,
            Username :this.msg.Username ,
            Realname :this.msg.Realname ,
            Sex :parseInt(this.msg.Sex ) ,
            Hobby:this.msg.Hobby,
            Img:this.msg.Img,
            Phone :this.msg.Phone ,
            Address:this.msg.Address,
            Special:this.msg.Special,
            Intro:this.msg.Intro,
            Province:this.msg.Province
          }
          
          this._userInfoUpdate(obj)
        }
      })
    },
    //修改信息
    _userInfoUpdate (params) {
      // setStore("userInfo",params)
      userInfoUpdate(params).then(res => {  
        if(res.data.code==1){
          this._userInfo() //修改完成后重新获取信息
        }
        
      })
    },
  },
  created () {
    this.userId = getStore('userId')
    this._userInfo()
    this.identity =getStore("identity")
    
  },
}
</script>
<style scoped>
.content{
  margin-top: 0.2rem;
}
</style>
<style scoped>
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
