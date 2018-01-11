/*
 评价管理 、APP首页、标签管理接口调用
 liangyingmei-2017-11-23
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    upload:INDEX.UPLOAD,
    getWebEditorCfg:function(){
        return INDEX.webEditor();
    },

    //APP首页开始 --下面的接口后端人员liuzheng
    //APP首页接口 --appType int 1: APP首页, 2: 微信公众号首页
    appHomeList:function(context,params,appType){
        return context.$http({
            'url': API_URL + '/user/manager/get-home-goods/'+appType,//app首页列表接口
            'method': 'get',
            'params': params,
        });
    },
    //清空首页服务信息
    delappHomeList:function(context,uuid){
        return context.$http({
            'url': API_URL + '/user/manager/del-home-goods/'+uuid,//删除首页服务接口
            'method': 'get',
        });
    },
    //修改首页服务
    editappHomeList:function(context,params){
        return context.$http({
            'url': API_URL + '/user/manager/add-home-goods',//修改首页服务接口
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
    //APP首页结束
    //评价管理开始，后端人员还是张冯根
    appraiseList:function(context,params){
        return context.$http({
            'url': API_URL + '/admin/order/comment/list',//订单评论列表接口
            'method': 'get',
            'params': params,
        });
    },
    //  显示隐藏
    showHide:function(context,orderUuid,state){
        return context.$http({
            'url': API_URL + '/admin/order/comment/state/'+orderUuid+'/'+state,
//          'url': '/admin/order/comment/state/'+orderUuid+'/'+state,
            'method': 'PUT',
        });
    },
    //评价管理结束
    //标签管理开始,后端人员还是张冯根
    labelList: function (context, params) {
        return context.$http({
            'url': API_URL + '/admin/comment/label/list',//标签列表接口
            'method': 'GET',
            'params': params
        });
    },
    labelAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/admin/comment/label',//添加标签接口
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    labelPut: function (context, params,uuid) {
        return context.$http({
            'url': API_URL + '/admin/comment/label/'+uuid,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    labelDel: function (context, uuid) {
        return context.$http({
            'url': API_URL + '/admin/comment/label/' + uuid,
            'method': 'DELETE'
        });
    },
    //标签管理结束
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
