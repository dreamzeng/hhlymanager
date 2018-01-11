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
    //客服与帮助-新增问答保存
    addFAQSave:function(context,params){
        return context.$http({
            'url': API_URL + '/help/center/save',
            'method': 'post',
            'params': params,
        });
    },
    //客服与帮助-编辑问答提交接口
    editFAQSave:function(context,params,id){
        return context.$http({
            'url': API_URL + '/help/center/update/'+id,
            'method': 'post',
            'params': params,
        });
    },
    //客服与帮助-编辑问答拉取接口
    editFAQGet:function(context,id){
        return context.$http({
            'url': API_URL + '/help/center/get/'+id,
            'method': 'get',
        });
    },
    //客服与帮助-新增编辑选择上级目录下拉框
    selectOption:function(context){
        return context.$http({
            'url': API_URL + '/help/center/directorys',
            'method': 'get',
            // 'body': null,
        });
    },
    //客服与帮助-列表获取
    listFAQ:function(context,params){
        return context.$http({
            'url': API_URL + '/help/center/list',
            'method': 'get',
            // 'body': params,//这种方式，上传参数丢失，不会拼接url
            'params': params,
        });
    },
    //客服与帮助-删除行
    deleteFAQ:function(context,id){
        return context.$http({
            'url': API_URL + '/help/center/delete/'+id,
            'method': 'post',
            // 'body': null,
        });
    },
    //以上是客服与帮助的6个接口

    // 下面是问题分类，后端人员还是肖述松
    // 问题分类列表
    // 也是案件类型的二级列表，这时候就不需要把里面数组提取出来了
    typeList:function(context){
        return context.$http({
            'url': API_URL + '/caseType/get-all',
            'method': 'get',
            // 'params': params,
        });
    },
    // 问题分类列表
    deleteType:function(context,params){
        return context.$http({
            'url': API_URL + '/caseType/delete',
            'method': 'get',
            'params': params,
        });
    },
    // 新增分类信息保存
    typeSave:function(context,params){
        return context.$http({
            'url': API_URL + '/caseType/save',
            'method': 'post',
            'params': params,
        });
    },
    // 编辑保存
    updateSave:function(context,params){
        return context.$http({
            'url': API_URL + '/caseType/update',
            'method': 'post',
            'params': params,
        });
    },
    // 查看编辑分类信息
    typeEditGet:function(context,params){
        return context.$http({
            'url': API_URL + '/caseType/show-case-info',
            'method': 'get',
            'params': params,
        });
    },
    // 一级列表下拉框
    typeSelection:function(context,params){
        return context.$http({
            'url': API_URL + '/caseType/get-case-type',
            'method': 'get',
            "params":params
        });
    },



    // 下面是问答社区的接口，后台是刘政
    //  问答社区列表
    interlocutionList:function(context,params){
        return context.$http({
            'url': API_URL + '/user/get-interlocutions',
            'method': 'get',
            'params': params,
            // "headers": {"Content-Type": "application/json"},
        });
    },
    //  热门列表
    interlocutionListHot:function(context,params){
        return context.$http({
            'url': API_URL + '/user/get-hot-interlocutions',
            'method': 'get',
            'params': params,
            // "headers": {"Content-Type": "application/json"},
        });
    },
    //  移除热门问答
    removeHot:function(context,params){
        return context.$http({
            'url': API_URL + '/user/del-hot-interlocution',
            'method': 'get',
            'params': params,
        });
    },
    //  删除一行
    deleteInt:function(context,params){
        return context.$http({
            'url': API_URL + '/user/delete-interlocution',
            'method': 'get',
            'params': params,
        });
    },
    //  显示隐藏
    showHide:function(context,params){
        return context.$http({
            'url': API_URL + '/user/cancel-display-interlocution',
            'method': 'get',
            'params': params,
        });
    },
    // 显示
    showInfo:function(context,id){
        return context.$http({
            'url': API_URL + '/user/get-interlocution-detail/'+id,
            'method': 'get',
            // 'params': params,
        });
    },

    // 下面是规格属性的接口，后台是刘政
    // 规格列表
    specList:function(context,params){
        return context.$http({
            'url': API_URL + '/service-spec/specs',
            'method': 'get',
            'params': params,
        });
    },
    // 删除规格属性
    deleteId:function(context,id){
        return context.$http({
            'url': API_URL + '/service-spec/specs/'+id,
            'method': 'delete',
        });
    },
    // 编辑规格属性拉去数据
    editSpecGet:function(context,id){
        return context.$http({
            'url': API_URL + '/service-spec/specs/'+id,
            'method': 'get',
        });
    },
    // 规格列表
    specSave:function(context,params){
        return context.$http({
            'url': API_URL + '/service-spec/specs',
            'method': 'post',
            'body': params,
        });
    },
    // 推荐至首页
    popHot:function(context,params){
        return context.$http({
            'url': API_URL + '/user/add-cancel-hot-interlocution',
            'method': 'get',
            'params': params,
        });
    },

    // 新版问答管理，在用户端内容管理菜单下。擅长了领域案件类型下拉框
    optionSelect:function(context){
        return context.$http({
            'url': API_URL + '/admin/qa/case-types',
            'method': 'get',
            // 'params': params,
        });
    },
    // 新版问答管理，在用户端内容管理菜单下。详情页拉取接口
    askingInfoPull:function(context,id){
        return context.$http({
            'url': API_URL + '/admin/qa/'+id,
            'method': 'get',
            // 'params': params,
        });
    },
    // 新版问答管理，在用户端内容管理菜单下。新增保存
    askingInfoAdd:function(context,params){
        return context.$http({
            'url': API_URL + '/admin/qa/save',
            'method': 'post',
            'body': params,
            // "emulateJSON":true,
        });
    },
    // 新版问答管理，在用户端内容管理菜单下。更新-编辑保存
    askingInfoUpdate:function(context,params,id){
        return context.$http({
            'url': API_URL + '/admin/qa/'+id,
            'method': 'put',
            'body': params,
            // "emulateJSON":true
        });
    },

}
