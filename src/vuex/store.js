import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './action'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: null,
        isLogin: false,
        token: '',
        userAvatar: null
    },
    getters,
    actions,
    mutations
})
