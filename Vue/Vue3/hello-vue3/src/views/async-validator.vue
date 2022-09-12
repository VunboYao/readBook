<template>
  Hello
</template>

<script setup lang="ts">
import Schema from 'async-validator'
const descriptor = {
  name: {
    type: 'string',
    required: true,
    validator: (rule, value) => value === 'muji',
  },
  age: {
    type: 'number',
    asyncValidator: (rule, value) => {
      return new Promise<void>((resolve, reject) => {
        if (value < 18) {
          reject('too young') // reject with error message
        } else {
          resolve()
        }
      })
    },
    validator: (rule, value) => typeof value === "number",
  },
}
const validator = new Schema(descriptor as any)
/*validator.validate({ name: 'muji', age: 12 }, (errors, fields) => {
  if (errors) {
    // validation failed, errors is an array of all errors
    // fields is an object keyed by field name with an array of
    // errors per field
    console.log(errors, fields)
  }
  // validation passed
})*/
validator.validate({ name: 'muji2', age: '2' }).then(() => {
  console.log('ok')
}).catch(({ errors, fields }) => {
  console.log(errors, fields)
})
</script>

<style lang='scss' scoped>
</style>

<!--

-->
