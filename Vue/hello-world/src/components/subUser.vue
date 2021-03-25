<template>
  <div>User Children</div>
</template>

<script>
export default {
  name: 'subUser',
  beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
}
</script>

<style>

</style>
