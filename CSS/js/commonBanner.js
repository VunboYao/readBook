/*
class yybSwiper {
    constructor(obj) {
        this.originContainer = obj.element;

        // 初始化
    }
}
let obj = {
    element: document.querySelector('.yybSwiper-container'),
    duration: 3000,
    pagination: true
}

function yybAnimation(ele, target) {
    /!* 清除定时器 *!/
    if (ele.timerId) {
        clearInterval(ele.timerId);
    }
    ele.timerId = setInterval(function () {
        /!* 获取当前位置 *!/
        let current = ele.offsetLeft;
        let step = 30;

        /!* 如果当前值大于目标值, step 取反 *!/
        if (current > target) {
            step = -Math.abs(step);
        }

        /!* 判断当前值与目标值的差是否小于 step, 清除定时器 *!/
        if (Math.abs(current - target) <= Math.abs(step)) {
            ele.style.left = target + 'px';
            clearInterval(ele.timerId);
            return
        }
        current += step;
        ele.style.left = current + 'px';
    }, 20)
}*/

let allImg = document.querySelectorAll('.yybSwiper-item');

let len = allImg.length;
let zIndex = 99;
let index = 1;
let oWrap = document.querySelector('.yybSwiper-wrap');
let oWidth = oWrap.offsetWidth;
for (let i = 0; i < len; i++) {
    allImg[i].style.zIndex = zIndex--;
    // allImg[i].style.transform = "translateX(-100px)";
    allImg[i].style.transform = "translateX(-100px)";
}