import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'
import groups from './groups'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tab,
        user,
        groups
    }
})