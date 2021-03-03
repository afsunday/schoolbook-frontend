<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted">
                                <span class="h7"><i class="fas fa-columns"></i></span> Students
                            </div>
                        </div>
                        <div class="">
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dpLK" data-bs-toggle="dropdown" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-end border-0 shadow m-0 py-3">
                                    <router-link class="dropdown-item small font-weight-midi py-2" :to="'/m/students/add'">
                                    Add Student</router-link>

                                    <a @click="clearSelections()" class="dropdown-item small font-weight-midi py-2">
                                    Clear Selections</a> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>

            <!-- filter-Modal -->
            <modal-center :modalBadge="'staticFilterForm'">
                <dot-preload class="mt-3" :loading="loadingState.filter"></dot-preload>

                <retry-button class="my-4" :list="true" :hasRetry="filterResourceHasError" 
                    @retry="e => { 
                        filterResourceHasError = loadingState.filter = false; 
                        fetchClasses(); 
                    }">
                    Oops unable to fetch filters try again.
                </retry-button>

                <div class="body-wrapper min-100">
                    <div v-if="!loadingState.filter && !filterResourceHasError">
                        <div class="mb-1">
                            <label class="small-xs font-weight-midi mb-0">STATUS</label>
                            <select class="form-select" v-model="fetchStudentParams.status" name="status-filter">
                                <option value="all">All Status</option>
                                <option value="enrolled">Enrolled</option>
                                <option value="dropped">Dropped</option>
                                <option value="graduated">Graduated</option>
                            </select>
                        </div>

                        <div class="mb-1">
                            <label class="small-xs mb-0">CLASS</label>
                            <select class="form-select" v-model="fetchStudentParams.class" name="class-filter">
                                <option value="all">All Classes</option>
                                <option v-for="(xclass, key) in classes" :key="key" :value="xclass.id">
                                    {{ xclass.class_name }} {{ xclass.arm }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="small-xs mb-0">GENDER</label>
                            <select class="form-select" v-model="fetchStudentParams.gender" name="gender-filter">
                                <option value="all">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div class="form-check-lg form-check">
                            <input type="checkbox" 
                                :value="true" 
                                v-model="fetchStudentParams.archives" 
                                class="form-check-input" id="filterHasAchives">
                            <label class="form-check-label small" for="filterHasAchives">Achives Only</label>
                        </div>

                        <div class="mb-1 mt-3 mb-3">
                            <button class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal" @click="filterStudents()" type="submit">
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
            </modal-center>

            <div v-if="selectedStudents.length > 0" class="d-flex justify-content-between">
                <div class="text-dark small font-weight-midi d-inline-flex mt-2">
                    {{ selectedStudents.length }} student(s) selected
                </div>
                <div class="dropdown">
                    <a class="btn btn-secondary btn-sm font-weight-midi small-xs text-nowrap mb-1" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Actions</a>
                    <div class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Block</a>
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Email</a>
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Invoice</a>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm mt-1 mt-sm-2">
                <div class="card-header bg-white d-flex justify-content-between rounded-top px-2">
                    <div class="me-auto">
                        <div class="input-group">
                            <div class="input-group-text bg-light">
                                <a href="#" class="text-dark text-decoration-none small" data-bs-toggle="modal" data-bs-target="#staticFilterForm">
                                    <i class="fas fa-filter fa-sm"></i><span class="d-none d-sm-inline"> Filter</span>
                                </a>
                            </div>
                            <input class="form-control bg-light" type="search" @keyup.enter="filterStudents()" v-model="fetchStudentParams.search" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </div>

                <line-preload :loading="loadingState.loading"></line-preload>

                <div v-if="toggleListFace" class="card-body px-0 pt-0 min-100">
                    <div v-if="loadingState.loaded && !fetchStudentHasError" id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th>
                                        <div class="form-check-lg form-check">
                                            <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="form-check-input" id="sb-checkall" />
                                            <label class="orm-check-label" for="sb-checkall"></label>
                                        </div>
                                    </th>
                                    <th>NAME</th>
                                    <th>ADM NO</th>
                                    <th>CLASS</th>
                                    <th>GENDER</th>
                                    <th>ADM. DATE</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody class="text-capitalize">
                                <tr v-for="(student, i) in students" :key="student.student_id" class="table-row">
                                    <th>
                                        <div class="form-check-lg form-check">
                                            <input type="checkbox" class="form-check-input" 
                                                :ref="el => checkBoxElements[i] = el" 
                                                :checked="selectedStudents.includes(student.student_id.toString())" 
                                                @click="checkOne($event)" :id="student.student_id">
                                            <label class="form-check-label" :for="student.student_id"></label>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="d-inline-flex me-4">
                                            <img src="@/assets/images/user.png" class="rounded-circle me-2 border bg-light" width="35" height="35" />
                                            <span class="text-break overflow-auto">
                                                <router-link class="text-decoration-none text-capitalize text-primary" :to="{name: 'StudentProfile', params: { studentId:student.student_id }}">{{ student.firstname }} {{ student.surname }} {{ student.othername }}
                                                </router-link>
                                            </span>
                                        </div>
                                        <a class="row-toggle text-decoration-none" @click="tableRowToggle($event)"></a>
                                    </td>
                                    <td data-colname="ADM NO">{{ student.admission_number }}</td>
                                    <td class="text-capitalize" data-colname="CLASS">{{ student.classname }} {{ student.classarm }}</td>
                                    <td class="text-capitalize" data-colname="GENDER">{{ student.gender }}</td>
                                    <td data-colname="ADM DATE">{{ student.admission_date }}</td>
                                    <td class="text-capitalize" :class="student.status.toLowerCase()" data-colname="DURATION">{{ student.status }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--/table-->

                    <empty-list class="my-4" :loaded="loadingState.loaded  && !fetchStudentHasError" :items="students">
                        Oops we can't find any Student Record
                    </empty-list>

                    <retry-button class="my-4" :list="true" :hasRetry="fetchStudentHasError" 
                        @retry="e => { 
                            fetchStudentHasError = loadingState.loaded = false; 
                            fetchStudents(); 
                        }">
                        Oops something went wrong try again.
                    </retry-button>

                    <!-- Pagination -->
                    <pagination-links
                        :ListTotalPage="paginate.totalPage"
                        :ListCurrentPage="paginate.currentPage"
                        :ListPrevPage="paginate.prevPage"
                        :ListNextPage="paginate.nextPage"
                        :ListPagesLength="paginate.pagesLength"
                        @changePage="navigate($event)">
                    </pagination-links>

                </div><!--/card-body-->
            </div><!--/card-->       
        </template>

    </base-admin>
</template>

<script>
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
import PaginationLinks from '@/components/PaginationLinks'
import ModalCenter from '@/components/ModalCenter'
import DotPreload from '@/components/DotPreload'
import RetryButton from '@/components/RetryButton'
import EmptyList from '@/components/EmptyList'


// composables
import usePaginate from '@/composables/usePaginate'
import useCheckBox from '@/composables/useCheckBox'

// library:vue
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'

// apis
import Student from "@/apis/Student"
import Class from "@/apis/Class"

export default {
    name: "StudentList",
    components: {
        BaseAdmin,
        LinePreload,
        DotPreload,
        ModalCenter,
        PaginationLinks,
        RetryButton,
        EmptyList
    },

    setup() {
        const store  = useStore()
        const route = useRoute()
        const router = useRouter()

        let loadingState = reactive({
            loading: false,
            loaded: false,
            filter: false
        })

        // paginate fetched data
        const paginate = ref({
            currentPage: null,
            nextPage: false,
            prevPage: false,
            totalPage: null,
            pagesLength: null,
        })

        // student fetch request params
        let fetchStudentParams = reactive({
            search: '',
            status: 'all',
            class: 'all',
            gender: 'all',
            archives: false,
            page: 1
        })

        const fetchStudentHasError = ref(false)
        const students = ref([])

        const fetchStudents = async () => {
            loadingState.loading = true;

            if (typeof route.query.page !== 'undefined' && route.query.page !== null ) {
                fetchStudentParams.page = route.query.page;
            }

            await Student.all(fetchStudentParams)
            .then((res) => {
                students.value = res.data.data

                const { paging } = usePaginate(res);
                paginate.value = { ...paginate.value, ...paging }
                
                loadingState.loading = false
                loadingState.loaded = true
                fetchStudentHasError.value = false
            })
            .catch((err) => {
                loadingState.loading = false
                loadingState.loaded = true
                fetchStudentHasError.value = true
            })
        }

        // onCreated fetch students
        fetchStudents()
        watch(() => route.query.page, async (value, old) => {
            if (typeof value !== 'undefined' && value !== null ) {
                await fetchStudents() 
            }
        })

        // navigate the guardian reseult list on modal
        const navigate = (event) => {
            let toPage = event.currentTarget.attributes.id.value;
            router.push({query: { page : toPage } })
        }


        const filterResourceHasError = ref(false)
        const classes = ref([])

        const fetchClasses = () => {
            loadingState.filter = true

            Class.classArms().then((res) => {
                classes.value = res.data

                loadingState.filter = false
                filterResourceHasError.value = false
            }).catch((err) => {

                filterResourceHasError.value = true
                loadingState.filter = false
            })
        }

        // on created fetch classes  
        fetchClasses()

        const filterStudents = async () => {
            if(parseInt(route.query.page) !== 1) {
                router.push({ query: { page : 1 } })
            } else {
                await fetchStudents()
            }
        }        

        const { 
            selectedCheckBoxes: selectedStudents, 
            checkAll, checkOne, checkBoxElements, 
            checkAllCheckBox, removeCheckStorage
        } = useCheckBox('ADMIN_STUDENTS_SELECT')


        // clear checkboxes from local storage and var
        const clearSelections = () => {
            selectedStudents.value = []
            removeCheckStorage()
        }

        // page styling vars funcs
        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }


        const toggleListFace = ref(true)

        // const handleListFace = (e) => {
        //     if (e.matches) {
        //         toggleListFace.value = true
        //     } else {
        //         toggleListFace.value = false
        //     }
        // }

        // let pageMediaQuery = window.matchMedia("(max-width: 700px)")

        // pageMediaQuery.addListener(handleListFace)

        // handleListFace(pageMediaQuery)

        return {
            loadingState, paginate, navigate, students, classes, fetchClasses, fetchStudents, fetchStudentParams, 

            filterStudents, filterResourceHasError, fetchStudentHasError, selectedStudents, checkAll, checkOne, 

            checkBoxElements, checkAllCheckBox, clearSelections, tableRowToggle, toggleListFace
        }
    }
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/table/table768';

@media (max-width: 768px) {
    #toggle-table .table tbody > tr.is-expanded > td:not(:nth-child(1)):not(:nth-child(2)) {
        padding-bottom: 5px;
        padding-top: 5px;
    }

    #toggle-table .table tbody > tr > td:not(:nth-child(1)):not(:nth-child(2)):before {
        content: attr(data-colname);
        display: -ms-inline-flexbox !important;
        display: inline-flex !important;
        margin-right: 15px;
        font-size: 85%;
        font-weight: 700;
        color: #666;
        overflow: hidden;
        width: 32%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
