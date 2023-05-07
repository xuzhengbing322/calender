// 跨域
module.exports = {
  devServer: {
    // 跨域代理
    proxy: {
      "/api": {
        // 目标地址
        target: "http://v.juhe.cn/",
        // 切换源
        changeOrigin: true,
        // 开启webSocket
        ws:true,
        // 关闭https检查
        secure: false,
        // 重写路径
        pathRewrite: {
          // 在网址locolhost:8080后面添加一个/api/xxx。后面该什么参数就什么参数
          "^/api": "",
        }
      }
    }
  },
}