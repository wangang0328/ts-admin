<template>
  <el-row :gutter="10" class="menu-wrapper px-10">
    <el-col :xs="24" :sm="9" :md="7">
      <MenuList
        :curNodeName="selectedName"
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
      />
      <el-card>
        <template #header>
          <p class="menu-title">资源选项</p>
        </template>
        <div @click="testHandler">测试watch</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { reactive, Ref, ref } from 'vue'
import MenuOptions from './components/menu-options.vue'
import MenuList from './components/menu-list.vue'
import { MenuForm, MenuTreeData } from './components/interface'
import { sortObjList } from '@/util/index'
type OperateType = 'addBro' | 'addChild' | 'editNode' | 'delNode' | ''

export default {
  name: 'Menu',
  components: {
    MenuOptions,
    MenuList
  },
  setup() {
    const enableForm = ref(false)
    const curOperateType: Ref<OperateType> = ref('')
    const curTree = ref(null)
    const selectedName: Ref<string> = ref('')
    // const testList = reactive([]) as any[]
    const menuListEl: Ref = ref(null)
    // const menuTree: Reactive<MenuForm[]> = reactive([])
    // const menuTree = reactive([])
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

    function curOperateChangeHandler(type: OperateType) {
      curOperateType.value = type
      editEnableHandler()
    }

    //兄弟节点
    function handleAddBroMenu(
      parentMenu: MenuTreeData[],
      selectMenuName: string,
      menuData: MenuForm
    ): MenuTreeData[] {
      // debugger
      for (let i = 0; i < parentMenu.length; i++) {
        const curMenu = parentMenu[i]
        if (curMenu.name === selectMenuName) {
          parentMenu.push({ label: menuData.name, ...menuData })
          parentMenu = sortObjList(parentMenu, 'sort')
          return parentMenu
        } else {
          if (curMenu.children && curMenu.children.length !== 0) {
            return handleAddBroMenu(curMenu.children, selectMenuName, menuData)
          }
        }
      }
      return parentMenu
    }

    //子节点
    function handleAddChildMenu(
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
            curMenu.children = [
              ...curMenu.children,
              { label: menuData.name, ...menuData }
            ]
          }
          return parentMenu
        } else {
          if (curMenu.children && curMenu.children.length !== 0) {
            return handleAddChildMenu(
              curMenu.children,
              selectMenuName,
              menuData
            )
          }
        }
      }
      return parentMenu
    }

    function handleMenuFormSubmit(menuData: MenuForm) {
      console.log(menuData, '------')
      //获取当前操作的treeDom [{name: 'aaa', children[{name:'ccc'}]}, {}]
      //selectedName.value
      //判断当前操作类型
      if (curOperateType.value === 'addBro') {
        // debugger
        //添加兄弟菜单
        if (menuTree && menuTree.length === 0) {
          menuTree.push({ label: menuData.name, ...menuData })
        } else {
          // debugger
          menuTree = handleAddBroMenu(menuTree, selectedName.value, menuData)
          //选中的节点置为空，当前操作为空
        }
      } else if (curOperateType.value === 'addChild') {
        //添加子菜单
        menuTree = handleAddChildMenu(menuTree, selectedName.value, menuData)
      }
      selectedName.value = ''
      curOperateType.value = ''
      enableForm.value = false
      menuListEl.value.resetMenuOpen()
    }

    function menuSelectedChangeHandler(name: string) {
      selectedName.value = name
      editEnableHandler()
    }

    function testHandler() {
      selectedName.value = Math.random() + 'a'
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
      testHandler,
      menuListEl
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
