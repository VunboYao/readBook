import Loading from './loading.vue';
export default {
  install: function(Vue, options) {
    Vue.component(Loading.name, Loading)

    // 1.根据组件生成一个构造函数
    let LoadingConstructor = Vue.extend(Loading)

    // 2.根据构造函数创建实例对象
    let LoadingInstance = new LoadingConstructor()
    console.log(LoadingInstance);

    // 3.创建一个容器
    let oDiv = document.createElement('div')

    // 4.添加到body上
    document.body.appendChild(oDiv)

    // 5.将实例对象挂载到容器上
    LoadingInstance.$mount(oDiv)

    console.log(options);
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