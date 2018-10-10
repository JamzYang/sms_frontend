<template>
  <div class="app-container">
    <el-form ref="contractType" :model="contractType" label-width="100px" >
      <el-form-item label="合同类型">
        <el-input v-model="contractType.typeName"/>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-radio-group v-model="contractType.customerType">
          <el-radio label="1" >一般纳税人</el-radio>
          <el-radio label="2" >小规模企业</el-radio>
          <el-radio label="3" >个体工商户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合同期限(月)">
        <el-input v-model="contractType.period" type="number" placeholder="请输入月数"/>
      </el-form-item>
      <el-form-item label="提前提醒(月)">
        <el-input v-model="contractType.bookTime" type="number" placeholder="请输入月数"/>
      </el-form-item>
      <el-form-item label="合同金额(元)">
        <el-input v-model="contractType.price" type="number" placeholder="请输入金额"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getUsers } from '../../api/user'
  import { addCustomer } from '../../api/customer'
export default {
  data() {
    return {
      customer:{
        cname:'',
        type:'',
        lkname:'',
        mobile:'',
        user:{},
      },
      users:[],
    }
  },
  mounted(){
    this.fetchUser()
  },
  methods: {
    onSubmit() {
      const {cname,type,lkname,mobile,user} = this.customer
      addCustomer(cname,type,lkname,mobile,user)
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchUser(){
      getUsers().then(response =>{
        this.users = response
        })
    },
  },
  computed:{
    sellers(){
      let users = this.users.filter(item =>{
        return item.title =='业务'
      })
      return users
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

