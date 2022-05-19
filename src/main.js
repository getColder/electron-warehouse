import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import router from '../router'
import 'element-ui/lib/theme-chalk/index.css'
import store from '../store'
import http from "axios"

Vue.use(ElementUi);                 //ElementUi组件库引入
Vue.prototype.$http = http;         //axio封装
Vue.config.productionTip = false;


const gateway = () => {
    router.beforeEach((to, form, next) => {
        store.commit('getToken');
        const token = store.state.user.token;
        if (!token && to.name !== 'login') {
            next({ name: 'login' });
        }
        else if (token && to.name === 'login') {
            next({ name: 'login' })
        }
        else {
            next();
        }
    })
}

(process.env.NODE_ENV === 'development') ? "" : gateway()

window.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        console.log(c.substring(name.length, c.length));
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


window.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


new Vue({
    store,
    router,
    render: h => h(App),
    created() {
        store.commit('addMenu', router);
    }
}).$mount('#app')
