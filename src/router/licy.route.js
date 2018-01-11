import { asyncComponent } from 'lib/utils';

//服务聚合管理-服务推荐
const service_app = asyncComponent('serviceAggreg/service_app');
const service_weChat = asyncComponent('serviceAggreg/service_weChat');
const service_recommend = asyncComponent('serviceAggreg/service_recommend');
const service_startBusiness = asyncComponent('serviceAggreg/service_startBusiness');
const service_legal = asyncComponent('serviceAggreg/service_legal');
const service_contract = asyncComponent('serviceAggreg/service_contract');
const service_intellectual = asyncComponent('serviceAggreg/service_intellectual');
const service_personal = asyncComponent('serviceAggreg/service_personal');

export let r = [
    {   //服务聚合管理-weChat
        path:'service_weChat',
        name:'service_weChat',
        component:service_weChat,
        redirect: 'service_weChat/service_startBusiness',
        children: [
            //创业专场
            {
                path:'service_startBusiness',
                name:'service_startBusiness',
                component:service_startBusiness
            },
            //法律服务
            {
                path:'service_legal',
                name:'service_legal',
                component:service_legal
            },
            //合同定制
            {
                path:'service_contract',
                name:'service_contract',
                component:service_contract
            },
            //知识产权
            {
                path:'service_intellectual',
                name:'service_intellectual',
                component:service_intellectual
            },
            //个人业务
            {
                path:'service_personal',
                name:'service_personal',
                component:service_personal
            }
        ]
    },
    {   //服务聚合管理-app
        path:'service_app',
        name:'service_app',
        component:service_app,
        redirect: 'service_app/service_startBusiness',
        children: [
            //创业专场
            {
                path:'service_startBusiness',
                name:'service_startBusiness2',
                component:service_startBusiness
            },
            //法律服务
            {
                path:'service_legal',
                name:'service_legal2',
                component:service_legal
            },
            //合同定制
            {
                path:'service_contract',
                name:'service_contract2',
                component:service_contract
            },
            //知识产权
            {
                path:'service_intellectual',
                name:'service_intellectual2',
                component:service_intellectual
            },
            //个人业务
            {
                path:'service_personal',
                name:'service_personal2',
                component:service_personal
            }
        ]
    }
]