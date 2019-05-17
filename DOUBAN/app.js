App({
    userInfo: null,
    // 启动时执行的函数
    onLaunch: () => {
        wx.getUserInfo({
            success:(res)=> {
               this.userInfo = res.userInfo;
            }
        })
    }
})