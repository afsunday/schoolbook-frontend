<template>
    <nav class="snackbar d-inline-flex">
        <snackbar-message v-if="message.length > 0" :message="message"></snackbar-message>
    </nav>
</template>

<script>
import SnackbarMessage from '@/components/SnackbarMessage'
import { mapState } from 'vuex'

export default {
    name: 'Snackbar',
    components: {
        SnackbarMessage
    },

    computed: mapState({
        message: state => state.general.snackBarMessage
    }),

}
</script>

<style scoped>

.snackbar {
    -ms-flex-preferred-size: 450px;
    flex-basis: 450px;
    max-width: 450px;
    font-size: 0.875rem;
    background-clip: padding-box;
    position: fixed;
    bottom: 0;
    margin-bottom: 2.5rem;
    margin-right: .5rem;
    margin-left: -.3rem;
}

</style>
