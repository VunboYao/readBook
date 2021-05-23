:<template>
  <div>
    <input type="text" v-bind="$attrs" :size="size">
  </div>
</template>

<script>
export default {
  name: 'Vinput',
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: 'small'
    }
  }
}
</script>

<style>

</style>
