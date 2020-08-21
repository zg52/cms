<template>
  <div class="menu-detail-list">
    <div class="menu-detail-card" v-for="(routeCard, index) in routeList" :key="index">
      <div class="menu-detail-title">
          {{routeCard.title}}
      </div>
      <div class="menu-detail-item-list">
        <div class="menu-detail-item" 
          v-for="(route, jIndex) in routeCard.children" 
          :key="jIndex" 
          @click="goRoute(route.routeName, $route.name===route.routeName)"
          :class="{'menu-detail-item-active':$route.name===route.routeName}">
            {{route.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    routeList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isDrawerShow: true,
    }
  },
  computed: {
    ...mapGetters(["permission_routes"]),
  },
  mounted() {
  },
  methods: {
    goRoute(routeName, isCurrentPage) {
      if (!isCurrentPage) {
        this.$emit('closeSlide');
        this.$router.push({
          name: routeName
        });
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variables.less";
.menu-detail-list {
  position: relative;
  padding: @navBarHeight 24px 0;
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;

  .menu-detail-card {
    position: relative;
    padding: 4px 0 10px;
    margin-bottom: 16px;
    box-sizing: border-box;
    border-bottom:1px dashed rgba(219,223,228,1);

    .menu-detail-title {
      font-size: 14px;
      font-weight: 400;
      color: rgba(153,153,153,1);
      line-height: 20px;
      margin-bottom: 14px;
    }
    .menu-detail-item-list {
      position: relative;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .menu-detail-item {
        min-width: 45%;
        font-size: 14px;
        font-weight: 400;
        color: rgba(85,85,85,1);
        line-height: 20px;
        text-align: left;
        margin-bottom: 10px;
        cursor: pointer;

        &:hover {
          color: rgba(1,105,251,0.7);
        }
      }

      .menu-detail-item-active {
        color: rgba(1,105,251,1) !important;
        cursor: initial;
      }
    }
  }
}

</style>
