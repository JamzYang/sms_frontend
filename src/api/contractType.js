import request from '@/utils/request'

export function getContractTypes(params) {
  return request({
    url: '/contractType/all',
    method: 'get',
    params
  })
}

export function getContractType(cid) {
  return request({
    url: '/contractType/'+cid,
    method: 'get',
  })
}

export function addContractType(typeName,period,bookTime,price,customerType) {
  return request({
    url: '/contractType',
    method: 'POST',
    data:{
      typeName,period,bookTime,price,customerType
    }
  })
}

export function saveContractType(typeId,typeName,customerType,period,bookTime,price) {
  return request({
    url: '/contractType/update',
    method: 'POST',
    data:{
      typeId,typeName,customerType,period,bookTime,price
    }
  })
}
