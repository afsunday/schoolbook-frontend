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
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                    <router-link class="dropdown-item small font-weight-midi py-2" to="/admin/guardians/achives">
                                    Achived Students</router-link>

                                    <router-link class="dropdown-item small font-weight-midi py-2" to="/admin/guardians/add">
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
                    <a class="btn btn-secondary btn-sm font-weight-midi small-xs text-nowrap mb-1" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
                    <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                        <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                         data-toggle="modal" data-target="#deactivate-modal" href="#">Block</a>

                        <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                         data-toggle="modal" data-target="#email-modal"
                         href="#">Email</a>

                        <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                         data-toggle="modal" data-target="#invoice-modal">Invoice</a>
                    </div>
                </div>
            </div>

            <!-- filter-Modal -->
            <modal-center :modalBadge="'staticFilterForm'">
                <div class="form-group mb-1">
                    <label class="small-xs font-weight-midi mb-0">ACCOUNT STATUS</label>
                    <select class="custom-select" v-model="fetchGuardianParams.account_status">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
                <div class="form-group mb-1">
                    <label class="small-xs font-weight-midi mb-0">STATUS</label>
                    <select class="custom-select" v-model="fetchGuardianParams.status">
                        <option value="all">All Status</option>
                        <option value="listed">Listed</option>
                        <option value="delist">Delist</option>
                    </select>
                </div>
                <div class="form-group mb-1">
                    <label class="small-xs mb-0">GENDER</label>
                    <select class="custom-select" v-model="fetchGuardianParams.gender">
                        <option value="all">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="form-group mb-2 mt-2">
                    <button class="btn btn-outline-primary btn-sm" 
                    data-dismiss="modal" aria-label="close" @click="filterGuardians()" type="submit">Apply Filter</button>
                </div>
            </modal-center>
            <!--/filter-modal -->

            <div class="card border-0 shadow-sm mt-1 mt-sm-2">
                <div class="card-header bg-white d-flex justify-content-between rounded-top-lg px-2">
                    <div class="mr-auto">
                        <div class="input-group input-group-solid">
                            <div class="input-group-prepend">
                                <div class="input-group-text bg-light">
                                    <a href="" class="dropdown-toggle text-dark text-decoration-none small" data-toggle="modal" data-target="#staticFilterForm">
                                        <i class="fas fa-filter fa-sm"></i><span class="d-none d-sm-inline"> Filter</span>
                                    </a>
                                </div>
                            </div>
                            <input class="form-control bg-light" type="search" @keyup.enter="filterGuardians()" v-model="fetchGuardianParams.search" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </div>
                <div>
                    <line-preload :loading="loadingState.loading"></line-preload>
                </div>
                <div class="card-body px-0 pt-0">
                    <div v-show="loadingState.loaded" id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th class="wd-30">
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="custom-control-input" id="sb-checkall">
                                            <label class="custom-control-label" for="sb-checkall"></label>
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
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" 
                                                   :ref="el => checkBoxElements[i] = el" :checked="selectedGuardians.includes(guardian.guardian_id.toString())" 
                                                   @click="checkOne($event,)" :id="guardian.guardian_id">
                                            <label class="custom-control-label" :for="guardian.guardian_id"></label>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="d-inline-flex">
                                            <img src="@/assets/images/user.png" class="rounded-circle mr-2 border bg-light" width="35" height="35">
                                            <span class="text-break overflow-auto"> 
                                                <router-link class="text-decoration-none text-primary" :to="{ name: 'GuardianProfile', params: { guardianId: guardian.guardian_id }}">{{guardian.firstname}} {{guardian.surname}} {{guardian.othername}}</router-link>
                                            </span>
                                        </div>
                                        <a class="row-toggle text-decoration-none" @click="tableRowToggle($event)"></a>
                                    </td>
                                    <td data-colname="EMAIL">{{ guardian.email }}</td>
                                    <td data-colname="PHONE">{{ guardian.phone }}</td>
                                    <td data-colname="GENDER:">{{guardian.gender}}</td>
                                    <td class="text-capitalize enrolled" data-colname="DURATION:">{{ guardian.status }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <a class="btn btn-outline-secondary btn-xs rounded" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</a>
                                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3 " aria-labelledby="dropdownMenuLink">

                                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Block</a>

                                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                                 data-toggle="modal" data-target="#email-modal"
                                                 href="#">Email</a>

                                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                                 data-toggle="modal" data-target="#invoice-modal">Invoice</a>
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
import BaseAdmin from '@/views/layouts/BaseAdmin.vue'
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

        const fetchGuardians = () => {
            loadingState.loading = true;

            if (typeof route.query.page !== 'undefined' && route.query.page !== null ) {
                fetchGuardianParams.page = route.query.page;
            }

            Guardian.all(fetchGuardianParams)
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

        onMounted(async () => await fetchGuardians())
        watch(() => route.query.page, async () => await fetchGuardians());

        const { 
            selectedCheckBoxes: selectedGuardians, 
            checkAll, checkOne, checkBoxElements, 
            checkAllCheckBox
        } = useCheckBox('GUARDIANS_SELECT');

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

.Listed { 
    color:  #009900; 
}

.delist { 
    color: #ff3300;  
}

.rounded-top-lg {
  border-top-left-radius: 0.3rem !important;
  border-top-right-radius: 0.3rem !important;
}

.card-body {
    min-height: 70px;
}

.custom-select {
    border-radius: .17rem;
}

.custom-select {
    font-size: 14px;
    font-weight: 500;
    color: inherit;
    background: transparent;
    flex-grow: 1;
    padding-right: .5rem;
    padding-left: .5rem;
}

@import '@/assets/scss/table/guardian-list';
</style>