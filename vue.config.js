const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  // 配置使用stylus全局变量
  chainWebpack(config) {
      
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))

    config.module
      .rule('svg')
      .exclude.add(resolve('./src/icons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
  },
  css: {
    //https://www.cnblogs.com/zixian/p/vue-cli3_sass_stylus.html
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        import: ['~@/assets/stylus/variable.styl','~@/assets/stylus/mixin.styl']
      }
    }
  }
}

module.exports = config
