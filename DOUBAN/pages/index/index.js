import api from "./../../api/api.js";

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
        api.loadMovieShowing(({data: {subject_collection: {name}, subject_collection_items}}) => {
            // 更新数据
            this.setData({
                "filmList[0]": {
                    title: name,
                    films: subject_collection_items,
                    reqKey: "loadMovieShowing"
                }
            })

        })
        api.loadMovieFreeStream(({data: {subject_collection: {name}, subject_collection_items}}) => {
            // 更新数据
            this.setData({
                "filmList[1]": {
                    title: name,
                    films: subject_collection_items,
                    reqKey: "loadMovieFreeStream"
                }
            })
        })
        api.loadMovieHot(({data: {subject_collection: {name}, subject_collection_items}}) => {
            // 更新数据
            this.setData({
                "filmList[2]": {
                    title: name,
                    films: subject_collection_items,
                    reqKey: "loadMovieHot"
                }
            })
        })
        api.loadMovieTop250(({data: {subject_collection: {name}, subject_collection_items}}) => {
            // 更新数据
            this.setData({
                "filmList[3]": {
                    title: name,
                    films: subject_collection_items,
                    reqKey: "loadMovieTop250"
                }
            })
        })
        api.loadMovieLatest(({data: {subject_collection: {name}, subject_collection_items}}) => {
            // 更新数据
            this.setData({
                "filmList[4]": {
                    title: name,
                    films: subject_collection_items,
                    reqKey: "loadMovieLatest"
                }
            })
            // 关闭loading
            wx.hideLoading();
        })
    }

})






