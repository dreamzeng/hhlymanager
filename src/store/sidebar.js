/*
 *  左侧菜单 数据
 */
import Vue from 'vue';

export const SET_MENU = 'SET_MENU';//设置菜单信息
export const UNSET_MENU = 'UNSET_MENU';//删除菜单信息

const state = JSON.parse(sessionStorage.getItem('menu')) || {};

const mutations = {
    [SET_MENU](state, menu) {
        if(typeof menu != 'undefined'){
            sessionStorage.setItem('menu', JSON.stringify(menu));
            Object.assign(state, menu);
        }
    },
    [UNSET_MENU](state) {
        sessionStorage.removeItem('menu');
        Object.keys(state).forEach(k => Vue.delete(state, k));
    }
};
const actions = {
    [SET_MENU]({commit}, menu) {
        commit(SET_MENU, menu);
    },
    [UNSET_MENU]({commit}) {
        commit(UNSET_MENU);
    }
};
const getters = {
    getMenu: (state) => state
};

export default{
    state,
    mutations,
    actions,
    getters
}

