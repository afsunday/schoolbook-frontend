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

                                <router-link class="dropdown-item small font-weight-midi py-2" :to="'/admin/guardians/edit/' + route.params.feeId">Edit</router-link>

                                <a class="dropdown-item small font-weight-midi py-2" href="#">Invoice</a>
                                <a class="dropdown-item small font-weight-midi py-2" href="#">Delete</a>

                            </div>
                        </div>
                    </div>
                    
                </div>
            </header>
        </template>

        <template v-slot:default>
            <div v-if="loadingState.loaded && Object.keys(feeInfo.info).length > 0" class="card border-0 rounded shadow-sm mt-2">
                <div class="card-body px-2 pb-2 pt-3">
                    <div class="form-row">
                        <div class="col-6 col-sm-3 col-md-2 mb-2">
                            <div class="flex flex-column">
                                <div class="text-muted fz-10">FEE HEAD</div>
                                <div class="h7 text-dark text-capitalize">{{ feeInfo.info.fee_headname }}</div>
                            </div>
                        </div>

                        <div class="col-6 col-sm-3 col-md-2 mb-2">
                            <div class="flex flex-column">
                                <div class="text-muted fz-10">DESCRIPTION</div>
                                <div class="h7 text-dark text-truncate text-capitalize">{{ feeInfo.info.description }}</div>
                            </div>
                        </div>

                        <div class="col-6 col-sm-3 col-md-2 mb-2">
                            <div class="flex flex-column">
                                <div class="text-muted fz-10">CREATED BY</div>
                                <div class="small text-dark text-capitalize">{{ feeInfo.info.created_by }}</div>
                            </div>
                        </div>

                        <div class="col-6 col-sm-3 col-md-2 mb-2">
                            <div class="flex flex-column">
                                <div class="text-muted fz-10">STUDENT(S)</div>
                                <div class="h7 text-dark text-capitalize">{{ feeInfo.invoiceCount }}</div>
                            </div>
                        </div>

                        <div class="col-6 col-sm-3 col-md-2 mb-2">
                            <div class="flex flex-column">
                                <div class="text-muted fz-10">AMOUNT</div>
                                <div class="h7 text-dark text-capitalize">{{ feeInfo.info.amount }}</div>
                            </div>
                        </div>

                        <div class="col-6 col-sm-3 col-md-2 mb-2">
                            <div class="flex flex-column">
                                <div class="text-muted fz-10">TOTAL DISCOUNT</div>
                                <div class="h7 text-dark text-capitalize">{{ !!feeInfo.totalDiscount ? feeInfo.totalDiscount : '0.0'  }}</div>
                            </div>
                        </div>

                        <div class="col-6 col-sm-3 col-md-2 mb-2">
                            <div class="flex flex-column">
                                <div class="text-muted fz-10">EXPECTED INCOME</div>
                                <div class="h7 text-success text-capitalize">&#8358;{{ !!feeInfo.expectedIncome ? feeInfo.expectedIncome : '0.0' }}</div>
                            </div>
                        </div>

                        <div class="col-6 col-sm-3 col-md-2 mb-2">
                            <div class="flex flex-column">
                                <div class="text-muted fz-10">TOTAL PAID</div>
                                <div class="h7 text-success text-capitalize">&#8358;{{ !!feeInfo.totalPaid ? feeInfo.totalPaid : '0.0' }}</div>
                            </div>
                        </div>

                        <div class="col-6 col-sm-3 col-md-2 mb-2">
                            <div class="flex flex-column">
                                <div class="text-muted fz-10">PENDING BALANCE</div>
                                <div class="h7 text-danger text-capitalize">&#8358;{{ !!feeInfo.totalBalance ? feeInfo.totalBalance : '0.0' }}</div>
                            </div>
                        </div>
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

                <div class="card-body px-0 pt-0 pb-2 min-100">
                    <div v-if="loadingState.loaded && !fetchFeesHasError " id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th></th>
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
                                <tr v-for="(fee, key) in feeInvoices" :key="key" class="table-row">
                                    <td>
                                        <a class="row-toggle text-decoration-none" @click="tableRowToggle($event)"></a>
                                    </td>
                                    <td>
                                        <div class="dropdown pt-1 pt-md-0">
                                            <a class="text-muted" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-h fa-sm"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">
                                                <a class="dropdown-item small font-weight-midi py-2" href="#">Apply Discount</a>
                                                <a class="dropdown-item small font-weight-midi py-2" href="#">Cancel Invoice</a>
                                            </div>
                                        </div>

                                        <div class="d-flex align-items-start mr-2r">
                                            <img src="@/assets/images/user.png" class="rounded-circle mr-2 border bg-light" width="38" height="38">
                                            <h6>
                                                <a href="#" class="h7 text-decoration-none text-capitalize text-break font-weight-midi">
                                                    {{fee.firstname}} {{fee.surname}} {{fee.othername}}
                                                </a>
                                                <div class="small-xs text-muted text-capitalize font-weight-midi text-break">{{fee.admission_number}}</div>
                                            </h6>
                                        </div>                                                                                
                                    </td>

                                    <td class="h7 font-weight-midi" data-colname="CLASS">JS2</td>
                                    <td class="h7 font-weight-midi" data-colname="AMOUNT">&#8358;{{fee.amount}}</td>
                                    <td class="h7 font-weight-midi" data-colname="DISCOUNT">&#8358;{{fee.discount}}</td>
                                    <td class="h7 font-weight-midi" data-colname="PAID">&#8358;{{fee.paid_amount}}</td>
                                    <td class="h7 font-weight-midi" data-colname="BALANCE">&#8358;{{fee.due_amount}}</td>
                                    <td class="h7 font-weight-midi" data-colname="STATUS">owing</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--/table-wrapper -->


                    <empty-list :loaded="loadingState.loaded && !fetchFeesHasError" :items="feeInvoices">
                        Oops no student invoice available for this fee
                    </empty-list>

                    <retry-button class="my-4" :list="true" :hasRetry="fetchFeesHasError" 
                        @retry="e => { 
                            fetchFeesHasError = loadingState.loaded = false; 
                            fetchFeeInfo(); fetchFeeInvoices();
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
    name: 'FeeInfo',
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

        const feeInfo = ref({info: {}})
        const fetchFeeInfo = async () => {
            let feeId = route.params.feeId
            loadingState.loading = true

            await Fees.feeInfo(feeId).then((res) => {
                if(res.data.length > 0) {
                    feeInfo.value = res.data[0]
                }

            }).catch((err) => {

                loadingState.loading = false
                loadingState.loaded = true
                fetchFeesHasError.value = true
            })
        }

        const feeInvoices = ref([])
        const fetchFeeInvoices = async () => {
            let id = route.params.feeId
            let pageId = 1
            loadingState.loading = true

            if (typeof route.query.page !== 'undefined' && route.query.page !== null ) {
                pageId = route.query.page;
            }

            await Fees.feeInvoices({feeId: id, page: pageId }).then((res) => {
                feeInvoices.value = res.data.data

                const { paging } = usePaginate(res);
                paginate.value = { ...paginate.value, ...paging }

                loadingState.loading = false
                loadingState.loaded = true
                
            })
            .catch((err) => {
                loadingState.loading = false
                loadingState.loaded = true
                fetchFeesHasError.value = true
            })
        }

        Promise.all([fetchFeeInfo(), fetchFeeInvoices()])
        .then((v) => {
            loadingState.loading = false
            loadingState.loaded = true  
        })

        watch(() => route.query.page, async (value, old) => {
            if (typeof value !== 'undefined' && value !== null ) {
                await fetchFeeInvoices() 
            }
        })


        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }

        return {
            route, loadingState, paginate, navigate, tableRowToggle, 

            fetchFeesHasError, fetchFeeInfo, fetchFeeInvoices, feeInvoices, 

            feeInfo, fetchFeesParams
        }
    }

}
</script>

<style scoped>

.table tr:last-child {
    border-bottom: 1px solid #dee2e6;
}

.fz-10 {
    font-size: 10px;
}

.mr-2r {
   margin-right: 2rem;
}

#toggle-table .table tr > td:first-child,
#toggle-table .table tr > th:first-child {
    width: 1px !important;
    padding: 0px !important;
}

#toggle-table .table tr > td:nth-child(2) .dropdown {
    position: absolute;
    display: flex;
    float: right;
    vertical-align: top;
    right: 0;
    padding-right: 18px;
}

@media (max-width: 768px) {

    #toggle-table .table {
        table-layout: fixed;
    }

    #toggle-table  .table thead tr > th:not(:nth-child(1)):not(:nth-child(2)),
    #toggle-table  .table tbody tr > td:not(:nth-child(1)):not(:nth-child(2)) {
        display: none;
    }

    .table-striped tbody tr:nth-of-type(odd) {
      background-color: unset;
    }

    #toggle-table .table tbody > tr.table-row > td:first-child,
    #toggle-table  .table thead tr > th:first-child {
        position: relative !important;
        padding-left: 2.5rem !important;
        cursor: pointer !important;
    }

    #toggle-table .table tbody tr.is-expanded > td:not(:last-child):not(:nth-child(1)) {
        display: block;
    }

    #toggle-table .table tbody tr.is-expanded > td:not(:first-child):not(:last-child):not(:nth-child(2)) {
        padding-top: .1rem !important;
        padding-bottom: .1rem !important;
    }

    #toggle-table .table tbody tr.is-expanded > td:not(:first-child):not(:last-child):not(:nth-child(2)) {
        border-top: 0px !important;
    }

    #toggle-table   .table tbody tr.is-expanded > td:nth-child(2) {
        margin-top: -1px !important;
        margin-bottom: .8rem !important
    }

    #toggle-table .table tbody tr.is-expanded > td:nth-child(2) {
       background-color: rgba(230, 230, 255, 0.5);
    }

    #toggle-table .table tbody tr > td:nth-child(2) {
       padding-top: 15px;
       padding-bottom: 15px;
    }

    #toggle-table .table tbody tr > td:nth-child(2):hover {
       background-color: rgba(230, 230, 255, 0.5);
    }

    #toggle-table .table tbody > tr.table-row .row-toggle,
    #toggle-table .table thead > tr > th:first-child .row-toggle {
        left: 0;
        border: 0;
        top: 0;
        z-index: 1;
        border-radius: 0;
        display: flex;
        height: 100%;
        width: 2.5rem !important;
        justify-content: center;
        align-items: center;
        position: absolute;
        text-align: center;
        text-indent: 0 !important;
        outline: none;
        background-color: #f6f7f8;
    }

    #toggle-table .table tbody tr.is-expanded > td > .row-toggle::before {
        content: "-" !important;
        display: inline-block;
        color: #7c8088;
        font-size: 29px;
        font-weight: 400;
    }

    #toggle-table .table tbody > tr.table-row .row-toggle:before {
        content: "+";
        color: #7c8088;
        font-size: 25px;
        font-weight: 400;
    }

    #toggle-table .table tbody > tr > td:not(:nth-child(1)):not(:nth-child(2)):before {
        content: attr(data-colname);
        display: -ms-inline-flexbox !important;
        display: inline-flex !important;
        margin-right: 15px;
        font-size: 11px;
        font-weight: 600;
        color: #666;
        min-width: 25%;
        margin-right: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
