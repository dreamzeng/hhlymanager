//营销中心
import { asyncComponent } from 'lib/utils';
const marketing_coupon = resolve => require(['components/marketing/coupon'], resolve)
const marketing_coupon_info = resolve => require(['components/marketing/coupon_info'], resolve)
const marketing_coupon_edit = resolve => require(['components/marketing/coupon_edit'], resolve)
const marketing_coupon_list = resolve => require(['components/marketing/coupon_list'], resolve)
const marketing_coupon_add = resolve => require(['components/marketing/coupon_add'], resolve)
//问答管理
const asking_list = resolve => require(['components/asking/asking_list'], resolve)
const asking_man_list = resolve => require(['components/userPlatform/asking_man_list'], resolve)
const asking_list_hot = resolve => require(['components/asking/asking_list_hot'], resolve)
const asking_info = resolve => require(['components/userPlatform/asking_info'], resolve)
const type_list = resolve => require(['components/asking/type_list'], resolve)
const add_edit_type = resolve => require(['components/asking/add_edit_type'], resolve)
const faq_list = resolve => require(['components/asking/faq_list'], resolve)
const add_edit_faq = resolve => require(['components/asking/add_edit_faq'], resolve)

// 第三方管理新加查看页面
// const asking_feedback_list = resolve => require(['components/asking/asking_feedback_list'], resolve)
const feedback_info = resolve => require(['components/asking/feedback_info'], resolve)
//规格属性列表
const req_type_list = resolve => require(['components/operationControl/requirement_type_list'], resolve)
const add_edit_requirement = resolve => require(['components/operationControl/add_edit_requirement'], resolve)
const servicey_list = resolve => require(['components/operationControl/servicey_list'], resolve)
//业务管理，添加业务详情的第二个页面或者叫第二部，规格属性
// const goods_edit2 = resolve => require(['components/operationControl/goods_edit2'], resolve)
const operation_shortcut = resolve => require(['components/operationControl/shortcut'], resolve)

// 律所管理
const law_firm_manage = resolve => require(['components/third/lawFirmManage'], resolve)
const law_firm_addEdit = resolve => require(['components/third/lawFirmAddEdit'], resolve)
const firm_law_manage = resolve => require(['components/third/firmLawManage'], resolve)
const firm_law_addEdit = resolve => require(['components/third/firmLawAddEdit'], resolve)
// 用户端内容管理
const article_list3 = resolve => require(['components/userPlatform/articleList3'], resolve)
const article_add_edit = resolve => require(['components/userPlatform/articleAddEdit'], resolve)
// const asking_list3 = resolve => require(['components/userPlatform/asking_list3'], resolve)
// const add_edit3 = resolve => require(['components/userPlatform/askingAddEdit3'], resolve)
// 上面两个延后到下一版本
const case_list3 = resolve => require(['components/userPlatform/caseList3'], resolve)
const case_add_edit3 = resolve => require(['components/userPlatform/caseAddEdit3'], resolve)
// const home_article = resolve => require(['components/userPlatform/homeArticle'], resolve)
const home_case = resolve => require(['components/userPlatform/homeCase'], resolve)
const home_article = resolve => require(['components/userPlatform/homeArticle'], resolve)
const home_consult = resolve => require(['components/userPlatform/homeConsult'], resolve)

//业务类型--擅长领域  同问答管理
const be_good = resolve => require(['components/operationControl/be_good'], resolve)
const be_good_edit = resolve => require(['components/operationControl/be_good_edit'], resolve)





export let r = [
	//营销中心
    {
        path:'marketing_coupon',
        name:'marketing_coupon',
        component:marketing_coupon
    },
    {
        path:'marketing_coupon_info/:id',
        name:'marketing_coupon_info',
        component:marketing_coupon_info
    },
    {
        path:'marketing_coupon_edit/:id',
        name:'marketing_coupon_edit',
        component:marketing_coupon_edit
    },
    {
        path:'marketing_coupon_add',
        name:'marketing_coupon_add',
        component:marketing_coupon_add
    },
    {
        path:'marketing_coupon_list/:id',
        name:'marketing_coupon_list',
        component:marketing_coupon_list
    }
    ,
    {
        path:'asking_list',
        name:'asking_list',
        component:asking_list
    },
    {
        path:'asking_list_hot',
        name:'asking_list_hot',
        component:asking_list_hot
    },
    {
        path:'asking_info/:id',
        name:'asking_info',
        component:asking_info
    },
    {
        path:'type_list',
        name:'type_list',
        component:type_list
    },
    {
        path:'add_edit_type/:id',
        name:'add_edit_type',
        component:add_edit_type
    },
    {
        path:'faq_list',
        name:'faq_list',
        component:faq_list
    },
    {
        path:'add_edit_faq/:id',
        name:'add_edit_faq',
        component:add_edit_faq
    },
    //不是新增，编辑原来的旧业面，在第三方管理里面

    // {
    //     path:'asking_feedback_list',
    //     name:'asking_feedback_list',
    //     component:asking_feedback_list
    // },
    {
        path:'feedback_info/:id',
        name:'feedback_info',
        component:feedback_info
    },
    {
        path:'req_type_list',
        name:'req_type_list',
        component:req_type_list
    },
    {
        path:'add_edit_requirement/:id',
        name:'add_edit_requirement',
        component:add_edit_requirement
    },
    {
        path:'servicey_list',
        name:'servicey_list',
        component:servicey_list
    },
    //业务管理--快捷入口
    {
        path:'operation_shortcut',
        name:'operation_shortcut',
        component:operation_shortcut
    },
    //律所管理
    {
        path:'law_firm_manage',
        name:'law_firm_manage',
        component:law_firm_manage
    },
    //律所管理增编页面
    {
        path:'law_firm_addEdit/:id',
        name:'law_firm_addEdit',
        component:law_firm_addEdit
    },
    //律所成员管理
    {
        path:'firm_law_manage/:id',
        name:'firm_law_manage',
        component:firm_law_manage
    },
    //律所成员增编页面
    {
        path:'firm_law_addEdit/:id/:lid',
        name:'firm_law_addEdit',
        component:firm_law_addEdit
    },
    {
        path:'article_list3',
        name:'article_list3',
        component:article_list3
    },
    {
        path:'article_add_edit/:id',
        name:'article_add_edit',
        component:article_add_edit
    },
    // {
    //     path:'asking_list3',
    //     name:'asking_list3',
    //     component:asking_list3
    // },
    // {
    //     path:'add_edit3/:id',
    //     name:'add_edit3',
    //     component:add_edit3
    // },
    {
        path:'case_list3',
        name:'case_list3',
        component:case_list3
    },
    {
        path:'case_add_edit3/:id',
        name:'case_add_edit3',
        component:case_add_edit3
    },
    {
        path:'home_case',
        name:'home_case',
        component:home_case
    },
    {
        path:'home_article',
        name:'home_article',
        component:home_article
    },
    {
        path:'home_consult',
        name:'home_consult',
        component:home_consult
    },
    {
        path:'be_good',
        name:'be_good',
        component:be_good
    },
    {
        path:'be_good_edit/:id/:source',
        name:'be_good_edit',
        component:be_good_edit
    }
    ,
    {
        path:'asking_man_list',
        name:'asking_man_list',
        component:asking_man_list
    }

];