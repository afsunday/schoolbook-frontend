import auth from '@/middleware/auth'

async function adminMiddware (to, from) {
  await auth.admin((res, type) => {
    if (res === true) {
        return true
    } else {
      next({ path: '/login', query: { redirect: 'forbidden' } })
    }
  })
}

const adminMeta = {
    requiresAuth: true, 
    adminAuth: true, 
    staffAuth: false, 
    guardianAuth: false, 
    studentAuth: false
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
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/students',
    name: 'StudentList',
    props: route => ({ query: route.query.page }),
    component: () => import(/* webpackChunkName: "admin-students" */ '@/views/admin/students/StudentList.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/students/profile/:studentId',
    name: 'StudentProfile',
    component: () => import(/* webpackChunkName: "admin-student-view" */ '@/views/admin/students/StudentProfile.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/students/add',
    name: 'AddStudent',
    component: () => import(/* webpackChunkName: "admin-student-view" */ '@/views/admin/students/AddStudent.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/guardians',
    name: 'GuardianList',
    props: route => ({ query: route.query.page }),
    component: () => import(/* webpackChunkName: "admin-guardians" */ '@/views/admin/guardians/GuardianList.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/guardians/profile/:guardianId',
    name: 'GuardianProfile',
    component: () => import(/* webpackChunkName: "admin-student-view" */ '@/views/admin/guardians/GuardianProfile.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/guardians/edit/:guardianId',
    name: 'EditGuardian',
    component: () => import(/* webpackChunkName: "admin-guardian-edit" */ '@/views/admin/guardians/EditGuardian.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/guardians/add',
    name: 'AddGuardian',
    component: () => import(/* webpackChunkName: "admin-guardian-add" */ '@/views/admin/guardians/AddGuardian.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/staffs',
    name: 'Staffs',
    component: () => import(/* webpackChunkName: "admin-staffs" */ '@/views/admin/Staffs.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/subjects',
    name: 'Subjects',
    component: () => import(/* webpackChunkName: "subject-admin" */ '@/views/admin/Subjects.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/class',
    name: 'Class',
    component: () => import(/* webpackChunkName: "admin-class" */ '@/views/admin/Class.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/timetable',
    name: 'Timetable',
    component: () => import(/* webpackChunkName: "admin-admin" */ '@/views/admin/Timetable.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/mail',
    name: 'Mail',
    component: () => import(/* webpackChunkName: "mail-admin" */ '@/views/admin/Mail.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
  },

  {
    path: '/admin/fees',
    name: 'Fees',
    component: () => import(/* webpackChunkName: "fees-admin" */ '@/views/admin/Fees.vue'),
    beforeEnter: adminMiddware,
    meta: adminMeta
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
