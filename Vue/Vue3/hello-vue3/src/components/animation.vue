<template>
  <div id="demo">
    <button @click="add">
      Add
    </button>
    <button @click="remove">
      Remove
    </button>
    <transition-group name="list" tag="p">
      <span
        v-for="item in items"
        :key="item"
        class="list-item"
      >
        {{ item }}
      </span>
    </transition-group>
    <input
      v-model="counter"
      type="number"
      step="100"
    >
    <h2>当前计数：{{ showNumber.toFixed(0) }}</h2>
    <button @click="addNumber">
      add
    </button>
    <button @click="delNumber">
      Del
    </button>
    <button @click="shuffleNumber">
      shuffle
    </button>
    <div>
      <transition-group tag="p" name="yyb">
        <span
          v-for="item in numbers"
          :key="item"
          class="margin"
        >{{ item }}</span>
      </transition-group>
    </div>
    <div>
      <input v-model="keyword">
      <transition-group
        tag="ul"
        name="ani"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <li
          v-for="(item, index) in showNames"
          :key="item"
          :data-index="index"
        >
          {{ item }}
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import _ from 'lodash'

export default {
  name: 'Animation',
  props: {},
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      counter: 0,
      showNumber: 0,
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNumber: 10,
      keyword: '',
      names: ['abc', 'cba', 'yyb', 'lobe', 'name', 'demo', 'coun', 'apple'],
    }
  },
  computed: {
    showNames() {
      return this.names.filter((item) => {
        return item.includes(this.keyword)
      })
    },
  },
  watch: {
    counter(newVal) {
      gsap.to(this, { duration: 0.5, showNumber: newVal })
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.1,
        onComplete: done,
      })
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.1,
        onComplete: done,
      })
    },
    shuffleNumber() {
      this.numbers = _.shuffle(this.numbers)
    },
    addNumber() {
      const randomIndex = Math.floor(Math.random() * this.numbers.length)
      console.log(randomIndex)
      this.numbers.splice(randomIndex, 0, this.nextNumber++)
    },
    delNumber() {
      const randomIndex = Math.floor(Math.random() * this.numbers.length)
      this.numbers.splice(randomIndex, 1)
    },
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    },
  },
}
</script>

<style scoped>
.margin {
  display: inline-block;
  margin-right: 20px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.yyb-enter-from,
.yyb-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.yyb-leave-active {
  position: absolute;
}

.yyb-enter-active,
.yyb-leave-to {
  transition: all 1s;
}

.yyb-move {
  transition: transform 1s;
}

.ani-enter-from,
.ani-leave-to {
  opacity: 0;
}

.ani-enter-active,
.ani-leave-active {
  transition: all 1s;
}
</style>
