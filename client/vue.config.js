/*
 * @Author: your name
 * @Date: 2020-09-02 16:59:04
 * @LastEditTime: 2020-10-14 14:18:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \phone-crm-dev\vue.config.js
 */
// const url = 'http://kqapi.vaiwan.com'
const url = 'http://localhost:5000'
module.exports = {
  // 放置静态资源目录
  assetsDir: 'static',
  // 配置 axios代理请求
  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true, // 需要虚拟主机站点
        target: url, // 目标主机
        // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        ws: false, // 代理的WebSockets
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    disableHostCheck: true
  },
  // 构建时输出目录 默认dist
  outputDir: 'C:/wamp/www/pc-wechat-push',
  // 基本路径
  publicPath: './'
  // configureWebpack: {
  //   externals: {
  //     'DDLogin' :'DDLogin'
  //   }
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
  //       loader: 'url-loader',
  //       options: {
  //         limit: 10000,
  //         name:utils.assetsPath('fonrs/[name].[hash:7].[ext]')
  //       }
  //     }
  //   ]
  // }
}
