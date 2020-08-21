<!--
 * @Author: your name
 * @Date: 2020-08-19 16:10:51
 * @LastEditTime: 2020-08-20 11:32:06
 * @LastEditors: madongzhe
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\components\Modal\index.vue

    组件使用方法：
    <routeModal :ref="'routeModalRef_'+_uid">
      <div slot="content">我是模态窗的内容</div>
      <div slot="footer">
        <button @click="$refs[`routeModalRef_${_uid}`].close()">关闭模态窗</button>
      </div>
    </routeModal>

    调用方法：
    this.$refs['routeModalRef_'+this._uid].show();
-->
<template>
  <transition name="fade-transform" mode="out-in">
    <div class="route_modal" v-if="routeModalShow">
      <div class="route_modal_content">
        <slot name="content"></slot>
      </div>
      <div class="route_modal_footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "routeModal",
  data() {
    return {
      routeModalShow: false
    }
  },
  methods: {
    show() {
      this.routeModalShow = true;
    },
    close() {
      this.routeModalShow = false;
    },
  }
}
</script>

<style lang="less" scoped>
.route_modal {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(240,242,245,1);
  overflow: hidden;
  z-index: 9;
  .route_modal_content {
    position: relative;
    width: 100%;
    height: calc(100% - 0px);
    overflow: auto;
  }

  .route_modal_footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  }
}
</style>
