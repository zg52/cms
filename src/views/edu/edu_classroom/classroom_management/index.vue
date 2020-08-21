<!--
 * @Author: your name
 * @Date: 2020-08-18 09:16:47
 * @LastEditTime: 2020-08-18 09:22:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\views\edu\edu_classroom\classroom_management\index.vue
-->
<template>
  <div class="app-container">
    <div class="common_card">
      <div class="common_title">
        classroom_management
      </div>
      <div class="common_content">
        页卡片内容：classroom_management
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'classroom_management',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    }
  }
</script>

<style lang="less" scoped>
@import "~@/assets/styles/common.less";
</style>
