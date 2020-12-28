import { computed, defineComponent, watchEffect } from 'vue'
import { useStore } from '@/store/index'
import './index.styl'
export default defineComponent({
  setup() {
    const store = useStore()
    const sidebarStatus = computed(() => store.state.app.sidebarStatus)
    const device = computed(() => store.state.app.device)
    function toggleSidebar(): void {
      store.dispatch('app/toggleSidebar')
    }
    function closeSidebar() {
      store.commit('app/closeSidebar')
    }
    watchEffect(() => {
      // device = store.state.app.device
      if (device.value === 'mobile') {
        closeSidebar()
      }
    })
    return () => (
      <div>
        <div class="hamburger-container" onClick={toggleSidebar}>
          <i
            class={`hamburger ${
              sidebarStatus.value === 'opened'
                ? 'el-icon-s-fold'
                : 'el-icon-s-unfold'
            }`}
          />
        </div>
        <div
          class="mask"
          onClick={closeSidebar}
          v-show={
            sidebarStatus.value === 'opened' && device.value === 'mobile'
              ? true
              : false
          }
        />
      </div>
    )
  }
})
