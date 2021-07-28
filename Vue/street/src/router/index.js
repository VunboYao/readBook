import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* 三级路由部分的公共组件模块*/
import tree from '@/layout/tree.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'index' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'index' },
        hidden: true
      },
      {
        path: 'changePwd',
        name: 'ChangePwd',
        component: () => import ('@/views/dashboard/changePwd'),
        meta: { title: '密码修改' },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/add',
    name: 'user',
    meta: { title: '社区工作者管理', icon: 'user' },
    children: [
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/user/add'),
        meta: { title: '社区工作者新增', icon: '' },
        hidden: true
      },
      {
        path: 'remove',
        name: 'remove',
        redirect: '/user/add',
        component: () => import('@/views/user/remove'),
        meta: { title: '社区工作者解聘', icon: '' },
        hidden: true
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/user/edit'),
        meta: { title: '社区工作者调岗', icon: '' },
        hidden: true
      },
      {
        path: 'editing',
        name: 'editing',
        component: tree,
        meta: { title: '实名制系统维护', icon: '' },
        children: [
          {
            path: 'current',
            name: 'Current',
            component: () => import('@/views/statistics/editing'),
            meta: { title: '当前在岗人员' }
          },
          {
            path: 'history',
            name: 'History',
            component: () => import('@/views/statistics/oldWork'),
            meta: { title: '历史退出人员' }
          }
        ]
      },
      {
        path: 'adjustment',
        component: tree,
        redirect: '/user/adjustment/addadjustment',
        name: 'adjustment',
        meta: { title: '岗位调整审批/备案', icon: '' },
        children: [
          {
            path: 'addadjustment',
            name: 'addadjustment',
            component: () => import('@/views/adjustment/addadjustment'),
            meta: { title: '新增审批/备案', icon: '' }
          },
          {
            path: 'reviewrecord',
            name: 'reviewrecord',
            component: () => import('@/views/adjustment/reviewrecord'),
            meta: { title: '审核中审批/备案', icon: '' }
          },
          {
            path: 'historyfiling',
            name: 'historyfiling',
            component: () => import('@/views/adjustment/historyfiling'),
            meta: { title: '历史办结审批/备案', icon: '' }
          }
        ]
      },
      {
        path: 'editor',
        component: tree,
        redirect: '/user/editor/addeditor',
        name: 'editor',
        meta: { title: '额度使用审批', icon: '' },
        children: [
          {
            path: 'year',
            component: tree,
            name: 'Year',
            meta: { title: '年度', icon: '' },
            children: [
              {
                path: 'addeditor',
                name: 'Addeditor',
                component: () => import('@/views/editor/addeditor'),
                meta: { title: '新增', icon: '', isAdminShow: true }
              },
              {
                path: 'selectauditeditor',
                name: 'selectauditeditor',
                component: () => import('@/views/editor/selectauditeditor'),
                meta: { title: '审核中', icon: '' }
              },
              {
                path: 'selecthandleedit',
                name: 'selecthandleedit',
                component: () => import('@/views/editor/selecthandleedit'),
                meta: { title: '已处理的', icon: '' }
              }
            ]
          },
          {
            path: 'day',
            component: tree,
            name: 'Day',
            meta: { title: '日常', icon: '' },
            children: [
              {
                path: 'new',
                name: 'New',
                component: () => import('@/views/editor/day'),
                meta: { title: '新增', icon: '', isAdminShow: true }
              },
              {
                path: 'selectauditeditor',
                name: 'selectauditeditor',
                component: () => import('@/views/editor/day'),
                meta: { title: '审核中', icon: '' }
              },
              {
                path: 'selecthandleedit',
                name: 'selecthandleedit',
                component: () => import('@/views/editor/day'),
                meta: { title: '已处理的', icon: '' }
              }
            ]
          },
          {
            path: 'auditeditor',
            name: 'auditeditor',
            component: () => import('@/views/editor/auditeditor'),
            meta: { title: '审核中', icon: '' },
            hidden: true
          },
          {
            path: 'handleedit',
            name: 'handleedit',
            component: () => import('@/views/editor/handleedit'),
            meta: { title: '已处理的', icon: '' },
            hidden: true
          },
          {
            path: 'addpeople',
            name: 'addpeople',
            component: () => import('@/views/editor/addpeople'),
            meta: { title: '添加人员', icon: '' },
            hidden: true
          }
        ]
      }
    ]
  },

  {
    path: '/postmanagement',
    component: Layout,
    redirect: '/postmanagement/index',
    name: 'postmanagement',
    meta: { title: '编制基数管理', icon: 'postmanagement' },
    isAdmin: true,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/postmanagement/index'),
        meta: { title: '编制基数管理', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/set',
    component: Layout,
    redirect: '/set/postmanagement',
    name: 'set',
    meta: { title: '岗位类别管理', icon: 'set' },
    isAdmin: true,
    children: [
      {
        path: 'postmanagement',
        name: 'postmanagement',
        component: () => import('@/views/set/postmanagement'),
        meta: { title: '岗位类别管理', icon: '' },
        hidden: true
      },
      {
        path: 'street',
        name: 'street',
        component: () => import('@/views/set/street'),
        meta: { title: '街道信息配置', icon: '' },
        hidden: true
      },
      {
        path: 'mymessage',
        component: () => import('@/views/set/mymessage'),
        name: 'message',
        meta: { title: '我的消息', icon: '' },
        hidden: true
      },
      {
        path: '/somemessage',
        component: () => import('@/views/set/messagesome'),
        hidden: true
      }
    ]
  },
  // 额度使用汇总
  {
    path: '/total',
    name: 'Total',
    meta: { title: '额度使用汇总', icon: 'statistics', isAdmin: true },
    component: Layout,
    isAdmin: false,
    children: [
      {
        path: '/statistical-table',
        name: 'StatisticalTable',
        component: () => import('@/views/quotaUseTotal/statisticalTable'),
        meta: { title: '员额统计表' }
      },
      {
        path: '/detail-table',
        name: 'DetailTable',
        component: () => import('@/views/quotaUseTotal/detailTable'),
        meta: { title: '额度明细表' }
      },
      {
        path: '/brief-table',
        name: 'BriefTable',
        component: () => import('@/views/quotaUseTotal/briefTable'),
        meta: { title: '招考简章汇总表' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/editing',
    name: 'statistics',
    meta: { title: '统计', icon: 'statistics' },
    isAdmin: true,
    children: [
      {
        path: 'districtlevel',
        name: 'districtlevel',
        component: () => import('@/views/statistics/districtlevel'),
        meta: { title: '区级部门下派', icon: '' },
        hidden: true
      },
      {
        path: 'street',
        name: 'street',
        component: () => import('@/views/statistics/street'),
        meta: { title: '街道自聘', icon: '' },
        hidden: true
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
