/*
 * 资讯管理 接口调用
 */
import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

/***    资讯分类 api  S        ***/
//资讯分类列表
export const articleCategory = function(context, params){
    return context.$http({
        'url': API_URL + '/articleCategory/pages',
        'method': 'GET',
        'params': params
    });
};
//增加资讯分类
export const articleCategoryAdd = function(context, params){
    return context.$http({
        'url': API_URL + '/articleCategory/createArticleCategory',
        'method': 'POST',
        'body': params,
        'emulateJSON':true
    });
};
//修改资讯分类
export const articleCategoryUpdate = function(context, params,id){
    return context.$http({
        'url': API_URL + '/articleCategory/updateArticleCategory/'+id,
        'method': 'POST',
        'body': params,
        'emulateJSON':true
    });
};

//获取端口
export const getArticleCategoryType = function(context, params){
    return context.$http({
        'url': API_URL + '/dictionary/show_user_type',
        'method': 'GET',
        'params': params
    });
};
//获取设备
export const getArticleCategoryDevice = function(context, params){
    return context.$http({
        'url': API_URL + '/dictionary/show_device',
        'method': 'GET',
        'params': params
    });
};
/***    资讯分类 api  E        ***/

/**    内容管理 自建内容 S     **/
export const article = {
    upload:INDEX.UPLOAD,
    list: function (context, params) {
        return context.$http({
            'url': API_URL + '/article/pages',
            'method': 'GET',
            'params': params
        });
    },
    add: function (context, params) {
        return context.$http({
            'url': API_URL + '/article/saveArticle',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //所属资讯分类
    articleCategory: function (context, params) {
        return context.$http({
            'url': API_URL + '/articleCategory/list',
            'method': 'GET',
            'params': params
        });
    },
    showUserKeys: function (context, params) {
        return context.$http({
            'url': API_URL + '/dictionary/article_show_user_type',
            'method': 'GET',
            'params': params
        });
    },
    showDeviceKeys: function (context, params) {
        return context.$http({
            'url': API_URL + '/dictionary/article_show_device',
            'method': 'GET',
            'params': params
        });
    },
    getRowItem: function(context, params){
        return context.$http({
            'url': API_URL + '/article/articleInfo',
            'method': 'GET',
            'params': params
        });
    },
    //发布和下架
    publish: function (context, params) {
        return context.$http({
            'url': API_URL + '/article/publish/'+params.id,
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //删除和恢复
    delete: function (context, params) {
        return context.$http({
            'url': API_URL + '/article/delete/'+params.id,
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //获取文章内容  查看详情用到
    getContent: function(context, id,params={type:2}){
        return context.$http({
            'url': API_URL + '/article/'+id+'/content',
            'method': 'GET',
            'params': params
        });
    },
    updateArticle: function(context, params) {
        return context.$http({
            'url': API_URL + '/article/updateArticle/' + params.id,
            'method': 'POST',
            'body': params,
            'emulateJSON': true
        });
    },
    /** 爬虫内容  s **/
    seekerList: function (context, params) {
        return context.$http({
            'url': API_URL + '/importArticle/pages',
            'method': 'GET',
            'params': params
        });
    },
    getSeekerInfo: function (context, id) {
        return context.$http({
            'url': API_URL + '/importArticle/getImportArticleInfo/'+id,
            'method': 'GET'
        });
    },
    seekerEdit: function (context, params) {
        return context.$http({
            'url': API_URL + '/importArticle/editImportArticle/'+params.id,
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    }
    /** 爬虫内容 e **/
};
/**    内容管理 自建内容 E     **/

/*** 评论 S **/

export const comment = {
    list: function (context, params) {
        return context.$http({
            'url': API_URL + '/comment/list',
            'method': 'GET',
            'params': params
        });
    },
    update : function(context, params) {
        return context.$http({
            'url': API_URL + '/comment/update',
            'method': 'POST',
            'body': params,
            'emulateJSON': true
        });
    }
};

/*** 评论 E **/

export default {
    //法律咨询 列表
    caseList: function (context, params) {
        return context.$http({
            'url': API_URL + '/case-page',
            'method': 'GET',
            'params': params
        });
    },
    caseAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/case',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    casePut: function (context, params) {
        return context.$http({
            'url': API_URL + '/case/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    getRowCaseItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/case/' + id,
            'method': 'GET'
        });
    },
    caseDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/case/' + id,
            'method': 'DELETE'
        });
    },
    //法律咨询图片上传
    caseUploadUrl:function(){
        return  API_URL + '/case/upload-image';
    },
    //首页轮播 列表
    indexList: function (context, params) {
        return context.$http({
            'url': API_URL + '/index-activity-page',
            'method': 'GET',
            'params': params
        });
    },
    indexAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/index-activity',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
    });
    },
    indexPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/index-activity/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    getRowIndexItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/index-activity/' + id,
            'method': 'GET'
        });
    },
    indexDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/index-activity/' + id,
            'method': 'DELETE'
        });
    },
    //得到首页轮播类型枚举
    indexActivityTypes: function (context) {
        return context.$http({
            'url': API_URL + '/index-activity/types',
            'method': 'GET'
        });
    },
    //首页轮播活动图片上传
    indexUploadUrl:function(){
        return  API_URL + '/index-activity/upload-image';
    },
    //图片预览
    setImagePreview: function(docName,viewId,localId,imgWidth,imgHeight,divWidth,divHeight){
        INDEX.setImagePreview(docName,viewId,localId,imgWidth,imgHeight,divWidth,divHeight);
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
