<template>
  <div class="collapse-header" @click="toggle">
    <slot></slot>
    <span v-if="showIcon" @click="iconToggle" class="toggleButton"><span v-html="isActive?'收起':'展开'"></span><i class="toggleIcon el-icon-arrow-down" :class="isActive ? 'toggleClass' : ''"></i></span>
  </div>
</template>
<script>
export default {
  name: 'collapse-header',
  props: {
    isActive: {
      type: Boolean
    },
    iconActiveOnly: {
      type: Boolean
    },
    showIcon: {
      type: Boolean
    },
  },
  methods: {
    toggle() {
      if (!this.iconActiveOnly) {
        this.$parent.toggle();
      }
    },
    iconToggle() {
      if (this.iconActiveOnly) {
        this.$parent.toggle();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.collapse-header {
  position: relative;
  width: 100%;
  .toggleButton {
    position: absolute;
    // width: 30px;
    height: 21px;
    line-height: 21px;
    font-size: 14px;
    color: #999999;
    right: 20px;
    top: 6px;
    padding-right: 19px;
    cursor: pointer;
    .toggleIcon {
      position: absolute;
      // width: 30px;
      // height: 20px;
      right: 0;
      top: 4px;
      text-align: center;
      display: inline-block;
      // background: url('./assets/img/arrow_down.png') no-repeat center center;
      // background-size: 100%;
      transform: rotate(0);
      transition: transform 0.3s;
    }
    .toggleClass {
      transform: rotate(180deg);
    }
  }
}
</style>
