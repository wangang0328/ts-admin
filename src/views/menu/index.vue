<template>
  <el-row :gutter="10" class="menu-wrapper px-10">
    <el-col :xs="24" :sm="9" :md="7">
      <MenuList />
    </el-col>
    <el-col :xs="24" :sm="15" :md="17">
      <MenuOptions @submitMenuForm="handleMenuFormSubmit" />
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
export default {
  name: 'Menu',
  components: {
    MenuOptions,
    MenuList
  },
  setup() {
    const curOperateType: Ref<string> = ref('')
    const curTree = ref(null)
    function handleNodeClick(data) {
      console.log(data)
    }
    function handleMenuFormSubmit(data) {
      console.log(data)
    }

    return {
      curOperateType,
      curTree
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
