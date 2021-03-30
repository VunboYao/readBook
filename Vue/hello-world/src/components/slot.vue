<template>
  <div>
    <header>Header</header>
    <slot name="main" :user="user">
      {{user.lastName}}
    </slot>
    <footer>Footer</footer>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data(){
    return {
      user: {
        firstName: 'Vunbo',
        lastName: 'Yao'
      }
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}
</style>
