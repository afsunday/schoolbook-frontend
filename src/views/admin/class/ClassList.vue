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
                        <div class="border rounded p-2">
                            <h5>column  2</h5>
                        </div>
                    </div>

                    <div class="col-md-8 col-lg-8">
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button px-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Accordion Item #1
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body ps-2 pe-0 pb-1">
                                        <ul class="d-flex justify-content-start align-items-start overflow-auto list-unstyled pb-3 w-100">
                                            <li v-for="i in [1,2,3]" class="me-3 me-md-4" style="width:210px;">
                                                <div class="rounded-lg-top rounded-lg-right shadow-sm bg-white px-5 py-3">
                                                    <div class="d-flex justify-content-between">
                                                        row card 1
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
// import Chart from 'chart.js'


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

        return {}
    }
}
</script>

<style scoped>
.accordion-item {
    margin-bottom: 0.40rem;
    border: 0px;
}

.accordion-header {
    background-color: #fff;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    border-radius: 0.25rem;
    border: 0px;
}

.accordion-body {
    background-color: rgba(250, 251, 252, 0.15);
}

.accordion-collapse {
    border-width: 1px;
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
    color: #0c63e4;
    background-color: unset;
}
</style>