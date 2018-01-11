import Mock from 'mockjs';


const withdrawList = [];
const count = 10;

for (let i = 0; i < count; i++) {
    withdrawList.push(Mock.mock({
        uuid: '@id',
        bizId: '@id',
        userCode: '@id',
        bankName: '@ctitle(10, 20)',
        bankCardNo: '@integer(300, 5000)',
        tradeFunds: '@integer(300, 5000)',
        toActualFunds:'@integer(300, 5000)',
        sysProceduresFee:'@integer(300, 5000)',
        createTime: '@datetime',
        finishTime:'@datetime',
        'tradeStatus|1':['开', '关'],
        remark:'@ctitle(10, 20)'
    }));
};

const bankManagerList = [];
for (let i = 0; i < count; i++) {
    bankManagerList.push(Mock.mock({
        "uuid":'@id',
        "realName": '@ctitle(2, 3)',
        "idCardNo": '@id',
        "bankCardNo":'@integer(300, 5000)',
        "phoneNo":'@integer(300, 5000)',
        "bankName":'@ctitle(10, 20)',
        "createTime":'@datetime',
        "unbindTime":'@datetime',
        "bankName":'@ctitle(10, 20)',
        "lockRemark":'@ctitle(10, 20)',
        "remark": '@ctitle(10, 20)',
        "isDelete":{
            "code":0,
            "value":"已删除"
        },
        "isLocked":{
            "code":0, "value":"锁定"
        },
        "status":{
            "code":1, "value":"审核通过"
        }
    }));
};

export default {
    withdrawList: () => {
        return {
            code:1,data:{
                total:count, items: withdrawList
            }
        };
    },
    withdrawInfo:()=>({
        "code": 1,
        "msg": "查询成功",
        "data": {
            "total": 1,
            "items": [
                Mock.mock({
                    "uuid": "1653f1a118934b639777891a4b576200",
                    "bizId": "20060400000044520170821150012254136",
                    "userCode": "ff0ed78c07ab4b16aa27ba90228b31ec",
                    "bankName": "中国工商银行",
                    "bankCardNo": "6222024000052544076",
                    "tradeFunds": 10000,
                    "toActualFunds": 10000,
                    "sysProceduresFee": 200,
                    "createTime": "2017-08-21 15:00:53",
                    "finishTime": '@datetime',
                    "tradeStatus": 2,
                    "remark": '@ctitle(10, 20)',
                    "extends1": "审核通过"
                })
            ]
        }
    }),
    setWithDrawRemark:()=>({
        "code": 1,
        "msg": "添加提现备注成功"
    }),
    bankManagerList: () => {
        return {
            code:1,data:{
                total:count, items: bankManagerList
            }
        };
    },
};
