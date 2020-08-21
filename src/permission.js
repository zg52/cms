/*
 * @Author: your name
 * @Date: 2020-08-06 08:51:08
 * @LastEditTime: 2020-08-19 09:59:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \based:\web\omo-crm\src\permission.js
 */
import router from './router';
import store from './store';
import NProgress from "NProgress";
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo');
          const roles = await store.dispatch('user/getRoles');
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
          // const roles = [];
          // const accessRoutes = [];
          router.addRoutes(accessRoutes);
          if (roles.length === 0) {
            console.log(to.path, from);
            if (to.path === '/home') {
              next();
            } else {
              next('/home');
            }
          } else {
            next({ ...to, replace: true })
          }
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          const err = {...error};
          Message.error('获取用户信息失败：' + err.response && err.response.data && err.response.data.message || error || '获取用户信息失败');
          next(`/login?redirect=${to.path}`);
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

function setRouteActive(aimPath, routeList) {
  routeList.map(item => {
    if (item.path === aimPath) {
      item.meta['isActive'] = true;
    } else {
      item.meta['isActive'] = false;
    }
  })
}