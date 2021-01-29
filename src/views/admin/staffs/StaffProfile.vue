<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg pt-2 pt-sm-3">
                    <div class="d-flex flex-wrap justify-content-between">
                        <div class="d-inline">
                            <small class="text-uppercase">Staff Profile</small>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm small-xs border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                <router-link class="dropdown-item small font-weight-midi py-2" :to="`/m/staffs/${route.params.staffId}/edit`">Edit Staff</router-link>

                                <a class="dropdown-item small font-weight-midi py-2" href="#">Mail Staff</a>
                                <a class="dropdown-item small font-weight-midi py-2"  href="#">Achive Staff</a>
                                <a class="dropdown-item small font-weight-midi py-2" href="#">Disable Login</a>
                                <a class="dropdown-item small font-weight-midi py-2" href="#">Delete Staff</a>

                            </div>
                        </div>
                    </div>

                    <div class="d-flex mt-3 mt-sm-3">
                        <img class="rounded-lg border bg-light mr-2 mr-sm-3" src="@/assets/images/user1.png" height="70" width="70" alt="">
                        <div class="d-flex flex-column align-item-start">
                            <div class="d-inline-flex">
                                <span class=""><i class="icon icon-users2 icon-lg"></i></span>
                                <h6 class="h7 text-break font-weight-midi ml-1">
                                    {{ staff.firstname }} {{ staff.surname }} <span class="d-none d-xs-inline">{{ staff.othername }}</span>
                                </h6>
                            </div>
                            <div class="d-inline-flex">
                                <span class=""><i class="icon icon-mail icon-lg"></i></span>
                                <h6 class="h7 text-break font-weight-midi ml-1">{{ staff.email }}</h6>
                            </div>
                            <div class="d-inline-flex">
                                <span class=""><i class="icon icon-leads1 icon-lg"></i></span>
                                <h6 class="h7 text-break font-weight-midi ml-1">{{ staff.username }}</h6>
                            </div>                           
                        </div>
                    </div>

                    <div class="border-top mt-2 p-0" style="overflow-x: auto;">
                        <ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link pl-1 pb-sm-3 pb-3 active" id="pills-bio-tab" data-toggle="pill" href="#pills-bio" role="tab" aria-controls="pills-bio" aria-selected="true">BioData</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-3 pb-sm-3 pb-3" id="pills-fees-tab" data-toggle="pill" href="#pills-fees" role="tab" aria-controls="pills-fees" aria-selected="false">Wards</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-3 pb-sm-3 pb-3" id="pills-attendance-tab" data-toggle="pill" href="#pills-attendance" role="tab" aria-controls="pills-attendance" aria-selected="false">Fees</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active px-0" id="pills-bio" role="tabpanel" aria-labelledby="pills-bio-tab">
                        <staff-bio :loading="loadingState.loading" :loaded="loadingState.loaded" :staff="staff" ></staff-bio>
                    </div>
                    <div class="tab-pane fade" id="pills-fees" role="tabpanel" aria-labelledby="pills-fees-tab">
                    </div>
                    <div class="tab-pane fade px-0" id="pills-attendance" role="tabpanel" aria-labelledby="pills-attendance-tab">
                    </div>
                </div>
        </template>

    </base-admin>
</template>

<script>
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
import StaffBio from '@/views/admin/staffs/StaffBio'

// composables

// library:vue
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'

// apis
import Staff from '@/apis/Staff';

export default {
    name: 'StaffProfile',
    components: {
        BaseAdmin,
        LinePreload,
        StaffBio,
    },

    setup() {
        const route = useRoute()
        const router = useRouter()

        const loadingState = reactive({
            loading: false,
            loaded: false
        })

        const staff = ref({})


        return {
            route, loadingState, staff
        }
    }
}
</script>

<style scoped>
span.active {
    color: #28a745;
}

.blocked {
    color: #dc3545;
}
</style>
