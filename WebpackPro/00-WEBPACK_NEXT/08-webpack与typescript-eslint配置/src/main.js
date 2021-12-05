import './index.css'
import './typescript.ts'
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
const foo = name => {
  console.log(name)
}

foo('Yao')


/*
*
* npm install @babel/preset-env -D
*
* npx babel src --out-dir dist --presets=@babel/preset-env
*
* */


/*
* ts-loader和babel-loader的选择
*
* ts-loader
* 1.会进行类型检测。打包会失败
*
* babel-loader
* 1.打包成功
*
*
* 如果不涉及新特性，用tsc即可
* 如果涉及特性的转换，用babel来进行转换。用tsc进行类型检测
* "type-check": "tsc",
  "ts": "tsc --noEmit --watch",
* */