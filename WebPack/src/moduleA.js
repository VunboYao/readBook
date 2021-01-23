import avatar from "./images/demo.jpg"
import css from './index.css'
function addImg() {
	const oImg = document.createElement('img') // 获取file-loader处理后的文件路径
	oImg.src = avatar
	oImg.classList.add(css.size)
	document.body.appendChild(oImg)
}
export default addImg
