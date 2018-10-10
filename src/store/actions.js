/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_CUSTOMERS,
  RECEIVE_CUSTOMER,
  RECEIVE_CONTRACTS,
  RECEIVE_CONTRACTTYPES,
  RECEIVE_USERS,
  RECEIVE_USER,
  RECEIVE_CONTRACT,
  RECEIVE_REMIND_CONTRACTS,
} from './mutation-types'
import {
  reqCustomers,
  reqContracts,
  reqContractTypes,
  reqUsers,
  reqAddUser,
  reqContract,
  reqRemindContracts,
} from '../api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/login'

export default {


  ToggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  ToggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },

  // 登录
  Login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(username, userInfo.password).then(response => {
        const data = response.data
        setToken(data.token)
        console.log("token:"+data.token)
        commit('SET_TOKEN', data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data
        if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', data.roles)

        } else {
          reject('getInfo: roles must be a non-null array !')
        }
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
///////////////////////////////////////////////////////////
  // 异步获取客户列表
  async getCustomers({commit},cname) {
    // 发送异步ajax请求
    // const {longitude, latitude} = state
    const result = await reqCustomers(cname)
      const customers = result
    // 提交一个mutation
    // if (result.code === 0) {
    commit(RECEIVE_CUSTOMERS, {customers})
    // }
  },
  // 异步获取合同类型列表
  async getContractTypes({commit}, callback) {
    const result = await reqContractTypes()
    // if (result.code === 0) {
      const contractTypes = result
      commit(RECEIVE_CONTRACTTYPES, {contractTypes})
      // 数据更新了, 通知一下组件
      // callback && callback()
    // }
  },
  // 异步获取合同列表
  async getContracts({commit}) {
    const result = await reqContracts()
    // if (result.code === 0) {
      const contracts = result
      commit(RECEIVE_CONTRACTS, {contracts})
      // 数据更新了, 通知一下组件
      // callback && callback()
    // }
  },
  // 异步获取需提醒合同列表
  async getRemindContracts({commit}) {
    const result = await reqRemindContracts()
    // if (result.code === 0) {
    // const remindContracts = result.data.content
    console.log(result)
    const remindContracts = result.content
    commit(RECEIVE_REMIND_CONTRACTS, {remindContracts})
    // 数据更新了, 通知一下组件
    // callback && callback()
    // }
  },
  // 异步根据id获取合同
  async getContract({commit},contractId) {
    const result = await reqContract(contractId)
    // if (result.code === 0) {
    const contract = result
    commit(RECEIVE_CONTRACT, {contract})
    // 数据更新了, 通知一下组件
    // callback && callback()
    // }
  },
  // 异步获取员工列表
  async getUsers({commit}) {
    const result = await reqUsers()
    // if (result.code === 0) {
    const users = result
    commit(RECEIVE_USERS, {users})
    // 数据更新了, 通知一下组件
    // callback && callback()
    // }
  },
  // 异步获取员工列表
/*  async addUser({commit}) {
    const result = await reqUsers()
    // if (result.code === 0) {
    const users = result
    console.log(result)
    commit(RECEIVE_USERS, {users})
  },*/

/*  async addContract({commit}) {
    const result = await reqAddContract()
    // if (result.code === 0) {
    const contracts = result
    console.log(result)
    commit(RECEIVE_CONTRACT, {contracts})
    // 数据更新了, 通知一下组件
    // callback && callback()
    // }
  },*/
}
