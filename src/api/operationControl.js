/*
    业务管理 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    upload:INDEX.UPLOAD,
    //业务类型
    categoryList: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/category-list',
            'method': 'GET',
            'params': params
        });
    },
    categoryAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/save-category',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    categoryPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/update-category/'+params.id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    //等级业务分类列表
    gradeCategory: function (context, id) {
        return context.$http({
            'url': API_URL + '/goods/grade-category/'+id,
            'method': 'GET'
        });
    },
    categoryDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/goods/delete-category/' + id,
            'method': 'DELETE'
        });
    },

    //业务列表
    goodsList: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/goods-list',
            'method': 'GET',
            'params': params
        });
    },
    // goodsAdd: function (context, params) {
    //     return context.$http({
    //         'url': API_URL + '/goods/save-goods',
    //         'method': 'POST',
    //         'body': params,
    //         'emulateJSON':true
    //     });
    // },
    goodsAdd: function (context, params) {
        return context.$http({
            'url': API_URL + '/legal/manager',
            'method': 'post',
            'body': params,
            // 'emulateJSON':true
        });
    },
    goodsPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/update-goods/'+params.id,
            'method': 'put',
            'body': params,
            'emulateJSON':true
        });
    },
    // getRowGoodsItem: function (context, id) {
    //     return context.$http({
    //         'url': API_URL + '/goods/goods-detail/'+id,
    //         'method': 'GET'
    //     });
    // },
    getRowGoodsItem: function (context, id) {
        return context.$http({
            'url': API_URL + '/legal/manager/'+id,
            'method': 'GET'
        });
    },
    goodsDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/goods/delete-goods/' + id,
            'method': 'DELETE'
        });
    },
    //订单管理
    orderList: function (context, params) {
        return context.$http({
            'url': API_URL + '/order/list',
            'method': 'GET',
            'params': params
        });
    },

    //律师服务管理
    lawyerList: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/lawyer-goods-list',
            'method': 'GET',
            'params': params
        });
    },
    lawyerPut: function (context, params) {
        return context.$http({
            'url': API_URL + '/goods/examine-goods',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },

    getWebEditorCfg:function(){
        return INDEX.webEditor();
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    },

    //2017年9月19日11点，ywl改版，业务列表编辑或者新增页面：选择分类下拉框
    optionList: function (context) {
        return context.$http({
            'url': API_URL + '/goods/goods-categories',
            'method': 'GET',
            // 'params': params
        });
    },
    //组合多选下拉框---服务规格-后台-获取服务可用的规格分页列表,编辑页面获取,id随意，新增页面也要有，就传-1
    multiSelection: function (context,id) {
        return context.$http({
            'url': API_URL + '/service-spec/usable-specs/'+id,
            'method': 'GET',
            // 'params': params
        });
    },
    //编辑页面已经选中的结果展示在这里,而且包含本页面所有信息，输入框价格等，共用接口
    multiEditSelection: function (context,id) {
        return context.$http({
            'url': API_URL + '/service-spec/service-specs/'+id,
            'method': 'GET',
            // 'params': params
        });
    },

    //多选之后的点击组合接口，新增和编辑是不是同一个接口，返回信息是不一样的。
    combination: function (context,params) {
        return context.$http({
            'url': API_URL + '/service-spec/service-binding-specs',
            'method': 'post',
            'body': params
        });
    },
    //规格属性-新增保存接口和编辑保存共用     服务规格---更新(启用)服务的规格组合
    saveNewEditSpec: function (context,params) {
        return context.$http({
            'url': API_URL + '/service-spec/biz-combinations',
            'method': 'put',
            'body':params
        });
    },

    //查询所有服务列表
    serviceyList: function (context,params) {
        return context.$http({
            'url': API_URL + '/service-spec/biz-combinations',
            'method': 'get',
            'params':params
        });
    },
    //弹窗编辑器提交按钮
    popSubmit: function (context,params) {
        return context.$http({
            'url': API_URL + '/service-spec/update-spec-comb-info',
            'method': 'put',
            'body':params,
            // "headers": {"Content-Type": "application/json"},
        });
    },
    //快捷入口
    shortcutList: function (context, params) {
        return context.$http({
            'url': API_URL + '/user/get-shortCut-entrances',
            'method': 'GET',
            'params': params
        });
    },
    //快捷入口列表移除
    hideDel: function (context, params) {
        return context.$http({
            'url': API_URL + '/user/del-shortCut-entrance',
            'method': 'GET',
            'params': params
        });
    },
    //跳转入口
    entry: function (context,params) {
        return context.$http({
            'url': API_URL + '/goods/simple-goods-list',
            'method': 'GET',
            'params': params
        });
    },
    //新增快捷入口和编辑共用保存接口
    addEditEntry: function (context,params) {
        return context.$http({
            'url': API_URL + '/user/add-shortCut-entrance',
            'method': 'post',
            'body': params,
            'emulateJSON':true

        });
    },
    //新增快捷入口保存
    // editEntry: function (context) {
    //     return context.$http({
    //         'url': API_URL + '/user/add-shortCut-entrance',
    //         'method': 'post',
    //         'body': params
    //     });
    // },
};

export const bizroleApi = {
    list: function (context, params) {
        return context.$http({
            'url': API_URL + '/bizrole/list',
            'method': 'GET',
            'params': params
        });
    },
    goodsList: function (context, params) {
        return context.$http({
            'url': API_URL + '/bizrole/goods',
            'method': 'GET',
            'params': params
        });
    },
    add: function (context, params) {
        return context.$http({
            'url': API_URL + '/bizrole/new',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    getItem: function (context, params) {
        return context.$http({
            'url': API_URL + '/bizrole/info',
            'method': 'GET',
            'params': params
        });
    },
    modify: function (context, params) {
        return context.$http({
            'url': API_URL + '/bizrole/update',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    del: function (context, params) {
        return context.$http({
            'url': API_URL + '/bizrole/operate',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
}
