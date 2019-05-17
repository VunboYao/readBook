import api from './../../api/api';
let app = getApp();
// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        filmId: '',
        film: {},
        comments: {
            total: 0,
            list: []
        },
        params: {
            start: 0,
            count: 20,
            order_by: 'time'
        }
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
        wx.showLoading({
            title: '加载中...'
        });
        this.loadFilmDetail();
        this.loadFilmComment();
    },

    // 触底事件
    onReachBottom() {
        this.data.params.start = this.data.params.start + this.data.params.count;
        if (this.data.params.start > this.data.comments.total) {
            return false
        } else {
            this.loadFilmComment();
        }
    },
    // 加载电影详情
    loadFilmDetail() {
        api.loadMovieDetail((
                {
                    data: {
                        id,
                        title,
                        // ?
                        pic: {
                            large,
                            normal
                        },
                        rating,
                        card_subtitle: info,
                        pubdate: date,
                        intro,
                        actors,
                        cover:{image:{large:url}}
                    }
                }
        ) => {
            this.setData({
                film: {
                    id, title, normal, large,info, date, intro, actors, cover:url, rating
                }
            });

            // 设置标题
            wx.setNavigationBarTitle({
                "title": this.data.film.title
            });

            // 已收藏
            let temp = wx.getStorageSync('likes');
            if (temp[id]) {
                this.setData({
                    collect: '已收藏'
                })
            } else {
                this.setData({
                    collect: '收藏'
                })
            }
            wx.hideLoading();
        }, this.data.filmId)
    },
    // 加载评论
    loadFilmComment() {
        api.loadMovieComment(({data: {total, interests}}) => {
            this.setData({
                comments: {
                    total,
                    list: this.data.comments.list.concat(interests)
                }
            });
        }, this.data.filmId, this.data.params)
    },

    // 收藏
    addCollection() {

        if (!app.userInfo) {
            wx.showModal({
                title: '未登录',
                content: "需登陆后授权"
            });
            return;
        }

        let temp = wx.getStorageSync('likes');
        /*   if (temp === '') {
               // wx.setStorageSync("likes", [this.data.film])
               temp = {}
               temp[this.data.film.id] = this.data.film;
               wx.setStorageSync('likes',temp);
           } else {
               // temp.push(this.data.film)
               // wx.setStorageSync("likes", temp)
               temp[this.data.film.id] = this.data.film;
               wx.setStorageSync('likes',temp);
           }*/
        if (temp === '') {
            temp = {}
        }
        if (temp[this.data.film.id]) {
            wx.showToast({
                title: '已收藏',
                icon: "success",
                duration: 1500
            });
            return;
        }
        temp[this.data.film.id] = this.data.film;
        wx.setStorageSync('likes', temp);
        wx.showToast({
            title: '收藏成功',
            icon: "success",
            duration: 1500,
            success:() => {
                this.setData({
                    collect: "已收藏"
                })
            }
        })
    },

    // goTop
    goTop() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
    }
})
