<template>
  <div class="app-container">
    <el-form ref="contract" :model="contract" label-width="100px">
      <el-form-item label="客户名称">
        <el-select v-model="contract.customer" disabled>
          <el-option
            :label="contract.customer.cname"
            :value="contract.customer">
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
        <el-select v-model="contract.contractType" placeholder="请选择" value-key="typeId">
          <el-option
            v-for="(type,index) in contractTypes"
            :key="index"
            :label="type.typeName"
            :value="type">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="赠送时间">
        <el-input v-model="contract.extraTime" placeholder="请输入赠送月数" type="number"/>
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
          <el-select v-model="contract.seller" value-key="uid" placeholder="请选择">
           <el-option
             v-for="(seller,index) in sellers"
             :key="index"
             :label="seller.uname"
             :value="seller">
           </el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="会计">
        <el-select v-model="contract.accountant" value-key="uid" placeholder="请选择">
          <el-option
            v-for="(accountant,index) in accountants"
            :key="index"
            :label="accountant.uname"
            :value="accountant">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="合同状态">
        <el-radio-group v-model="contract.state">
          <el-radio label="1"  :checked="contract.state=='1'">已签订</el-radio>
          <el-radio label="2"  :checked="contract.state=='2'">已续签</el-radio>
          <el-radio label="0"  :checked="contract.state=='0'">不再续签</el-radio>
        </el-radio-group>
        <!--<el-select v-model="contract.state" placeholder="please select">
          <el-option label="已签订":value="1"/>
          <el-option label="已续签":value="2"/>
          <el-option label="不再续签":value="0"/>
        </el-select>-->
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
  import { saveContract } from '../../api/contract'
  import { getContract } from '../../api/contract'
  import { getCustomers } from '../../api/customer'
  import { getContractTypes } from '../../api/contractType'
export default {
  data() {
    return {
      contract:{
        contractId:'',
        customer:{cid:'',cname:'',type:'',lkname:'',mobile:'',user:{}},
        contractType:{typeId:'',typeName:'',period:0,bookTime:0,price:0,customerType:''},
        price:0,
        extraTime:0,
        startDate:new Date(),
        endDate:'',
        remindDate:'',
        seller:{uid:'',uname:''},
        accountant:{uid:'',uname:''},
        state:'',
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
    let contractId = this.$route.params.contractId
    getContract(contractId).then(response =>{
      this.contract = response
    })
    console.log("contract:"+JSON.stringify(this.contract))
  },
  mounted(){

    this.$store.dispatch('GetUsers')
    this.$store.dispatch('GetContractTypes')
  },
  methods: {
    onSubmit() {
      const {contractId,customer, contractType, price, startDate, endDate,remindDate,seller,accountant,state} = this.contract
      saveContract(contractId,customer, contractType, price, startDate, endDate,remindDate,seller,accountant,state)
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
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
      if(this.contract.customer && this.contract.customer.cid){
         this.customers.forEach(function(customer,k) {
          if(customer.cid == vm.contract.customer.cid){
            vm.contract.customer = customer
          }
        })
      }
      return  this.$store.getters.contractTypes.filter(item =>{
          console.log("-----")
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
      let vm = this
      if(vm.contract.contractType.typeId){
        this.contractTypes.forEach(function(type,k) {
          if(vm.contract.contractType.typeId = type.typeId){
            vm.contract.contractType = type
          }
        })
      }
      this.contract.price = this.contract.contractType.price
      return this.contract.price
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
      console.log("month:  "+this.contract.endDate.getMonth()-this.contract.contractType.bookTime)
      remindDate.setMonth(this.contract.endDate.getMonth()-this.contract.contractType.bookTime)
      this.contract.remindDate = remindDate
    },
  },
  watch:{
    customer:function() {
     console.log("customer"+this.contract.customer)
      this.contractTypes = this.$store.getters.contractTypes.filter(item =>{
        return item.customerType == this.contract.customer.type
      })
    },
    /*price:function() {
    },
    endDate:function() {
    },
    remindDate:function() {
    },*/
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

