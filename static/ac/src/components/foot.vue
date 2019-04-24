<template>
  <div class="foot-wrap">
    <img src="../assets/images/zhua.png" alt="">
    <p>—我们的保障—</p>
    <div class="foot-container">
      <el-row :gutter="40">
        <el-col :span="8">
          <div class="content-text">
            <p style="color: #ffb109">设备先进</p>
            <br>
            <span style="font-size: 16px;">设施完备，设备先进，为他们提供了最大化的日常生活便利。</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="content-text">
            <p style="color: #ffb109">专业团队</p>
            <br>
            <span style="font-size: 16px;">拥有多位教学经验丰富的A级宠物美容老师和注册宠物兽医师任教</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="content-text">
            <p style="color: #ffb109">优质宠物用品</p>
            <br>
            <span style="font-size: 16px;">涉及囊括了宠物食品、医疗保健品、洗护用品、用品用具、窝包服饰、宠物玩具、美容工具等</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name:'foot',
}
</script>
<style scoped>
.foot-wrap{
  text-align: center
}
.foot-wrap > p{
  font-size: 0.4rem;
  font-weight: bold;
}
.foot-container{
  margin-top: 0.3rem;
  width: 100%;
  padding: 0 2rem;
  margin-bottom: 0.5rem;
}
.foot-container p{
  font-size: 0.36rem;
  font-weight: 700;
}
</style>
