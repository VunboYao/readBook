import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import Vue from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'

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
	plugins: [
		Vue(),
		commonjs(),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		resolve(),
		babel({
			babelHelpers: 'bundled',
		}),
		postcss(),
		terser(),
	],
}
