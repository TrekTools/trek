import { createRouter, createWebHistory } from 'vue-router'
import TrekHome from '../components/TrekHome.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TrekHome
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 