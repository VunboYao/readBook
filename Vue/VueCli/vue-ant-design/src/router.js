import Vue from "vue";
import Router from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
      children: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/About.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/Register.vue")
        }
      ]
    }
  ]
});

router.beforeEach((to,from, next)=> {
  NProgress.start();
  next();
})

router.afterEach(() => {
  NProgress.done();
})

export default router;
