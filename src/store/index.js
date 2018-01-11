import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import tips from './tips'
import sidebar from './sidebar'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        tips,
        sidebar
    }
})
