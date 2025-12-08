import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index.vue'

Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
