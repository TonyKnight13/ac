<template>
  <div class="swipper">
    <!-- 头部 -->
    <headernav></headernav>

    <div class="main-content" style="background:#ebebeb;padding: 0 1rem;">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
          <el-button @click="sbumit()" style="z-index: 1;position: absolute;right: 0.1rem;">发表文章</el-button>
          <el-tab-pane label="狗" name="狗">
            <el-table :data="articleList.slice((currentPage-1)*5,currentPage*5)" :header-cell-style="{background:'#fff',color:'#555'}" style="width: 100%">

              <el-table-column  width="200">
                <template slot-scope="scope">
                  <el-image :src="scope.row.Img" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Title}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Content}}</span>
                </template>
              </el-table-column>

            </el-table>

            <el-pagination
              :current-page="currentPage"
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  
          </el-tab-pane>
          <el-tab-pane label="猫" name="猫">
            <el-table :data="articleList.slice((currentPage-1)*5,currentPage*5)" :header-cell-style="{background:'#fff',color:'#555'}" style="width: 100%">

              <el-table-column  width="200">
                <template slot-scope="scope">
                  <el-image :src="scope.row.Img" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Title}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Content}}</span>
                </template>
              </el-table-column>

            </el-table>

            <el-pagination
              :current-page="currentPage"
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  
          </el-tab-pane>
          <el-tab-pane label="兔" name="兔">
            <el-table :data="articleList.slice((currentPage-1)*5,currentPage*5)" :header-cell-style="{background:'#fff',color:'#555'}" style="width: 100%">

              <el-table-column  width="200">
                <template slot-scope="scope">
                  <el-image :src="scope.row.Img" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Title}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Content}}</span>
                </template>
              </el-table-column>

            </el-table>
            <el-pagination
              :current-page="currentPage"
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  
          </el-tab-pane>
          <el-tab-pane label="鸟" name="鸟">
            <el-table :data="articleList.slice((currentPage-1)*5,currentPage*5)" :header-cell-style="{background:'#fff',color:'#555'}" style="width: 100%">
              <el-table-column  width="200">
                <template slot-scope="scope">
                  <el-image :src="scope.row.Img" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Title}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Content}}</span>
                </template>
              </el-table-column>

            </el-table>
            <el-pagination
              :current-page="currentPage"
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  
          </el-tab-pane>
          <el-tab-pane label="小型" name="小型">
            <el-table :data="articleList.slice((currentPage-1)*5,currentPage*5)" :header-cell-style="{background:'#fff',color:'#555'}" style="width: 100%">
              <el-table-column  width="200">
                <template slot-scope="scope">
                  <el-image :src="scope.row.Img" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Title}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Content}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="currentPage"
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  
          </el-tab-pane>
          <el-tab-pane label="水生" name="水生">
            <el-table :data="articleList.slice((currentPage-1)*5,currentPage*5)" :header-cell-style="{background:'#fff',color:'#555'}" style="width: 100%">
              <el-table-column  width="200">
                <template slot-scope="scope">
                  <el-image :src="scope.row.Img" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Title}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Content}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="currentPage"
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  
          </el-tab-pane>
          <el-tab-pane label="两栖" name="两栖">
            <el-table :data="articleList.slice((currentPage-1)*5,currentPage*5)" :header-cell-style="{background:'#fff',color:'#555'}" style="width: 100%">
              <el-table-column  width="200">
                <template slot-scope="scope">
                  <el-image :src="scope.row.Img" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Title}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Content}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="currentPage"
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  
          </el-tab-pane>
          <el-tab-pane label="其他宠物" name="其他宠物">
           <el-table :data="articleList.slice((currentPage-1)*5,currentPage*5)" :header-cell-style="{background:'#fff',color:'#555'}" style="width: 100%">
              <el-table-column  width="200">
                <template slot-scope="scope">
                  <el-image :src="scope.row.Img" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Title}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.Content}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="currentPage"
              :total="total"
              @current-change="currentPageChange"  
              :page-size="5" >
            </el-pagination>  
          </el-tab-pane>        
        </el-tabs>
    </div>

    <el-dialog title="发表文章" :visible.sync="dialogVisible" center @close="closeDilog()">
        <el-form :model="msg" :rules="rules" status-icon label-width="100px" style="width:80%;" ref="msg">
        <el-form-item label="标题">
          <el-input v-model="msg.Title"> </el-input>
        </el-form-item>

        <el-form-item label="文章">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
            placeholder="请输入文章内容"
            v-model="msg.Content">
          </el-input>
        </el-form-item>

        <el-form-item label="分类" prop="Special">
              <el-select v-model="msg.Special">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>         
        <el-button @click='_addArticle()' style="width:4rem;margin-top:1rem">发表</el-button>

    </el-dialog>

    <!-- 底部 -->
    <foot></foot>
  </div>
</template>
<script>
import headernav from "@/components/headernav.vue";
import foot from "@/components/foot"
import {baikeData, addArticle} from "@/api/index"

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
      headernav,foot 
  },
  data() {
    return {
      options:op2,
      activeName:'狗',
      articleList:[],
      currentPage:1,
      total:0,
      msg:{
        Title:'',
        Content:'',
        Special:''
      },
      dialogVisible:false,
      
    }
  },
  created() {
    this._baike()
  },
  methods: {
    _baike(){ //初始化
      baikeData().then(res => {
        if(res.data.code == 1){
          for(let i=0;i<res.data.data.length;i++){
            if(this.activeName == res.data.data[i].Special){
              this.articleList = res.data.data[i].data
              this.total = res.data.data[i].data.length
            }
          }
        }
      })
    },
    currentPageChange(val){
      this.currentPage=val;
    },
    handleClick(tab, event) {
      console.log(tab.name);
      this.currentPageChange(1)
      this.activeName = tab.name
      this._baike()
    },

    sbumit(){
      this.dialogVisible =true
    },

    closeDilog(){
      this.dialogVisible = false
      this.Title= ''
    },
    _addArticle(){
      this.dialogVisible = false
      addArticle({
        Title:this.msg.Title,
        Content:this.msg.Content,
        Special:this.msg.Special
      }).then(res =>{
        if(this.data.code ==1){
          this.$message.success("发表文章成功")
        }
      })
    }
  },
}
</script>
<style scoped>

</style>
<style>
.el-tabs__item.is-active {
  color: #FFB90F !important;
}
.el-tabs--border-card .el-tabs__item:hover{
  color: #fff !important;
}
.el-tabs__header{
  margin-bottom: 0 ;
}
.el-tabs--border-card>.el-tabs__header {
    background-color: #FFB90F !important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item {
    color: #000;
}
.el-dialog{
    background: #ebebeb
}
</style>

