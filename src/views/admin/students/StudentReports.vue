<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-gray-light">
                <div class="container-lg pt-2 pt-sm-3">
                    <div class="d-flex flex-wrap justify-content-between">
                        <div class="text-wrap">
                            <h6 class="text-capitalize font-weight-midi h7"><i class="fas fa-user fa-sm"></i> Afuwape sunday oluwafemi</h6>
                            <small class="mt-n2">sunny4215</small>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm small border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-right border-0 shadow m-0 py-3">

                                <router-link class="dropdown-item small font-weight-midi py-2" :to="`/m/students/${route.params.studentId}/edit`">Edit Student</router-link>

                                <a class="dropdown-item small font-weight-midi py-2" data-bs-backdrop="static" data-bs-keyboard="false"
                                 data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Mail Guardian</a>

                                <a class="dropdown-item small font-weight-midi py-2" data-bs-backdrop="static" data-bs-keyboard="false"
                                 data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Achive Guardian</a>

                                <a class="dropdown-item small font-weight-midi py-2" data-bs-backdrop="static" data-bs-keyboard="false"
                                 data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Delete Guardian</a>

                            </div>
                        </div>
                    </div>

                    
                    <div class="border-top mt-2 p-0" style="overflow-x: auto; scrollbar-width:thin;">
                        <ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link ps-0 pb-sm-3 pb-3" aria-selected="false" :to="`/m/students/${route.params.studentId}/profile`">BioData</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" aria-selected="true" :to="`/m/students/${route.params.studentId}/fees`">Fees</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3 active" aria-selected="false" :to="`/m/students/${route.params.studentId}/reports`">Reports</router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" aria-selected="false" :to="`/m/students/${route.params.studentId}/attendance`">Attendance</router-link>
                            </li> 
                            <li class="nav-item" role="presentation">
                                <router-link class="nav-link px-sm-3 px-2 pb-sm-3 pb-3 text-nowrap" aria-selected="false" :to="`/m/students/${route.params.studentId}/class-history`">ClassHistory</router-link>
                            </li>                                                     
                        </ul>
                    </div>

                </div>
            </header>
        </template>

        <template v-slot:default>
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white pr-2 ps-1 pb-0 pt-1">
                    <ul class="nav nav-pills mt-2">
                        <li class="nav-item">
                            <a class="nav-link ps-2 pb-sm-3 pb-3 active" aria-selected="true">Report Card</a>
                        </li>
                    </ul>
                </div>

                <div v-if="selectedCheckBox.length > 0" class="d-flex justify-content-between px-2 mt-3 mb-2">
                    <div class="text-dark small font-weight-midi d-inline-flex mt-1">
                        {{selectedCheckBox.length}} student(s) selected
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

                <div class="card-body px-0 pt-0">
                    <div id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th>
                                        <div class="form-check-lg form-check">
                                            <input type="checkbox" ref="checkAllCheckBox" @click="checkAll($event)" class="form-check-input" id="sb-checkall-rpc" />
                                            <label class="orm-check-label" for="sb-checkall-rpc"></label>
                                        </div>
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
                                    <th>
                                        <div class="form-check-lg form-check">
                                            <input type="checkbox" 
                                               @click="checked($event)" 
                                               :checked="selectedCheckBox.includes(key.toString())" 
                                               class="form-check-input" :id="key" ref="activeFeeCheckBox">
                                            <label class="form-check-label" :for="key"></label>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="d-flex justify-content-between">
                                            <div class="me-4">
                                                <span><a href="#" class="h7 text-decoration-none text-primary font-weight-midi">John tuition Fee 2019/2020 First Term</a></span>
                                            </div>
                                            <a class="row-toggle text-decoration-none ms-2" @click="collapseRow($event)"></a>
                                        </div>
                                    </td>
                                    <td class="h7 font-weight-midi" data-colname="SESSION:">20000</td>
                                    <td class="h7 font-weight-midi" data-colname="STATUS:">20000</td>
                                    <td class="h7 font-weight-midi" data-colname="DATE:">20/05/2020</td>
                                    <td>
                                        <div class="dropdown">
                                            <a class="btn btn-outline-secondary btn-xs rounded" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</a>
                                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3 " aria-labelledby="dropdownMenuLink">

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
                </div>
            </div>
        </template>

    </base-admin>
</template>

<script>
// basic components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
import tabLinks from '@/views/admin/students/shared/tabLinks.vue'

// library:vue
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'StudentFees',
    components: {
        BaseAdmin,
        LinePreload,
        tabLinks
    },

    setup() {
        const route = useRoute()

        const loadingState = reactive({
            loading: false, loaded: false,
        })

        return {
            loadingState, route
        }
    },

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

        checkAll() {},

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