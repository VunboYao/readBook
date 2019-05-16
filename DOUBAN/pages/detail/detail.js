import api from './../../api/api'
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
        this.data.filmId = options.filmId
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */

    onReady: function () {
        this.loadFilmDetail();
        this.loadFilmComment();
    },

    // 触底事件
    onReachBottom(){
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
                    title,
                    // ?
                    pic: {
                        large,
                        normal
                    },
                    rating: {
                        value: source,
                        count
                    },
                    card_subtitle: info,
                    pubdate: date,
                    intro,
                    actors,

                }
            }
        ) => {
            this.setData({
                film: {
                    title,normal,large, source, count, info, date, intro,actors
                }
            })
            // 设置标题
            wx.setNavigationBarTitle({
                "title": this.data.film.title
            });
        }, this.data.filmId)
    },
    // 加载评论
    loadFilmComment() {
        api.loadMovieComment(({data: {total,interests}})=>{
            this.setData({
                comments: {
                    total,
                    list: this.data.comments.list.concat(interests)
                }
            })
        },this.data.filmId,this.data.params)
    },

    // goTop
    goTop() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
    }
})
