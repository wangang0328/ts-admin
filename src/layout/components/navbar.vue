<template>
  <div class="navbar">
    <Hamburger />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import Hamburger from '@/components/hamburger/index'

export default {
  data() {
    return {}
  },
  methods: {
    toggleSidebar(){
      console.log('-----')
    }
  },
  components: {
    Hamburger
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
</style>
