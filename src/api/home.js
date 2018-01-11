import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    //获取用户角色数量
    userRoleCount: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/count-user-and-role',
            'method': 'GET',
            'params': params
        });
    },
    //获取app下载量
    downTotal: function (context, params) {
        return context.$http({
            'url': API_URL + '/system/download-total',
            'method': 'GET',
            'params': params
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    }
}
