<template>
    <div>
        <div class="snackbar-container bg-dark">
            <button type="button mr-auto" class="ml-2 close"  @click="removeSnackbar()" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
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

    beforeDestroy() {
        clearTimeout(this.timeout);
        this.removeSnackbar()
    },
}
</script>

<style scoped>
.snackbar-container {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    border-radius: .25rem;
    padding: .6rem .7rem .6rem .7rem;
}

.snackbar-container > .close {
    outline: 0 !important;
    margin-top: .2rem;
    background-color: #e6f2ff;
    height: 1.75rem;
    width: 1.75rem;
    padding-bottom: .8rem;
    border-radius: 50%;
}
</style>
