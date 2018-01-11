/*
 用户需求 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
	//用户需求 统计
	statistics: function(context, params){
		return context.$http({
            'url': API_URL + '/user-requirement/statistics',
            'method': 'GET',
            'params': params
        });
	},
	//用户需求 查询列表
	records: function(context, params){
		return context.$http({
            'url': API_URL + '/user-requirement/records',
            'method': 'GET',
            'params': params
        });
	}
}