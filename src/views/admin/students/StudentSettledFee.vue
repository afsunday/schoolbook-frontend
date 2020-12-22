<template>
	<div>
		<line-preload :loading="loading"></line-preload>
		<div class="card-header pb-2 bg-white d-flex justify-content-between px-2">
            <div class="mr-auto">
                <div class="input-group">
                    <input class="form-control" type="search" @keyup.enter="applyFilter()" v-model="filter.search" placeholder="Search">
                </div>
            </div>
        </div>

		<div v-if="selectedCheckBox.length > 0" class="d-flex justify-content-between px-2 mt-2 mb-2">
			<div class="text-dark small font-weight-midi d-inline-flex mt-1">
                {{selectedCheckBox.length}} fee(s) selected
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
	                        <input type="checkbox" @click="selectAll($event)" class="logic-checkbox" name="">
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
	                    <th class="wd-30">
	                        <input type="checkbox" 
			                       :id="key" ref="activeFeeCheckBox" 
			                       @click="checked($event)" 
			                       :checked="selectedCheckBox.includes(key.toString())" 
			                       class="logic-checkbox" name="">
	                    </th>
	                    <td>
	                        <div class="d-flex justify-content-between">
	                            <div class="mr-4">
	                                <span><a href="#" class="h7 text-decoration-none text-dark font-weight-midi">Tuition Fee</a></span>
	                                <div class="small text-muted text-wrap">John tuition Fee 2019/2020 First Term</div>
	                            </div>
	                            <a class="row-toggle text-decoration-none ml-2" @click="collapseRow($event)"></a>
	                        </div>
	                    </td>
	                    <td class="h7 font-weight-midi" data-colname="AMOUNT:">20000</td>
	                    <td class="h7 font-weight-midi" data-colname="PAID:">20000</td>
	                    <td class="h7 font-weight-midi" data-colname="UNPAID:">20000</td>
	                    <td class="h7 font-weight-midi" data-colname="STATUS:">Settled</td>
	                    <td class="h7 font-weight-midi text-capitalize" data-colname="DATE:">20/05/2020</td>
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

	    <!-- pagination -->
	    <pagination-links :list-total-page="totalPage" :list-current-page="currentPage" :list-prev-page="prevPage" :list-next-page="nextPage" 
	    :list-pages-length="pagesLength" @changePage="changePage($event)"></pagination-links>

	</div>
</template>

<script>
import PaginationLinks from '@/components/PaginationLinks';
import LinePreload from '@/components/LinePreload';

export default {
	name: 'StudentSettledFee',
	components: {
		PaginationLinks,
		LinePreload
	},

	data() {
		return {
			loading: false,
			selectedCheckBox: [],
			settledFees: [1, 2, 3],
			currentPage: null,
		    nextPage: false,
		    prevPage: false,
		    totalPage: null,
		    pagesLength: null,
		    filter: {
		    	search: ''
		    }
		}
	},

	methods: {
		collapseRow (event) {
            event.target.closest('.table-row').classList.toggle('is-expanded')
        },

        checked(event) {
            let checkBox = event.currentTarget.getAttribute('id');
	        if (event.currentTarget.checked) {
	            this.selectedCheckBox.push(checkBox);
	        } else {
	            let index =  this.selectedCheckBox.indexOf(checkBox);
	            if (index > -1) {
	                this.selectedCheckBox.splice(index, 1);
	            }
	        } 
        },

        selectAll(event) {
	        let boxes = this.$refs.activeFeeCheckBox;

	        if(event.currentTarget.checked) {
	            boxes.forEach((item) => {
	                let checkbox = item.getAttribute('id');
	                let index =  this.selectedCheckBox.indexOf(checkbox);
	                if (index <= -1) {
	                    this.selectedCheckBox.push(checkbox);
	                } 

	            })
	        } else {
	            boxes.forEach((item) => {
	                let checkbox = item.getAttribute('id');
	                let index =  this.selectedCheckBox.indexOf(checkbox);
	                if (index > -1) {
	                    this.selectedCheckBox.splice(index, 1);
	                }
	            })
	        }
	    },

	    applyFilter() {
	    	//
	    }

	}
}
</script>

<style scoped>

.table tr:last-child {
    border-bottom: 1px solid #dee2e6;
}

.settled { 
    color:  #009900; 
}

.waived { 
    color: #ff3300;  
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
