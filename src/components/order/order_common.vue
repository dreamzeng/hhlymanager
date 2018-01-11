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
                    <router-link :to="{name: 'order_noPay'}">
                        <el-tag :class="{ activeTag : orderType == '1' }">未支付</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_havePay'}">
                        <el-tag :class="{ activeTag : orderType == '2' }">已支付</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_haveComplete'}">
                        <el-tag :class="{ activeTag : orderType == '3' }">已完成</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_haveClose'}">
                        <el-tag :class="{ activeTag : orderType == '4' }">已关闭</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_haveBacking'}">
                        <el-tag :class="{ activeTag : orderType == '6' }">退款申请中</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_haveBack'}">
                        <el-tag :class="{ activeTag : orderType == '5' }">已退款</el-tag>
                    </router-link>
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
                                            <!-- 已支付订单 -->
                                            <el-form-item v-if="orderType == '2'"  label="支付时间">
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple">
                                                        <el-date-picker type="datetime" placeholder="开始时间" v-model="param.payTimeStart" @change="payTimeStart" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light">
                                                        <el-date-picker type="datetime" placeholder="结束时间" v-model="param.payTimeEnd" @change="payTimeEnd" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                </el-row>
                                            </el-form-item>
                                            <!-- 已完成订单 -->
                                            <el-form-item v-if="orderType == '3'"  label="完成时间">
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple">
                                                        <el-date-picker type="datetime" placeholder="开始时间" v-model="param.updateTimeStart" @change="updateTimeStart" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light">
                                                        <el-date-picker type="datetime" placeholder="结束时间" v-model="param.updateTimeEnd" @change="updateTimeEnd" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                </el-row>
                                            </el-form-item>
                                            <!-- 已关闭订单 -->
                                            <el-form-item  v-if="orderType == '4'"  label="关闭时间">
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple">
                                                        <el-date-picker type="datetime" placeholder="开始时间" v-model="param.updateTimeStart" @change="updateTimeStart" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light">
                                                        <el-date-picker type="datetime" placeholder="结束时间" v-model="param.updateTimeEnd" @change="updateTimeEnd" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item  v-if="orderType == '4'"  label="关闭理由">
                                                <el-input v-model="param.cancelReason" placeholder="关闭理由" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <!-- 已退款订单 -->
                                            <el-form-item  v-if="orderType == '5'" label="退款时间">
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple">
                                                        <el-date-picker type="datetime" placeholder="开始时间" v-model="param.refundsTimeStart" @change="refundsTimeStart" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light">
                                                        <el-date-picker type="datetime" placeholder="结束时间" v-model="param.refundsTimeEnd" @change="refundsTimeEnd" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item  v-if="orderType == '5'" label="退款理由">
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
                                        <el-table-column prop="orderNo" label="平台订单号"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="serialNo" label="支付流水号"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="tradeCode" label="第三方流水号" width="180" v-if="!(orderType == '1' || orderType == '4')"> <!-- 未支付订单 这里不显示 -->
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

                                        <el-table-column v-if="orderType == '5' || orderType == '6' || orderType == '3' || orderType == '2'" prop="totalPrice" label="实际支付金额"   width="180">
                                        </el-table-column>
                                        <el-table-column v-if="orderType == '5' || orderType == '6' || orderType == '3' || orderType == '2'" label="优惠券抵扣金额"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.discountPrice || '0.00'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="govermentPrice" label="官费"   width="180" v-if="!(orderType == '1' || orderType == '4')">
                                        </el-table-column>
                                        <el-table-column prop="proceduresFee" label="交易手续费"   width="180" v-if="!(orderType == '1' || orderType == '4')">
                                        </el-table-column>
                                        <el-table-column prop="goodsFee" label="服务费"   width="180" v-if="!(orderType == '1' || orderType == '4')">
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
                                        <el-table-column label="服务名称"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.goodsName}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="订单来源"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.source && item.row.source.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="payTime" label="支付时间"   width="180" v-if="!(orderType == '1')"> <!-- 未支付订单 这里不显示 -->
                                        </el-table-column>
                                        <el-table-column prop="updateTime" label="完成时间"   width="180" v-if="orderType == '3'"> <!-- 已完成订单 -->
                                        </el-table-column>
                                        <el-table-column prop="updateTime" label="关闭时间"   width="180" v-if="orderType == '4'"> <!-- 已关闭时间 -->
                                        </el-table-column>
                                        <el-table-column prop="cancelReason" label="关闭原因"   width="180" v-if="orderType == '4'"> <!-- 已关闭时间 -->
                                        </el-table-column>
                                        <el-table-column prop="refundsTime" label="退款时间"   width="180" v-if="orderType == '5' || orderType == '6'"> <!-- 退款时间 -->
                                        </el-table-column>
                                        <el-table-column prop="refundsReason" label="退款原因"   width="180" v-if="orderType == '5' || orderType == '6'"> <!-- 退款时间 -->
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间"   width="180">
                                        </el-table-column>

                                        <el-table-column fixed="right" label="操作" width="220">
                                            <template slot-scope="item">
                                                <button title="关闭" v-if="orderType == '1' && (item.row.type && item.row.type.code != 10)" class="btn btn-danger btn-xs" @click="openDictionary('order_close',item.row,'close','关闭理由')"><i class=" icon-lock"></i>关闭</button>
                                                <button title="退款" v-if="orderType == '2' && (item.row.type && item.row.type.code != 10)" class="btn btn-danger btn-xs" @click="openDictionary('order_refund',item.row,'refund_apply','退款理由')"><i class="icon-jpy"></i>退款</button>
                                                <button title="撤销" v-if="orderType == '6' && (item.row.type && item.row.type.code != 10) && (item.row.state && item.row.state.code != 46) && (item.row.state && item.row.state.code != 16)" class="btn btn-danger btn-xs" @click="handleSubmit(item.row.orderNo,item.row.amount,'cancel')"><i class="icon-mail-reply"></i>撤销</button>
                                                <button title="再次申请" v-if="orderType == '6' && item.row.state && item.row.state.code==45 " class="btn btn-danger btn-xs" @click="handleSubmit(item.row.orderNo,item.row.amount,'retry_refund_apply','是否再次申请','用户主动申请')"><i class="icon-undo"></i>再次申请</button>
                                                <button title="查看" v-if="item.row.state != 1" class="btn btn-primary btn-xs" @click="showInfo(item.row)"><i class="icon-search"></i>查看</button>
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
        <el-dialog :title="dialogTitle" v-model="dialogForm" size="tiny" >
            <el-form :model="formParam" label-position="right" label-width="80px">
                <el-form-item label="订单类型">
                    {{formParam.type}}
                </el-form-item>
                <el-form-item label="退款提示" v-if="orderType == '2'">
                    <div>订单金额：{{formParam.amount}}元</div>
                    <div>实际支付金额：{{formParam.totalPrice}}元</div>
                    <div>官费：{{formParam.govermentPrice}}元</div>
                    <div>平台承担手续费：{{formParam.proceduresFee}}元</div>
                    <div>实际应退金额：{{formParam.totalPrice-formParam.govermentPrice}}元</div>
                </el-form-item>
                <el-form-item :label="dialogTitle">
                    <el-checkbox-group v-model="formParam.checkList">
                        <el-checkbox v-for="(item,index) in optionDictionaryList" :label="item.value"  :key="index"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="退款方式" v-if="orderType == '2'">
                    <el-radio-group v-model="refundRadio">
                        <el-radio label="1">全额退款 <el-button type="text" v-if="refundRadio == 1">({{formParam.totalPrice}}元)</el-button></el-radio>
                        <el-radio label="2">部分退款 <el-button type="text" v-if="refundRadio == 2">({{formParam.totalPrice-formParam.govermentPrice}}元)</el-button></el-radio>
                        <el-radio label="3">其他金额 <el-input type="number" v-if="refundRadio == 3" v-model="formParam.refundPrice" style="width: 100px" :max="formParam.totalPrice" :min="0"></el-input></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button type="primary" @click="submitForm()">确定</el-button>
                <el-button @click="dialogForm=false">取消</el-button>
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
        props: {
            orderType: {
                type: String,
                default: '1' // 订单状态 1：未支付 2：已支付 3：已完成 4：已关闭 5：已退款
            }
        },
        data: function () {
            let validateCheckList = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('请选择理由'));
                } else {
                    callback();
                }
            };
            return {
                refundRadio:'1',
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    orderNo:'',//平台订单号
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
                dialogTitle:'关闭理由',
                formParam:{
                    checkList:[],
                    other:'',
                    code:'',
                    orderNo:'',
                    operator:'',
                    type:'',
                    amount:'',
                    govermentPrice:'',
                    proceduresFee:'',
                    totalPrice:'',
                    refundPrice:''
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
            openDictionary:function(code,order,operator,dialogTitle){
                this.formParam.orderNo = order.orderNo;
                this.formParam.operator = operator;
                this.formParam.type=order.type.value;
                this.dialogTitle = dialogTitle;
                this.formParam.amount=order.amount;
                this.formParam.govermentPrice=order.govermentPrice;
                this.formParam.proceduresFee=order.proceduresFee;
                this.formParam.totalPrice=order.totalPrice;
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
            submitForm(){
                let {checkList,code,other,orderNo,operator}= this.formParam;
                let param = [],_this=this,money;
                for(let i = 0;i<this.optionDictionaryList.length;i++){
                    for(let j = 0;j<checkList.length;j++){
                        if(_this.optionDictionaryList[i].value == checkList[j]){
                            param.push({code:this.optionDictionaryList[i].code,key:this.optionDictionaryList[i].key,value:this.optionDictionaryList[i].value})
                        }
                    }
                }
                if(this.refundRadio == "1"){
                    money=this.formParam.totalPrice
                }else if(this.refundRadio == "2"){
                    money=this.formParam.totalPrice-this.formParam.govermentPrice
                }else if(this.refundRadio == "3"){
                    money=this.formParam.refundPrice
                }
                if(checkList.length>0){
                    if(money>parseFloat(this.formParam.totalPrice)){
                        this.$message("请输入小于实际支付金额")
                    }else{
                        if(money > 0){
                            apiOrder.workflow(_this, {refundPrice:money,reasons:param},orderNo,operator).then(function (response) {
                                let body = response.body;
                                _this.$message(body.msg);
                                _this.formLoading = false;
                                if (body && body.code == 1) {
                                    _this.restFormParam();
                                    _this.dialogForm = false;
                                    _this.getResource(1, this.todopage.limit);
                                    return;
                                }
                            })
                        }else{
                            this.$message("请输入大于0的退款金额")
                        }
                    }
                }else{
                    this.$message("请选择退款原因")
                }
            },
            handleSubmit:function(orderNo,amount,operator,confirm='是否撤销订单',value='用户主动撤销'){
                let _this = this,param=[{'key':'1','value':value,'code':'cancel'}];
                this.$confirm(confirm+'：'+orderNo+' ?', '提示', {
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
                    operator:'',
                    type:'',
                    amount:'',
                    govermentPrice:'',
                    proceduresFee:'',
                    totalPrice:'',
                    refundPrice:''
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
            }
        }
    }
    //
</script>
