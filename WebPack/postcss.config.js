module.exports = {
	plugins: {
		'autoprefixer': {
			'overrideBrowserslist': [
				// 'ie >= 8',
				// 'Firefox >= 3.5',
				'chrome >= 32',
				// 'opera >= 11.5'
			]
		},
		// 合并精灵图
		"postcss-sprites": {
			// 告诉webpack合并之后的图片保存到什么位置
			spritePath: './dist/img',
			// 告诉webpack合并图片的时候如何分组
			groupBy: function (image) {
				// url: '../images/animal/animal1.png'
				let path = image.url.substr(0, image.url.lastIndexOf('/'))
				let name = path.substr(path.lastIndexOf('/') + 1)
				// 必须返回promise
				return Promise.resolve(name)
			},
			// 过滤图片合并
			filterBy: function (image) {
				let path = image.url
				if (!/\.png$/.test(path)) {
					return Promise.reject()
				}
				return Promise.resolve()
			}
		}
	}
}
