<template>
	<BaseAdmin>
        <template v-slot:header>
        	<header class="bg-white">
                <div class="container-lg py-2 py-sm-3">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="font-weight-midi text-muted">Mail</div>
                        </div>
                        <div class="">
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
            <div class="row justify-content-center">
                <div class="col-sm-11 col-md-9 col-lg-9">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header px-2 px-sm-3">
                            <small>Mail Recipient</small>
                        </div>
                        <div class="card-body px-2 px-sm-3">
                            <form action="" method="POST">
                                <div class="row">
                                    <div class="col-sm-6 col-md-6">
                                        <div class="form-group">
                                            <label class="small mb-0">Recipient Type</label>
                                            <select class="custom-select" required="">
                                                <option value="">Students</option>
                                                <option value="">Staffs</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-6">
                                        <div class="form-group">
                                            <label class="small mb-0">Email Subject</label>
                                            <input type="text" class="form-control" placeholder="Subject">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 col-md-6">
                                        <div class="form-group">
                                            <label class="small mb-0">Class Arm</label>
                                            <select class="custom-select" required="">
                                                <option value="">JS2 - GOLD</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control" rows="5" required=""></textarea>
                                </div>

                                <div class="form-group">
                                    <button class="btn btn-outline-secondary">Send Mail</button>
                                </div>
                            </form>
                        </div>
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
