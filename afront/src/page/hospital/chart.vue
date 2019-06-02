<template>
  <div class="hello">     
        <el-button v-if="!isCheckin" @click="Login()">进入聊天室</el-button>  

        <div class="chat-wrap" v-else>
          <h1>问诊聊天室（总人数：{{amount}}）</h1>

          <div class="chat-con clearfix" id="chat_con">
            <template v-for="item in msgList">
              <!-- {{item | json}} -->
              <template v-if="item.msgType==0">
                <p>{{item.message}}</p><br/>
              </template>

              <template v-else>
                  <div class="chat-item item-right clearfix" v-if="uname == item.username "><span class="img fr"></span><span class="message fr">{{item.message}}</span></div>
                  <div class="chat-item item-left clearfix rela" v-else><span class="abs uname">{{item.username}}  ( {{item.msgDate | formatDate}} )</span><span class="img fl"></span><span class="fl message">{{item.message}}</span></div>
              </template>
            </template>
          </div>

          <div class="bottom">
            <input type="text" id="sendtxt" v-model.trim="inputMsg" @keyup.13="sendMessage">
            <el-button type="primary" size="middle" @click="sendMessage">发送</el-button>
          </div>
        </div>
  </div>
</template>

<script>
import {getStore} from "@/utils/storage"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      amount: 0,          //聊天室总数人
      uname: '',    //定义用户名
      inputMsg: '',
      socket: null,       //定义socket实例
      isCheckin: false,
      msgList:[],         //服务端返回的信息列表
    }
  },  

  mounted(){

    var vm = this;
    /*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/ 
    vm.socket = io('ws://localhost:8081');

    vm.socket.on('receiveMessage',function(data){
      console.log('接收到服务端返回：',data)
      vm.msgList.push(data);
      // window.scrollTo(0, document.getElementById('chat_con').scrollHeight);
    })
  },

  created(){
    /*接收消息*/
    this.uname = getStore('userName')
  },

  filters:{
    formatDate:function(data){
      var date = data ? new Date(data) : new Date();
      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
      return time;
    }
  },

  methods:{
    /*登录*/
    Login: function(){
      console.log(this.uname, '')
      if(this.uname){
        this.isCheckin=true
        /*向服务端发送登录事件*/
        this.socket.emit('Login',{username: this.uname})
      }else{
        alert('请输入昵称')
      }
    },
   
    /*发送消息*/
    sendMessage:function(){
      var vm = this
      if(vm.inputMsg){
        vm.socket.emit('sendMessage',{username:vm.uname,message:vm.inputMsg});
        vm.inputMsg = '';
      }else{
        alert('请输入……')
      }
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/css/chat.css';
.hello{
  width: 100%;
  /* min-height: 10rem; */
  height: 10rem;
  /* background:url('../assets/images/background/1.jpg') no-repeat center center fixed; */
  background-size: cover;
  background: #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.chat-wrap {
  border: #000 1px solid;
  width: 80%;
  height: 100%;
  position: relative;
  overflow-y:hidden;
  display: flex;
  flex-direction:column
}
.chat-wrap h1{
  text-align: center;
  background: #000;
  color: #fff;
  padding: 0.2rem;
  font-size: 0.48rem;
}
.bottom{
  width: 100%;
  padding: 0.2rem;
  position: absolute;
  bottom: 0;
}
#sendtxt{
  font-size: 0.36rem;
  height: 0.6rem;
  width: 70%;
  margin-right: 0.5rem
}
.el-button{
  width: 10%;
  height: 0.6rem
}
.chat-con{
  overflow-y:scroll;
  /* flex: 1; */
  display: flex;
  flex-direction:column;
  align-items: center;
  /* height: 80%; */
}
.chat-con::-webkit-scrollbar {
    display: none;
}

</style>
