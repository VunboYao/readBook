const appInstance = getApp()

// pages/aboutMe/aboutMe.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        likes: {},
        userInfo: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.getUserInfo({
            success:(res)=> {
                this.setData({
                    userInfo: res.userInfo
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let likes = wx.getStorageSync('likes');
        this.setData({
            likes: likes
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    // 删除收藏
    removeCollect(e) {
        console.log(e);
        // 获取电影id
        let filmId = e.currentTarget.dataset.index;
        // 获取缓存
        let likes = wx.getStorageSync('likes');
        // 删除当前对象
        delete likes[filmId];
        // 设置新的缓存
        wx.setStorageSync('likes', likes);
        // 更新数据
        this.setData({
            likes: likes
        })
    },

    // 获取用户信息
    getUser(e) {
        if (e.detail.userInfo) {
            let user = e.detail.userInfo;
            this.setData({
                userInfo: user
            })
            appInstance.userInfo = user;
        }
    }
})
