<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-gray-light">
                <div class="container-lg pt-2 pt-sm-3">
                    <div class="d-flex flex-wrap justify-content-between">
                        <div class="text-wrap">
                            <span class="h7"><i class="fas fa-columns"></i></span> Students
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

                    <div class="d-flex mt-3 mt-sm-3">
                        <img class="rounded-2 border bg-light me-2 me-sm-3" src="@/assets/images/user1.png" height="70" width="70" alt="">
                        <div class="d-flex flex-column align-item-start">
                            <div class="d-inline-flex">
                                <span class=""><i class="icon icon-users2 icon-lg"></i></span>
                                <h6 class="h7 text-break font-weight-midi ms-1">
                                    {{ student.firstname }} {{ student.surname }} <span class="d-none d-xs-inline">{{ student.othername }}</span>
                                </h6>
                            </div>
                            <div class="d-inline-flex">
                                <span class=""><i class="icon icon-mail icon-lg"></i></span>
                                <h6 class="h7 text-break font-weight-midi ms-1">{{ student.email }}</h6>
                            </div>
                            <div class="d-inline-flex">
                                <span class=""><i class="icon icon-leads1 icon-lg"></i></span>
                                <h6 class="h7 text-break font-weight-midi ms-1">{{ student.username }}</h6>
                            </div>                           
                        </div>
                    </div>

                    <div class="border-top mt-2 p-0" style="overflow-x: auto; scrollbar-width:thin;">
                        <ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link ps-0 pb-sm-3 pb-3 active" aria-selected="false" :to="`/m/students/${route.params.studentId}/profile`">BioData</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" aria-selected="true" :to="`/m/students/${route.params.studentId}/fees`">Fees</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" aria-selected="false" :to="`/m/students/${route.params.studentId}/reports`">Reports</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" aria-selected="false" :to="`/m/students/${route.params.studentId}/attendance`">Attendance</router-link>
                            </li> 
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" aria-selected="false" :to="`/m/students/${route.params.studentId}/class-history`">Class History</router-link>
                            </li>                                                     
                        </ul>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
            <div class="mt-n1">
                <div class="row g-3">
                    <div class="col-sm-6 col-md-6 mb-2">
                        <div class="card-alt">
                            <div class="d-inline-flex border-bottom w-100 px-2 pb-2 pt-3">
                                <div class="me-1"><i class="icon icon-description icon-lg"></i></div>
                                <div class="ms-1 font-weight-midi text-break h7">Basic Info</div>
                            </div>

                            <div class="card-body px-2 pt-2">
                                <div class="d-flex border-bottom py-3">
                                    <div class="small-xs font-weight-bold me-3 me-sm-4">ACCOUNT STATUS</div>
                                    <div class="small">Listed</div>
                                </div>
                            </div>
                        </div>

                        <div class="card-alt mt-2">
                            <div class="d-inline-flex px-2 pt-3">
                                <div class="me-1"><i class="icon icon-info icon-lg"></i></div>
                                <div class="ms-1 font-weight-midi text-break h7">Bio Info</div>
                            </div>

                            <div class="card-body px-2 pt-2">
                                <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                                    <div class="text-capitalize font-weight-midi h7">Firstname</div>
                                    <div class="text-capitalize small">{{student.firstname}}</div>
                                </div>

                                <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                                    <div class="text-capitalize font-weight-midi h7">surname</div>
                                    <div class="text-capitalize small">{{student.surname}}</div>
                                </div>

                                <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                                    <div class="text-capitalize font-weight-midi h7">Othername</div>
                                    <div class="text-capitalize small">{{student.othername}}</div>
                                </div> 

                                <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                                    <div class="text-capitalize font-weight-midi h7">Gender</div>
                                    <div class="text-capitalize small">{{student.gender}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-6 mb-4">
                        <div class="card-alt">
                            <div class="d-inline-flex px-2 pt-3">
                                <div class="me-1"><i class="icon icon-contacts icon-lg"></i></div>
                                <div class="ms-1 font-weight-midi text-break h7">contact Info</div>
                            </div>

                            <div class="card-body px-2 pt-2">
                                 <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                                    <div class="text-capitalize font-weight-midi h7">Phone</div>
                                    <div class="text-capitalize small">{{ student.phone }}</div>
                                </div>

                                <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                                    <div class="text-capitalize font-weight-midi h7">Email</div>
                                    <div class="text-capitalize small">{{ student.email }}</div>
                                </div>

                                <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                                    <div class="text-capitalize font-weight-midi h7">Address</div>
                                    <div class="text-capitalize small">{{ student.residential_address }}</div>
                                </div> 
                            </div>
                        </div>

                        <div class="card-alt mt-2">
                            <div class="d-inline-flex px-2 pt-3">
                                <div class="me-1"><i class="icon icon-influence icon-lg"></i></div>
                                <div class="ms-1 font-weight-midi text-break h7">Other Info</div>
                            </div>

                            <div class="card-body px-2 py-2">                       
                                <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                                    <div class="text-capitalize font-weight-midi h7">Occupation</div>
                                    <div class="text-capitalize small">{{ student.occupation }}</div>
                                </div> 
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

// library:vue
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

// apis
import Student from '@/apis/Student';

export default {
    name: 'StudentProfile',
    components: {
        BaseAdmin,
        LinePreload,
        tabLinks
    },

    setup() {
        const route = useRoute()

        const loadingState = reactive({
            loading: false, loaded: false,
        })

        const student = ref([])

        const fetchStudentBioData = async () => {
            loadingState.loading = true
            let studentId = route.params.studentId

            await Student.me(studentId).then((res) => {
                student.value = res.data[0]
                loadingState.loading = false;
                loadingState.loaded = true;
            })
            .catch((err) => {
               // 
            })
        }

        //onCreated fetch student bio data
        fetchStudentBioData()

        return {
            loadingState, student, route
        }
    }
}
</script>

<style scoped>
.min-h250 {
    min-height: 200px;
}

.card-alt {
    box-shadow: 0 2px 9px hsla(0,0%,76.9%,.11); 
    border: 1px solid hsla(0,0%,74.1%,.25);
    background-color: #fff;
    border-radius: .35rem;
}

.active {
    color: #28a745;
}

.blocked {
    color: #dc3545;
}
</style>