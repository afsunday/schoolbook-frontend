<template>
    <div class="mt-n1">
        <div class="form-row">
            <div class="col-sm-6 col-md-6 mb-2">
                <div class="card-alt">
                    <div class="d-inline-flex border-bottom w-100 px-2 pb-2 pt-3">
                        <div class="mr-1"><i class="icon icon-description icon-lg"></i></div>
                        <div class="ml-1 font-weight-midi text-break h7">Basic Info</div>
                    </div>

                    <div class="card-body px-2 pt-2">
                        <div class="d-flex border-bottom py-3">
                            <div class="small-xs font-weight-bold mr-3 mr-sm-4">ACCOUNT STATUS</div>
                            <div class="small">Listed</div>
                        </div>
                    </div>
                </div>

                <div class="card-alt mt-2">
                    <div class="d-inline-flex px-2 pt-3">
                        <div class="mr-1"><i class="icon icon-info icon-lg"></i></div>
                        <div class="ml-1 font-weight-midi text-break h7">Bio Info</div>
                    </div>

                    <div class="card-body px-2 pt-2">
                        <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                            <div class="text-capitalize font-weight-midi h7">Firstname</div>
                            <div class="text-capitalize small">{{guardian.firstname}}</div>
                        </div>

                        <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                            <div class="text-capitalize font-weight-midi h7">surname</div>
                            <div class="text-capitalize small">{{guardian.surname}}</div>
                        </div>

                        <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                            <div class="text-capitalize font-weight-midi h7">Othername</div>
                            <div class="text-capitalize small">{{guardian.othername}}</div>
                        </div> 

                        <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                            <div class="text-capitalize font-weight-midi h7">Gender</div>
                            <div class="text-capitalize small">{{guardian.gender}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-md-6 mb-4">
                <div class="card-alt">
                    <div class="d-inline-flex px-2 pt-3">
                        <div class="mr-1"><i class="icon icon-contacts icon-lg"></i></div>
                        <div class="ml-1 font-weight-midi text-break h7">contact Info</div>
                    </div>

                    <div class="card-body px-2 pt-2">
                         <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                            <div class="text-capitalize font-weight-midi h7">Phone</div>
                            <div class="text-capitalize small">{{ guardian.phone }}</div>
                        </div>

                        <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                            <div class="text-capitalize font-weight-midi h7">Email</div>
                            <div class="text-capitalize small">{{ guardian.email }}</div>
                        </div>

                        <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                            <div class="text-capitalize font-weight-midi h7">Address</div>
                            <div class="text-capitalize small">{{ guardian.residential_address }}</div>
                        </div> 
                    </div>
                </div>

                <div class="card-alt mt-2">
                    <div class="d-inline-flex px-2 pt-3">
                        <div class="mr-1"><i class="icon icon-influence icon-lg"></i></div>
                        <div class="ml-1 font-weight-midi text-break h7">Other Info</div>
                    </div>

                    <div class="card-body px-2 py-2">                       
                        <div class="border rounded-top-lg rounded-right-lg pt-2 pb-1 px-2 mb-3">
                            <div class="text-capitalize font-weight-midi h7">Occupation</div>
                            <div class="text-capitalize small">{{ guardian.occupation }}</div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SpinLoader from '@/components/SpinLoader';

export default {
    name: 'guardianBioData',
    components: {
        SpinLoader,
    },

    props: ['guardian', 'loading', 'loaded'],

    data() {
        return {
        }
    }
}
</script>

<style scoped>
.rounded-lg {
    border-radius: .35rem !important;
}

.rounded-top-lg {
  border-top-left-radius: .35rem;
  border-top-right-radius: .35rem;
}

.rounded-right-lg {
  border-top-right-radius: .35rem;
  border-bottom-right-radius: .35rem;
}

.card-alt {
    box-shadow: 0 2px 9px hsla(0,0%,76.9%,.11); 
    border: 1px solid hsla(0,0%,74.1%,.25);
    background-color: #fff;
    border-radius: .35rem;
}

div.active {
    color: #28a745;
}

div.blocked {
    color: #dc3545;
}
</style>