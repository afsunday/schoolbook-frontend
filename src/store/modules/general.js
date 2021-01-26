const state = {
    snackBarMessage: '',
    cancelTokens: []
}

const getters = {
    getNotificationMessage (state) {
        return state.notificationMessage
    },

    cancelTokens(state) {
        return state.cancelTokens;
    }
}

const actions = {
    addSnackbar( {commit}, message ) {
        commit('Add_SNACKBAR', message);
    },

    removeSnackbar( {commit} ) {
        commit('REMOVE_SNACKBAR', '');
    },

    abortPendingRequests({commit}) {

        // Cancel all request where a token exists
        state.cancelTokens.forEach((request, i) => {
            if(request.cancel){
                request.cancel();
            }
        });

        // Reset the cancelTokens store
        commit('CLEAR_CANCEL_TOKENS');
    }
}

const mutations = {
    Add_SNACKBAR: (state, msg) => (state.snackBarMessage = msg),
    REMOVE_SNACKBAR: (state, msg) => (state.snackBarMessage = msg),

    ADD_CANCEL_TOKEN: (state, token) => (state.cancelTokens.push(token)),
    CLEAR_CANCEL_TOKENS: (state) => (state.cancelTokens = [])
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
