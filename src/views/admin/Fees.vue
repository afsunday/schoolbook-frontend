<template>
	<BaseAdmin>
        <template v-slot:header>
        	<header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="font-weight-midi text-muted">Fees</div>
                        </div>
                        <div class="">
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                    <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                     data-toggle="modal" data-target="#deactivate-modal" href="#">Achived Fees</a>

                                    <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                     data-toggle="modal" data-target="#email-modal"
                                     href="#">Trashed Fees</a>

                                    <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                     data-toggle="modal" data-target="#invoice-modal">Add Fee</a>
                                </div>
                            </div>
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
                <div class="card-header bg-white d-flex justify-content-between border-bottom-0 rounded-lg px-2">
                    <div class=" mr-auto">
                        <div class="input-group input-group-solid">
                            <div class="input-group-prepend">
                                <div class="input-group-text bg-light">
                                    <a href="" class="dropdown-toggle text-dark text-decoration-none small" data-toggle="modal" data-target="#staticFilterForm">
                                        <i class="fas fa-filter fa-sm"></i><span class="d-none d-sm-inline"> Filter</span>
                                    </a>
                                </div>
                            </div>
                            <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </div>

                <div class="card-body px-0 pt-0">
                    <div class="" id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th class="wd-30">
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="45">
                                            <label class="custom-control-label" for="45"></label>
                                        </div>
                                    </th>
                                    <th>FEE NAME</th>
                                    <th>AMOUNT</th>
                                    <th>PAYBASIS</th>
                                    <th>SESSION/T</th>
                                    <th>DURATION</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="small font-weight-midi">
                                <tr v-for="(fee, id) in fees" :key="id" class="table-row">
                                    <th class="wd-30">
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="45">
                                            <label class="custom-control-label" for="45"></label>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="d-inline-flex w-75"><span class="text-break overflow-auto">Afuwape sunday</span></div>
                                        <a class="row-toggle text-decoration-none" @click="collapseRow($event)"></a>
                                    </td>
                                    <td data-colname="AMOUNT">20000</td>
                                    <td data-colname="PAYBASIS">Installment</td>
                                    <td data-colname="SESSION:">2019/2020 First Term</td>
                                    <td data-colname="DURATION:">08/10/2020</td>
                                    <td>
                                        <div class="dropdown">
                                            <a class="btn btn-outline-secondary btn-xs rounded" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</a>
                                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3 " aria-labelledby="dropdownMenuLink">

                                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Block</a>

                                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                                 data-toggle="modal" data-target="#email-modal"
                                                 href="#">Email</a>

                                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                                 data-toggle="modal" data-target="#invoice-modal">Invoice</a>
                                            </div>
                                        </div>
                                    </td>
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
import BaseAdmin from '@/views/admin/shared/BaseAdmin'

export default {
  name: 'Fees',
  components: {
    BaseAdmin
  },
  data () {
  	return {
  		fees: [1, 2, 3, 5, 6, 7, 8]
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
#toggle-table .table {
    table-layout: fixed;
}

@media only screen and (max-width: 700px) {

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
        margin-top: -8px;
        margin-right: 14px;
        right: 0 !important;
        padding-left: 5px;
    }

    #toggle-table .table tbody > tr.is-expanded .row-toggle:before {
        display: inline-block;
        content: '-';
        font-size: 28px;
        margin-top: -15px;
        margin-right: 14px;
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
        font-size: 85%;
        font-weight: 700;
        color: #666;
        overflow: hidden;
        width: 32%;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

}
</style>
