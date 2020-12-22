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
                    <div class="small-xs font-weight-normal mt-2">STUDENT INFORMATION</div>
                    <a @click="resetForm()" class="text-decoration-none text-primary">clear</a>
                </div>

                <line-preload :loading="loading"></line-preload>

                <div class="card-body px-2 px-sm-3 pt-2 pb-3">

                    <!-- form -->
                    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                    <form>
                        <div class="form-row mt-3">
                            <div class="form-group  col-md-4">
                                <label class="small-xs font-weight-midi m-0">TITLE <span class="text-danger">&#42;</span></label>
                                <select class="custom-select custom-select-lg" @change="updateForm('title', $event.target.value)">
                                     <option value="mr" :selected="form.title === 'mr' " >Mr</option>
                                    <option value="mrs" :selected="form.title === 'mrs' " >Mrs</option>
                                </select>
                            </div>

                            <div class="form-group col-md-4">
                                <ValidationProvider  vid="firstname" name="firstname" rules="required" v-slot="{ errors }" >
                                    <label class="small-xs font-weight-midi m-0" for="firstname">FIRSTNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <input type="text" class="form-control form-control-lg"  @input="updateForm('firstname', $event.target.value)" :value="form.firstname" >
                                    <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>

                            <div class="form-group col-md-4">
                                <ValidationProvider  vid="surname" name="surname" rules="required" v-slot="{ errors }" >
                                    <label class="small-xs font-weight-midi m-0">SURNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <input type="text" class="form-control form-control-lg" @input="updateForm('surname', $event.target.value)" :value="form.surname" >
                                    <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <ValidationProvider vid="othername" name="othername" rules="required" v-slot="{ errors }" >
                                    <label class="small-xs font-weight-midi m-0" for="firstname">OTHERNAME 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <input type="text" class="form-control form-control-lg" name="" @input="updateForm('othername', $event.target.value)" :value="form.othername" >
                                    <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>

                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">GENDER 
                                    <span class="text-danger">&#42;</span>
                                </label>
                                <select class="custom-select custom-select-lg" @change="updateForm('gender', $event.target.value)" >
                                    <option value="male" :selected="form.gender === 'male' ">Male</option>
                                    <option value="female" :selected="form.gender === 'female' ">Female</option>
                                </select>
                            </div> 

                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">NATIONALITY 
                                    <span class="text-danger">&#42;</span>
                                </label>
                                <select class="custom-select custom-select-lg" @change="updateForm('nationality', $event.target.value)" >
                                    <option value="nigerian" :selected="form.nationality === 'nigerian' ">NIGERIAN</option>
                                </select>
                            </div>                                             
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0">STATE OF ORIGIN</label>
                                <input type="text" class="form-control form-control-lg" @input="updateForm('state_origin', $event.target.value)" :value="form.state_origin" >
                            </div>

                            <div class="form-group col-md-4">
                                <label class="small-xs font-weight-midi m-0" for="firstname">L.G.A OF ORIGIN</label>
                                <input type="text" class="form-control form-control-lg" name="" @input="updateForm('local_govt', $event.target.value)" :value="form.local_govt" >
                            </div>

                            <div class="form-group col-md-4">
                                <ValidationProvider vid="email" name="email" rules="required|email" v-slot="{ errors }" >
                                    <label class="small-xs font-weight-midi m-0" for="firstname">EMAIL 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <input type="email" class="form-control form-control-lg" name="" @input="updateForm('email', $event.target.value)"  :value="form.email" >
                                    <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <ValidationProvider vid="phone" name="phone" rules="required|digits:11" v-slot="{ errors }" >
                                    <label class="small-xs font-weight-midi m-0" for="validate-phone">PHONE 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <input type="text" class="form-control form-control-lg" @input="updateForm('phone', $event.target.value)" :value="form.phone" >
                                    <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>

                            
                            <div class="form-group col-md-6">
                                <ValidationProvider vid="pic" name="pic" v-slot="{ errors }" >
                                    <label class="small-xs font-weight-midi m-0">PIC 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <input type="file" class="form-control form-control-lg" ref="pic"  @change="form.pic = $event.target.files[0]">
                                    <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>                            
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <ValidationProvider vid="resident" name="resident" rules="required" v-slot="{ errors }" >
                                    <label class="small-xs font-weight-midi m-0">RESIDENTIAL ADDRESS 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <textarea class="form-control" rows="2" @input="updateForm('resident', $event.target.value)" :value="form.resident" ></textarea>
                                    <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>

                            <div class="form-group col-md-6">
                                <ValidationProvider vid="occupation" name="occupation" rules="required" v-slot="{ errors }" >
                                    <label class="small-xs font-weight-midi m-0">OCCUPATION 
                                        <span class="text-danger">&#42;</span>
                                    </label>
                                    <textarea class="form-control" rows="2" @input="updateForm('occupation', $event.target.value)" :value="form.occupation" ></textarea>
                                    <span class="text-danger small-xs mt-n3">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>

                        <div class="form-row justify-content-center mt-3">
                            <div class="col-md-3">
                                <loading-button class="btn btn-ripple ripple btn-block" :loading="btnLoading" @btnEvent.prevent="handleSubmit(createGuardian)" >Create Guardian</loading-button>
                            </div>
                        </div>
                    </form>
                    </ValidationObserver>
                </div>                
            </div>            

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
    name: 'AddGuardian',
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
                pic: '',
                resident: '',
                occupation: ''
            }
        }
    },

    created () {
        const storedForm = this.openStorage();
        if(storedForm) {
            this.form = {
                ...this.form,
                ...storedForm
            }
        }
    },

    methods: {
        ...mapActions('general', {
            setSnackbar: 'addSnackbar'
        }),

        updateForm(field, value) {
            this.form[field] = value;

            let storedForm = this.openStorage();
            if (!storedForm) {
                storedForm = {}
            }

            storedForm[field] = value;

            this.saveStorage(storedForm);
        },

        openStorage() {
            return JSON.parse(localStorage.getItem('ADD_GUARDIAN_FORM'))
        },

        saveStorage (form) {
            localStorage.setItem('ADD_GUARDIAN_FORM', JSON.stringify(form))
        },

        createGuardian() {
            this.loading = this.btnLoading = true;

            let form = this.form;
            let formData = new FormData();
            for (const field in form) {
                formData.append(field, form[field]);
            }

            Guardian.create(formData, { 
                headers: { 'Content-Type': 'multipart/form-data' } 
            })
            .then((res) => {
                this.resetForm();
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

        resetForm() {
            let form = this.form;

            for (let field in form) {
                form[field] = '';
            }

            this.form.title = 'mr';
            this.form.gender = 'male';  
            this.form.nationality = 'nigerian';  
            localStorage.removeItem("ADD_GUARDIAN_FORM");        
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


