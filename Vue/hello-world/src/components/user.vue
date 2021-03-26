<template>
  <div v-if="!show">
    <h1>Vue</h1>
    <p>
      name: <input type="text" v-model="name" /> age:
      <input type="text" v-model="age" />
    </p>
    <button @click="push">Push</button>
    <button @click="Shift">Shift</button>
    <transition-group appear tag="ul" mode="out-in">
      <p v-for="item in person" :key="item.name">
        <input type="checkbox" />
        <span>{{ item.name }}-{{ item.age }}</span>
      </p>
    </transition-group>
  </div>
  <div v-else>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      show: true,
      name: "",
      age: "",
      person: [
        { name: "zs", age: 12 },
        { name: "li", age: 14 },
        { name: "wa", age: 13 },
      ],
    };
  },
  watch: {},
  methods: {
    push() {
      if (this.name && this.age) {
        this.person.push({
          name: this.name,
          age: this.age,
        });
        this.name = this.age = "";
      }
    },
    Shift() {
      this.person.shift();
    },
  },
};
</script>
<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.fade-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}
</style>
