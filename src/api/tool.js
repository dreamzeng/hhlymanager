/*
 * 工具管理 接口调用
 */
import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

//资讯分类列表
export default {
    //新建单位
    contactlist_save: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/save/organ',
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
    //单位列表
    contactList_list: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/list/organ?withSubs=true&withPersons=true',
            'method': 'GET',
            'params': params
        });
    },
    //单位信息
    contactList_info: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/info/organ',
            'method': 'GET',
            'params': params
        });
    },
    //更新单位信息
    contactList_update: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/update/organ',
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
    //更新单位状态
    contactList_operate: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/operate/organ',
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
    //获取单位的类型
    contactList_category: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/list/category',
            'method': 'GET',
            'params': params
        });
    },
    //获取单位的下属单位数量
    contactList_subs: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/count/organ/subs',
            'method': 'GET',
            'params': params
        });
    },
    //获取单位的联系人数量
    contactList_persons: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/count/organ/persons',
            'method': 'GET',
            'params': params
        });
    },
    //获取单位的下级单位列表
    contactList_subs_organ: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/list/organ/subs',
            'method': 'GET',
            'params': params
        });
    },
    //获取单位的所属联系人列表
    contactList_persons_organ: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/list/organ/persons',
            'method': 'GET',
            'params': params
        });
    },
    //新建联系人
    contactList_save_persons: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/save/person',
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
    //更新联系人
    contactList_update_persons: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/update/person',
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
    //获取联系人列表
    contactList_personList: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/list/person',
            'method': 'GET',
            'params': params
        });
    },
    //获取联系人信息
    contactList_personInfo: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/info/person',
            'method': 'GET',
            'params': params
        });
    },
    //更新联系人状态
    contactList_personOperate: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/operate/person',
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
    //新建纠错记录
    contactList_correctiveSave: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/save/corrective',
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
    //获取纠错记录列表
    contactList_correctiveList: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/list/corrective',
            'method': 'GET',
            'params': params
        });
    },
    //更新纠错记录状态 & 纠错记录操作
    contactList_correctiveOperate: function (context, params) {
        return context.$http({
            'url': API_URL + '/contactlist/operate/corrective',
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
}
