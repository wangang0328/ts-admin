<template>
  <div class="app-wrapper h-100" :class="[device, sidebarStatus]">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <el-scrollbar style="height: 100%;" class="main-scroll-wrapper" :vertical="true" :horizontal="false">
        <div>
          <navbar />
          <tags-view />
        </div>
        <router-view />
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import Navbar from './components/navbar.vue'
import TagsView from './components/tags-view/index.vue'
import Sidebar from './components/sidebar/index.vue'
import resizeHandler from './resize'
import { useStore } from '@/store/index'

export default defineComponent({
  components: {
    Navbar,
    TagsView,
    Sidebar
  },
  setup() {
    resizeHandler()
    const store = useStore()
    const device = computed(() => store.state.app.device)
    const sidebarStatus = computed(() => store.state.app.sidebarStatus)
    return {
      device,
      sidebarStatus
    }
  }
})
</script>
<style scoped lang="stylus">
.app-wrapper
  display: flex
  .sidebar-container
    // flex: none
    transition: all 0.3s linear
  .main-container
    flex: 1
    width: 100%
    overflow: hidden
.mobile
  .sidebar-container
    z-index: 1008
    position: fixed
    top: 0
    left: -210px
.opened
  .sidebar-container
    left: 0
</style>

<style lang="stylus">
.main-scroll-wrapper > .is-horizontal
  display: none
</style>
