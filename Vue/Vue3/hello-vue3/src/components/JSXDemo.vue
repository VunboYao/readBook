<script>
export default {
  name: "JSXDemo",
  data(){
    return {
      counter: 0
    }
  },
  render() {
    const add = () => this.counter++
    const down = () => this.counter--
    return <>
      <div>Hello JSX {this.counter}</div>
      <button onClick={add}>+1</button>
      <button onClick={down}>-1</button>
    </>
  }
}
</script>

<style scoped lang="scss">

</style>
