<template>
  <el-row :gutter="10" class="menu-wrapper px-10">
    <el-col :xs="24" :sm="9" :md="7">
      <MenuList
        :curNodeName="selectedName"
        :expandNodeName="expandNodeName"
        :curOperateType="curOperateType"
        :menuTree="menuTree"
        @selectedNameChange="menuSelectedChangeHandler"
        @curOperate="curOperateChangeHandler"
        ref="menuListEl"
      />
    </el-col>
    <el-col :xs="24" :sm="15" :md="17">
      <MenuOptions
        @submitMenuForm="handleMenuFormSubmit"
        :enable="enableForm"
        :formValue="curSelectNode"
        :curNodeName="selectedName"
        :curOperateType="curOperateType"
        ref="menuFormEl"
      />
      <SourceOptions />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { reactive, Ref, ref } from 'vue'
import MenuOptions from './components/menu-options.vue'
import MenuList from './components/menu-list.vue'
import SourceOptions from './components/source-options.vue'
import { MenuForm, MenuTreeData, OperateType } from './components/interface'
import { sortObjList } from '@/util/index'

export default {
  name: 'Menu',
  components: {
    MenuOptions,
    MenuList,
    SourceOptions
  },
  setup() {
    const enableForm = ref(false)
    const curOperateType: Ref<OperateType> = ref('')
    const curTree = ref(null)
    const selectedName: Ref<string> = ref('')
    const menuListEl: Ref = ref(null)
    const menuFormEl: Ref = ref(null)
    const curSelectNode = reactive({}) as MenuTreeData
    const expandNodeName = ref('')
    let menuTree = reactive([]) as MenuTreeData[]
    function editEnableHandler() {
      const editTypeList = ['editNode', 'addChild', 'addBro']

      if (
        editTypeList.indexOf(curOperateType.value) !== -1 &&
        selectedName.value
      ) {
        enableForm.value = true
        return
      }
      //没有菜单时，可以添加兄弟节点
      if (curOperateType.value === 'addBro' && menuTree.length === 0) {
        enableForm.value = true
        return
      }
      enableForm.value = false
    }

    const menuProcessor = {
      addBro(
        parentMenu: MenuTreeData[],
        selectMenuName: string,
        menuData: MenuForm
      ): MenuTreeData[] {
        for (let i = 0; i < parentMenu.length; i++) {
          const curMenu = parentMenu[i]
          if (curMenu.name === selectMenuName) {
            parentMenu.push({ label: menuData.name, ...menuData })
            parentMenu = sortObjList(parentMenu, 'sort')
            return parentMenu
          } else {
            if (curMenu.children && curMenu.children.length !== 0) {
              console.log(this.addBro)
              return this.addBro(curMenu.children, selectMenuName, menuData)
            }
          }
        }
        return parentMenu
      },
      addChild(
        parentMenu: MenuTreeData[],
        selectMenuName: string,
        menuData: MenuForm
      ): MenuTreeData[] {
        for (let i = 0; i < parentMenu.length; i++) {
          const curMenu = parentMenu[i]
          if (curMenu.name === selectMenuName) {
            if (curMenu.children && curMenu.children.length === 0) {
              curMenu.children = [{ label: menuData.name, ...menuData }]
            } else {
              curMenu.children = sortObjList(
                [...curMenu.children, { label: menuData.name, ...menuData }],
                'name'
              )
            }
            return parentMenu
          } else {
            if (curMenu.children && curMenu.children.length !== 0) {
              return this.addChild(curMenu.children, selectMenuName, menuData)
            }
          }
        }
        return parentMenu
      },
      editNode(
        parentMenu: MenuTreeData[],
        selectMenuName: string,
        menuData: MenuForm
      ): MenuTreeData[] {
        for (let i = 0; i < parentMenu.length; i++) {
          const curMenu = parentMenu[i]
          if (curMenu.name === selectMenuName) {
            for (const key in menuData) {
              if (key !== 'children') {
                curMenu[key] = menuData[key]
              }
            }
            return parentMenu
          } else {
            if (curMenu.children && curMenu.children.length !== 0) {
              return this.editNode(curMenu.children, selectMenuName, menuData)
            }
          }
        }
        return parentMenu
      },
      delNode(
        parentMenu: MenuTreeData[],
        selectMenuName: string
      ): MenuTreeData[] {
        for (let i = 0; i < parentMenu.length; i++) {
          const curMenu = parentMenu[i]
          if (curMenu.name === selectMenuName) {
            parentMenu.splice(i, 1)
            return parentMenu
          } else {
            if (curMenu.children && curMenu.children.length !== 0) {
              return this.delNode(curMenu.children, selectMenuName)
            }
          }
        }
        return parentMenu
      }
    }
    function menuOperateHandler(
      operateKey: OperateType,
      parentMenu: MenuTreeData[],
      selectMenuName: string,
      menuData?: MenuForm
    ): MenuTreeData[] {
      if(operateKey === 'addBro' && parentMenu && parentMenu.length === 0){
        parentMenu.push({ label: menuData!.name, ...menuData!})
        return parentMenu
      }
      return menuProcessor[operateKey](parentMenu, selectMenuName, menuData)
    }

    function initialData(){
      expandNodeName.value = selectedName.value
      selectedName.value = ''
      curOperateType.value = ''
      enableForm.value = false
      menuListEl.value.resetMenuOpen()
      menuFormEl.value.resetForm()
    }
    function handleMenuFormSubmit(menuData: MenuForm) {
      menuTree = menuOperateHandler(curOperateType.value, menuTree, selectedName.value, menuData) || []
      console.log(menuTree)
      initialData()
    }

    function menuSelectedChangeHandler(data: MenuTreeData) {
      for (const key in data) {
        curSelectNode[key] = data[key]
      }
      selectedName.value = data.name
      editEnableHandler()
    }

    function curOperateChangeHandler(type: OperateType) {
      curOperateType.value !== type ? menuFormEl.value.resetForm() : ''
      curOperateType.value = type
      editEnableHandler()
      //删除节点
      if (selectedName.value && type === 'delNode') {
        //curNode
        menuTree = menuOperateHandler(curOperateType.value, menuTree, selectedName.value) || []
        initialData()
      }
    }

    return {
      curOperateType,
      curTree,
      menuSelectedChangeHandler,
      curOperateChangeHandler,
      handleMenuFormSubmit,
      enableForm,
      menuTree,
      selectedName,
      menuListEl,
      menuFormEl,
      curSelectNode,
      expandNodeName //展开node的名称
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
