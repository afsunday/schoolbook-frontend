<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted">
                                <span class="h7"><i class="fas fa-columns"></i></span> STAFFS
                            </div>
                        </div>
                        <div class="">
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">
                                    <router-link class="dropdown-item small font-weight-midi py-2" :to="'/m/staffs/add'">
                                    Add Staff</router-link>
                                    <a href="#" class="dropdown-item small font-weight-midi py-2">
                                    Clear Selections</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
            <div v-if="selectedStaffs.length > 0" class="d-flex justify-content-between">
                <div class="text-dark small font-weight-midi d-inline-flex mt-2">
                    {{ selectedStaffs.length }} staff(s) selected
                </div>
                <div class="dropdown">
                    <a class="btn btn-secondary btn-sm font-weight-midi small-xs text-nowrap mb-1" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
                    <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Block</a>
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Email</a>
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Invoice</a>
                    </div>
                </div>
            </div>

            <!-- filter-Modal -->
            <modal-center :modalBadge="'staticFilterForm'">
                <div class="form-group mb-1">
                    <label class="small-xs font-weight-midi mb-0">STATUS</label>
                    <select class="custom-select" v-model="fetchStaffParams.status">
                        <option value="all">All Status</option>
                        <option value="employed">Employed</option>
                        <option value="quit">Quit</option>
                        <option value="dismissed">Dismissed</option>
                    </select>
                </div>

                <div class="form-group mb-1">
                    <label class="small-xs font-weight-midi mb-0">ACCT STATUS</label>
                    <select class="custom-select" v-model="fetchStaffParams.account_status">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>

                <div class="form-group mb-1">
                    <label class="small-xs mb-0">GENDER</label>
                    <select class="custom-select" v-model="fetchStaffParams.gender">
                        <option value="all">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div class="form-group mb-1 mt-2">
                    <button class="btn btn-outline-primary btn-sm" @click="filterStaffs()" type="submit">
                        Filter
                    </button>
                </div>
            </modal-center>

            <div class="card border-0 shadow-sm mt-1 mt-sm-2">
                <div class="card-header bg-white d-flex justify-content-between rounded-top px-2">
                    <div class="mr-auto">
                        <div class="input-group input-group-solid">
                            <div class="input-group-prepend">
                                <div class="input-group-text bg-light">
                                    <a href="" class="dropdown-toggle text-dark text-decoration-none small" data-toggle="modal" data-target="#staticFilterForm">
                                        <i class="fas fa-filter fa-sm"></i><span class="d-none d-sm-inline"> Filter</span>
                                    </a>
                                </div>
                            </div>
                            <input class="form-control bg-light" type="search" @keyup.enter="filterStaffs()" v-model="fetchStaffParams.search" placeholder="Search" aria-label="Search" />
                        </div>
                    </div>
                </div>

                <line-preload :loading="loadingState.loading"></line-preload>

                <div class="card-body px-0 pt-0 min-100">
                    <div id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th class="wd-30">
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="custom-control-input" id="sb-checkall" />
                                            <label class="custom-control-label" for="sb-checkall"></label>
                                        </div>
                                    </th>
                                    <th>NAME</th>
                                    <th>STAFF NO</th>
                                    <th>EMAIL</th>
                                    <th>GENDER</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody class="small font-weight-midi">
                                <tr v-for="(staff, i) in staffs" :key="staff.student_id" class="table-row">
                                    <th>
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" 
                                                :ref="el => checkBoxElements[i] = el" 
                                                :checked="selectedStaffs.includes(staff.staff_id.toString())" 
                                                @click="checkOne($event)" :id="staff.staff_id">
                                            <label class="custom-control-label" :for="staff.staff_id"></label>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="d-inline-flex">
                                            <img src="@/assets/images/user.png" class="rounded-circle mr-2 border bg-light" width="35" height="35" />
                                            <span class="text-break overflow-auto">
                                                <router-link class="text-decoration-none text-primary" :to="{name: 'StaffProfile', params: { staffId:staff.staff_id }}">{{ staff.firstname }} {{ staff.othername }}
                                                </router-link>
                                            </span>
                                        </div>
                                        <a class="row-toggle text-decoration-none" @click="tableRowToggle($event)"></a>
                                    </td>
                                    <td data-colname="STAFF NO">{{ staff.staff_no }}</td>
                                    <td data-colname="EMAIL">{{ staff.email }}</td>
                                    <td data-colname="GENDER:">{{ staff.gender }}</td>
                                    <td class="text-capitalize enrolled" data-colname="DURATION:">{{ staff.status }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--/table-->

                    <!-- Pagination -->
                    <pagination-links
                    :ListTotalPage="paginate.totalPage"
                    :ListCurrentPage="paginate.currentPage"
                    :ListPrevPage="paginate.prevPage"
                    :ListNextPage="paginate.nextPage"
                    :ListPagesLength="paginate.pagesLength"
                    @changePage="navigate($event)">
                    </pagination-links>

                </div>
            </div>
        </template>

    </base-admin>
</template>

<script>
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
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
import { reactive, ref, onMounted, watch } from 'vue'

// apis
import Student from '@/apis/Student'
import Staff from '@/apis/Staff'
import Class from '@/apis/Class'

export default {
    name: "StaffList",
    components: {
        BaseAdmin,
        LinePreload,
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
            loaded: false
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
            router.push({ query: { page : toPage } });
        }


        // student fetch request params
        let fetchStaffParams = reactive({
            search: '',
            status: 'all',
            account_status: 'all',
            gender: 'all',
            page: 1
        })


        const staffs = ref([])
        const fetchStaffs = async () => {
            loadingState.loading = true;

            if (typeof route.query.page !== 'undefined' && route.query.page !== null ) {
                fetchStaffParams.page = route.query.page;
            }

            await Staff.all(fetchStaffParams)
            .then((res) => {
                staffs.value = res.data.data

                const { paging } = usePaginate(res);
                paginate.value = { ...paginate.value, ...paging }
                
                loadingState.loading = false;
                loadingState.loaded = true;
            })
            .catch((err) => {
                console.log(err.response)
            })
        }

        const filterStaffs = async () => {
            router.push({ query: { page : 1 } });
            await fetchStaffs()
        } 

        // onCreated fetch staffs
        fetchStaffs()
        watch(() => route.query.page, async (value, old) => {
            if (typeof value !== 'undefined' && value !== null ) {
                await fetchStaffs() 
            }
        })
        
        const { 
            selectedCheckBoxes: selectedStaffs, 
            checkAll, checkOne, checkBoxElements, 
            checkAllCheckBox
        } = useCheckBox('ADMIN_STAFFS_SELECT');

        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }

        return {
            loadingState, paginate, navigate, staffs, fetchStaffParams, filterStaffs, fetchStaffs,
            selectedStaffs, checkAll, checkOne, checkBoxElements, checkAllCheckBox, tableRowToggle
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
        margin-right: 10px;
        font-size: 85%;
        font-weight: 700;
        color: #666;
        overflow: hidden;
        width: 25%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
