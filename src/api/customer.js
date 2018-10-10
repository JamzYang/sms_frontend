import request from '@/utils/request'

export function getCustomers(params) {
  return request({
    url: '/customer',
    method: 'get',
    params
  })
}

export function getCustomer(cid) {
  return request({
    url: '/customer/'+cid,
    method: 'get',
  })
}

export function addCustomer(cname,type,lkname,mobile,user) {
  return request({
    url: '/customer',
    method: 'POST',
    data:{
      cname,type,lkname,mobile,user
    }
  })
}

export function saveCustomer(cid,cname,type,lkname,mobile,user) {
  return request({
    url: '/customer/update',
    method: 'POST',
    data:{
      cid,cname,type,lkname,mobile,user
    }
  })
}
