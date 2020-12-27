<template>
  <div class="navbar">
    <div class="hamburger-container">
      <i class="hamburger" :class="deviceCls" />
    </div>
    头部
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from '@/store/index'
export default {
  data() {
    return {}
  },
  setup() {
    const store = useStore()
    const deviceCls = computed(() => {
      return store.state.app.device === 'mobile'
        ? 'el-icon-s-unfold'
        : 'el-icon-s-fold'
    })

    return {
      deviceCls
    }
  }
}
</script>

<style scoped lang="stylus">
.navbar
  position: relative
  width: 100%
  height: 50px
  line-height: 50px
  background: #fff
  box-shadow: 0 1px 4px rgba(0,21,41,.08)
.hamburger-container
  display: inline-block
  padding: 0 15px
  height: 100%
  line-height: 50px
  cursor: pointer
  .hamburger
    font-size: 20px
</style>
