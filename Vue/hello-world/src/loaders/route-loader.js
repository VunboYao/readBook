/* const babel = require('@babel/core')
module.exports = function (content) {
  // 1.截取核心数据
  let start = content.indexOf('=')
  let end = content.indexOf('export')

  // 2.拦截的数据进行转json处理
  let newContent = content.slice(start + 1, end)
  let strContent = newContent.replace(/\s/gi, '')
  console.log('>>', strContent);

  babel.transform(content, { filename: 'route-loader.js', presets: ['@babel/preset-env'] }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let { code } = result
      console.log(typeof code);
    }
  })

  return content
}
 */
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require("@babel/traverse").default;
module.exports = function (content) {

  const data = fs.readFileSync(path.resolve(__dirname, '../router/assetRouter.js'), 'utf-8')
  let tree = parser.parse(data, {
    // parse in strict mode and allow module declarations
    sourceType: "module",
  });
  traverse(tree, {
    ObjectProperty(obj) {
      console.log(obj.node);
    }
  })
  fs.writeFile(path.resolve(__dirname, 'hello.txt'), JSON.stringify(tree), err => {
    if (err) {
      console.log(err);
    }
  })
  return content
}
