<template>
  <div class="collapse-pannel">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'collapse-pannel',
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.collapse-pannel {
  position: relative;
  width: 100%;
}
</style>
