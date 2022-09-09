const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV

// configureWebpack: (config) => {
//   if (env !== 'development' || env !== 'test' || env === 'production') {
//     console.log('env:', env)
//     config.plugins.push(
//       new UglifyJsPlugin({
//         uglifyOptions: {
//           compress: {
//             warnings: false,
//             drop_debugger: true, // console
//             drop_console: true,
//             pure_funcs: [ 'console.log' ] // 移除console
//           },
//         },
//         // sourceMap: false,
//         parallel: true,
//       }),
//     );
//   }
// }
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/chart/'
  //   : '/',

  // build 输出文件目录
   outputDir: "./build/chart",
  // outputDir: "../../bxdev/MS/opt_front/build/bx-chart",
  // 主目录
  publicPath: '/chart/',
  // publicPath: '/bx-chart/',
  productionSourceMap: false,
  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  devServer: {
    proxy: {
      '/api': {
        target: "http://192.168.0.192:8101/emr/select",
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
