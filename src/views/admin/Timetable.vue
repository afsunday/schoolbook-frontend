<template>
	<BaseAdmin>
        <template v-slot:header>
        	<header class="bg-white">
                <div class="container-lg py-2 py-sm-3">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="font-weight-midi text-muted">Timetable</div>
                        </div>
                        <div class="">
                            <button class="btn btn-outline-secondary btn-sm">Add</button>
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
            <div class="d-flex justify-content-between">
                <div class="text-dark small font-weight-midi mt-2">
                    <i class="fas fa-check-square"></i>
                    1 student selected
                </div>
                <div class="dropdown">
                    <a class="btn btn-secondary btn-sm font-weight-midi small-xs text-nowrap mb-1" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
                    <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                        <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                         data-toggle="modal" data-target="#deactivate-modal" href="#">Block</a>

                        <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                         data-toggle="modal" data-target="#email-modal"
                         href="#">Email</a>

                        <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                         data-toggle="modal" data-target="#invoice-modal">Invoice</a>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm mt-1 mt-sm-2">
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
                                    <th>DESCRIPTION</th>
                                    <th>CLASS ARM</th>
                                    <th>TYPE</th>
                                    <th>START DATE</th>
                                    <th>END DATE</th>
                                </tr>
                            </thead>
                            <tbody class="small">
                                <tr v-for="(table, key) in timetable" :key="key" class="table-row">
                                    <td class="wd-30">
                                        <button class="row-toggle" @click="collapseRow($event)"></button>
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="02">
                                            <label class="custom-control-label" for="02"></label>
                                        </div>
                                    </td>
                                    <td>Week one </td>
                                    <td data-colname="CLASS ARM;">JS2 - GOLD</td>
                                    <td data-colname="TYPE:">Senior</td>
                                    <td data-colname="START DATE:">08/10/2020</td>
                                    <td data-colname="END DATE:">08/10/2020</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>

	</BaseAdmin>
</template>

<script>
import BaseAdmin from '@/views/layouts/BaseAdmin.vue'

export default {
  name: 'Timetable',
  components: {
    BaseAdmin
  },
  data () {
  	return {
  		timetable: [1, 2, 3]
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

@media only screen and (max-width: 567px) {

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

    #toggle-table .table tbody > tr.table-row .row-toggle::before/*,
    #toggle-table .table thead > tr > th:first-child .row-toggle::before*/ {
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

    #toggle-table   .table tbody tr.is-expanded > td > button.row-toggle::before/*,
    #toggle-table   .table thead tr.collapse-all > th > button.row-toggle::before*/ {
        content: "-" !important;
        display: inline-block;
        color: #7c8088;
        font-size: 38px;
        font-weight: 500;
    }

}
</style>
