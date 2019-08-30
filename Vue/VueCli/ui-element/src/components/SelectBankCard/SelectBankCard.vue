<template>
  <div>
    <div
      ref="container"
      class="container"
    >
      <!--卡片容器-->
      <div
        ref="cardWrap"
        class="card-wrap"
      >
        <div
          v-for="(item, index) in cardData"
          :key="index"
          :class="['card-item', index === activeIndex ? 'selected' : '']"
          @click.capture="selected(index, item)"
        >
          <span class="card-alias">{{ item[cardKey['cardAlias']]}}</span>
          <p class="card-num">{{ item[cardKey['cardNum']] }}
            <span class="card-name">{{ item[cardKey['cardName']] }}</span>
          </p>
          <span class="card-tip">可用余额</span>
          <p class="card-balance">¥ <span class="card-balance_tip">{{ item[cardKey['cardBalance']] | currencyFormat }}</span></p>
        </div>
      </div>
      <!--箭头-->
      <template v-if="arrowShow">
        <span
          class="card-left"
          @click="move('left')"
        >
          <i class="el-icon-arrow-left"></i>
        </span>
        <span
          class="card-right"
          @click="move('right')"
        >
          <i class="el-icon-arrow-right"></i>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectBankCard',
  filters: {
    /* 金额过滤器 */
    currencyFormat(num) {
      return Number(num).toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ',')
    }
  },
  props: {
    cardData: { // 数据
      type: Array,
      default: () => null
    },
    active: { // 默认激活第一个选项
      type: Number,
      default: 0
    },
    cardKey: { // 数据解耦对象
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      activeIndex: this.active, // 解决 prop 的单行传递警告问题
      containerWidth: null, // 父容器宽度
      cardWrapWidth: null, // 所有卡片宽度
      cardWidth: 288, // 卡片单元宽度
      arrowShow: true,
      oldIndex: null
    }
  },
  mounted() {
    // 初始信息
    this.initialInfo()
    // 当传入的索引不是默认值时，页面显示优化
    this.step(this.activeIndex)
    // 窗口缩放，重新计算父级宽度值
    window.onresize = () => {
      this.containerWidth = Math.abs(this.$refs.container.offsetWidth)
      this.arrowShow = this.cardWrapWidth > this.containerWidth
      this.step(this.activeIndex)
    }
  },
  methods: {
    // 初始化信息
    initialInfo() {
      // 获取父元素的宽度
      this.containerWidth = Math.abs(this.$refs.container.offsetWidth)
      // 获取所有卡片的宽度
      this.cardWrapWidth = Math.abs(this.$refs.cardWrap.offsetWidth)
      // 卡片容器宽度小于窗口宽度，不显示左右箭头
      if (this.cardWrapWidth < this.containerWidth) {
        this.arrowShow = false
      }
      // 传入索引值错误判断
      if (this.activeIndex < 0 || this.activeIndex > this.cardData.length) {
        this.activeIndex = 0
      }
      this.oldIndex = this.activeIndex
    },
    // 选择卡片触发事件，并传递父级信息
    selected(index, item) {
      this.oldIndex = this.activeIndex
      this.activeIndex = index
      this.step(this.activeIndex)
      // 传递父组件信息
      this.$emit('select', index, item)
    },
    // 箭头操作，左右移动
    move(dir) {
      // 左偏移量
      const nowLeft = parseInt(this.$refs.cardWrap.style.left) || 0
      if (dir === 'right') {
        // （卡片总宽度 - 偏移量）> 父容齐宽度，执行偏移
        if ((this.cardWrapWidth - Math.abs(nowLeft)) > this.containerWidth) {
          this.$refs.cardWrap.style.left = (nowLeft - this.cardWidth) + 'px'
        }
      } else {
        // 偏移量如果为负数
        if (nowLeft < 0) {
          this.$refs.cardWrap.style.left = (nowLeft + this.cardWidth) + 'px'
        }
      }
    },
    // 选中卡片位置显示
    step(activeIndex) {
      const cardWrap = this.$refs.cardWrap
      const cardWrapLeft = Math.abs(parseInt(cardWrap.style.left))
      const distance = this.cardWrapWidth - this.containerWidth
			if (activeIndex === 0) {
        cardWrap.style.left = 0
      } else if (cardWrapLeft > distance) {
        if (this.activeIndex >= this.oldIndex) {
          return true
        } else {
          cardWrap.style.left = -this.cardWidth * (activeIndex) + 'px'
        }
      } else {
        cardWrap.style.left = -this.cardWidth * (activeIndex) + 'px'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  white-space: nowrap;
  user-select: none;
  height: 180px;
  padding: 20px 0;
  width: 100%;
  overflow: hidden;
  // 左右箭头
  .card-right {
    position: absolute;
    top: 75px;
    right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(0,0,0,0.10);
    > i {
      color: #fff;
      font-size: 26px;
    }
  }
  .card-left {
    position: absolute;
    top: 75px;
    left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(0,0,0,0.10);
    > i {
      color: #fff;
      font-size: 26px;
    }
  }
}
// 卡片容器
.card-wrap {
  position: absolute;
  top: 20px;
  left: 0;
  transition: all .3s;
  // 卡片单元
  .card-item {
    display: inline-block;
    padding: 10px 15px;
    width: 288px;
    height: 140px;
    background: #FFFFFF;
    box-shadow: 0 4px 20px 0 rgba(204, 204, 204, 0.50);
    border-radius: 8px;
    &.selected {
      position: relative;
      border: 1px solid #108EE9;
      box-shadow: 0 4px 20px 0 rgba(16,142,233,0.30);
      &::before {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        width: 42px;
        height: 21px;
        background-color: #108ee9;
        border-radius: 0 7px 0 8px;
      }
      &::after {
        position: absolute;
        content: '';
        top: 4px;
        right: 13px;
        width: 14px;
        height: 8px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        border-radius: 2px;
        transform: rotateZ(-45deg);
      }
    }
    &:first-child ~ .card-item {
      margin-left: 20px;
    }
    &:first-child {
      margin-left: 120px;
    }
    &:last-child {
      margin-right: 100px;
    }
    .card-alias {
      font-size: 12px;
      color: rgba(0,0,0,0.45);
      line-height: 18px;
    }
    .card-num {
      margin: 10px 10px 0 0;
      font-size: 18px;
      line-height: 24px;
      color: rgba(0,0,0,0.85);
      .card-name {
        display: inline-block;
        font-size: 12px;
        line-height: 14px;
        color: rgba(0,0,0,0.43);
        vertical-align: middle;
        width: 9em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .card-tip {
      display: block;
      margin-top: 20px;
      font-size: 12px;
      line-height: 16px;
      color: rgba(0,0,0,0.45);
    }
    .card-balance {
      margin-top: 5px;
      font-size: 12px;
      line-height: 16px;
      color: #F78E3D;
    }
  }
}
</style>
