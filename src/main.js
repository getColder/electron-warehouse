import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import router from '../router'
import 'element-ui/lib/theme-chalk/index.css'
import store from '../store'
import http from "axios"
import '../api/mock.js'

Vue.use(ElementUi);                 //ElementUi组件库引入
Vue.prototype.$http = http;         //axio封装
Vue.config.productionTip = false;

router.beforeEach((to, form, next) => {
    store.commit('getToken');
    const token = store.state.user.token;
    if (!token && to.name !== 'login') {
        next({ name: 'login' });
    }
    else if (token && to.name === 'login') {
        next({name: 'home'})
    }
    else {
        next();
    }
})

new Vue({
    store,
    router,
    render: h => h(App),
    created() {
        store.commit('addMenu', router);
    }
}).$mount('#app')
