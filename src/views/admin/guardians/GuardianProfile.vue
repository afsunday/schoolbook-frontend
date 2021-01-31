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
                            <a class="btn btn-light btn-sm small border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-end border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">

                                <router-link class="dropdown-item small font-weight-midi py-2" :to="`/m/guardians/${route.params.guardianId}/edit`">Edit Guardian</router-link>

                                <a class="dropdown-item small font-weight-midi py-2" href="#">Mail Guardian</a>
                                <a class="dropdown-item small font-weight-midi py-2"  href="#">Achive Guardian</a>
                                <a class="dropdown-item small font-weight-midi py-2" href="#">Delete Guardian</a>

                            </div>
                        </div>
                    </div>

                    <div class="d-flex mt-3 mt-sm-3">
                        <img class="rounded-lg border bg-light me-2 me-sm-3" src="@/assets/images/user1.png" height="70" width="70" alt="">
                        <div class="d-flex flex-column align-item-start">
                            <div class="d-inline-flex">
                                <span class=""><i class="icon icon-users2 icon-lg"></i></span>
                                <h6 class="h7 text-break font-weight-midi ms-1">
                                    {{ guardian.firstname }} {{ guardian.surname }} <span class="d-none d-xs-inline">{{ guardian.othername }}</span>
                                </h6>
                            </div>
                            <div class="d-inline-flex">
                                <span class=""><i class="icon icon-mail icon-lg"></i></span>
                                <h6 class="h7 text-break font-weight-midi ms-1">{{ guardian.email }}</h6>
                            </div>
                            <div class="d-inline-flex">
                                <span class=""><i class="icon icon-leads1 icon-lg"></i></span>
                                <h6 class="h7 text-break font-weight-midi ms-1">{{ guardian.username }}</h6>
                            </div>                           
                        </div>
                    </div>

                    <div class="border-top mt-2 p-0" style="overflow-x: auto;">
                        <ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link ps-1 pb-sm-3 pb-3 active" id="pills-bio-tab" data-bs-toggle="pill" href="#pills-bio" role="tab" aria-controls="pills-bio" aria-selected="true">BioData</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-3 pb-sm-3 pb-3" id="pills-fees-tab" data-bs-toggle="pill" href="#pills-fees" role="tab" aria-controls="pills-fees" aria-selected="false">Wards</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-3 pb-sm-3 pb-3" id="pills-attendance-tab" data-bs-toggle="pill" href="#pills-attendance" role="tab" aria-controls="pills-attendance" aria-selected="false">Fees</a>
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
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload';
import GuardianBioData from '@/views/admin/guardians/GuardianBioData'
import GuardianWards from '@/views/admin/guardians/GuardianWards'
import GuardianFees from '@/views/admin/guardians/GuardianFees'

// composables

// library:vue
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onMounted, watch } from 'vue'

// apis
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

    setup() {
        const route = useRoute()
        const router = useRouter()

        return {
            route
        }
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
