import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import store from '../store'

import middleware from '@/middleware'


NProgress.configure({
  easing: 'ease',
  speed: 1000,
  trickleSpeed: 500
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from) => {
    const authUser = JSON.parse(localStorage.getItem('SB_USER'))
    store.dispatch('general/abortPendingRequests')


    if (to.meta.requiresAuth) {

        if (authUser === null || !authUser.type) {

            router.push({ path: '/login', query: { redirect: 'forbidden' } })
        } else if (to.meta.adminAuth) {

            if (authUser.type !== 'admin') 
            router.push({ path: '/403', query: { redirect: 'forbidden' } })

        } else if (to.meta.staffAuth) {

            if (authUser.type !== 'teacher')
            router.push({ path: '/403', query: { redirect: 'forbidden' } })

        } else if (to.meta.studentAuth) {

            if (authUser.type !== 'student')
            router.push({ path: '/403', query: { redirect: 'forbidden' } })

        } else if (to.meta.guardianAuth) {

            if (authUser.type !== 'guardian')
            router.push({ path: '/403', query: { redirect: 'forbidden' } })

        } 
    } else {
        return true
    }
})


router.beforeResolve(async (to, from) => {
    if (to.name) {
        NProgress.start()  
    }

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
            return false
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
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
