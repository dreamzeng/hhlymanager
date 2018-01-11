/*
 用户统计 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //新增用户数
    listAppChannels: function (context, params) {
        return context.$http({
            'url': API_URL + '/appChannel/listAppChannels',
            'method': 'GET',
            'params': params
        });
    },
    //文章统计
    articleList: function (context, params) {
        return context.$http({
            'url': API_URL + '/data-statistics/articleListStatistics',
            'method': 'GET',
            'params': params
        });
    },
    //文章数据导出
    exportArticle: function () {
        return  API_URL + '/data-statistics/exportArticleListStatistics';
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
