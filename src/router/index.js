import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homeview.vue'
import list from '@/views/list.vue'
import order from '@/views/order.vue'
import state from '@/views/state.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/order',
      name:'order',
      component:order
    },
    {
      path: '/list',
      name:'list',
      component:list
    },
    {
      path:'/state',
      name:'state',
      component:state
    }
  ]
})

export default router
