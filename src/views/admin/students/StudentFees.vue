<template>
    <div class="px-0">
        <div class="card border-0 shadow-sm mt-1 mt-sm-2">
            <div class="card-header bg-white py-0 px-2">
                <div class="p-0" style="overflow-x: auto;">
                    <ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link pl-1 pb-sm-3 pb-3 active" id="pills-active-fee-tab" data-toggle="pill" href="#pills-active-fee" role="tab" aria-controls="pills-bio" aria-selected="true">Active</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" id="pills-inactive-fee-tab" data-toggle="pill" href="#pills-inactive-fee" role="tab" aria-controls="pills-fees" aria-selected="false">Settled</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" id="pills-transaction-tab" data-toggle="pill" href="#pills-transaction" role="tab" aria-controls="pills-attendance" aria-selected="false">Transactions</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-body px-0 pt-0">
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active px-0" id="pills-active-fee" role="tabpanel" aria-labelledby="pills-active-fee-tab">
                        <student-active-fee></student-active-fee>
                    </div>

                    <div class="tab-pane fade px-0" id="pills-inactive-fee" role="tabpanel" aria-labelledby="pills-inactive-fee-tab">
                        <student-settled-fee></student-settled-fee>
                    </div>

                    <div class="tab-pane fade px-0" id="pills-transaction" role="tabpanel" aria-labelledby="pills-transaction-tab">
                        <student-fee-transaction></student-fee-transaction>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
// components
import StudentActiveFee from '@/views/admin/students/StudentActiveFee';
import StudentSettledFee from '@/views/admin/students/StudentSettledFee';
import StudentFeeTransaction from '@/views/admin/students/StudentFeeTransaction';

export default {
    name: 'StudentFees',
    components: {
        StudentActiveFee,
        StudentSettledFee,
        StudentFeeTransaction,
    }
}
</script>

<style scoped>

.rounded-right-lg {
  border-top-right-radius: 0.35rem;
  border-bottom-right-radius: 0.35rem;
}

.rounded-top-lg {
  border-top-left-radius: 0.35rem;
  border-top-right-radius: 0.35rem;
}

.min-100 {
    min-height: 100px;
}

.table tr:last-child {
    border-bottom: 1px solid #dee2e6;
}

.table tr > td,
.table tr > td {
    word-break: break-word !important;
    word-wrap: break-word !important;
}

#toggle-table .table thead > tr > th:first-child,
#toggle-table .table tbody > tr > th {
    padding-right: 0px;
    width: 10px;
}

@media only screen and (max-width: 768px) {

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

    #toggle-table .table thead > tr > th:first-child,
    #toggle-table .table tbody > tr > th {
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
