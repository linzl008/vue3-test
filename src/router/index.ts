import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login/login.vue'
import Error from '../views/error/error.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
