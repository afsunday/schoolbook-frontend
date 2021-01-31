<template>
    <div>
        <div class="snackbar-container">
            <button type="button me-auto" class="ms-2 btn-close small"  @click="removeSnackbar()" aria-label="Close" >
            </button>
            <div class="snackbar-body">
                <div class="text-white">{{ message }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'SnackbarMessage',
    data () {
        return {
            timeout: null
        }
    },
    props: ["message"],

    created() {
        this.timout = setTimeout(() => {
            this.removeSnackbar();
        }, 25000);
    },

    methods: {
        ...mapActions('general',{
            removeSnackbar: 'removeSnackbar'
        }),
    },

    beforeUnmount() {
        clearTimeout(this.timeout);
        this.removeSnackbar()
    },
}
</script>

<style scoped>
.snackbar-container {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    background-color: rgba(0,0,0,0.75);
    border-radius: .22rem;
    padding: .6rem .7rem .6rem .7rem;
    z-index: 100;
}

.snackbar-container > .btn-close {
    outline: 0 !important;
    margin-top: .2rem;
    background-color: #e6f2ff;
    height: 1.75rem;
    width: 1.75rem;
    padding-bottom: .8rem;
    border-radius: 50%;
}
</style>
