<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link>
                        </li>
                        <li class="active">订单管理</li>
                        <li class="active">订单列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <a href="javascript:;" @click="changeType(7)">
                        <el-tag :class="{ activeTag : orderType == '7' }">退款申请中</el-tag>
                    </a>
                    <a href="javascript:;" @click="changeType(8)">
                        <el-tag :class="{ activeTag : orderType == '8' }">已退款</el-tag>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">订单列表</div>
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
                                            <el-form-item  label="订单编号">
                                                <el-input v-model="param.orderNo" placeholder="订单编号" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="订单来源">
                                                <el-select v-model="param.source" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option value="1"  label="PC订单">PC订单</el-option>
                                                    <el-option value="2"  label="IOS订单">IOS订单</el-option>
                                                    <el-option value="3"  label="Android订单">Android订单</el-option>
                                                    <el-option value="4"  label="其他订单">其他订单</el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item  label="订单类型">
                                                <el-select v-model="param.type" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option value="9" label="律师服务">律师服务</el-option>
                                                    <el-option value="11" label="快速咨询">快速咨询</el-option>
                                                    <el-option value="12" label="知识产权">知识产权</el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item  label="用户名">
                                                <el-input v-model="param.userName" placeholder="用户名" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="订单创建时间">
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple">
                                                        <el-date-picker type="datetime" placeholder="开始时间" v-model="param.createTimeStart" @change="createTimeStart" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light">
                                                        <el-date-picker type="datetime" placeholder="结束时间" v-model="param.createTimeEnd" @change="createTimeEnd" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                </el-row>
                                            </el-form-item>
                                            <!-- 已退款订单 -->
                                            <el-form-item  label="退款时间">
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple">
                                                        <el-date-picker type="datetime" placeholder="开始时间" v-model="param.refundsTimeStart" @change="refundsTimeStart" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light">
                                                        <el-date-picker type="datetime" placeholder="结束时间" v-model="param.refundsTimeEnd" @change="refundsTimeEnd" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item  label="退款理由">
                                                <el-input v-model="param.refundsReason" placeholder="退款理由" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>

                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <el-table :data="dataList" border style="width: 100%">

                                        <el-table-column prop="orderNo" label="订单号"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="tradeCode" label="订单流水号" width="180">
                                        </el-table-column>
                                        <el-table-column prop="userName" label="用户名"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="contacts" label="联系人"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="userPhone" label="联系人电话"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="lawyerName" label="供应商"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="lawyerPhone" label="供应商电话"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="amount" label="订单金额"   width="180">
                                        </el-table-column>

                                        <el-table-column v-if="orderType == '5' || orderType == '6'" prop="totalPrice" label="实际支付金额"   width="180">
                                        </el-table-column>
                                        <el-table-column v-if="orderType == '5' || orderType == '6'" prop="discountPrice" label="优惠券抵扣金额"   width="180">
                                        </el-table-column>
                                        <el-table-column v-if="orderType == '5' || orderType == '6'" prop="amount" label="应退金额"   width="180">
                                        </el-table-column>
                                        <el-table-column v-if="orderType == '5' || orderType == '6'" prop="totalPrice" label="实退金额"   width="180">
                                        </el-table-column>

                                        <el-table-column label="订单状态"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.state && item.row.state.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="订单类型"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.type && item.row.type.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="订单来源"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.source && item.row.source.value || ''}}
                                            </template>
                                        </el-table-column>

                                        </el-table-column>
                                        <el-table-column prop="refundsTime" label="退款时间"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="refundsReason" label="退款原因"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间"   width="180">
                                        </el-table-column>

                                        <el-table-column fixed="right" label="操作" width="220">
                                            <template slot-scope="item">
                                                <button title="同意退款" v-if="orderType == 7 && (item.row.state && item.row.state.code != 46)"  class="btn btn-success btn-xs" @click="handleSubmit(item.row.orderNo,item.row.amount,'refund_agree')"><i class=" icon-ok"></i>同意退款</button>
                                                <button title="驳回" v-if="orderType == 7 && (item.row.state && item.row.state.code != 46)" class="btn btn-danger btn-xs" @click="openDictionary('order_reject',item.row.orderNo,item.row.amount,'refuse')"><i class="icon-mail-reply"></i>驳回</button>
                                                <button title="查看" class="btn btn-primary btn-xs" @click="showInfo(item.row)"><i class="icon-search"></i>查看</button>
                                                <button title="删除" v-if="0" class="btn btn-danger btn-xs" @click=""><i class="icon-trash"></i>删除</button>
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
        <el-dialog title="驳回理由" v-model="dialogForm" size="tiny" >
            <el-form ref="formParam" :model="formParam" :rules="formRules" label-width="120px" onsubmit="return false">
                <el-form-item  prop="checkList">
                    <div v-for="(item, index) in  optionDictionaryList">
                        <span>
                            <input type="checkbox" class="checkboxes" :value="item.key+','+item.value" v-model="formParam.checkList">
                        </span>
                        <span style="margin-left: 12px" >
                            <div style="display: inline-block">{{item.value}}</div>
                            <div style="display: inline-block" v-if="index == optionDictionaryList.length-1">
                                <input type="text" class="form-control" v-model="formParam.other"  style=" border-top: none;border-left: none; border-right: none;">
                            </div>
                        </span>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm = false">取 消</el-button>
                <el-button  type="primary" @click="submitForm('formParam')" :loading="formLoading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .activeTag{
        color: #FFF;background: #2185D0
    }
</style>
<script>
    import Page from 'components/common/Page';
    import apiOrder from 'api/order';

    export default {
        name: 'orderCommon',
        components: {Page: Page},
        data: function () {
            let validateCheckList = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('请选择理由'));
                } else {
                    callback();
                }
            };
            return {
                orderType:7, //  7 物退款中, 8 财物已完成退款
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    orderNo:'',//订单编号
                    source:'',//订单来源
                    type:'',//订单类型
                    userName:'',//用户名
                    createTimeStart:'',//订单创建时间
                    createTimeEnd:'',//订单创建时间
                    payTimeStart:'',//支付时间
                    payTimeEnd:'',//支付时间
                    updateTimeStart:'',// 完成时间 关闭时间
                    updateTimeEnd:'',// 完成时间 关闭时间
                    cancelReason:'',//关闭理由
                    refundsTimeStart:'',//退款时间
                    refundsTimeEnd:'',//退款时间
                    refundsReason:''//退款理由
                },

                optionDictionaryList:null,
                dialogForm:false,
                formLoading:false,
                formParam:{
                    checkList:[],
                    other:'',
                    amount:'',
                    code:'',
                    orderNo:'',
                    operator:''
                },
                formRules:{
                    checkList: [
                        { validator: validateCheckList, trigger: 'change' }
                    ]
                }

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
            openDictionary:function(code,orderNo,amount,operator){
                this.formParam.orderNo = orderNo;
                this.formParam.operator = operator;
                this.formParam.amount=amount;
                if(this.optionList == null){
                    this.formParam.code = code;
                    this.orderDictionary(code);
                }
                this.dialogForm = true;
            },
            //订单原因
            orderDictionary:function(code){
                apiOrder.orderDictionary(this,code).then(function(response){
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.optionDictionaryList = data;
                        return;
                    }
                },function(response){
                    console.log('error:', response);
                });
            },
            submitForm:function(formName){
                let {checkList,code,other,orderNo,operator}= this.formParam;
                let param = [],money=this.formParam.amount;
                for(let i= 0,l=checkList.length;i<l;i++){
                    let temp  = checkList[i].split(',');
                    let key = temp[0];
                    let value = temp[1];
                    if( checkList[i].indexOf('5,其它') > -1 && other != ''){
                        value = other;
                    }
                    param.push({'key':key,'value':value,'code':code});
                }
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.formLoading = true;
                        apiOrder.workflow(_this,{refundPrice:money,reasons:param},orderNo,operator).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.formLoading = false;
                            if (body && body.code == 1) {
                                _this.restFormParam();
                                _this.dialogForm=false;
                                _this.getResource(1, this.todopage.limit);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleSubmit:function(orderNo,amount,operator){
                let _this = this,param=[{'key':'1','value':'财务通过','code':'refund_agree'}];
                this.$confirm('是否同意退款订单：'+orderNo+' ?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apiOrder.workflow(_this,{refundPrice:amount,reasons:param},orderNo,operator).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            if (body && body.code == 1) {
                                _this.getResource(1, this.todopage.limit);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                }).catch(() => {

                });
            },
            restFormParam:function(){
                this.formParam = {
                    checkList:[],
                    other:'',
                    code:'',
                    orderNo:'',
                    operator:''
                }
            },
            createTimeStart:function (val) {
                this.param.createTimeStart = val;
            },
            createTimeEnd:function (val) {
                this.param.createTimeEnd = val;
            },
            payTimeStart: function(val) {
                this.param.payTimeStart = val;
            },
            payTimeEnd: function(val) {
                this.param.payTimeEnd = val;
            },
            updateTimeStart: function(val) {
                this.param.updateTimeStart = val;
            },
            updateTimeEnd: function(val) {
                this.param.updateTimeEnd = val;
            },
            refundsTimeStart: function(val) {
                this.param.refundsTimeStart = val;
            },
            refundsTimeEnd: function(val) {
                this.param.refundsTimeEnd = val;
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;

                for (let k in this.param) {
                    if(this.param[k] != ''){
                        param[k] = this.param[k];
                    }
                }
                param['orderState'] = this.orderType;
                $('#list-content').mLoading("show");
                apiOrder.orderList(this, param).then(function (response) {
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
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            mRender: function (s) {
                if (s == 1) return '提现申请中';
                if (s == 2) return '提现成功';
                return '没有申请提现';
            },
            showInfo: function(item){
                this.$router.push({name: 'order_edit', params: {orderNo: item.orderNo}});
            },
            changeType: function(value){
                this.orderType = value;
                this.search();
            }
        }
    }
    //
</script>
