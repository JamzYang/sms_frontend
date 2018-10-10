import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/contract',
    name: 'Dashboard',
    meta: { title: '面板', icon: 'dashboard' },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/customerList',
    name: 'Customer',
    meta: { title: '客户', icon: 'customer' },
    children: [
      {
        path: 'customerList',
        name: 'CustomerList',
        component: () => import('@/views/Customer/index'),
        meta: { title: '所有客户', icon: 'customerList' }
      },
      {
        path: 'newCustomer',
        name: 'newCustomer',
        component: () => import('@/views/Customer/newCustomer'),
        meta: { title: '新增客户', icon: 'new' }
      },
      {
        path: 'editCustomer/:cid',
        name: 'editCustomer',
        component: () => import('@/views/Customer/editCustomer'),
        meta: { title: '修改客户', icon: 'edit' },
        hidden:true
      },
    ]
  },
  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/remindContract',
    name: 'contract',
    meta: { title: '合同', icon: 'contract' },
    children: [
      {
        path: 'remindContract',
        name: 'remindContract',
        component: () => import('@/views/contract/remindContract'),
        meta: { title: '续签提醒', icon: 'contractRemind' }
      },
      {
        path: 'contractList',
        name: 'ContractList',
        component: () => import('@/views/contract/index'),
        meta: { title: '所有合同', icon: 'contractList' }
      },
      {
        path: 'newContract',
        name: 'newContract',
        component: () => import('@/views/contract/newContract'),
        meta: { title: '新增合同', icon: 'new' }
      },
      {
        path: 'editContract/:contractId',
        name: 'editContract',
        component: () => import('@/views/contract/editContract'),
        meta: { title: '修改合同', icon: 'edit' },
        hidden:true
      },
      {
        path: 'typeList',
        name: 'TypeList',
        component: () => import('@/views/contract/typeIndex'),
        meta: { title: '合同类型', icon: 'contractList' }
      },
      {
        path: 'editType/:typeId',
        name: 'editType',
        component: () => import('@/views/contract/editType'),
        meta: { title: '修改类型', icon: 'edit' },
        hidden:true
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
