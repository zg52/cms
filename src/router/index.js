/*
 * @FileDescription: 描述信息
 * @Author: smy
 * @Date: 2020-08-20 09:11:41
<<<<<<< HEAD
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-20 19:39:42
=======
 * @LastEditors: smy
 * @LastEditTime: 2020-08-20 19:09:08
>>>>>>> dev_sunmingye
 */
import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

// 教务菜单
import { educational } from './menuList/educational'
// 教研菜单
import { research } from './menuList/research'
// 营销菜单
import { marketing } from './menuList/marketing'
// CMS内容发布菜单
import { content } from './menuList/content'
// BI菜单
import { bi } from './menuList/bi'
// 配置管理系统菜单
import { setting } from './menuList/setting'

// demo菜单
// import { nested } from './menuList/nested';

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '首页',
          isHome: 1,
          affix: true
        }
      }
    ]
  }
]

export const asyncRoutes = [
  research,
  educational,
  setting,
  marketing,
  content,
  bi
  // nested,
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
