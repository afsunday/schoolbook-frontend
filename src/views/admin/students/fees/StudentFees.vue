<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-gray-light">
                <div class="container-lg pt-2 pt-sm-3">
                    <div class="d-flex flex-wrap justify-content-between">
                        <div class="text-wrap">
                            <h6 class="text-capitalize font-weight-midi h7"><i class="fas fa-user fa-sm"></i> Afuwape sunday oluwafemi</h6>
                            <small class="mt-n2">sunny4215</small>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm small border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-right border-0 shadow m-0 py-3">

                                <router-link class="dropdown-item small font-weight-midi py-2" :to="`/m/students/${route.params.studentId}/edit`">Edit Student</router-link>

                                <a class="dropdown-item small font-weight-midi py-2" data-bs-backdrop="static" data-bs-keyboard="false"
                                 data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Mail Guardian</a>

                                <a class="dropdown-item small font-weight-midi py-2" data-bs-backdrop="static" data-bs-keyboard="false"
                                 data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Achive Guardian</a>

                                <a class="dropdown-item small font-weight-midi py-2" data-bs-backdrop="static" data-bs-keyboard="false"
                                 data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Delete Guardian</a>

                            </div>
                        </div>
                    </div>

                    
                    <div class="border-top mt-2 p-0" style="overflow-x: auto; scrollbar-width:thin;">
                        <ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link ps-0 pb-sm-3 pb-3" aria-selected="false" :to="`/m/students/${route.params.studentId}/profile`">BioData</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3 active" aria-selected="true" :to="`/m/students/${route.params.studentId}/fees`">Fees</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3 " aria-selected="false" :to="`/m/students/${route.params.studentId}/reports`">Reports</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" aria-selected="false" :to="`/m/students/${route.params.studentId}/attendance`">Attendance</router-link>
                            </li> 
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3 text-nowrap" aria-selected="false" :to="`/m/students/${route.params.studentId}/class-history`">Class History</router-link>
                            </li>                                                     
                        </ul>
                    </div>

                </div>
            </header>
        </template>

        <template v-slot:default>
            <div class="px-0">
                <div class="card border-0 shadow-sm mt-n1">
                    <div class="card-header bg-white py-0 ps-1 pe-2">
                        <div class="p-0" style="overflow-x: auto;">
                            <ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link ps-1 pb-sm-3 pb-3 active" id="pills-active-fee-tab" data-bs-toggle="pill" href="#pills-active-fee" role="tab" aria-controls="pills-bio" aria-selected="true">Active</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" id="pills-transaction-tab" data-bs-toggle="pill" href="#pills-transaction" role="tab" aria-controls="pills-attendance" aria-selected="false">Transactions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0">
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active px-0" id="pills-active-fee" role="tabpanel" aria-labelledby="pills-active-fee-tab">
                                <student-active-fee></student-active-fee>
                            </div>
                           
                            <div class="tab-pane fade px-0" id="pills-transaction" role="tabpanel" aria-labelledby="pills-transaction-tab">
                                <student-fee-transaction></student-fee-transaction>
                            </div>
                        </div>                
                    </div>
                </div>
            </div>
        </template>

    </base-admin>
</template>

<script>
// basic components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
import tabLinks from '@/views/admin/students/shared/tabLinks.vue'

// in components
import StudentActiveFee from '@/views/admin/students/fees/StudentActiveFee'
import StudentFeeTransaction from '@/views/admin/students/fees/StudentFeeTransaction'

// library:vue
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'StudentFees',
    components: {
        BaseAdmin,
        LinePreload,
        tabLinks,

        StudentActiveFee,
        StudentFeeTransaction
    },

    setup() {
        const route = useRoute()

        const loadingState = reactive({
            loading: false, loaded: false,
        })

        return {
            loadingState, route
        }
    }
}
</script>

<style scoped>

</style>