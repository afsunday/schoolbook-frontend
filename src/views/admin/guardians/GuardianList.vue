<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted"><span class="h7"><i class="fas fa-columns"></i></span> Guardians</div>
                        </div>
                        <div class="">
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-end border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">

                                    <router-link class="dropdown-item small font-weight-midi py-2" to="/m/guardians/achives">
                                    Achived Students</router-link>

                                    <router-link class="dropdown-item small font-weight-midi py-2" to="/m/guardians/add">
                                    Add Guardians</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>

            <div v-if="selectedGuardians.length > 0" class="d-flex justify-content-between">
                <div class="text-dark small font-weight-midi d-inline-flex mt-2">
                    {{selectedGuardians.length}} guardians(s) selected
                </div>
                <div class="dropdown">
                    <a class="btn btn-secondary btn-sm font-weight-midi small-xs text-nowrap mb-1" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
                    <div class="dropdown-menu dropdown-menu-end border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Block</a>
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Email</a>
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Invoice</a>
                    </div>
                </div>
            </div>

            <!-- filter-Modal -->
            <modal-center :modalBadge="'staticFilterForm'">
                <div class="mb-1">
                    <label class="small-xs font-weight-midi mb-0">ACCOUNT STATUS</label>
                    <select class="form-select" v-model="fetchGuardianParams.account_status">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
                <div class="mb-1">
                    <label class="small-xs font-weight-midi mb-0">STATUS</label>
                    <select class="form-select" v-model="fetchGuardianParams.status">
                        <option value="all">All Status</option>
                        <option value="listed">Listed</option>
                        <option value="delist">Delist</option>
                    </select>
                </div>
                <div class="mb-1">
                    <label class="small-xs mb-0">GENDER</label>
                    <select class="form-select" v-model="fetchGuardianParams.gender">
                        <option value="all">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="mb-2 mt-2">
                    <button class="btn btn-outline-secondary btn-sm" 
                    data-dismiss="modal" aria-label="close" @click="filterGuardians()" type="submit">Apply Filter</button>
                </div>
            </modal-center>
            <!--/filter-modal -->

            <div class="card border-0 shadow-sm mt-1 mt-sm-2">
                <div class="card-header bg-white d-flex justify-content-between rounded-top px-2">
                    <div class="me-auto">
                        <div class="input-group">
                            <div class="input-group-text bg-light">
                                <a href="" class="dropdown-toggle text-dark text-decoration-none small" data-bs-toggle="modal" data-bs-target="#staticFilterForm">
                                    <i class="fas fa-filter fa-sm"></i><span class="d-none d-sm-inline"> Filter</span>
                                </a>
                            </div>
                            <input class="form-control bg-light" type="search" @keyup.enter="filterGuardians()" v-model="fetchGuardianParams.search" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </div>

                <line-preload :loading="loadingState.loading"></line-preload>

                <div class="card-body px-0 pt-0 min-100">
                    <div v-show="loadingState.loaded" id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th class="wd-30">
                                        <div class="form-check-lg form-check">
                                            <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="form-check-input" id="sb-checkall">
                                            <label class="form-check-label" for="sb-checkall"></label>
                                        </div>
                                    </th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>PHONE</th>
                                    <th>GENDER</th>
                                    <th>STATUS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="small font-weight-midi">
                                <tr v-for="(guardian, i) in guardians" :key="guardian.guardian_id" class="table-row">
                                    <th>
                                        <div class="form-check-lg form-check">
                                            <input type="checkbox" class="form-check-input" 
                                                   :ref="el => checkBoxElements[i] = el" :checked="selectedGuardians.includes(guardian.guardian_id.toString())" 
                                                   @click="checkOne($event,)" :id="guardian.guardian_id">
                                            <label class="form-check-label" :for="guardian.guardian_id"></label>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="d-inline-flex">
                                            <img src="@/assets/images/user.png" class="rounded-circle me-2 border bg-light" width="35" height="35">
                                            <span class="text-break overflow-auto"> 
                                                <router-link class="text-decoration-none text-primary" :to="{ name: 'GuardianProfile', params: { guardianId: guardian.guardian_id }}">{{ guardian.firstname }} {{ guardian.surname }} {{ guardian.othername }}</router-link>
                                            </span>
                                        </div>
                                        <a class="row-toggle text-decoration-none" @click="tableRowToggle($event)"></a>
                                    </td>
                                    <td data-colname="EMAIL">{{ guardian.email }}</td>
                                    <td data-colname="PHONE">{{ guardian.phone }}</td>
                                    <td class="text-capitalize" data-colname="GENDER:">{{ guardian.gender }}</td>
                                    <td class="text-capitalize" :class="guardian.status.toLowerCase()" data-colname="DURATION:">{{ guardian.status }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <a class="btn btn-outline-secondary btn-xs rounded" href="#" role="button" id="ddLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</a>
                                            <div class="dropdown-menu dropdown-menu-end border-0 shadow m-0 py-3" aria-labelledby="ddLink">
                                                <a class="dropdown-item small font-weight-midi py-2" href="#">Block</a>
                                                <a class="dropdown-item small font-weight-midi py-2" href="#">Email</a>
                                                <a class="dropdown-item small font-weight-midi py-2" href="#">Invoice</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--/table-wrapper -->

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

// composables
import usePaginate from '@/composables/usePaginate'
import useCheckBox from '@/composables/useCheckBox'


// library:vue
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onMounted, watch } from 'vue'

// apis
import Guardian from '@/apis/Guardian';

export default {
    name: 'GuardianList',
        components: {
        BaseAdmin,
        LinePreload,
        ModalCenter,
        PaginationLinks
    },

    setup () {
        const store  = useStore()
        const route = useRoute()
        const router = useRouter()

        const loadingState = reactive({
            loading: false,
            loaded: false,
        })

        // paginate guardians resource
        const paginate = ref({
            currentPage: null,
            nextPage: false,
            prevPage: false,
            totalPage: null,
            pagesLength: null,
        })

        // guardian fetch api request params
        let fetchGuardianParams = reactive({
            search: '',
            status: 'all',
            account_status: 'all',
            gender: 'all',
            page: 1
        })

        // navigate the guardian reseult list on modal
        const navigate = (event) => {
            let toPage = event.currentTarget.attributes.id.value;
            router.push({ query: { page : toPage } });
        }

        const guardians = ref([]);

        const fetchGuardians = async () => {
            loadingState.loading = true;

            if (typeof route.query.page !== 'undefined' && route.query.page !== null ) {
                fetchGuardianParams.page = route.query.page;
            }

            await Guardian.all(fetchGuardianParams)
            .then((res) => {
                guardians.value = res.data.data

                const { paging } = usePaginate(res);
                paginate.value = { ...paginate.value, ...paging }
                
                loadingState.loading = false;
                loadingState.loaded = true;
            })
            .catch((err) => {
                console.log(err.response)
            })
        }

        const filterGuardians = async () => {
            router.push({ query: { page : 1 } });
            await fetchStudents()
        }

        // onCreated fetch guardians
        fetchGuardians()
        watch(() => route.query.page, async (value, old) => {
            if (typeof value !== 'undefined' && value !== null ) {
                await fetchGuardians() 
            }
        })

        const { 
            selectedCheckBoxes: selectedGuardians, 
            checkAll, checkOne, checkBoxElements, 
            checkAllCheckBox
        } = useCheckBox('ADMIN_GUARDIANS_SELECT');

        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }

        return {
            loadingState, paginate, navigate, guardians, fetchGuardianParams, filterGuardians,
            selectedGuardians, checkAll, checkOne, checkBoxElements, checkAllCheckBox, tableRowToggle
        }
    }
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/table/table768';

@media (max-width: 768px) {
    #toggle-table .table tbody > tr.is-expanded > td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(7)) {
        padding-bottom: 5px;
        padding-top: 5px;
    }

    #toggle-table .table tbody > tr > td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(7)):before {
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

.Listed { 
    color:  #009900; 
}

.delist { 
    color: #ff3300;  
}
</style>