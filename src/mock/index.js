import Mock from 'mockjs';

import apiFinance from './mock_finance';

// 财务管理 相关
Mock.mock(/\/trans\/withdrawList/, 'get', apiFinance.withdrawList);
Mock.mock(/\/trans\/setWithDrawRemark/, 'put', apiFinance.setWithDrawRemark);
Mock.mock(/\/trans\/setWithDrawRemark\/*/, 'get', apiFinance.withdrawInfo);

Mock.mock(/\/bank\/web\/list/, 'get', apiFinance.bankManagerList);
Mock.mock(/\/bank\/web\/addRemark/, 'put', apiFinance.setWithDrawRemark);
export default Mock;
