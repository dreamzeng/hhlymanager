/*
 * 工具管理 接口调用
 */
import INDEX from 'api/index'

const API_URL = INDEX.API_URL;
//资讯分类列表
export default {
    //下载excel模板
    downExcel:function () {
      return   API_URL + '/upload-msg-user'
    },
    //获取uuid
        getId: function (context) {
            return context.$http({
                'url': API_URL + '/schedule-msg-getid',
                'method': 'get',
            });
        },
    //上传excel
    upload_msgUser: function (context, params) {
        return context.$http({
            'url': API_URL + '/upload-msg-user',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //选择人员
    select_msgUser: function (context, params) {
        return context.$http({
            'url': API_URL + '/select-msg-user',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //删除人员
    msg_userDelete: function (context, params) {
        return context.$http({
            'url': API_URL + '/msg-user-delete/'+params,
            'method': 'GET'
        });
    },
    //获取人员列表
    msg_userPage: function (context, params) {
        return context.$http({
            'url': API_URL + '/msg-user-page',
            'method': 'GET',
            'params': params
        });
    },
    //获取推送记录列表
    schedule_page: function (context, params) {
        return context.$http({
            'url': API_URL + '/schedule-msg-page',
            'method': 'GET',
            'params': params
        });
    },
    //获取推送详情
    schedule_MsgGet: function (context, params) {
        return context.$http({
            'url': API_URL + '/schedule-msg-get/'+params,
            'method': 'GET',
        });
    },
    //修改推送消息
    schedule_MsgUpdate: function (context, params) {
        return context.$http({
            'url': API_URL + '/schedule-msg-update',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //保存短信推送消息
    schedule_MsgAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/schedule-msg-add',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //保存app推送消息
    schedule_appMsgAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/schedule-appMsg-add',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //启用推送消息
    schedule_MsgEnable: function (context, params) {
        return context.$http({
            'url': API_URL + '/schedule-msg-enable/'+params,
            'method': 'GET',
        });
    },
    //关闭推送消息
    schedule_MsgDisable: function (context, params) {
        return context.$http({
            'url': API_URL + '/schedule-msg-disable/'+params,
            'method': 'GET',
        });
    },
    //生成全部用户
    condition_msgUser: function (context, params) {
        return context.$http({
            'url': API_URL + '/condition-msg-user/',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
}
