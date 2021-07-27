import { login, logout, GetUserInfo, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    isAdmin: false // 是否管理员
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    AUTH_ADMIN(state, bool) {
      state.isAdmin = bool
    }
  },

  actions: {
    // 登录
    logins({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.adminid, userInfo.password)
          .then(async response => {
            const data = response
            console.log(data, '>>>>用户信息')
            // const tokens = '1b90efb176a31a2b8cc148ed2ef44396314f1aac'
            setToken(response.data)
            commit('SET_TOKEN', response.data)
            const userInfo = await GetUserInfo(data.data)
            commit('AUTH_ADMIN', userInfo.data)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(getToken('SET_TOKEN'))
          .then(response => {
            const data = response.data
            commit('SET_NAME', data.username)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(state.token)
        // logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        // commit('SET_TOKEN', '')
        // commit('SET_ROLES', [])
        // removeToken()
        resolve()
        // }).catch(error => {
        // reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
