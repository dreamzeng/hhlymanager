/*
 系统版本 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //系统参数 列表
    versionList: function (context, params) {
        return context.$http({
            'url': API_URL + '/version-page',
            'method': 'GET',
            'params': params
        });
    },
    //得到版本信息
    getRowVersionItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/version/' + id,
            'method': 'GET'
        });
    },
    //版本信息安装包上传
    versionUploadUrl:function(){
        return  API_URL + '/version/upload-package';
    },
    //保存版本信息
    versionAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/version',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //更新版本信息
    versionPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/version/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    //校验版本信息是否存在
    versionIsexist: function (context) {
        return context.$http({
            'url': API_URL + '/version/isexist',
            'method': 'GET'
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
