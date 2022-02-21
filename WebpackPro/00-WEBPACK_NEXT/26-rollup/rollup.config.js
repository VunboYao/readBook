import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import Vue from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import server from 'rollup-plugin-serve'
import liveReload from 'rollup-plugin-livereload'

console.log(process.env.XIXI)
const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
		Vue(), // 放到commonjs前面
		postcss(),
		commonjs(),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		resolve(),
		babel({
			babelHelpers: 'bundled',
		}),
]

if (isProduction) {
	plugins.push(terser())
} else {
	const devPlugin = [
		server({
			open: true,
			port: 8080,
			contentBase: '.',
		}),
		liveReload(),
	]
	plugins.push(...devPlugin)
}

export default {
	input: 'src/main.js',
	output: {
		file: 'dist/bundle.js',
		name: 'yyb',
		format: 'umd',
		globals: {
			lodash: '_',
		},
	},
	external: ['lodash'],
	plugins,
}
