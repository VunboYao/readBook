<template>
  Hello
  <input type="number">
</template>

<script setup>
import Schema from 'async-validator'

const descriptor = {
  name: {
    type: 'string',
    required: true,
    validator: (rule, value) => value === 'muji',
  },
  score: {
    type: 'number',
    required: true,
    validator: (rule, value, callback, source) => {
      // console.log('rule :>> ', rule)
      // console.log('source :>> ', source)
      return value > 30
    },
  },
  age: {
    type: 'number',
    asyncValidator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value < 18) {
          reject('too yong')
        } else {
          resolve('ok')
        }
      })
    },
  },
}

const validator = new Schema(descriptor)
validator.validate({ name: 'muji2', score: '20a' }, { suppressWarning: false }, (errors, fields) => {
  if (errors) {
    /*
      校验失败，errors 是一个包含所有错误的数组
      fields 是一个以字段名称为 key 的对象，带有一个包含每个字段错误的数组
      */
    return handleErrors(errors, fields)
  }

  // 校验通过
})

/* validator.validate({ name: 'muji', age: 16 }).then(() => {
    // 检验通过 or 没有错误信息
  }).catch(({ errors, fields }) => {
    return handleErrors(errors, fields)
  }) */

function handleErrors(errors, fields) {
  console.log(errors, fields)
}

const descriptor2 = {
  name(rule, value, callback, source, options) {
    const errors = []
    if (!/^[a-z0-9]+$/.test(value)) {
      console.log(rule.field)
      errors.push(new Error(`Error: ${rule.field}`))
    }
    return errors
  },
}

const validate2 = new Schema(descriptor2)
validate2.validate({ name: 'FirstName' }, (errors, fields) => {
  if (errors) {
    console.log(errors, fields)
  }
})
</script>

