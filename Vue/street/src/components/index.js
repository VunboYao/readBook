import ineechart from './ineechart/index'
import commonTable from './commonTable/index'
export default {
    install(Vue) {
        Vue.component('ineechart', ineechart);
        Vue.component('commonTable', commonTable);
    }
}