<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>
<template>
  <el-button
    type="primary"
    @click="open = true"
  >
    打开Model
  </el-button>
  <Teleport to="body">
    <Transition>
      <div
        v-if="open"
        class="modal"
      >
        <p>Hello, this is model</p>
        <el-button
          type="warning"
          @click="open = false"
        >
          Close
        </el-button>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped>
.modal {
  padding: 20px;
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  text-align: center;
  width: 300px;
  margin-left: -150px;
  background-color: #ddd;
  border-radius: 8px;
}
/* 离开的最后一刻 */
.v-leave-to {
  transform: scale(0);
  opacity: 0;
}

/* 进入的一刻 */
.v-enter-from {
  transform: scale(1.3);
  opacity: 0;
}

/* 进入的最后一刻 */
.v-enter-to {
  transform: scale(1);
  opacity: 1;
}

/* 进入过渡 */
.v-enter-active {
  transition: all 0.3s ease-in;
}
/* 离开过渡 */
.v-leave-active {
  transition: all 0.4s ease-in;
}
</style>
