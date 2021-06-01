import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // vue路由懒加载
  {
    path: '/',
    name: 'home',
    // component: resolve => require(['@/views/home.vue'], resolve)
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
  }
  // webpack路由懒加载
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
