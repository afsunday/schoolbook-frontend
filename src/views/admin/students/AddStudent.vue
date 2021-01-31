<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="d-inline-flex mt-1">
                            <i class="icon icon-user-add icon-lg me-1"></i> 
                            <span class="small">ADD STUDENT</span>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-end border-0 shadow">
                                <div class="py-3">
                                    <a class="dropdown-item small font-weight-midi py-2" data-bs-backdrop="static" data-keyboard="false"
                                     data-bs-toggle="modal" data-bs-target="#deactivate-modal" href="#">Achived Students</a>

                                    <a class="dropdown-item small font-weight-midi py-2" data-bs-backdrop="static" data-keyboard="false"
                                     data-bs-toggle="modal" data-bs-target="#invoice-modal">Add Students</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default>
            <VeeForm v-slot="{ handleSubmit, errors }" as="div">
                <form>
                    <div class="card border-0 shadow-sm mt-2">
                        <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                            <div class="small-xs font-weight-normal mt-2">STUDENT INFORMATION</div>
                            <a @click="handleFormReset()" class="text-decoration-none text-primary">clear</a>
                        </div>

                        <line-preload :loading="reqState.loading"></line-preload>

                        <div class="card-body px-2 px-sm-3 pt-2 pb-3">

                            <div class="row g-3 mt-3">
                                <div class=" col-md-4">
                                    <label class="small-xs font-weight-midi m-0">FIRSTNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="firstname" as="input" class="form-control form-control-lg mb-0" rules="required"
                                           @input="updateForm('firstname', $event.target.value, form)" v-model="form.firstname" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.firstname }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">SURNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="surname" as="input" class="form-control form-control-lg mb-0" rules="required"
                                           @input="updateForm('surname', $event.target.value, form)" v-model="form.surname" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.surname }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">OTHERNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="othername" as="input" class="form-control form-control-lg mb-0" rules="required"
                                           @input="updateForm('othername', $event.target.value, form)" v-model="form.othername" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.othername }}</small>
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">GENDER <span class="text-danger">&#42;</span></label>
                                    <select class="form-control form-control-lg mb-0" @change="updateForm('gender', $event.target.value, form)" v-model="form.gender">
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
                                        @change="updateForm('dob', $event.target.value, form)" v-model="form.dob" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.dob }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">BLOOD GROUP</label>
                                    <input type="text" class="form-control form-control-lg mb-0"
                                        @input="updateForm('blood_group', $event.target.value, form)" v-model="form.blood_group">
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">RELIGION</label>
                                    <input type="text" class="form-control form-control-lg mb-0"
                                        @input="updateForm('religion', $event.target.value, form)" v-model="form.religion">
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">NATIONALITY</label>
                                    <select class="form-control form-control-lg mb-0">
                                        <option value="nigerian">NIGRERIAN</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">STATE OF ORIGIN </label>
                                    <input type="text" class="form-control form-control-lg mb-0"
                                        @input="updateForm('state_origin', $event.target.value, form)" v-model="form.state_origin">
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">L.G.A OF ORIGIN</label>
                                    <input type="text" class="form-control form-control-lg mb-0"
                                        @input="updateForm('local_govt', $event.target.value, form)" v-model="form.local_govt">
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">ADMISSION CLASS 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="class" as="select" class="form-select form-select-lg" @change="updateForm('admission_class', $event.target.value, form)" :value="form.admission_class" rules="required">
                                        <option value=""></option>
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
                                        class="form-control form-control-lg mb-0" rules="required"
                                        @change="updateForm('admission_date', $event.target.value, form)" v-model="form.admission_date" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.admission_date }}</small>
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">ADMISSION NUMBER<span class="text-danger">&#42;</span></label>
                                    <Field name="admission_number" as="input" type="text" 
                                        class="form-control form-control-lg mb-0" rules="required"
                                        @input="updateForm('admission_number', $event.target.value, form)" v-model="form.admission_number" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.admission_number }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">EMAIL</label>
                                    <Field name="email" as="input" type="text" 
                                        class="form-control form-control-lg mb-0" rules="email"
                                        @input="updateForm('email', $event.target.value, form)" v-model="form.email" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.email }}</small>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">PHONE</label>
                                    <Field name="phone" as="input" type="text"
                                        class="form-control form-control-lg mb-0" rules="digits:11"
                                        @input="updateForm('phone', $event.target.value, form)" v-model="form.phone" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.phone }}</small>
                                </div>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">HEALTH INFO/DISABILITY</label>
                                    <textarea class="form-control" rows="2" @input="updateForm('health', $event.target.value, form)" v-model="form.health" ></textarea>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">RESIDENTIAL ADDRESS
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <textarea class="form-control" rows="2" @input="updateForm('resident', $event.target.value, form)" v-model="form.resident"></textarea>
                                </div>

                                <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">PIC 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <input type="file" class="form-control form-control-lg" @change="form.pic = $event.target.files[0]">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--::assign guardians:student::-->
                    <div class="card border-0 shadow-sm mt-3">
                        <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                            <div class="small-xs font-weight-normal mt-2">STUDENT GUARDIANS</div>
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-end border-0 shadow">
                                    <div class="">
                                        <a class="dropdown-item small font-weight-midi py-2" data-bs-backdrop="static" data-keyboard="false"
                                         data-bs-toggle="modal" data-bs-target="#modal" href="#">Assign Guardian</a>
                                    </div>                           
                                </div>
                            </div>
                        </div>

                        <line-preload :loading="reqState.loading"></line-preload>
                        <div class="card-body px-2 px-sm-3">
                            <div v-if="reqState.loaded && selectedGuardians.length <= 0" class="text-center mb-3">
                                <div class="me-2 me-sm-3 text-muted p-0 m-0" style="font-size:47px;">
                                    <i class="icon icon-assignment icon-lg p-0 m-0"></i>
                                </div>
                                <div class="h7 text-center text-muted mt-n1">No guardian has been selected</div>
                            </div>

                            <div class="row g-3">
                                <div v-for="(guardian, key) in selectedGuardians" class="col-md-4 mb-2">
                                    <div class="border rounded-top rounded-right p-2 pt-3">

                                        <button @click="removeSelectedGuardian(key, guardian.guardian_id)" class="btn-close h7 float-end mt-n2"></button>

                                        <div class="d-flex mt-3">
                                            <img src="@/assets/images/user.png" class="rounded-circle me-2 border bg-light" width="38" height="38">
                                            <span class="text-break overflow-auto mt-n1"> 
                                                <a href="#" class="small text-decoration-none text-primary">{{ guardian.firstname }} {{ guardian.surname }} </a>
                                                <h6 class="small text-muted text-pre-wrap mt-n1">{{ guardian.email }}</h6>
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
                                                    <span class="small">Emergency Contact</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- submit button -->
                    <div class="d-flex justify-content-center mt-3">
                        <loading-button type="submit" class="btn btn-outline-secondary btn-block py-2 px-4" @btnEvent.prevent="handleSubmit($event, createStudent)" :loading="reqState.btnLoading">Create new Student
                        </loading-button>
                    </div>

                </form>
            </VeeForm>


            <!-- assign guardia modal -->
            <modal-left :badge="'modal'">
                <template v-slot:title>
                    <i class="icon icon-customer icon-lg"></i> <span>Assign Guardian</span>
                </template>

                <template v-slot:preloader><line-preload class="w-100" :loading="reqState.modalLoading"></line-preload></template>

                <template v-slot:body>
                    <div class="modal-body px-2">
                        <div v-if="reqState.modalLoaded">
                            <div class="me-auto">
                                <div class="mb-2 px-1">
                                    <input class="form-control bg-light" type="search" @keyup.enter="filterGuardians()" v-model="guardianFetchParams.search" placeholder="Search guardian names or email,phone" aria-label="Search">
                                </div>
                            </div>
                           
                            <div v-for="(guardian, index) in guardians" class="border-0 px-1 pb-0 mb-2">
                                <div class="d-flex justify-content-between border rounded-top rounded-end pt-2 pb-3 px-2">
                                    <div class="d-flex me-2">
                                        <img src="assets/img/nopic.png" class="rounded border me-2 me-sm-3" width="40" height="40" alt=" ">
                                        <span class="text-break mt-n1"> 
                                            <div class="small"><a class="text-decoration-none font-weight-midi text-dark mt-n2">{{ guardian.firstname }} {{ guardian.surname }} {{ guardian.othername }}</a></div>
                                            <div class="small text-muted text-pre-wrap">{{ guardian.email }}</div>
                                        </span>
                                    </div>
                                    <div class="form-check-lg form-check me-n1">
                                        <input type="checkbox" class="form-check-input" 
                                               :checked="selectedGuardians.some(g => g.guardian_id === guardian.guardian_id)"
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
                        :ListTotalPage="paginate.totalPage"
                        :ListCurrentPage="paginate.currentPage"
                        :ListPrevPage="paginate.prevPage"
                        :ListNextPage="paginate.nextPage"
                        :ListPagesLength="paginate.pagesLength"
                        @changePage="navigate($event)">
                    </pagination-links>
                </template>
            </modal-left>
            <!--/assign guardia modal-->

        </template>
    </base-admin>
</template>

<script>
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
import LoadingButton from '@/components/LoadingButton'
import PaginationLinks from '@/components/PaginationLinks'
import ModalLeft from '@/components/ModalLeft'

// composables
import useFormProof from '@/composables/useFormProof'
import usePaginate from '@/composables/usePaginate'
import useFormReset from '@/composables/useFormReset'

// library:vue
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { Form as VeeForm, Field} from 'vee-validate'

// apis
import Class from '@/apis/Class';
import Guardian from '@/apis/Guardian'
import Student from '@/apis/Student'


export default {
    name: 'AddStudent',
    components: {
        BaseAdmin,
        LinePreload,
        LoadingButton,
        PaginationLinks,
        VeeForm,
        Field,
        ModalLeft
    },

    setup(_, context) {
        const store  = useStore()

        // request loading state
        const reqState = reactive({
            loading: false,
            loaded: true,
            btnLoading: false,
            modalLoading: false,
            modalLoaded: false, 
        });

        // paginate guardians resource
        let paginate = ref({
            currentPage: null,
            nextPage: false,
            prevPage: false,
            totalPage: null,
            pagesLength: null,
        });
        

        // class for available for this school
        const schoolClasses = ref([])

        const fetchClasses = async () => {
            reqState.loading = true
            await Class.classes()
            .then((res) => {
                schoolClasses.value = res.data;
                reqState.loading = false
            })
            .catch((err) => {
                console.log(err)
            })
        } 
        // fetch when dom mounted;
        fetchClasses() 


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
            // remove selected guardian object
            selectedGuardians.value.splice(index, 1);            
        }

        // guardian api request params
        let guardianFetchParams = reactive({
            search: '',
            status: 'all',
            account_status: 'all',
            gender: 'all',
            page: 1
        })

        // navigate the guardina reseult list on modal
        const navigate = async (event) => {
            let toPage = event.currentTarget.attributes.id.value;
            guardianFetchParams.page = toPage;
            await fetchGuardians();
        }

        // fetch guardian resource
        const guardians = ref([])

        const fetchGuardians = async () => {
            reqState.modalLoading = true;
            await Guardian.all(guardianFetchParams)
            .then((res) => {
                guardians.value = res.data.data

                const { paging } = usePaginate(res)

                paginate.value = { ...paginate.value, ...paging }

                reqState.modalLoaded = true;
                reqState.modalLoading = false;
            })
            .catch((err) => {
                //
            })
        }

        // search guardian result
        const filterGuardians = async () => {
            guardianFetchParams.page = 1;
            await fetchGuardians(); 
        }
        // fetch resource when its mounted
        onMounted(fetchGuardians)


        // formdata
        let form = ref({
            firstname: '',
            surname: '',
            othername: '',
            gender: 'male',
            dob: '',
            blood_group: '',
            religion: '',
            nationality: 'nigerian',
            state_origin: '',
            local_govt: '',
            admission_class: '',
            admission_date: '',
            admission_number: '',
            email: '',
            phone: '',
            health: '',
            resident: '',
            pic: '',
        });

        const { updateForm, openStorage, saveStorage, removeStorage } = useFormProof(form.value, 'ADD_STUDENT_FORM');

        // pre populate form fields from localstorage
        if (openStorage()) {
            form.value = { ...form.value, ...openStorage() }
        }

        const { resetForm } = useFormReset(form.value, {
            gender: 'male',
            nationality: 'nigerian'  
        })

        const handleFormReset  = () => {
           resetForm('ADD_STUDENT_FORM', (res) => form.value = { ...form.value, ...res }) 
        }

        const createStudent = ( _, actions) => {
            reqState.btnLoading = true;

            let formData =  new FormData()
            let formFields = form.value

            for (let field in formFields) {
                formData.append(field, formFields[field])
            }

            if (selectedGuardians.value.length >= 1) {
                formData.append('guardians', JSON.stringify(selectedGuardians.value))
            }

            Student.create(formData)
            .then((res) => {
                console.log(res);
                reqState.btnLoading = false;
                store.dispatch('general/addSnackbar', res.data.message)
                resetForm('ADD_GUARDIAN_FORM', (res) => form.value = { ...form.value, ...res }) 
            })
            .catch((err) => {
                reqState.btnLoading = false;
                if(err.response.status === 422) {
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
            updateForm, removeStorage, form, handleFormReset, reqState,

            selectGuardian, selectedGuardians, removeSelectedGuardian,

            guardianFetchParams, guardians, filterGuardians,

            paginate, navigate,

            createStudent, schoolClasses
        }
    },

}
</script>

<style scoped>
.text-pre-wrap {
    white-space: pre-wrap;
}

.form-control, .form-select {
    border-radius: .16rem;
}

.form-control, .form-select {
    font-size: 15px;
    font-weight: 500;
    color: inherit;
    padding-right: .5rem;
    padding-left: .5rem;
}

</style>


