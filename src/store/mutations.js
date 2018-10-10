/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_CUSTOMERS,
  RECEIVE_CONTRACTTYPES,
  RECEIVE_CONTRACTS,
  RECEIVE_USERS,
  RECEIVE_CONTRACT,
  RECEIVE_REMIND_CONTRACTS,
} from './mutation-types'
import Cookies from 'js-cookie'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
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

  [RECEIVE_CUSTOMERS](state, {customers}) {
    state.customers = customers
  },
  [RECEIVE_CONTRACTTYPES](state, {contractTypes}) {
    state.contractTypes = contractTypes
  },
  [RECEIVE_CONTRACTS](state, {contracts}) {
    state.contracts = contracts
  },
  [RECEIVE_USERS](state, {users}) {
    state.users = users
  },
  [RECEIVE_CONTRACT](state, {contract}) {
    state.contract = contract
  },
  [RECEIVE_REMIND_CONTRACTS](state, {remindContracts}) {
    state.remindContracts = remindContracts
  },
}
