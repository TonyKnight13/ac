<template>
<div>
  <YShelf title="商品管理">
    <span slot="right"><el-button style="margin: 0" @click="update()">添加商品</el-button></span>
    <div slot="content" class="content">

      <el-table :data="goodsList" v-if="goodsList.length" style="width: 100%" ref="multipleTable"
      :header-cell-style="{background:'#F3F4F7',color:'#555'}">
        <el-table-column prop="goodImg" label="商品图片" width="120" align="center">
          <template slot-scope="scope">            
            <el-image :src="scope.row.goodImg" fit="contain" @click="goodsDetails(scope.row.goodId)"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="goodName" label="商品名称" width="120" align="center">
        </el-table-column>
        <el-table-column prop="goodPrice" label="商品单价(￥)" width="120" align="center">
        </el-table-column>
        <el-table-column prop="goodKind" label="商品种类" width="200" align="center">
        </el-table-column>
        <el-table-column prop="goodUserKind" label="适用商品的宠物种类" width="200" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.goodUserKind.join(" ")}}</span>
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
      <!-- <div slot="content" class="md" :data-id="msg.goodId"> -->
        <el-form :model="msg" ref="msg" :rules="rules">
          <el-form-item prop="goodName">
            <el-input placeholder="商品名称" v-model="msg.goodName"></el-input>
          </el-form-item>
          <el-form-item prop="detail">
            <el-input type="textarea" placeholder="商品描述" :rows="2" v-model="msg.detail"></el-input>
          </el-form-item>
          <el-form-item prop="goodPrice">
            <el-input placeholder="商品单价(￥)" v-model="msg.goodPrice"></el-input>
          </el-form-item>
          <el-form-item prop="goodKind">
            <el-select v-model="msg.goodKind" placeholder="商品种类">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="goodUserKind">
              <el-select v-model="msg.goodUserKind" multiple collapse-tags placeholder="适用商品的宠物种类">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="isPut">
              <el-radio v-model="msg.isPut" label="0">下架</el-radio>
              <el-radio v-model="msg.isPut" label="1">上架</el-radio>
          </el-form-item>
          <el-form-item prop="goodImg">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="msg.goodImg" :src="msg.goodImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button 
        class="btn"
        :disabled=trueORfalse
        @click="save()">
        保存</el-button>

      <!-- </div> -->
      <!-- <span>这是一段信息</span> -->
    </el-dialog>
</div>
</template>

<script>
import { goodsList, goodsUpdate, goodsAdd, goodsPut } from '@/api/index'
import { getStore } from '@/utils/storage'
import YShelf from '@/components/shelf';
export default {
  name: 'MyAddress',
  components:{
    YShelf
  },
  data () {
    return {
      goodsList:[],
      dialogTitle:"修改收货地址",
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
          value: '宠物清洁用品',
          label: '宠物清洁用品'
        }, {
          value: '其他宠物用品',
          label: '其他宠物用品'
        },],
      options2: [{
          value: '狗',
          label: '狗'
        }, {
          value: '猫咪',
          label: '猫咪'
        }, {
          value: '水族',
          label: '水族'
        }, {
          value: '兔子',
          label: '兔子'
        }, {
          value: '仓鼠',
          label: '仓鼠'
        }, {
          value: '乌龟',
          label: '乌龟'
        }, {
          value: '鸟',
          label: '鸟'
        }, {
          value: '其他宠物',
          label: '北京其他宠物烤鸭'
        }],
      msg: {
        goodId:null,
        goodName:'',
        detail:'',
        goodPrice:'',
        goodImg:'',
        isPut:'1',
        goodKind:'',//商品种类
        goodUserKind:[]//使用商品的宠物种类
      },


      userId: '',
      rules: {
        goodName: [
          { required: true, message: '商品名称', trigger: 'blur' }
        ],
        goodPrice: [
          { required: true, message: '请输入商品单价', trigger: 'blur' }
        ],
        goodImg: [
          { required: true, message: '请输入商品图片', trigger: 'blur' }
        ],
        goodKind: [
          { required: true, message: '请输入商品种类', trigger: 'blur' }
        ],
        goodUserKind: [
          { required: true, message: '请输入适用商品的宠物种类', trigger: 'blur' }
        ],
      }
    };
  },
  computed: {
    trueORfalse () {
      let msg = this.msg
      return !Boolean(msg.goodName && msg.goodPrice && msg.goodImg && msg.goodKind && msg.goodUserKind)
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.msg.goodImg = URL.createObjectURL(file.raw);
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
    //获取地址列表
    _goodsList () {
      goodsList({userId: this.userId}).then(res => {
        let data = res.data.data
        if (data.length) {
          this.goodsList = data
          // console.log(this.goodsList)
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
        if (res.data.msg == 'success') {
          this._goodsList() //修改完成后重新获取地址列表
        } else {
          this.message(res.data.msg)
        }
      })
    },


    // 保存
    save () {
      this.popupOpen = false
      let obj = {
        owner:this.userId,
        goodId:this.msg.goodId,
        goodImg:this.msg.goodImg,
        goodName:this.msg.goodName,
        goodPrice:this.msg.goodPrice,
        isPut:this.msg.isPut,
        detail:this.msg.detail,
        goodKind:this.msg.goodKind,//商品种类
        goodUserKind:this.msg.goodUserKind//使用商品的宠物种类
      }
      if (obj.goodId) {
        this._goodsUpdate(obj)
      } else {
        delete obj.goodId //删除商品id
        this._goodsAdd(obj)
      }
    },

    // 删除
    // del (goodId,i) {
    //   goodsPut({goodId: goodId}).then(res => {
    //     if (res.data.success === true) {
    //       this.goodsList.forEach((item,i) => {
    //         if(item.goodId == goodId){
    //           this.goodsList.splice(i, 1)
    //         }
    //       });
    //     } else {
    //       this.message('删除失败')
    //     }
    //   })
    // },

    // 修改
    update(item){
      // console.log(item)
      this.dialogVisible=true;
      if(item){
        this.dialogTitle = '修改商品'
        this.msg.goodName = item.goodName
        this.msg.detail = item.detail
        this.msg.goodPrice = item.goodPrice
        this.msg.goodImg = item.goodImg
        this.msg.isPut = item.isPut
        this.msg.goodKind = item.goodKind
        this.msg.goodUserKind = item.goodUserKind
      }else {
        this.popupTitle = '添加商品'
        this.msg.realName = ''
        this.msg.phone = ''
        this.msg.address = ''
        this.msg.goodId = ''
      }
    }
  },
  created () {
    this.userId = getStore('user')
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
