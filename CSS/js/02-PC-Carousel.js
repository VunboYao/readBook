class yybPcCarousel {
  constructor(obj) {
    // 0. 数据初始化
    this.el = document.querySelector(obj.el);
    this.interval = Number(obj.interval) || 4000;
    this.pagination = !!obj.pagination || false
    this.oDots = this.el.querySelector('.dots');

    this.animate = false;

    // 焦点显示
    if (this.pagination) {
      this.oDots.style.display = 'block';
    }

    // 1. 获取轮播基础数据
    this.allImg = this.el.querySelectorAll('.carousel-wrap > .yyb-swiper');
    this.allDots = this.el.querySelectorAll('.dots > li'); // 所有焦点
    this.len = this.allImg.length;
    this.index = 0;
    this.timer = null;

    // 2. 开启动画
    this._showBanner();

    // 3. 清除动画
    this.el.addEventListener('mouseover', () => {
      clearInterval(this.timer);
    })

    // 4. 重新开启
    this.el.addEventListener('mouseleave', () => {

      // 边界处理
      this.index = ++this.index > (this.len - 1) ? 0 : this.index;
      // 1. 切换动画
      this._changeImg(this.index);

      // 2. 焦点
      if (this.pagination) {
        this._pagination(this.index);
      }
      /* 划出后强制刷新下一张，并重新开始定时器 */
      this._showBanner();
    })
  }

  // 0. 轮播动画
  _showBanner() {
    this.timer = setInterval(() => {
      // 0. 边界处理
      this.index = ++this.index > (this.len - 1) ? 0 : this.index;

      // 1. 切换动画
      this._changeImg(this.index);

      // 2. 焦点
      if (this.pagination) {
        this._pagination(this.index);
      }
    }, this.interval);
  }

  // 1. 图片轮播
  _changeImg(index) {
    for (let i = 0; i < this.len; i++) {
      this.allImg[i].style.opacity = 0;
    }
    this.allImg[index].style.opacity = 1;
  }

  // 2. 焦点
  _pagination(index) {
    for (let i = 0; i < this.len; i++) {
      this.allDots[i].classList.remove('active');
    }
    this.allDots[index].classList.add('active');
  }
}


new yybPcCarousel({
  el: '.container',
  interval: 5000,
  pagination: true,
})
