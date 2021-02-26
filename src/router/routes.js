import router from './'
import store from '../store'
import * as meta from './meta'
import middleware from '@/middleware'


const permitGate = async (to, from) => {
    await middleware.authed((res) => {
        if (res === false) {
            return router.push({
                path: '/login',
                query: { redirect: 'forbidden' }
            })
        } else if (res === true) {
            store.commit('SET_APP_READY', true)
        } else if (res === 'retry') {
            store.commit('SET_APP_READY', false)                   
        }
    })

    if(store.state.auth.appReady === false) {
        return false
    } 

    if (to.meta.adminAuth) {
        if (store.getters.user.type !== 'admin') {
            return router.push({
                path: '/denied',
                query: { query: 'forbidden' }
            })
        } 
    } else if (to.meta.staffAuth) {
        if (store.getters.user.type !== 'teacher') {
            return false
        } 
    } else if (to.meta.studentAuth) {
        if (store.getters.user.type !== 'student') {
            return false
        } 
    } else if (to.meta.guardianAuth) {
        if (store.getters.user.type !== 'guardian') {
            return false
        } 
    }
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
        component: () => import(/* webpackChunkName: "home-admin" */ '@/views/admin/dashboard/Home.vue'),
        beforeEnter: permitGate,
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
        component: () => import(/* webpackChunkName: "students-admin" */ '@/views/admin/students/StudentList.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },
   
    {
        path: '/m/students/:studentId/profile',
        name: 'StudentProfile',
        component: () => import(/* webpackChunkName: "studentview-admin" */ '@/views/admin/students/StudentProfile.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/students/:studentId/fees',
        name: 'StudentFees',
        component: () => import(/* webpackChunkName: "studentfees-admin" */ '@/views/admin/students/fees/StudentFees.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/students/:studentId/fees/transactions',
        name: 'StudentFeeTransaction',
        component: () => import(/* webpackChunkName: "studentfees-admin" */ '@/views/admin/students/fees/StudentFeeTransaction.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/students/:studentId/reports',
        name: 'StudentReports',
        component: () => import(/* webpackChunkName: "studentfees-admin" */ '@/views/admin/students/StudentReports.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/students/:studentId/edit',
        name: 'EditStudent',
        component: () => import(/* webpackChunkName: "studentedit-admin" */ '@/views/admin/students/EditStudent.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/students/add',
        name: 'AddStudent',
        component: () => import(/* webpackChunkName: "studentadd-admin" */ '@/views/admin/students/AddStudent.vue'),
        beforeEnter: permitGate,
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
        component: () => import(/* webpackChunkName: "guardians-admin" */ '@/views/admin//guardians/GuardianList.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/guardians/:guardianId/profile',
        name: 'GuardianProfile',
        component: () => import(/* webpackChunkName: "guardian-view" */ '@/views/admin//guardians/GuardianProfile.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/guardians/:guardianId/edit',
        name: 'EditGuardian',
        component: () => import(/* webpackChunkName: "guardianedit-admin" */ '@/views/admin//guardians/EditGuardian.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/guardians/add',
        name: 'AddGuardian',
        component: () => import(/* webpackChunkName: "guardianadd-admin" */ '@/views/admin//guardians/AddGuardian.vue'),
        beforeEnter: permitGate,
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
        component: () => import(/* webpackChunkName: "staffslist-admin" */ '@/views/admin//staffs/StaffList.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/staffs/:staffId/profile',
        name: 'StaffProfile',
        component: () => import(/* webpackChunkName: "staffsprofile-admin" */ '@/views/admin//staffs/StaffProfile.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/staffs/:staffId/edit',
        name: 'EditStaff',
        component: () => import(/* webpackChunkName: "staffsedit-admin" */ '@/views/admin//staffs/EditStaff.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/staffs/add',
        name: 'AddStaff',
        component: () => import(/* webpackChunkName: "staffadd-admin" */ '@/views/admin//staffs/AddStaff.vue'),
        beforeEnter: permitGate,
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
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/fees/:feeId/info',
        name: 'FeeInfo',
        component: () => import(/* webpackChunkName: "Feeinfo-admin" */ '@/views/admin//fees/FeeInfo.vue'),
        beforeEnter: permitGate,
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
        beforeEnter: permitGate,
        meta: meta.admin
    },


    /*
	|----------------------------------------------------
	| Admin unnamed route: wiill be named later
	|----------------------------------------------------
	*/

    {
        path: '/m/class',
        name: 'ClassList',
        component: () => import(/* webpackChunkName: "school-class" */ '@/views/admin/class/ClassList.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/timetable',
        name: 'Timetable',
        component: () => import(/* webpackChunkName: "timetable-admin" */ '@/views/admin//Timetable.vue'),
        beforeEnter: permitGate,
        meta: meta.admin
    },

    {
        path: '/m/mail',
        name: 'Mail',
        component: () => import(/* webpackChunkName: "mail-admin" */ '@/views/admin//Mail.vue'),
        beforeEnter: permitGate,
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
        component: () => import(/* webpackChunkName: "error-view" */ '@/views/errors/NotFound.vue')
    },

    {
        path: '/denied',
        name: 'forbidden',
        component: () => import(/* webpackChunkName: "error-view" */ '@/views/errors/403.vue')
    }
]

export default routes