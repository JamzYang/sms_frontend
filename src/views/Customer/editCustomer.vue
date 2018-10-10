<template>
  <div class="app-container">
    <el-form ref="customer" :model="customer" label-width="100px" >
      <input v-model="customer.cid"  style="display: none"/>
      <el-form-item label="客户名称">
        <el-input v-model="customer.cname"/>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-radio-group v-model="customer.type">
          <el-radio label="1"  :checked="customer.type=='1'">一般纳税人</el-radio>
          <el-radio label="2"  :checked="customer.type=='2'">小规模企业</el-radio>
          <el-radio label="3"  :checked="customer.type=='3'">个体工商户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="customer.lkname"/>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="customer.mobile"/>
      </el-form-item>
      <el-form-item label="业务">
          <el-select v-model="customer.user" placeholder="请选择">
           <el-option
             v-for="(user,index) in sellers"
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
  import { getUsers } from '../../api/user'
  import { saveCustomer } from '../../api/customer'
  import { getCustomer } from '../../api/customer'
export default {
  data() {
    return {
      customer:{
        cid:'',
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
    this.fetchCustomer()
    this.fetchUser()
  },
  methods: {
    onSubmit() {
      const {cid,cname,type,lkname,mobile,user} = this.customer
      saveCustomer(cid,cname,type,lkname,mobile,user)
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
    fetchCustomer(){
      let cid = this.$route.params.cid
      getCustomer(cid).then(response =>{
        this.customer = response
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

