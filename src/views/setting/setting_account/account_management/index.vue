<template>
  <div class="app-container">
    <div class="tm-text">用户账号管理</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'account_management',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    }
  }
</script>

<style lang="less" scoped>
</style>
