import { computed, defineComponent, reactive, watchEffect } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import { useStore } from '@/store/index'
import './index.styl'

const DASHBOARD = 'DASHBOARD'

interface BreadCrumType {
  title: string
  path: string
}

export default defineComponent({
  setup() {
    const hideWdith = 992
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

    //获取当前的路径
    return () => (
      <el-breadcrumb separator="/" vShow={size.value >= hideWdith}>
        <transition-group name="breadcrumb" tag="p">
          {breadcrumbList.map(item => {
            return (
              <el-breadcrumb-item to={item.path} key={item.path}>
                {item.title}
              </el-breadcrumb-item>
            )
          })}
        </transition-group>
      </el-breadcrumb>
    )
  }
})
