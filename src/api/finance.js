/*
 财务管理 接口调用
 */

import INDEX from 'api/index'

const API_URL = INDEX.API_URL;

/**  老肖 银行卡列表 新接口 S  **/
    //银行卡列表
export const apiBank = {
    //本接口用于查询用户绑定的银行卡
    getBankList: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/get-bank-list',
            'method': 'GET',
            'params': params
        });
    },
    //绑定的银行卡
    lockBank: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/lock-bank',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    // 解锁银行卡
    unlockBank: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/unlock-bank',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //加备注
    remark: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/add-remark',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    }
};
//提现管理

export const apiWithdraw = {
    //用于查询所有用户的提现申请
    withdrawList: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/withdraw-list',
            'method': 'GET',
            'params': params
        });
    },
    //详情
    withdrawInfo: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/get-draw-detail',
            'method': 'GET',
            'params': params
        });
    },
    //设置备注
    setWithDrawRemark: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/set-draw-remark',
            'method': 'post',
            'body': params,
            'emulateJSON':true
        });
    },
    //审核
    auditAndDispose: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/apply-auth',
            'method': 'post',
            'body': params,
            'emulateJSON':true
        });
    }
};
/**  老肖 新接口 E  **/

export default {
    //用户对账列表
    userList: function (context, params) {
        return context.$http({
            'url': API_URL + '/finance/finance-record-user-page',
            'method': 'GET',
            'params': params
        });
    },
    //用户对账下载
    billDown: function (id) {
        return API_URL + '/finance/bill/down/' + id
    },
    //获取分页律师财务对账记录
    lawyerList: function (context, params) {
        return context.$http({
            'url': API_URL + '/finance/finance-record-lawyer-page',
            'method': 'GET',
            'params': params
        });
    },
    //银行卡列表
    bankCardList: function (context, params) {
        return context.$http({
            'url': API_URL + '/finance/bank-card-page',
            'method': 'GET',
            'params': params
        });
    },
    //获取银行卡详情
    bankCardInfo: function (context, id) {
        return context.$http({
            'url': API_URL + '/finance/bank-card/' + id,
            'method': 'GET'
        });
    },
    //银行卡删除
    bankCardDel: function (context, id) {
        return context.$http({
            'url': API_URL + '/finance/bank-card/' + id,
            'method': 'DELETE'
        });
    },
    //银行卡状态审核
    bankCardAuth: function (context, id, params) {
        return context.$http({
            'url': API_URL + '/finance/bank-card/' + id,
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    //提现列表
    withList: function (context, params) {
        return context.$http({
            'url': API_URL + '/finance/withdraw',
            'method': 'GET',
            'params': params
        });
    },
    //提现详情
    withdrawInfo: function (context, id) {
        return context.$http({
            'url': API_URL + '/finance/withdraw/' + id,
            'method': 'GET'
        });
    },
    //提现状态审核
    withdrawAuth: function (context, id, params) {
        return context.$http({
            'url': API_URL + '/finance/withdraw/'+id+'/audit',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true,
        });
    },
    //导出记录
    exportDraw: function (context, params) {
        return API_URL + '/finance/withdraw/export';
    },
    //导出代付记录
    exportBankList: function () {
        return  API_URL +'/finance/withdraw/export-to-bank-client';
    },

    /*****  2017-08-22 新需求改进 ******/
    //提现管理
    withdrawList: function (context, params) {
        return context.$http({
            'url': API_URL + '/trans/withdrawList',
            'method': 'GET',
            'params': params
        });
    },
    withdrawInfo: function (context, id) {
        return context.$http({
            'url': API_URL + '/trans/setWithDrawRemark/' + id,
            'method': 'GET'
        });
    },
    setWithDrawRemark: function (context, params) {
        return context.$http({
            'url': API_URL + '/trans/setWithDrawRemark',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    auditAndDispose: function (context, params) {
        return context.$http({
            'url': API_URL + '/trans/auditAndDispose',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    //银行卡管理
    bankManagerList: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/web/list',
            'method': 'get',
            'body': params,
            'emulateJSON':true
        });
    },
    bankManagerRemark: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/web/addRemark',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    bankManagerLock: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/web/lock',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    bankManagerUnlock: function (context, params) {
        return context.$http({
            'url': API_URL + '/bank/web/unlock',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    tips: function (context, option) {
        INDEX.tips(context, option);
    },
    //查询交易明细列表
    trade_payList: function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/trade-pay-list',
            'method': 'GET',
            'params': params
        });
    },
    //查看提现审核列表
    auditing_withdrawList: function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/auditing-withdraw-list',
            'method': 'GET',
            'params': params
        });
    },
    //提现打款列表
    withdraw_disposeList: function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/withdraw-dispose-list',
            'method': 'GET',
            'params': params,
        });
    },
    //提现审核
    single_withdrawAudit: function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/single-withdraw-audit',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true
        });
    },
    //提现批量审核
    batch_withdrawAudit: function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/batch-withdraw-audit',
            'method': 'PUT',
            'body': params,
            'emulateJSON':true,
        });
    },
    //单笔提现打款
    withdraw_payForOne: function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/withdraw-pay-for-user',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //批量退款打款
    withdraw_payForUsers: function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/withdraw-pay-for-users',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //设置备注
    setting_remark: function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/setting-remark',
            'method': 'POST',
            'params': params,
            'emulateJSON':true
        });
    },
    //查看提现交易详情
    withdraw_detail: function (context, id) {
        return context.$http({
            'url': API_URL + '/financial/withdraw-detail/'+id,
            'method': 'GET',
        });
    },
    //数据导出
    export_withdrawData: function (context, params) {
        return API_URL + '/financial/export-withdraw-data?tradeIds='
    },
    //查看用户流水列表
    user_tradeDetails: function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/user-trade-details',
            'method': 'GET',
            'params': params,
        });
    },
    //导出交易明细
    export_tradepayList:function (param) {
        return API_URL +'/financial/export-trade-pay-list'+param
    },
    //导入银行处理数据
    import_bankTransferResult:function (context, params) {
        return context.$http({
            'url': API_URL + '/financial/import-bank-transfer-result',
            'method': 'POST',
            'body': params,
            'emulateJSON':true
        });
    },
    //导出用户流水
    export_userTradeDetails:function (params) {
        return API_URL +'/financial/export-user-trade-details'+params
    },
    //用户账户列表
    user_accountList:function (context,params) {
        return context.$http({
            'url': API_URL + '/financial/user-account-list',
            'method': 'GET',
            'params': params,
        });
    },
    //导出用户账户
    export_userAccountList:function (params) {
        return API_URL +'/financial/export-user-account-list'+params
    }
}
