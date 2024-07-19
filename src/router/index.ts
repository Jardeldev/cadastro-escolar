// src/router/index.ts

import { createRouter, createWebHistory } from '@ionic/vue-router'
import Login from '../views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import InstitutionManagement from '@/views/InstitutionManagement.vue'
import SchoolManagement from '@/views/SchoolManagement.vue'
import SeriesManagement from '@/views/SeriesManagement.vue'
import TurmaManagement from '@/views/TurmaManagement.vue'
import ClassManagement from '@/views/ClassManagement.vue'
import Institution from '@/views/Institution.vue'
import School from '@/views/School.vue'

const routes = [
  {
    path: '/',
    component: Login,
  },

  {
    path: '/dashboard',
    component: Dashboard,
  },

  {
    path: '/instituicoes',
    component: InstitutionManagement,
  },

  {
    path: '/instituicoes/lista',
    component: Institution,
  },

  {
    path: '/escolas',
    component: SchoolManagement,
  },

  {
    path: '/escolas/lista',
    component: School,
  },

  {
    path: '/series',
    component: SeriesManagement,
  },

  {
    path: '/classes',
    component: ClassManagement,
  },

  {
    path: '/turmas',
    component: TurmaManagement,
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
