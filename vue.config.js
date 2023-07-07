/*
 * @Author: huwanfei
 * @Date: 2023-05-12 09:21:23
 * @LastEditTime: 2023-07-07 11:20:17
 * @LastEditors: huwanfei
 * @Description:
 * @FilePath: /h5-downloadImg/vue.config.js
 */
const path = require("path");
const timestamp = new Date().getTime();
function resolve(dir) {
  return path.join(__dirname, dir);
}

//less文件的路径
// const myTheme = resolve("./src/assets/theme.less");

module.exports = {
  outputDir: "dist",
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "blue": '#3E6DFF',
          "uploader-icon-color": "#3E6DFF",
          "button-border-radius": "6px"
          // hack: `true; @import "${myTheme}";`,
        },
      },
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            // 以设计稿375为例， 375 / 10 = 37.5
            remUnit: 37.5,
          }),
        ],
      },
    },
    // css打包文件重命名（避免缓存问题）
    extract: {
      filename: `css/[name].[hash:8].${timestamp}.css`,
      chunkFilename: `css/[name].[hash:8].${timestamp}.css`,
    },
  },
  configureWebpack: {
    name: process.env.VUE_APP_BASE_NAME,
    resolve: {
      alias: {
        "@": resolve("src"),
        styles: resolve("src/styles"),
      },
    },
    // externals: isProd ? cdn.externals : {}
    externals: {},
    // js打包文件重命名（避免缓存问题）
    output: {
      filename: `js/[name].[hash:8].${timestamp}.js`,
      chunkFilename: `js/[name].[hash:8].${timestamp}.js`,
    },
  },
  devServer: {
    // 配置服务器
    port: 8080,
    open: true, // 自动开启浏览器
    compress: false, // 开启压缩
    overlay: {
      warnings: true,
      errors: true,
    }, // 错误、警告在页面弹出
    proxy: {
      "/api": {
        target: "http://", // target host
        // ws: true, // proxy websockets
        changeOrigin: true, // 允许跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    },
  },
};
