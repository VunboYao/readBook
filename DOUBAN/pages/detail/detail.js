import api from './../../api/api'
// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        filmId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.filmId = options.filmId;
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
       // this.loadFilmDetail()
    },
    loadFilmDetail() {
        api.loadMovieDetail((res) => {
            console.log(res);
        },this.data.filmId)
    }
})