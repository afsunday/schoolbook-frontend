<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted small font-weight-midi mt-1">Add Guardian</div>
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

            <div class="card border-0 shadow-sm mt-2 pb-3">
                <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                    <div class="small-xs font-weight-normal mt-2">STUDENT INFORMATION</div>
                    <a @click="handleFormReset()" class="text-decoration-none text-primary">clear</a>
                </div>

                <line-preload :loading="loadingState.loading"></line-preload>

                <div class="card-body px-2 px-sm-3 pt-2 pb-3">
                    <VeeForm v-slot="{ handleSubmit, errors }">
                        <div class="row g-3 mt-3">
                            <div class="col-md-4">
                                <label class="small-xs font-weight-midi m-0">TITLE <span class="text-danger">&#42;</span></label>
                                <select class="form-select form-select-lg" v-model="form.title">
                                     <option value="mr">Mr</option>
                                    <option value="mrs">Mrs</option>
                                </select>
                            </div>

                            <div class="col-md-4">
                                <label class="small-xs font-weight-midi m-0" for="firstname">FIRSTNAME 
                                    <span class="text-danger">&#42;</span>
                                </label>
                                <Field name="firstname" as="input" class="form-control form-control-lg mb-0" type="text" rules="required" @input="updateForm('firstname', $event.target.value, form)" v-model="form.firstname" />
                                <span class="text-danger small-xs mt-n3">{{ errors.firstname }}</span>
                            </div>

                            <div class="col-md-4">
                                <label class="small-xs font-weight-midi m-0">SURNAME 
                                    <span class="text-danger">&#42;</span>
                                </label>
                                <Field name="surname" as="input" class="form-control form-control-lg mb-0" type="text" rules="required" @input="updateForm('surname', $event.target.value, form)" v-model="form.surname" />
                                <span class="text-danger small-xs mt-n3">{{ errors.surname }}</span>
                            </div>
                        </div>

                        <div class="row g-3">
                            <div class="col-md-4">
                                <label class="small-xs font-weight-midi m-0">OTHERNAME 
                                    <span class="text-danger">&#42;</span>
                                </label>
                                <Field name="othername" as="input" class="form-control form-control-lg mb-0" type="text" rules="required" @input="updateForm('othername', $event.target.value, form)" v-model="form.othername" />
                                <span class="text-danger small-xs mt-n3">{{ errors.othername }}</span>
                            </div>

                            <div class="col-md-4">
                                <label class="small-xs font-weight-midi m-0">GENDER 
                                    <span class="text-danger">&#42;</span>
                                </label>
                                <select class="form-select form-select-lg" v-model="form.gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div> 

                            <div class="col-md-4">
                                <label class="small-xs font-weight-midi m-0">NATIONALITY 
                                    <span class="text-danger">&#42;</span>
                                </label>
                                <select class="form-select form-select-lg" @change="updateForm('nationality', $event.target.value, form)" >
                                    <option value="nigerian" selected>NIGERIAN</option>
                                </select>
                            </div>                                             
                        </div>

                        <div class="row g-3">
                            <div class="col-md-4">
                                <label class="small-xs font-weight-midi m-0">STATE OF ORIGIN</label>
                                <input type="text" class="form-control form-control-lg" @input="updateForm('state_origin', $event.target.value, form)" v-model="form.state_origin">
                            </div>

                            <div class="col-md-4">
                                <label class="small-xs font-weight-midi m-0">L.G.A OF ORIGIN</label>
                                <input type="text" class="form-control form-control-lg" @input="updateForm('local_govt', $event.target.value, form)" v-model="form.local_govt" >
                            </div>

                            <div class="col-md-4">
                                    <label class="small-xs font-weight-midi m-0">EMAIL 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <Field name="email" as="input" class="form-control form-control-lg mb-0" type="email" rules="email" @input="updateForm('email', $event.target.value, form)" v-model="form.email" />
                                    <span class="text-danger small-xs mt-n3">{{ errors.email }}</span>
                            </div>
                        </div>

                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="small-xs font-weight-midi m-0" for="validate-phone">PHONE 
                                    <span class="text-danger">&#42;</span>
                                </label>
                                <Field name="phone" as="input" class="form-control form-control-lg mb-0" type="text" rules="digits:11" @input="updateForm('phone', $event.target.value, form)" v-model="form.phone" />
                                <span class="text-danger small-xs mt-n3">{{ errors.phone }}</span>
                            </div>

                            
                            <div class="col-md-6">
                                <label class="small-xs font-weight-midi m-0">PIC</label>
                                <Field name="pic" as="input" type="file" class="form-control form-control-lg" @change="form.pic = $event.target.files" />
                                <span class="text-danger small-xs mt-n3">{{ errors.pic }}</span>
                            </div>                            
                        </div>

                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="small-xs font-weight-midi m-0">RESIDENTIAL ADDRESS 
                                    <span class="text-danger">&#42;</span>
                                </label>
                                <Field name="resident" as="textarea" class="form-control form-control-lg mb-0" rules="required" rows="2" @input="updateForm('resident', $event.target.value, form)" v-model="form.resident"></Field>
                                <span class="text-danger small-xs mt-n3">{{ errors.resident }}</span>
                            </div>

                            <div class="col-md-6">
                                <label class="small-xs font-weight-midi m-0">OCCUPATION</label>
                                <textarea class="form-control" rows="2" @input="updateForm('occupation', $event.target.value, form)" v-model="form.occupation" ></textarea>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center mt-3">
                            <loading-button class="btn btn-secondary btn-block px-3" :loading="loadingState.btnLoading" @btnEvent.prevent="handleSubmit($event, createGuardian)">Create New Guardian</loading-button>
                        </div>
                    </VeeForm>
                    
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

// composables
import useFormProof from '@/composables/useFormProof'
import useFormReset from '@/composables/useFormReset'

// library:vue
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import { Form as VeeForm, Field} from 'vee-validate'

// apis
import Guardian from '@/apis/Guardian'

export default {
    name: 'AddGuardian',
    components: {
        BaseAdmin,
        LinePreload,
        LoadingButton,
        VeeForm,
        Field
    },

    setup() {
        const store  = useStore()

        const loadingState = reactive({
            loading: false,
            loaded: false,
            btnLoading: false,
        })
        
        const form = ref({
            title: 'mr',
            firstname: '',
            surname: '',
            othername: '',
            gender: 'male',
            nationality: 'nigerian',
            state_origin: '',
            local_govt: '',
            email: '',
            phone: '',
            pic: '',
            resident: '',
            occupation: ''
        })
         
        const { updateForm, openStorage, saveStorage, removeStorage } = useFormProof(form.value, 'ADD_GUARDIAN_FORM');

        // pre populate form fields from localstorage
        if (openStorage()) {
            form.value = { ...form.value, ...openStorage() }
        }

        const { resetForm } = useFormReset(form.value, {
            title: 'mr',
            gender: 'male',
            nationality: 'nigerian'  
        })

        const handleFormReset  = () => {
           resetForm('ADD_GUARDIAN_FORM', (res) => form.value = { ...form.value, ...res }) 
        }

        // create new guardian record in db
        const createGuardian = (_, actions) => {
            loadingState.loading = loadingState.btnLoading = true

            let formFields = form.value
            let formData = new FormData()

            for (const field in formFields) {
                formData.append(field, formFields[field])
            }

            Guardian.create(formData)
            .then((res) => {
                loadingState.loading = loadingState.btnLoading = false

                store.dispatch('general/addSnackbar', res.data.message)
                resetForm('ADD_GUARDIAN_FORM', (res) => form.value = { ...form.value, ...res })
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
            form, updateForm, removeStorage, loadingState,
            createGuardian, handleFormReset
        }
    }        
}

</script>

<style scoped>

.form-control, 
.form-select,
.form-select-lg {
    border-radius: .16rem;
}

.form-control, 
.form-select,
.form-select-lg {
    font-size: 15px;
    font-weight: 500;
    padding-right: .5rem;
    padding-left: .5rem;
    margin-bottom: -0.25rem;
}

</style>