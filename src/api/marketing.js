/*
 律师咨询 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //添加优惠券信息上传接口
    couponAdd:function(context,params){
        return context.$http({
            'url': API_URL + '/create/coupon',
            'method': 'post',
            'body': params,
            "headers": {"Content-Type": "application/json"},
        });
    },
    //编辑优惠券信息上传接口
    couponEdit:function(context,params){
        return context.$http({
            'url': API_URL + '/update/coupon',
            'method': 'post',
            'body': params,
        });
    },
    //优惠券首页（列表页）
    coupons: function (context, params) {
        return context.$http({
            'url': API_URL + '/get/coupons',
            'method': 'GET',
            'params': params
        });
    },
    //首页禁用按钮
    forbidden:function(context,id){
        return context.$http({
            'url':API_URL+'/ban/coupon/'+id,
            'method':'post'
        })
    },
    //批量禁用按钮-码库明细
    forbiddenBatch:function(context,params){
        return context.$http({
            'url':API_URL+'/batch/ban/coupondetails',
            'method':'get',
            'params': params
        })
    },
    //批量启用按钮-码库明细
    enableBatch:function(context,params){
        return context.$http({
            'url':API_URL+'/batch/activate/coupondetails',
            'method':'get',
            'params': params
        })
    },
    //首页启用按钮
    enable:function(context,id){
        return context.$http({
            'url':API_URL+'/enable/coupon/'+id,
            'method':'post'
        })
    },
    //优惠券详情页
    conponInfo:function(context,id){
        return context.$http({
            'url':API_URL+'/get/coupon/'+id,
            'method':'get'
        })
    },
    //码库明细
    conponList:function(context,id,params){
        return context.$http({
            'url':API_URL+'/get/coupondetails/'+id,
            'method':'get',
            'params':params

        })
    },
    //编辑按钮
    modify:function(context,id){
        return context.$http({
            'url':API_URL+'/update/coupon/'+id,
            'method':'post'
        })
    },
    //添加评论--码库明细页面
    addRemarks:function(context,params){
        return context.$http({
            'url':API_URL+'/add/remarks',
            'method':'post',
            'params': params
        })
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    },
    // excel导出
    exportByUrl: function (context, id) {
        return API_URL + '/export/coupondetails/'+id;
    },
    //服务分类接口
    serviceType: function (context, id) {
        return context.$http({
            'url': API_URL + '/goods/grade-category/'+id,
            'method': 'GET',
        });
    },
    //服务查询接口
    serviceQuery: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/goods-list',
            'method': 'GET',
            'params': params
        });
    },

}
