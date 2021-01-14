<template>
	<BaseAdmin>
        <template v-slot:header>
        	<header class="bg-white">
	            <div class="container-lg py-2 py-sm-3">
	                <div class="d-flex justify-content-between">
	                    <div class="">
	                        <div class="font-weight-midi text-muted">Subjects</div>
	                    </div>
	                    <div class="">
	                        <button class="btn btn-outline-secondary btn-sm">Add</button>
	                    </div>
	                </div>
	            </div>
	        </header>
        </template>

		<div class="row">
            <div class="col-md-8 col-lg-8 col-xl-8">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white d-flex align-items-start border-bottom-0 rounded-lg px-2">
                        <div class="h6"><i class="fas fa-check-circle"></i> Subjects</div>
                    </div>
                    <div class="card-body px-0 pt-0">
                        <div class="" id="toggle-table">
                            <table class="table table-striped table-hover" width="100%" cellspacing="0">
                                <thead class="small-xs font-weight-midi text-muted">
                                    <tr class="" id="collapseAll">
                                        <th class="wd-30">
                                            <button class="row-toggle"></button>
                                            <div class="custom-control-lg custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="01">
                                                <label class="custom-control-label" for="01"></label>
                                            </div>
                                        </th>
                                        <th>NAME</th>
                                        <th>LEVEL</th>
                                        <th>REGISTRANTS</th>
                                    </tr>
                                </thead>
                                <tbody class="small">
                                    <tr v-for="(subject, key) in subjects" :key="key" class="table-row is-expanded">
                                        <td class="wd-30">
                                            <button class="row-toggle" @click="collapseRow($event)"></button>
                                            <div class="custom-control-lg custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="02">
                                                <label class="custom-control-label" for="02"></label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex">
                                                <img src="assets/img/noimage.jpg" class="rounded mr-2 border" width="35" height="35">
                                                <div class="text-break overflow-auto">further Mathematics </div>
                                            </div>
                                        </td>
                                        <td data-colname="LEVEL:" >Senior</td>
                                        <td data-colname="REGISTRANTS:" >30</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div><!--/.row-->

	</BaseAdmin>
</template>

<script>
import BaseAdmin from '@/views/admin/shared/BaseAdmin'

export default {
  name: 'Subjects',
  components: {
    BaseAdmin
  },
  data () {
    return {
      subjects: [1, 2, 3]
    }
  },
  methods: {
    collapseRow (event) {
	  		event.target.closest('.table-row').classList.toggle('is-expanded')
	  	}
  }
}
</script>

<style scoped>
#toggle-table .table tbody > tr.table-row .row-toggle,
#toggle-table .table thead > tr > th:first-child > .row-toggle {
    display: none;
}

#toggle-table  .table {
    table-layout: fixed;
}

@media only screen and (max-width: 480px) {

    #toggle-table  .table tr > th {
        padding-top: 0.6rem !important;
        padding-bottom: 0.6rem !important;
    }

    #toggle-table  .table tr > th:first-child,
    #toggle-table  .table tr > td:first-child {
       padding-right: 1.1rem;
    }

    #toggle-table  .table thead tr > th:not(:nth-child(1)):not(:nth-child(2)),
    #toggle-table .table tbody > tr.table-row > td:not(:nth-child(1)):not(:nth-child(2)) {
        display: none;
    }

    #toggle-table .table tbody > tr.table-row > td:first-child,
    #toggle-table  .table thead tr > th:first-child {
        position: relative !important;
        padding-left: 3.5rem !important;
        cursor: pointer !important;
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

    #toggle-table .table tbody > tr.table-row .row-toggle::before {
        content: "+";
        color: #7c8088;
        font-size: 26px;
        font-weight: 500;
    }

    #toggle-table .table tbody > tr.table-row > td:not(:nth-child(1)):not(:nth-child(2))::before {
        content: attr(data-colname);
        margin-right: 15px;
        font-size: 85%;
        font-weight: 700;
        color: #666;
        overflow: hidden;
        width: 32%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #toggle-table   .table tbody tr.is-expanded > td:not(:nth-child(1)) {
        display: block !important;
    }

    #toggle-table   .table tbody tr:first-child.is-expanded > td:nth-child(2) {
        border-top: 0px !important;
    }

    #toggle-table   .table tbody tr.is-expanded > td:nth-child(2) {
        margin-top: -1px !important;
    }

    #toggle-table   .table tbody tr.is-expanded > td:not(:nth-child(1)):not(:nth-child(2)) {
        margin-left: -18px;
        padding-left: 2px !important;
    }

    #toggle-table   .table tbody tr.is-expanded > td > button.row-toggle::before {
        content: "-" !important;
        display: inline-block;
        color: #7c8088;
        font-size: 38px;
        font-weight: 500;
    }

}
</style>
