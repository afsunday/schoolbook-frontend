<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted">
                                <span class="h7"><i class="fas fa-columns"></i></span> Fees
                            </div>
                        </div>
                        <div class="">
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">
                                    <router-link class="dropdown-item small font-weight-midi py-2" to="/m/staffs/add">
                                    Add Fees</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
            <div v-if="selectedFees.length > 0" class="d-flex justify-content-between">
                <div class="text-dark small font-weight-midi d-inline-flex mt-2">
                    {{ selectedFees.length }} fee(s) selected
                </div>
                <div class="dropdown">
                    <a class="btn btn-secondary btn-sm font-weight-midi small-xs text-nowrap mb-1" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
                    <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Archive</a>
                        <a class="dropdown-item small font-weight-midi py-2" href="#">Email</a>
                    </div>
                </div>
            </div>

            <!-- filter-Modal -->
            <modal-center :modalBadge="'staticFilterForm'">

                <dot-preload class="mt-3" :loading="loadingState.filter"></dot-preload>

                <div class="body-wrapper min-100">
                    <div v-if="!loadingState.filter && !filterResourceHasError ">
                        <div class="form-group mb-1">
                            <label class="small-xs font-weight-midi mb-0">STATUS</label>
                            <select class="custom-select" v-model="fetchFeesParams.status">
                                <option value="all">All Atatus</option>
                                <option :value="true">Active</option>
                                <option :value="false">Inactive</option>
                            </select>
                        </div>

                        <div class="form-group mb-1">
                            <label class="small-xs font-weight-midi mb-0">SESSION TERM</label>
                            <select class="custom-select" v-model="fetchFeesParams.session_term">
                                <option value="all">All Session Terms</option>
                                <option v-for="term in sessionTerms" :value="term.id">{{ term.session_year }} {{ term.session_term }}</option>
                            </select>
                        </div>

                        <div class="form-group mb-1">
                            <label class="small-xs font-weight-midi mb-0">FEE HEADS</label>
                            <select class="custom-select" v-model="fetchFeesParams.fee_head">
                                <option value="all">All Fee Heads</option>
                                <option v-for="head in feeHeads" :value="head.fee_head_id">{{ head.name }}</option>
                            </select>
                        </div>

                        <div class="form-group mb-1 mt-3">
                            <label class="small-xs font-weight-midi mb-0 d-flex justify-content-between" for="greater">
                                GREATER THAN <span class="border rounded px-2">{{ fetchFeesParams.greater }}</span></label>
                            <input type="range" min="0" max="200000" step="500"  class="custom-range" id="greater" v-model="fetchFeesParams.greater">
                        </div>

                        <div class="form-group mb-1">
                            <label class="small-xs font-weight-midi mb-0 d-flex justify-content-between" for="lesser">
                                LESSER THAN <span class="border rounded px-2">{{ fetchFeesParams.lesser }}</span></label>
                            <input type="range" min="0" max="1000000" step="1000"  class="custom-range" id="lesser" v-model="fetchFeesParams.lesser">
                        </div>

                        <div class="custom-control-lg custom-control custom-checkbox">
                            <input type="checkbox" 
                                :value="true" 
                                v-model="fetchFeesParams.archives" 
                                class="custom-control-input" id="filterHasAchives">
                            <label class="custom-control-label small" for="filterHasAchives">Achives Only</label>
                        </div>

                        <div class="form-group mb-1 mt-3 mb-3">
                            <button class="btn btn-outline-secondary btn-sm rounded" @click="filterFees()" type="submit">
                                Apply Filter
                            </button>
                        </div>
                    </div>
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
                            <input class="form-control bg-light" type="search" @keyup.enter="filterFees()" v-model="fetchFeesParams.search" placeholder="Search" aria-label="Search" />
                        </div>
                    </div>
                </div>

                <line-preload :loading="loadingState.loading"></line-preload>

                <div class="card-body px-0 pt-0 min-100">
                    <div v-if="loadingState.loaded && !fetchFeesHasError" id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th class="wd-30">
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="custom-control-input" id="sb-checkall-33" />
                                            <label class="custom-control-label" for="sb-checkall-33"></label>
                                        </div>
                                    </th>
                                    <th>FEE HEAD/DESC</th>
                                    <th>AMOUNT</th>
                                    <th>SESSION</th>
                                    <th>STATUS</th>
                                    <th>DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(fee, key) in fees" :key="key" class="table-row">
                                    <th class="wd-30">
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" 
                                                :ref="el => checkBoxElements[key] = el" 
                                                :checked="selectedFees.includes(fee.fee_id.toString())" 
                                                @click="checkOne($event)" :id="fee.fee_id">
                                            <label class="custom-control-label" :for="fee.fee_id"></label>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="d-flex justify-content-between">
                                            <router-link class="text-decoration-none" :to="`/m/fees/${fee.fee_id}/info`">
                                                <div class="mr-4">
                                                    <span class="mt-n1">
                                                        <a href="#" class="h7 text-decoration-none text-dark text-break font-weight-midi">
                                                            {{ fee.fee_headname }}
                                                        </a>
                                                    </span>
                                                    <div class="small text-primary text-wrap text-break">{{ fee.description }}</div>
                                                </div>
                                            </router-link>
                                            <a class="row-toggle text-decoration-none ml-2" @click="tableRowToggle($event)"></a>
                                        </div>
                                    </td>
                                    <td class="h7 font-weight-midi" data-colname="AMOUNT:">{{ fee.amount }}</td>
                                    <td class="h7 font-weight-midi text-capitalize" data-colname="SESSION:">{{ fee.session_year }} {{ fee.session_term }}</td>
                                    <td class="h7 font-weight-midi" :class="!!fee.status ? 'active':'inactive'" data-colname="STATUS:">{{ !!fee.status ? 'Active' : 'Inactive' }}</td>
                                    <td class="h7 font-weight-midi" data-colname="DATE:">{{ fee.fee_updated_at }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--/table -->

                    <empty-list :loaded="loadingState.loaded  && !fetchFeesHasError" :items="fees">
                        Oops we can't find any Fee
                    </empty-list>

                    <retry-button class="my-4" :list="true" :hasRetry="fetchFeesHasError" 
                        @retry="e => { 
                            fetchFeesHasError = loadingState.loaded = false; 
                            fetchFees(); 
                        }">
                        Oops something went wrong try again.
                    </retry-button>

                    <!-- Pagination -->
                    <pagination-links class="mt-3" :ListTotalPage="paginate.totalPage" :ListCurrentPage="paginate.currentPage"
                        :ListPrevPage="paginate.prevPage" :ListNextPage="paginate.nextPage" :ListPagesLength="paginate.pagesLength"
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
import Fees from '@/apis/Fees'
import SessionTerm from '@/apis/SessionTerm'

export default {
    name: "FeesList",
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
        let fetchFeesParams = reactive({
            search: '',
            status: 'all',
            session_term: 'all',
            fee_head: 'all',
            greater: 0,
            lesser: 0,
            archives: false,
            page: 1
        })


        const fees = ref([])
        const fetchFeesHasError = ref(false)

        const fetchFees = async () => {
            loadingState.loading = true
            fetchFeesHasError.value = false

            if (typeof route.query.page !== 'undefined' && route.query.page !== null ) {
                fetchFeesParams.page = route.query.page;
            }

            await Fees.all(fetchFeesParams)
            .then((res) => {
                fees.value = res.data.data

                const { paging } = usePaginate(res);
                paginate.value = { ...paginate.value, ...paging }
                
                loadingState.loading = false
                loadingState.loaded = true
                fetchFeesHasError.value = false
            })
            .catch((err) => {
                loadingState.loading = false
                loadingState.loaded = true
                fetchFeesHasError.value = true
            })
        }

        const filterFees = async () => {
            router.push({ query: { page : 1 } });
            await fetchFees()
        } 

        // OnCreated fetch list of fee & apply filter result base on route changes
        fetchFees()
        watch(() => route.query.page, async (value, old) => {
            if (typeof value !== 'undefined' && value !== null ) {
                await fetchFees() 
            }
        })
        

        const filterResourceHasError = ref(false)
        const sessionTerms = ref([])
        const fetchSessionTerm = async () => {
            loadingState.filter = true

            await SessionTerm.all().then((res) => {
                sessionTerms.value = res.data
            })
            .catch((err) => {
                filterResourceHasError.value = true
                loadingState.filter = false
            })
        }

        const feeHeads = ref([])
        const fetchFeeHeads = async () => {
            loadingState.filter = true

            await Fees.heads().then((res) => {
                feeHeads.value = res.data
            })
            .catch((err) => {
                filterResourceHasError.value = true
                loadingState.filter = false
            })
        }

        // fetch filter resource
        Promise.all([fetchFeeHeads(), fetchSessionTerm()])
        .then((v) => { 
            filterResourceHasError.value = false
            loadingState.filter = false 
        })

        const { 
            selectedCheckBoxes: selectedFees, 
            checkAll, checkOne, checkBoxElements, 
            checkAllCheckBox
        } = useCheckBox('ADMIN_FEE_SELECT');

        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }

        return {
            loadingState, paginate, navigate, fetchSessionTerm, sessionTerms, filterResourceHasError,

            fees, fetchFeesParams, fetchFeesHasError, fetchFees, fetchFeeHeads, feeHeads, filterFees, selectedFees, 

            checkAll, checkOne, checkBoxElements, checkAllCheckBox, tableRowToggle
        }
    }
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/table/table768';

.custom-range::-moz-range-track {
  border-radius: .01rem;
}

.custom-range::-webkit-slider-runnable-track {
  border-radius: .01rem;
}

.active {
    color: #28a745;
}

.inactive {
    color: #dc3545;
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