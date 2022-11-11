<template>
  <div>
    <p>
      add: {{ addDemo }}
    </p>
    <show-dialog />
  </div>
</template>

<script setup>
import { add, format } from 'date-fns'
import { ref } from "vue"
import ShowDialog from "@/components/showDialog"

const addDemo = ref()
addDemo.value = add(new Date(), {
  days: 2,
})
addDemo.value = format(addDemo.value, 'yyyy-MM-dd')

</script>

<style scoped>

</style>
