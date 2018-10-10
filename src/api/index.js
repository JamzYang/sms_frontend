/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = 'http://localhost:8088'
// const BASE_URL = 'http://192.168.1.11:8088'
// const BASE_URL = 'http://yangsn.vaiwan.com:8081'

// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})


/////////////////////////////////////////////
////////////////////////////////////////////
/**
 * 获取客户数组
 */
// export const reqCustomers = (cname) => ajax(BASE_URL+'/customer',{cname})
export function reqCustomers(cname){
  if(cname){
    return ajax(BASE_URL+'/customer',{cname})
  }else{
    return ajax(BASE_URL+'/customer/all')
  }
}

/**
 * 获取合同类型数组
 */
export const reqContractTypes = () => ajax(BASE_URL+'/contractType/all')
/**
 * 获取合同数组
 */
export const reqContracts = () => ajax(BASE_URL+'/contract/all')

/**
 * 获取需提醒合同数组
 */
export const reqRemindContracts = () => ajax(BASE_URL+'/contract/remind')

/**
 * 根据id获取合同
 */
// export const reqContract = (contractId) => ajax(BASE_URL+'/contract',{contractId})
export const reqContract = (contractId) => ajax(BASE_URL+`/contract/${contractId}`)

/**
 * 获取员工数组
 */
export const reqUsers = () => ajax(BASE_URL+'/user/all')

export const reqAddUser = (user) => ajax(BASE_URL+'/user',user,"POST")
export const reqAddCustomer = ({cname,lkname,mobile,user}) => ajax(BASE_URL+'/customer',{cname,lkname,mobile,user},"POST")
// export const reqAddContract = (contract) => ajax(BASE_URL+'/contract',contract,"POST")
export const reqAddContract = ({customer, contractType, price, startDate, endDate,remindDate,seller,accountant}) => ajax(BASE_URL+'/contract',{customer, contractType, price, startDate, endDate,remindDate,seller,accountant},"POST")
export const reqUpdateContract = ({contractId,customer, contractType, price, startDate, endDate,remindDate,seller,accountant,state}) => ajax(BASE_URL+'/contract/update',{contractId,customer, contractType, price, startDate, endDate,remindDate,seller,accountant,state},"POST")

// 4、根据经纬度和关键字搜索商铺列表
// export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})
