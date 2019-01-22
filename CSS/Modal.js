// 创建一个立即调用的函数表达式来包装代码
(function () {
    // 定义构造函数
    this.Modal = function () {
        // 创建引用的全局元素
        this.closeButton = null; // 关闭按钮
        this.modal = null; // 模态弹出框
        this.overlay = null; // 模态弹出框蒙层

        // 确定正确的前缀(浏览器私有前缀)
        this.transitionEnd = transitionSelect();

        // 自定义默认选项
        let defaults = {
            className: 'fade-and-drop',
            closeButton: true,
            content: '',
            maxWidth: 600,
            minWidth: 280,
            overlay: true,
            autoOpen: false
        }
        // 通过扩展arguments中传递的缺省值来创建选项
        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendDefaults(defaults, arguments[0])
        }

        // 公用方法

        // 打开模态框
        Modal.prototype.open = function () {
            // 创建Modal
            buildOut.call(this);

            // 初始化事件侦听器
            initializeEvents.call(this)

            // 向DOM中添加元素之后，使用getComputedStyle 强制浏览器重新计算并识别刚刚添加的元素，这样CSS动画就有了一个起点
            window.getComputedStyle(this.modal).height;

            // 检查Modal的高度是否比窗口高，如果是则添加modal-open 和 modal-anchored类名，否则添加modal-open类
            this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? ' modal-open modal-anchored' : ' modal-open')

            this.overlay.className = this.overlay.className + ' modal-open'
        }
        // 关闭模态弹出框
        Modal.prototype.close = function () {
            // 存储this
            let $this = this;

            // 移除打开模态框时添加的类名
            this.modal.className = this.modal.className.replace(' modal-open', '');
            this.overlay.className = this.overlay.className.replace(' modal-open', '');

            // 监听CSS的transitionEnd事件，然后从DOM中删除节点
            this.modal.addEventListener(this.transitionEnd, function () {
                $this.modal.parentNode.removeChild($this.modal)
            })

            this.overlay.addEventListener(this.transitionEnd, function () {
                if ($this.overlay.parentNode) {
                    $this.overlay.parentNode.removeChild($this.overlay)
                }
            })
        }

        // 私有方法
        function buildOut() {
            var content, contentHolder, docFrag;

            // 如果内容是 HTML 字符串，则追加 HTML字符串；
            // 如果内容是domNode,则追加其内容
            if (typeof this.options.content === 'string') {
                content = this.options.content;
            } else {
                content = this.options.content.innerHTML;
            }

            // 创建一个 DocumentFragment
            docFrag = document.createDocumentFragment();

            // 创建modal元素
            this.modal = document.createElement('div');
            // 设置模态框元素的类名
            this.modal.className = 'modal ' + this.options.className;
            // 设置模态框样式（尺寸）
            this.modal.style.minWidth = this.options.minWidth + 'px';
            this.modal.style.maxWidth = this.options.maxWidth + 'px';

            // 如果closeButton的值为true, 添加close 按钮
            if (this.options.closeButton === true) {
                this.closeButton = document.createElement('button')
                this.closeButton.className = 'modal-close close-button'
                this.closeButton.innerHTML = '×';
                this.modal.appendChild(this.closeButton)
            }

            // 如果overlay的值为true,添加蒙层
            if (this.options.overlay === true) {
                this.overlay = document.createElement('div')
                this.overlay.className = 'modal-overlay ' + this.options.className
                docFrag.appendChild(this.overlay)
            }

            // 创建模态框内容区域，并添加到modal中
            contentHolder = document.createElement('div')
            contentHolder.className = 'modal-content'
            contentHolder.innerHTML = content
            this.modal.appendChild(contentHolder);

            // 把modal插到DocumentFragment中
            docFrag.appendChild(this.modal)

            //  把DocumentFragment插到body中
            document.body.appendChild(docFrag)
        }
        // 使用用户选项扩展默认值的方法
        function extendDefaults(source, properties) {
            let property = null;
            for ( property in properties) {
                if (properties.hasOwnProperty(property)) { // 存在实例中才添加
                    source[property] = properties[property]
                }
            }
            return source;
        }

        //  初始化事件监听器
        function initializeEvents() {
            // 给关闭按钮添加click事件，点击关闭模态框
            if (this.closeButton) {
                this.closeButton.addEventListener('click', this.close.bind(this));
            }

            // 给蒙层添加click事件，点击关闭模态框
            if (this.overlay) {
                this.overlay.addEventListener('click', this.close.bind(this));
            }
        }

        // 选择正确的浏览器私有前缀
        function transitionSelect() {
            let el = document.createElement('div');
            if (el.style.WebkitTransition) {
                return 'webkitTransitionEnd'
            }
            return 'transitionend'
        }
    }
})();
let myModal = new Modal({
    className: 'custom-animation',
    content: `<p>I am Modal</p>`,
    maxWidth: 610,
});
myModal.open();