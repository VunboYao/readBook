Page({
    data: {
        filmList: [
            {
                title: '',
                films: {}
            }
        ]
    },

    onReady() {
        wx.showLoading({
            title: '加载中',
        })
        this.loadData()
    },

    /* 加载数据 */
    loadData() {
        wx.request({
            url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items',
            data: {
                start: 0,
                count: 12
            },
            success: ({data: {subject_collection: {name}, subject_collection_items}}) => {
                // 更新数据
                this.setData({
                    "filmList[1]": {
                        title: name,
                        films: subject_collection_items,
                        reqKey: "movie_free_stream"
                    }
                })
            }
        })
        wx.request({
            url: "https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items",
            data: {
                start: 0,
                count: 12
            },
            success: ({data: {subject_collection: {name}, subject_collection_items}}) => {
                // 更新数据
                this.setData({
                    "filmList[2]": {
                        title: name,
                        films: subject_collection_items,
                        reqKey: "movie_showing"
                    }
                })
                // 成功关闭loading
                wx.hideLoading()
            }
        })
        wx.request({
            url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
            data: {
                start: 0,
                count: 12
            },
            success: ({data: {subject_collection: {name}, subject_collection_items}}) => {
                // 更新数据
                this.setData({
                    "filmList[0]": {
                        title: name,
                        films: subject_collection_items,
                        reqKey: "movie_latest"
                    }
                })
            }
        })
    }

})





