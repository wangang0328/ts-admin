<template>
  <el-card>
    <template #header>
      <p class="menu-title">资源选项</p>
    </template>
    <div class="search-wrap">
      <el-input placeholder="请输入内容" v-model="searchKey" size="small" class="search-box">
        <template #append>
          <el-button icon="el-icon-search" />
        </template>
      </el-input>
      <el-button icon="el-icon-download" size="small" type="primary">
        下载SVC
      </el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="资源名称" width="120" sortable>
        <template #default="scope"> {{ scope.row.name }} </template>
      </el-table-column>
      <el-table-column prop="path" label="资源路径" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="method"
        label="请求类型"
        width="120"
        show-overflow-tooltip
        sortable
      >
      </el-table-column>
      <el-table-column prop="regmark" label="资源描述" min-width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button size="mini">
        批量修改
      </el-button>
      <el-button @click="toggleSelection()" size="mini" type="danger">
        批量删除
      </el-button>
    </div>
  </el-card>
</template>

<script>
/* opid	string	否		操作id -> uuid
name	string	否		资源名称
type	string	否		资源类型，btn-按钮，api-资源路径
method	string	否		请求类型，GET,POST等
path	string	否		资源路径，api请求路径
regmark */
export default {
  name: 'SoruceOptions',
  data() {
    return {
      searchKey: '',
      tableData: [
        {
          _id: '',
          name: '王小虎',          
          type: 'api',
          method: 'GET',
          path: '/reg/add',
          regmark: '描述'
        }
      ],
      multipleSelection: []
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped lang="stylus">
/deep/.el-button--text
  color: inherit
  &:hover
    color: #409EFF
.search-wrap
  display: flex
  justify-content: space-between
  .search-box
    max-width: 300px
    margin-right: 20px
</style>
