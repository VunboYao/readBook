class yybSwiper {
    constructor(obj) {
        // 0 初始化数据
        /*
        *  oElement: Dom 节点元素
        *  bPagination: 显示焦点图 (Boolean)
        *  iDuration:  动画持续时间 Number
        *  invalidDis: 无效滑动距离 Number
        * */
        this.oElement = document.querySelector(obj.element)
        this.bPagination = obj.pagination || false
        this.iDuration = obj.duration || 4000
        this.invalidDis = obj.invalidDis || 80

        // 1.获取基础轮播数据
        this.oWrap = this.oElement.querySelector('.yybSwiper-wrap') // 父级容器
        this.aAllImg = this.oWrap.querySelectorAll('.yybSwiper-item') // 所有轮播图片
        this.iLen = this.aAllImg.length // 长度

        // 2. 添加分页器
        if (this.bPagination) {
            this.createPagination()
        }

        // 3. 初始变量
        this.index = 0 // 初始索引
        this.zIndex = 99 // 定位层级 z-index
        this.oWidth = this.oWrap.offsetWidth
        this.timer = null // 定时器
        this.aDots = this.oWrap.querySelectorAll('span') // 所有小圆点

        this.startX = null // 触摸节点开始
        this.nowX = null
        this.endX = null
        this.iMoveDistance = 0 // 滑动距离

        // 4. 初始化层叠位置
        this.initialZ_index()

        // 5. 轮播图片
        this.showImg()

        // 6. touchstart
        this.oWrap.addEventListener('touchstart', evt => {
            clearInterval(this.timer)
            this.startX = evt.touches[0].clientX
        }, {passive: true})

        // 7. touchmove
        this.oWrap.addEventListener('touchmove', evt => {
            // 7.1 移动距离获取,超出边界返回
            this.nowX = evt.touches[0].clientX
            let moveX = this.nowX - this.startX // 移动距离
            if (this.nowX >= this.oWidth || this.nowX <= 0) return // 超出边界返回

            // 7.2 当前页面跟随滑动
            this.setTimeLocal(this.aAllImg[this.index], '0ms', moveX)

            /*
            *  7.3 左右滑动判断
            *  1. 右滑动, 显示上一张, 如果索引为0, 上一张为最后一张
            *  2. 左滑动, 显示下一张, 如果索引为 iLen - 1, 下一张为第一张
            * */

            if (moveX > 0) {
                if (this.index === 0) {
                    this.setTimeLocal(this.aAllImg[this.iLen - 1], '0ms', -this.oWidth)
                    this.aAllImg[this.iLen - 1].style.opacity = 1
                    // 上一张为最后一张
                    this.aAllImg[this.index - 1] = this.aAllImg[this.iLen - 1]
                }
                this.setTimeLocal(this.aAllImg[this.index - 1], '0ms', -this.oWidth + moveX)
            } else {
                if (this.index === (this.iLen - 1)) {
                    this.setTimeLocal(this.aAllImg[0], '0ms', this.oWidth + moveX)
                } else {
                    this.setTimeLocal(this.aAllImg[this.index + 1], '0ms', this.oWidth + moveX)
                    this.aAllImg[this.index + 1].style.opacity = 1
                }
            }

        }, {passive: true})

        // 8. touchend
        this.oWrap.addEventListener('touchend', evt => {
            this.endX = evt.changedTouches[0].clientX
            this.iMoveDistance = this.endX - this.startX // 移动的距离

            /*
            * 滑动距离大小判断移动方向
            * 1. dis 大于 30, 显示上一张, index--; 如果 index < 0; index = iLen - 1;更新位置
            * 2. dis 小于 -30, 显示下一张, index++; 如果 index > iLen, index = 0; 更新位置
            * */
            if (this.iMoveDistance < 0) {
                this.nextPlay()
            }
            if (this.iMoveDistance > 0) {
                this.prePlay()
            }

            // 圆点跟随
            if (this.bPagination) {
                for (let i = 0; i < this.iLen; i++) {
                    this.aDots[i].className = ''
                }
                this.aDots[this.index].className = 'swiper-currentIndex'
            }

            // 轮播
            this.showImg();
        })
    }

    // 0. 分页器生成
    createPagination() {
        let oFragment = document.createDocumentFragment()
        let oDiv = document.createElement('div')
        oDiv.className = 'yybSwiper-pagination'
        for (let i = 0; i < this.iLen; i++) {
            let oSpan = document.createElement('span')
            if (i === 0) {
                oSpan.className = 'swiper-currentIndex'
            }
            oDiv.appendChild(oSpan)
        }
        oFragment.appendChild(oDiv)
        this.oWrap.appendChild(oFragment)
    }

    // 1. 初始化层叠位置
    initialZ_index() {
        for (let i = 0; i < this.iLen; i++) {
            this.aAllImg[i].style.zIndex = this.zIndex--
            this.aAllImg[i].style.opacity = 0
        }
        this.aAllImg[this.index].style.opacity = 1
        this.aAllImg[this.index + 1].style.transform = `translateX(${this.oWidth}px)`
    }

    // 2. 轮播图片
    showImg() {
        this.timer = setInterval(() => {
            // 1. 索引递增
            this.index++
            if (this.index > this.iLen - 1) {
                this.index = 0
            }
            // 2. 条件判断
            // 上一张, 如果是第一张时, 指向最后一张
            if (this.index <= 0) {
                this.setTimeLocal(this.aAllImg[this.iLen - 1], '500ms', -this.oWidth)
            } else {
                this.setTimeLocal(this.aAllImg[this.index - 1], '500ms', -this.oWidth)
            }

            // 3. 当前
            this.setTimeLocal(this.aAllImg[this.index], '500ms', 0)
            this.aAllImg[this.index].style.opacity = 1

            // 4. 下一张, 如果是最后一张时, 指向第一张,无动画时间跳转.
            if (this.index >= (this.iLen - 1)) {
                this.setTimeLocal(this.aAllImg[0], '0ms', this.oWidth)
            } else {
                this.setTimeLocal(this.aAllImg[this.index + 1], '0ms', this.oWidth)
            }

            // 5. 清除上一张与当前的动画时间, 如果当前索引为0, 上一张指向最后一张.
            if (this.index <= 0) {
                this.removeDuration(this.aAllImg[this.iLen - 1])
            } else {
                this.removeDuration(this.aAllImg[this.index - 1])
            }
            this.removeDuration(this.aAllImg[this.index])

            // 6. 圆点跟随
            if (this.bPagination) {
                for (let i = 0; i < this.iLen; i++) {
                    this.aDots[i].className = ''
                }
                this.aDots[this.index].className = 'swiper-currentIndex'
            }
        }, this.iDuration)
    }

    // 3. 左滑, 下一张
    nextPlay() {
        /*
        * 1. dis 小于 -100, 显示下一张, index++
        * 2. 如果 index > iLen - 1, index = 0
        * 3. 更新位置
        * 4. dis 大于 -100, 动画返回原来的位置
        * */
        if (this.iMoveDistance < -this.invalidDis) {
            this.index++
            if (this.index > this.iLen - 1) {
                this.index = 0
            }
            console.log('当前索引: ' + this.index)

            // update 上一张
            if (this.index === 0) {
                this.setTimeLocal(this.aAllImg[this.iLen - 1], '500ms', -this.oWidth)
                this.removeDuration(this.aAllImg[this.iLen - 1])
            } else {
                this.setTimeLocal(this.aAllImg[this.index - 1], '500ms', -this.oWidth)
                this.removeDuration(this.aAllImg[this.index - 1])
            }

            // update 当前
            this.setTimeLocal(this.aAllImg[this.index], '500ms', 0)
            this.removeDuration(this.aAllImg[this.index])

            // update 下一张
            if (this.index >= this.iLen - 1) {
                this.setTimeLocal(this.aAllImg[0], '0ms', this.oWidth)
            } else {
                this.setTimeLocal(this.aAllImg[this.index + 1], '0ms', this.oWidth)
            }
        } else {
            if (this.index >= this.iLen -1) {
                this.setTimeLocal(this.aAllImg[this.index], '500ms', 0)
                this.setTimeLocal(this.aAllImg[0], '500ms', this.oWidth);
                this.removeDuration(this.aAllImg[this.index])
                this.removeDuration(this.aAllImg[0])
            } else {
                this.setTimeLocal(this.aAllImg[this.index], '500ms', 0)
                this.setTimeLocal(this.aAllImg[this.index + 1], '500ms', this.oWidth)
                this.removeDuration(this.aAllImg[this.index])
                this.removeDuration(this.aAllImg[this.index + 1])
            }
        }
    }

    // 4. 右滑, 上一张
    prePlay() {
        /*
        * 1. dis 大于 100, 显示上一张, index--
        * 2. 如果 index < 0, index = iLen - 1;
        * 3. 更新位置
        * 4. 如果 dis 小于 100, 动画返回原位置
        * */
        if (this.iMoveDistance > this.invalidDis) {
            this.index--
            if (this.index < 0) {
                this.index = this.iLen - 1
            }
            console.log("当前索引: " + this.index)
            // update 上一张
            if (this.index === 0) {
                this.setTimeLocal(this.aAllImg[this.iLen - 1], '0ms', -this.oWidth)
                this.aAllImg[this.index - 1] = this.aAllImg[this.iLen - 1]
                this.aAllImg[this.index - 1].style.opacity = 1
            } else {
                this.setTimeLocal(this.aAllImg[this.index - 1], '0ms', -this.oWidth)
                this.aAllImg[this.index - 1].style.opacity = 1
            }

            // update 当前
            this.setTimeLocal(this.aAllImg[this.index], '500ms', 0)
            this.removeDuration(this.aAllImg[this.index])

            // update 下一张
            if (this.index >= this.iLen - 1) {
                this.setTimeLocal(this.aAllImg[0], '500ms', this.oWidth)
                this.removeDuration(this.aAllImg[0]) // 消除动画时间
            } else {
                this.setTimeLocal(this.aAllImg[this.index + 1], '500ms', this.oWidth)
                this.removeDuration(this.aAllImg[this.index + 1]) // 消除动画时间
            }
        } else {
            // 动画滑动至原来的位置
            this.setTimeLocal(this.aAllImg[this.index], '500ms', 0);
            this.setTimeLocal(this.aAllImg[this.index - 1], '500ms', -this.oWidth);
            this.removeDuration(this.aAllImg[this.index - 1]);
            this.removeDuration(this.aAllImg[this.index]);
        }
    }

    // 公共方法, 运动持续时间与/运动距离
    setTimeLocal(element, duration, place) {
        element.style.transitionDuration = duration
        element.style.transform = `translateX(${place}px)`
    }

    removeDuration(element) {
        element.addEventListener('transitionend', ev => {
            element.style.transitionDuration = '0ms'
        })
    }
}

let obj =
    {
    element: '.yybSwiper-container',
    pagination: true, // 显示焦点
    duration: 5000, // 动画时间
}
let a = new yybSwiper(obj)
