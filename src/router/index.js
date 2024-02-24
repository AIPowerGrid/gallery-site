import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Collection from '@/views/Collection.vue'
import Trending from '@/views/Trending.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/collections/:name',
    component: Collection,
  },
  {
    path: '/trending',
    component: Trending,
  }
]

/* start inject */

/* end inject */

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router
