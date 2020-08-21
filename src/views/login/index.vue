<template>
  <div class="user_login">
    <div class="user_login_inner">
      <login-tit></login-tit>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login_box" auto-complete="on" label-position="left">
        <h2>用户登录</h2>

        <el-form-item class="name" prop="username">
          <span class="trapezoid"><i class="el-icon-user"></i></span>
          <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item class="pwd" prop="password">
          <span class="trapezoid"><i class="el-icon-lock"></i></span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd"> </span>
        </el-form-item>

        <div style="width: 100%; text-align: center"><el-button class="button" :loading="loading" type="primary" @click.native.prevent="handleLogin">Login</el-button></div>

        <div class="tips">
          <!-- <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import LoginTit from './LoginTit'
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  components: {
    LoginTit
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    document.getElementsByClassName('el-form-item__content')[0].style.fontSize = 0
    document.getElementsByClassName('el-form-item__content')[1].style.fontSize = 0
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

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
  .el-form-item {
    margin-bottom: 0;
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
      padding: 0;
    }
  }
}
</style>
