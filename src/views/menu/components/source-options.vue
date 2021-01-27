<template>
  <el-card>
    <template #header>
      <p class="menu-title">资源选项</p>
    </template>
    <el-row class="search-wrap" :gutter="10">
      <el-col :xs="24" :sm="12">
        <el-input
          placeholder="请输入内容"
          v-model="searchKey"
          size="small"
          class="search-box mb-10"
        >
          <template #append>
            <el-button icon="el-icon-search" />
          </template>
        </el-input>
      </el-col>
      <el-col :xs="24" :sm="12" class="search-wrap-right" >
        <el-button
          icon="el-icon-circle-plus-outline"
          size="small"
          type="primary"
          class="mb-10"
          plain
          :disabled="!enable"
          @click="addSourceHandler"
        >
          新增资源
        </el-button>
        <el-button
          icon="el-icon-download"
          size="small"
          type="primary"
          class="mb-10"
          :disabled="tableData.length == 0"
          @click="downloadCSV"
        >
          下载CSV
        </el-button>
      </el-col>
    </el-row>
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
      <el-table-column
        prop="path"
        label="资源路径"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="资源类型"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="method"
        label="请求类型"
        width="100"
        show-overflow-tooltip
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="资源描述"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="editSourceHandler(scope.$index, scope.row)"
          >
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="handleDelete('one', scope.$index)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button size="mini" :disabled="multipleSelectionLen === 0" @click="dialogBatchVisiable = true">
        批量修改
      </el-button>
      <el-button
        @click="handleDelete('many')"
        size="mini"
        type="danger"
        :disabled="multipleSelectionLen === 0"
      >
        批量删除
      </el-button>
    </div>
  </el-card>
  <el-dialog
    title="新增资源"
    v-model="dialogSourceVisiable"
    :close-on-click-modal="false"
    @close="dialogSourceCloseHandler"
  >
    <el-form
      :model="sourceForm"
      ref="sourceFormEl"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源类型" prop="type">
        <!-- <el-input v-model="type" autocomplete="off" /> -->
        <el-select v-model="type" placeholder="请选择资源类型">
          <el-option value="api" />
          <el-option value="btn" />
        </el-select>
      </el-form-item>
      <el-form-item label="请求类型" prop="method">
        <!-- <el-input v-model="method" autocomplete="off" /> -->
        <el-select v-model="method">
          <el-option value="GET" />
          <el-option value="POST" />
          <el-option value="HEAD" />
          <el-option value="DELETE" />
          <el-option value="PUT" />
          <el-option value="PATCH" />
          <el-option value="OPTIONS" />
        </el-select>
      </el-form-item>
      <el-form-item label="资源路径" prop="path">
        <el-input v-model="path" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源描述" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          maxlength="255"
          v-model="remark"
          autocomplete="off"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogSourceVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addSourceFormHandler">
          提 交
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    title="批量修改资源"
    v-model="dialogBatchVisiable"
    :close-on-click-modal="false"
    @close="dialogSourceCloseHandler"
  >
    <el-form
      :model="sourceForm"
      ref="sourceFormEl"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="资源类型" prop="type">
        <el-select v-model="type" placeholder="请选择资源类型">
          <el-option value="api" />
          <el-option value="btn" />
        </el-select>
      </el-form-item>
      <el-form-item label="请求类型" prop="method">
        <el-select v-model="method">
          <el-option value="GET" />
          <el-option value="POST" />
          <el-option value="HEAD" />
          <el-option value="DELETE" />
          <el-option value="PUT" />
          <el-option value="PATCH" />
          <el-option value="OPTIONS" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogBatchVisiable = false">取 消</el-button>
        <el-button type="primary" @click="batchEditHandler">
          提 交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { PropType, reactive, Ref, ref, toRefs, watch } from 'vue'
import { MenuTreeData, OperateType, SourceData, SourceForm } from './interface'
import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
import { uuidv4 } from '@/util/index'
import exportCSV from '@/util/export2csv'

export default {
  name: 'SoruceOptions',
  emits: ['changed'],
  props: {
    enable: {
      type: Boolean,
      required: true,
      default: false
    },
    curNodeName: {
      type: String,
      required: true,
      default: ''
    },
    formValue: { //当前选中的节点
      type: Object as PropType<MenuTreeData>,
      required: true
    },
    curOperateType: {
      type: String as PropType<OperateType>,
      required: true
    }
  },
  setup(props, { emit }) {
    const { curOperateType, formValue, curNodeName } = toRefs(props)
    const dialogSourceVisiable: Ref<boolean> = ref(false)
    const dialogBatchVisiable: Ref<boolean> = ref(false)
    const sourceForm: SourceForm = reactive({
      name: '',
      type: 'api',
      method: 'GET',
      path: '',
      remark: ''
    })
    let operateTag = 'add' //当前资源选项操作
    let curEditItem //当前操作的Source
    const searchKey = ''
    const tableData: SourceData[] = reactive(formValue.value.operations || [])
    const multipleTable: Ref = ref(null)
    const sourceFormEl: Ref = ref(null)
    const rules = {
      name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
      type: [{ required: true, message: '请选择资源类型', trigger: 'blur' }],
      method: [{ required: true, message: '请选择请求方式', trigger: 'blur' }],
      path: [{ required: true, message: '请输入资源路径', trigger: 'blur' }]
    }
    let multipleSelection: SourceData[] = []
    const multipleSelectionLen: Ref<number> = ref(0)

    function initialTableData(): void {
      const tempList = formValue.value.operations || []
      tableData.splice(0, tableData.length, ...tempList)
    }
    //formValue.value
    watch(curNodeName, () => {
      initialTableData()
    })

    watch(curOperateType, (newVal: OperateType) => {
      if (newVal === 'addBro' || newVal === 'addChild') {
        tableData.splice(0, tableData.length)
      } else {
        newVal && initialTableData()
      }
    })

    //提交
    function emitSourceDataData() {
      emit('changed', [...tableData])
    }

    function clearSelection(){
      multipleTable.value.clearSelection()
    }

    function handleSelectionChange(val: SourceData[]) {
      multipleSelection = val
      multipleSelectionLen.value = val.length
    }

    function addSourceFormHandler() {
      sourceFormEl.value.validate(valid => {
        if (!valid) {
          return
        }
        //进行ajax请求返回成功后提交
        //模拟id
        if (operateTag === 'add') {
          const _id = uuidv4()
          tableData.push({
            ...sourceForm,
            _id: _id
          })
          //提示添加成功
          ElMessage({ type: 'success', message: '添加成功' })
          //emit当前的dataTable
          dialogSourceVisiable.value = false
        } else if (operateTag === 'edit') {
          //ajax请求
          for (const key in sourceForm) {
            curEditItem[key] = sourceForm[key]
          }
          dialogSourceVisiable.value = false
        }
        emitSourceDataData()
      })
    }

    //editHandler
    function editSourceHandler(index, item) {
      curEditItem = item
      operateTag = 'edit'
      for (const key in item) {
        if (key !== '_id') {
          sourceForm[key] = item[key]
        }
      }
      dialogSourceVisiable.value = true
    }

    const deleteProcessor = {
      oneHandler: (index) => {
        tableData.splice(index!, 1)
        emitSourceDataData()
      },
      manyHandler: () => {
        if (multipleSelectionLen.value === tableData.length) {
          tableData.splice(0, multipleSelectionLen.value)
        } else {
          //没有响应式
          //tableData = tableData.filter(item => !multipleSelection.some(m => m._id === item._id))
          for(let i = 0; i < multipleSelection.length; i++) {
            const index = tableData.findIndex(item => item._id === multipleSelection[i]._id)
            index !== -1 && tableData.splice(index, 1)
          }
        }
        multipleSelection.splice(0, multipleSelectionLen.value)
        multipleSelectionLen.value = 0
        clearSelection()
        emitSourceDataData()
      }
    }

    //删除资源
    function handleDelete(tag: string, index?: number) {
      ElMessageBox({
        title: '提示',
        message: '确定删除该菜单和子菜单吗？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteProcessor[`${tag}Handler`](index)
        })
        .catch(() => {
          //do nothing
        })
    }

    //批量修改
    function batchEditHandler() {
      //获取内容
      if(!sourceForm.type || !sourceForm.method){
        ElMessage({ type: 'error', message: '请检查内容'})
      }
      for (let i = 0; i < multipleSelection.length; i ++) {
        const index = tableData.findIndex(item => item._id === multipleSelection[i]._id)
        if (index !== -1) {
          tableData[index].type = sourceForm.type
          tableData[index].method = sourceForm.method
        }
      }
      dialogBatchVisiable.value = false
      ElMessage({ type: 'success', message: '修改成功'})
    }

    //新增资源
    function addSourceHandler() {
      if(curOperateType.value !== 'editNode') {
         ElNotification({
          title: '温馨提示',
          message: '请先提交当前“菜单选项”内容,然后再点击修改，才可以添加内容哦',
          type: 'warning'
        })
        return
      }
      operateTag = 'add'
      dialogSourceVisiable.value = true
    }

    //下载csv
    function downloadCSV() {
      if (tableData.length !== 0) {
        exportCSV(tableData)
      }
    }

    function dialogSourceCloseHandler() {
      //重置
      sourceFormEl.value.resetFields()
    }

    return {
      rules,
      searchKey,
      tableData,
      multipleTable,
      multipleSelectionLen,
      handleSelectionChange,
      addSourceHandler,
      editSourceHandler,
      batchEditHandler,//批量修改
      dialogSourceVisiable,
      dialogBatchVisiable,
      sourceFormEl,
      downloadCSV,
      addSourceFormHandler,
      dialogSourceCloseHandler,
      handleDelete,
      sourceForm,
      ...toRefs(sourceForm)
    }
  }
}
</script>

<style scoped lang="stylus">
.search-wrap-right
  text-align: right
/deep/.el-button--text
  color: inherit
  &:hover
    color: #409EFF
/deep/.el-dialog
  width: 99% !important
/deep/.el-select
  width: 100%
.mb-10
  margin-bottom: 10px
</style>
