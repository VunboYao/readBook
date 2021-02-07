import avatar from '../images/demo.jpg'
import css from '../css/index.css'
function addImg () {
  const oImg = document.createElement('img') // 获取file-loader处理后的文件路径
  oImg.src = avatar
  oImg.classList.add(css.size)
  document.body.appendChild(oImg)
}
function add () {
  document.getElementById('btn').addEventListener('click', (e) => {
    const p = document.createElement('p')
    p.innerHTML = 'hello webpack12'
    document.body.appendChild(p)
  })
}
export {
  addImg, add
}
