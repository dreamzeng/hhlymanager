/*
 认证管理
 liangyingmei-2017-12-22
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    upload:INDEX.UPLOAD,
    getWebEditorCfg:function(){
        return INDEX.webEditor();
    },

    //认证管理开始 
    //个人认证列表接口 --下面的接口后端人员：黎兆群
    pcertificationList:function(context,params){
        return context.$http({
            'url': API_URL + '/manager/auth/user',//个人认证列表接口 
            'method': 'get',
            'params': params
        });
    },
    //个人认证列表中---个人认证--审核
    showHide:function(context,phone,state){
        return context.$http({
            'url': API_URL + '/manager/auth/user/'+phone+'/'+state,
            'method': 'PUT'
        });
    },
    //企业认证列表接口 --下面的接口后端人员：吕新欣
    encertificationList:function(context,params){
        return context.$http({
            'url': API_URL + '/auth/company/',//企业认证列表接口 
            'method': 'get',
            'params': params
        });
    },
    //企业认证列表中---企业认证--审核
    enshowHide:function(context,companId){
        return context.$http({
            'url': API_URL + '/auth/company/'+companId,
            'method': 'PUT'
        });
    },
    //企业认证列表中---查询企业认证信息
    enReqcertification:function(context,companId){
        return context.$http({
            'url': API_URL + '/auth/company/'+companId,
            'method': 'GET'
        });
    },
    //企业认证列表中---修改企业认证信息+添加企业认证信息
    enEditcertification:function(context,params){
        return context.$http({
            'url': API_URL + '/auth/company',
            'method': 'POST',
            'body': JSON.stringify(params),
            'emulateJSON':true
        });
    },
    //企业认证列表中---修改企业认证信息+添加企业认证信息
    enAddcertification:function(context,params){
        return context.$http({
            'url': API_URL + '/auth/company',
            'method': 'POST',
            'body': JSON.stringify(params),
            'emulateJSON':true
        });
    },
    //企业认证列表中---企业认证信息--查询企业名称是否已经被认证
    enExistscertification:function(context,companyName,uuid){
        return context.$http({
            'url': API_URL + '/auth/company/name/exists',
            'method': 'GET'
        });
    },
    //企业认证列表中---企业认证信息--查询企业营业编码是否已经被认证
    enlicenseNoExists:function(context,businessLicenseNo,uuid){
        return context.$http({
            'url': API_URL + '/auth/company/licenseNo/exists',
            'method': 'GET'
        });
    },
    //认证管理结束
    //员工列表开始
    //添加人员信息
    msg_userAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/auth/company/users',
            'method': 'POST',
            'body': JSON.stringify(params),
            'emulateJSON':true
        });
    },
    //下载excel模板
    downExcel:function () {
      return   API_URL + '/upload-msg-user'
    },
    //上传excel
    upload_exlsUser: function (context, uuid, params) {
        return context.$http({
            'url': API_URL + '/auth/company/'+uuid+'/imports',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //删除人员
    msg_userDelete: function (context, uuid) {
        return context.$http({
            'url': API_URL + '/auth/company/users/'+uuid,
            'method': 'DELETE'
        });
    },
    //获取人员列表
    msg_userPage: function (context, params) {
        return context.$http({
            'url': API_URL + '/auth/company/users',
            'method': 'GET',
            'params': params
        });
    },
    //
    //员工列表结束
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
