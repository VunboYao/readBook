{
  // TODO: Promise.reject(),任何参数都返回拒绝状态
  const p = new Promise((resolve, reject) => {
    reject('123')
  })
  p.catch(err => {
    console.log(err, '123')
  })
  Promise.reject(p).then(
    res => {
      console.log(res)
    },
    err => {
      console.log(err, 'err')
      console.log('----------------------------------')
    }
  )
  const s1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(1)
    }, 2000)
  })
  const s2 = new Promise((a, reject) => {
    setTimeout(() => {
      reject(2)
    }, 2000)
  })
  const s3 = new Promise((a, reject) => {
    setTimeout(() => {
      reject(2)
    }, 4000)
  })
  // TODO： allSettled所有都返回后
  Promise.allSettled([s1, s2, s3]).then(res => {
    console.log(res)
  })

  // TODO: any任何一个成功即可
  Promise.any([s1, s2, s3]).then(
    res => {
      console.log('res', res)
    },
    err => {
      console.log('err', err)
    }
  )
}

{
  // TODO：手写Promise
  class YPromise {
    constructor(executor) {}
  }
}
