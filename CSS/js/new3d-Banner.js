function yybAnimation(ele, target) {
    /* 清除定时器 */
    if (ele.timerId) {
        clearInterval(ele.timerId);
    }
    ele.timerId = setInterval(function () {
        /* 获取当前位置 */
        let current = ele.offsetLeft;
        let step = 30;

        /* 如果当前值大于目标值, step 取反 */
        if (current > target) {
            step = -Math.abs(step);
        }

        /* 判断当前值与目标值的差是否小于 step, 清除定时器 */
        if (Math.abs(current - target) <= Math.abs(step)) {
            ele.style.left = target + 'px';
            clearInterval(ele.timerId);
            return
        }
        current += step;
        ele.style.left = current + 'px';
    }, 20)
}

class yyb3dSwiper {
    constructor(element, time = 4000) {
        /* 1.获取初始数量, clone 前后, 插入节点,实现无缝滚动 */

        // 原图片数量
        let originImgs = element.querySelectorAll('.banner-list li');
        let originLen = originImgs.length;
        // 克隆前后 2 个节点
        let cloneOne = originImgs[0].cloneNode(true);
        let cloneTwo = originImgs[1].cloneNode(true);
        let cloneLastTwo = originImgs[originLen - 2].cloneNode(true);
        let cloneLastOne = originImgs[originLen - 1].cloneNode(true);
        // 原始节点插入新节点
        this.originSwiper = element.querySelector('.banner-list');
        this.originSwiper.insertAdjacentElement('beforeend', cloneOne);
        this.originSwiper.insertAdjacentElement('beforeend', cloneTwo);
        this.originSwiper.insertAdjacentElement('afterbegin', cloneLastOne);
        this.originSwiper.insertAdjacentElement('afterbegin', cloneLastTwo);

        // 新的 swiper
        this.newSwiper = element.querySelectorAll('.banner-list li');
        // banner 节点的数量
        this.newLen = this.newSwiper.length;
        // banner 父级容器
        this.oSwiperWrap = element;
        // 单个 banner 节点的宽度
        this.oWrapWidth = this.oSwiperWrap.offsetWidth;
        // 赋值新的宽度
        this.originSwiper.style.width = this.oWrapWidth * this.newLen + 'px';

        /* 2.初始化 banner 定位, 变量, 定时器等实例属性 */
        this.index = 2; // 初始索引
        this.startX = null; // 触摸开始位置
        this.currentX = null; // 当前位置
        this.endX = null; // 触摸结束位置
        this.isShow = false; // 当前轮播是否运行中
        this.timer = null;
        this.duration = time;
        this.scrollLeft = null; // 当前左值

        /* 3.初始节点显示 */
        this.newSwiper[this.index].className = 'banner-item_current';

        /* 4.轮播 */
        this.showImg();

        /* 5.操作 */
        this.operate();
    }

    showImg() {
        // 定时轮播
        this.timer = setInterval(() => {
            for (let i = 0; i < this.newLen; i++) {
                this.newSwiper[i].className = ''
            }
            // 判断
            if (this.index >= 7) {
                // 当索引为 7, 第 6 张时,瞬间置 index 为 2, 指向开始的第 2 张欺骗性图片
                this.index = 2;
                this.originSwiper.style.left = -this.oWrapWidth + 'px';
            } else {
                this.index++;
            }
            this.newSwiper[this.index].className = 'banner-item_current';
            yybAnimation(this.originSwiper, -this.index * this.oWrapWidth);
        }, this.duration)
    }

    operate() {
        this.oSwiperWrap.addEventListener('touchstart', ev => {
            clearInterval(this.timer);
            // 当前偏移值
            this.scrollLeft = this.originSwiper.offsetLeft;
            this.startX = ev.touches[0].clientX;
        });
        this.oSwiperWrap.addEventListener('touchmove', ev => {
            this.currentX = ev.touches[0].clientX;
            let moveX = this.currentX - this.startX;
            // 设置 banner 的左偏移值
            this.originSwiper.style.left = this.scrollLeft + moveX + 'px';
        });
        this.oSwiperWrap.addEventListener('touchend', ev => {
            // 当前轮播是否运行中, 运行中则退出
            if (this.isShow) return;

            this.isShow = true;
            this.endX = ev.changedTouches[0].clientX;
            let lastX = this.endX - this.startX;
            /* 上一张判定 */
            if (lastX > 30) {
                // 右滑 上一张
                this.previousImg();
            } else {
                yybAnimation(this.originSwiper, -this.index * this.oWrapWidth);
            }

            /*  下一张判定 */
            if (lastX < -30) {
                // 左滑 下一张
                this.nextImg();
            } else {
                yybAnimation(this.originSwiper, -this.index * this.oWrapWidth);
            }
            // 运动结束
            this.isShow = false;
            this.showImg();
        })
    }

    previousImg() {
        this.index--;
        // 初始化时, 索引为 1 时
        if (this.index === 1) {
            this.index = this.newLen - 3;
            this.originSwiper.style.left = -this.oWrapWidth * this.index + 'px';
        } else if (this.index <= 2) { // 索引递减至 2 时
            this.index = this.newLen - 2;
            this.originSwiper.style.left = -this.oWrapWidth * this.index + 'px';
        }
        for (let i = 0; i < this.newLen; i++) {
            this.newSwiper[i].className = ''
        }
        this.newSwiper[this.index].className = 'banner-item_current';
        yybAnimation(this.originSwiper, -this.index * this.oWrapWidth);
    }

    nextImg() {
        this.index++;
        if (this.index >= (this.newLen - 2)) {
            this.index = 2;
            this.originSwiper.style.left = -this.oWrapWidth * this.index + 'px';
        }
        for (let i = 0; i < this.newLen; i++) {
            this.newSwiper[i].className = ''
        }
        this.newSwiper[this.index].className = 'banner-item_current';
        yybAnimation(this.originSwiper, -this.index * this.oWrapWidth);
    }
}

let oBannerWrap = document.querySelector('.banner-wrap');
new yyb3dSwiper(oBannerWrap);
