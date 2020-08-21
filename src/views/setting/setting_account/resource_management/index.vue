<!--
 * @Author: your name
 * @Date: 2020-08-10 18:12:58
 * @LastEditTime: 2020-08-18 10:18:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\views\setting\setting_account\resource_management\index.vue
-->
<template>
  <div class="app-container" v-loading="isLoading">
    <el-tree 
      :data="menuList"
      :props="defaultProps"
      :default-expand-all="true">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.menuName }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getMenuTreeList } from '@/api/setting/setting_account/resource_management';

  export default {
    name: 'resource_management',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    data() {
      return {
        menuList: [],
        defaultProps: {
          children: 'children',
          label: 'menuName'
        },
        isLoading: false
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      async initData() {
        this.isLoading = true;
        const roles = await this.$store.dispatch('user/getRoles');
        this.menuList = roles;
        console.log(this.menuList);
        this.isLoading = false;
      },
      append(data) {
        console.log(data);
      },
      remove(nodeData, data) {
        console.log(nodeData, data);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/styles/common.less";
</style>
