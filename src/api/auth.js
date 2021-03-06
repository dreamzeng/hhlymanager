import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

export default {
    API_URL:API_URL,
    login: function (context, params) {
        return context.$http({
            'url': API_URL + '/login',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    signOut: function (context, params) {
        return context.$http({
            'url': API_URL + '/logout',
            'method': 'GET',
            'params': params
        });
    },
    tips: function(context,option){
        INDEX.tips(context,option);
    }
}

