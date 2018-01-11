import Vue from 'vue'
import Router from 'vue-router'

//欢迎模块
const NotFound = r => require.ensure([], () => r(require('components/common/NotFound')), 'NotFound')
const Login = r => require.ensure([], () => r(require('components/common/login')), 'Login')
const Home = r => require.ensure([], () => r(require('@/Home')), 'Home')



Vue.use(Router);

let router = new Router({
    //mode: 'history',
    //打包后静态资源的引用 发布到测试环境 '/static/manager/' 生产环境 '/manager/'
    //base: '/static/manager/',
    //base: '/manager/',
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/home', //应用目录
            name: 'home',
            component: Home,
            children: registerRouter(require.context('./', false, /\.route.js$/))
        },

        { // 其他页面，强制跳转到 404 页面
            path: '*', component: NotFound
        }
    ]
});

export{
    router
}

function registerRouter(requireContext) {
    let rMap = [];
    requireContext.keys().forEach(comp => {
        let vueComp = requireContext(comp);
        let rList = vueComp.r || [];
        for(let i =0,l=rList.length;i<l;i++){
            rMap.push(rList[i]);
        }
    });
    return rMap;
}
