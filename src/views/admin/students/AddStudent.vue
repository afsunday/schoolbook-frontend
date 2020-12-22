<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="d-inline-flex mt-1">
                            <i class="icon icon-user-add icon-lg mr-1"></i> 
                            <span class="small">ADD STUDENT</span>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Achived Students</a>

                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#invoice-modal">Add Students</a>
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
                        </div>

                        <line-preload :loading="reqState.loading"></line-preload>

                        <div class="card-body px-2 px-sm-3 pt-2 pb-3">

                            <div class="form-row mt-3">
                                <div class="form-group  col-md-4">
                                    <label class="small-xs font-weight-midi m-0">FIRSTNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="firstname" as="input" class="form-control form-control-lg mb-0" rules="required"
                                           @input="updateForm('firstname', $event.target.value)" :value="form.firstname" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.firstname }}</small>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">SURNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="surname" as="input" class="form-control form-control-lg mb-0" rules="required"
                                           @input="updateForm('surname', $event.target.value)" :value="form.surname" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.surname }}</small>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">OTHERNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="othername" as="input" class="form-control form-control-lg mb-0" rules="required"
                                           @input="updateForm('othername', $event.target.value)" :value="form.othername" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.othername }}</small>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">GENDER <span class="text-danger">&#42;</span></label>
                                    <select class="form-control form-control-lg mb-0" v-model="form.gender"  rules="required">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <small class="text-danger small-xs mt-n3">{{ errors.gender }}</small>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">DATE OF BIRTH 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="dob" as="input" type="date" class="form-control form-control-lg mb-0" rules="required"
                                        @input="updateForm('dob', $event.target.value)" :value="form.dob" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.dob }}</small>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">BLOOD GROUP</label>
                                    <input type="text" class="form-control form-control-lg mb-0"
                                        @input="updateForm('blood_group', $event.target.value)" :value="form.blood_group" />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">RELIGION</label>
                                    <input type="text" class="form-control form-control-lg mb-0"
                                        @input="updateForm('religion', $event.target.value)" :value="form.religion" />
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">NATIONALITY</label>
                                    <select class="form-control form-control-lg mb-0">
                                        <option value="nigerian">NIGRERIAN</option>
                                    </select>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">STATE OF ORIGIN </label>
                                    <input type="text" class="form-control form-control-lg mb-0"
                                        @input="updateForm('state_origin', $event.target.value)" :value="form.state_origin" />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">L.G.A OF ORIGIN</label>
                                    <input type="text" class="form-control form-control-lg mb-0"
                                        @input="updateForm('local_govt', $event.target.value)" :value="form.local_govt" />
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">ADMISSION CLASS 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="class" as="select" class="custom-select custom-select-lg" v-model="form.admission_class" rules="required">
                                        <option v-for="xclass in schoolClasses" :value="xclass.id">
                                            {{ xclass.class_name }} {{ xclass.arm }}
                                        </option>
                                    </Field>
                                    <small class="text-danger small-xs mt-n3">{{ errors.class }}</small>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">ADMISSION DATE 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="admission_date" as="input" type="date" 
                                        class="form-control form-control-lg mb-0" rules="required"
                                        @input="updateForm('admission_date', $event.target.value)" :value="form.admission_date" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.admission_date }}</small>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">ADMISSION NUMBER<span class="text-danger">&#42;</span></label>
                                    <Field name="admission_number" as="input" type="text" 
                                        class="form-control form-control-lg mb-0" rules="required"
                                        @input="updateForm('admission_number', $event.target.value)" :value="form.admission_number" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.admission_number }}</small>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">EMAIL</label>
                                    <Field name="email" as="input" type="text" 
                                        class="form-control form-control-lg mb-0" rules="email"
                                        @input="updateForm('email', $event.target.value)" :value="form.email" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.email }}</small>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">PHONE</label>
                                    <Field name="phone" as="input" 
                                        class="form-control form-control-lg mb-0" rules="digits:11"
                                        @input="updateForm('phone', $event.target.value)" :value="form.phone" />
                                    <small class="text-danger small-xs mt-n3">{{ errors.phone }}</small>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">HEALTH INFO/DISABILITY</label>
                                    <textarea class="form-control" rows="2" @input="updateForm('health', $event.target.value)" :value="form.health" ></textarea>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">RESIDENTIAL ADDRESS
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <textarea class="form-control" rows="2" @input="updateForm('resident', $event.target.value)" :value="form.resident"></textarea>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">PIC 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <input type="file" class="form-control form-control-lg" @change="form.pic = $event.target.files[0]">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- assign student card -->
                    <div class="card border-0 shadow-sm mt-3">
                        <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                            <div class="small-xs font-weight-normal mt-2">STUDENT GUARDIANS</div>
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                    <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                     data-toggle="modal" data-target="#modal" href="#">Assign Guardian</a>                           
                                </div>
                            </div>
                        </div>

                        <line-preload :loading="reqState.loading"></line-preload>
                        <div class="card-body px-2 px-sm-3">
                            <div v-if="reqState.loaded && selectedGuardians.length <= 0" class="text-center mb-3">
                                <div class="mr-2 mr-sm-3 text-muted p-0 m-0" style="font-size:47px;">
                                    <i class="icon icon-assignment icon-lg p-0 m-0"></i>
                                </div>
                                <div class="h7 text-center text-muted mt-n1">No guardian has been selected</div>
                            </div>

                            <div class="form-row">
                                <div v-for="(guardian, key) in selectedGuardians" class="col-md-4 mb-2">
                                    <div class="border rounded-top rounded-right p-2 pt-3">

                                        <a @click="removeSelectedGuardian(key, guardian.guardian_id)" class="close mt-n3">&times;</a>

                                        <div class="d-flex mt-2">
                                            <img src="@/assets/images/user.png" class="rounded-circle mr-2 border bg-light" width="35" height="35">
                                            <span class="text-break overflow-auto mt-n1"> 
                                                <a href="#" class="small text-decoration-none text-primary">{{ guardian.firstname }} {{ guardian.surname }} </a>
                                                <div class="small text-muted text-pre-wrap mt-n1">{{ guardian.email }}</div>
                                            </span>
                                        </div>

                                        <div class="form-group mt-2">
                                            <label class="small-xs font-weight-midi m-0">Relationship
                                                <span class="text-danger">&#42;</span>
                                            </label>
                                            <Field :name="'relationship' + guardian.guardian_id" as="input" class="form-control" v-model="guardian.relationship" placeholder="ex. father" rules="required" />
                                            <small class="text-danger small-xs mt-n3">{{ errors['relationship' + guardian.guardian_id] }}</small>
                                        </div>

                                        <div class="form-group mt-2">
                                            <div class="custom-control-lg custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" :id="guardian.guardian_id" v-model="guardian.emergency" :checked="guardian.emergency" >
                                                <label class="custom-control-label" :for="guardian.guardian_id">
                                                    <span class="small ml-n2">Emergency Contact</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- submit button -->
                    <div class="form-row justify-content-center mt-3">
                        <div class="col-md-3">
                            <loading-button type="submit" class="btn btn-ripple ripple btn-block" @btnEvent.prevent="handleSubmit($event, createStudent)" :loading="reqState.btnLoading">Create Student
                            </loading-button>
                        </div>
                    </div>

                </form>
            </VeeForm>


            <!-- assign guardia modal -->
            <div class="modal" id="modal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content border-0">
                        <div class="modal-header pt-2 pb-3">
                            <div class="modal-title mt-1" id="modal"><i class="icon icon-customer icon-lg"></i> <span>Assign Guardian</span></div>
                            <button type="button" class="close outline-0" data-dismiss="modal" aria-label="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <line-preload class="w-100" :loading="reqState.modalLoading"></line-preload>

                        <div class="modal-body px-2">
                            <div v-if="reqState.modalLoaded">
                                <div class="mr-auto">
                                    <div class="form-group px-1">
                                        <input class="form-control bg-light" type="search" @keyup.enter="filterGuardians()" v-model="guardianFetchParams.search" placeholder="Search guardian names or email,phone" aria-label="Search">
                                    </div>
                                </div>

                                <table class="table" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr v-for="(guardian, index) in guardians">
                                            <td class="border-0 px-1 pb-0">
                                                <div class="d-flex justify-content-between border rounded-top rounded-right pt-2 pb-3 px-2">
                                                    <div class="d-flex mr-2">
                                                        <img src="assets/img/nopic.png" class="rounded border mr-2 mr-sm-3" width="40" height="40" alt=" ">
                                                        <span class="text-break mt-n1"> 
                                                            <div class="small"><a class="text-decoration-none font-weight-midi text-dark mt-n2">{{ guardian.firstname }} {{ guardian.surname }} {{ guardian.othername }}</a></div>
                                                            <div class="small text-muted text-pre-wrap">{{ guardian.email }}</div>
                                                        </span>
                                                    </div>
                                                    <div class="custom-control-lg custom-control custom-checkbox mr-n2">
                                                        <input type="checkbox" class="custom-control-input" 
                                                               :checked="selectedGuardianIds.includes(guardian.guardian_id)"
                                                               @click="selectGuardian($event, guardian)" :id="'checkbox'+guardian.guardian_id">
                                                        <label class="custom-control-label" :for="'checkbox'+guardian.guardian_id"></label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>                           
                        </div>
                        <div class="modal-footer d-block pb-0 px-0">
                            <!-- Pagination -->
                            <pagination-links
                            :ListTotalPage="paginate.totalPage"
                            :ListCurrentPage="paginate.currentPage"
                            :ListPrevPage="paginate.prevPage"
                            :ListNextPage="paginate.nextPage"
                            :ListPagesLength="paginate.pagesLength"
                            @changePage="navigate($event)">
                            </pagination-links>
                        </div>
                    </div>
                </div>
            </div>
            <!--/assign guardia modal-->

        </template>
    </base-admin>
</template>

<script>
// components
import BaseAdmin from '@/views/layouts/BaseAdmin.vue'
import LinePreload from '@/components/LinePreload'
import LoadingButton from '@/components/LoadingButton'
import PaginationLinks from '@/components/PaginationLinks'

// composables
import useFormProof from '@/composables/useFormProof'
import usePaginate from '@/composables/usePaginate'

// library:vue
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted, computed } from 'vue'
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
        Field
    },

    setup(_, context) {
        const store  = useStore()

        const { updateForm, openStorage, saveStorage, removeStorage } = useFormProof(form, 'ADD_STUDENT_FORM');        

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
            Class.classes()
            .then((res) => {
                schoolClasses.value = res.data;
            })
            .catch((err) => {
                console.log(err)
            })
        } 
        // fetch when dom mounted;
        onMounted(fetchClasses) 


        // selected guardians contains array:objects
        //  with an helper array to track selections
        const selectedGuardians = ref([])

        const selectedGuardianIds = ref([])

        const selectGuardian = (event, guardian) => {
            if (event.currentTarget.checked) {

                const guardianAssignedForm = { relationship: '', emergency: false }
                const selectedGuardianWithForm = Object.assign(guardian, guardianAssignedForm);

                selectedGuardians.value.push(selectedGuardianWithForm);
                selectedGuardianIds.value.push(guardian.guardian_id)
            } else {
                
                // removal of guardian object and removal
                // of guardian id for tracking selections
                selectedGuardians.value.forEach((item, index) => {
                    if(item.guardian_id === guardian.guardian_id) {
                        selectedGuardians.value.splice(index, 1);
                    }
                })

                const selectedGuardianIdIndex = selectedGuardianIds.value.indexOf(guardian.guardian_id);
                selectedGuardianIds.value.splice(selectedGuardianIdIndex, 1);
            } 
        }
        
        // remove selected guardian from array
        const removeSelectedGuardian = (index, guardianId) => {
            // remove selected guardian object
            selectedGuardians.value.splice(index, 1);

            /// remove selected guardian from array
            let selectedGuardianIdIndex = selectedGuardianIds.value.indexOf(guardianId);
            if (selectedGuardianIdIndex > -1) {
                selectedGuardianIds.value.splice(selectedGuardianIdIndex, 1);
            }
        }

        // guardian api request params
        let guardianFetchParams = reactive({
            search: '',
            status: 'all',
            account_status: 'all',
            gender: 'all',
            page: 1,
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
        let form = reactive({
            firstname: '',
            surname: '',
            othername: '',
            gender: '',
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

        // pre populate form fields from localstorage
        if (openStorage()) {
            form = { ...form, ...openStorage() }
        }

        const createStudent = ( _, actions) => {
            // reqState.btnLoading = true;

            let formData =  new FormData()

            for (let field in form) {
                formData.append(field, form[field])
            }

            if (selectedGuardians.value.length >= 1) {
                formData.append('guardians', JSON.stringify(selectedGuardians))
            }


            Student.create(formData)
            .then((res) => {
                console.log(res);
                // reqState.btnLoading = false;
                // store.dispatch('general/addSnackbar', res.data.message )
            })
            .catch((err) => {
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
            updateForm, removeStorage, form, reqState,

            selectGuardian, selectedGuardians, selectedGuardianIds, removeSelectedGuardian,

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

.modal.show {
    padding: 0px !important;
}

.modal-dialog {
    margin: 0px;
    max-width: 450px;
}

.modal-dialog > .modal-content {
    height: 100vh;
    border-radius: 0px;
}

.modal-dialog-scrollable .modal-content {
    max-height: unset; 
    overflow: hidden;
}

.form-control, .custom-select {
    border-radius: .16rem;
}

.form-control, .custom-select {
    font-size: 15px;
    font-weight: 500;
    color: inherit;
    background: transparent;
    flex-grow: 1;
    padding-right: .5rem;
    padding-left: .5rem;
}

.form-row {
    margin-right: -10px;
    margin-left: -10px;
}

.form-row > .form-group {
    margin-bottom: .45rem;
}

.form-row > .col, .form-row > [class*="col-"] {
    padding-right: 10px;
    padding-left: 10px;
}

</style>


