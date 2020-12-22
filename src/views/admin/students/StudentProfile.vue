<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg pt-2 pt-sm-3">
                    <div class="d-flex flex-wrap justify-content-between">
                        <div class="d-inline">
                            <a class="h7 text-decoration-none text-dark"><i class="fas fa-user"></i></a>
                            <small class="pl-2">Student Profile</small>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm small-xs border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                <a class="dropdown-item small font-weight-midi py-2" @click.stop data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Edit Student</a>

                                <a class="dropdown-item small font-weight-midi py-2" @click.stop data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Mail Student</a>

                                <a class="dropdown-item small font-weight-midi py-2" @click.stop data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Achive Student</a>

                                <a class="dropdown-item small font-weight-midi py-2" @click.stop data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Delete Student</a>

                            </div>
                        </div>
                    </div>

                    <div class="border-top mt-3 p-0" style="overflow-x: auto;">
                        <ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link pl-1 pb-sm-3 pb-3 active" id="pills-bio-tab" data-toggle="pill" href="#pills-bio" role="tab" aria-controls="pills-bio" aria-selected="true">BioData</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" id="pills-fees-tab" data-toggle="pill" href="#pills-fees" role="tab" aria-controls="pills-fees" aria-selected="false">Fees</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" id="pills-attendance-tab" data-toggle="pill" href="#pills-attendance" role="tab" aria-controls="pills-attendance" aria-selected="false">Attendance</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" id="pills-reports-tab" data-toggle="pill" href="#pills-reports" role="tab" aria-controls="pills-reports" aria-selected="false">Reports</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3 text-nowrap" id="pills-history-tab" data-toggle="pill" href="#pills-history" role="tab" aria-controls="pills-history" aria-selected="false">Class History</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active px-0" id="pills-bio" role="tabpanel" aria-labelledby="pills-bio-tab">
                        <student-bio-data :student="student" :loading="loading" :loaded="loaded" ></student-bio-data>
                    </div>
                    <div class="tab-pane fade" id="pills-fees" role="tabpanel" aria-labelledby="pills-fees-tab">
                        <student-fees></student-fees>
                    </div>
                    <div class="tab-pane fade px-0" id="pills-attendance" role="tabpanel" aria-labelledby="pills-attendance-tab">
                        <student-attendance></student-attendance>
                    </div>
                    <div class="tab-pane fade" id="pills-reports" role="tabpanel" aria-labelledby="pills-reports-tab">
                        <student-report-card></student-report-card>
                    </div>
                    <div class="tab-pane fade" id="pills-history" role="tabpanel" aria-labelledby="pills-history-tab">
                        <student-batch-history></student-batch-history>
                    </div>
                </div>
        </template>

    </base-admin>
</template>

<script>
import BaseAdmin from '@/views/layouts/BaseAdmin.vue';
import LinePreload from '@/components/LinePreload';
import StudentBioData from '@/views/admin/students/StudentBioData';
import StudentFees from '@/views/admin/students/StudentFees';
import StudentAttendance from '@/views/admin/students/StudentAttendance';
import StudentReportCard from '@/views/admin/students/StudentReportCard';
import StudentBatchHistory from '@/views/admin/students/StudentBatchHistory';

import Student from '@/apis/Student';

export default {
    name: 'StudentProfile',
    components: {
        BaseAdmin,
        LinePreload,
        StudentBioData,
        StudentFees,
        StudentAttendance,
        StudentReportCard,
        StudentBatchHistory
    },

    data () {
        return {
            loading: false,
            loaded: false,
            student: []
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
            await this.reqStudentBio();
        },

        reqStudentBio() {
            this.loading = true
            const studentId = this.$route.params.studentId;
            Student.me(studentId)
            .then((res) => {
                this.student = res.data[0];
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
</style>
