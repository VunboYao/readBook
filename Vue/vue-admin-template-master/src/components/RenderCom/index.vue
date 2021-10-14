<script>
export default {
  props: ['level', 'title', 'icon'],
  render(h) {
    let children = []
    if (this.icon) {
      children.push(h(
        'svg',
        { class: 'icon' },
        [h(
          'use',
          { attrs: { 'xlink:href': '#icon-' + this.icon }}
        )]
      ))
      children = children.concat(this.$slots.default)
    }
    console.log(`children`, children)
    const vn = h(
      'h' + this.level,
      { attrs: { title: this.title }},
      children
    )
    console.log(`vn`, vn)
    return vn
  }
}
</script>
