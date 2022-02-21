// 定义任务
const foo = (cb) => {
	console.log('foo')
	cb() // 结束任务
}

module.exports = {
	foo
}
module.exports.default = cb => {
	console.log('默认任务')
	cb()
}

// 4.0之前的版本
const gulp = require('gulp')
gulp.task('bar', cb => {
	console.log('bar')
	cb()
})
