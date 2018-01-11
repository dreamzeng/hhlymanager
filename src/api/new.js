/*
 圈子 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //律师首页轮播图分页信息(圈子下的首页轮播) 列表
    newList: function (context, params) {
        return context.$http({
            'url': API_URL + '/lawyer-index/pages',
            'method': 'GET',
            'params': params
        });
    },
    //律师端首页轮播图片上传
    newUploadUrl:function(){
        return  API_URL + '/lawyer-index/upload-image';
    },
    newAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/lawyer-index',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    newPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/lawyer-index/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    getRowNewItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/lawyer-index/' + id,
            'method': 'GET'
        });
    },
    newDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/lawyer-index/' + id,
            'method': 'DELETE'
        });
    },
    //获取分页热门趣闻(圈子-热门帖子)
    topList: function (context, params) {
        return context.$http({
            'url': API_URL + '/new/new-list',
            'method': 'GET',
            'params': params
        });
    },
    //获取非热门行业新闻(圈子-热门帖子-添加热门帖子)
    notTopList: function (context, params) {
        return context.$http({
            'url': API_URL + '/new/not-top/pages',
            'method': 'GET',
            'params': params
        });
    },
    //批量添加热门趣闻
    setHotBath: function (context, params) {
        return context.$http({
            'url': API_URL + '/new/top-new/batch',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    hotDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/new/delete-new/' + id,
            'method': 'DELETE'
        });
    },
    //获取分页首页模块(圈子-首页模块)
    indexModuleList: function (context, params) {
        return context.$http({
            'url': API_URL + '/index-module/pages',
            'method': 'GET',
            'params': params
        });
    },
    //首页模块图片上传
    indexModuleUploadUrl:function(){
        return  API_URL + '/index-module/upload-image';
    },
    indexModuleAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/index-module',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    indexModulePut: function (context, params) {
        /*return context.$http({
            'url': API_URL + '/lawyer-index/'+params.id,
            'method': 'PUT',
            'params': params
        });*/
    },
    //删除首页模块
    indexModuleDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/index-module/' + id,
            'method': 'DELETE'
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
