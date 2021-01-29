<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted small font-weight-midi mt-1">Add Staff</div>
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

            <div class="card border-0 shadow-sm mt-2 pb-3">
                <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                    <div class="small-xs font-weight-normal mt-2">STAFF INFORMATION</div>
                </div>

                <line-preload :loading="loadingState.loading"></line-preload>

                <div class="card-body px-2 px-sm-3 pt-2 pb-3 min-100">
                    <div v-if="loadingState.loaded && !fetchStaffHasError && Object.keys(staff).length > 0">
                        <VeeForm v-slot="{ handleSubmit, errors }">
                            <div class="form-row mt-3">
                                <div class="form-group  col-md-4">
                                    <label class="small-xs font-weight-midi m-0">TITLE <span class="text-danger">&#42;</span></label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Eg mr, mrs, miss" v-model="staff.title">
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="firstname">FIRSTNAME
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="firstname" as="input" class="form-control form-control-lg mb-0"
                                        type="text" rules="required"
                                        v-model="staff.firstname" />
                                    <span class="text-danger small-xs mt-n3">{{ errors.firstname }}</span>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">SURNAME
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="surname" as="input" class="form-control form-control-lg mb-0" type="text" rules="required" v-model="staff.surname" />
                                    <span class="text-danger small-xs mt-n3">{{ errors.surname }}</span>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">OTHERNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="othername" as="input" class="form-control form-control-lg mb-0" type="text" rules="required"  v-model="staff.othername" />
                                    <span class="text-danger small-xs mt-n3">{{ errors.othername }}</span>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">GENDER 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <select class="custom-select custom-select-lg" 
                                        
                                        v-model="staff.gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div> 

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">NATIONALITY 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <select class="custom-select custom-select-lg" >
                                        <option value="nigerian" selected>NIGERIAN</option>
                                    </select>
                                </div>                                             
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">DATE OF BIRTH</label>
                                    <input type="date" class="form-control form-control-lg" v-model="staff.dob">
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">EMAIL 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="email" as="input" class="form-control form-control-lg mb-0" type="email" rules="required|email" v-model="staff.email" />
                                    <span class="text-danger small-xs mt-n3">{{ errors.email }}</span>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="validate-phone">STAFF TYPE 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <select class="custom-select custom-select-lg" 
                                        v-model="staff.staff_type">
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="validate-phone">OFFICE</label>
                                    <input type="text" class="form-control form-control-lg mb-0" 
                                        v-model="staff.office" :disabled="staff.staff_type === 'teacher'">
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0" for="validate-phone">PHONE
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="phone" as="input" class="form-control form-control-lg mb-0" type="text" rules="required|digits:11" v-model="staff.phone" />
                                    <span class="text-danger small-xs mt-n3">{{ errors.phone }}</span>
                                </div>
                                
                                <div class="form-group col-md-4">
                                    <label class="small-xs font-weight-midi m-0">EMPLOY DATE</label>
                                    <input type="date" class="form-control form-control-lg" 
                                        v-model="staff.employ_date">
                                </div>                            
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-7">
                                    <label class="small-xs font-weight-midi m-0">RESIDENTIAL ADDRESS 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="resident" as="textarea" class="form-control form-control-lg mb-0" rules="required" rows="2" v-model="staff.resident"></Field>
                                    <span class="text-danger small-xs mt-n3">{{ errors.resident }}</span>
                                </div> 

                                <div class="form-group col-md-5">
                                    <label class="small-xs font-weight-midi m-0">PIC</label>
                                    <Field name="pic" as="input" type="file" class="form-control form-control-lg pb-5 pt-4" @change="staff.pic = $event.target.files" />
                                    <span class="text-danger small-xs mt-n3">{{ errors.pic }}</span>
                                </div>                           
                            </div>

                            <div class="form-row justify-content-center mt-3">
                                <div class="col-md-3">
                                    <loading-button class="btn btn-ripple ripple btn-block" :loading="loadingState.btnLoading" @btnEvent.prevent="handleSubmit($event, updateStaff)">Update Staff</loading-button>
                                </div>
                            </div>
                        </VeeForm>
                    </div><!--conditional-->

                    <empty-list class="my-4" :loaded="loadingState.loaded && !fetchStaffHasError" :items="Object.keys(staff)">
                       Oops we can't find a user with such info
                    </empty-list>

                    <retry-button class="my-4" :list="true" :hasRetry="fetchStaffHasError" 
                        @retry="e => { 
                            fetchStaffHasError = loadingState.loaded = false; 
                            fetchStaff(); 
                        }">
                        Oops something went wrong try again.
                    </retry-button>
                </div>                
            </div>            
        </template>

    </base-admin>
</template>

<script>
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
import LoadingButton from '@/components/LoadingButton'
import RetryButton from '@/components/RetryButton'
import EmptyList from '@/components/EmptyList'


// composables
import useFormProof from '@/composables/useFormProof'
import useFormReset from '@/composables/useFormReset'

// library:vue
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Form as VeeForm, Field} from 'vee-validate'

// apis
import Staff from '@/apis/Staff'

export default {
    name: 'EditStaff',
    components: {
        BaseAdmin,
        LinePreload,
        LoadingButton,
        VeeForm,
        Field,
        RetryButton,
        EmptyList
    },

    setup() {
        const store  = useStore()
        const route = useRoute()

        const loadingState = reactive({
            loading: false,
            loaded: false,
            btnLoading: false,
        })

        
        const staff = ref({})
        const fetchStaffHasError = ref(false)

        // fetch guardian bio data
        const fetchStaff = async () => {
            loadingState.loading = true; 
            loadingState.loaded = false;

            let staffId = route.params.staffId

            await Staff.me(staffId).then((res) => {
                if(res.data.length > 0) {
                    staff.value = res.data[0]
                }

                loadingState.loading = false; 
                loadingState.loaded = true;
            }).catch((err) => {

                loadingState.loading = false
                loadingState.loaded = true
                fetchStaffHasError.value = true
            })
        }

        // on created hook fetch staff record
        fetchStaff()

        // create new guardian record in db
        const updateStaff = (_, actions) => {
            loadingState.loading = loadingState.btnLoading = true

            let formFields = form.value
            let formData = new FormData()

            for (const field in formFields) {
                formData.append(field, formFields[field])
            }

            Staff.update(formData).then((res) => {
                loadingState.loading = loadingState.btnLoading = false

                store.dispatch('general/addSnackbar', 'dummy' /*res.data.message*/)
            })
            .catch((err) => {
                loadingState.loading = loadingState.btnLoading = false
                if(err.response.status === 422) {
                    let formErrors =  err.response.data.errors
                    let errorBag = {}

                    for (let error in formErrors) {
                        errorBag[error] = formErrors[error][0]
                    }

                    actions.setErrors({
                        ...errorBag
                    })
                }
            })
        }

        return {
            staff, loadingState, fetchStaff, fetchStaffHasError,

            updateStaff
        }
    }        
}

</script>

<style scoped>

.form-control, 
.custom-select,
.custom-select-lg {
    border-radius: .16rem;
}

.form-control, 
.custom-select,
.custom-select-lg {
    font-size: 15px;
    font-weight: 500;
    color: inherit;
    flex-grow: 1;
    padding-right: .5rem;
    padding-left: .5rem;
    margin-bottom: -0.25rem;
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