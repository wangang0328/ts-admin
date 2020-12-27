<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar />
        <tags-view />
      </div>
      <div>slidebar</div>
      <div>main</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './components/navbar.vue'
import TagsView from './components/tags-view/index.vue'
import Sidebar from './components/sidebar/index.vue'
import resizeHandler from './resize'
export default defineComponent({
  components: {
    Navbar,
    TagsView,
    Sidebar
  },
  setup() {
    resizeHandler()
  }
})
</script>
<style scoped lang="stylus">
.app-wrapper
  display: flex
  .sidebar-container
    flex: none
    width: 210px
  .main-container
    flex: 1
    width: 100%
</style>
