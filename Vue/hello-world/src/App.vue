<template>
  <div ref="demo"></div>
</template>

<script>
import SlideRuler from 'slide-ruler'
export default ({
  data() {
    return {
      currentValue: 180
    }
  },
  mounted() {
    this._renderSlideRuler();
  },
  watch: {
    'currentValue': function (val, old) {
      if (val === old) return
      return new SlideRuler(
        {
          el: this.$refs.demo,
          maxValue: 230,
          minValue: 100,
          currentValue: val,
          handleValue: this.handleValue,
          precision: 1
        }
      );
    }
  },
  methods: {
    _renderSlideRuler() {
      let c = new SlideRuler(
        {
          el: this.$refs.demo,
          maxValue: 230,
          minValue: 100,
          currentValue: this.currentValue,
          handleValue: this.handleValue,
          precision: 1
        }
      );
      console.log(c);
      return c
    },

    handleValue(value) {
      this.currentValue = value
    }
  }
})
</script>

<style scoped lang="less">
</style>
