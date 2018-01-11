/**
 * 个人信息修改
 *
 */


import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //系统参数 列表
    userList: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/user/'+id,
            'method': 'GET'
        });
    },
    updateInfo: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/user/updateInfo',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    checkPassWord: function (context,params) {
        return context.$http({
            'url': API_URL + '/system/user/checkPassWord',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    updatePassWord: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/user/updatePassWord',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    }
}
