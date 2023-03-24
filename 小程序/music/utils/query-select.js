export default function querySelect(selector) {
  return new Promise(resolve => {
    // 返回一个对象实例
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect(res => {
      resolve(res)
    }).exec()
  })
}