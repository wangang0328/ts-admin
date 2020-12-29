import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/assets/stylus/index.styl'
import '@/icons/index'
import SvgIcon from './components/svg-icon/index'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)

app
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
