const state = {
    snackBarMessage: ''
}

const getters = {
    getNotificationMessage (state) {
        return state.notificationMessage
    }
}

const actions = {
    addSnackbar( {commit}, message ) {
        commit('Add_SNACKBAR', message);
    },

    removeSnackbar( {commit} ) {
        commit('REMOVE_SNACKBAR', '');
    }
}

const mutations = {
    Add_SNACKBAR: (state, msg) => (state.snackBarMessage = msg),
    REMOVE_SNACKBAR: (state, msg) => (state.snackBarMessage = msg)
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
