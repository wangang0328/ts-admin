<template>
  <div class="h-100">
    <el-scrollbar class="h-100 el-scroll" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activePath"
        class="sidebar-list"
        :collapse-transition="false"
        :collapse="sidebarStatus !== 'opened' && device === 'desktop'"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        background-color="#304156"
        :router="true"
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-s-home sidebar-icon" />
          <template #title>Dashboard</template>
        </el-menu-item>
        <el-submenu index="/permission">
          <template #title>
            <i class="el-icon-lock sidebar-icon" />
            <span>权限管理</span>
          </template>
          <el-menu-item index="/permission/directive">
            指令管理
          </el-menu-item>
          <el-menu-item index="/permission/role">角色管理</el-menu-item>
          <el-menu-item index="/permission/page">页面管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/menu/index">
          <i class="el-icon-document sidebar-icon" />
          <template #title>菜单管理</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document sidebar-icon" />
          <template #title>导航三</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'
export default defineComponent({
  data() {
    return {
      isCollapse: false
    }
  },
  setup() {
    const route = useRoute()
    const activePath = route.meta.activePath
    const store = useStore()
    const device = computed(() => store.state.app.device)
    const sidebarStatus = computed(() => store.state.app.sidebarStatus)
    return {
      device,
      sidebarStatus,
      activePath
    }
  }
})
</script>

<style scoped lang="stylus">
.el-scroll
  background: #304156
.sidebar-list
  user-select: none
  transition: width 0.3s linear
  border: none
.sidebar-list:not(.el-menu--collapse)
  width: 210px
  min-height: 400px
.sidebar-icon
  color: rgb(191, 203, 217)

/deep/.el-menu--inline
  .el-menu-item
    background-color: #1f2d3d !important
    &:hover
      background-color: #001528 !important
</style>
