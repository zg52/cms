<!--
 * @FileDescription: 门户登录通用TITLE
 * @Author: smy
 * @Date: 2020-08-20 15:06:07
 * @LastEditors: smy
 * @LastEditTime: 2020-08-20 15:16:54
-->
<template>
  <div class="sys_login_tit">
    <h2 class="cn_tit">新文达综合后台管理系统</h2>
    <h2 class="en_tit">XINWENDA INTEGRATED MANAGEMENT SYSTEM</h2>
  </div>
</template>

<script>
export default {
  name: 'sys_login_tit'
}
</script>

<style lang="less">
.sys_login_tit {
  height: 147px;
  text-align: center;
  background: url('../../assets/imgs/index/line_icon1.png') no-repeat;
  background-position: center 25px;
  .cn_tit {
    color: #fff;
    font-size: 56px;
    height: 78px;
    line-height: 78px;
    font-weight: bolder;
  }
  .en_tit {
    color: #fff;
    font-size: 24px;
    height: 69px;
    line-height: 69px;
  }
}
</style>
