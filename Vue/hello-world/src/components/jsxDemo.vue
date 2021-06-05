<script>
export default {
  data() {
    return {};
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
  render: function (createElement) {
    return createElement(
      "h" + this.level, // 标签名称
      [
        this.$slots.default,
        createElement("a", {
          style: { color: "red" },
          domProps: { innerHTML: "name" },
        }),
      ] // 子节点数组
    );
  },
};
</script>
