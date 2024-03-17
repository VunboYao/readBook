// node xxx --environment NODE_ENV:development
/* let argv = process.argv // 获取命令行中的参数
if (argv[2] === '--environment') { // 判断参数环境
  let arr = argv[3].split(':') // 切割命令行信息
  console.log('环境变量设置是：', process.env[arr[0]] = arr[1]) // 设置相关环境变量
  console.log(process.env)
} */
console.log(process.argv);
if (process.argv.length > 0) {
  process.argv.forEach((element, index) => {
    console.log(element, index);
  });
}
