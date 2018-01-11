/*
 用户运营 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

//活跃度
export  function userActive (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/userActive-statistics',
        'method': 'GET',
        'params': params
    });
}
//留存率
export  function userAliveRate (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/userAliveRate-statistics',
        'method': 'GET',
        'params': params
    });
}

