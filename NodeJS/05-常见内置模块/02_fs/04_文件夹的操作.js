const fs = require('fs')
const path = require('path')

// 1.创建文件夹
const filePath = path.resolve(__dirname, 'Yao')
if (!fs.existsSync(filePath)) {
	fs.mkdir(filePath, err => {
		console.log(err)
	})
}

// 2.读取文件夹中的所有文件
/* fs.readdir(filePath, (err, files) => {
	console.log(files)
}) */

// TODO；递归读取所有文件
function getFiles(dirName) {
	/* 	// 1.读取所有的文件
	fs.readdir(dirName, (err, files) => {
		// 2.遍历文件
		files.forEach(file => {
			// 3.路径拼接
			const filePath = path.resolve(dirName, file)
			// 4.状态检测
			const stat = fs.statSync(filePath)
			// 5.判断是否是一个文件夹
			if (stat.isDirectory()) {
				// 6.递归继续
				getFiles(filePath)
			} else {
				console.log(file)
			}
		})
	}) */

	// TODO: 文件类型参数获取，返回的文件包括文件名称和type
	fs.readdir(dirName, { withFileTypes: true }, (err, files) => {
		files.forEach(file => {
			if (file.isDirectory()) {
				const filePath = path.resolve(dirName, file.name)
				getFiles(filePath)
			} else {
				console.log(file.name)
			}
		})
	})
}
getFiles(filePath)

// 3文件夹的重命名
// fs.rename(filePath, path.resolve(__dirname, 'Yao'), err => {
// 	console.log(err)
// })
