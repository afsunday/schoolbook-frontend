<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted small font-weight-midi mt-1">Update Guardian</div>
                        </div>
                        <div class="dropdown">
                            <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                            <div class="dropdown-menu dropdown-menu-right border-0 shadow py-3" aria-labelledby="dropdownMenuLink">

                                <a class="dropdown-item small font-weight-midi py-2" data-backdrop="static" data-keyboard="false"
                                 data-toggle="modal" data-target="#deactivate-modal" href="#">Achive Guardian</a>                                
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </template>

        <template v-slot:default> 
            <VeeForm v-slot="{ handleSubmit, errors }">           
                <div class="card border-0 shadow-sm mt-2 pb-3 min-100">
                    <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                        <div class="small-xs font-weight-normal mt-2">GUARDIAN INFORMATION</div>
                    </div>

                    <line-preload :loading="loadingState.loading"></line-preload>

                    <empty-list :loaded="loadingState.loaded" :items="form.guardian" :errState="errState.hasError">
                        Oops we dont have a Gaurdian with that record
                    </empty-list>

                    <error-reload :hasError="errState.hasError" :netError="errState.netError" :reqError="errState.reqError" 
                        @retry="e => {errState.reqError = errState.netError = errState.hasError = false; fetchGuardian(); fetchGuardianWards();}">
                    </error-reload>

                    <div v-if="loadingState.loaded && Object.keys(form.guardian).length > 0" class="card-body px-2 px-sm-3 pt-2 pb-3">

                        <div class="form-row mt-3">
                            <div class="form-group  col-md-4">
                                <label class="small-xs font-weight-midi m-0">TITLE <span class="text-danger">&#42;</span></label>
                                <select class="custom-select custom-select-lg" v-model="form.guardian.title">
                                     <option value="mr">Mr</option>
                                    <option value="mrs">Mrs</option>
                                </select>
                            </div>

                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">FIRSTNAME <span class="text-danger">&#42;</span></label>
                                <Field name="firstname" as="input" type="text" class="form-control form-control-lg mb-0" rules="required" v-model="form.guardian.firstname" />
                                <small class="text-danger small-xs mt-n3">{{ errors.firstname }}</small>
                            </div>

                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">SURNAME <span class="text-danger">&#42;</span></label>
                                <Field name="surname" as="input" type="text" class="form-control form-control-lg mb-0" rules="required" v-model="form.guardian.surname" />
                                <small class="text-danger small-xs mt-n3">{{ errors.surname }}</small>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0" for="firstname">OTHERNAME <span class="text-danger">&#42;</span></label>
                                <Field name="othername" as="input" type="text" class="form-control form-control-lg mb-0" rules="required" v-model="form.guardian.othername" />
                                <small class="text-danger small-xs mt-n3">{{ errors.othername }}</small>
                            </div>

                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">GENDER <span class="text-danger">&#42;</span></label>
                                <select class="custom-select custom-select-lg" v-model="form.guardian.gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div> 

                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">NATIONALITY <span class="text-danger">&#42;</span></label>
                                <select class="custom-select custom-select-lg" v-model="form.guardian.nationality">
                                    <option value="nigerian">NIGERIAN</option>
                                </select>
                            </div>                                             
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">STATE OF ORIGIN</label>
                                <input type="text" class="form-control form-control-lg" v-model="form.guardian.state_origin">
                            </div>

                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">L.G.A OF ORIGIN</label>
                                <input type="text" class="form-control form-control-lg" v-model="form.guardian.local_govt">
                            </div>

                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">EMAIL <span class="text-danger">&#42;</span></label>
                                <Field name="email" as="input" type="email" class="form-control form-control-lg mb-0" rules="email" v-model="form.guardian.email" />
                                <small class="text-danger small-xs mt-n3">{{ errors.email }}</small>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label class="small-xs font-weight-midi m-0" for="validate-phone">PHONE <span class="text-danger">&#42;</span></label>
                                <Field name="phone" as="input"  type="number" class="form-control form-control-lg mb-0" rules="digits:11" v-model="form.guardian.phone" />
                                <small class="text-danger small-xs mt-n3">{{ errors.phone }}</small>
                            </div>

                            
                            <div class="form-group col-md-6">
                                <label class="small-xs font-weight-midi m-0">PIC</label>
                                <input type="file" class="form-control form-control-lg" @change="form.guardian.passport = $event.target.files[0]">
                            </div>                            
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label class="small-xs font-weight-midi m-0">RESIDENTIAL ADDRESS <span class="text-danger">&#42;</span></label>
                                <Field name="residential_address" as="textarea" class="form-control" rows="2" rules="required" v-model="form.guardian.residential_address" />
                                <small class="text-danger small-xs mt-n3">{{ errors.othername }}</small>
                            </div>

                            <div class="form-group col-md-6">
                                <label class="small-xs font-weight-midi m-0">OCCUPATION</label>
                                <textarea class="form-control" rows="2" v-model="form.guardian.occupation"></textarea>
                            </div>
                        </div>                        
                    </div>                
                </div> 

               <!--  Guardian wards -->
                <div class="card border-0 shadow-sm mt-3">
                    <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                        <div class="small-xs font-weight-normal mt-2">GUARDIANS WARDS</div>
                    </div>

                    <div class="card-body px-2 px-sm-3">
                        <div v-if="loadingState.loaded && Object.keys(form.guardian).length > 0" class="form-row">
                            <div v-for="ward in form.wards" class="col-md-4 mb-2">
                                <div class="border rounded-top rounded-right p-2 pt-3">
                                    <div class="d-flex mt-2">
                                        <img src="@/assets/images/user.png" class="rounded-circle mr-2 border bg-light" width="35" height="35">
                                        <div class="text-break overflow-auto"> 
                                            <h6 href="#" class="small text-decoration-none text-primary">{{ ward.firstname }} {{ ward.surname }} {{ ward.othername }} </h6>
                                            <div class="d-flex flex-wrap">
                                                <div class="d-inline-flex text-dark mr-2 mr-sm-3">
                                                    <div class="mr-1"><i class="icon icon-watchlist icon-lg"></i></div>
                                                    <div :class="ward.status" class="ml-1 text-break text-capitalize small">{{ ward.status }}</div>
                                                </div>
                                                <div class="d-inline-flex text-dark mr-sm-3">
                                                    <div class="mr-1"><i class="icon icon-badges icon-lg"></i></div>
                                                    <div class="ml-1 text-break text-muted small">{{ ward.admission_number }}</div>
                                                </div>
                                                <div class="d-inline-flex text-dark">
                                                    <div class="mr-1"><i class="icon icon-repo icon-lg"></i></div>
                                                    <div class="ml-1 text-break text-muted small">{{ ward.classname }}</div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group mt-2">
                                        <label class="small-xs font-weight-midi m-0">Relationship<span class="text-danger"> &#42;</span></label>
                                        <Field :name="'relationship' + ward.student_id" as="input" type="text" class="form-control form-control-lg mb-0" rules="required" v-model="ward.relationship" />
                                        <small class="text-danger small-xs mt-n3">{{ errors['relationship' + ward.student_id] }}</small>
                                    </div>
                                    <div class="form-group mt-2">
                                        <div class="custom-control-lg custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" v-model="ward.emergency" :checked="ward.emergency" :id="ward.student_id">
                                            <label class="custom-control-label" :for="ward.student_id">
                                                <span class="small ml-n2">Emergency Contact</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-row justify-content-center mt-3">
                    <div class="col-md-3">
                        <loading-button class="btn btn-ripple ripple btn-block" :loading="loadingState.btnLoading" @btnEvent.prevent="handleSubmit(updateGuardian)">Update Guardian</loading-button>
                    </div>
                </div>

            </VeeForm>
        </template>

    </base-admin>
</template>

<script>
// components
import BaseAdmin from '@/views/layouts/BaseAdmin.vue'
import LinePreload from '@/components/LinePreload'
import LoadingButton from '@/components/LoadingButton'
import ErrorReload from '@/components/ErrorReload'
import EmptyList from '@/components/EmptyList'

// composables
import useFormProof from '@/composables/useFormProof'
import useFormReset from '@/composables/useFormReset'
import useErrorReloadState from '@/composables/useErrorReloadState'

// library:vue
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { Form as VeeForm, Field} from 'vee-validate'

// apis
import Guardian from '@/apis/Guardian'

export default {
    name: 'EditGuardian',
    components: {
        BaseAdmin,
        LinePreload,
        LoadingButton,
        ErrorReload,
        EmptyList,
        VeeForm,
        Field
    },

    setup() {
        const store  = useStore()
        const route = useRoute()
        const { errState, setReloadStates } = useErrorReloadState()

        const loadingState = reactive({
            loading: false,
            loaded: false,
            btnLoading: false,
        })

        const form = ref({
            guardian: {},
            wards: []
        })

        // fetch guardinan
        const fetchGuardian = async () => {
            loadingState.loading = true; 
            loadingState.loaded = false;

            let guardianId = route.params.guardianId

            await Guardian.me(guardianId).then((res) => {
                console.log(res)
                if(res.data.length > 0) {
                    form.value.guardian = res.data[0]
                }
            })
            .catch((err) => {
                setReloadStates(err)
                loadingState.loading = false
            })
        }

        // fetch guardian wards
        const guardianWards = ref([])
        const fetchGuardianWards = async () => {
            let guardianId = route.params.guardianId
            
            await Guardian.wards(guardianId).then((res) => {
                console.log(res)
                form.value.wards = res.data

                loadingState.loading = false
                loadingState.loaded = true
            })
            .catch((err) => {
                loadingState.loaded = false
                loadingState.loading = false 

                setReloadStates(err)
            })
        }

        const makeApiRequests = async () => {
            if (isNaN(route.params.guardianId)) {
                store.dispatch('general/addSnackbar',
                    'You followed a wrong link go back to previous page.')
            } else {
                await fetchGuardian()
                await fetchGuardianWards()
            }
        }

        // onCreated make the request
        makeApiRequests()

        // update guardian record
        const updateGuardian = async (_, actions) => {
            loadingState.loading = true
            loadingState.btnLoading = true

            let guardian = form.value.guardian
            let wards = form.value.wards
            let formData =  new FormData()

            for (let field in guardian) {
                formData.append(field, guardian[field]);
            }

            if (form.value.wards.length >= 1) {
                formData.append('wards', JSON.stringify(wards))
            }

            await Guardian.update(formData).then((res) => {
                loadingState.loading = loadingState.btnLoading = false
                store.dispatch('general/addSnackbar', res.data.message);

                // on success refresh form
                makeApiRequests()
            })
            .catch((err) => {
                loadingState.loading = loadingState.btnLoading = false

                if(err.response.status === 422) {
                    let formErrors =  err.response.data.errors
                    let errorBag = {}

                    for (let error in formErrors) {
                        errorBag[error] = formErrors[error][0]
                    }

                    actions.setErrors({ ...errorBag })

                } else {
                    store.dispatch('general/addSnackbar', 'Sorry an error occured while updating record pleease retry.');
                }
            })
        }


        return {
            loadingState, errState, 
            fetchGuardian, fetchGuardianWards,
            updateGuardian, form
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
    background: transparent;
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


