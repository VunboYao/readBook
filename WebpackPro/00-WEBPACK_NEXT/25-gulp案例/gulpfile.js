const { src, dest, parallel, series, watch } = require('gulp')
const htmlMin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const postcssPresetEvn = require('postcss-preset-env')
const inject = require('gulp-inject')
const browserSync = require('browser-sync')
const del = require('del')

const htmlTask = () => {
	return src('./src/*.html')
		.pipe(
			htmlMin({
				collapseWhitespace: true,
			})
		)
		.pipe(dest('./dist'))
}

const jsTask = () => {
	return src('./src/**/*.js')
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(terser({ mangle: { toplevel: true } }))
		.pipe(dest('./dist'))
}

const lessTask = () => {
	return src('./src/**/*.less')
		.pipe(less())
		.pipe(postcss([postcssPresetEvn()]))
		.pipe(dest('./dist'))
}

const injectTask = () => {
	return src('./dist/*.html')
		.pipe(inject(src(['./dist/js/*.js', './dist/css/*.css']), { relative: true }))
		.pipe(dest('./dist'))
}

// 本地开发服务
const bs = browserSync.create()
const serve = () => {
	watch('./src/**/*.less', series(lessTask, injectTask))
	watch('./src/**/*.js', series(jsTask, injectTask))
	bs.init({
		port: 8080,
		open: true,
		files: './dist/*',
		server: {
			baseDir: './dist',
		},
	})
}

const clean = () => {
	return del(['dist'])
}


const buildTask = series(clean, parallel(htmlTask, jsTask, lessTask), injectTask)

const serveTask = series(buildTask, serve)

module.exports = {
	buildTask,
	serveTask,
}
