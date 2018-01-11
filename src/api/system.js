/*
 系统设置 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //系统参数 列表
    configList: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/config-page',
            'method': 'GET',
            'params': params
        });
    },
    configAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/config',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    configDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/config/' + id,
            'method': 'DELETE'
        });
    },
    getRowConfigItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/config/' + id,
            'method': 'GET'
        });
    },
    configPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/config',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    //热门城市
    //获取'热门'城市分页信息
    cityHotList: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/top-city-page',
            'method': 'GET',
            'params': params
        });
    },
    setCitytHot: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/city-to-top',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //获取城市分页信息
    cityList: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/city-page',
            'method': 'GET',
            'params': params
        });
    },
    addCity: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/city',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    deleteCity: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/city/' + id,
            'method': 'DELETE'
        });
    },
    deleteHotCity: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/top-city/' + id,
            'method': 'DELETE'
        });
    },
    //用户管理
    userManagerList: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/user',
            'method': 'GET',
            'params': params
        });
    },
    userManagerAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/user',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    getUserManagerItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/user/' + id,
            'method': 'GET'
        });
    },
    userManagerIsexist: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/user/isexist',
            'method': 'GET',
            'params': params
        });
    },
    userManagerPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/user',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    userManagerDelete: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/user/' + id,
            'method': 'DELETE'
        });
    },
    //角色管理 获取所有角色信息
    roleList: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/role',
            'method': 'GET',
            'params': params
        });
    },
    //获取角色分页信息
    rolePageList: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/role-page',
            'method': 'GET',
            'params': params
        });
    },
    //获取属于某角色下的分页用户信息
    roleSysUsers: function (context, id, params) {
        return context.$http({
            'url': API_URL + '/system/role/' + id + '/sysusers',
            'method': 'GET',
            'params': params
        });
    },
    getRoleItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/role-resource/' + id,
            'method': 'GET'
        });
    },
    roleAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/role',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    rolePut: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/role',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    //获取资源管理
    resList: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/resource/js-tree',
            'method': 'GET',
            'params': params
        });
    },
    //获取单个资源内容
    getRowResItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/resource/' + id,
            'method': 'GET'
        });
    },
    resPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/resource/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    resAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/resource/',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    deleteRes: function (context, id) {
        return context.$http({
            'url': API_URL + '/system/resource/' + id,
            'method': 'DELETE'
        });
    },
    logout: function (context) {
        INDEX.logout(context);
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
