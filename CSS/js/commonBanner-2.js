class yybSwiper {
    constructor(obj) {
        // 0 初始化数据
        this.oElement = obj.element;
        this.bPagination = obj.pagination || false;
        this.iDuration = obj.duration || 4000;

        // 1.获取基础轮播数据
        this.oWrap = this.oElement.querySelector('.yybSwiper-wrap'); // 父级容器
        this.aAllImg = this.oWrap.querySelectorAll('.yybSwiper-item'); // 所有轮播图片
        this.iLen = this.aAllImg.length; // 长度

        // 2. 添加分页器
        if (this.bPagination) {
            this.createPagination();
        }

        // 3. 初始变量
        this.index = 0; // 初始索引
        this.zIndex = 99; // 定位层级 z-index
        this.oWidth = this.oWrap.offsetWidth;
        this.preNode = null; // 前一个节点
        this.currentNode = null; // 当前节点
        this.nextNode = null; // 下一个节点
        this.timer = null; // 定时器
        this.aDots = this.oWrap.querySelectorAll('span'); // 所有小圆点

        this.startX = null; // 触摸节点开始
        this.nowX = null;
        this.endX = null;
        this.iMoveDistance = 0; // 滑动距离


        // 4. 初始化层叠位置
        this.initialZ_index();

        // 5. 轮播图片
        this.showImg();

        // 6. 操作

        // 6.1 touchstart
        this.oWrap.addEventListener('touchstart', evt => {
            clearInterval(this.timer);
            this.startX = evt.touches[0].clientX;
        }, {passive: true});
        // 6.2 touchmove
        this.oWrap.addEventListener('touchmove', evt => {
            this.nowX = evt.touches[0].clientX;
            let moveX = this.nowX - this.startX; // 移动距离
            if (this.nowX >= this.oWidth || this.nowX <= 0) return; // 超出边界返回

            // 当前页面跟随滑动
            this.setTimeLocal(this.aAllImg[this.index], '0ms', moveX);

            /*
            * 左右滑动判断
            * 1. 右滑动, 显示上一张, 如果索引为0, 上一张应该为最后一张
            * 2. 左滑动, 显示下一张, 如果索引为 lenght - 1, 下一张指向第一张
            *  */

            if (moveX > 0) { // 向右滑动, 显示上一张
                if (this.index <= 0) {
                    // 如果索引为0, 最后一张置为上一张
                    this.setTimeLocal(this.aAllImg[this.iLen - 1], '0ms', -this.oWidth);
                    this.aAllImg[this.iLen - 1].style.opacity = 1;
                    this.aAllImg[this.index - 1] = this.aAllImg[this.iLen - 1];
                }
                this.setTimeLocal(this.aAllImg[this.index - 1], '0ms', -this.oWidth + moveX)
            } else { // 向左滑动, 显示下一张
                if (this.index === this.iLen - 1) {
                    this.setTimeLocal(this.aAllImg[0], '0ms', this.oWidth);
                    this.setTimeLocal(this.aAllImg[0], '0ms', this.oWidth + moveX);
                } else {
                    this.aAllImg[this.index + 1].style.opacity = 1;
                    this.setTimeLocal(this.aAllImg[this.index + 1], '0ms', this.oWidth + moveX);
                }
            }

        }, {passive: true})
        // 6.3 touchend
        this.oWrap.addEventListener('touchend', evt => {
            this.endX = evt.changedTouches[0].clientX;
            this.iMoveDistance = this.endX - this.startX; // 移动的距离
            /*
            * 滑动距离大小判断移动方向
            * 1. dis 大于 30, 显示上一张, index --; 如果 index < 0; index 为 len - 1, 设置相关位置.
            * 2. dis 小于 -30, 显示下一张, index ++; 如果 index > len, index 为 0, 设置相关位置.
            * */
            this.nextPlay();
            this.prePlay();

            if (this.bPagination) {
                for (let i = 0; i < this.iLen; i++) {
                    this.aDots[i].className = '';
                }
                this.aDots[this.index].className = 'swiper-currentIndex';
            }
            this.showImg();
        })
    }

    // 0. 分页器生成
    createPagination() {
        let oFragment = document.createDocumentFragment();
        let oDiv = document.createElement('div');
        oDiv.className = 'yybSwiper-pagination';
        for (let i = 0; i < this.iLen; i++) {
            let oSpan = document.createElement('span');
            if (i === 0) {
                oSpan.className = 'swiper-currentIndex';
            }
            oDiv.appendChild(oSpan);
        }
        oFragment.appendChild(oDiv);
        this.oWrap.appendChild(oFragment);
    }

    // 1. 初始化层叠位置
    initialZ_index() {
        for (let i = 0; i < this.iLen; i++) {
            this.aAllImg[i].style.zIndex = this.zIndex--;
            this.aAllImg[i].style.opacity = 0;
        }
        this.aAllImg[this.index].style.opacity = 1;
        this.aAllImg[this.index + 1].style.transform = `translateX(${this.oWidth}px)`;
    }

    // 2. 轮播图片
    showImg() {
        this.timer = setInterval(() => {
            // 1. 索引递增
            this.index++;
            if (this.index > this.iLen - 1) {
                this.index = 0;
            }

            // 2. 条件判断

            // 上一张, 如果是第一张时,指向最后一张
            if (this.index === 0) {
                this.setTimeLocal(this.aAllImg[this.iLen - 1], '300ms', -this.oWidth);
            } else {
                this.setTimeLocal(this.aAllImg[this.index - 1], '300ms', -this.oWidth);
            }

            // 当前
            this.setTimeLocal(this.aAllImg[this.index], '300ms', 0);
            this.aAllImg[this.index].style.opacity = 1;

            // 下一张, 如果是最后一张时, 指向第一张,无动画时间跳转.
            if (this.index === (this.iLen - 1)) {
                this.setTimeLocal(this.aAllImg[0], '0ms', this.oWidth);
            } else {
                this.setTimeLocal(this.aAllImg[this.index + 1], '0ms', this.oWidth);
            }

            // 清除上一张与当前的动画时间, 如果当前索引为0, 上一张指向最后一张.
            if (this.index === 0) {
                this.removeDuration(this.aAllImg[this.iLen - 1]);
            } else {
                this.removeDuration(this.aAllImg[this.index - 1]);
            }
            this.removeDuration(this.aAllImg[this.index]);

            // 3. 圆点跟随
            if (this.bPagination) {
                for (let i = 0; i < this.iLen; i++) {
                    this.aDots[i].className = '';
                }
                this.aDots[this.index].className = 'swiper-currentIndex';
            }

        }, this.iDuration);
    }

    // 3. 左滑 下一张
    nextPlay() {
        /*
        * 1. dis 小于 -30, 显示下一张, index ++
        * 2. 如果 index > len - 1; index 为 0; 设置相关位置
        * 3. dis > -30, 动画返回原来的位置
        * */
        if (this.iMoveDistance < -30) {
            this.index++;
            if (this.index > this.iLen - 1) {
                this.index = 0;
            }
            console.log('当前索引: ' + this.index);

            // 新的上一张
            if (this.index === 0) {
                this.setTimeLocal(this.aAllImg[this.iLen - 1], '300ms', -this.oWidth);
                this.removeDuration(this.aAllImg[this.iLen - 1]);
            } else {
                this.setTimeLocal(this.aAllImg[this.index - 1], '300ms', -this.oWidth);
                this.removeDuration(this.aAllImg[this.index - 1]);
            }

            // 当前
            this.setTimeLocal(this.aAllImg[this.index], '300ms', 0)
            this.removeDuration(this.aAllImg[this.index]);
            // 新的下一张
            if (this.index === this.iLen - 1) {
                this.setTimeLocal(this.aAllImg[0], '0ms', this.oWidth);
            } else {
                this.setTimeLocal(this.aAllImg[this.index + 1], '0ms', this.oWidth);
            }

        } else {
            if (this.index >= this.iLen - 1) {
                this.setTimeLocal(this.aAllImg[this.index], '300ms', 0);
                this.setTimeLocal(this.aAllImg[0], '300ms', this.oWidth);
            } else {
                this.setTimeLocal(this.aAllImg[this.index], '300ms', 0)
                this.setTimeLocal(this.aAllImg[this.index + 1], '300ms', this.oWidth);
                this.removeDuration(this.aAllImg[this.index]);
                this.removeDuration(this.aAllImg[this.index + 1])
            }
        }
    }

    // 4. 右滑, 上一张
    prePlay() {
        /*
        * 1. dis 大于 30, 显示上一张, index --;
        * 2. 如果 index < 0; index 为 len - 1, 设置相关位置.
        * 3. dis < 30,动画返回原始位置.
        * */
        if (this.iMoveDistance > 0) {
            if (this.iMoveDistance > 30) {
                this.index--;
                // 索引小于 0, 置为最后一个
                if (this.index < 0) {
                    this.index = this.iLen - 1;
                }
                console.log('当前索引: ' + this.index);
                // 新的当前索引为显示图
                this.setTimeLocal(this.aAllImg[this.index], '300ms', 0);
                // 新的上一张闪至左边
                if (this.index > 0) {
                    this.setTimeLocal(this.aAllImg[this.index - 1], '0ms', -this.oWidth);
                    this.aAllImg[this.index - 1].style.opacity = 1;
                }

                // 新的下一张, 滑动至右边,
                // 如果索引为 len - 1, 新的下一张索引为 0,至右边,
                if (this.index === this.iLen - 1) {
                    this.setTimeLocal(this.aAllImg[0], '300ms', this.oWidth);
                    this.removeDuration(this.aAllImg[0]); // 消除动画时间
                } else {
                    this.setTimeLocal(this.aAllImg[this.index + 1], '300ms', this.oWidth);
                    this.removeDuration(this.aAllImg[this.index + 1]); // 消除动画时间
                }
                // 消除动画时间
                this.removeDuration(this.aAllImg[this.index]);
            } else {
                // 动画滑动至原来的位置
                this.setTimeLocal(this.aAllImg[this.index], '300ms', 0);
                this.setTimeLocal(this.aAllImg[this.index - 1], '300ms', -this.oWidth);
                // 消除动画时间
                this.removeDuration(this.aAllImg[this.index]);
                this.removeDuration(this.aAllImg[this.index - 1]);
            }
        }
    }

    // 公共方法, 运动持续时间与/运动距离
    setTimeLocal(element, duration, place) {
        element.style.transitionDuration = duration;
        element.style.transform = `translateX(${place}px)`;
    }

    removeDuration(element) {
        element.addEventListener('transitionend', ev => {
            element.style.transitionDuration = '0ms';
        })
    }
}


let oContainer = document.querySelector('.yybSwiper-container');
let obj = {
    element: oContainer
}
let a = new yybSwiper(obj);
