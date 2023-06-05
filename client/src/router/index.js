import { createRouter, createWebHistory } from 'vue-router'

import Clocking from '@/views/Clocking.vue'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    component: Clocking,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    component: Login,
  },
]

const router_config = {
  history: createWebHistory(),
  routes,
}

export default createRouter(router_config)
