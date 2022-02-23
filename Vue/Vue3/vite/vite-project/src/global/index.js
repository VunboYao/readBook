export function errorHandler(app) {
	app.config.errorHandler = err => {
		console.warn(`app.config.errorHandler: `, err)
	}
}
