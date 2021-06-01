const { title = '', publicPath } = require('./src/utils/config')
const path = require('path')
// less文件的路径
const vantTheme = path.resolve(__dirname, './src/style/vant.less')

module.exports = {
  lintOnSave: false,
  publicPath,
  productionSourceMap: false,
  configureWebpack: {
    name: title
  },
  devServer: {
    open: false,
    inline: true,
    host: '0.0.0.0', // 允许外部ip访问
    port: 8080, // 端口
    proxy: {
      '/dev-api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  },
  chainWebpack (config) {
    config.plugins.delete('prefetch')
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 只对页面的生效
          require('postcss-pxtorem')({
            rootValue: 75,
            minPixelValue: 2,
            propList: ['*'],
            exclude: /node_module/i
          }),
          // 只对组件库的生效
          require('postcss-pxtorem')({
            rootValue: 37.5,
            minPixelValue: 2,
            propList: ['*'],
            exclude: /src/i
          })
        ]
      },
      less: {
        modifyVars: {
          hack: `true;@import "${vantTheme}";`
        }
      },
      sass: {
        prependData: '@import "@/style/theme.scss";'
      }
    }
  }
}
