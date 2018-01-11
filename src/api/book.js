/*
    文书管理 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //文书合同 列表
    bookList: function (context, params) {
        return context.$http({
            'url': API_URL + '/document-contracts',
            'method': 'GET',
            'params': params
        });
    },
    //获取所有文书类型
    typeList: function (context, params) {
        return context.$http({
            'url': API_URL + '/contract-types',
            'method': 'GET',
            'params': params
        });
    },
    //添加文书合同
    bookAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/document-contracts',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    bookAddUrl: API_URL + '/document-contracts',
    //删除文书合同
    bookDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/document-contracts/'+id,
            'method': 'DELETE'
        });
    },
    //获取分页文书类型
    typePage: function (context, params) {
        return context.$http({
            'url': API_URL + '/contract-types/page',
            'method': 'GET',
            'params': params
        });
    },
    //添加文书类型
    typeAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/contract-types',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    typePut: function (context, params) {
        return context.$http({
            'url': API_URL + '/contract-types/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    getRowTypeItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/contract-types/' + id,
            'method': 'GET'
        });
    },
    typeDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/contract-types/'+id,
            'method': 'DELETE'
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}

