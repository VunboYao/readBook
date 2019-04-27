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

