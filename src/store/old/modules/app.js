import Cookies from 'js-cookie'
import { getUsers } from '../../../api/user'
import { getContractTypes } from '../../../api/contractType'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    contractTypes:[],
    users:[],
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },

    RECEIVE_USERS:(state,users)  => {
      state.users = users
    },
    RECEIVE_CONTRACTTYPES:(state,contractTypes)  => {
      state.contractTypes = contractTypes
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },

    GetUsers({ commit }) {
      return new Promise((resolve, reject) => {
        getUsers().then(response => {
          const users = response
          console.log("store users:"+this.users)
          commit('RECEIVE_USERS', users)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetContractTypes({ commit }) {
      return new Promise((resolve, reject) => {
        getContractTypes().then(response => {
          const contractTypes = response.content
          commit('RECEIVE_CONTRACTTYPES', contractTypes)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default app
