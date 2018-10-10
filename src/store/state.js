/*
状态对象
 */
import Cookies from 'js-cookie'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',

  token: getToken(),
  name: '',
  avatar: '',
  roles: [],

  customers:[],
  contractTypes:[],
  contracts:[],
  users:[],
  contract:{},
  remindContracts:[],
}
