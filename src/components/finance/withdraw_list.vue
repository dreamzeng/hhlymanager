<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">财务管理</li>
                        <li class="active">提现管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">提现列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">

                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item class="el-form-item-rest" label="提现流水号">
                                                <el-input v-model="param.bizId" placeholder="提现流水号" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="用户名">
                                                <el-input v-model="param.userCode" placeholder="用户名" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="开始时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeStart" @change="starTimeChang" style="width: 150px;"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="结束时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeEnd" @change="endTimeChang" style="width: 150px;"></el-date-picker>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column
                                            type="index"
                                            width="100"
                                            label="序号">
                                        </el-table-column>
                                        <el-table-column prop="bizId" label="提现流水号" width="180">
                                        </el-table-column>
                                        <el-table-column prop="userId" label="用户Id" width="180">
                                        </el-table-column>
                                        <el-table-column prop="bankName" label="提现银行" width="180">
                                        </el-table-column>
                                        <el-table-column prop="bankCardNo" label="银行卡号" width="180">
                                        </el-table-column>
                                        <el-table-column label="申请提现金额" width="180">
                                            <template slot-scope="item">
                                                {{item.row.tradeFunds && item.row.tradeFunds/100 || 0}} 元
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="实际提现金额" width="180">
                                            <template slot-scope="item">
                                                {{item.row.toActualFunds && item.row.toActualFunds/100 || 0}} 元
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="平台承担手续费" width="180">
                                            <template slot-scope="item">
                                                {{item.row.sysProceduresFee && item.row.sysProceduresFee/100 || 0}} 元
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="申请提现时间" width="180">
                                        </el-table-column>
                                        <el-table-column prop="finishTime" label="提现完成时间" width="180">
                                        </el-table-column>
                                        <el-table-column label="状态" width="180">
                                            <template slot-scope="item">
                                                {{item.row.tradeStatus && item.row.tradeStatus.value}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="remark" label="备注" width="180">
                                        </el-table-column>

                                        <el-table-column fixed="right" label="操作" width="180">
                                            <template slot-scope="item">
                                                <button title="审核" v-if="item.row.tradeStatus.code == 6 || item.row.tradeStatus.code == 2 " class="btn btn-warning btn-xs" @click="showInfo(item.row.detailId,1)">审核</button>
                                                <button title="备注" class="btn btn-danger btn-xs" @click="addRemark(null,item.row.detailId,item.row.userId)">备注</button>
                                                <button title="查看详情" class="btn btn-primary btn-xs" @click="showInfo(item.row.detailId,2)">查看详情</button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog :title="check ? '提现审核' :'查看详情'" :visible.sync="dialogInfo" :before-close="infoClose">
            <el-row style="margin-bottom: 20px">
                <el-col :span="12"><div class="grid-content bg-purple"><span class="title-color">提现流水号：</span>{{infoItem.bizId}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light"><span class="title-color">用户ID：</span>{{infoItem.userId}}</div></el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                <el-col :span="12"><div class="grid-content bg-purple"><span class="title-color">提现银行：</span>{{infoItem.bankName}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light"><span class="title-color">银行卡号：</span>{{infoItem.bankCardNo}}</div></el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                <el-col :span="8"><div class="grid-content bg-purple"><span class="title-color">申请提现金额：</span>{{infoItem.tradeFunds && infoItem.tradeFunds/100 || 0}} 元</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light"><span class="title-color">实际提现金额：</span>{{infoItem.toActualFunds && infoItem.toActualFunds/100 || 0}} 元</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><span class="title-color">平台承担手续费：</span>{{infoItem.sysProceduresFee && infoItem.sysProceduresFee/100 || 0}} 元</div></el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                <el-col :span="12"><div class="grid-content bg-purple"><span class="title-color">申请提现时间：</span>{{infoItem.createTime}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light"><span class="title-color">提现完成时间：</span>{{infoItem.finishTime}}</div></el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                <el-col :span="12"><div class="grid-content bg-purple"><span class="title-color">状态：</span>{{infoItem.tradeStatus && infoItem.tradeStatus.value}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light"><span class="title-color">备注：</span>{{infoItem.remark}}</div></el-col>
            </el-row>


            <el-row style="margin-bottom: 20px" v-if="check == false">
                <el-col :span="24"><div class="grid-content bg-purple"><span class="title-color">审核说明</span>：{{infoItem.extends1}}</div></el-col>
            </el-row>

            <el-form v-if="check" label-position="left" ref="auditingForm" :model="auditingForm" :rules="auditingRules" label-width="120px" onsubmit="return false">
                <el-form-item label="审核说明" prop="auditDesc" style="font-weight: bold">
                    <el-input type="textarea" placeholder="请输入100字以内的备注" v-model="auditingForm.auditDesc"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button v-if="check" type="primary" @click="auditingSub('auditingForm',1)" :loading="dialogAuditing">审核通过</el-button>
                <el-button v-if="check" type="warning" @click="auditingSub('auditingForm',-1)" :loading="dialogAuditing">不通过</el-button>

                <el-button @click="dialogInfo = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="remarkTitle" v-model="dialogRemark" size="tiny" >
            <el-form ref="remarkForm" :model="remarkForm" :rules="remarkRules" label-width="120px" onsubmit="return false">
                <el-form-item label="添加备注" prop="remark">
                    <el-input type="textarea" placeholder="请输入20字以内的备注" v-model="remarkForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRemark = false">取 消</el-button>
                <el-button  type="primary" @click="addRemark('remarkForm')" :loading="remarkLoading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .title-color{
        color: #b94a48;
        font-weight: bold;
    }
</style>
<script>
    import Page from 'components/common/Page';
    import apiFinance , {apiWithdraw} from 'api/finance';

    export default {
        name: 'finance_withdraw_list',
        components: {Page: Page},
        data: function () {
            var validateRemark = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入备注'));
                } else {
                    if (value.length > 20) {
                        callback(new Error('请输入20字以内的备注'));
                    }
                    callback();
                }
            };
            var validateAuditing = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入备注'));
                } else {
                    if (value.length > 100) {
                        callback(new Error('请输入100字以内的备注'));
                    }
                    callback();
                }
            };
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    createTimeStart:'', //提现申请查询开始时间
                    createTimeEnd: '', //提现申请查询结束时间
                    bizId:'', //提现流水号
                    userId:'' //用户名
                },
                dialogInfo:false,
                infoItem:{},
                dialogRemark:false,
                remarkLoading:false,
                remarkForm:{
                    remark:'',
                    tradeId:''
                },
                remarkRules:{
                    remark: [
                        { validator: validateRemark, trigger: 'blur' }
                    ]
                },
                remarkTitle:'添加备注',
                auditingForm:{
                    auditDesc:'', //审核说明
                    tradeId:'', //交易uId
                    auditResult:'' //审核结果 -1 不通过 1 通过
                },
                auditingRules:{
                    auditDesc: [
                        { validator: validateAuditing, trigger: 'blur' }
                    ]
                },
                check:false, //审核
                dialogAuditing:false
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
            },
            starTimeChang:function (val) {
                this.param.createTimeStart = val;
            },
            endTimeChang: function(val) {
                this.param.createTimeEnd = val;
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
                for (let k in this.param) {
                    if(this.param[k]){
                        param[k] = this.param[k];
                        if(k == 'createTimeStart' || k == 'createTimeEnd'){
                            var timestamp2 = Date.parse(new Date(this.param[k]));
                            timestamp2 = timestamp2 / 1000;
                            param[k] = timestamp2;
                        }
                    }
                }
                $('#list-content').mLoading("show");
                apiWithdraw.withdrawList(this, param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        this.dataList = data.items;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            showInfo:function(detailId,type){
                if(type == 2){
                    this.check = false;
                }else{
                    this.auditingForm.tradeId = detailId;
                    this.check = true;
                }
                let temp = {
                    "detailId": '',
                    "bizId": '',
                    "userId": '',
                    "bankName": '',
                    "bankCardNo": '',
                    "tradeFunds": '',
                    "toActualFunds":'',
                    "sysProceduresFee":'',
                    "createTime": "",
                    "finishTime":"",
                    "tradeStatus":'',
                    "remark":"",
                    "extends1":""
                };
                apiWithdraw.withdrawInfo(this, {
                    tradeId:detailId
                }).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        this.infoItem = Object.assign({}, body.data);
                        return;
                    }
                    this.$message(body.msg);
                }, function (response) {
                    console.log('error:', response);
                });
                this.dialogInfo = true;
            },
            infoClose:function(){
                this.dialogInfo = false;
            },
            addRemark:function(formName,id,userId){
                if(!formName){
                    this.remarkForm.tradeId = id;
                    this.remarkTitle=`添加备注 (用户ID：${userId})`;
                    this.dialogRemark = true;
                    return;
                }
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.remarkLoading = true;
                        apiWithdraw.setWithDrawRemark(_this, _this.remarkForm).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.remarkLoading = false;
                            if (body && body.code == 1) {
                                _this.remarkForm.tradeId = '';
                                _this.remarkForm.remark = '';
                                _this.dialogRemark=false;
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                })
            },
            auditingSub:function(formName,type){
                this.auditingForm.auditResult = type;
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.dialogAuditing = true;
                        apiWithdraw.auditAndDispose(_this, _this.auditingForm).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.dialogAuditing = false;
                            if (body && body.code == 1) {
                                _this.auditingForm.tradeId = '';
                                _this.auditingForm.auditDesc = '',
                                _this.dialogInfo=false;
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                })
            }
        }
    }
    //
</script>
