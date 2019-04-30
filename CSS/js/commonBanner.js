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

let len = allImg.length; // 5
let zIndex = 99;
let index = 0;
let oWrap = document.querySelector('.yybSwiper-wrap');
let oWidth = oWrap.offsetWidth;
let previousNode = null;
let currentNode = null;
let nextNode = null;
let timer;
let allPagination = oWrap.querySelectorAll('span');

for (let i = 0; i < len; i++) {
    allImg[i].style.zIndex = zIndex--;
    allImg[i].style.opacity = 0;
}
allImg[index].style.transform = `translateX(0)`; // 初始位置0
allImg[len-1].style.transform = `translateX(${-oWidth}px)`;
allImg[index + 1].style.transform = `translateX(${oWidth}px)`; // 初始+1
allImg[index].style.opacity = 1;
allImg[len - 1].style.opacity = 1;
allImg[index + 1].style.opacity = 1;


nextNode = allImg[index + 1]; // 三个初始值
previousNode = allImg[len - 1];
currentNode = allImg[index];


function showImg() {
    timer = setInterval(() => {
        index++; // 索引++
        allImg[index - 1].style.transitionDuration = "300ms";
        allImg[index - 1].style.transform = `translateX(${-oWidth}px)`; // 上一个移动至左
        previousNode = allImg[index - 1];
        if (index < 5) {
            allImg[index].style.opacity = 1;
            allImg[index].style.transform = `translateX(0)`; // 依次显示
            allImg[index].style.transitionDuration = '300ms';
            currentNode = allImg[index];
        }
        if (index <= 3) { // 倒数第2个
            allImg[index + 1].style.transform = `translateX(${oWidth}px)`;
            nextNode = allImg[index + 1];
        }
        if (index === len - 1) { // 最后一个时
            allImg[0].style.transitionDuration = "0ms";
            allImg[0].style.transform = `translateX(${oWidth}px)`;
            currentNode = allImg[0];
        }
        if (index >= len) { // 最后一个时
            index = 0; // 索引为0
            allImg[index].style.transitionDuration = '300ms';
            allImg[index].style.transform = `translateX(0)`; // 显示
            allImg[index + 1].style.transitionDuration = "0ms";
            allImg[index + 1].style.transform = `translateX(${oWidth}px)`; // 初始
            currentNode = allImg[index];
            nextNode = allImg[index + 1];
        }
        for (let i = 0; i < len;i++) {
            allPagination[i].className = '';
        }
        allPagination[index].className = 'currentIndex';
    }, 2000)
}
showImg();
let startX, endX, currentX;
oWrap.addEventListener('touchstart',(ev) => {
    clearInterval(timer);
    // 清除前后的运动持续时间,滑动时紧随两边
    nextNode.style.transitionDuration = '0ms';
    currentNode.style.transitionDuration='0ms'; // 去除时间
    previousNode.style.transitionDuration = '0ms';
    startX = ev.touches[0].clientX;
},{passive:true})

oWrap.addEventListener('touchmove',(ev) => {
    currentX = ev.touches[0].clientX; // 当前坐标
    currentNode = ev.target.parentNode; // 当前目标节点
    let moveX = currentX - startX; // 移动距离
    if (currentX >= oWidth || currentX <= 0) {
        return;
    }
    currentNode.style.transform=`translateX(${moveX}px)`; // 跟随触摸移动距离
    if (moveX > 0) { // 上一张.右滑
        previousNode.style.transform = `translateX(${-oWidth + moveX}px)`;
    } else { // 下一张.左滑
        nextNode.style.transform = `translateX(${oWidth+moveX}px)`;
    }

},{passive:true})

oWrap.addEventListener('touchend', ev => {
    endX = ev.changedTouches[0].clientX;
    let tempDistance = endX - startX;

    /* 右滑,上一张 */
    if (tempDistance > 30) {
        index--;
        if (index < 0) {
            index = len - 1;
        }
        currentNode.style.transitionDuration = '300ms';
        currentNode.style.transform=`translateX(${oWidth}px)`; // 至右边
        previousNode.style.transitionDuration='300ms';
        previousNode.style.transform=`translateX(0)`;

        currentNode = allImg[index];
        if (index >= len - 1) {
            nextNode = allImg[0];
            previousNode.style.transform = `$translateX(${-oWidth}px)`;
        } else {
            nextNode = allImg[index + 1];
            previousNode.style.opacity = 1;
        }
        // 判断: 索引为第一个时, 上一节点为最后一个
        if (index <= 0) {
            previousNode = allImg[len -1];
            previousNode.style.transitionDuration = '0ms';
            previousNode.style.transform = `translateX(${-oWidth})`;
        } else {
            previousNode = allImg[index - 1];
            previousNode.style.transitionDuration = '0ms';
            previousNode.style.transform = `translateX(${-oWidth})`;
        }

    } else {
        currentNode.style.transitionDuration = '300ms';
        currentNode.style.transform=`translateX(0)`;
        previousNode.style.transitionDuration='300ms';
        previousNode.style.transform = `translateX(${-oWidth}px)`;
    }


    /* 左滑, 下一张 */
    if (tempDistance < -30) {
        index++; // 索引递增
        if (index > len -1) {
            index = 0;
        }
        /*  动画 */
        currentNode.style.transitionDuration = '300ms'; // 开启动画
        currentNode.style.transform=`translateX(${-oWidth}px)`; // 至左边
        nextNode.style.transitionDuration='300ms'; // 下一张开启动画
        nextNode.style.transform = `translateX(0)`; // 进入当前显示

        /* 更新相对节点,上一张/当前/下一张 */
        currentNode = allImg[index]; // 当前页更新为当前索引值
        // 判断: 索引为0, 上一节点为最后一个
       if(index <= 0) {
            previousNode = allImg[len - 1];
       } else {
           previousNode = allImg[index - 1]; // 上一节点
       }

        // 判断: 索引为最后一个时, 下一节点为第一个
        if (index >= len - 1) {
            nextNode = allImg[0];
            nextNode.style.transitionDuration='0ms';
            nextNode.style.transform=`translateX(${oWidth}px)`
        } else {
            nextNode = allImg[index + 1]; // 下一节点
            nextNode.style.transitionDuration='0ms';
            nextNode.style.transform=`translateX(${oWidth}px)`
        }
        nextNode.style.opacity = 1; // 透明度为1

    } else {
        currentNode.style.transitionDuration = '300ms' // 动画返回
        currentNode.style.transform=`translateX(0)`;
        nextNode.style.transitionDuration='300ms'; // 动画返回
        nextNode.style.transform = `translateX(${oWidth}px)`;
    }
    for (let i = 0; i < len;i++) {
        allPagination[i].className = '';
    }

    allPagination[index].className = 'currentIndex';
    showImg();
},{passive: true})

