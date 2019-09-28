import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
// process.env.BASE_URL
export default new Router({
  mode: 'history',
  base: 'wechat',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/details',
      name: 'details',
      component: () => import(/* webpackChunkName: "details" */ './views/Details/details.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "details" */ './views/register/index.vue'),
    },
    {
      path: '/trail',
      name: 'trail',
      component: () => import(/* webpackChunkName: "details" */ './views/trail/index.vue'),
    },
    {
      path: '/invite',
      name: 'invite',
      component: () => import(/* webpackChunkName: "details" */ './views/register/invite.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

