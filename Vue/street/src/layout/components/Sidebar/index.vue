<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'isAdmin'
    ]),
    routes() {
      const route = this.$router.options.routes
      console.log(route)
      if (this.isAdmin) {
        const newArr = []
        route.forEach(item => {
          if (item.name === 'user') {
            item.children[5]['meta']['title'] = '员额使用审批'
            item.children[5]['children'][0]['children'].splice(0, 1)
            item.children[5]['children'][1]['children'].splice(0, 1)
          }
          newArr.push(item)
        })
        return newArr
      } else {
        const newArr = []
        route.forEach(item => {
          if (item.name === 'user') {
            item.children[5]['meta']['title'] = '员额使用申请'
          }
          if (!item.isAdmin) {
            newArr.push(item)
          }
        })
        // return this.$router.options.routes.slice(0, 5)
        return newArr
      }
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
