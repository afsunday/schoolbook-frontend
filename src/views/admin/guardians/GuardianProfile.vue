<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg pt-2 pt-sm-3">
                    <div class="d-flex flex-wrap justify-content-between">
                        <div class="d-inline">
                            <small class="text-uppercase">Guardian Profile</small>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm small-xs border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                <router-link class="dropdown-item small font-weight-midi py-2" @click.stop :to="'/admin/guardians/edit/' + $route.params.guardianId">Edit Guardian</router-link>

                                <a class="dropdown-item small font-weight-midi py-2" @click.stop data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Mail Guardian</a>

                                <a class="dropdown-item small font-weight-midi py-2" @click.stop data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Achive Guardian</a>

                                <a class="dropdown-item small font-weight-midi py-2" @click.stop data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Delete Guardian</a>

                            </div>
                        </div>
                    </div>

                    <div class="d-flex mt-3 mt-sm-3">
                        <img class="rounded-lg border bg-light mr-2 mr-sm-3" src="@/assets/images/user1.png" height="65" width="65" alt="">
                        <div class="">
                            <div class="d-flex flex-wrap">
                                <div class="d-inline-flex text-decoration-none text-dark mr-sm-4 mr-3">
                                    <div class="mr-1"><i class="icon icon-users2 icon-lg"></i></div>
                                    <div class="ml-1 font-weight-midi text-truncate h7">{{ guardian.firstname }} {{ guardian.surname }} {{ guardian.othername }}</div>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap">
                                <div class="d-inline-flex text-decoration-none text-dark mr-3">
                                    <div class="mr-1"><i class="icon icon-mail icon-lg"></i></div>
                                    <div class="ml-1 font-weight-midi text-break h7">{{ guardian.email }}</div>
                                </div>
                                 <div class="d-inline-flex text-decoration-none text-dark mr-3">
                                    <div class="mr-1"><i class="icon icon-leads1 icon-lg"></i></div>
                                    <div class="ml-1 font-weight-midi text-break h7">{{ guardian.username }}</div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div class="border-top mt-3 p-0" style="overflow-x: auto;">
                        <ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link pl-1 pb-sm-3 pb-3 active" id="pills-bio-tab" data-toggle="pill" href="#pills-bio" role="tab" aria-controls="pills-bio" aria-selected="true">BioData</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-3 pb-sm-3 pb-3" id="pills-fees-tab" data-toggle="pill" href="#pills-fees" role="tab" aria-controls="pills-fees" aria-selected="false">Wards</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-3 pb-sm-3 pb-3" id="pills-attendance-tab" data-toggle="pill" href="#pills-attendance" role="tab" aria-controls="pills-attendance" aria-selected="false">Fees</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active px-0" id="pills-bio" role="tabpanel" aria-labelledby="pills-bio-tab">
                        <guardian-bio-data :loading="loading" :loaded="loaded" :guardian="guardian" ></guardian-bio-data>
                    </div>
                    <div class="tab-pane fade" id="pills-fees" role="tabpanel" aria-labelledby="pills-fees-tab">
                        <guardian-wards></guardian-wards>
                    </div>
                    <div class="tab-pane fade px-0" id="pills-attendance" role="tabpanel" aria-labelledby="pills-attendance-tab">
                        <guardian-fees></guardian-fees>
                    </div>
                </div>
        </template>

    </base-admin>
</template>

<script>
import BaseAdmin from '@/views/layouts/BaseAdmin.vue';
import LinePreload from '@/components/LinePreload';
import GuardianBioData from '@/views/admin/guardians/GuardianBioData'
import GuardianWards from '@/views/admin/guardians/GuardianWards'
import GuardianFees from '@/views/admin/guardians/GuardianFees'

import Guardian from '@/apis/Guardian';

export default {
    name: 'GuardianProfile',
    components: {
        BaseAdmin,
        LinePreload,
        GuardianBioData,
        GuardianWards,
        GuardianFees
    },

    data () {
        return {
            loading: false,
            loaded: false,
            guardian: []
        }
    },

    created () {
        this.fetchData()
    },

    watch: {
        '$route': 'fetchData'
    },

    methods: {
        async fetchData() {
            await this.reqGuardianBio();
        },

        reqGuardianBio() {
            this.loading = true
            const guardianId = this.$route.params.guardianId;
            Guardian.me(guardianId)
            .then((res) => {
                this.guardian = res.data[0];
                this.loading = false;
                this.loaded = true;
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        },

    }

}
</script>

<style scoped>
span.active {
    color: #28a745;
}

.blocked {
    color: #dc3545;
}
</style>
