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
        path: '/m/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "admin-home" */ '@/views/admin/dashboard/Home.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },


	/*
	|----------------------------------------------------
	| Admin Students route
	|----------------------------------------------------
	*/

    {
        path: '/m/students',
        name: 'StudentList',
        props: route => ({ query: route.query.page }),
        component: () => import(/* webpackChunkName: "admin-students" */ '@/views/admin//students/StudentList.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/students/:studentId/profile',
        name: 'StudentProfile',
        component: () => import(/* webpackChunkName: "admin-student-view" */ '@/views/admin//students/StudentProfile.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/students/:studentId/edit',
        name: 'EditStudent',
        component: () => import(/* webpackChunkName: "admin-student-edit" */ '@/views/admin//students/EditStudent.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/students/add',
        name: 'AddStudent',
        component: () => import(/* webpackChunkName: "admin-student-view" */ '@/views/admin//students/AddStudent.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },



    /*
	|----------------------------------------------------
	| Admin Guardians route
	|----------------------------------------------------
	*/

    {
        path: '/m/guardians',
        name: 'GuardianList',
        props: route => ({ query: route.query.page }),
        component: () => import(/* webpackChunkName: "admin-guardians" */ '@/views/admin//guardians/GuardianList.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/guardians/:guardianId/profile',
        name: 'GuardianProfile',
        component: () => import(/* webpackChunkName: "admin-student-view" */ '@/views/admin//guardians/GuardianProfile.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/guardians/:guardianId/edit',
        name: 'EditGuardian',
        component: () => import(/* webpackChunkName: "admin-guardian-edit" */ '@/views/admin//guardians/EditGuardian.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/guardians/add',
        name: 'AddGuardian',
        component: () => import(/* webpackChunkName: "admin-guardian-add" */ '@/views/admin//guardians/AddGuardian.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },



    /*
	|----------------------------------------------------
	| Admin Staffs route
	|----------------------------------------------------
	*/

    {
        path: '/m/staffs',
        name: 'StaffList',
        props: route => ({ query: route.query.page }),
        component: () => import(/* webpackChunkName: "admin-staffs" */ '@/views/admin//staffs/StaffList.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/staffs/:staffId/profile',
        name: 'StaffProfile',
        component: () => import(/* webpackChunkName: "admin-staff-profile" */ '@/views/admin//staffs/StaffProfile.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/staffs/:staffId/edit',
        name: 'EditStaff',
        component: () => import(/* webpackChunkName: "admin-guardian-edit" */ '@/views/admin//staffs/EditStaff.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/staffs/add',
        name: 'AddStaff',
        component: () => import(/* webpackChunkName: "admin-guardian-add" */ '@/views/admin//staffs/AddStaff.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },



    /*
	|----------------------------------------------------
	| Admin Fees route
	|----------------------------------------------------
	*/

    {
        path: '/m/fees',
        name: 'FeesList',
        component: () => import(/* webpackChunkName: "fees-admin" */ '@/views/admin//fees/FeesList.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/fees/:feeId/info',
        name: 'FeeInfo',
        component: () => import(/* webpackChunkName: "admin-Feeinfo" */ '@/views/admin//fees/FeeInfo.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },



    /*
	|----------------------------------------------------
	| Admin subjects route
	|----------------------------------------------------
	*/

    {
        path: '/m/subjects',
        name: 'SubjectList',
        component: () => import(/* webpackChunkName: "subject-admin" */ '@/views/admin/subjects/SubjectList.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },


    /*
	|----------------------------------------------------
	| Admin unnamed route: wiill be named later
	|----------------------------------------------------
	*/

    {
        path: '/m/class',
        name: 'Class',
        component: () => import(/* webpackChunkName: "admin-class" */ '@/views/admin//Class.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/timetable',
        name: 'Timetable',
        component: () => import(/* webpackChunkName: "admin-timetable" */ '@/views/admin//Timetable.vue'),
        beforeEnter: adminGate,
        meta: meta.admin
    },

    {
        path: '/m/mail',
        name: 'Mail',
        component: () => import(/* webpackChunkName: "mail-admin" */ '@/views/admin//Mail.vue'),
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