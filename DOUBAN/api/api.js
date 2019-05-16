const movie_free_stream = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items";
const movie_showing = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items";
const movie_latest = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items";
const movie_hot = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_hot/items";
const movie_Top250 = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_top250/items";

const movie_Detail = "https://m.douban.com/rexxar/api/v2/movie";


let param = {
    start: 0,
    count: 8
}

let fail = function () {
    wx.showToast({
        title: '数据加载失败',
        images: "/imgs/error.png",
        duration: 2000
    })
}


let loadMovieLatest = function (success,data=param) {
    wx.request({
        url: movie_latest,
        data,
        success,
        fail
    })
}

let loadMovieHot = function (success,data=param) {
    wx.request({
        url: movie_hot,
        data,
        success,
        fail
    })
}

let loadMovieTop250 = function (success,data=param) {
    wx.request({
        url: movie_Top250,
        data,
        success,
        fail
    })
}

let loadMovieShowing = function (success,data=param) {
    wx.request({
        url: movie_showing,
        data,
        success,
        fail
    })
}

let loadMovieFreeStream = function (success,data=param) {
    wx.request({
        url: movie_free_stream,
        data,
        success,
        fail
    })
}

let loadMovieDetail = function (success, filmId) {
    wx.request({
        url: movie_Detail + "/" + filmId,
        success,
        fail
    })
}

export default {
    loadMovieLatest,
    loadMovieShowing,
    loadMovieFreeStream,
    loadMovieHot,
    loadMovieTop250,
    loadMovieDetail
}