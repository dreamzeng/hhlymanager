/*
 第三方管理 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //用户管理 列表
    userList: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/user',
            'method': 'GET',
            'params': params
        });
    },
    userLock: function (context, param) {
        return context.$http({
            'url': API_URL + '/third/user-lock/' + param.id,
            'method': 'PUT',
            'body': param,
            'emulateJSON':true
        });
    },
    userUnlock: function (context, id) {
        return context.$http({
            'url': API_URL + '/third/user-unlock/' + id,
            'method': 'PUT'
        });
    },
    //获取律师信息
    lawyerSingle: function (context, id) {
        return context.$http({
            'url': API_URL + '/third/lawyer/' + id,
            'method': 'GET'
        });
    },
    //获取律师认证信息
    lawyerAuthList: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/lawyer-page',
            'method': 'GET',
            'params': params
        });
    },
    //律师认证
    authSuccess: function (context, id) {
        return context.$http({
            'url': API_URL + '/third/lawyer/auth-success/' + id,
            'method': 'PUT'
        });
    },
    //律师驳回
    authFail: function (context, id,reason) {
        return context.$http({
            'url': API_URL + '/third/lawyer/auth-fail/' + id+'/?reason='+reason,
            'method': 'PUT'
        });
    },
    //意见反馈
    feedbackList: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/feedback-page',
            'method': 'GET',
            'params': params
        });
    },

    //注册律师
    registerLawyer(context, formData){
        return context.$http({
            url: API_URL + '/lawyer/manager-register',
            method:"POST",
            body: formData
        })
    },

    //获取擅长类型
    getCaseType(context){
        return context.$http({
            url: API_URL + '/caseType/get-case-type',
            method:"GET"
        })
    },

    //邀请码
    inviteCodeList: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/user-invite/invite-code-page',
            'method': 'GET',
            'params': params
        });
    },
    //热门律师
    hotLawyerList: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/lawyer/top-lawyer-page',
            'method': 'GET',
            'params': params
        });
    },
    //得到认证通过但未分配的律师信息
    lawyerUnallocatedList: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/lawyer-unallocated-page',
            'method': 'GET',
            'params': params
        });
    },
    //保存热门律师
    setHotLawyer: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/lawyer-detail/batch-to-top-lawyer',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    hotLawyerDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/third/top-lawyer/' + id,
            'method': 'DELETE'
        });
    },
    vipLawyerList: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/lawyer/vip-lawyer-page',
            'method': 'GET',
            'params': params
        });
    },
    //保存热门律师
    setVipLawyer: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/lawyer-detail/batch-to-vip-lawyer',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    vipLawyerDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/third/vip-lawyer/' + id,
            'method': 'DELETE'
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    },
    //意见反馈详情页，新加页面，ywl2017年9月12日11:53:00
    feedbackInfo:function(context,id){
        return context.$http({
            'url': API_URL + '/third/feedback-detail/'+id,
            'method': 'get',
            // 'body': null,
        });
    },
    //导出所有记录
    allOrder:function (params) {
        return  API_URL + '/third/export-detail-search?checkedTitle='+params
    },
    //导出选中的记录
    chooseOrder:function (params) {
        return  API_URL + '/third/export-detail-checked?checkedTitle='+params
    },
    // 律所管理开始
    // 律所列表
    layFirmList: function (context, params) {
        return context.$http({
            'url': API_URL + '/lawoffice/getlist',
            'method': 'get',
            "params":params
        });
    },
    // 删除律所
    deleteFirm: function (context, id) {
        return context.$http({
            'url': API_URL + '/lawoffice/delete/'+id,
            'method': 'post',
            // "params":params
        });
    },
    // 标记拉取律所
    pullEdit: function (context, id) {
        return context.$http({
            'url': API_URL + '/lawoffice/get/'+id,
            'method': 'get',
        });
    },
    // 编辑保存律所
    editSave: function (context, params) {
        return context.$http({
            'url': API_URL + '/lawoffice/update',
            'method': 'post',
            "body":params
        });
    },
    // 新增保存律所
    addSave: function (context, params) {
        return context.$http({
            'url': API_URL + '/lawoffice/add',
            'method': 'post',
            "body":params
        });
    },
    // 律所成员列表
    lawerList: function (context,params) {
        return context.$http({
            'url': API_URL + '/lawoffice/get/employee-list',
            'method': 'get',
            "params":params
        });
    },
    // 删除成员
    deleteLawyer: function (context,uuid) {
        return context.$http({
            'url': API_URL + '/lawoffice/delete/employee/'+uuid,
            'method': 'post',
            // "params":params
        });
    },
    // 新增成员保存
    addLawyer: function (context,params) {
        return context.$http({
            'url': API_URL + '/lawoffice/add/employee',
            'method': 'post',
            "body":params
        });
    },
    // 编辑保存
    editSaveLawyer: function (context,params) {
        return context.$http({
            'url': API_URL + '/lawoffice/update/employee',
            'method': 'post',
            "body":params
        });
    },
    // 编辑拉取
    pullLawyer: function (context,params) {
        return context.$http({
            'url': API_URL + '/lawoffice/emp/detail',
            'method': 'get',
            "params":params
        });
    },
    // 带团律师是否已认证
    lawyerOne: function (context,params) {
        return context.$http({
            'url': API_URL + '/lawoffice/check/leader-lawyer',
            'method': 'get',
            "params":params
        });
    },
    // 校验律师是否在其它律所
    lawyerContain: function (context,params) {
        return context.$http({
            'url': API_URL + '/lawoffice/check/lawyer',
            'method': 'get',
            "params":params
        });
    }





}

//知识产权代理人
export const agentApi = {
    // 列表
    list: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/agent-page',
            'method': 'GET',
            'params': params
        });
    },
    add: function (context, param) {
        return context.$http({
            'url': API_URL + '/third/agent/manager-register',
            'method': 'post',
            'body': param
        });
    },
    update: function (context, param) {
        return context.$http({
            'url': API_URL + '/third/user-update',
            'method': 'post',
            'body': param
        });
    },
    //工作经历
    jobExperience: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/user-jobExperience/'+params.id,
            'method': 'GET'
        });
    },
    //教育经历
    eduExperience: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/user-eduExperience/'+params.id,
            'method': 'GET'
        });
    },
    //擅长领域
    case: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/user-case/'+params.id,
            'method': 'GET'
        });
    },
}

//知识产权代理人认证
export const authAgentApi = {
    list: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/auth-agent-page',
            'method': 'GET',
            'params': params
        });
    },
    //认证
    authSuccess: function (context, id) {
        return context.$http({
            'url': API_URL + '/third/agent/auth-success/' + id,
            'method': 'PUT'
        });
    },
    //驳回
    authFail: function (context, id,reason) {
        return context.$http({
            'url': API_URL + '/third/agent/auth-fail/' + id+'/?reason='+reason,
            'method': 'PUT'
        });
    },
}

//律师用户
export const lawyerUserApi = {
    list: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/lawyer-page/v2.0',
            'method': 'GET',
            'params': params
        });
    },
    add: function (context, param) {
        return context.$http({
            'url': API_URL + '/third/lawyer/manager-register',
            'method': 'post',
            'body': param
        });
    },
}

//律师用户认证列表

export const lawyerAuthApi = {
    list: function (context, params) {
        return context.$http({
            'url': API_URL + '/third/auth-lawyer-page',
            'method': 'GET',
            'params': params
        });
    },
    //律师认证
    authSuccess: function (context, id) {
        return context.$http({
            'url': API_URL + '/third/lawyer/auth-success/' + id,
            'method': 'PUT'
        });
    },
    //律师驳回
    authFail: function (context, id,reason) {
        return context.$http({
            'url': API_URL + '/third/lawyer/auth-fail/' + id+'/?reason='+reason,
            'method': 'PUT'
        });
    }
}
