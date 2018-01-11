/*
 订单管理 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //订单 列表
    orderList: function (context, params) {
        return context.$http({
            'url': API_URL + '/order/list',
            'method': 'GET',
            'params': params
        });
    },
    // 订单详情
    orderDetail: function (context, params) {
        return context.$http({
            'url': API_URL + '/order/order-detail',
            'method': 'GET',
            'params':params
        });
    },
    orderPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/order/update-order-info',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    orderConfirm: function (context, params) {
        return context.$http({
            'url': API_URL + '/order/confirm-order',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //订单原因
    orderDictionary: function (context, params) {
        return context.$http({
            'url': API_URL + '/dictionary/'+params,
            'method': 'GET'
        });
    },
    //订单操作
    workflow: function (context, params,orderNo,operator) {
        return context.$http({
            'url': API_URL + '/order/workflow2/'+orderNo+'/'+operator,
            'method': 'PUT',
            'body': params
        });
    },
    //用户需求列表
    userReqList: function (context, params) {
        return context.$http({
            'url': API_URL + '/admin/demand/list',
            'method': 'GET',
            'params': params
        });
    },
    newUserReqList: function (context, params) {
        return context.$http({
            'url': API_URL + '/admin/demand/save',
            'method': 'POST',
            'params': params
        });
    },
    editUserReqList:function (context, params) {
        return context.$http({
            'url': API_URL + `/admin/demand/${params.uuid}`,
            'method': 'PUT',
            'params': params
        });
    },
    selectUserReqList:function (context, params) {
        return context.$http({
            'url': API_URL + `/admin/demand/${params.uuid}`,
            'method': 'GET',
            'params': params
        });
    },
    selectLawyer:function (context, params) {
        return context.$http({
            'url': API_URL + '/third/lawyer-name',
            'method': 'GET',
            'params': params
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
