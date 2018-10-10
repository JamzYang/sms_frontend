import request from '@/utils/request'

export function getContracts(params) {
  return request({
    url: '/contract',
    method: 'get',
    params
  })
}

export function getRemindContracts(params) {
  return request({
    url: '/contract/remind',
    method: 'get',
    params
  })
}

export function getContract(contractId) {
  return request({
    url: '/contract/'+contractId,
    method: 'get',
  })
}

export function addContract(customer, contractType, price, startDate, endDate,remindDate,seller,accountant) {
  return request({
    url: '/contract',
    method: 'POST',
    data:{
      customer, contractType, price, startDate, endDate,remindDate,seller,accountant
    }
  })
}

export function saveContract(contractId,customer, contractType, price, startDate, endDate,remindDate,seller,accountant,state) {
  return request({
    url: '/contract/update',
    method: 'POST',
    data:{
     contractId, customer, contractType, price, startDate, endDate,remindDate,seller,accountant,state
    }
  })
}
