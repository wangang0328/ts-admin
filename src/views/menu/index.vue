<template>
  <el-row :gutter="10" class="menu-wrapper px-10">
    <el-col :xs="24" :sm="9" :md="7">
      <el-card>
        <template #header>
          <div class="menu-head-wrap">
            <span>
              菜单列表
            </span>
            <div class="operate-wrap">
              <el-dropdown>
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  class="no-right-border"
                >
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
                <el-button
                  type="warning"
                  icon="el-icon-delete"
                  size="mini"
                  plain
                />
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
    </el-col>
    <el-col :xs="24" :sm="15" :md="17">
      <MenuOptions/>
      <el-card>
        <template #header>
          <p class="menu-title">资源选项</p>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
// import {ref} from 'vue'
import MenuOptions from './components/menu-options.vue'
export default {
  name: 'Menu',
  components: {
    MenuOptions
  },
  data() {
    return {
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang="stylus">
.menu-wrapper
  margin-top: 20px
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
.menu-title
  height: 28px
  line-height: 28px
</style>
