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
                  <el-image :src="scope.row.image" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.article}}</span>
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
                  <el-image :src="scope.row.image" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.article}}</span>
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
                  <el-image :src="scope.row.image" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.article}}</span>
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
                  <el-image :src="scope.row.image" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.article}}</span>
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
                  <el-image :src="scope.row.image" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.article}}</span>
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
                  <el-image :src="scope.row.image" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.article}}</span>
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
                  <el-image :src="scope.row.image" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.article}}</span>
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
                  <el-image :src="scope.row.image" fit="contain"></el-image>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="">
                <template slot-scope="scope">
                  <span style="font-weight:bolder;font-size:0.32rem;">{{scope.row.article}}</span>
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
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20}"
          placeholder="请输入文章内容"
          v-model="article">
        </el-input>
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
export default {
  components:{
      headernav,foot 
  },
  data() {
    return {
      activeName:'狗',
      articleList:[],
      currentPage:1,
      total:0,

      dialogVisible:false,
      article:"",
    }
  },
  created() {
    this._baike()
  },
  methods: {
    _baike(){
      baikeData().then(res => {
        if(res.data.code == 1){
          for(let i=0;i<res.data.length;i++){
            if(this.activeName == res.data[i].special){
              this.articleList = res.data[i].data
              this.total = res.data[i].data.length
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
      this.article= ''
    },
    _addArticle(){
      this.dialogVisible = false
      addArticle({
        article:this.textarea
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

