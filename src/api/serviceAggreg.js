//服务聚合管理

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    upload:INDEX.UPLOAD,
    //服务聚合 列表
    serviceList: function (context, params) {
        return context.$http({
            'url': API_URL + '/user/manager/get_integration-goods',
            'method': 'GET',
            'params': params
        });
    },
    //删除聚合服务
    delService: function (context, uuid) {
        return context.$http({
            'url': API_URL + '/user/manager/del-integration-goods/'+uuid,
            'method': 'GET'
        });
    },
    //增加 修改聚合服务
    addService: function (context, params) {
        return context.$http({
            'url': API_URL + '/user/manager/add-integration-goods',
            'method': 'POST',
            'params': params
        });
    },
    //查看所有服务(聚合服务)
    checkService: function (context, params) {
        return context.$http({
            'url': API_URL + '/user/manager/get-goods-simpleinfo',
            'method': 'GET',
            'params': params
        });
    }
}