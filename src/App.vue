<template>
    <div id="app">
        <router-view :key="route.fullPath"></router-view>

        <div v-if="store.state.auth.appLoadRetry" class="reload-wrapper fade-in">
            <div class="d-flex flex-column align-items-center reload-container">
                <div class="err-info-text text-center px-2">Oops we are unable to load the page please try again</div>
                <button class="d-flex btn reload-btn no-focus mt-3" @click="fetchAuthUser()">
                    <svg viewBox="0 0 24 24" class="btn-icon">
                        <g><path d="M12 2C6.486 2 2 6.486 2 12c0 .414.336.75.75.75s.75-.336.75-.75c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5c-2.886 0-5.576-1.5-7.13-3.888l2.983.55c.402.08.798-.193.874-.6.076-.408-.194-.8-.6-.874l-4.663-.86c-.204-.04-.414.01-.58.132-.168.123-.276.31-.3.515l-.57 4.706c-.05.412.242.785.653.835.03.004.06.006.09.006.375 0 .698-.278.745-.66l.32-2.63C5.673 20.36 8.728 22 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z"></path></g>
                    </svg>
                    <span class="btn-text text-nowrap">Try again</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// library:vue
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

// middleware
import middleware from '@/middleware'

export default {
  name: 'App',

  setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()

        const fetchAuthUser = async() => {
            store.commit('SET_APP_LOAD_RETRY', false)
            await middleware.authed((res) => { 
                if (res === false)  {
                    store.commit('SET_APP_READY', false)
                    router.push({ path: '/login', query: { redirect: 'forbidden' } })
                } 
                else if(res === true) {
                    store.commit('SET_APP_READY', true)
                    router.push({ path: location.pathname })
                }
            })
        }

        return {
           store, route, fetchAuthUser
        }
    },
}
</script>
<style scoped>
.reload-wrapper {
    height: 100vh;
    width: 100%;
    background-color: #fff;
}

.reload-container {
    margin-top: 100px;
}

.reload-btn {
   border-radius: 30px;
   background-color: rgb(24, 145, 240);
   color: #fff;
}

.reload-btn:hover {
    background-color: rgb(24, 145, 219);
}

.no-focus:focus {
    box-shadow: none;
}

.err-info-text {
    line-height: 1.3125;
    font-size: 15px;
}

.btn-icon {
    font-size: 16px;
    font-weight: bolder;
    margin-right: .3rem;
    color: rgb(255, 255, 255);
    fill: rgb(255, 255, 255);
    height: 1.3rem;
    width: 1.3rem;
    user-select: none;
}

.btn-text {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
}
</style>