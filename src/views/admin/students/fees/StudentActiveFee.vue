<template>
	<div>
		<line-preload :loading="loadingState.loading"></line-preload>

        <div class="min-100">
        	<error-reload :hasError="errState.hasError" :netError="errState.netError" :reqError="errState.reqError" 
				@retry="e => {errState.reqError = errState.netError = errState.hasError = false; fetchActiveFees()}">
			</error-reload>

        	<empty-list :loaded="loadingState.loaded" :items="activeFees" :errState="errState.hasError">
        		This student doesn't have an active fee.
        	</empty-list>

	        <div v-show="activeFees.length >= 1">
				<div v-if="selectedActiveFees.length > 0" class="d-flex justify-content-between px-2 mt-2 mb-2">
					<div class="text-dark small font-weight-midi d-inline-flex mt-1">
		                {{selectedActiveFees.length}} fee(s) selected
		            </div>

					<div class="dropdown">
		                <a class="btn btn-secondary btn-sm small-xs text-nowrap mb-1 me-0 me-sm-1" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
		                <div class="dropdown-menu dropdown-menu-right  border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

		                    <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
		                     data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Pay Selected</a>

		                    <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
		                     data-bs-toggle="modal" data-bs-target="#email-modal"
		                     href="#">Unassign</a>                    
		                </div>
		            </div>            
		        </div>

				<div id="toggle-table">
			        <table class="table table-striped">
			            <thead class="small-xs font-weight-midi text-muted bg-white">
			                <tr>
			                    <th class="wd-30">
			                        <div class="form-check-lg form-check">
		                                <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="form-check-input" id="sb-checkall-33" />
		                                <label class="form-check-label" for="sb-checkall-33"></label>
		                            </div>
			                    </th>
			                    <th>FEE HEAD/DESC</th>
			                    <th>AMOUNT</th>
			                    <th>DISCOUNT</th>
			                    <th>PAYBASIS</th>
			                    <th>PAID</th>
			                    <th>DUE</th>
			                    <th>DATE</th>
			                    <th></th>
			                </tr>
			            </thead>
			            <tbody>
			                <tr v-for="(fee, key) in activeFees" :key="key" class="table-row">
			                    <th class="wd-30">
					                <div class="form-check-lg form-check">
		                                <input type="checkbox" class="form-check-input" 
		                                    :ref="el => checkBoxElements[key] = el" 
		                                    :checked="selectedActiveFees.includes(fee.invoiced_fee_id.toString())" 
		                                    @click="checkOne($event)" :id="fee.invoiced_fee_id">
		                                <label class="form-check-label" :for="fee.invoiced_fee_id"></label>
		                            </div>
			                    </th>
			                    <td>
			                        <div class="d-flex justify-content-between">
			                            <div class="me-4">
			                                <span>
			                                	<a href="#" class="h7 text-decoration-none text-dark text-break font-weight-midi">
				                                	{{ fee.fee_headname }}
				                                </a>
			                                </span>
			                                <h6 class="small text-muted text-wrap text-break">{{ fee.description }}</h6>
			                            </div>
			                            <a class="row-toggle text-decoration-none ms-2" @click="tableRowToggle($event)"></a>
			                        </div>
			                    </td>
			                    <td class="h7 font-weight-midi" data-colname="AMOUNT:">{{ fee.amount }}</td>
			                    <td class="h7 font-weight-midi" data-colname="DISCOUNT:">{{ fee.discount }}</td>
			                    <td class="h7 font-weight-midi" data-colname="PAYBASIS:">{{ !!fee.installment ? 'available' : 'unavailable' }}</td>
			                    <td class="h7 font-weight-midi" data-colname="PAID:">{{ fee.paid_amount }}</td>
			                    <td class="h7 font-weight-midi" data-colname="DUE:">{{ fee.due_amount }}</td>
			                    <td class="h7 font-weight-midi" data-colname="DATE:">20/05/2020</td>
			                    <td>
			                        <div class="dropdown">
			                            <a class="btn btn-outline-secondary btn-xs rounded" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Action</a>
			                            <div class="dropdown-menu dropdown-menu-end border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">

			                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
			                                 data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">cashpay</a>

			                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
			                                 data-bs-toggle="modal" data-bs-target="#email-modal"
			                                 href="#">webpay</a>                                            
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
	name: 'StudentActiveFee',
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
        const activeFeesToPage = ref('')

        const navigate = async (event) => {
            let toPage = event.currentTarget.attributes.id.value;
            activeFeesToPage.value = toPage;
            await fetchGuardians();
        }

        // fetch fees related to student
        const activeFees = ref([])

        const fetchActiveFees = async () => {
        	loadingState.loading = true
        	const studentId = route.params.studentId;

        	await Student.studentFees({ 
        		id: studentId, page: activeFeesToPage.value 
        	}).then((res) => {
                activeFees.value = res.data.data

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

        // oncreate make request
        fetchActiveFees()

        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }

        const { 
            selectedCheckBoxes: selectedActiveFees, 
            checkAll, checkOne, checkBoxElements, 
            checkAllCheckBox
        } = useCheckBox();

		return {
			loadingState, paginate, navigate, fetchActiveFees, activeFees, 

			selectedActiveFees, checkAll, checkOne, checkAllCheckBox, errState,
			
			checkBoxElements, tableRowToggle
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

    #toggle-table .table tbody > tr > td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(9)):before {
        content: attr(data-colname);
        display: -ms-inline-flexbox !important;
        display: inline-flex !important;
        margin-right: 15px;
        font-size: 11px;
        font-weight: 700;
        color: #666;
        overflow: hidden;
        width: 32%;
        min-width: 14%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

</style>