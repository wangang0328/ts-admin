<template>
  <el-card>
    <template #header>
      <div class="menu-head-wrap">
        <span>
          菜单列表
        </span>
        <div class="operate-wrap">
          <el-dropdown>
            <el-button type="primary" size="mini" plain class="no-right-border">
              <i class="el-icon-circle-plus-outline" />
              <!-- <i class="el-icon-arrow-down el-icon--right" /> -->
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="addBroHandler">
                  添加兄弟菜单
                </el-dropdown-item>
                <el-dropdown-item
                  @click="addChildHandler"
                  :disabled="menuTree.length === 0"
                >
                  添加子菜单
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button-group size="mini">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              plain
              class="no-left-border"
              @click="editMenuHandler"
            />
            <el-button
              type="warning"
              icon="el-icon-delete"
              size="mini"
              plain
              @click="delMenuHandler"
            />
          </el-button-group>
        </div>
      </div>
    </template>
    <div>
      <!-- <ul>
        <li v-for="item in testList" :key="item.id">{{ item.name }}</li>
      </ul> -->
      <!-- <el-tree :data="testList" accordion node-key="id" /> -->
    </div>
    <el-tree
      v-if="openMenu"
      :data="menuTree"
      :highlight-current="true"
      node-key="name"
      :default-expanded-keys="[expandNodeName]"
      accordion
      @current-change="handleNodeChange"
    />
  </el-card>
</template>

<script lang="ts">
import { toRefs, PropType, watch, ref, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { MenuTreeData } from './interface'
export default {
  name: 'MenuList',
  props: {
    curNodeName: {
      type: String,
      default: ''
    },
    menuTree: {
      type: Array as PropType<MenuTreeData[]>,
      default: () => [],
      required: true
    },
    expandNodeName: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const { menuTree, curNodeName } = toRefs(props)
    const openMenu = ref(true)
    let selectedName: string

    //监听curNodeName
    watch(curNodeName, (value: string) => {
      selectedName = value
      console.log(value)
    })

    function resetMenuOpen() {
      openMenu.value = false
      nextTick(() => {
        openMenu.value = true
      })
    }
    function selectPrompt() {
      ElMessage.error('请选择需要操作的菜单')
    }
    //添加兄弟菜单
    function addBroHandler() {
      if (!selectedName && menuTree.value.length !== 0) {
        return selectPrompt()
      }
      emit('curOperate', 'addBro')
    }

    //添加子节点
    function addChildHandler() {
      console.log('添加子节点', selectedName)
      if (!selectedName) {
        return selectPrompt()
      }
      emit('curOperate', 'addChild')
    }

    //编辑节点
    function editMenuHandler() {
      if (!selectedName) {
        return selectPrompt()
      }
      emit('curOperate', 'editNode')
    }

    //删除节点
    function delMenuHandler() {
      console.log(selectedName)
      if (!selectedName) {
        return selectPrompt()
      }
      ElMessageBox({
        title: '提示',
        message: '确定删除该菜单和子菜单吗？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          emit('curOperate', 'delNode')
        })
        .catch(() => {
          //do nothing
        })
    }
    //选中节点监听
    function handleNodeChange(data) {
      if (data.name !== curNodeName.value) {
        emit('curOperate', '')
        emit('selectedNameChange', data || null)
      }
    }

    return {
      addBroHandler,
      editMenuHandler,
      delMenuHandler,
      addChildHandler,
      handleNodeChange,
      resetMenuOpen,
      openMenu
    }
  }
}
</script>

<style scoped lang="stylus">
.menu-head-wrap
  justify-content: space-between
  display: flex
  align-items: center
.operate-wrap
  display: flex
  align-items: center
.no-right-border
  border-right: none
  border-bottom-right-radius: 0
  border-top-right-radius: 0
.no-left-border
  border-left: 1px solid #fff
  border-bottom-left-radius: 0
  border-top-left-radius: 0
</style>
