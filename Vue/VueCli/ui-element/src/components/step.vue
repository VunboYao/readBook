<template>
  <div>
    <div class="step">
      <div v-for="(item, index) in stepData" :key="index" class="step-item">
        <span
          class="step-item--num"
          :class="[
            index > 0 ? 'is-active' : '',
            active >= (index + 1) ? 'active' : ''
          ]"
          >{{ index + 1 }}</span>
        <span class="step-item--text">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stepData: {
      type: Array,
      default: () => null
    },
    active: {
      type: [Number, String],
      default: 1
    }
  }
}
</script>
<style lang="scss">
.step {
  display: flex;
  justify-content: center;
  .step-item {
    width: 177px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .step-item--num {
      width: 22px;
      height: 22px;
      color: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(0, 0, 0, 0.25);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      box-sizing: border-box;
    }
    .is-active {
      position: relative;
      &::before {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 32px;
        content: '';
        display: block;
        height: 1px;
        width: 134px;
        background: rgba(0, 0, 0, 0.25);
      }
    }
    > .active {
      background: #3880dd;
      color: #fff;
      border: none;
      position: relative;
      &::before {
        transition: all .5s;
        background: #3880dd;
      }
    }
    .step-item--text {
      margin-top: 10px;
      font-size: 14px;
      color: rgb(89, 89, 89);
    }
  }
}
</style>
