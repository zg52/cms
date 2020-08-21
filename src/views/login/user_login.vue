<!--
 * @FileDescription: 描述信息
 * @Author: smy
 * @Date: 2020-08-20 09:26:43
 * @LastEditors: smy
 * @LastEditTime: 2020-08-20 19:18:29
-->
<template>
  <div class="user_login">
    <div class="user_login_inner">
      <login-tit></login-tit>
      <div class="login_box">
        <h2>用户登录</h2>
        <div class="name">
          <span class="trapezoid"><i class="el-icon-user"></i></span>
          <el-input v-model="useranme" placeholder="请输入用户名"></el-input>
        </div>
        <div class="pwd">
          <span class="trapezoid"><i class="el-icon-lock"></i></span>
          <el-input v-model="pwd" placeholder="请输入密码"></el-input>
        </div>
        <div style="width: 100%; text-align: center"><span class="button">确认</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginTit from './LoginTit'

export default {
  name: 'user_login',
  components: {
    LoginTit
  },
  data() {
    return {
      useranme: '',
      pwd: ''
    }
  }
}
</script>

<style lang="less">
/* reset element-ui css */
.user_login {
  .el-form-item__content {
    font-size: 0;
  }
  // .el-input {
  //   display: inline-block;
  //   height: 47px;
  //   width: 85%;

  //   input {
  //     background: transparent;
  //     border: 0px;
  //     -webkit-appearance: none;
  //     border-radius: 0px;
  //     padding: 12px 5px 12px 15px;
  //     color: @light_gray;
  //     height: 47px;
  //     caret-color: @cursor;

  //     &:-webkit-autofill {
  //       box-shadow: 0 0 0px 1000px @bg inset !important;
  //       -webkit-text-fill-color: @cursor !important;
  //     }
  //   }
  // }

  // .el-form-item {
  //   border: 1px solid rgba(255, 255, 255, 0.1);
  //   background: rgba(0, 0, 0, 0.1);
  //   border-radius: 5px;
  //   color: #454545;
  // }
}
</style>

<style lang="less">
.user_login {
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
.user_login_inner {
  height: 614px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto; /* 有了这个就自动居中了 */
  .login_box {
    width: 678px;
    height: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: url('../../assets/imgs/index/login_box.png') no-repeat;
    background-size: 100% 100%;
    h2 {
      color: #bfedff;
      font-size: 24px;
      height: 33px;
      line-height: 33px;
      margin-top: 35px;
      text-align: center;
    }
    .name,
    .pwd {
      font-size: 0;
      color: #fff;
      text-align: center;
      .trapezoid {
        height: 52px;
        width: 48px;
        display: inline-block;
        vertical-align: top;
        background: url('../../assets/imgs/index/trapezoid.png') no-repeat;
        background-size: 100% 100%;
        font-size: 20px;
        text-align: center;
        i {
          line-height: 52px;
        }
      }
      .el-input {
        width: 406px;
        input {
          height: 52px;
          line-height: 52px;
          background-color: transparent;
          border: 1px solid rgba(75, 122, 255, 1);
          border-left: 0;
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
          box-sizing: border-box;
          color: #fff;
        }
      }
    }
    .name {
      margin-top: 60px;
    }
    .pwd {
      margin-top: 28px;
    }
    .button {
      display: inline-block;
      width: 218px;
      height: 52px;
      line-height: 52px;
      background: linear-gradient(180deg, rgba(0, 178, 252, 1) 0%, rgba(1, 84, 255, 1) 100%);
      border-radius: 6px;
      margin-top: 36px;
      border: 0;
      font-size: 20px;
      color: rgba(191, 237, 255, 1);
    }
  }
}
</style>
