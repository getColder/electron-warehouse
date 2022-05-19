export default {
    state: {
        token: undefined
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
            window.setCookie("very", val);
        },
        clearToken(state) {
            state.token = undefined;
            document.cookie = "very=;";
        },
        getToken(state) {
            state.token = state.token || window.getCookie('very');
        }
    }
}