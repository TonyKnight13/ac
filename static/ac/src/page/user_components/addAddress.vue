<template>
  <div class="main-wrap">
    <div class="add-title">
      <h1>添加收货地址</h1>
    </div>
    <div class="add-box">
      <el-form :v-model="formData" label-position="left" :label-width="100" :rules="ruleInline">
        <el-form-item label="收件人" prop="name">

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>