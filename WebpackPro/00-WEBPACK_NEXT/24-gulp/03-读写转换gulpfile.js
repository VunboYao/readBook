
const {series, parallel, src, dest} = require('gulp')

const babel = require('gulp-babel') // babel
// const uglify = require('gulp-uglify') // 压缩
const terser = require('gulp-terser') // 压缩

const jsTask = () => {
	// src读取文件 pipe:stream的方式 dest写入文件
	return src('./src/main.js')
			.pipe(babel({presets: ['@babel/preset-env']}))
			// .pipe(uglify())
			.pipe(terser({mangle: {toplevel: true}}))
			.pipe(dest('./dist'))
}

module.exports = {
	jsTask
}
