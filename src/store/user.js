import Vue from 'vue';

export const USER_SIGNIN = 'USER_SIGNIN';//登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT';//退出登录

const state = JSON.parse(sessionStorage.getItem('user')) || {};

const mutations = {
    [USER_SIGNIN](state, user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        Object.assign(state, user)
    },
    [USER_SIGNOUT](state) {
        sessionStorage.removeItem('user');
        Object.keys(state).forEach(k => Vue.delete(state, k));
    }
};
const actions = {
    [USER_SIGNIN]({commit}, user) {
        commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT]({commit}) {
        commit(USER_SIGNOUT)
    }
};
const getters = {
    getuser: (state) => state
};

export default{
    state,
    mutations,
    actions,
    getters
}


