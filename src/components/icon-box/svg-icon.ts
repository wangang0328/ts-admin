const context = require.context('@/icons/svg', false, /\.svg$/)
const keys = context.keys() || []

const reg = /\.\/(.*)\.svg$/
const svgIcons = keys.map(item => {
  //暂时还没找到ts不报错的别的方法
  const c = item.match(reg) || ['', '']
  return c[1]
})

export default svgIcons