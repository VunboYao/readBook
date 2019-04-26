function yybAnimation(ele,target) {
    /* 清除定时器 */
    if (ele.timerId) {
        clearInterval(ele.timerId);
    }
    ele.timerId = setInterval(function() {
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

// 所有图片
let allImages = document.querySelectorAll('.banner-list li');
// 数量
let len = allImages.length;
// 宽度
let oWrapWidth = document.querySelector('.banner-wrap').offsetWidth;
// 列表
let oBannerList = document.querySelector('.banner-list');
// 当前左边滚动距离
let oScrollLeft;
let index = 2;
let oBannerWrap = document.querySelector('.banner-wrap');
let startX, currentX, endX;
let nowTimer = null;

function showImg() {
    nowTimer = setInterval(() => {
        for (let i = 0; i < len; i++) {
            allImages[i].className = ''
        }
        if (index >= 7) {
            index = 2;
            oBannerList.style.left = -oWrapWidth + 'px';
            allImages[2].className = 'banner-item_current';
        } else {
            index++
        }
        allImages[index].className = 'banner-item_current';
        yybAnimation(oBannerList, -index * oWrapWidth);
    },3000)
}
showImg();

oBannerWrap.addEventListener('touchstart',function (ev) {
    clearInterval(nowTimer);
    oScrollLeft = oBannerList.offsetLeft;
    startX = ev.touches[0].clientX;
})
oBannerWrap.addEventListener('touchmove',function (ev) {
    currentX = ev.touches[0].clientX;
    let moveX = currentX - startX;
    oBannerList.style.left = oScrollLeft + moveX + 'px';
})
oBannerWrap.addEventListener('touchend',function (ev) {
    endX = ev.changedTouches[0].clientX;
    let lastX = endX - startX;
    if (lastX > 30) {
        index--;
        console.log(index);
        if (index <= 2) {
            index = 8;
            oBannerList.style.left = -oWrapWidth * 8 + 'px';
            allImages[8].className = 'banner-item_current';
        }
        yybAnimation(oBannerList, -index * oWrapWidth);
        for (let i = 0; i < len; i++) {
            allImages[i].className = ''
        }
        allImages[index].className = 'banner-item_current';
    } else {
        yybAnimation(oBannerList, -index * oWrapWidth);
    }
    if (lastX < -30) {
        index++;
        if (index >= 8) {
            index = 2;
            oBannerList.style.left = -oWrapWidth + 'px';
            allImages[2].className = 'banner-item_current';
        }
        yybAnimation(oBannerList, -index * oWrapWidth);
        for (let i = 0; i < len; i++) {
            allImages[i].className = ''
        }
        allImages[index].className = 'banner-item_current';
    }
    showImg();
})










