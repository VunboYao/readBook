const paginationBav = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    // 获取当前开始的值
    getCurrentStart() {
      return this.data.dataArray.length
    },

    // 更新总数
    setTotal(total) {
      this.data.total = total
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    // 是否还有更多
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    // 初始值
    initialize() {
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      })
      //  this.data.dataArray = []
      this.data.total = null
    },
    isLocked() {
      return this.data.loading ? true : false
    },
    locked() {
      this.setData({ loading: true })
    },
    unLocked() {
      this.setData({ loading: false })
    },
  }
})
export { paginationBav }
