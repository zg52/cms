import Cookies from 'js-cookie'

const state = {
  path: '/'
}

const mutations = {
  CHOOSES_MENU: (state, path) => {
    state.path = path;
  },
}

const actions = {
  chooseMunu({ commit }, path) {
    commit('CHOOSES_MENU', path);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
