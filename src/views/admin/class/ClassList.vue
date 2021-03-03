<template>
    <base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg py-2 pt-sm-3 pb-sm-2">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="text-muted">
                                <span class="h7"><i class="fas fa-columns"></i></span> Class
                            </div>
                        </div>
                        <div class="">
                            <div class="dropdown">
                                <a class="btn btn-light btn-sm border" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
                                <div class="dropdown-menu dropdown-menu-end border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">
                                    <router-link class="dropdown-item small font-weight-midi py-2" to="/m/staffs/add">
                                        Add Class</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </template>
        <template v-slot:default>
            <div class="wrapper">
                <div class="row g-3 flex-md-row-reverse">
                    <div class="col-md-4 col-lg-4">
                        <div class="card border-0 shadow-sm">
                            <div class="card-header bg-white d-flex px-2">
                                <small class="text-muted">Class Overview</small>
                            </div>
                            <div class="card-body px-2 pt-2 pb-3">
                                <div class="w-100">
                                    <div class="">
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8 col-lg-8">
                        <div v-for="(klass, key) in schoolClasses" class="accordion" :id="`accordion${klass.class_id}`">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button px-2 text-capitalize" type="button" data-bs-toggle="collapse" :data-bs-target="`#accord${klass.class_id}`" aria-expanded="true" aria-controls="collapseOne">
                                        {{ klass.class_fullname }}
                                    </button>
                                </h2>
                                <div :id="`accord${klass.class_id}`" :class="{'show': (key === 0)}" class="accordion-collapse collapse" aria-labelledby="headingOne" :data-bs-parent="`#accordion${klass.class_id}`">
                                    <div class="accordion-body ps-2 pe-0 pb-1">
                                        <ul class="d-flex justify-content-start align-items-start overflow-auto list-unstyled pb-3 w-100">
                                            <li v-for="arm in JSON.parse(klass.arm_branch)" class="me-2 me-md-3" style="width:210px;">
                                                <div class="rounded-lg-top rounded-lg-right shadow-sm bg-white px-2 pt-2 pb-5 h-auto position-relative">
                                                    <div class="d-flex justify-content-between">
                                                        <a href="" class="text-truncate text-dark pe-2 small">{{ arm.arm_name }}</a>

                                                        <div class="dropdown position-relative">
                                                            <a class="text-dark font-weight-light" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-h"></i></a>
                                                            <div class="dropdown-menu dropdown-menu-end border-0 shadow m-0 py-3" aria-labelledby="dropdownMenuLink">
                                                                <a class="dropdown-item small font-weight-normal py-2" href="#">
                                                                    Add Class</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div><!-- accordion -->
                    </div>

                </div>
            </div>
        </template>
    </base-admin>
</template>
<script>
// components
import BaseAdmin from '@/views/admin/shared/BaseAdmin'
import LinePreload from '@/components/LinePreload'
import ModalCenter from '@/components/ModalCenter'
import RetryButton from '@/components/RetryButton'
import EmptyList from '@/components/EmptyList'

// composables

// library:vue
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'

// apis
import Class from "@/apis/Class"

export default {
    name: 'ClassList',
    components: {
        BaseAdmin,
        LinePreload,
        ModalCenter,
        RetryButton,
        EmptyList
    },

    setup() {

        const store  = useStore()
        const route = useRoute()
        const router = useRouter()

        let loadingState = reactive({
            loading: false,
            loaded: false,
        })

        const schoolClasses = ref(store.state.adminSubjectStore.subjectList)
        const fetchClassHasError = ref(false)

        const fetchClasses = async () => {
            loadingState.loading = true
            fetchClassHasError.value = false

           
            await Class.allClass().then((res) => {
                schoolClasses.value = res.data

                loadingState.loading = false
                loadingState.loaded = true
                fetchClassHasError.value = false
            })
            .catch((err) => {
                loadingState.loading = false
                loadingState.loaded = true
                fetchClassHasError.value = true
            })
        }

        // onCreated call func to fetch school classes
        fetchClasses()

        return {
            schoolClasses
        }
    }
}
</script>

<style scoped>
.fa, .fas {
    font-weight: 700;
}

.accordion-item {
    margin-bottom: 0.5rem;
    border: 0px;
}

.accordion-header {
    background-color: #fff;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    border-radius: 0.25rem;
    border: 0px;
}

.accordion-body {
    background-color: rgba(250, 251, 252, 0.65);
    border: 0px;
}

.accordion-collapse {
    border-width: 0px;
}

.accordion-button {
   border: 0px;  
}

.accordion-button:focus {
    border-color: none;
    outline: 0;
    box-shadow: none;
    border: 0px;
}

.accordion-button::after {
    width: 1rem;
    height: 1rem;
    background-size: 1rem;
}

.accordion-button:not(.collapsed) {
    color: #212529;
    background-color: unset;
}
</style>