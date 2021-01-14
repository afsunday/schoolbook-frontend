import router from './'
import middleware from '@/middleware'
import * as meta from './meta'

const adminGate = async (to, from) => {
    await middleware.admin((res) => { 
        if (!res) 
        return router.push({
            path: '/login', 
            query: { redirect: 'forbidden' } 
        }) 
    })
}

const routes = [
  {

    path: '/',
    alias: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue')
  },

  {
    path: '/admin/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "admin-home" */ '@/views/admin/Home.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  // admin students route

  {
    path: '/admin/students',
    name: 'StudentList',
    props: route => ({ query: route.query.page }),
    component: () => import(/* webpackChunkName: "admin-students" */ '@/views/admin/students/StudentList.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/students/profile/:studentId',
    name: 'StudentProfile',
    component: () => import(/* webpackChunkName: "admin-student-view" */ '@/views/admin/students/StudentProfile.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/students/edit/:studentId',
    name: 'EditStudent',
    component: () => import(/* webpackChunkName: "admin-student-edit" */ '@/views/admin/students/EditStudent.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/students/add',
    name: 'AddStudent',
    component: () => import(/* webpackChunkName: "admin-student-view" */ '@/views/admin/students/AddStudent.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  // admin guardians route
  {
    path: '/admin/guardians',
    name: 'GuardianList',
    props: route => ({ query: route.query.page }),
    component: () => import(/* webpackChunkName: "admin-guardians" */ '@/views/admin/guardians/GuardianList.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/guardians/profile/:guardianId',
    name: 'GuardianProfile',
    component: () => import(/* webpackChunkName: "admin-student-view" */ '@/views/admin/guardians/GuardianProfile.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/guardians/edit/:guardianId',
    name: 'EditGuardian',
    component: () => import(/* webpackChunkName: "admin-guardian-edit" */ '@/views/admin/guardians/EditGuardian.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/guardians/add',
    name: 'AddGuardian',
    component: () => import(/* webpackChunkName: "admin-guardian-add" */ '@/views/admin/guardians/AddGuardian.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  // admin staff route
  {
    path: '/admin/staffs',
    name: 'StaffList',
    props: route => ({ query: route.query.page }),
    component: () => import(/* webpackChunkName: "admin-staffs" */ '@/views/admin/staffs/StaffList.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/subjects',
    name: 'Subjects',
    component: () => import(/* webpackChunkName: "subject-admin" */ '@/views/admin/Subjects.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/class',
    name: 'Class',
    component: () => import(/* webpackChunkName: "admin-class" */ '@/views/admin/Class.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/timetable',
    name: 'Timetable',
    component: () => import(/* webpackChunkName: "admin-admin" */ '@/views/admin/Timetable.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/mail',
    name: 'Mail',
    component: () => import(/* webpackChunkName: "mail-admin" */ '@/views/admin/Mail.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/admin/fees',
    name: 'Fees',
    component: () => import(/* webpackChunkName: "fees-admin" */ '@/views/admin/Fees.vue'),
    beforeEnter: adminGate,
    meta: meta.admin
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/errors/NotFound.vue')
  },

  {
    path: '/403',
    name: 'forbidden',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/errors/403.vue')
  }
]

export default routes
