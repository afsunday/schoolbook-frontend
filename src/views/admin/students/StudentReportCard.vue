<template>
	<div>
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white pr-2 pl-1 pb-0 pt-1">
                <ul class="nav nav-pills mt-2">
                    <li class="nav-item">
                        <a class="nav-link pl-2 pb-sm-3 pb-3 active" aria-selected="true">Report Card</a>
                    </li>
                </ul>
            </div>

    		<div v-if="selectedCheckBox.length > 0" class="d-flex justify-content-between px-2 mt-3 mb-2">
    			<div class="text-dark small font-weight-midi d-inline-flex mt-1">
                    {{selectedCheckBox.length}} student(s) selected
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

            <div class="card-body px-0 pt-0">
        		<div id="toggle-table">
        	        <table class="table table-striped">
        	            <thead class="small-xs font-weight-midi text-muted bg-white">
        	                <tr>
        	                    <th class="wd-30">
        	                        <input type="checkbox" @click="selectAll($event)" class="logic-checkbox" name="">
        	                    </th>
        	                    <th>DESC</th>
        	                    <th>SESSION</th>
        	                    <th>STATUS</th>
        	                    <th>DATE</th>
        	                    <th></th>
        	                </tr>
        	            </thead>
        	            <tbody>
        	                <tr v-for="(fee, key) in activeFees" :key="key" class="table-row">
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
        	                                <span><a href="#" class="h7 text-decoration-none text-primary font-weight-midi">John tuition Fee 2019/2020 First Term</a></span>
        	                            </div>
        	                            <a class="row-toggle text-decoration-none ml-2" @click="collapseRow($event)"></a>
        	                        </div>
        	                    </td>
        	                    <td class="h7 font-weight-midi" data-colname="SESSION:">20000</td>
        	                    <td class="h7 font-weight-midi" data-colname="STATUS:">20000</td>
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
            </div>
        </div>
	</div>
</template>

<script>
export default {
	name: 'StudentReportCard',
	data() {
		return {
			selectedCheckBox: [],
			activeFees: [1, 2, 3]
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

	}
}
</script>

<style lang="scss" scoped>

@import '@/assets/scss/table/table700';

@media (max-width: 700px) {
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
