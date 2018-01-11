/*
 金额统计 已支付订单 待支付订单  支出统计    接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

// 已支付订单 支付人数统计
export  function orderPayer (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/orderPayer-statistics',
        'method': 'GET',
        'params': params
    });
}

//已支付订单 支付次数统计
export  function orderPayCount (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/orderPayCount-statistics',
        'method': 'GET',
        'params': params
    });
}

//已支付订单 支付金额统计
export  function orderPayPrices (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/orderPayPrices-statistics',
        'method': 'GET',
        'params': params
    });
}
/*******************/
//未支付人数统计
export  function orderNotPayUser (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/orderNotPayUser-statistics',
        'method': 'GET',
        'params': params
    });
}
//未支付次数统计
export  function orderNotPayCount (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/orderNotPayCount-statistics',
        'method': 'GET',
        'params': params
    });
}
//未支付金额统计
export  function orderNotPayPrices (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/orderNotPayPrices-statistics',
        'method': 'GET',
        'params': params
    });
}
//未支付 下单转化率
export  function orderTransformRate (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/orderTransformRate-statistics',
        'method': 'GET',
        'params': params
    });
}
/****** 提现 **********/

//提现到账金额
export  function finishWithDraw (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/finishWithDraw-statistics',
        'method': 'GET',
        'params': params
    });
}
//提现未到账金额
export  function notFinishWithDraw (context, params) {
    return context.$http({
        'url': API_URL + '/data-statistics/notFinishWithDraw-statistics',
        'method': 'GET',
        'params': params
    });
}
