<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted"><span class="h7"><i class="fas fa-columns"></i></span> Guardians</div>
                        </div>
                        <div class="">
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                    <router-link class="dropdown-item small font-weight-midi py-2" to="/admin/guardians/achives">
                                    Achived Students</router-link>

                                    <router-link class="dropdown-item small font-weight-midi py-2" to="/admin/guardians/add">
                                    Add Guardians</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>

            <div v-if="selectedCheckBox.length > 0" class="d-flex justify-content-between">
                <div class="text-dark small font-weight-midi d-inline-flex mt-2">
                    {{selectedCheckBox.length}} guardians(s) selected
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

            <!-- filter-Modal -->
            <modal-center :modalBadge="'staticFilterForm'">
                <div class="form-group mb-1">
                    <label class="small-xs font-weight-midi mb-0">ACCOUNT STATUS</label>
                    <select class="custom-select" v-model="filter.account_status">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
                <div class="form-group mb-1">
                    <label class="small-xs font-weight-midi mb-0">STATUS</label>
                    <select class="custom-select" v-model="filter.status">
                        <option value="all">All Status</option>
                        <option value="listed">Listed</option>
                        <option value="delist">Delist</option>
                    </select>
                </div>
                <div class="form-group mb-1">
                    <label class="small-xs mb-0">GENDER</label>
                    <select class="custom-select" v-model="filter.gender">
                        <option value="all">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="form-group mb-2 mt-2">
                    <button class="btn btn-outline-primary btn-sm" 
                    data-dismiss="modal" aria-label="close" @click="applyFilter()" type="submit">Apply Filter</button>
                </div>
            </modal-center>
            <!--/filter-modal -->

            <div class="card border-0 shadow-sm mt-1 mt-sm-2">
                <div class="card-header bg-white d-flex justify-content-between rounded-top-lg px-2">
                    <div class="mr-auto">
                        <div class="input-group input-group-solid">
                            <div class="input-group-prepend">
                                <div class="input-group-text bg-light">
                                    <a href="" class="dropdown-toggle text-dark text-decoration-none small" data-toggle="modal" data-target="#staticFilterForm">
                                        <i class="fas fa-filter fa-sm"></i><span class="d-none d-sm-inline"> Filter</span>
                                    </a>
                                </div>
                            </div>
                            <input class="form-control bg-light" type="search" @keyup.enter="applyFilter()" v-model="filter.search" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </div>
                <div>
                    <line-preload :loading="loading"></line-preload>
                </div>
                <div class="card-body px-0 pt-0">
                    <div v-show="loaded" id="toggle-table">
                        <table class="table table-striped">
                            <thead class="small-xs font-weight-midi text-muted bg-white">
                                <tr>
                                    <th class="wd-30">
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" @click="selectAll($event)" class="custom-control-input" id="sb-checkall">
                                            <label class="custom-control-label" for="sb-checkall"></label>
                                        </div>
                                    </th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>PHONE</th>
                                    <th>GENDER</th>
                                    <th>STATUS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="small font-weight-midi">
                                <tr v-for="guardian in guardians" :key="guardian.guardian_id" class="table-row">
                                    <th>
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" 
                                                   ref="xbox" :checked="selectedCheckBox.includes(guardian.guardian_id.toString())" 
                                                   @click="checkedToLocal($event)" :id="guardian.guardian_id">
                                            <label class="custom-control-label" :for="guardian.guardian_id"></label>
                                        </div>
                                    </th>
                                    <td>
                                        <div class="d-inline-flex">
                                            <img src="@/assets/images/user.png" class="rounded-circle mr-2 border bg-light" width="35" height="35">
                                            <span class="text-break overflow-auto"> 
                                                <router-link class="text-decoration-none text-primary" :to="{ name: 'GuardianProfile', params: { guardianId: guardian.guardian_id }}">{{guardian.firstname}} {{guardian.surname}} {{guardian.othername}}</router-link>
                                            </span>
                                        </div>
                                        <a class="row-toggle text-decoration-none" @click="collapseRow($event)"></a>
                                    </td>
                                    <td data-colname="EMAIL">{{ guardian.email }}</td>
                                    <td data-colname="PHONE">{{ guardian.phone }}</td>
                                    <td data-colname="GENDER:">{{guardian.gender}}</td>
                                    <td class="text-capitalize enrolled" data-colname="DURATION:">{{ guardian.status }}</td>
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
                    </div><!--/table-wrapper -->

                    <!-- Pagination -->
                    <pagination-links 
                    :list-total-page="totalPage"
                    :list-current-page="currentPage"
                    :list-prev-page="prevPage"
                    :list-next-page="nextPage"
                    :list-pages-length="pagesLength"
                    @changePage="changePage($event)">
                    </pagination-links>                    
                </div>
            </div>
        </template>

    </base-admin>
</template>

<script>
import { onMounted } from 'vue'

import BaseAdmin from '@/views/layouts/BaseAdmin.vue';
import LinePreload from '@/components/LinePreload';
import PaginationLinks from '@/components/PaginationLinks';

const ModalCenter = () => import(/* webpackChunkName: "Modalcenter" */ '@/components/ModalCenter');

import { mapActions, mapState, mapMutations } from 'vuex';
import Guardian from '@/apis/Guardian';

export default {
  name: 'GuardianList',
  components: {
    BaseAdmin,
    LinePreload,
    ModalCenter,
    PaginationLinks
  },
  data () {
    return {
      loading: false,
      loaded: false,
      currentPage: null,
      nextPage: false,
      prevPage: false,
      totalPage: null,
      pagesLength: null,
      guardians: null,
      selectedCheckBox: [],
      filter: {
        search: '',
        status: 'all',
        account_status: 'all',
        gender: 'all',
        page: 1,
      },
      classes: null
    }
  },

  created () {
    this.reqGuardians();
  },

  onMounted () {
    this.localCheckBoxes();
  },

  methods: {
    collapseRow (event) {
      event.target.closest('.table-row').classList.toggle('is-expanded')
    },

    async reqGuardians() {
        this.loading = true;

        if ( this.$route.query.page !== undefined || this.$route.query.page !== null ) {
            this.filter.page = this.$route.query.page;
        }

        await Guardian.all(this.filter)
        .then((res) => {

            this.guardians = res.data.data;

            if(res.data.next_page_url === null) {
                this.nextPage = false;
            } else {
                this.nextPage = res.data.next_page_url.split('=')[1]; 
            }

            if(res.data.prev_page_url === null) {
                this.prevPage = false;
            } else {
                this.prevPage = res.data.prev_page_url.split('=')[1];
            }

            this.currentPage = res.data.current_page;
            this.totalPage = res.data.last_page;

            let pageLinks = res.data.links;
            this.pagesLength = pageLinks.slice(1, pageLinks.length - 1).length;

            this.loading = false;
            this.loaded = true;

        })
        .catch((err) => {
            console.log(err.response)
        })
    },

    async changePage(event) {

        const toPage = event.currentTarget.attributes.id.value;
        this.$router.push({ query: { page : toPage } });
        await this.reqGuardian();
    },

    async applyFilter() {
        if ( this.$route.query.page !== '1') {
            this.$router.push({ query: { page : 1 } });
        }

        await this.reqGuardian();  
    },

    localCheckBoxes() {
        let checkBoxes = JSON.parse(localStorage.getItem('SB_SBOX'));
        if (checkBoxes) this.selectedCheckBox = checkBoxes;
    },

    checkedToLocal(event) {
        let checkBox = event.target.getAttribute('id');
        if (event.currentTarget.checked) {
           this.selectedCheckBox.push(checkBox);
           localStorage.setItem('SB_SBOX', JSON.stringify(this.selectedCheckBox));
        } else {

            let index =  this.selectedCheckBox.indexOf(checkBox);
            if (index > -1) {
                this.selectedCheckBox.splice(index, 1);
                localStorage.setItem('SB_SBOX', JSON.stringify(this.selectedCheckBox));
            }
        } 
    },

    selectAll(event) {
        let boxes = this.$refs.xbox;

        if(event.currentTarget.checked) {
            boxes.forEach((item) => {
                let checkbox = item.getAttribute('id');

                let index =  this.selectedCheckBox.indexOf(checkbox);
                if (index <= -1) {
                    this.selectedCheckBox.push(checkbox);
                    localStorage.setItem('SB_SBOX', JSON.stringify(this.selectedCheckBox));
                } 

            })
        } else {
            boxes.forEach((item) => {
                let checkbox = item.getAttribute('id');

                let index =  this.selectedCheckBox.indexOf(checkbox);
                if (index > -1) {
                    this.selectedCheckBox.splice(index, 1);
                    localStorage.setItem('SB_SBOX', JSON.stringify(this.selectedCheckBox));
                }
            })
        }
    }

  }

}
</script>

<style scoped>

.table tr:last-child {
    border-bottom: 1px solid #dee2e6;
}

.table thead th {
  border-top: 0px !important;
}

#toggle-table  .table thead > tr > th:first-child,
#toggle-table  .table tbody > tr > th {
   padding-right: 0px;
   width: 10px !important;
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

    #toggle-table  .table thead > tr > th:first-child,
    #toggle-table  .table tbody > tr > th {
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

.Listed { 
    color:  #009900; 
}

.delist { 
    color: #ff3300;  
}

.rounded-top-lg {
  border-top-left-radius: 0.3rem !important;
  border-top-right-radius: 0.3rem !important;
}

.card-body {
    min-height: 70px;
}

.custom-select {
    border-radius: .17rem;
}

.custom-select {
    font-size: 14px;
    font-weight: 500;
    color: inherit;
    background: transparent;
    flex-grow: 1;
    padding-right: .5rem;
    padding-left: .5rem;
}

</style>
