<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex flex-wrap justify-content-between">
                        <div class="d-inline">
                            <small class="text-uppercase">Fee info</small>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm small-xs border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                <router-link class="dropdown-item small font-weight-midi py-2" :to="'/admin/guardians/edit/' + route.params.guardianId">Edit Guardian</router-link>

                                <a class="dropdown-item small font-weight-midi py-2" href="#">Mail Guardian</a>
                                <a class="dropdown-item small font-weight-midi py-2"  href="#">Achive Guardian</a>
                                <a class="dropdown-item small font-weight-midi py-2" href="#">Delete Guardian</a>

                            </div>
                        </div>
                    </div>
                    
                </div>
            </header>
        </template>

        <template v-slot:default>
            <div class="card border-0 rounded shadow-sm mt-2">
                <!-- <div class="card-header bg-white"></div> -->
                <div class="card-body px-2">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="d-flex flex-wrap justify-content-between">
                                <div class="flex flex-column">
                                    <small class="text-muted">Fee Head</small>
                                    <h6 class="text-dark text-capitalize">Tuition</h6>
                                </div>

                                <div class="flex flex-column">
                                    <small class="text-muted">Description</small>
                                    <h6 class="text-dark text-capitalize">Tuition</h6>
                                </div>

                                <div class="flex flex-column">
                                    <small class="text-muted">Description</small>
                                    <h6 class="text-dark text-capitalize">Tuition</h6>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6"></div>
                    </div>
                </div>
            </div>


            <div class="card border-0 shadow-sm mt-1 mt-sm-2">
                <div class="card-header bg-white d-flex justify-content-between rounded-top px-2">
                    <div class="mr-auto">
                        <div class="input-group input-group-solid">
                            <div class="input-group-prepend">
                                <div class="input-group-text bg-light">
                                    <span class=""><i class="icon icon-search icon-lg"></i></span>
                                </div>
                            </div>
                            <input class="form-control bg-light" type="search" v-model="fetchFeesParams.search" placeholder="Search" aria-label="Search" />
                        </div>
                    </div>
                </div>

                <line-preload :loading="loadingState.loading"></line-preload>

                <div class="card-body px-0 pt-0 min-100">
                    <div id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th>NAME</th>
                                    <th>CLASS</th>
                                    <th>AMOUNT</th>
                                    <th>DISCOUNT</th>
                                    <th>PAID</th>
                                    <th>BALANCE</th>
                                    <th>STATUS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(fee, key) in [1,2]" :key="key" class="table-row">
                                    <td>
                                        <div class="d-flex justify-content-between">
                                            <router-link class="text-decoration-none" :to="'/admin/fees/info/'+fee.fee_id">
                                                <div class="mr-4">
                                                    <span class="mt-n1">
                                                        <a href="#" class="h7 text-decoration-none text-dark text-capitalize text-break font-weight-midi">
                                                            omotola johnson ferrari
                                                        </a>
                                                    </span>
                                                    <div class="small text-dark text-wrap text-break">ADM123425</div>
                                                </div>
                                            </router-link>
                                            <a class="row-toggle text-decoration-none ml-2" @click="tableRowToggle($event)"></a>
                                        </div>
                                    </td>
                                    <td class="h7 font-weight-midi" data-colname="CLASS">JS2</td>
                                    <td class="h7 font-weight-midi" data-colname="AMOUNT:">2000</td>
                                    <td class="h7 font-weight-midi text-capitalize" data-colname="DISCOUNT:">2019/2020 first term</td>
                                    <td class="h7 font-weight-midi" data-colname="PAID:">Active</td>
                                    <td class="h7 font-weight-midi" data-colname="BALANCE:">2020-10-10</td>
                                    <td class="h7 font-weight-midi" data-colname="STATUS"></td>
                                    <td class="h7 font-weight-midi" data-colname="">
                                        <div class="dropdown">
                                            <a class="text-muted" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">
                                                <a class="dropdown-item small font-weight-midi py-2" href="#">Discount</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--/table-wrapper -->

                    <empty-list :loaded="loadingState.loaded  && !fetchFeesHasError" :items="fees">
                        Oops we can't find any Fee
                    </empty-list>

                    <!-- <retry-button class="my-4" :list="true" :hasRetry="fetchFeesHasError" 
                        @retry="e => { 
                            fetchFeesHasError = loadingState.loaded = false; 
                            fetchFees(); 
                        }">
                        Oops something went wrong try again.
                    </retry-button> -->

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
import PaginationLinks from '@/components/PaginationLinks'
import RetryButton from '@/components/RetryButton'
import EmptyList from '@/components/EmptyList'

// composables
import usePaginate from '@/composables/usePaginate'

// library:vue
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'

// apis
import Fees from '@/apis/Fees'

export default {
    name: 'GuardianProfile',
    components: {
        BaseAdmin,
        LinePreload,
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

        const fetchFeesHasError = ref(false)
        const fees = ref([])

        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }

        return {
            route, loadingState, paginate, navigate,

            fetchFeesHasError, fees, fetchFeesParams, tableRowToggle
        }
    }

}
</script>

<style scoped>
/*@import '@/assets/scss/table/table768';*/

.table tr:last-child {
    border-bottom: 1px solid #dee2e6;
}

@media (max-width: 768px) {

    #toggle-table .table {
        table-layout: fixed;
    }

    #toggle-table  .table thead tr > th:not(:nth-child(1)),
    #toggle-table  .table tbody tr > td:not(:nth-child(1)) {
        display: none;
    }

    #toggle-table  .table tbody tr:first-child > td:nth-child(2) {
       border-top: 0px !important;
    }

    #toggle-table .table thead > tr > th:first-child,
    #toggle-table .table tbody > tr > td:first-child {
        padding-right: 1.5rem;
    }

    #toggle-table  .table tbody tr.is-expanded > td {
        display: block;
    }

    #toggle-table .table tbody > tr.table-row .row-toggle:before {
        display: inline-block;
        float: right;
        position: absolute;
        content: '+';
        font-size: 22px;
        text-decoration: none;
        font-weight: 600;
        color: #4d4d4d;
        margin-top: -5px;
        margin-right: 12px;
        right: 0 !important;
        padding-left: 5px;
    }

    #toggle-table .table tbody > tr.is-expanded .row-toggle:before {
        display: inline-block;
        content: '-';
        font-size: 25px;
        margin-top: -6px;
        margin-right: 13px;
        padding-left: 5px;
    }

    #toggle-table .table tbody > tr.is-expanded > td:nth-child(2) {
        margin-top: -1px !important;
    }

    #toggle-table .table tbody > tr.is-expanded > td:not(:nth-child(1)) {
        padding-bottom: 5px;
        padding-top: 5px;
    }

    #toggle-table .table tbody > tr > td:not(:nth-child(1)):before {
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
