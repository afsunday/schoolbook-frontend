<template>
	<div>
		<line-preload :loading="loadingState.loading"></line-preload>
		
        <div class="min-100">
			<div v-if="loadingState.loaded && feeTransactions.length <= 0" class="text-center mb-3 mt-3">
	            <div class="mr-2 mr-sm-3 text-muted p-0 m-0" style="font-size:47px;">
	                <i class="icon icon-assignment icon-lg p-0 m-0"></i>
	            </div>
	            <div class="h7 text-center text-muted mt-n1">No fee transaction for student</div>
	        </div>

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
		                                <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="custom-control-input" id="sb-checkall" />
		                                <label class="custom-control-label" for="sb-checkall"></label>
		                            </div>
			                    </th>
			                    <th>FEE RECEIPT/NAME</th>
		                        <th>TRANX AMOUNT</th>
		                        <th>PAY METHOD</th>
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
			                            <div class="mr-4">
			                                <span><a href="#" class="h7 text-decoration-none text-primary text-uppercase font-weight-midi">RSB4521782</a></span>
			                                <div class="small text-muted text-wrap text-capitalize">John tuition Fee 2019/2020 First Term</div>
			                            </div>
			                            <a class="row-toggle text-decoration-none ml-2" @click="tableRowToggle($event)"></a>
			                        </div>
			                    </td>
			                    <td class="h7 font-weight-midi" data-colname="AMOUNT:">20000</td>
			                    <td class="h7 font-weight-midi text-capitalize" data-colname="PAY METHOD:">Webpay</td>
			                    <td class="h7 font-weight-midi text-capitalize" data-colname="RECORD BY:">Pay System</td>
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

// library:vue
import { reactive, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// composables
import usePaginate from '@/composables/usePaginate'
import useCheckBox from '@/composables/useCheckBox'

// apis
import Student from '@/apis/Student';

export default {
	name: 'StudentFeeTransaction',
	components: {
		PaginationLinks,
		LinePreload
	},

	setup() {
		const route = useRoute()

		const loadingState = reactive({
			loading: false, loaded: false,
		})

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
            settledFeesToPage.value = toPage;
            await fetchGuardians();
        }

        // fetch settled fees related to student
        const feeTransactions = ref([])

        const feeSearch = ref('')

        const fetchFeeTransactions = () => {
        	loadingState.loading = true
        	const studentId = route.params.studentId;

        	const request = {id: studentId, page: feeTransactionsToPage.value }

        	if (feeSearch.value.length > 0)
        		request['search'] = feeSearch.value

        	Student.studentFees(request)
        	.then((res) => {
                feeTransactions.value = res.data.data

                const { paging } = usePaginate(res);
                paginate.value = { ...paginate.value, ...paging }
                
                loadingState.loading = false;
                loadingState.loaded = true;
            })
            .catch((err) => {
                console.log(err.response)
            })
        }

        onMounted(async () => await fetchFeeTransactions())

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
        	loadingState, paginate, navigate, feeTransactions, feeSearch, searchFeeTransaction,
        	selectedFeeTransactions, checkAll, checkOne, checkBoxElements, checkAllCheckBox, tableRowToggle
        }
	}
}
</script>

<style scoped>
.min-100 {
	min-height: 100px;
}

.table tr:last-child {
    border-bottom: 1px solid #dee2e6;
}

#toggle-table .table thead > tr > th:first-child,
#toggle-table .table tbody > tr > th {
    padding-right: 0px;
    width: 10px !important;
}

@media only screen and (max-width: 700px) {

    #toggle-table .table {
        table-layout: fixed;
    }

    #toggle-table  .table thead tr > th:not(:nth-child(1)):not(:nth-child(2)),
    #toggle-table  .table tbody tr > td:not(:nth-child(1)):not(:nth-child(2)) {
        display: none;
    }

    #toggle-table  .table tbody tr:first-child > td:nth-child(2) {
       border-top: 0px !important;
    }

    #toggle-table  .table tr > th:first-child,
    #toggle-table  .table tr > td:first-child {
       padding-right: 1.5rem;
    }

    #toggle-table  .table tbody tr.is-expanded > td:not(:nth-child(1)) {
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

    #toggle-table .table tbody > tr.is-expanded > td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(6)) {
        padding-bottom: 5px;
        padding-top: 5px;
    }

    #toggle-table .table tbody > tr > td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(6)):before {
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
