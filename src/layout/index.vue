<template>
  <div class="app-wrapper h-100" :class="[device, sidebarStatus]">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar />
        <tags-view />
      </div>
      <transition>
        <keep-alive :include="cachedPages">
          <router-view />
        </keep-alive>
      </transition>
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
    flex: none
    transition: all 0.3s linear
  .main-container
    flex: 1
    width: 100%
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
