<script>
import {h} from 'vue'
import HelloDemo from "@/components/helloDemo"
export default {
  name: "render",
  /* data() {
     return {
       counter: 0
     }
   },*/
  /*setup() {
    let counter = ref(0)
    return () => {
      return h('div', {class: 'title'}, [
        h('h2', null, `当前计数: ${counter.value}`),
        h('button', {
          onClick: () => counter.value++
        }, '+1'),
        h('button', {
          onClick: () => counter.value--
        }, '-1'),
      ])
    }
  },*/
  /*render() {
    return h('div', {class: 'title'}, [
      h('h2', null, `当前计数: ${this.counter}`),
      h('button', {
        onClick: () => this.counter++
      }, '+1'),
      h('button', {
        onClick: () => this.counter--
      }, '-1'),
    ])
  },*/
  render() {
    return h(HelloDemo, null, {
      default: props => h('span', null, 'app中传入的数据' + props)
    })
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.title {
  color: red;
  font-size: 40px;
}
</style>
