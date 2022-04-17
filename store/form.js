export default {
    state: {
        submitting: false
    },
    mutations: {
        submit(state) {
            state.submitting = true;
        },
        finish(state) {
            state.submitting = false;
        },
    }
}