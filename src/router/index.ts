// src/router/index.ts

import { createRouter, createWebHistory } from '@ionic/vue-router'
import Login from '../views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import InstitutionManagement from '@/views/InstitutionManagement.vue'
import SchoolManagement from '@/views/SchoolManagement.vue'

const routes = [
  {
    path: '/',
    component: Login,
  },

  {
    path: '/home',
    component: Login, 
  },

  {
    path: '/login',
    component: Login, 
  },

  {
    path: '/dashboard',
    component: Dashboard,
  },

  {
    path: '/institutions',
    component: InstitutionManagement,
  },

  {
    path: '/institutions/:id/schools',
    component: SchoolManagement,
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router