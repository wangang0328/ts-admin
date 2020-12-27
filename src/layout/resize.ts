import { Debounced } from '@/util/index'
import { onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/store/index'
const WIDTH = 992 // refer to Bootstrap's responsive design

function getClientWidth(): number {
  const clientWidth = document.body.getBoundingClientRect().width
  return clientWidth
}

export default function resizeProcess() {
  const store = useStore()
  function resizeHandler() {
    //do something
    const clientWidth = getClientWidth()
    const device = clientWidth < WIDTH ? 'mobile' : 'desktop'
    store.commit('app/toggleDevice', device)
    store.commit('app/setSize', clientWidth)
  }
  const resizeHandlerDebounce = new Debounced().use(resizeHandler, 20, true)

  onBeforeMount(() => {
    //首次加载执行
    resizeHandler()
    window.addEventListener('resize', resizeHandlerDebounce)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandlerDebounce)
  })
}
