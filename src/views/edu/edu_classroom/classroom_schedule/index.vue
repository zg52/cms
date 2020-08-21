<!--
 * @Author: your name
 * @Date: 2020-08-18 09:16:51
 * @LastEditTime: 2020-08-18 09:23:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\views\edu\edu_classroom\classroom_schedule\index.vue
-->

<template>
  <div class="app-container">
    <div class="common_card">
      <div class="common_title">
        classroom_schedule
      </div>
      <div class="common_content">
        classroom_schedule
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'classroom_schedule',
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