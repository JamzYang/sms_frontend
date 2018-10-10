<template>
  <div class="app-container">
    <el-form ref="contract" :model="contract" label-width="100px">
      <el-form-item label="客户名称">
        <el-select
          v-model="contract.customer.cid"
          filterable
          remote
          clearable
          reserve-keyword
          placeholder="请输入搜索关键词"
          :remote-method="remoteMethod"
          :loading="loading1">
          <el-option
            v-for="(customer,index) in customers"
            :key="index"
            :label="customer.cname"
            :value="customer.cid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-radio-group v-model="contract.customer.type" disabled>
          <el-radio label="1"  :checked="contract.customer.type=='1'">一般纳税人</el-radio>
          <el-radio label="2"  :checked="contract.customer.type=='2'">小规模企业</el-radio>
          <el-radio label="3"  :checked="contract.customer.type=='3'">个体工商户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合同类型">
        <el-select v-model="contract.contractType" value-key="typeId" placeholder="请选择">
          <el-option
            v-for="(type,index) in contractTypes"
            :key="index"
            :label="type.typeName"
            :value="type">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="赠送时间">
        <el-input v-model="contract.extraTime" placeholder="请输入赠送月数" type="number" />
      </el-form-item>
      <el-form-item label="合同金额">
        <el-input v-model="contract.price" type="number"/>
      </el-form-item>
      <el-form-item label="生效日期">
        <el-date-picker
          v-model="contract.startDate"  type="month"  placeholder="选择月" format="yyyyMM">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="终止日期">
        <el-date-picker
          v-model="contract.endDate"  type="month"  placeholder="选择月" format="yyyyMM">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="续单提醒">
        <el-date-picker
          v-model="contract.remindDate"  type="month"  placeholder="选择月" format="yyyyMM">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="业务">
          <el-select v-model="contract.seller.uid" placeholder="请选择">
           <el-option
             v-for="(user,index) in sellers"
             :key="index"
             :label="user.uname"
             :value="user.uid">
           </el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="会计">
        <el-select v-model="contract.accountant.uid" placeholder="请选择">
          <el-option
            v-for="(user,index) in accountants"
            :key="index"
            :label="user.uname"
            :value="user.uid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import { getUsers } from '../../api/user'
  import { addContract } from '../../api/contract'
  import { getCustomers } from '../../api/customer'
  import { getContractTypes } from '../../api/contractType'
export default {
  data() {
    return {
      contract:{
        customer:{cid:'',cname:'',type:'',lkname:'',mobile:'',user:{}},
        contractType:{typeId:'',typeName:'',period:0,bookTime:0,price:0,customerType:''},
        price:0,
        extraTime:0,
        startDate:new Date(),
        endDate:'',
        remindDate:'',
        seller:{uid:'',uname:''},
        accountant:{uid:'',uname:''},
      },
      // users:[],
      customers:[],
      loading1: false,
      // contractTypes:[],
      // contractType:null,
      // customerType:'',
      // extraTime:'',
      // startDate: '',
    }
  },
  created(){
/*    console.log("contract:"+JSON.stringify(this.contract))*/
  },
  mounted(){
    this.$store.dispatch('GetUsers')
    this.$store.dispatch('GetContractTypes')
  },
  methods: {
    onSubmit() {
      this.contract.startDate.setDate(1)
      this.contract.endDate.setDate(1)
      this.contract.remindDate.setDate(1)
      const {customer, contractType, price, startDate, endDate,remindDate,seller,accountant} = this.contract
      addContract(customer, contractType, price, startDate, endDate,remindDate,seller,accountant)
    },
    onCancel() {
      this.$router.back()
    },
    remoteMethod (cname) {
      if (cname !== '') {
        this.loading1 = true;
        getCustomers({cname}).then(res => {
          this.loading1 = false
          this.customers = res.content
        })
      }
    },
  },
  computed:{
    users(){
      return this.$store.getters.users
    },
    contractTypes(){
      let vm = this
      if(this.contract.customer.cid){
         this.customers.forEach(function(customer,k) {
          if(customer.cid == vm.contract.customer.cid){
            vm.contract.customer = customer
          }
        })
      }
      return  this.$store.getters.contractTypes.filter(item =>{
          return item.customerType == this.contract.customer.type
        })
      // }.
    },
    sellers(){
      let users = this.users.filter(item =>{
        return item.title =='业务'
      })
      return users
    },
    accountants(){
      let users = this.users.filter(item =>{
        return item.title =='会计'
      })
      return users
    },
    price () {
      this.contract.price = this.contract.contractType.price

    },
    endDate () {
      let extraTime = parseInt(this.contract.extraTime)
      if(this.contract.extraTime == ''){
        extraTime = 0
      }
      let monthVal = parseInt(this.contract.startDate.getMonth())+
        parseInt(this.contract.contractType.period)+extraTime -1
      let endDate = new Date()
      endDate.setFullYear(this.contract.startDate.getFullYear())
      endDate.setMonth(monthVal)
      this.contract.endDate = endDate
      return endDate
    },
    remindDate(){
      let remindDate = new Date()
      remindDate.setFullYear(this.contract.endDate.getFullYear())
      remindDate.setMonth(this.contract.endDate.getMonth()-this.contract.contractType.bookTime)
      this.contract.remindDate = remindDate
    },
  },
  watch:{
    customer:function() {
     console.log(this.customer)
      this.contractTypes = this.$store.getters.contractTypes.filter(item =>{
        return item.customerType == this.customer.type
      })
    },
    price:function() {
    },
    endDate:function() {
    },
    remindDate:function() {
    },
  /* 'contract.contractType.typeId':function() {
     let vm = this
     if(vm.contract.contractType.typeId){
       this.contractTypes.forEach(function(type,k) {
         if(vm.contract.contractType.typeId = type.typeId){
           vm.contract.contractType = type
         }
       })
     }
     this.contract.price = this.contract.contractType.price
   }*/
   /* 'contract.contractType':function() {
      console.log("contract:"+JSON.stringify(this.contract))
    }*/
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

