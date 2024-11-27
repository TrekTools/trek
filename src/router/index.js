import { createRouter, createWebHistory } from 'vue-router'
import TrekHome from '../components/TrekHome.vue'
import AboutTrek from '@/views/AboutTrek.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TrekHome
  },
  {
    path: '/about-trek',
    name: 'AboutTrek',
    component: AboutTrek
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 