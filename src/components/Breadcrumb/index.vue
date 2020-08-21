<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
        <!-- <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a> -->
        <a v-if="index===0" @click.prevent="handleLink(item)" :class="{'home-icon':item.meta.isHome===1}">{{ item.meta.title }}</a>
        <span v-if="index>0&&item.meta.isHome!==1" class="no-redirect">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { constantRoutes } from '@/router';
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      const first = matched[0];
      if (!this.isDashboard(first)) {
        const homeRoute = constantRoutes.filter(item => item.path === '/');
        matched = homeRoute[0].children.concat(matched);
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      this.$router.push({
        name: item.name
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variables.less";
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  line-height: @navBarMenuHeight;
  margin-left: 8px;
  font-weight:normal;
  padding-left: 16px;

  .home-icon {
    font-weight:normal;
    padding-left: 20px;
    background: url("~@/assets/imgs/icons/home.png") no-repeat left center;
    background-size: 16px auto;
    font-size: 14px;
    color:rgba(73,80,96,1);

    &:hover {
      color: #666666;
    }
  }

  .no-redirect {
    color:rgba(73,80,96,1);
    font-size: 14px;
    cursor: text;
  }
}
</style>
