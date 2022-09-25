<template>
  <input type="number">
<!--  <el-button @click="doValidator">
    DoValidate
  </el-button>-->
</template>

<script setup>
import Schema from 'async-validator'

const descriptor = {
  name: {
    type: 'string',
    required: true,
    asyncValidator(rule, value, callback) {
      callback()
    },
  },
  score: [
    {
      type: 'number',
      required: true,
      message: '请输入数字',
    },
    {
      pattern: /^\d{3,5}$/g,
      message: '请输入3到5位数字',
    },
  ],
  phone: {
    type: 'number',
    required: true,
  },
}

const validator = new Schema(descriptor)
// const doValidator = () => {
validator.validate({
  name: 'yyb',
  score: 12,
},
{ suppressWarning: false, first: false, firstFields: true }, (errors, fields) => {
  console.log(fields)
})
// }
</script>

