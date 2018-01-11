/*
 用户统计 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //新增用户数
    newUserList: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/newVisit-statistics',
            'method': 'GET',
            'params': params
        });
    },
    countVisiterNum: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/countVisiterNum',
            'method': 'GET',
            'params': params
        });
    },
    //新增注册用户数
    newRegisterList: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/newRegister-statistics',
            'method': 'GET',
            'params': params
        });
    },
    countRegisterNum: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/countRegisterNum',
            'method': 'GET',
            'params': params
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
