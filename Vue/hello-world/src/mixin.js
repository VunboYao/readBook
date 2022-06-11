export default {
  data() {
    return {
      a: 2
    }
  },
  created() {
    console.log(this.a, 'mixin')
  }
}
