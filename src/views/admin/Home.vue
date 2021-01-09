<template>
	<base-admin>
        <template v-slot:header>
            <header class="bg-white">
                <div class="container-lg pt-4 pb-3">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <div class="font-weight-midi text-muted">Dashboard</div>
                        </div>
                        <button class="btn btn-outline-secondary btn-sm">Add</button>
                    </div>
                </div>
            </header>
        </template>

        <ul class="d-flex justify-content-between list-unstyled pb-2 w-100" style="overflow-x: auto;">
            <li class="flex-fill mr-3 mr-md-4">
                <div class="rounded-lg-top rounded-lg-right border bg-white px-3 py-3" style="min-width: 270px;">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <h3 class="h6 text-dark mb-2 mb-sm-3">Fees Invoiced</h3>
                            <div class="h4 font-weight-midi mb-1">&#8358;200 </div>
                        </div>
                        <img src="@/assets/images/w-1.png" height="50" width="50">
                    </div>
                    <div class="border-bottom"></div>
                    <div class="d-flex align-items-start mt-2">
                        <button class="btn btn-secondary btn-sm text-capitalize mr-2">Fund wallet</button>
                        <button class="btn btn-light btn-sm border font-weight-midi small text-capitalize">withdraw</button>
                    </div>
                </div>
            </li>

            <li class="flex-fill mr-3 mr-md-4">
                <div class="rounded-lg-top rounded-lg-right bg-white border px-3 py-3" style="min-width: 270px;">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <h3 class="h6 text-dark mb-2  mb-sm-3">Fees Received</h3>
                            <div class="h4 font-weight-midi mb-1">&#8358;200 </div>
                        </div>
                        <img src="@/assets/images/chart.png" height="50" width="50">
                    </div>
                    <div class="border-bottom"></div>
                    <div class="d-flex align-items-start mt-2">
                        <button class="btn btn-light btn-sm border text-capitalize mr-2">View All</button>
                    </div>
                </div>
            </li>

            <li class="flex-fill">
                <div class="rounded-lg-top rounded-lg-right bg-white border px-3 py-3" style="min-width: 270px;">
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <h3 class="h6 text-dark mb-2 mb-sm-3">Fees Pending</h3>
                            <div class="h4 font-weight-midi mb-1">&#8358;200 </div>
                        </div>
                        <img src="@/assets/images/chart.png" height="50" width="50">
                    </div>
                    <div class="border-bottom"></div>
                    <div class="d-flex align-items-start mt-2">
                        <button class="btn btn-light btn-sm border text-capitalize mr-2">View All</button>
                    </div>
                </div>
            </li>
        </ul>

        <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-3">
                <div class="card border-0 rounded shadow-sm">
                    <div class="card-header d-flex align-items-center px-3">
                        <div class="text-dark font-weight-midi">Heading</div>
                    </div>
                    <div class="card-body px-2 px-sm-3">
                    </div>
                </div>
            </div>

            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-3">
                <div class="card border-0 rounded shadow-sm">
                    <div class="card-header d-flex align-items-center px-3">
                        <div class="text-dark font-weight-midi">Heading</div>
                    </div>
                    <div class="card-body px-2 px-sm-3">

                    </div>
                </div>
            </div>
        </div>
	</base-admin>
</template>

<script>
import BaseAdmin from '@/views/layouts/BaseAdmin.vue'

export default {
  name: 'Home',
  components: {
    BaseAdmin
  },
  data () {
    return {
      user: null,
    }
  },

  methods: {
  }
}
</script>

<style scoped>
</style>
