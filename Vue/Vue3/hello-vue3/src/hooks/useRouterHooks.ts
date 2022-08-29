import { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate, useLink, RouterLink } from "vue-router"
import { useQueryStore } from "@/store/useQueryStore"
import { storeToRefs } from "pinia"
export const useRouterHooks = () => {
  let query = storeToRefs(useQueryStore())
  // 组件内：离开前
  /*   onBeforeRouteLeave((to, from) => {
    console.log('to :>> ', to)
    console.log('from :>> ', from)
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    // 取消导航并停留在同一页面上
    if (!answer) {
      return false
    }
  }) */
  const router = useRouter()
  // 全局前置守卫：离开前
  /*   router.beforeEach((to, from) => {
    console.log('to :>> ', to)
    console.log('from :>> ', from)
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    // 取消导航并停留在同一页面上
    if (!answer) {
      return false
    }
  }) */

  /*
router.beforeResolve 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。
  */
  router.beforeResolve((to, from) => {
    // console.log('from :>> ', from)
    /*const answer = window.confirm('Do you really want to go')
    // 取消导航并停留在同一页面上
    if (!answer) {
      return false
    }*/
    query.from.value = from.name as string
  })

  /*
  全局后置钩子：对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
   */
  router.afterEach((to, from, failure) => {
    // console.log('from:>>>', from)
    // console.log('进入了目标页面')
    // console.log(failure)
  })
}
