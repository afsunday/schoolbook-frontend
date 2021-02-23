const state = {
    subjectList: []
}

const getters = {
}

const actions = {
    setSubjectList( {commit}, payload ) {
        commit('SET_SUBJECT_LIST', payload);
    }
}

const mutations = {
    SET_SUBJECT_LIST: (state, payload) => (state.subjectList = payload),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
