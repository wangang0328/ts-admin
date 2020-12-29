<template>
  <el-breadcrumb separator="/" v-if="size >= hideWdith">
    <transition-group name="breadcrumb" tag="p">
      <el-breadcrumb-item
        v-for="item in breadcrumbList"
        :to="item.path"
        :key="item.path"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watchEffect } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import { useStore } from '@/store/index'

export default {
  name: '',
  data() {
    return {}
  },
  setup() {
    interface BreadCrumType {
      title: string
      path: string
    }
    const hideWdith = 992
    const DASHBOARD = 'DASHBOARD'
    const route = useRoute()
    const breadcrumbList: BreadCrumType[] = reactive([])
    const store = useStore()
    const size = computed(() => store.state.app.size)

    function hasDashboard(matched: BreadCrumType | undefined) {
      if (!matched || !matched.title) {
        return false
      }

      if (matched.title.toUpperCase() === DASHBOARD) {
        return true
      } else {
        return false
      }
    }

    function getBreadcrumb(matchedList: RouteLocationMatched[]) {
      //直接置为空，监听不到
      breadcrumbList.splice(0, breadcrumbList.length)
      for (const item of matchedList) {
        if (item.meta && item.meta.title && item.meta.breadcrumb !== false) {
          breadcrumbList.push({
            title: item.meta.title,
            path: item.path
          })
        }
      }

      if (!hasDashboard(breadcrumbList[0])) {
        breadcrumbList.unshift({ path: '/dashboard', title: 'Dashboard' })
      }
    }

    watchEffect(() => {
      const matchedList = route.matched
      getBreadcrumb(matchedList)
    })
    return {
      breadcrumbList,
      size,
      hideWdith
    }
  }
}
</script>

<style scoped lang="stylus">
.breadcrumb-leave-active,
.breadcrumb-enter-active
  transition: all 0.2s linear

.breadcrumb-enter-from
  transform: translate3d(-30px, 0, 0)
  opacity: 0.5
.breadcrumb-leave-to
  transform: translate3d(10px, 0, 0)  
  opacity: 0
</style>
