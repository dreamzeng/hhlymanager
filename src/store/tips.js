import Vue from 'vue';

export const SET_TIPS = 'SET_TIPS';//设置提示信息

const state = {message: '操作成功！'};

const mutations = {
    [SET_TIPS](state, tips) {
        Object.assign(state, tips)
    }
};
const actions = {
    [SET_TIPS]({commit}, tips) {
        commit(SET_TIPS, tips)
    }
};
const getters = {
    getTips: (state) => state
};

export default{
    state,
    mutations,
    actions,
    getters
}
