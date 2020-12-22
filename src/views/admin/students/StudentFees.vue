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

                    <div class="tab-pane fade" id="pills-inactive-fee" role="tabpanel" aria-labelledby="pills-inactive-fee-tab">
                        <student-settled-fee></student-settled-fee>
                    </div>

                    <div class="tab-pane fade" id="pills-transaction" role="tabpanel" aria-labelledby="pills-transaction-tab">
                        <student-fee-transaction></student-fee-transaction>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
import StudentActiveFee from '@/views/admin/students/StudentActiveFee';
import StudentSettledFee from '@/views/admin/students/StudentSettledFee';
import StudentFeeTransaction from '@/views/admin/students/StudentFeeTransaction';

export default {
    name: 'StudentFees',
    components: {
        StudentActiveFee,
        StudentSettledFee,
        StudentFeeTransaction,
    },

    props: {},
    
    data() {
        return {
            //
        }
    },

    methods: {
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

.table tr:last-child {
    border-bottom: 1px solid #dee2e6;
}
</style>
