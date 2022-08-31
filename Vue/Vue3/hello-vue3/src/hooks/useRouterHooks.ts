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

/*
页面名称、事件名称，事件，事件名称
前端实现方案：每一个前端页面的构建，对应了一个json配置项，可传入与当前页面相关的**固定**属性。
包含当前页面名称、谁可以访问当前页面，事件名称，页面所属业务场景等，页面切换过程中，能够获取此配置，实现对应业务功能。
主要定义一些与当前页面固定关联的属性。
*/
