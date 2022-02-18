const fs = require('fs')
const path = require('path')

const srcDir = process.argv[2]
const destDir = process.argv[3]

let i = 0
while (i < 30) {
  i++
  const sum = 'day' + (i + '').padStart(2, 0)
  const srcPath = path.resolve(srcDir, num)
  const destPath = path.resolve(destDir, num)
  if (fs.existsSync(destPath)) continue
  fs.mkdir(destPath, err => {
    if (!err) console.log('has created file!', num);

    const srcFiles = fs.readdirSync(srcPath)
    for (const file of srcFiles) {
      if (file.endsWith('.mp4')) {
        const srcFile = path.resolve(srcPath, file)
        const destFile = path.resolve(destPath, file)
        fs.copyFileSync(srcFile, destFile)
        console.log('success');
      }
    }
  })
}