<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="客户类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customerType | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同类型" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.typeName }}
        </template>
      </el-table-column>
      <el-table-column label="合同期限" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.period }}
        </template>
      </el-table-column>
      <el-table-column label="提前提醒" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.bookTime }}
        </template>
      </el-table-column>
      <el-table-column label="合同金额" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="80" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="routeToDetail(scope.row.typeId)"
            type="info" plain
            size="mini">
            编辑
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
import { getContractTypes } from '../../api/contractType'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '一般纳税人',
        2: '小规模企业',
        3: '个体工商户'
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
      customerTypes:[{id:'1',typeName:'一般纳税人'},{id:'2',typeName:'小规模企业'},{id:'3',typeName:'个体工商户'}],
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
      getContractTypes(this.query).then(response => {
        this.list = response.content
        this.listLoading = false
        this.total = response.totalElements
        console.log('list'+this.list)
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    routeToDetail(typeId){
      this.$router.push(`editType/${typeId}`)
    },
  },
  computed:{
    query(){
      return {page:this.currentPage,size:this.pageSize,cname:this.cname}
    }
  }
}
</script>
