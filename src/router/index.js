import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import store from '../store'


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


router.beforeResolve((to) => {
    if (to.name) {
        NProgress.start()  
    }
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
