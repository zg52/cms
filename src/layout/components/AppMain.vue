<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variables.less";
.app-main {
  position: relative;
  width: 100%;
  height: calc(~"100vh - "@navBarHeight);
  background-color: #F0F2F5;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: @navBarHeight;
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
