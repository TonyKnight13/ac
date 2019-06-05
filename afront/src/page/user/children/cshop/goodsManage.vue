<template>
<div>
  <YShelf title="商品管理">
    <span slot="right"><el-button style="margin: 0" @click="update()">添加商品</el-button></span>
    <div slot="content" class="content">

      <el-table :data="goodsList" v-if="goodsList.length > 0" style="width: 100%" ref="multipleTable"
      :header-cell-style="{background:'#F3F4F7',color:'#555'}">
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">            
            <el-image :src="scope.row.imgUrl" fit="contain" @click="goodsintros(scope.row.goodId)"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="120" align="center">
        </el-table-column>
        <el-table-column prop="price" label="商品单价(￥)" width="120" align="center">
        </el-table-column>
        <el-table-column prop="speci" label="商品种类" width="200" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.speci}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="forpet" label="适用商品的宠物种类" width="200" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.forpet}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" >
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="small"  circle @click="update(scope.row)"></el-button>
              <!-- <el-button type="danger" icon="el-icon-delete" size="small" circle @click="del(scope.row.goodId)"></el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <div v-else>
        <div style="padding: 80px 0;text-align: center">
          <div style="font-size: 20px">你还未有上架商品</div>
          <div style="margin: 20px ">
            <el-button @click="dialogVisible = true">添加商品</el-button>
          </div>
        </div>
      </div>

    </div>
  </YShelf>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center @close="closeDilog('msg')">
      <!-- <div slot="content" class="md" :data-goodId="msg.goodId"> -->
        <el-form :model="msg" ref="msg" :rules="rules">
          <el-form-item prop="name">
            <el-input placeholder="商品名称" v-model="msg.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="textarea" placeholder="商品描述" :rows="2" v-model="msg.intro"></el-input>
          </el-form-item>
          <el-form-item prop="price">
            <el-input placeholder="商品单价(￥)" v-model="msg.price"></el-input>
          </el-form-item>
          <el-form-item prop="speci">
            <el-select v-model="msg.speci" placeholder="商品种类">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="forpet">
              <el-select v-model="msg.forpet" placeholder="适用商品的宠物种类">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-radio v-model="msg.available" label='0'>下架</el-radio>
              <el-radio v-model="msg.available" label='1'>上架</el-radio>
          </el-form-item>
          <el-form-item>
            <el-select v-model="msg.madein" placeholder="请选择产地">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>            
          </el-form-item>

          <el-form-item prop="imgUrl">
              <input @change="uploadPhoto($event)" type="file" class="kyc-passin">
              <img :src="msg.imgUrl" alt="">

          </el-form-item>

          <el-form-item>
            <el-button class="btn" :disabled=trueORfalse @click="save()">
            保存</el-button>
          </el-form-item>
        </el-form>


      <!-- </div> -->
      <!-- <span>这是一段信息</span> -->
    </el-dialog>
</div>
</template>

<script>
import { goodsList, goodsUpdate, goodsAdd, goodsPut } from '@/api/index'
import { getStore,setStore } from '@/utils/storage'
import YShelf from '@/components/shelf';
export default {
  name: 'MyAddress',
  components:{
    YShelf
  },
  data () {
    return {
      options:[{
          value: 0,
          label: '国内'
        }, {
          value: 1,
          label: '国外'
        }],
      goodsList:[],
      dialogTitle:"修改商品信息",
      dialogVisible:false,
      options1: [{
          value: '宠物牌',
          label: '宠物牌'
        }, {
          value: '牵引线',
          label: '牵引线'
        }, {
          value: '宠物窝',
          label: '宠物窝'
        }, {
          value: '宠物食品',
          label: '宠物食品'
        }, {
          value: '宠物食具',
          label: '宠物食具'
        }, {
          value: '宠物服装',
          label: '宠物服装'
        }, {
          value: '宠物玩具',
          label: '宠物玩具'
        }, {
          value: '清洁用品',
          label: '清洁用品'
        },  {
          value: '宠物药品',
          label: '宠物药品'
        }, {
          value: '其他用品',
          label: '其他用品'
        },],
      options2: [{
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
        }],
      msg: {
        goodId:'',
        name:'',
        intro:'',
        madein:null,
        price:null,
        imgUrl:null,
        available:'1',
        speci:null,//商品种类
        forpet:'',//使用商品的宠物种类
      },


      userId: '',
      rules: {
        name: [
          { required: true, message: '商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品单价', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请输入商品图片', trigger: 'blur' }
        ],
        speci: [
          { required: true, message: '请输入商品种类', trigger: 'blur' }
        ],
        forpet: [
          { required: true, message: '请输入适用商品的宠物种类', trigger: 'blur' }
        ],
      }
    };
  },
  computed: {
    trueORfalse () {
      let msg = this.msg
      return false
      return !Boolean(msg.name && msg.price && msg.imgUrl && msg.speci && msg.forpet)
    }
  },
  methods: {
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
            this.msg.imgUrl=imgcode
            console.log(this.msg.imgUrl );
        }
    },
    closeDilog:function(form){
        this.dialogFormVisible = false;
        this.$refs[form].resetFields();//将form表单重置
    },
    message (m) {
      this.$message.error({
        message: m
      })
    },
    //获取商品列表
    _goodsList () {
      goodsList({userId: this.userId}).then(res => {
        let data = res.data.data
        console.log( res.data.data, data.length)
        if (data.length>0) {
          this.goodsList = data
          console.log(this.goodsList[0],this.goodsList[0].speci )
          // this.goodId = res.result[0].goodId || '1'
        } else {
          this.goodsList = []
        }
      })
    },
    _goodsUpdate (params) {
      goodsUpdate(params).then(res => {  //修改商品信息
        this._goodsList() //修改完成后重新获取商品列表
      })
    },
    //添加商品
    _goodsAdd (params) {
      goodsAdd(params).then(res => {
        if (res.data.code == 1) {
          this._goodsList() //修改完成后重新获取地址列表
        } else {
          this.message(res.data.msg)
        }
      })
    },


    // 保存
    save () {
      this.dialogVisible = false
      console.log(this.msg.speci)
      let obj = {
        userId:this.userId,
        goodId:this.msg.goodId,
        imgUrl:this.msg.imgUrl,
        name:this.msg.name,
        price:this.msg.price,
        available: this.msg.available,
        intro:this.msg.intro,
        speci:this.msg.speci,//商品种类
        forpet:this.msg.forpet//使用商品的宠物种类
      }
      if (obj.goodId) {
        this._goodsUpdate(obj)
      } else {
        delete obj.goodId //删除商品id
        this._goodsAdd(obj)
      }
    },

    // 修改
    update(item){
      // console.log(item)
      this.dialogVisible=true;
      if(item){
        this.dialogTitle = '修改商品'
        this.userId =this.userId
        this.msg.goodId = item.goodId
        this.msg.name = item.name
        this.msg.intro = item.intro
        this.msg.price = item.price
        this.msg.imgUrl = item.imgUrl
        this.msg.available = item.available
        this.msg.speci = item.speci
        this.msg.forpet = item.forpet
      }else {
        this.dialogTitle = '添加商品'
        this.userId =this.userId
        this.msg.goodId = null
        this.msg.name = null
        this.msg.intro = null
        this.msg.price = null
        this.msg.imgUrl = null
        this.msg.available = '1'
        this.msg.speci = null
        this.msg.forpet = null
      }
    }
  },
  created () {
    this.userId = getStore('userId')
    this._goodsList()
  },
};
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
