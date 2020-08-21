<!--
 * @FileDescription: 系统登录页面
 * @Author: smy
 * @Date: 2020-08-20 09:26:18
 * @LastEditors: smy
 * @LastEditTime: 2020-08-20 15:19:47
-->
<template>
  <div class="sys_login">
    <div class="sys_login_inner">
      <login-tit></login-tit>
      <ul class="system_list">
        <!-- 'system_icon' + (index + 1) -->
        <li v-for="(item, index) in systemImgList" :class="{ ['system_icon' + (index + 1)]: true, mb: item.needMb }" :key="index + 1">
          <h2>{{ item.content }}</h2>
        </li>
      </ul>
      <div class="login_syetem_wrap">
        <div class="login_syetem"><span>登录系统</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginTit from './LoginTit'

export default {
  name: 'sys_login',
  components: {
    LoginTit
  },
  data() {
    return {
      systemImgList: [
        { needMb: true, content: '内容发布系统' },
        { needMb: true, content: '教研管理系统' },
        { needMb: true, content: 'BI数据分析' },
        { needMb: false, content: '营销管理系统' },
        { needMb: false, content: '教务管理系统' },
        { needMb: false, content: '配置管理系统' }
      ]
    }
  }
}
</script>

<style type="text/less" lang="less">
// 循环给.sys_icon@i 设置属性
.system_icon-loop(@n, @i:1) when (@i <= @n) {
  .system_icon@{i} {
    background-image: url('../../assets/imgs/index/sys_icon@{i}.png');
  }
  .system_icon-loop(@n, (@i + 1));
}

.sys_login {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  min-height: 780px;
  background-image: url('../../assets/imgs/index/index_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-family: '微软雅黑', 'microsoft yahei', 'PingFangSC-Regular', arial, helvetica, sans-serif;
  position: relative;
}
.sys_login_inner {
  height: 752px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto; /* 有了这个就自动居中了 */

  .system_list {
    width: 1188px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 45px;
    .mb {
      margin-bottom: 24px;
    }
    li {
      width: 380px;
      height: 188px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      h2 {
        height: 42px;
        line-height: 42px;
        font-weight: bolder;
        font-size: 30px;
        color: #fff;
        display: inline-block;
        margin: 20px 0 0 38px;
      }
    }
    .system_icon-loop(6);
  }
  .login_syetem_wrap {
    width: 100%;
    padding: 0 28px;
  }
  .login_syetem {
    width: 100%;
    height: 72px;
    background: url(../../assets/imgs/index/line_icon2.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 88px;
    text-align: center;
    span {
      height: 40px;
      line-height: 40px;
      font-size: 28px;
      color: #fff;
      font-weight: bolder;
      background: transparent;
      border: 0;
      margin-top: 6px;
      cursor: pointer;
      font-family: 微软雅黑;
    }
  }
}
</style>
