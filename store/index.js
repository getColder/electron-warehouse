import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'
import groups from './groups'
import form from './form'
import stock from './stock'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tab,
        user,
        groups,
        form,
        stock
    }
})