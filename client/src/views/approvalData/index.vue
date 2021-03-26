<template>
 <div class="index">
   <div class="index-head">
     审批报销单推送到钉钉群
   </div>
   <div class="index-operate">
       <el-button type="primary" size="small" @click="showAddTemp = true, detail = ''">新增推送设置</el-button>
   </div>
   <div class="table-comps index-table">
  <el-table
    :data="tableData"
    stripe
    border
    size="small"
    :row-class-name="getRowClass"
    :height="$store.state.innerHeight -145"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="group_name"
      label="推送钉钉群名">
    </el-table-column>
    <el-table-column
      prop="task"
      label="推送时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="keywords"
      label="安全关键字"
      >
    </el-table-column>
     <el-table-column
      prop="created_at"
      label="创建时间"
      sortable>
    </el-table-column>
    <el-table-column  width="230" label="操作">
      <template slot-scope="scope">
        <el-button
        :disabled="scope.row.switch === 0"
          size="small"
          @click="showAddTemp = true, detail = scope.row">编辑</el-button>
        <el-button
          v-if="scope.row.switch === 1"
          size="small"
          @click="switchTemplate(scope.row)">停用</el-button>
          <el-button
          v-else-if="scope.row.switch === 0"
          size="small"
          @click="switchTemplate(scope.row)">启用</el-button>
        <el-button
          size="small"
          type="danger"
          @click="delTemplate(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="index-page">
    <q-page :page="page" @loadData="loadData"></q-page>
  </div>
      <add-approval v-model="showAddTemp" :detail="detail" @updatData="loadData()"></add-approval>
   </div>
 </div>
</template>

<script>
import QPage from '../common/q-page'
import AddApproval from './addApproval'
export default {
  components: {
    QPage,
    AddApproval
  },
  data () {
    return {
      tableData: [],
      page: {
        no: 1,
        size: 20,
        total: 0
      },
      showAddTemp: false,
      detail: '',
      weChatNameList: []
    }
  },
  created () {
    // this.$router.push('/Home')
    this.corp_id = sessionStorage.getItem('corp_id')
    this.user_id = sessionStorage.getItem('user_id')
    this.loadData()
  },
  methods: {
    loadData () {
      let params = {
        page: this.page.no,
        page_size: this.page.size,
        sort: 'desc',
        where: {
          rules_type: 2,
          corp_id: this.corp_id,
          user_id: this.user_id
        }
      }
      // params = JSON.stringify(params.where)
      this.apis.getRulesFind(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.data
        }
      }).catch((err) => {
        this.$message.warning(err.msg)
      })
    },
    delTemplate (val) {
      this.$confirm('此操作将永久删除该推送, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          corp_id: this.corp_id,
          user_id: this.user_id,
          id: val.id
        }
        console.log(params)
        this.apis.getRulesDelete(params).then((res) => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.loadData()
          }
        }).catch((err) => {
          console.log(err)
          this.$message.warning(err.msg)
        })
      }).catch(() => {
      })
    },
    switchTemplate (val) {
      console.log(val)
      if (val.switch === 0) {
        val.switch = 1
      } else if (val.switch === 1) {
        val.switch = 0
      }
      let params = {
        corp_id: this.corp_id,
        user_id: this.user_id,
        switch: val.switch,
        id: val.id
      }
      this.apis.getRulesModify(params).then((res) => {
        if (res.code === 0) {
          if (val.switch === 1) {
            this.$message({
              message: '启用成功',
              type: 'success'
            })
          } else if (val.switch === 0) {
            this.$message({
              message: '停用成功',
              type: 'success'
            })
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          if (val.switch === 0) {
            val.switch = 1
          } else if (val.switch === 1) {
            val.switch = 0
          }
        }
      }).catch((err) => {
        this.$message.warning(err.msg)
      })
    },
    getRowClass ({ row }) {
      return row.switch === 0 ? 'f-forbidden' : (row.switch === 1 ? '' : '')
    }
  }
}
</script>

<style lang='less' scoped>
.index{
  .index-head {
  font-family: 'nvshu';
   text-align: center;
   padding: 10px;
   font-size: 16px;
   border: 1px solid #f2f2f2;
  }
  .index-operate {
    display: flex;
    flex-direction:row-reverse;
    padding:10px;
    padding-right: 50px;
  }
  .index-table {
    padding: 0 10px;
  }
  .index-page {
    padding-top: 10px;
    display: flex;
    flex-direction:row-reverse;
    // padding-right: 50px;
  }
}
</style>
<style lang="less">
// @import '../../assets/css/font.css';
.table-comps {
  .action-btns-dv {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    .selection {
      line-height: 29px;
      margin-right: 12px;
      span {
        padding-right: 10px;
        border-right: 1px solid #ccc;
      }
    }
  }
  .el-table .cell {
    padding-left: 5px !important;
    padding-right: 5px !important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow:ellipsis !important;
    word-break: break-all;
    // line-height: 40px !important;
  }
  .el-table td.gutter, .el-table th.gutter {
    background-color: #f2f2f2;
  }
  .el-table--mini, .el-table--small, .el-table__expand-icon {
    font-size: 13px !important;
  }
  .el-table-column--selection .cell {
    padding-left: 14px !important;
  }
  .text-center-sty {
    .el-table td, .el-table th {
      text-align: center !important;
    }
  }
  .el-table {
    color: #111 !important;
  }
  .el-table thead {
    color: #333 !important;
  }
  .el-table--small td, .el-table--small th {
    padding: 0 !important;
    line-height: 42px !important;
    height: 42px !important;
  }
  .el-table__body tr.current-row>td {
    background-color: #F5F7FA;
  }
}
</style>
