<template>
	<div>
		<line-preload :loading="loadingState.loading"></line-preload>

        <div class="min-100">
			<div v-if="loadingState.loaded && settledFees.length <= 0" class="text-center mb-3 mt-3">
	            <div class="me-2 me-sm-3 text-muted p-0 m-0" style="font-size:47px;">
	                <i class="icon icon-assignment icon-lg p-0 m-0"></i>
	            </div>
	            <div class="h7 text-center text-muted mt-n1">No fee has been settled by student</div>
	        </div>

			<div v-show="settledFees.length >= 1">
				<div v-if="selectedSettledFees.length > 0" class="d-flex justify-content-between px-2 mt-2 mb-2">
					<div class="text-dark small font-weight-midi d-inline-flex mt-1">
		                {{selectedSettledFees.length}} fee(s) selected
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
		                                <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="form-check-input" id="sb-checkall-22" />
		                                <label class="form-check-label" for="sb-checkall-22"></label>
		                            </div>
			                    </th>
			                    <th>FEE HEAD/DESC</th>
			                    <th>AMOUNT</th>
			                    <th>PAID</th>
			                    <th>UNPAID</th>
			                    <th>STATUS</th>
			                    <th>DATE </th>
			                    <th></th>
			                </tr>
			            </thead>
			            <tbody>
			                <tr v-for="(fee, key) in settledFees" :key="key" class="table-row">
			                    <th>
			                        <div class="form-check-lg form-check">
		                                <input type="checkbox" class="form-check-input" 
		                                    :ref="el => checkBoxElements[key] = el" 
		                                    :checked="selectedSettledFees.includes(fee.invoiced_fee_id.toString())" 
		                                    @click="checkOne($event)" :id="fee.invoiced_fee_id">
		                                <label class="form-check-label" :for="fee.invoiced_fee_id"></label>
		                            </div>
			                    </th>
			                    <td>
			                        <div class="d-flex justify-content-between">
			                            <div class="me-4 p-0">
			                                <span>
			                                	<a href="#" class="h7 mt-n3 text-decoration-none text-dark text-break font-weight-midi">
				                                	Tuition Fee
				                                </a>
			                                </span>
			                                <div class="small text-muted text-wrap text-break">John tuition Fee 2019/2020 First Term</div>
			                            </div>
			                            <a class="row-toggle text-decoration-none ms-2" @click="tableRowToggle($event)"></a>
			                        </div>
			                    </td>
			                    <td class="h7 font-weight-midi" data-colname="AMOUNT:">20000</td>
			                    <td class="h7 font-weight-midi" data-colname="PAID:">20000</td>
			                    <td class="h7 font-weight-midi" data-colname="UNPAID:">20000</td>
			                    <td class="h7 font-weight-midi text-lowercase" data-colname="STATUS:">Settled</td>
			                    <td class="h7 font-weight-midi text-capitalize" data-colname="DATE:">20/05/2020</td>
			                    <td>
			                        <div class="dropdown">
			                            <a class="btn btn-outline-secondary btn-xs rounded" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</a>
			                            <div class="dropdown-menu dropdown-menu-right border-0 shadow m-0 py-3">

			                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
			                                 data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Block</a>

			                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
			                                 data-bs-toggle="modal" data-bs-target="#email-modal"
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
import PaginationLinks from '@/components/PaginationLinks';
import LinePreload from '@/components/LinePreload';

// library:vue
import { reactive, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// composables
import usePaginate from '@/composables/usePaginate'
import useCheckBox from '@/composables/useCheckBox'

// apis
import Student from '@/apis/Student';

export default {
	name: 'StudentSettledFee',
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
        const settledFeesToPage = ref('')

        const navigate = async (event) => {
            let toPage = event.currentTarget.attributes.id.value;
            settledFeesToPage.value = toPage;
            await fetchGuardians();
        }

        // fetch settled fees related to student
        const settledFees = ref([])

        const fetchSettledFees = () => {
        	loadingState.loading = true
        	const studentId = route.params.studentId;

        	Student.studentFees({ id: studentId, page: settledFeesToPage.value })
        	.then((res) => {
                settledFees.value = res.data.data

                const { paging } = usePaginate(res);
                paginate.value = { ...paginate.value, ...paging }
                
                loadingState.loading = false;
                loadingState.loaded = true;
            })
            .catch((err) => {
                console.log(err.response)
            })
        }

        onMounted(async () => await fetchSettledFees())

        const tableRowToggle = (event) => {
            event.target.closest('.table-row').classList.toggle('is-expanded');
        }

        const { 
            selectedCheckBoxes: selectedSettledFees, 
            checkAll, checkOne, checkBoxElements, 
            checkAllCheckBox
        } = useCheckBox();

        return {
        	loadingState, paginate, navigate, settledFees, selectedSettledFees,
        	checkAll, checkOne, checkBoxElements, checkAllCheckBox, tableRowToggle
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

    #toggle-table .table tbody > tr > td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(8)):before {
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

.settled { 
    color:  #009900; 
}

.waived { 
    color: #ff3300;  
}
</style>
