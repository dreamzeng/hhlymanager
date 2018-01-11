/*
 律师咨询 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    upload:INDEX.UPLOAD,
    getWebEditorCfg:function(){
        return INDEX.webEditor();
    },

    // 下面的接口后端人员是张冯根
    //文章列表，下面都是文章列表页面或者着增编页面相关的代码
    articleList3:function(context,params){
        return context.$http({
            'url': API_URL + '/user/article',
            'method': 'get',
            'params': params,
        });
    },
    //删除文章
    deleteArticle:function(context,id){
        return context.$http({
            'url': API_URL + '/user/article/'+id,
            'method': 'delete',
        });
    },
    //编辑拉取数据
    pullEdit:function(context,id){
        return context.$http({
            'url': API_URL + '/user/article/get-for-modify/'+id,
            'method': 'get',
        });
    },
    //显示隐藏
    showHide:function(context,id,params){
        return context.$http({
            'url': API_URL + '/user/article/cancel-display/'+id,
            'method': 'put',
            "body":params,
            "emulateJSON":true
        });
    },
    //推荐到首页
    recommend:function(context,id){
        return context.$http({
            'url': API_URL + '/user/article/set-home-page/'+id,
            'method': 'put',
        });
    },
    //分类下拉框
    options:function(context){
        return context.$http({
            'url': API_URL + '/user/article/categories',
            'method': 'get',
        });
    },
    //编辑后的保存
    editSave:function(context,params){
        return context.$http({
            'url': API_URL + '/user/article',
            'method': 'put',
            "body":params,
            // "emulateJSON":true
        });
    },
    //新建的保存
    newSave:function(context,params){
        return context.$http({
            'url': API_URL + '/user/article',
            'method': 'post',
            "body":params,
            // "emulateJSON":true
        });
    },




    //案例管理列表页面接口
    caseList:function(context,params){
        return context.$http({
            'url': API_URL + '/cases/analysis',
            'method': 'get',
            'params': params,
        });
    },
    //案例分类下拉框
    caseOptions:function(context){
        return context.$http({
            'url': API_URL + '/cases/analysis/categories',
            'method': 'get',
        });
    },
    //删除案例
    deleteCase:function(context,id){
        return context.$http({
            'url': API_URL + '/cases/analysis/del/'+id,
            'method': 'post',
        });
    },
    //新增案例
    newCase:function(context,params){
        return context.$http({
            'url': API_URL + '/cases/analysis',
            'method': 'post',
            "body":params,
            // "emulateJSON":true

        });
    },
    //编辑保存案例
    editSaveCase:function(context,params){
        return context.$http({
            'url': API_URL + '/cases/analysis',
            'method': 'put',
            "body":params,
            // "emulateJSON":true
        });
    },
    //编辑拉取案例
    pullCase:function(context,id){
        return context.$http({
            'url': API_URL + '/cases/analysis/get-for-modify/'+id,
            'method': 'get',
            // "body":params
        });
    },
    //推荐至首页案例
    recommendCase:function(context,id){
        return context.$http({
            'url': API_URL + '/cases/analysis/set-home-page/'+id,
            'method': 'put',
        });
    },
    //显示隐藏案例
    showHideCase:function(context,id,params){
        return context.$http({
            'url': API_URL + '/cases/analysis/cancel-display/'+id,
            'method': 'put',
            "body":params,
            "emulateJSON":true
        });
    },




    // 首页内容推荐，1:热门文章，2：快速咨询，3：案例分析
    homeConList:function(context,params){
        return context.$http({
            'url': API_URL + '/user/manager/get-home-content',
            'method': 'get',
            "params":params
        });
    },
    // 删除
    delHomeList:function(context,type,uuid){
        return context.$http({
            'url': API_URL + '/user/manager/del-home-content/'+type+'/'+uuid,
            'method': 'get',
            // "params":params
        });
    },
    // 上移下移 type 1：上移,-1：下移
    upDownList:function(context,type,rtype,uuid){
        return context.$http({
            'url': API_URL + '/user/manager/up-down-home-content/'+type+'/'+rtype+'/'+uuid,
            'method': 'get',
            // "params":params
        });
    },












    // 下面是规格属性的接口，后台是刘政
    // 规格列表
    // specList:function(context,params){
    //     return context.$http({
    //         'url': API_URL + '/service-spec/specs',
    //         'method': 'get',
    //         'params': params,
    //     });
    // },
    // // 删除规格属性
    // deleteId:function(context,id){
    //     return context.$http({
    //         'url': API_URL + '/service-spec/specs/'+id,
    //         'method': 'delete',
    //     });
    // },
    // // 编辑规格属性拉去数据
    // editSpecGet:function(context,id){
    //     return context.$http({
    //         'url': API_URL + '/service-spec/specs/'+id,
    //         'method': 'get',
    //     });
    // },
    // // 规格列表
    // specSave:function(context,params){
    //     return context.$http({
    //         'url': API_URL + '/service-spec/specs',
    //         'method': 'post',
    //         'body': params,
    //     });
    // },
    // // 推荐至首页
    // popHot:function(context,params){
    //     return context.$http({
    //         'url': API_URL + '/user/add-cancel-hot-interlocution',
    //         'method': 'get',
    //         'params': params,
    //     });
    // },





}
