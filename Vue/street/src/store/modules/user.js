import { login, GetUserInfo, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    street: '',
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
    },
    SET_STREET(state, str) {
      state.street = str
    }
  },

  actions: {
    // 登录
    logins({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.adminid, userInfo.password)
          .then(async response => {
            if (response.code == '200') {
              const data = response
              setToken(response.data)
              commit('SET_TOKEN', response.data)
              commit('SET_STREET', response.street)
              const userInfo = await GetUserInfo(data.data)
              commit('AUTH_ADMIN', userInfo.data)
              resolve(data)
            } else {
              reject(response)
            }
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
