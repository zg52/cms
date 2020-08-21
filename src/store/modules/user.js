import { login, logout, getUserInfo, getMenuTreeList } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: null,
    name: '',
    avatar: '',
    userInfo: null,
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: username.trim(), password: password }).then(response => {
        if (response.code === '200') {
          console.log(response);
          const token = response.data.token;
          commit('SET_TOKEN', token);
          setToken(token);
          resolve();
        }
      }).catch(error => {
        console.log(error);
        reject(error);
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        console.log(response);
        if (response.code === '200') {
          const data = response.data;
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { nickName, id } = data
  
          commit('SET_NAME', nickName);
          // commit('SET_AVATAR', avatar);
          commit('SET_USERID', id);
          commit('SET_USERINFO', data);
          resolve(data)
        } else {
          reject(response.data.msg || '获取用户信息失败');
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getRoles({ commit, state }) {
    return new Promise((resolve, reject) => {
      const params = {
        userId: state.userId
      }
      getMenuTreeList(params).then(res => {
        if (res.code === '200') {
          commit('SET_ROLES', res.data);
          resolve(res.data);
        } else {
          reject(res.msg||'获取权限失败');
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

