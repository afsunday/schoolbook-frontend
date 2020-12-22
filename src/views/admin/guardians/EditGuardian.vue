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
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form>
            <div class="card border-0 shadow-sm mt-2 pb-3" style="min-height:200px">
                <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                    <div class="small-xs font-weight-normal mt-2">GUARDIAN INFORMATION</div>
                </div>

                <line-preload :loading="loading"></line-preload>
                <div v-if="loaded" class="card-body px-2 px-sm-3 pt-2 pb-3">

                    <div class="form-row mt-3">
                        <div class="form-group  col-md-4">
                            <label class="small-xs font-weight-midi m-0">TITLE <span class="text-danger">&#42;</span></label>
                            <select class="custom-select custom-select-lg" v-model="form.guardian.title">
                                 <option value="mr">Mr</option>
                                <option value="mrs">Mrs</option>
                            </select>
                        </div>

                        <div class="form-group col-md-4">
                            <ValidationProvider  vid="firstname" name="firstname" rules="required" v-slot="{ errors }" >
                                <label class="small-xs font-weight-midi m-0">FIRSTNAME <span class="text-danger">&#42;</span></label>
                                <input type="text" class="form-control form-control-lg" v-model="form.guardian.firstname">
                                <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>

                        <div class="form-group col-md-4">
                            <ValidationProvider  vid="surname" name="surname" rules="required" v-slot="{ errors }" >
                                <label class="small-xs font-weight-midi m-0">SURNAME <span class="text-danger">&#42;</span></label>
                                <input type="text" class="form-control form-control-lg" v-model="form.guardian.surname">
                                <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <ValidationProvider vid="othername" name="othername" rules="required" v-slot="{ errors }" >
                                <label class="small-xs font-weight-midi m-0" for="firstname">OTHERNAME <span class="text-danger">&#42;</span></label>
                                <input type="text" class="form-control form-control-lg" v-model="form.guardian.othername">
                                <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                            </ValidationProvider>
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
                            <label class="small-xs font-weight-midi m-0" for="firstname">L.G.A OF ORIGIN</label>
                            <input type="text" class="form-control form-control-lg" v-model="form.guardian.local_govt">
                        </div>

                        <div class="form-group col-md-4">
                            <ValidationProvider vid="email" name="email" rules="required|email" v-slot="{ errors }" >
                                <label class="small-xs font-weight-midi m-0" for="firstname">EMAIL <span class="text-danger">&#42;</span></label>
                                <input type="email" class="form-control form-control-lg" v-model="form.guardian.email">
                                <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <ValidationProvider vid="phone" name="phone" rules="required|digits:11" v-slot="{ errors }" >
                                <label class="small-xs font-weight-midi m-0" for="validate-phone">PHONE <span class="text-danger">&#42;</span></label>
                                <input type="text" class="form-control form-control-lg" v-model="form.guardian.phone">
                                <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>

                        
                        <div class="form-group col-md-6">
                            <ValidationProvider vid="passport" name="passport" v-slot="{ errors }" >
                                <label class="small-xs font-weight-midi m-0">P.PHOTO <span class="text-danger">&#42;</span></label>
                                <input type="file" class="form-control form-control-lg" @change="form.guardian.passport = $event.target.files[0]" >
                                <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>                            
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <ValidationProvider vid="resident" name="resident" rules="required" v-slot="{ errors }" >
                                <label class="small-xs font-weight-midi m-0">RESIDENTIAL ADDRESS <span class="text-danger">&#42;</span></label>
                                <textarea class="form-control" rows="2" v-model="form.guardian.residential_address"></textarea>
                                <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>

                        <div class="form-group col-md-6">
                            <ValidationProvider vid="occupation" name="occupation" rules="required" v-slot="{ errors }" >
                                <label class="small-xs font-weight-midi m-0">OCCUPATION <span class="text-danger">&#42;</span></label>
                                <textarea class="form-control" rows="2" v-model="form.guardian.occupation"></textarea>
                                <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>                        
                </div>                
            </div> 

            <!-- Guardian wards -->
            <div class="card border-0 shadow-sm mt-3">
                <div class="card-header bg-white d-flex align-items-start justify-content-between px-2 px-sm-3">
                    <div class="small-xs font-weight-normal mt-2">GUARDIANS WARDS</div>
                </div>

                <div class="card-body px-2 px-sm-3">
                    <div class="form-row">
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
                                    <ValidationProvider  :name="'relationship' + ward.student_id" rules="required" v-slot="{ errors }" >
                                        <label class="small-xs font-weight-midi m-0">Relationship<span class="text-danger"> &#42;</span></label>
                                        <input type="text" class="form-control" placeholder="eg father" v-model="ward.relationship" name="">
                                        <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                 <div class="form-group mt-2">
                                     <div class="custom-control-lg custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" v-model="ward.emergency" :checked="ward.emergency" :id="ward.student_id">
                                        <label class="custom-control-label" :for="ward.student_id"><span class="small ml-n2">Emergency Contact</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-row justify-content-center mt-3">
                <div class="col-md-3">
                    <loading-button class="btn btn-ripple ripple btn-block" :loading="btnLoading" @btnEvent.prevent="handleSubmit(updateGuardian)">Update Guardian</loading-button>
                </div>
            </div>

        </form>
        </ValidationObserver>           
        </template>

    </base-admin>
</template>

<script>
import BaseAdmin from '@/views/layouts/BaseAdmin.vue';
import LinePreload from '@/components/LinePreload';
import LoadingButton from '@/components/LoadingButton';

import Guardian from '@/apis/Guardian';
import { mapActions } from 'vuex'

export default {
    name: 'EditGuardian',
    components: {
        BaseAdmin,
        LinePreload,
        LoadingButton,
    },

    data () {
        return {
            loading: false,
            loaded: false,
            btnLoading: false,
            form: {
                guardian: null,
                wards: null
            },
            formErrors: {
                title: '',
                firstname: '',
                surname: '',
                othername: '',
                gender: '',
                nationality: '',
                state_origin: '',
                local_govt: '',
                email: '',
                phone: '',
                passport: '',
                residential_address: '',
                occupation: ''
            }
        }
    },

    async created () {
        if (isNaN(this.$route.params.guardianId)) {
            this.loaded = false;
            this.setSnackbar('The guardian id is wrong reload if you didnt edit the url.');
        } else {
            await this.reqData()
        }
    },

    watch: {
        '$route': 'reqData'
    },

    methods: {
        ...mapActions('general', {
            setSnackbar: 'addSnackbar'
        }),

        async reqData() {
            await this.reqGuardian();
            await this.reqGuardianWards();
        },

        reqGuardian() {
            this.loading = true; this.loaded = false;
            let guardianId = this.$route.params.guardianId;
            Guardian.me(guardianId)
            .then((res) => {
                this.form.guardian = res.data[0];
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },

        reqGuardianWards() {
            let guardianId = this.$route.params.guardianId;
            Guardian.wards(guardianId)
            .then((res) => {
                console.log(res)
                this.form.wards = res.data;
                this.loading = false
                this.loaded = true;
            })
            .catch((err) => {
                if(err.response.status === 422) {
                    this.setSnackbar('Guardian id is required make sure you dont edit the url.');
                } else if(err.request) {
                    console.log(err.request + 'from request block');
                    console.log(err + 'all err log');
                } 
            })
        },

        updateGuardian() {
            this.loading = this.btnLoading = true;

            let guardian = this.form.guardian;
            let wards = this.form.wards;
            let formData =  new FormData();

            for (let field in guardian) {
                formData.append(field, guardian[field]);
            }

            formData.append('wards', JSON.stringify(wards));

            Guardian.update(formData)
            .then((res) => {
                console.log(res)
                this.loading = this.btnLoading = false;
                this.setSnackbar(res.data.message);
            })
            .catch((err) => {
                this.loading = false;
                this.btnLoading = false;
                if(err.response.status === 422) {
                    let errors = this.formErrors;
                    this.$refs.form.setErrors({
                        ...errors,
                        ...err.response.data.errors
                    });
                }
            })
        },

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


