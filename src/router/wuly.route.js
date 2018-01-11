import { asyncComponent } from 'lib/utils';

//通讯管理
const tool_com_manager = asyncComponent('tool/com_manager');

//财务管理
const cash_audit = asyncComponent('finance/cash_audit');
const cash_withdrawal = asyncComponent('finance/cash_withdrawal');
const trs_detail = asyncComponent('finance/transaction_detail');
const user_stream = asyncComponent('finance/user_stream');
const user_account = asyncComponent('finance/user_account');

//推送管理
const app_push = asyncComponent("push/app_push");
const news_push = asyncComponent("push/news_push");
const push_record = asyncComponent("push/push_record");

export let r = [
        { //用户账户
            path: 'finance/user_account',
            name: 'user_account',
            component: user_account
        },
        { //通讯管理
            path: 'tool/com_manager',
            name: 'tool_com_manager',
            component: tool_com_manager
        },
        { //交易明细
            path: 'finance/transaction_detail',
            name: 'trs_detail',
            component: trs_detail
        },
        { //提现审核管理
            path: 'finance/cash_audit',
            name: 'cash_audit',
            component: cash_audit
        },
        { //提现打款管理
            path: 'finance/cash_withdrawal',
            name: 'cash_withdrawal',
            component: cash_withdrawal
        },
        { //用户流水
            path: 'finance/user_stream',
            name: 'user_stream',
            component: user_stream
        },
        { //app推送
            path: 'push/app_push',
            name: 'app_push',
            component: app_push
        },
        { //短信推送
            path: 'push/news_push',
            name: 'news_push',
            component: news_push
        },
        { //推送记录
            path: 'push/push_record',
            name: 'push_record',
            component: push_record
        },
    ];
