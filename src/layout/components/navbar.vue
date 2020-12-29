<template>
  <div class="navbar">
    <div class="navbar-left">
      <Hamburger />
      <Breadcrumb />
    </div>
    <div class="navbar-right">
      ss
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import Hamburger from '@/components/hamburger/index'
import Breadcrumb from '@/components/breadcrumb/index.vue'

export default {
  data() {
    return {}
  },
  methods: {
    test(){
      console.log('测试test')
    }
  },
  components: {
    Hamburger,
    Breadcrumb
  }
}
</script>

<style scoped lang="stylus">
.navbar
  position: relative
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  height: 50px
  background: #fff
  box-shadow: 0 1px 4px rgba(0,21,41,.08)
  .navbar-left
    display: flex
    height: 100%
    align-items: center
</style>
