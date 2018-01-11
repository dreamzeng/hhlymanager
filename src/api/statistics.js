/*
    数据统计 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //用户数据统计
    users: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/users',
            'method': 'GET',
            'params': params
        });
    },
    //文章数据统计
    articles: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/articles',
            'method': 'GET',
            'params': params
        });
    },
    //案件竞标数据统计
    caseBids: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/case-bids',
            'method': 'GET',
            'params': params
        });
    },
    //案件数据统计
    cases: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/cases',
            'method': 'GET',
            'params': params
        });
    },
    //预约咨询统计
    appointmentAdvices: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/appointment-advices',
            'method': 'GET',
            'params': params
        });
    },
    //新闻统计
    news: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/news-statistics',
            'method': 'GET',
            'params': params
        });
    },
    //问题需求统计
    issueDemand: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/issue-demand-statistics',
            'method': 'GET',
            'params': params
        });
    }
}

export const pathAnalyseApi = {
    //用户点击事件统计接口
    getClick: function (context, params) {
        return context.$http({
            'url': API_URL + '/statistics/query/user/getFunctionClickStatistics',
            'method': 'GET',
            'params': params
        });
    },
    //用户行为列表接口--下拉列表用
    getUserBehaviors: function (context, params) {
        return context.$http({
            'url': API_URL + '/statistics/query/user/getUserBehaviors',
            'method': 'GET',
            'params': params
        });
    },
    //根据指定用户行为Id获取行为下所有页面列表接口--下拉列表用
    getUserPagesByBehaviorId: function (context, params) {
        return context.$http({
            'url': API_URL + '/statistics/query/user/getUserPagesByBehaviorId',
            'method': 'GET',
            'params': params
        });
    },
    //用户页面行为统计接口
    getPageStatistics: function (context, params) {
        return context.$http({
            'url': API_URL + '/statistics/query/user/getPageStatistics',
            'method': 'GET',
            'params': params
        });
    },
    //用户行为统计接口
    getBehaviorStatistics: function (context, params) {
        return context.$http({
            'url': API_URL + '/statistics/query/user/getBehaviorStatistics',
            'method': 'GET',
            'params': params
        });
    }
}
