/*
 * 文章管理 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //阅读文章 列表
    articleList: function (context, params) {
        return context.$http({
            'url': API_URL + '/article/pages',
            'method': 'GET',
            'params': params
        });
    },
    articleDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/article/' + id,
            'method': 'DELETE'
        });
    },
    //获取文章内容
    articleContent: function (context, params) {
        return context.$http({
            'url': API_URL + '/article/'+params.id+'/content',
            'method': 'GET',
            'params': params
        });
    },
    //探索文章列表
    exploreList: function (context, params) {
        return context.$http({
            'url': API_URL + '/explore-article/pages',
            'method': 'GET',
            'params': params
        });
    },
    //探索文章图片上传
    exploreUploadUrl:function(){
        return  API_URL + '/explore-article/upload-image';
    },
    exploreAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/explore-article',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    explorePut: function (context, params) {
        return context.$http({
            'url': API_URL + '/explore-article/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    getRowExploreItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/explore-article/' + id,
            'method': 'GET'
        });
    },
    exploreDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/explore-article/' + id,
            'method': 'DELETE'
        });
    },
    //热门文章列表
    hotList: function (context, params) {
        return context.$http({
            'url': API_URL + '/v2/article/top/pages',
            'method': 'GET',
            'params': params
        });
    },
    //获取已发布但不是热门文章的分页文章信息,用于添加热门文章
    releasedList: function (context, params) {
        return context.$http({
            'url': API_URL + '/article/released-pages',
            'method': 'GET',
            'params': params
        });
    },
    //批量新增热门文章
    setHotBath: function (context, params) {
        return context.$http({
            'url': API_URL + '/article/top/batch',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    hotDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/article/top/' + id,
            'method': 'DELETE'
        });
    },
    getUploadFile:function(){
        return INDEX.UPLOAD_FILE;
    },
    getWebEditorCfg:function(){
        return INDEX.webEditor();
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
