<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      row-key="contractId"
      :expand-row-keys="expands"
      @row-click="rowClick"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="合同类型">
              <span>{{ props.row.contractType.typeName }}</span>
            </el-form-item>
            <el-form-item label="生效日期">
              <span>{{ props.row.startDate }}</span>
            </el-form-item>
            <el-form-item label="结束日期">
              <span>{{ props.row.endDate }}</span>
            </el-form-item>
            <el-form-item label="提醒日期">
              <span>{{ props.row.remindDate }}</span>
            </el-form-item>
            <el-form-item>
                <el-button
                  @click.native.prevent="routeToDetail(props.row.contractId)"
                  type="info" plain size="mini">修改
                </el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column  label="合同编号" prop="contractId" width="150">
         <!-- {{ prop.row.contractId }}-->
      </el-table-column>
      <el-table-column label="客户名称" prop="customer.cname" width="270" align="center">
      </el-table-column>
      <el-table-column label="终止日期" prop="endDate" width="100" align="center">
      </el-table-column>
      <el-table-column label="合同金额" prop="price" width="80" align="center">
      </el-table-column>
      <el-table-column label="业务" prop="seller.uname" width="80" align="center">
         <!-- {{ prop.row.seller.uname}}-->
      </el-table-column>
      <el-table-column label="会计" prop="accountant.uname" width="80" align="center">
          <!--{{ prop.row.accountant.uname}}-->
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getRemindContracts} from '../../api/contract'

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
      expands: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      let pageSize = this.pageSize
      getRemindContracts(this.query).then(response => {
        this.list = response.content
        this.listLoading = false
        this.total = response.totalElements
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    routeToDetail(contractId){
      this.$router.push(`editContract/${contractId}`)
    },
    //在<table>里，我们已经设置row的key值设置为每行数据id：row-key="contractId"
    rowClick(row, event, column) {
        Array.prototype.remove = function (val) {
            let index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        if (this.expands.indexOf(row.contractId) < 0) {
            this.expands.push(row.contractId);
        } else {
            this.expands.remove(row.contractId);
        }
    }
  },
  computed:{
    query(){
      return {'page':this.currentPage,'size':this.pageSize,'keyWord':this.keyWord}
    }
  }
}
</script>
<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
