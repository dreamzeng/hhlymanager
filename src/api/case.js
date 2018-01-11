/*
 律师咨询 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    caseList: function (context, params) {
        return context.$http({
            'url': API_URL + '/case/templet/list',
            'method': 'GET',
            'params': params
        });
    },
    caseAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/case/templet/save-case-templet',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    casePut: function (context, params) {
        return context.$http({
            'url': API_URL + '/case/templet/update-case-templet/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    cascade: function (context, parentId) {
        return context.$http({
            'url': API_URL + '/case/templet/cascade/'+parentId,
            'method': 'GET'
        });
    },
    //更改状态
    caseUpdateState: function (context, params) {
        return context.$http({
            'url': API_URL + '/case/templet/update-state/'+params.id+'/'+params.state,
            'method': 'PUT'
        });
    },
    caseDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/case/templet/delete-case-templet/' + id,
            'method': 'DELETE'
        });
    },
    getCase: function (context, id) {
        return context.$http({
            'url': API_URL + '/case/templet/get-case-templet/'+id,
            'method': 'GET'
        });
    },

    //过往案例
    caseList: function (context, params) {
        return context.$http({
            'url': API_URL + '/lawyer/past-case/',
            'method': 'GET',
            'params': params
        });
    },
    newCase: function (context, params) {
        return context.$http({
            'url': API_URL + '/lawyer/past-case/submit',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    editCase: function (context, params) {
        return context.$http({
            'url': API_URL + `/lawyer/past-case/modify/${params.uuid}`,
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    detailCase:function (context, params) {
        return context.$http({
            'url': API_URL + `/lawyer/past-case/detail/${params.uuid}`,
            'method': 'GET',
            'params': params
        });
    },
    deteleCase: function (context, params) {
        return context.$http({
            'url': API_URL + `/lawyer/past-case/remove/${params.uuid}`,
            'method': 'POST',
            'params': params
        });
    },
    searchLawyer:function(context,params){
        return context.$http({
            'url': API_URL + '/lawyer/past-case/get-lawyer',
            'method': 'GET',
            'params': params
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}

