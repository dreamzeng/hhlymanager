import { asyncComponent } from 'lib/utils';

//咨询业务
const operation_consult_edit = asyncComponent('operationControl/consult_edit');

//报名管理
const register_manage = asyncComponent('h5_manage/register_manage');

//用户需求登记
const user_req_register = asyncComponent('order/user_req_register');
const user_req_register_select = asyncComponent('order/user_req_register_select');

//过往案例
const pase_cases = asyncComponent('case/pase_cases');
const pase_cases_add = asyncComponent('case/pase_cases_add');
const pase_cases_edit = asyncComponent('case/pase_cases_edit');

//通讯录
const address_lawfirm_list = asyncComponent('address/address_lawfirm_list');
const address_third_list = asyncComponent('address/address_third_list');

export let r = [
           {
            path:'operation_consult_edit',
            name:'operation_consult_edit',
            component:operation_consult_edit
         },
          {
            path:'pase_cases',
            name:'pase_cases',
            component:pase_cases
         },
          {
            path:'pase_cases_add/:id',
            name:'pase_cases_add',
            component:pase_cases_add
         },
         {
            path:'pase_cases_edit/:uuid',
            name:'pase_cases_edit',
            component:pase_cases_edit
         },
          {
            path:'address_lawfirm_list',
            name:'address_lawfirm_list',
            component:address_lawfirm_list
         },
          {
            path:'address_third_list',
            name:'address_third_list',
            component:address_third_list
         },
          {
            path:'user_req_register',
            name:'user_req_register',
            component:user_req_register
         },
          {
            path:'user_req_register_select/:id',
            name:'user_req_register_select',
            component:user_req_register_select
         },
          {
            path:'register_manage',
            name:'register_manage',
            component:register_manage
         }
    ];
