const fs = require('fs')
const AdmZip = require('adm-zip')
const path = require('path')

const zip = new AdmZip()
class CompressAsset {

	apply(compiler) {
		compiler.hooks.afterEmit.tapAsync('CompressAsset', (compilation, callback) => {
			let dirPath = compilation.outputOptions.path
			zip.addLocalFolder(dirPath)
			zip.writeZip('dist.zip')
			/*fs.readdir(dirPath, (err, files) => {
				console.log(files)
				files.forEach(file => {
					const filePath = path.resolve(dirPath, file)
					const fsSta = fs.statSync(filePath)
					if (fsSta.isDirectory()) {
						zip.addLocalFolder(filePath)
					} else {
						zip.addLocalFile(filePath)
					}
				})
				zip.writeZip('dist.zip')
				callback()
			})*/
		})
	}
}

module.exports = CompressAsset
