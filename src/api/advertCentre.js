/*
 广告中心 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    upload:INDEX.UPLOAD,
    // 广告中心列表
    list: function (context, params) {
        return context.$http({
            'url': API_URL + '/advert-center-page',
            'method': 'GET',
            'params': params
        });
    },
    //广告中心类型枚举列表接口
    getTypes: function (context, params) {
        return context.$http({
            'url': API_URL + '/advert-center/types',
            'method': 'GET',
            'params': params
        });
    },
    //广告中心应用模块类型枚举列表接口
    getModuletypes: function (context, params) {
        return context.$http({
            'url': API_URL + '/advert-center/moduletypes',
            'method': 'GET',
            'params': params
        });
    },
    // 广告中心添加接口
    add: function (context, params) {
        return context.$http({
            'url': API_URL + '/advert-center',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //获取详情
    getItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/advert-center/' + id,
            'method': 'GET'
        });
    },
    //修改
    modify: function (context, params) {
        return context.$http({
            'url': API_URL + '/advert-center/'+params.id,
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //上移
    up: function (context, id) {
        return context.$http({
            'url': API_URL + '/advert-center-up/'+id,
            'method': 'PUT'
        });
    },
    //下移
    down: function (context, id) {
        return context.$http({
            'url': API_URL + '/advert-center-down/'+id,
            'method': 'PUT'
        });
    },
    //置顶
    top: function (context, id) {
        return context.$http({
            'url': API_URL + '/advert-center-top/'+id,
            'method': 'PUT'
        });
    },
    //禁用
    disable: function (context, id) {
        return context.$http({
            'url': API_URL + '/advert-center-disable/'+id,
            'method': 'PUT'
        });
    },
    //启用
    enable: function (context, id) {
        return context.$http({
            'url': API_URL + '/advert-center-enable/'+id,
            'method': 'PUT'
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
