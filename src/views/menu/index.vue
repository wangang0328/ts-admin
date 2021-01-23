<template>
  <el-row :gutter="10" class="menu-wrapper px-10">
    <el-col :xs="24" :sm="9" :md="7">
      <MenuList @selectedNameChange="menuSelectedChangeHandler" @curOperate="curOperateChangeHandler"/>
    </el-col>
    <el-col :xs="24" :sm="15" :md="17">
      <MenuOptions
        @submitMenuForm="handleMenuFormSubmit"
        :enable="enableForm"
      />
      <el-card>
        <template #header>
          <p class="menu-title">资源选项</p>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Ref, ref } from 'vue'
import MenuOptions from './components/menu-options.vue'
import MenuList from './components/menu-list.vue'
// import { OperateType } from './components/interface'
type OperateType = 'addBro' | 'addChild' | 'editNode' | 'delNode'

export default {
  name: 'Menu',
  components: {
    MenuOptions,
    MenuList
  },
  setup() {
    const enableForm = ref(false)
    const curOperateType: Ref<string> = ref('')
    const curTree = ref(null)
    const selectedName: Ref<string | undefined> = ref('')

    function editEnableHandler() {
      const editTypeList = ['editNode', 'addChild', 'addBro']
      
      if(editTypeList.indexOf(curOperateType.value) !== -1 && selectedName.value) {
        enableForm.value = true
        return
      }
      enableForm.value = false
    }

    function handleNodeClick(data) {
      console.log(data)
    }

    function curOperateChangeHandler(type: OperateType) {
      curOperateType.value = type
      editEnableHandler()
    }
    function handleMenuFormSubmit(data) {
      console.log(data)
    }
    function menuSelectedChangeHandler(name: string | undefined) {
      selectedName.value = name
      editEnableHandler()
    }
    return {
      curOperateType,
      curTree,
      menuSelectedChangeHandler,
      curOperateChangeHandler,
      enableForm
    }
  }
}
</script>

<style scoped lang="stylus">
.menu-wrapper
  margin-top: 20px

.menu-title
  height: 28px
  line-height: 28px
</style>
