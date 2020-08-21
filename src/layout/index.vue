<template>
  <div class="app-wrapper">
    <Sidebar></Sidebar>
    <div class="main-container">
      <Navbar></Navbar>
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  @import "~@/assets/styles/variables.less";
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    .main-container {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: @sideBarWidth;
      position: relative;
    }
  }
</style>
