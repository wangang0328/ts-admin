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
                <el-dropdown-item>添加兄弟菜单</el-dropdown-item>
                <el-dropdown-item>添加子菜单</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button-group size="mini">
            <!-- <el-button type="primary" plain icon="el-icon-circle-plus-outline" size="mini"></el-button> -->
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              plain
              class="no-left-border"
            />
            <el-button type="warning" icon="el-icon-delete" size="mini" plain />
          </el-button-group>
        </div>
      </div>
    </template>

    <el-tree
      :data="data"
      :props="defaultProps"
      accordion
      @node-click="handleNodeClick"
    >
    </el-tree>
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'MenuList',
  data() {
    return {}
  },
  setup(){
    let isSelected = false //是否选中menu tree
    let treeList = []
  }
}
</script>

<style scoped lang="stylus"></style>
