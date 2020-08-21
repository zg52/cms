<template>
  <div class="sidebar-container">
    <el-drawer
      custom-class="menu-slide"
      :visible.sync="isDrawerShow"
      :with-header="false"
      :modal="false"
      direction="ltr"
      :modal-append-to-body="false"
      @close="drawerClose"
    >
      <detailRoute
        v-if="isCurrentIndex>-1"
        :routeList="permission_routes[isCurrentIndex].meta.menuList || []"
        @closeSlide="closeSlide"
      ></detailRoute>
    </el-drawer>
    <div class="menu-sidebar">
      <img class="menu-logo" src="@/assets/imgs/icons/logo.png" />
      <template v-for="(route, index) in permission_routes">
        <div
          class="menu-item"
          v-if="route.meta&&route.meta.menu===1"
          :key="index"
          @click="showRouteSlide(route)"
          :class="{'menu-item-active':index===isCurrentIndex}"
        >
          <img class="menu-item-icon" :src="getImgSrc(route.meta.icon)" />
          <span class="menu-item-title">{{route.meta.title}}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import detailRoute from "./detailRoute";
export default {
  data() {
    return {
      isDrawerShow: false,
      isCurrentIndex: -1,
      isPrevIndex: -1
    };
  },
  components: {
    detailRoute,
  },
  computed: {
    ...mapGetters(["permission_routes"]),
  },
  mounted() {
    console.log(this.permission_routes);
    for (let i = 0; i < this.permission_routes.length; i++) {
      let tempRoute = this.permission_routes[i];
      if (tempRoute.path === this.$route.matched[0].path) {
          this.isCurrentIndex = i;
          break;
      }
    }
  },
  methods: {
    closeSlide() {
      this.isPrevIndex = -1;
      this.isDrawerShow = false;
    },
    drawerClose() {
      if (this.isPrevIndex > -1) {
        this.isCurrentIndex = this.isPrevIndex;
      }
    },
    showRouteSlide(route) {
      this.isDrawerShow = !this.isDrawerShow;
      for (let i = 0; i < this.permission_routes.length; i++) {
        let tempRoute = this.permission_routes[i];
        if (tempRoute.name === route.name) {
          if (this.isCurrentIndex !== i) {
            this.isPrevIndex = this.isCurrentIndex;
            this.isCurrentIndex = i;
            this.isDrawerShow = true;
            console.log(this.permission_routes[this.isCurrentIndex])
            break;
          }
        }
      }
    },
    getImgSrc(imgName) {
      try {
        return require(`@/assets/imgs/icons/${imgName}`);
      } catch (error) {
        return "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/styles/variables.less";
.sidebar-container {
  position: fixed;
  width: @sideBarWidth;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1001;

  .menu-sidebar {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #0169fb;
    z-index: 1;
    padding-top: 24px;
    box-sizing: border-box;

    .menu-logo {
      position: relative;
      width: 47px;
      height: auto;
      line-height: 0;
      display: block;
      margin: 0 auto 26px;
    }

    .menu-item {
      position: relative;
      width: 100%;
      height: auto;
      text-align: center;
      margin-bottom: 16px;
      opacity: 0.6;
      transition: opacity 0.7;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }

      .menu-item-icon {
        position: relative;
        width: 20px;
        height: 20px;
        margin-bottom: 4px;
        line-height: 0;
      }

      .menu-item-title {
        position: relative;
        width: 100%;
        text-align: center;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        line-height: 22px;
        display: inline-block;
      }
    }

    .menu-item-active {
      opacity: 1;
    }
  }
}

.el-drawer__wrapper {
  z-index: 0 !important;
  outline: none !important;
}
</style>
<style lang="less">
@import "~@/assets/styles/variables.less";
.el-drawer__container {
  outline: none !important;
}
.el-drawer__wrapper {
  .menu-slide {
    padding-left: @sideBarWidth;
    outline: none !important;
  }
}
</style>
