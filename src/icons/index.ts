/* import vue from 'vue'
vue.defineComponent */

//加载svg
const context = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => context.keys().map(requireContext)
requireAll(context)
