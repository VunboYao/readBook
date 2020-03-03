const fs = require('fs')
const path = require('path')

class CreateProject {
	constructor(rootPath, projectName) {
		this.rootPath = rootPath
		this.projectName = projectName
		this.subFiles = ['css', 'images', 'js', 'index.html']
	}

	initProject() {
		// 1. 创建站点文件夹
		const projectPath = path.join(__dirname, this.projectName)
		fs.mkdirSync(projectPath)
		// 2. 创建子文件夹
		this.subFiles.forEach(file => {
			if (path.extname(file)) {
				const filePath = path.join(projectPath, file)
				fs.writeFileSync(filePath, '')
			} else {
				const dirPath = path.join(projectPath, file)
				fs.mkdirSync(dirPath)
			}
		})
	}
}


const execProject = new CreateProject(__dirname, 'TaoBao')
execProject.initProject()
