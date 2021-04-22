import Loading from './loading.vue'; // 引入模板文件

// Vue组件插件开发方式

/*
* 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。
* 如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
  该方法需要在调用 new Vue() 之前被调用。
  当 install 方法被同一个插件多次调用，插件将只会被安装一次。
*
* */

/*
引用方式：
main.js入口文件：
import Loading from './plugin/loading/index';
Vue.use(Loading, {
  title: '皇帝不急太监急'
})
* */
export default {
  // Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
  install: function(Vue, options) {
    // 1.根据组件生成一个构造函数
    let LoadingConstructor = Vue.extend(Loading)
    // 2.根据构造函数创建实例对象
    let LoadingInstance = new LoadingConstructor()
    // 3.创建一个容器
    let oDiv = document.createElement('div')
    // 4.添加到body上
    document.body.appendChild(oDiv)
    // 5.将实例对象挂载到容器上
    LoadingInstance.$mount(oDiv)

    // 添加初始化值
    if (options && !!options.title) {
      LoadingInstance.msg = options.title
    }

    // 添加全局方法
    Vue.showLoading = function() {
      LoadingInstance.show = true
    }
    Vue.closeLoading = function() {
      LoadingInstance.show = false
    }

    // 添加实例方法
    Vue.prototype.$showLoading = () => {
      LoadingInstance.show = true
    }
    Vue.prototype.$closeLoading = () => {
      LoadingInstance.show = false
    }
  }
}
