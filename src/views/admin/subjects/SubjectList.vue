<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted">
                                <span class="h7"><i class="fas fa-columns"></i></span> Subjects
                            </div>
                        </div>
                        <div class="">
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-end border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">
                                    <router-link class="dropdown-item small font-weight-midi py-2" to="/m/staffs/add">
                                    Add subjects</router-link>
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

                <div class="body-wrapper min-100">
                    <div v-if="!loadingState.filter && !filterResourceHasError ">
                        <div class="mb-1">
                            <label class="small-xs font-weight-midi mb-0">STATUS</label>
                            <select class="form-select" v-model="fetchSubjectsParams.status">
                                <option value="all">All Atatus</option>
                                <option :value="true">Active</option>
                                <option :value="false">Inactive</option>
                            </select>
                        </div>

                        <div class="mb-1 mt-3 mb-3">
                            <button class="btn btn-outline-secondary btn-sm rounded" @click="filterSubjects()" type="submit">
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
            </modal-center>
            <!-- /filter-Modal -->

            <div v-if="selectedSubjects.length > 0" class="d-flex justify-content-between">
                <div class="text-dark small font-weight-midi d-inline-flex mt-2">
                    {{ selectedSubjects.length }} subject(s) selected
                </div>
                <div class="dropdown">
                    <a class="btn btn-secondary btn-sm font-weight-midi small-xs text-nowrap mb-1" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
                    <div class="dropdown-menu dropdown-menu-right border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Delete</a>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm mt-1 mt-sm-2">
                <div class="card-header bg-white d-flex justify-content-between rounded-top px-2">
                    <div class="me-auto">
                        <div class="input-group">
                            <div class="input-group-text bg-light">
                                <a href="" class="dropdown-toggle text-dark text-decoration-none small" data-bs-toggle="modal" data-bs-target="#staticFilterForm">
                                    <i class="fas fa-filter fa-sm"></i><span class="d-none d-sm-inline"> Filter</span>
                                </a>
                            </div>
                            <input class="form-control bg-light" type="search" @keyup.enter="filterSubjects()" v-model="fetchSubjectsParams.search" placeholder="Search name, level" aria-label="Search">
                        </div>
                    </div>
                </div>

                <line-preload :loading="loadingState.loading"></line-preload>

                <div class="card-body px-0 pt-0 min-100">
                    <!-- <div v-if="loadingState.loaded && !fetchSubjectsHasError" id="toggle-tablexxx"> -->
                    <div v-if="!fetchSubjectsHasError" id="toggle-tablexxx">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th>
                                        <div class="form-check-lg form-check">
                                            <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="form-check-input" id="sb-checkall-33" />
                                            <label class="form-check-label" for="sb-checkall-33"></label>
                                        </div>
                                    </th>
                                    <th>SUBJECT NAME</th>
                                    <th>SUBJECT LEVEL</th>
                                    <th>REGISTRANTS</th>
                                    <th>ELECTIVE</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(subject, key) in subjects" :key="key" class="table-row">
                                    <th>
                                        <div class="form-check-lg form-check">
                                            <input type="checkbox" class="form-check-input" 
                                                :ref="el => checkBoxElements[key] = el" 
                                                :checked="selectedSubjects.includes(subject.subject_id.toString())" 
                                                @click="checkOne($event)" :id="subject.subject_id">
                                            <label class="form-check-label" :for="subject.subject_id"></label>
                                        </div>
                                    </th>
                                    <td>
                                        <a  class="small text-capitalize text-wrap text-break" href="#">{{ subject.subject_name }}</a>
                                    </td>
                                    <td class="small font-weight-midi text-capitalize" data-colname="LEVEL:"> {{ subject.level_name }} </td>
                                    <td class="small font-weight-midi text-capitalize" data-colname="REIGISTRANTS:"> {{ subject.registrants }} </td>
                                    <td class="small font-weight-midi text-uppercase" data-colname="ELECTIVE:">{{ !!subject.is_elective ? 'yes' : 'no' }}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--/table -->

                    <empty-list :loaded="loadingState.loaded && !fetchSubjectsHasError" :items="subjects">
                        Oops we can't find any Fee
                    </empty-list>

                    <retry-button class="mb-4 mt-4" :list="true" :hasRetry="fetchSubjectsHasError" 
                        @retry="e => { 
                            fetchSubjectsHasError = loadingState.loaded = false; 
                            fetchSubjects(); 
                        }">
                        Oops something went wrong try again.
                    </retry-button>

                    <!-- Pagination -->
                    <!-- <pagination-links class="mt-3" :ListTotalPage="paginate.totalPage" :ListCurrentPage="paginate.currentPage"
                        :ListPrevPage="paginate.prevPage" :ListNextPage="paginate.nextPage" :ListPagesLength="paginate.pagesLength"
                        @changePage="navigate($event)">
                    </pagination-links> -->
                </div>
            </div>

        </template>

    </base-admin>
</template>

<script>
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
import DotPreload from '@/components/DotPreload'
import PaginationLinks from '@/components/PaginationLinks'
import ModalCenter from '@/components/ModalCenter'
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
import SessionTerm from '@/apis/SessionTerm'
import Subject from '@/apis/Subject'


export default {
    name: "SubjectList",
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


        // navigate the guardian reseult list on modal
        const navigate = (event) => {
            let toPage = event.currentTarget.attributes.id.value;
            router.push({ query: { page : toPage } })
        }


        // student fetch request params
        let fetchSubjectsParams = reactive({
            search: '',
            status: 'all',
            page: 1
        })


        const subjects = ref(store.state.adminSubjectStore.subjectList)
        const fetchSubjectsHasError = ref(false)

        const fetchSubjects = async () => {
            loadingState.loading = true
            fetchSubjectsHasError.value = false

            if (typeof route.query.page !== 'undefined' && route.query.page !== null ) {
                fetchSubjectsParams.page = route.query.page;
            }

            await Subject.list().then((res) => {
                subjects.value = res.data.data
                store.commit('adminSubjectStore/SET_SUBJECT_LIST', res.data.data)

                // const { paging } = usePaginate(res);
                // paginate.value = { ...paginate.value, ...paging }
                
                loadingState.loading = false
                loadingState.loaded = true
                fetchSubjectsHasError.value = false
            })
            .catch((err) => {
                loadingState.loading = false
                loadingState.loaded = true
                fetchSubjectsHasError.value = true
            })
        }

        const filterSubjects = async () => {
            router.push({ query: { page : 1 } });
            await fetchSubjects()
        } 

        // OnCreated fetch list of fee & apply filter result base on route changes
        fetchSubjects()
        watch(() => route.query.page, async (value, old) => {
            if (typeof value !== 'undefined' && value !== null ) {
                await fetchSubjects() 
            }
        })
        

        const filterResourceHasError = ref(false)

        const { 
            selectedCheckBoxes: selectedSubjects, 
            checkAll, checkOne, checkBoxElements, 
            checkAllCheckBox
        } = useCheckBox('ADMIN_SUBJECT_SELECTS');

        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }

        return {
            loadingState, paginate, navigate, filterResourceHasError,

            subjects, fetchSubjectsParams, fetchSubjectsHasError, fetchSubjects, filterSubjects, selectedSubjects, 

            checkAll, checkOne, checkBoxElements, checkAllCheckBox, tableRowToggle
        }
    }
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/table/table768';

.active {
    color: #28a745;
}

.inactive {
    color: #dc3545;
}

.table thead > tr > th:first-child,
.table tbody > tr > th {
    padding-right: 0px;
    width: 10px;
}

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
        font-size: 11px;
        font-weight: 700;
        color: #666;
        overflow: hidden;
        max-width: 30%;
        min-width: 12%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>