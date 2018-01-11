import 'static/css/bootstrap.min.css';
import 'element-ui/lib/theme-default/index.css';
import 'static/css/bootstrap-reset.css';
import 'static/assets/font-awesome/css/font-awesome.css';
import 'static/css/style.css';
import 'static/css/style-responsive.css';
import 'static/css/jquery.mloading.css';
import 'static/jstree/themes/default/style.min.css';
import 'static/css/bootstrap-datetimepicker.min.css';
import 'wangEditor/css/wangEditor.min.css';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
require('bootstrap');
require('mloading'); // 加载图
//日期插件
require('bootstrap_datetimepicker');
require('bootstrap_datetimepicker_language');
//jstree
require('jstree');
//wangEditor
require('wangEditor/js/wangEditor.min');
wangEditor.config.printLog = false;

import Vue from 'vue';
import VueResource from 'vue-resource';
import {router} from './router/index';
import store from './store/index';

import ElementUI from 'element-ui';
import { Message,MessageBox } from 'element-ui';
Vue.use(ElementUI);

import VueQRCodeComponent from 'vue-qrcode-component';
Vue.component('qr-code', VueQRCodeComponent);

Vue.use(VueResource);
Vue.config.productionTip = false;

//import './mock/index.js';  // mockjs 模拟 , 发到正式环境时请关闭

//登录态处理
router.beforeEach(({meta, path,fullPath}, from, next) => {
    NProgress.start(); // 开启Progress
    var { auth = true } = meta;
    var isLogin = Boolean(store.state.user.username); //true用户已登录， false用户未登录
    if (auth && !isLogin && path !== '/login') {
        return next({name: 'login'});
    }
    if (isLogin && (path === '/login' || path === '/')) {
        return next({name: 'index'});
    }
    next();
});
router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
/**
 * 请求 拦截器处理
 *
 */
Vue.http.interceptors.push((request, next) => {
    request.credentials = true; //跨域
    request.headers.set('X-Requested-With', 'XMLHttpRequest');
    next((response) => {
        console.log(response);
        $("body").mLoading("hide");
        $('#list-content').mLoading("hide");
        let body = response.body;
        if (body && body.code == 10) {//登录态过期，需要登录
            MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('USER_SIGNOUT');
                router.go();
            }).catch(() => {

            });
            return;
        }
        if (body && body.code == 401) {//权限不足
            Message({
                message: '权限不足',
                type: 'error',
                duration: 3 * 1000
            });
            return;
        }
        return response;
    });
});
new Vue({
    router,
    store
}).$mount('#app');
