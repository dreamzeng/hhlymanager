/*
 律师咨询 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //用户咨询 列表
    adviceList: function (context, params) {
        return context.$http({
            'url': API_URL + '/appointment-advice-page',
            'method': 'GET',
            'params': params
        });
    },
    //咨询套餐
    packList: function (context, params) {
        return context.$http({
            'url': API_URL + '/package-page',
            'method': 'GET',
            'params': params
        });
    },
    // 创建咨询套餐
    packAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/package',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //获取咨询套餐
    getPackItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/package/' + id,
            'method': 'GET'
        });
    },
    packPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/package/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    packDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/package/' + id,
            'method': 'DELETE'
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
