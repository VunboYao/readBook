import user from "../components/user"
import SideBar from '../components/sidebar.vue'
import subUser from '../components/subUser.vue'
import Common from '../components/common.vue'
let router = {
  path: '/user',
  name: 'user',
  components: {
    sidebar: SideBar,
    main: user
  },
  children: [{
    path: 'subUser',
    name: 'subUser',
    component: subUser
  }, {
    path: 'foobar/:id/name/:name',
    name: 'Common',
    component: Common,
    props: true
  }]
}
export default router
