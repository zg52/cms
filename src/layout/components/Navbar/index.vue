<template>
  <div class="headerBar">
    <div class="navbar">
      <breadcrumb class="breadcrumb-container" />
      <div class="right-menu">
        <span class="zoom" :title="isFullscrren?'退出全屏':'全屏'" @click="fullscreen"></span>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img v-if="!showIconAvatar" :src="avatar" class="user-avatar" @error="avatarError($event)"/>
            <el-avatar v-if="showIconAvatar" class="user-avatar" :size="32" icon="el-icon-user-solid"></el-avatar>
            <i class="up-arrow-icon" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <pageTabs></pageTabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import pageTabs from "./pageTabs.vue";

export default {
  name: "Navbar",
  components: {
    Breadcrumb,
    pageTabs
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  data() {
    return {
      isFullscrren: false,
      showIconAvatar: false
    };
  },
  methods: {
    avatarError(ev) {
      this.showIconAvatar = true;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    fullscreen() {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        // current working methods
        this.isFullscrren = true;
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        } else {
          this.isFullscrren = false;
        }
      } else {
        this.isFullscrren = false;
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else {
          this.isFullscrren = true;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variables.less";
.headerBar {
  position: relative;
  width: 100%;
  height: @navBarHeight;
  background: #fff;
  box-sizing: border-box;
  .navbar {
    position: relative;
    height: @navBarMenuHeight;
    border-bottom: 1px solid rgba(0, 21, 41, 0.08);
    overflow: hidden;

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      position: relative;
      float: right;
      height: 100%;
      line-height: @navBarMenuHeight;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      &:focus {
        outline: none;
      }

      .zoom {
        position: relative;
        float: left;
        display: block;
        margin-right: 24px;
        width: 20px;
        height: 20px;
        background: url("~@/assets/imgs/icons/zoom.png") no-repeat center center;
        background-size: 100% auto;
        cursor: pointer;
      }

      .avatar-container {
        position: relative;
        float: left;
        // height: 100%;
        margin-right: 40px;

        .avatar-wrapper {
          position: relative;
          // height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;

          .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 32px;
            margin-right: 8px;
            // font-size: 24px;
            // text-align: center;
            // line-height: 32px;
            // background-color: #e0e0e0;
          }

          .up-arrow-icon {
            position: relative;
            width: 8px;
            height: 4px;
            background: url("~@/assets/imgs/icons/arrow.png") no-repeat center
              center;
            background-size: 100% auto;
          }
        }
      }
    }
  }
}
</style>
