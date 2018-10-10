<template>
  <div class="app-container">
    <el-input style="width: 200px" v-model="cname" ></el-input>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="客户编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.cid }}
        </template>
      </el-table-column>
      <el-table-column label="客户名称" width="270" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.lkname }}
        </template>
      </el-table-column>
      <el-table-column label="手机" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="负责人" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.user.uname}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="80" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="routeToDetail(scope.row.cid)"
            type="info" plain
            size="mini">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getCustomers } from '../../api/customer'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage:1,
      pageSize:"10",
      total:0,
      cname:'',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // let pageNumber = this.currentPage
      let pageSize = this.pageSize
      // let query = {'page':this.currentPage,'size':this.pageSize}
      getCustomers(this.query).then(response => {
        this.list = response.content
        this.listLoading = false
        this.total = response.totalElements
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    routeToDetail(cid){
      this.$router.push(`editCustomer/${cid}`)
    },
    search() {
      this.listLoading = true
      console.log("searching...")
      // this.query = {'page':this.currentPage,'size':this.pageSize}
      this.currentPage = 1;
      getCustomers(this.query).then(response => {
        this.list = response.content
        this.listLoading = false
        this.total = response.totalElements
      })
    },
  },
  computed:{
    query(){
      return {page:this.currentPage,size:this.pageSize,cname:this.cname}
    }
  }
}
</script>
