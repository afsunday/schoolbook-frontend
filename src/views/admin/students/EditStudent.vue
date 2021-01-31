<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="d-inline-flex mt-1">
                            <i class="icon icon-user-add icon-lg me-1"></i> 
                            <span class="small">UPDATE STUDENT</span>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-right border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">

                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                 data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Achived Students</a>

                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                 data-bs-toggle="modal" data-bs-target="#invoice-modal">Add Students</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
            <VeeForm v-slot="{ handleSubmit, errors }" as="div">
                <form>
                    <div class="card border-0 shadow-sm mt-2 pb-3 min-200">
                        <div class="card-header bg-white px-2 px-sm-3">
                            <div class="small-xs font-weight-normal mt-2">STUDENT INFORMATION</div>
                        </div>

                        <line-preload :loading="loadingState.loading"></line-preload>

                        <empty-list :loaded="loadingState.bioLoaded" :items="Object.keys(student)">
                            Oops we dont have a Student with that record
                        </empty-list>

                        <retry-button class="mt-4" :list="true" :hasRetry="requiredResourceHasError" 
                            @retry="e => { 
                                requiredResourceHasError = loadingState.loaded = false; 
                                fetchClasses(); 
                                fetchStudent(); 
                                fetchStudentGuardians() 
                            }">
                            Oops something went wrong try again.
                        </retry-button>


                        <div v-if="loadingState.loaded && !requiredResourceHasError && Object.keys(student).length > 0" 
                            class="card-body px-2 px-sm-3 pt-2 pb-3">

                            <div class="row g-3 mt-3">
                                <div class=" col-md-4">
                                    <label class="small-xs font-weight-midi m-0">FIRSTNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="firstname" as="input" class="form-control form-control-lg mb-0" rules="required"
                                    v-model="student.firstname" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.firstname }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">SURNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="surname" as="input" class="form-control form-control-lg mb-0" rules="required"
                                     v-model="student.surname" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.surname }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">OTHERNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="othername" as="input" class="form-control form-control-lg mb-0" rules="required"
                                    v-model="student.othername" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.othername }}</small>
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">GENDER <span class="text-danger">&#42;</span></label>
                                    <select class="form-control form-control-lg mb-0" v-model="student.gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <small class="text-danger small-xs mt-n3">{{ errors.gender }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">DATE OF BIRTH 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="dob" as="input" type="date" class="form-control form-control-lg mb-0" rules="required"
                                     v-model="student.dob" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.dob }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">BLOOD GROUP</label>
                                    <input type="text" class="form-control form-control-lg mb-0" v-model="student.blood_group">
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">RELIGION</label>
                                    <input type="text" class="form-control form-control-lg mb-0" v-model="student.religion">
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">NATIONALITY</label>
                                    <select class="form-control form-control-lg mb-0">
                                        <option value="nigerian">NIGRERIAN</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">STATE OF ORIGIN </label>
                                    <input type="text" class="form-control form-control-lg mb-0" v-model="student.state_origin">
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">L.G.A OF ORIGIN</label>
                                    <input type="text" class="form-control form-control-lg mb-0" v-model="student.local_govt">
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">ADMISSION CLASS 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="class" as="select" class="form-select form-select-lg" v-model="student.admission_class" rules="required">
                                        <option>--select--</option>
                                        <option v-for="xclass in schoolClasses" :value="xclass.id">
                                            {{ xclass.class_name }} {{ xclass.arm }}
                                        </option>
                                    </Field>
                                    <small class="text-danger small-xs mt-n3">{{ errors.class }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">ADMISSION DATE 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="admission_date" as="input" type="date" 
                                        class="form-control form-control-lg mb-0" rules="required" v-model="student.admission_date" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.admission_date }}</small>
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">ADMISSION NUMBER<span class="text-danger">&#42;</span></label>
                                    <input type="text" class="form-control form-control-lg mb-0" :value="student.admission_number" readonly>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">EMAIL</label>
                                    <Field name="email" as="input" type="text" class="form-control form-control-lg mb-0" rules="email" v-model="student.email" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.email }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">PHONE</label>
                                    <Field name="phone" as="input" type="text"
                                        class="form-control form-control-lg mb-0" rules="digits:11" v-model="student.phone" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.phone }}</small>
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">HEALTH INFO/DISABILITY</label>
                                    <textarea class="form-control" rows="2"  v-model="student.health" ></textarea>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">RESIDENTIAL ADDRESS
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <textarea class="form-control" rows="2" v-model="student.residential_address"></textarea>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">PIC 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <input type="file" class="form-control form-control-lg" @change="student.passport = $event.target.files[0]">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Assign guardian:student -->
                    <div v-if="loadingState.loaded && !requiredResourceHasError" class="card border-0 shadow-sm mt-2">
                        <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                            <div class="small-xs font-weight-normal mt-2">STUDENT GUARDIANS</div>
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-right border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">

                                    <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                     data-bs-toggle="modal" data-bs-target="#modal" href="#">Assign Guardian</a>                           
                                </div>
                            </div>
                        </div>

                        <line-preload :loading="loadingState.unAssign"></line-preload>

                        <empty-list 
                            :loaded="loadingState.loaded  && !requiredResourceHasError && selectedGuardians.length <= 0" 
                            :items="guardiansAssignedToStudent">
                            Hmm no guardian has been assigned or selected
                        </empty-list>

                        <div class="card-body px-2 px-sm-3">
                            <div class="row g-3">

                                <!-- guardians already assigned --> 
                                <div v-for="guard in guardiansAssignedToStudent" :key="guard.guardian_id" class="col-md-4 mb-2">
                                    <div class="border rounded-top rounded-right p-2 pt-3">
                                
                                        <div class="d-flex mt-2">
                                            <img src="@/assets/images/user.png" class="rounded-circle me-2 border bg-light" width="35" height="35">
                                            <span class="text-break overflow-auto mt-n1"> 
                                                <router-link class="small text-decoration-none text-primary" :to="'/m/guardians/profile/' + guard.guardian_id">{{ guard.firstname }} {{ guard.surname }}</router-link>
                                                <div class="small text-muted text-pre-wrap mt-n1">{{ guard.email }}</div>
                                            </span>
                                        </div>

                                        <div class="mt-2">
                                            <label class="small-xs font-weight-midi m-0">Relationship
                                                <span class="text-danger">&#42;</span>
                                            </label>
                                            <Field :name="'relationship' + guard.guardian_id" as="input" class="form-control" v-model="guard.relationship" placeholder="ex. father" rules="required" />
                                            <small class="text-danger small-xs mt-n3">{{ errors['relationship' + guard.guardian_id] }}</small>
                                        </div>

                                        <div class="mt-2 d-flex justify-content-between">
                                            <div class="form-check-lg form-check">
                                                <input type="checkbox" class="form-check-input" :id="guard.guardian_id" 
                                                    @click="e => { if (e.currentTarget.checked) guard.emergency = true; else guard.emergency = false }" 
                                                    :checked="!!guard.emergency">
                                                <label class="form-check-label" :for="guard.guardian_id">
                                                    <small>Emergency contact</small>
                                                </label>
                                            </div>
                                            <div class="dropdown">
                                                <a class="text-muted me-2" href="#" role="button" id="dpLinks" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
                                                <div class="dropdown-menu dropdown-menu-right border-0 shadow m-0 py-3" aria-labelledby="dpLinks">
                                                    <a @click="unAssignGuardian($event)" 
                                                        :id="guard.guardian_id " :class="{'disabled': loadingState.unAssign }" 
                                                        class="dropdown-item small font-weight-midi py-2">Unassign Guardian</a>

                                                    <router-link class="dropdown-item small font-weight-midi py-2" :to="'/m/guardians/edit/' + guard.guardian_id">Edit Guardian</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- /guardians already assigned --> 

                                <!-- newly selected guardians -->
                                <div v-for="(guardian, key) in selectedGuardians" :key="guardian.guardian_id" class="col-md-4 mb-2">
                                    <div class="border rounded-top rounded-right p-2 pt-3">

                                        <a @click="removeSelectedGuardian(key, guardian.guardian_id)" class="close mt-n3">&times;</a>

                                        <div class="d-flex mt-2">
                                            <img src="@/assets/images/user.png" class="rounded-circle me-2 border bg-light" width="35" height="35">
                                            <span class="text-break overflow-auto mt-n1"> 
                                                <router-link class="small text-decoration-none text-primary" :to="'/m/guardians/profile/' + guardian.guardian_id">{{ guardian.firstname }} {{ guardian.surname }}</router-link>
                                                <div class="small text-muted text-pre-wrap mt-n1">{{ guardian.email }}</div>
                                            </span>
                                        </div>

                                        <div class="mt-2">
                                            <label class="small-xs font-weight-midi m-0">Relationship
                                                <span class="text-danger">&#42;</span>
                                            </label>
                                            <Field :name="'relationship' + guardian.guardian_id" as="input" class="form-control" v-model="guardian.relationship" placeholder="ex. father" rules="required" />
                                            <small class="text-danger small-xs mt-n3">{{ errors['relationship' + guardian.guardian_id] }}</small>
                                        </div>

                                        <div class="mt-2">
                                            <div class="form-check-lg form-check">
                                                <input type="checkbox" class="form-check-input" :id="guardian.guardian_id" v-model="guardian.emergency" :checked="guardian.emergency">
                                                <label class="form-check-label" :for="guardian.guardian_id">
                                                    <small>Emergency contact</small>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- newly selected guardians -->
                            </div>
                        </div>
                    </div>
                    <!-- /Assign guardian:student-->

                    <!-- submit button -->
                    <div v-if="loadingState.loaded && !requiredResourceHasError" class="d-flex justify-content-center mt-3">
                        <loading-button type="submit" class="btn btn-outline-secondary btn- px-3" @btnEvent.prevent="handleSubmit($event, updateStudent)" :loading="loadingState.btnLoading">Update Student
                        </loading-button>
                    </div>

                </form>
            </VeeForm>


            <!-- left-modal -->
            <modal-left :badge="'modal'">
                <template v-slot:title><i class="icon icon-customer icon-lg"></i><span>Assign Guardian</span></template>
                <template v-slot:preloader><line-preload :loading="loadingState.modalLoading"></line-preload></template>

                <template v-slot:body>
                    <div class="modal-body px-2 mb-3">

                        <retry-button :list="guardians.length <= 0" :hasRetry="fetchGuardiansHasError" 
                            @retry="e => { 
                                fetchGuardiansHasError = false; fetchGuardians() 
                            }">
                            Oops something went wrong try again.
                        </retry-button>

                        <empty-list :loaded="loadingState.modalLoaded" :items="guardians">
                            Oops you dont have any guardian
                        </empty-list>

                        <div v-if="loadingState.modalLoaded && guardians.length > 0">
                            <div class="me-auto px-1">
                                <input class="form-control bg-light" type="search" @keyup.enter="filterGuardians()" v-model="guardianFetchParams.search" placeholder="Search names,email or phone" aria-label="Search">
                            </div>
                            
                            <div  v-for="guardian in guardians" class="border-0 px-1 pb-0 mb-2">
                                <div class="d-flex justify-content-between border rounded-top rounded-right pt-2 pb-3 px-2">
                                    <div class="d-flex me-2">
                                        <img src="assets/images/user.png" class="rounded border me-2 me-sm-3" width="45" height="45" alt=" ">
                                        <span class="text-break mt-n1"> 
                                            <div class="small"><a href="#" class="font-weight-midi text-dark mt-n2">{{ guardian.firstname }} {{ guardian.surname }} {{ guardian.othername }}</a></div>
                                            <div class="small text-muted text-pre-wrap">{{ guardian.email }}</div>
                                        </span>
                                    </div>

                                    <div class="form-check-lg form-check me-n2">
                                        <input type="checkbox" class="form-check-input" 
                                            :checked="selectedGuardians.some(g => g.guardian_id === guardian.guardian_id)"
                                            :disabled="guardiansAssignedToStudent.some(g => g.guardian_id === guardian.guardian_id)"
                                            @click="selectGuardian($event, guardian)" :id="'checkbox'+guardian.guardian_id">
                                        <label class="form-check-label" :for="'checkbox'+guardian.guardian_id"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-slot:footer>
                    <pagination-links 
                        :ListTotalPage="paginate.totalPage" :ListCurrentPage="paginate.currentPage" 
                        :ListPrevPage="paginate.prevPage" :ListNextPage="paginate.nextPage"
                        :ListPagesLength="paginate.pagesLength" @changePage="navigate($event)">
                    </pagination-links>
                </template>
            </modal-left>
            <!-- /left-modal -->

        </template>
    </base-admin>
</template>

<script>
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
import LoadingButton from '@/components/LoadingButton'
import PaginationLinks from '@/components/PaginationLinks'
import ErrorReload from '@/components/ErrorReload'
import EmptyList from '@/components/EmptyList'
import ModalLeft from '@/components/ModalLeft'
import RetryButton from '@/components/RetryButton'

// composables
import usePaginate from '@/composables/usePaginate'
import useErrorReloadState from '@/composables/useErrorReloadState'

// library:vue
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { Form as VeeForm, Field} from 'vee-validate'

// apis
import Class from '@/apis/Class';
import Guardian from '@/apis/Guardian'
import Student from '@/apis/Student'


export default {
    name: 'EditStudent',
    components: {
        BaseAdmin,
        LinePreload,
        LoadingButton,
        PaginationLinks,
        ErrorReload,
        RetryButton,
        EmptyList,
        ModalLeft,
        VeeForm,
        Field
    },

    setup(_, context) {
        const store  = useStore()
        const route = useRoute()

        // request loading state
        const loadingState = reactive({
            loading: false,
            loaded: false,
            btnLoading: false,
            modalLoading: false,
            modalLoaded: false,
            bioLoaded: false,
            unAssign: false 
        });

        // paginate list of guardian resource
        let paginate = ref({
            currentPage: null,
            nextPage: false,
            prevPage: false,
            totalPage: null,
            pagesLength: null,
        });


        // fetch classes available for this school
        const schoolClasses = ref([])

        const fetchClasses = async () => {
            loadingState.loading = true

            await Class.classes().then((res) => {
                schoolClasses.value = res.data;

            })
            .catch((err) => {
                loadingState.loading = false
                loadingState.loaded = true
                requiredResourceHasError.value = true
            })
        } 


        // fetch student bio data 
        const student = ref({})

        const fetchStudent = async () => {
            loadingState.loading = true
            let studentId = route.params.studentId

            await Student.me(studentId).then((res) => {

                if (res.data.length > 0) {
                    student.value = res.data[0]
                }
            })
            .catch((err) => {
                loadingState.loading = false
                loadingState.loaded = true
                requiredResourceHasError.value = true
            })
        }


        // list of guardians assigned to students
        const guardiansAssignedToStudent = ref([])

        const fetchStudentGuardians = async () => {
            loadingState.loading = true
            let studentId = route.params.studentId

            await Student.assignedGuardians(studentId).then((res) => {
                guardiansAssignedToStudent.value = res.data

            })
            .catch((err) => {
                loadingState.loading = false
                loadingState.loaded = true
                requiredResourceHasError.value = true
            })
        }


        // fetch all in promise if any fail all will can retried 
        const requiredResourceHasError = ref(false)

        Promise.all([fetchStudent(), fetchClasses(), fetchStudentGuardians()])
        .then((val) => {
            loadingState.loading = false
            loadingState.loaded = true
        })


        // params to fetch guardians from api which includes
        let guardianFetchParams = reactive({
            search: '',
            status: 'all',
            account_status: 'all',
            gender: 'all',
            page: 1
        })


        // fetch list of all guardians and set error state
        const guardians = ref([])
        const fetchGuardiansHasError = ref(false)

        const fetchGuardians = async () => {
            loadingState.modalLoading = true

            await Guardian.all(guardianFetchParams)
            .then((res) => {
                guardians.value = res.data.data

                const { paging } = usePaginate(res)

                paginate.value = { ...paginate.value, ...paging }

                loadingState.modalLoaded = true;
                loadingState.modalLoading = false;
            })
            .catch((err) => {
                loadingState.modalLoading = false
                fetchGuardiansHasError.value = true
            })
        }

        // onCreated hook fetch list of all guardians
        fetchGuardians()


        // search through the list of all guardians
        const filterGuardians = async () => {
            guardianFetchParams.page = 1;
            await fetchGuardians(); 
        }

        // navigate the guardian result list on modal
        const navigate = async (event) => {
            let toPage = event.currentTarget.attributes.id.value;
            guardianFetchParams.page = toPage;
            await fetchGuardians();
        }


        // selected guardians contains array:objects of guardians 
        const selectedGuardians = ref([])

        const selectGuardian = (event, guardian) => {
            if (event.currentTarget.checked) {

                const guardianAssignedForm = { relationship: '', emergency: false }
                const selectedGuardianWithForm = Object.assign(guardian, guardianAssignedForm);

                selectedGuardians.value.push(selectedGuardianWithForm);
            } else {
                
                // if uncheck we will remove guardian object from selection
                selectedGuardians.value.forEach((item, index) => {
                    if(item.guardian_id === guardian.guardian_id) {
                        selectedGuardians.value.splice(index, 1);
                    }
                })                
            } 
        }
        
        // removes selected guardians from array using loop index
        const removeSelectedGuardian = (index, guardianId) => {
            selectedGuardians.value.splice(index, 1);
        }

        // Unassigned guardian to student
        const unAssignGuardian = (event) => {
            let studentId = route.params.studentId;
            let guardianId = event.target.attributes.id.value;

            loadingState.unAssign = true;

            Student.unAssignGuardian(studentId, guardianId)
            .then((res) => {

                new Promise(fetchStudentGuardians())
                .then( r => loadingState.unAssign = false )
            })
            .catch((err) => {
                loadingState.unAssign = false
                store.dispatch('general/addSnackbar', err.response.data.error)
            })
        }

        const updateStudent = ( _, actions) => {
            loadingState.btnLoading = true;

            let formData =  new FormData()
            let formFields = student.value

            for (let field in formFields) {
                formData.append(field, formFields[field])
            }

            if (selectedGuardians.value.length >= 1) {
                formData.append('selected_guardians', JSON.stringify(selectedGuardians.value))
            }

            if (guardiansAssignedToStudent.value.length >= 1) {
                formData.append('assigned_guardians', JSON.stringify(guardiansAssignedToStudent.value))
            }

            Student.update(formData).then((res) => {
                loadingState.btnLoading = false;
                store.dispatch('general/addSnackbar', res.data.message)

                // refresh data and remove
                Promise.all([
                    loadingState.loaded = false,
                    selectedGuardians.value = [], 
                    fetchStudentGuardians(), 
                    fetchStudent()
                ])
                .then((r) => { 
                    loadingState.loading = false 
                    loadingState.loaded = true 
                })
            })
            .catch((err) => {
                loadingState.btnLoading = false;

                if(err.response.status === 500) {
                    store.dispatch('general/addSnackbar', err.response.data.message)
                } 
                else if (err.response.status === 422) {
                    let formErrors =  err.response.data.errors
                    let errorObj = {}

                    for (let field in formErrors) {
                        errorObj[field] = formErrors[field][0]
                    }

                    actions.setErrors({
                        ...errorObj
                    })
                }
            })
        }

        
        return {
            route, loadingState, schoolClasses, student, updateStudent, unAssignGuardian, 

            selectGuardian, selectedGuardians, removeSelectedGuardian, requiredResourceHasError,

            guardianFetchParams, fetchGuardians, fetchStudentGuardians,  fetchClasses, fetchStudent, guardians, fetchGuardiansHasError, 

            filterGuardians, guardiansAssignedToStudent, paginate, navigate
        }
    },

}
</script>

<style scoped>
.text-pre-wrap {
    white-space: pre-wrap;
}

.form-control, .custom-select {
    border-radius: .16rem;
}

.form-control, .form-select {
    font-size: 15px;
    font-weight: 500;
    padding-right: .5rem;
    padding-left: .5rem;
}

.min-200 {
    min-height: 200px;
}
</style>


