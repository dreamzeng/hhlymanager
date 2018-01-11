/**
 * 一些公共的配置
 *
 */

import { USER_SIGNOUT } from 'store/user';
import { SET_TIPS } from 'store/tips';

let API_URL = '';
if(process.env.apiType){
    API_URL = BASE_API;
    console.log('请求 BASE_API--1：' + API_URL);
}else{
    API_URL = process.env.BASE_API;
    console.log('请求 BASE_API--2：' + process.env.BASE_API);
}

export default {
    API_URL: API_URL,
    UPLOAD_FILE: API_URL+'/upload-image', //富文本上传地址
    UPLOAD:API_URL+'/upload',//文件上传
    //全局提示弹窗
    tips: function (context, option) {
        context.$store.dispatch(SET_TIPS, option);
        $('#globalModal').modal();
        setTimeout(function () {
            $('#globalModal').modal('hide');
        }, 10000);
    },
    webEditor: function(){
        return {
            menus:$.map(wangEditor.config.menus, function (item, key) {
                if (item === 'location' || item === 'fullscreen') {
                    return null;
                }
                return item;
            }),
            uploadImgUrl:API_URL+'/upload-image',
            uploadImgFileName:'file'
        }
    }
}
