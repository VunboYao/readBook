class AutoUploadPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('AutoUploadPlugin', (compilation, callback) => {
      const outputPath = compilation.outputOptions.path
      // 1.获取输出的文件夹
      // 2.连接服务器
      // 3. 上传文件到服务器
      callback()
    })
  }
}
