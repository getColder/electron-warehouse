const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:true,
  outputDir: "../warehouse-server/warehouse-server/public",
  configureWebpack: config => ({
      
  })
})
