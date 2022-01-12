export default {
	data() {
		return {
			msg: 'hello mixin',
			number: 1
		}
	},
	computed: {
		msg2() {
			return this.number * 2
		}
	}
}
