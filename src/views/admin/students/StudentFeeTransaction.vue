<template>
	<div>
		<line-preload :loading="loadingState.loading"></line-preload>

        <div class="min-100">
			
	        <error-reload :hasError="errState.hasError" :netError="errState.netError" :reqError="errState.reqError" 
				@retry="e => {
                    errState.reqError = errState.netError = errState.hasError = false; fetchFeeTransactions()
                }">
			</error-reload>

        	<empty-list :loaded="loadingState.loaded" :items="feeTransactions" :errState="errState.hasError">
        		This Student doesnt have fee transaction 
        	</empty-list>

	        <div v-show="feeTransactions.length >= 1">
				<div class="card-header bg-white d-flex justify-content-between px-2">
		            <div class="mr-auto">
		                <div class="input-group">
		                    <input class="form-control" type="search" @keyup.enter="searchFeeTransaction()" v-model="feeSearch" placeholder="Search" aria-label="Search">
		                </div>
		            </div>
		        </div>

				<div v-if="selectedFeeTransactions.length > 0" class="d-flex justify-content-between px-2 mt-3 mb-2">
					<div class="text-dark small font-weight-midi d-inline-flex mt-1">
		                {{selectedFeeTransactions.length}} transaction(s) selected
		            </div>

					<div class="dropdown">
		                <a class="btn btn-secondary btn-sm small-xs text-nowrap mb-1 mr-0 mr-sm-1" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
		                <div class="dropdown-menu dropdown-menu-right  border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

		                    <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
		                     data-toggle="modal" data-target="#deactivate-modal" href="#">Pay Selected</a>

		                    <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
		                     data-toggle="modal" data-target="#email-modal"
		                     href="#">Unassign</a>                    
		                </div>
		            </div>            
		        </div>

				<div id="toggle-table">
			        <table class="table table-striped">
			            <thead class="small-xs font-weight-midi text-muted bg-white">
			                <tr>
			                    <th class="wd-30">
			                        <div class="custom-control-lg custom-control custom-checkbox">
		                                <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="custom-control-input" id="sb-checkall-44" />
		                                <label class="custom-control-label" for="sb-checkall-44"></label>
		                            </div>
			                    </th>
			                    <th>RECEIPT/NAME</th>
		                        <th>AMOUNT</th>
		                        <th>MODE</th>
			                    <th>RECORD BY</th>
			                    <th>DATE</th>
			                    <th></th>
			                </tr>
			            </thead>
			            <tbody>
			                <tr v-for="(fee, key) in feeTransactions" :key="key" class="table-row">
			                    <th class="wd-30">
			                        <div class="custom-control-lg custom-control custom-checkbox">
		                                <input type="checkbox" class="custom-control-input" 
		                                    :ref="el => checkBoxElements[key] = el" 
		                                    :checked="selectedFeeTransactions.includes(fee.invoiced_fee_id.toString())" 
		                                    @click="checkOne($event)" :id="fee.invoiced_fee_id">
		                                <label class="custom-control-label" :for="fee.invoiced_fee_id"></label>
		                            </div>
			                    </th>
			                    <td>
			                        <div class="d-flex justify-content-between">
			                            <div class="mr-4 mr-sm-0">
			                                <span>
                                                <a href="#" class="h7 text-decoration-none text-primary text-uppercase font-weight-midi">RSB4521782</a>
                                            </span>
			                                <div class="small text-muted text-wrap text-break text-capitalize">John tuition Fee 2019/2020 First Term</div>
			                            </div>
			                            <a class="row-toggle text-decoration-none ml-2" @click="tableRowToggle($event)"></a>
			                        </div>
			                    </td>
			                    <td class="h7 font-weight-midi" data-colname="AMOUNT:">20000</td>
			                    <td class="h7 font-weight-midi text-lowercase" data-colname="PAY METHOD:">Webpay</td>
			                    <td class="h7 font-weight-midi text-lowercase" data-colname="RECORD BY:">Pay System</td>
			                    <td class="h7 font-weight-midi" data-colname="DATE:">20/05/2020</td>
			                    <td>
			                        <div class="dropdown">
			                            <a class="btn btn-outline-secondary btn-xs rounded" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</a>
			                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3 " aria-labelledby="dropdownMenuLink">

			                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
			                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Block</a>

			                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
			                                 data-toggle="modal" data-target="#email-modal"
			                                 href="#">Email</a>                                            
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
	</div>
</template>

<script>
// components
import PaginationLinks from '@/components/PaginationLinks'
import LinePreload from '@/components/LinePreload'
import ErrorReload from '@/components/ErrorReload'
import EmptyList from '@/components/EmptyList'

// library:vue
import { reactive, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// composables
import usePaginate from '@/composables/usePaginate'
import useCheckBox from '@/composables/useCheckBox'
import useErrorReloadState from '@/composables/useErrorReloadState'

// apis
import Student from '@/apis/Student';

export default {
	name: 'StudentFeeTransaction',
	components: {
		PaginationLinks,
		LinePreload,
		ErrorReload,
		EmptyList
	},

	setup() {
		const route = useRoute()

		const loadingState = reactive({
			loading: false, loaded: false,
		})

		const { errState, setReloadStates } = useErrorReloadState()

		// paginate fetched data
        const paginate = ref({
            currentPage: null,
            nextPage: false,
            prevPage: false,
            totalPage: null,
            pagesLength: null,
        })

        // navigate the fees list
        const feeTransactionsToPage = ref('')

        const navigate = async (event) => {
            let toPage = event.currentTarget.attributes.id.value;
            settledFeesToPage.value = toPage
            await fetchGuardians()
        }

        // fetch fee transactions related to student
        const feeTransactions = ref([])

        const feeSearch = ref('')

        const fetchFeeTransactions = async () => {
        	loadingState.loading = true
        	const studentId = route.params.studentId;

        	const request = {id: studentId, page: feeTransactionsToPage.value }

        	if (feeSearch.value.length > 0)
        		request['search'] = feeSearch.value

        	await Student.studentFees(request)
        	.then((res) => {
                feeTransactions.value = res.data.data

                const { paging } = usePaginate(res);
                paginate.value = { ...paginate.value, ...paging }
                
                loadingState.loading = false;
                loadingState.loaded = true;
            })
            .catch((err) => {
                setReloadStates(err)
                loadingState.loading = false
            })
        }

        // oncreated fetch fee transaction
        fetchFeeTransactions()

        const searchFeeTransaction = async () => await fetchFeeTransactions()

        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }

        const { 
            selectedCheckBoxes: selectedFeeTransactions, 
            checkAll, checkOne, checkBoxElements, 
            checkAllCheckBox
        } = useCheckBox();

        return {
        	loadingState, errState, paginate, navigate, 
            feeTransactions, fetchFeeTransactions, 
            feeSearch, searchFeeTransaction,
        	selectedFeeTransactions, checkAll, 
            checkOne, checkBoxElements, 
            checkAllCheckBox, tableRowToggle
        }
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/table/table768';

.table tr > td,
.table tr > td {
    word-break: break-word !important;
    word-wrap: break-word !important;
}

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
        font-size: 11px;
        font-weight: 700;
        color: #666;
        overflow: hidden;
        width: 32%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

</style>
