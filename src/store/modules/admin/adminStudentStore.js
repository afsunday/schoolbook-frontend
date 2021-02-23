const state = {
    studentList: [],

    studentListParams: {
        search: '',
        status: 'all',
        class: 'all',
        gender: 'all',
        archives: false,
        page: 1
    },

    studentListPaginateParams: {
        currentPage: null,
        nextPage: false,
        prevPage: false,
        totalPage: null,
        pagesLength: null,
    }
}

const getters = {
}

const actions = {
    setStudentList( {commit}, payload ) {
        commit('SET_SUBJECT_LIST', payload);
    }
}

const mutations = {
    SET_STUDENT_LIST: (state, payload) => (state.studentList = payload),
    SET_STUDENT_LIST_FETCH_PARAMS: (state, payload) => (state.studentListParams = payload),
    SET_STUDENT_LIST_PAGINATE_PARAMS: (state, payload) => (state.studentListPaginateParams = payload)

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
