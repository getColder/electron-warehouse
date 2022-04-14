export default {
    state: {
        token: ""
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
            localStorage.setItem("very", val);
        },
        clearToken(state) {
            state.token = "";
            localStorage.setItem("very", "");
        },
        getToken(state) {
            state.token = state.token || localStorage.getItem('very');
        }
    }
}