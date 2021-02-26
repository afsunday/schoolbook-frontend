<template>
	<BaseAdmin>
        <template v-slot:header>
        	<header class="bg-white">
                <div class="container-lg py-2 py-sm-3">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="font-weight-midi text-muted">Classes</div>
                        </div>
                        <div class="">
                            <button class="btn btn-outline-secondary btn-sm">Add</button>
                        </div>
                    </div>
                </div>
            </header>
        </template>

		<div class="row">

            <div class="col-xl-4 col-md-4 col-sm-5 mb-2">
                <div class="card px-sm-0 pt-3 pb-2 border-0 rounded-0 shadow-sm">
                    <div class="d-flex flex-row justify-content-start">
                        <div class="pl-1 pl-sm-2 pl-md-3 pr-5 pr-sm-3">
                            <canvas id="myPieChart" width="100%" height="100"></canvas>
                        </div>
                        <div class="">
                            <div class="mb-n2">
                                <small class="text-muted small-xs">Parent Class</small>
                                <div class="h7 font-weight-bold">6</div>
                            </div>
                            <div class="mb-1">
                                <small class="text-muted small-xs">Class Arms</small>
                                <div class="h7 font-weight-bold">25</div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" @click="clickme()">click</button>
            </div><!--/.col1-->

            <div class="col-xl-8 col-md-8 col-sm-7">

                <div class="wrapper card border-0 rounded-0 shadow-sm px-1 pt-2 mb-1">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <a class="nav-link px-2 active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Arms</a>
                      </li>
                      <li class="nav-item" role="presentation">
                        <a class="nav-link px-2" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Classes</a>
                      </li>
                    </ul>
                </div><!--/.tabhead-->

                <div class="tab-content card border-0 rounded-0 px-0 mt-1 shadow-sm" id="pills-tabContent">

                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
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
                                        <th>CLASS ARM</th>
                                        <th>PARENT CLASS</th>
                                        <th>STUDENTS</th>
                                        <th>TEACHERS</th>
                                    </tr>
                                </thead>
                                <tbody class="small">
                                    <tr class="table-row">
                                        <td class="wd-30">
                                            <button class="row-toggle" @click="collapseRow($event)"></button>
                                            <div class="custom-control-lg custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="02">
                                                <label class="custom-control-label" for="02"></label>
                                            </div>
                                        </td>
                                        <td >JS2 - Stallion</td>
                                        <td data-colname="PARENT CLASS:" >JS 2</td>
                                        <td data-colname="STUDENTS:" >30</td>
                                        <td data-colname="TEACHERS:" >30</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div><!--/.tabpane1-->

                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        2
                    </div><!--/.tablpane2-->

                </div>
            </div>
        </div>

	</BaseAdmin>
</template>

<script>
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'

// library:vue
import Chart from 'chart.js'

import Class from "@/apis/Class"

export default {
  name: 'ClassList',
  components: {
    BaseAdmin
  },
  data () {
  	return {
  		schoolClasss: [1, 2, 3],
      classArm: []
  	}
  },
  mounted () {
    this.classAnalytics()
  },
  methods: {
  	collapseRow (event) {
  		event.target.closest('.table-row').classList.toggle('is-expanded')
  	}
,
    classAnalytics () {
      var ctx = document.getElementById('myPieChart')
      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Class', 'Class Arm'],
          datasets: [{
            data: [8, 25],
            backgroundColor: ['#1cc88a', '#4e73df'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)'
          }]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: 'rgb(255,255,255)',
            bodyFontColor: '#858796',
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10
          },
          legend: {
            display: false
          },
          cutoutPercentage: 70
        }
      })
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

@media only screen and (max-width: 768px) {

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
        padding: 5px 5px;
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
