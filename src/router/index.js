import { createRouter, createWebHistory } from 'vue-router'
import TrekHome from '../components/TrekHome.vue'
import AboutTrek from '@/components/AboutTrek.vue'
import WarpWednesdays from '@/components/WarpWednesdays.vue'

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
  },
  {
    path: '/warp-wednesdays',
    name: 'WarpWednesdays',
    component: WarpWednesdays
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 