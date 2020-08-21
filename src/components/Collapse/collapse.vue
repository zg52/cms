<template>
  <div class="collapseBox">
    <Header :isActive="isActive" :showIcon="showIcon" :iconActiveOnly="iconActiveOnly">
      <slot name="collapseHeader"></slot>
    </Header>
    <collapseTransition>
      <Pannel v-show="isActive">
        <slot name="collapsePannel"></slot>
      </Pannel>
    </collapseTransition>
  </div>
</template>
<script>
import collapseTransition from './collapseTransition.js';
import Pannel from './pannel.vue';
import Header from './header.vue';

export default {
  name: 'Collapse',
  components: {
    collapseTransition,
    Pannel,
    Header,
  },
  props: {
    showIcon: {
      type: Boolean,
      default: false,
    },
    iconActiveOnly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: this.value,
    };
  },
  mounted() {},
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.$emit('active', this.isActive);
    },
  },
};
</script>
<style lang="less" scoped>
.collapseBox {
  position: relative;
  width: 100%;
}
</style>
