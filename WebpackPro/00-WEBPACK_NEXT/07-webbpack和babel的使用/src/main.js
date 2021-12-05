import './index.css'
import './typescript.ts'
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
const foo = name => {
  console.log(name)
}

foo('Yao')

const p = new Promise(resolve => {
  resolve(2)
})

p.then(res => {
  console.log(res)
})

/*
*
* npm install @babel/preset-env -D
*
* npx babel src --out-dir dist --presets=@babel/preset-env
*
* */
