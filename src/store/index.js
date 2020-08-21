/*
 * @Author: madongzhe
 * @Date: 2020-08-17 13:00:47
 * @LastEditors: madongzhe
 * @LastEditTime: 2020-08-20 15:44:57
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import user from './modules/user'
import tagsView from './modules/tagsView'
import course from './modules/course';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    user,
    tagsView,
    course
  },
  getters
})

export default store
