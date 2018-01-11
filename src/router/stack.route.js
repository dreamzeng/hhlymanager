//欢迎模块
const Index = r => require.ensure([], () => r(require('components/index')), 'Index')
const authority = r => require.ensure([], () => r(require('components/common/authority')), 'authority')
const Login = r => require.ensure([], () => r(require('components/common/login')), 'Login')
const Home = r => require.ensure([], () => r(require('@/Home')), 'Home')

//系统设置
const user_manager_list = resolve => require(['components/system/user_manager_list'], resolve)
const user_manager_edit = resolve => require(['components/system/user_manager_edit'], resolve)
const role_list = resolve => require(['components/system/role_list'], resolve)
const role_user_list = resolve => require(['components/system/role_user_list'], resolve)
const role_edit = resolve => require(['components/system/role_edit'], resolve)
const resource_list = resolve => require(['components/system/resource_list'], resolve)
const city_list = resolve => require(['components/system/city_list'], resolve)
const city_set_hot = resolve => require(['components/system/city_set_hot'], resolve)
const system_list = resolve => require(['components/system/config_list'], resolve)
const system_edit = resolve => require(['components/system/config_edit'], resolve)

//第三方管理
const user_list = resolve => require(['components/third/user_list'], resolve)
const lawyer_list = resolve => require(['components/third/lawyer_list'], resolve)
const allUser_list = resolve => require(['components/third/allUser_list'], resolve)

const auth_list = resolve => require(['components/third/auth_list'], resolve)
const feedback_list = resolve => require(['components/third/feedback_list'], resolve)
const inviteCode_list = resolve => require(['components/third/inviteCode_list'], resolve)
const hotLawyer_list = resolve => require(['components/third/hotLawyer_list'], resolve)
const lawyerUnallocated_list = resolve => require(['components/third/lawyerUnallocated_list'], resolve)
const vipLawyer_list = resolve => require(['components/third/vipLawyer_list'], resolve)

//订单管理
const order_list = resolve => require(['components/order/order_list'], resolve)
const order_edit = resolve => require(['components/order/order_edit'], resolve)

const order_noPay = resolve => require(['components/order/noPay'], resolve)
const order_havePay = resolve => require(['components/order/havePay'], resolve)
const order_haveComplete = resolve => require(['components/order/haveComplete'], resolve)
const order_haveClose = resolve => require(['components/order/haveClose'], resolve)
const order_haveBack = resolve => require(['components/order/haveBack'], resolve)

//财务管理
const finance_user_list = resolve => require(['components/finance/user_list'], resolve)
const finance_lawyer_list = resolve => require(['components/finance/lawyer_list'], resolve)
const finance_bank_list = resolve => require(['components/finance/bank_list'], resolve)
const finance_with_list = resolve => require(['components/finance/with_list'], resolve)

//资讯管理
const case_list = resolve => require(['components/info/case_list'], resolve)
const case_edit = resolve => require(['components/info/case_edit'], resolve)
const info_index = resolve => require(['components/info/index_list'], resolve)
const info_index_edit = resolve => require(['components/info/index_edit'], resolve)

//律师咨询
const advice_list = resolve => require(['components/advice/advice_list'], resolve)
const pack_list = resolve => require(['components/advice/pack_list'], resolve)
const pack_edit = resolve => require(['components/advice/pack_edit'], resolve)

//系统版本
const version_list = resolve => require(['components/version/version_list'], resolve)
const version_edit = resolve => require(['components/version/version_edit'], resolve)

//文章管理
const article_list = resolve => require(['components/article/article_list'], resolve)
const explore_list = resolve => require(['components/article/explore_list'], resolve)
const explore_edit = resolve => require(['components/article/explore_edit'], resolve)
const top_list = resolve => require(['components/article/top_list'], resolve)
const released_list = resolve => require(['components/article/released_list'], resolve)

//圈子
const new_list = resolve => require(['components/new/new_list'], resolve)
const new_edit = resolve => require(['components/new/new_edit'], resolve)
const new_top_list = resolve => require(['components/new/new_top_list'], resolve)
const not_top_list = resolve => require(['components/new/not_top_list'], resolve)
const new_user_index_list = resolve => require(['components/new/new_user_index_list'], resolve)
const index_module_edit = resolve => require(['components/new/index_module_edit'], resolve)

//活动统计
const lottery_charts = resolve => require(['components/lottery/lottery_charts'], resolve)
const lottery_edit = resolve => require(['components/lottery/lottery_edit'], resolve)

//文书管理
const book_list = resolve => require(['components/book/book_list'], resolve)
const book_edit = resolve => require(['components/book/book_edit'], resolve)
const book_types_list = resolve => require(['components/book/types_list'], resolve)
const book_types_edit = resolve => require(['components/book/types_edit'], resolve)

//直播活动
const live_list = resolve => require(['components/live/live_list'], resolve)
const live_details_info = resolve => require(['components/live/live_details_info'], resolve)
const live_edit = resolve => require(['components/live/live_edit'], resolve)
const live_audit_user_list = resolve => require(['components/live/live_audit_user_list'], resolve)
const live_action_list = resolve => require(['components/live/live_action_list'], resolve)

//数据统计
const statistics_users = resolve => require(['components/statistics/statistics_users'], resolve)
const statistics_articles = resolve => require(['components/statistics/statistics_articles'], resolve)
const statistics_case_bids = resolve => require(['components/statistics/statistics_case_bids'], resolve)
const statistics_cases = resolve => require(['components/statistics/statistics_cases'], resolve)
const statistics_appointment_advices = resolve => require(['components/statistics/statistics_appointment_advices'], resolve)
const statistics_news = resolve => require(['components/statistics/news'], resolve)
const statistics_issue_demand = resolve => require(['components/statistics/issue_demand'], resolve)

const statistics_users_charts = resolve => require(['components/statistics/users_charts'], resolve)
const statistics_money_charts = resolve => require(['components/statistics/money_charts'], resolve)
const statistics_users_operation_charts = resolve => require(['components/statistics/users_operation_charts'], resolve)

//案件模块管理
const case_type = resolve => require(['components/case/type_list'], resolve)
const case_task = resolve => require(['components/case/task_list'], resolve)
const case_task_manager = resolve => require(['components/case/task_manager_list'], resolve)

//业务管理
const operation_control_type = resolve => require(['components/operationControl/type_list'], resolve)
const operation_goods_list = resolve => require(['components/operationControl/goods_list'], resolve)
const operation_goods_edit = resolve => require(['components/operationControl/goods_edit'], resolve)
const operation_lawyer_list = resolve => require(['components/operationControl/lawyer_list'], resolve)
const operation_consult_list = resolve => require(['components/operationControl/consult_list'], resolve)

//竟标管理
const competition_list = resolve => require(['components/competition/list'], resolve)
const competition_info = resolve => require(['components/competition/info'], resolve)


export let r = [
    {
        path: '',
        redirect: 'index'
    },
    {
        path: 'index',
        name: 'index',
        component: Index
    },
    //系统设置
    { //用户管理
        path: 'user_manager_list',
        name: 'user_manager_list',
        component: user_manager_list
    }, {
        path: 'user_manager_edit',
        name: 'user_manager_edit',
        component: user_manager_edit
    }, { //角色管理
        path: 'role_list',
        name: 'role_list',
        component: role_list
    }, {
        path: 'role_user_list',
        name: 'role_user_list',
        component: role_user_list
    }, {
        path: 'role_edit',
        name: 'role_edit',
        component: role_edit
    }, { //资源管理
        path: 'resource_list',
        name: 'resource_list',
        component: resource_list
    }, { //热门城市
        path: 'city_list',
        name: 'city_list',
        component: city_list
    }, {
        path: 'city_set_hot',
        name: 'city_set_hot',
        component: city_set_hot
    }, { //系统参数
        path: 'system_list',
        name: 'system_list',
        component: system_list
    }, {
        path: 'system_edit',
        name: 'system_edit',
        component: system_edit
    },
    //第三方面管理
    {
        path:'allUser_list',
        name:'allUser_list',
        component:allUser_list
    },
    { //用户列表
        path: 'user_list',
        name: 'user_list',
        component: user_list
    }, { //律师列表
        path: 'lawyer_list',
        name: 'lawyer_list',
        component: lawyer_list
    }, { //律师认证
        path: 'auth_list',
        name: 'auth_list',
        component: auth_list
    }, {//意见反馈
        path: 'feedback_list',
        name: 'feedback_list',
        component: feedback_list
    }, {//邀请码
        path: 'inviteCode_list',
        name: 'inviteCode_list',
        component: inviteCode_list
    }, {//热门律师
        path: 'hotLawyer_list',
        name: 'hotLawyer_list',
        component: hotLawyer_list
    }, {//得到认证通过但未分配的律师信息
        path: 'lawyerUnallocated_list/:type',
        name: 'lawyerUnallocated_list',
        component: lawyerUnallocated_list
    }, {//vip律师
        path: 'vipLawyer_list',
        name: 'vipLawyer_list',
        component: vipLawyer_list
    },
    //订单管理
    {
        //订单列表
        path: 'order_list',
        name: 'order_list',
        component: order_list
    },{
        path:'order_edit/:orderNo',
        name:'order_edit',
        component:order_edit
    },{
        path: 'order_noPay',
        name: 'order_noPay',
        component: order_noPay
    },{
        path: 'order_havePay',
        name: 'order_havePay',
        component: order_havePay
    },{
        path: 'order_haveComplete',
        name: 'order_haveComplete',
        component: order_haveComplete
    },{
        path: 'order_haveClose',
        name: 'order_haveClose',
        component: order_haveClose
    },{
        path: 'order_haveBack',
        name: 'order_haveBack',
        component: order_haveBack
    },
    //财务管理
    {//用户对账
        path: 'finance_user_list',
        name: 'finance_user_list',
        component: finance_user_list
    },
    {//律师对账
        path: 'finance_lawyer_list',
        name: 'finance_lawyer_list',
        component: finance_lawyer_list
    },
    {//银行卡列表
        path: 'finance_bank_list',
        name: 'finance_bank_list',
        component: finance_bank_list
    },
    {//提现列表
        path: 'finance_with_list',
        name: 'finance_with_list',
        component: finance_with_list
    },
    //资讯管理
    {//法律咨询
        path: 'case_list',
        name: 'case_list',
        component: case_list
    }, {
        path: 'case_edit',
        name: 'case_edit',
        component: case_edit
    },
    {//首页轮播
        path: 'info_index',
        name: 'info_index',
        component: info_index
    }, {
        path: 'info_index_edit',
        name: 'info_index_edit',
        component: info_index_edit
    },
    //律师咨询
    {//用户咨询
        path: 'advice_list',
        name: 'advice_list',
        component: advice_list
    }, {//咨询套餐
        path: 'pack_list',
        name: 'pack_list',
        component: pack_list
    }, {
        path: 'pack_edit',
        name: 'pack_edit',
        component: pack_edit
    },
    //系统版本
    {
        path: 'version_list',
        name: 'version_list',
        component: version_list
    }, {
        path: 'version_edit',
        name: 'version_edit',
        component: version_edit
    },
    //文章管理
    {//阅读文章
        path: 'article_list',
        name: 'article_list',
        component: article_list
    }, {//探索文章
        path: 'explore_list',
        name: 'explore_list',
        component: explore_list
    },{
        path:'explore_edit',
        name:'explore_edit',
        component:explore_edit
    }, {//热门文章
        path: 'top_list',
        name: 'top_list',
        component: top_list
    },{//设置热门文章列表
        path:'released_list',
        name:'released_list',
        component:released_list
    },
    //圈子
    {//首页轮播
        path: 'new_list',
        name: 'new_list',
        component: new_list
    },{
        path:'new_edit',
        name:'new_edit',
        component:new_edit
    },{//热门帖子
        path:'new_top_list',
        name:'new_top_list',
        component:new_top_list
    },{
        path:'not_top_list',
        name:'not_top_list',
        component:not_top_list
    },{ //首页块模
        path:'new_user_index_list',
        name:'new_user_index_list',
        component:new_user_index_list
    },{
        path:'index_module_edit',
        name:'index_module_edit',
        component:index_module_edit
    },
    { //活动抽奖
        path:'lottery_charts',
        name:'lottery_charts',
        component:lottery_charts
    },{
        path:'lottery_edit',
        name:'lottery_edit',
        component:lottery_edit
    },
    {//文书管理
        path:'book_list',
        name:'book_list',
        component:book_list
    },{
        path:'book_edit',
        name:'book_edit',
        component:book_edit
    },{
        path:'book_types_list',
        name:'book_types_list',
        component:book_types_list
    },{
        path:'book_types_edit',
        name:'book_types_edit',
        component:book_types_edit
    },
    {//直播活动
        path:'live_list',
        name:'live_list',
        component:live_list
    },{
        path:'live_details_info/:id',
        name:'live_details_info',
        component:live_details_info
    },{
        path:'live_edit/:type/:id',
        name:'live_edit',
        component:live_edit
    },{
        path:'live_audit_user_list/:id/:title',
        name:'live_audit_user_list',
        component:live_audit_user_list
    },{
        path:'live_action_list/:id/:title',
        name:'live_action_list',
        component:live_action_list
    },{
        path:'statistics_users',
        name:'statistics_users',
        component:statistics_users
    },{
        path:'statistics_articles',
        name:'statistics_articles',
        component:statistics_articles
    },{
        path:'statistics_case_bids',
        name:'statistics_case_bids',
        component:statistics_case_bids
    },{
        path:'statistics_cases',
        name:'statistics_cases',
        component:statistics_cases
    },{
        path:'statistics_appointment_advices',
        name:'statistics_appointment_advices',
        component:statistics_appointment_advices
    },{
        path:'statistics_news',
        name:'statistics_news',
        component:statistics_news
    },{
        path:'statistics_issue_demand',
        name:'statistics_issue_demand',
        component:statistics_issue_demand
    },{
        path:'statistics_users_charts',
        name:'statistics_users_charts',
        component:statistics_users_charts
    },{
        path:'statistics_money_charts',
        name:'statistics_money_charts',
        component:statistics_money_charts
    },{
        path:'statistics_users_operation_charts',
        name:'statistics_users_operation_charts',
        component:statistics_users_operation_charts
    },
    //案件模块管理
    {
        path:'case_type',
        name:'case_type',
        component:case_type
    },{
        path:'case_task',
        name:'case_task',
        component:case_task
    },{
        path:'case_task_manager',
        name:'case_task_manager',
        component:case_task_manager
    },
    //业务管理
    {
        path:'operation_control_type',
        name:'operation_control_type',
        component:operation_control_type
    },{
        path:'operation_goods_list',
        name:'operation_goods_list',
        component:operation_goods_list
    },{
        path:'operation_goods_edit/:type/:id',
        name:'operation_goods_edit',
        component:operation_goods_edit
    },{
        path:'operation_lawyer_list',
        name:'operation_lawyer_list',
        component:operation_lawyer_list
    },{
        path:'operation_consult_list',
        name:'operation_consult_list',
        component:operation_consult_list
    },{
        path:'competition_list',
        name:'competition_list',
        component:competition_list
    },{
        path:'competition_info/:id',
        name:'competition_info',
        component:competition_info
    },
    {
        path: 'authority',
        name: 'authority',
        component: authority
    }
]
