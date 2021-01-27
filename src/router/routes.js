import router from './'
import store from '../store'
import middleware from '@/middleware'
import * as meta from './meta'

const adminGate = async (to, from) => {
    await middleware.admin((res) => { 
        if (res === false)  {
          return router.push({
              path: '/login', 
              query: { redirect: 'forbidden' } 
          })
        } 
        else if (res === true) {
           store.commit('SET_APP_READY', true)
        }
        else if(res === 'retry') {
           store.commit('SET_APP_READY', false)
        }
    })
}

const routes = [

    /*
	|----------------------------------------------------
	| Authentication Route
	|----------------------------------------------------
	*/

    {
        path: '/',
        alias: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue')
    },


    /*
	|----------------------------------------------------
	| Admin General route
	|----------------------------------------------------
	*/

    {
        path: '/admin/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "admin-home" */ '@/views/admin/Home.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },


	/*
	|----------------------------------------------------
	| Admin Students route
	|----------------------------------------------------
	*/

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



    /*
	|----------------------------------------------------
	| Admin Guardians route
	|----------------------------------------------------
	*/

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



    /*
	|----------------------------------------------------
	| Admin Staffs route
	|----------------------------------------------------
	*/

    {
        path: '/admin/staffs',
        name: 'StaffList',
        props: route => ({ query: route.query.page }),
        component: () => import(/* webpackChunkName: "admin-staffs" */ '@/views/admin/staffs/StaffList.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/admin/staffs/profile/:staffId',
        name: 'StaffProfile',
        component: () => import(/* webpackChunkName: "admin-staff-profile" */ '@/views/admin/staffs/StaffProfile.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/admin/staffs/add',
        name: 'AddStaff',
        component: () => import(/* webpackChunkName: "admin-guardian-add" */ '@/views/admin/staffs/AddStaff.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },



    /*
	|----------------------------------------------------
	| Admin Fees route
	|----------------------------------------------------
	*/

    {
        path: '/admin/fees',
        name: 'FeesList',
        component: () => import(/* webpackChunkName: "fees-admin" */ '@/views/admin/fees/FeesList.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/admin/fees/:feeId/info',
        name: 'FeeInfo',
        component: () => import(/* webpackChunkName: "admin-Feeinfo" */ '@/views/admin/fees/FeeInfo.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },



    /*
	|----------------------------------------------------
	| Admin subjects route
	|----------------------------------------------------
	*/

    {
        path: '/admin/subjects',
        name: 'Subjects',
        component: () => import(/* webpackChunkName: "subject-admin" */ '@/views/admin/Subjects.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },


    /*
	|----------------------------------------------------
	| Admin unnamed route: wiill be named later
	|----------------------------------------------------
	*/

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
        component: () => import(/* webpackChunkName: "admin-timetable" */ '@/views/admin/Timetable.vue'),
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



    /*
    |----------------------------------------------------
    | Additional Route
    |----------------------------------------------------
    */

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