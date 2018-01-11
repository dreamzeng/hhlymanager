/*
 业务管理 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {

    compList: function (context, params) {
        return context.$http({
            'url': API_URL + '/tender/page',
            'method': 'GET',
            'params': params
        });
    },
    getItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/tender/detail?caseId=' + id,
            'method': 'GET'
        });
    },
    compDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/tender/delete?caseId=' + id,
            'method': 'DELETE'
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
