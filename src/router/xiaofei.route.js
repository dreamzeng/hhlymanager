import { asyncComponent } from 'lib/utils';

//订单管理
const statistics_users_operation_charts_act = asyncComponent('statistics/users_operation_charts_act');

//数据统计
const order_haveBacking = asyncComponent('order/order_haveBacking');
const statistics_users_operation_charts_keep =  asyncComponent('statistics/users_operation_charts_keep');
const statistics_orderNotPay_charts = asyncComponent('statistics/orderNotPay_charts');
const statistics_finishWithDraw_charts = asyncComponent('statistics/finishWithDraw_charts');
//路径分析 点击事件
const statistics_path_analyse_charts = asyncComponent('statistics/path_analyse_charts');
//页面事件
const statistics_path_page = asyncComponent('statistics/path_page');
//行为事件
const statistics_path_behavior = asyncComponent('statistics/path_behavior');

//财务管理
const finance_deal_list =  asyncComponent('finance/deal_list');
const finance_withdraw_list =  asyncComponent('finance/withdraw_list');
const bank_manager_list =  asyncComponent('finance/bank_manager_list');
const finance_order_list =  asyncComponent('finance/order_list');

//用户信息设置
const system_setting =  asyncComponent('system/setting');

//广告中心
const advert_centre_list =  asyncComponent('advertCentre/list');
const advert_centre_edit =  asyncComponent('advertCentre/edit');
const advert_centre_showInfo =  asyncComponent('advertCentre/showInfo');

//资讯管理
const info_information_type = asyncComponent('info/information_type');
const info_article_list = asyncComponent('info/article_list');
const info_article_edit = asyncComponent('info/article_edit');

//评论
const info_comment_list = asyncComponent('info/comment_list');

//知识产权代理人
const third_knowledge_list = asyncComponent('third/knowledge_list');
const third_authAgent_list = asyncComponent('third/authAgent_list');
const third_lawyerUser_list = asyncComponent('third/lawyerUser_list');


//渠道统计
const statistics_canal = asyncComponent('statistics/canal');

//文章统计
const statistics_articleList = asyncComponent('statistics/article_list');

//业务角色
const operationControl_bizroleList = asyncComponent('operationControl/bizrole_list');
const operationControl_bizroleEdit = asyncComponent('operationControl/bizrole_edit');

export let r = [
    { //订单管理
        path: 'order/haveBacking',
        name: 'order_haveBacking',
        component: order_haveBacking
    },
    { //数据统计 用户运营
        path: 'statistics/users/operation/charts_new',
        name: 'statistics_users_operation_charts_new',
        component: statistics_users_operation_charts_act
    },{
        path: 'statistics/users/operation/charts_keep',
        name: 'statistics_users_operation_charts_keep',
        component: statistics_users_operation_charts_keep
    },{
        path: 'statistics/orderNotPay_charts',
        name: 'statistics_orderNotPay_charts',
        component: statistics_orderNotPay_charts
    },{
        path:'statistics/finishWithDraw_charts',
        name:'statistics_finishWithDraw_charts',
        component:statistics_finishWithDraw_charts
    },{
        path:'statistics/path/analyse/charts',
        name:'statistics_path_analyse_charts',
        component:statistics_path_analyse_charts
    },{
        path:'statistics/path/page',
        name:'statistics_path_page',
        component:statistics_path_page
    },{
        path:'statistics/path/behavior',
        name:'statistics_path_behavior',
        component:statistics_path_behavior
    },
    //财务管理
    {
        path: 'finance/deal/list',
        name: 'finance_deal_list',
        component: finance_deal_list
    },{
        path: 'finance/withdraw/list',
        name: 'finance_withdraw_list',
        component: finance_withdraw_list
    },{
        path: 'finance/bank/manager/list',
        name: 'finance_bank_manager_list',
        component: bank_manager_list
    },{
        path:'finance/order/list',
        name:'finance_order_list',
        component:finance_order_list
    },
    {
        path:'system/setting',
        name:'system_setting',
        component:system_setting
    },
    { //广告中心
        path:'advert/centre/list',
        name:'advert_centre_list',
        component:advert_centre_list
    },{
        path:'advert/centre/add',
        name:'advert_centre_add',
        component:advert_centre_edit
    },{
        path:'advert/centre/modify/:id',
        name:'advert_centre_modify',
        component:advert_centre_edit,
        meta: { isEdit: true }
    },{
        path:'advert/centre/showInfo/:id',
        name:'advert_centre_showInfo',
        component:advert_centre_showInfo
    },
    //资讯管理
    {
        path:'info/information/type',
        name:'info_information_type',
        component:info_information_type
    },{
        path:'info/article/list',
        name:'info_article_list',
        component:info_article_list
    },{
        path:'info/article/add',
        name:'info_article_add',
        component:info_article_edit
    },{
        path:'info/article/modify/:id',
        name:'info_article_modify',
        component:info_article_edit,
        meta: { isEdit: true }
    },{
        path:'info/seeker/modify/:id',
        name:'info_seeker_modify',
        component:info_article_edit,
        meta: { isEdit: true,type:'seeker' }
    },{ //评论
        path:'info/comment/list',
        name:'info_comment_list',
        component:info_comment_list
    },

    
    //知识产权代理人
    {
        path:'third/knowledge/list',
        name:'third_knowledge_list',
        component:third_knowledge_list
    },
    //认证管理
    {
        path:'third/authAgent/list',
        name:'third_authAgent_list',
        component:third_authAgent_list
    },
    //律师用户
    {
        path:'third/lawyerUser/list',
        name:'third_lawyerUser_list',
        component:third_knowledge_list,
        meta:{userType:'1',titleName:'律师'}
    },
    //渠道统计
    {
        path:'statistics/canal',
        name:'statistics_canal',
        component:statistics_canal
    },
    //资讯统计
    {
        path:'statistics/article/list',
        name:'statistics_articleList',
        component:statistics_articleList
    },
    //业务管理
    {
        path:'operationControl/bizrole/list',
        name:'operationControl_bizroleList',
        component:operationControl_bizroleList
    },{
        path:'operationControl/bizrole/add',
        name:'operationControl_bizroleAdd',
        component:operationControl_bizroleEdit,
        meta:{title:'新增业务角色'}
    },{
        path:'operationControl/bizrole/modify/:id',
        name:'operationControl_bizroleModify',
        component:operationControl_bizroleEdit,
        meta:{title:'修改业务角色',isEdit: true}
    },
];
