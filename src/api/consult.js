/*
 咨询业务 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    upload:INDEX.UPLOAD,

    list: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/consult',
            'method': 'GET',
            'params': params
        });
    },
    modify: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/update-consult/',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },

    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
