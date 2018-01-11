/*
   直接活动 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    upload:INDEX.UPLOAD,
    //直播活动分页列表
    liveList: function (context, params) {
        return context.$http({
            'url': API_URL + '/play-activitys',
            'method': 'GET',
            'params': params
        });
    },
    //直播活动详情
    liveDetailsList: function (context, id) {
        return context.$http({
            'url': API_URL + '/play-activitys/'+id,
            'method': 'GET'
        });
    },
    // 新增活动
    liveAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/play-activitys',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //获取活动
    getRowLiveItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/play-activitys/'+id,
            'method': 'GET'
        });
    },
    livePut: function (context, params) {
        return context.$http({
            'url': API_URL + '/play-activitys/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    liveDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/play-activitys/' + id,
            'method': 'DELETE'
        });
    },
    //直播视频列表
    liveActionList: function (context,id,params) {
        return context.$http({
            'url': API_URL + '/play-activitys/'+id+'/play-lives',
            'method': 'GET',
            'params': params
        });
    },
    liveActionAdd: function (context,id,params) {
        return context.$http({
            'url': API_URL + '/play-activitys/'+id+'/play-lives',
            'method': 'POST',
            'body': params
        });
    },
    liveActionDel: function (context, id,playLiveId) {
        return context.$http({
            'url': API_URL + '/play-activitys/'+id+'/play-lives/'+playLiveId,
            'method': 'DELETE'
        });
    },

    //直播活动分页人员列表
    liveAuditUserList: function (context, id,params) {
        return context.$http({
            'url': API_URL + '/play-activitys/'+id+'/users',
            'method': 'GET',
            'params': params
        });
    },
    //直播活动人员审核
    liveAuditUserPut: function (context, id,userId,params) {
        return context.$http({
            'url': API_URL + '/play-activitys/'+id+'/users/'+userId,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    //批量审核
    batchAudit: function (context, id,params) {
        return context.$http({
            'url': API_URL + '/play-activitys/'+id+'/users/batch-audit/',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
