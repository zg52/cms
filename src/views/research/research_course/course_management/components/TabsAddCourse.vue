<!--
 * @Author: madongzhe
 * @Date: 2020-08-19 19:37:44
 * @LastEditors: madongzhe
 * @LastEditTime: 2020-08-20 17:54:05
 * @Description: 新增课程tab切换
-->
<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <!-- <el-tab-pane label="1对1" name="first">
      <OnetoOneAddCourse v-bind="$attrs" v-on="$listeners"/>
    </el-tab-pane>
    <el-tab-pane label="班课" name="second">
      <ClassAddCourse v-bind="$attrs" v-on="$listeners"/>
    </el-tab-pane> -->
    <el-tab-pane label="双师" name="third">
      <TeachersAddCourse v-bind="$attrs" v-on="$listeners"/>
    </el-tab-pane>
    <!-- <el-tab-pane label="直播" name="fourth">直播</el-tab-pane>
    <el-tab-pane label="录播" name="five">录播</el-tab-pane> -->
  </el-tabs>
</template>
<script>
import TeachersAddCourse from './TeachersAddCourse';
import OnetoOneAddCourse from './OnetoOneAddCourse';
import ClassAddCourse from './ClassAddCourse';
  export default {
    data() {
      return {
        activeName: 'third'
      };
    },
    components:{
      OnetoOneAddCourse,
      ClassAddCourse,
      TeachersAddCourse,
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="less" scoped>
 /deep/.el-tabs__header{
   margin-top: 15px;
   margin-bottom: 1px;
  .el-tabs__nav-scroll{
    display: flex;
    justify-content: center;
    .el-tabs__nav{
      background-color: #fff;
    .el-tabs__item.is-active{
      color: #fff;
      background-color: #558CFF;
      border-color: #558CFF;
    }
    }
  }
}
</style>