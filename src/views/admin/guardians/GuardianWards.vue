<template>
	<div class="mt-n1">
        <div class="card border-0 shadow-sm">
        	<div class="card-header bg-white px-2 px-sm-3">
        		<small>Guardian Wards</small>
        	</div>

            <line-preload :loading="loading"></line-preload>

        	<div class="card-body px-2 px-sm-3 pb-5">
                <div v-if="loaded && wards.length <= 0" class="text-center mb-3">
                    <div class="me-2 me-sm-3 text-muted p-0 m-0" style="font-size:50px;">
                        <i class="icon icon-assignment icon-lg p-0 m-0"></i>
                    </div>
                    <div class="text-center text-muted mt-n2">No ward has been assign to this guardian</div>
                </div>

        		<div v-if="loaded" class="row g-3">
                    <div v-for="ward in wards" class="col-md-4">                        
                        <div class="border rounded-top rounded-right p-2">
                            <div class="d-flex mt-2">
                                <img src="@/assets/images/user.png" class="rounded-circle me-2 border bg-light" width="35" height="35">
                                <span class="text-break overflow-auto mt-n1"> 
                                    <a href="#" class="small text-decoration-none text-primary">Matt Mullenweg</a>
                                    <div class="small text-muted text-pre-wrap mt-n1">matt@gmail.com</div>
                                </span>
                            </div> 
                            <div class="d-flex mt-2">
                            	<div class="small"><span class="text-dark font-weight-midi">Status:</span> <span class="active">Active</span></div>
                            </div>

                            <div class="d-flex mt-1">
                            	<div class="small"><span class="text-dark font-weight-midi">Relationship:</span> Father</div>
                            </div>

                            <div class="d-flex mt-1">
                                <div class="small"><span class="text-dark font-weight-midi">Emergency Contact: </span>yes</div>
                            </div>

                            <div class="d-flex mt-1">
                            	<div class="small"><span class="text-dark font-weight-midi">Class:</span> JSS2 Golden Boyz</div>
                            </div>                           
                        </div>
                    </div>
                </div>
        	</div>
        </div>
	</div>
</template>

<script>
import LinePreload from '@/components/LinePreload';
import Guardian from '@/apis/Guardian';

import { mapActions } from 'vuex';
 
export default {
	name: 'GuardianWards',
	components: {
		LinePreload
	},

	data() {
		return {
			loading: false,
			loaded: false,
            wards: [],
		}
	},

    created() {
        this.reqGuardianWards();
    },

	methods: {
        ...mapActions('general', {
            setSnackbar: 'addSnackbar'
        }),

        reqGuardianWards() {
            this.loading = true;
            let guardianId = this.$route.params.guardianId;
            Guardian.wards(guardianId)
            .then((res) => {
                console.log(res)
                this.wards = res.data;
                this.loading = false
                this.loaded = true;
            })
            .catch((err) => {
                if(err.response.status === 422) {
                    this.setSnackbar('Guardian id is required make sure you dont edit the url.');
                } else if(err.request) {
                    console.log(err.request);
                } 
            })
        },

	}
}
</script>

<style scoped>
span.active {
    color: #28a745;
}

.blocked {
    color: #dc3545;
}
</style>
