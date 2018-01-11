/*
    抽奖活动 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //奖品 列表
    prizesList: function (context, params) {
        return context.$http({
            'url': API_URL + '/prizes',
            'method': 'GET',
            'params': params
        });
    },
    prizesPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/prizes/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    prizesAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/prizes',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    prizesDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/prizes/'+id,
            'method': 'DELETE'
        });
    },
    timesGet: function (context, params) {
        return context.$http({
            'url': API_URL + '/lottery/time',
            'method': 'GET',
            'params': params
        });
    },
    timesPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/lottery/time',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    //用户答题列表
    answerList: function (context, params) {
        return context.$http({
            'url': API_URL + '/answers/users',
            'method': 'GET',
            'params': params
        });
    },
    //用户答题 信息
    answers: function (context, id) {
        return context.$http({
            'url': API_URL + '/answers?userId='+id,
            'method': 'GET'
        });
    },
    //图表统计
    answersCharts: function (context) {
        return context.$http({
            'url': API_URL + '/questions/statistical',
            'method': 'GET'
        });
    },
    //中奖管理
    recordList: function (context, params) {
        return context.$http({
            'url': API_URL + '/lottery-record',
            'method': 'GET',
            'params': params
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
