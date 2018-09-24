<template>
  <div class="header-section">
    <router-link to="/home" class="logo block">
      <img src="./img/logo.png" alt="AdminX" style="height: 50px; margin-bottom: 5px;">
      <span style=" margin-left:14px;font-size: 24px;float: right;display: flex;justify-content: center;padding-top: 0;color: rgb(0, 158, 224);">成长云平台</span>
    </router-link>
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
  import menuRight from './menuRight'


  export default {
    components: {
      menuRight,
    },
    methods: {
      submit_search(value) {
        this.$message.success(value)
      }
    }
  }
</script>
