import { asyncComponent } from 'lib/utils';

//评价管理
const appraise_list = asyncComponent('appraise/appraise_list');
const label_list = asyncComponent('appraise/label_list');
const app_home = asyncComponent('appraise/app_home');
const wecat_home = asyncComponent('appraise/wecat_home');
const en_certification = asyncComponent('certification/en_certification');
const person_certification = asyncComponent('certification/person_certification');
const staff_member = asyncComponent('certification/staff_member');
const show_certification = asyncComponent('certification/show_certification');

export let r = [
	{//APP首页管理
        path: 'app_home',
        name: 'app_home',
        component: app_home,
        meta:{type:1,titleName:"APP首页管理"}
    },
    {//微信公众号首页
        path: 'wecat_home',
        name: 'wecat_home',
        component: app_home,
        meta:{type:2,titleName:"微信公众号首页"}
    },
    {//评价管理
        path: 'appraise_list',
        name: 'appraise_list',
        component: appraise_list
    },
    {//标签管理
        path: 'label_list',
        name: 'label_list',
        component: label_list
    },
    {//企业认证
        path: 'en_certification',
        name: 'en_certification',
        component: en_certification
    },
    {//个人认证
        path: 'person_certification',
        name: 'person_certification',
        component: person_certification
    },
    {//企业认证--员工列表
        path: 'staff_member',
        name: 'staff_member',
        component: staff_member
    },
    {//企业认证--员工列表--添加修改查看员工信息
        path: 'show_certification',
        name: 'show_certification',
        component: show_certification
    }
];
