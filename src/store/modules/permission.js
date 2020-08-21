import { asyncRoutes, constantRoutes } from '@/router';
import Layout from '@/layout';

export function buildAsyncRoutes(routes, roleList) {
  try {
    let res = [];
    for (let i = 0; i < roleList.length; i++) {
      let role = roleList[i];
      let menuClassList = [];
      // 根菜单下的路由表
      let rootRouteList = [];
      // 根菜单下的分类里的路由列表
      let rootMenuRouteList = [];
      for (let j = 0; j < role.children.length; j++) {
        // console.log(role.children[j])
        role.children[j].children.forEach(routeLeaf => {
          let tmp = {};
          tmp.path = routeLeaf.path;
          tmp.name = routeLeaf.path;
          if (routeLeaf.component) {
            tmp.component = () => import(`@/views/${routeLeaf.component}`);
          }
          // 根节点按钮权限
          let routeLeafRoles = [];
          if (routeLeaf.children) {
            routeLeaf.children.forEach(val => {
              if (val.menuType === 2) {
                routeLeafRoles.push({
                  visible: val.visible,
                  status: val.status,
                  menuName: val.menuName
                });
              }
            });
          }
          // 根节点页面路由参数
          tmp.meta = {
            title: routeLeaf.menuName,
            menuType: routeLeaf.menuType,
            roles: routeLeafRoles
          };
          rootRouteList.push(tmp);
          rootMenuRouteList.push({
            title: routeLeaf.menuName,
            routeName: routeLeaf.path,
            roles: routeLeafRoles
          });
        })
        menuClassList.push({
          name: role.children[j].path,
          title: role.children[j].menuName,
          children: rootMenuRouteList
        });
      }
      // 一级系统分类菜单
      let menuMapSource = routes.find(val => val.name === role.path && val.meta && val.meta.menu ===1);
      let rootMenu = {
        path: `/${role.path}`,
        component: Layout,
        redirect: '/home',
        name: role.path,
        meta: {
          title: role.menuName,
          icon: menuMapSource && menuMapSource.meta && menuMapSource.meta.icon,
          menu: 1,
          menuList: menuClassList
        },
        children: rootRouteList
      };
      res.push(rootMenu);
    }
  return res;
  } catch (error) {
    console.log(error);
  }
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = buildAsyncRoutes(asyncRoutes, roles);
      accessedRoutes.concat({ path: '*', redirect: '/404', hidden: true });
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
