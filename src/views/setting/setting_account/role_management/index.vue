<template>
  <div class="app-container">
    <div class="tm-text">角色权限管理</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'role_management',
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
