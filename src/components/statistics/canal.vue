<template>

    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">数据统计</li>
                        <li class="active">用户统计</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                   <el-form :inline="true">
                        <el-form-item label="应用选择">
                            <el-select  v-model="param.userType" @change="selectChange" placeholder="请选择">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="律师端" value="1"></el-option>
                                <el-option label="用户端" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="渠道选择">
                            <el-select  v-model="param.channelCode" @change="selectChange" placeholder="请选择">
                                <el-option v-for="(item,index) in  channelCodeOptions" :key="index + 'channelCode'" :label="item.channelName" :value="item.channelCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">

                    <a href="javascript:;" @click="changeAction('new')">
                        <el-tag :class="{ activeTag : actionType=='new' }">新增用户数</el-tag>
                    </a>
                    <a href="javascript:;" @click="changeAction('newRegister')">
                        <el-tag :class="{ activeTag : actionType=='newRegister' }">新增注册数</el-tag>
                    </a>

                    <a href="javascript:;" @click="changeAction('money')">
                        <el-tag :class="{ activeTag : actionType=='money' }">已支付订单</el-tag>
                    </a>
                    <a href="javascript:;" @click="changeAction('orderNotPay')">
                        <el-tag :class="{ activeTag : actionType=='orderNotPay' }">未支付订单</el-tag>
                    </a>
                    <a href="javascript:;" @click="changeAction('finishWithDraw')">
                        <el-tag :class="{ activeTag : actionType=='finishWithDraw' }">支出统计</el-tag>
                    </a>

                    <a href="javascript:;" @click="changeAction('userActive')">
                        <el-tag :class="{ activeTag : actionType=='userActive' }">活跃度</el-tag>
                    </a>
                    <a href="javascript:;" @click="changeAction('userKeep')">
                        <el-tag :class="{ activeTag : actionType=='userKeep' }">留存率</el-tag>
                    </a>
                </div>
            </div>

            <!--- 用户统计 -->
            <div class="row" style="margin-top:-60px" v-show="actionType == 'new' || actionType == 'newRegister'">
               <users-charts :isMainContent="isMainContent" ref="cancalUsersCharts"></users-charts>
            </div>

            <!--- 已支付订单 -->
            <div class="row" style="margin-top:-60px" v-show="actionType == 'money'">
                <div class="wrapper">
                    <charts-common :apiAct="orderPayer" text="支付人数" :showDev="showDev" :isInit="isInit" ref="cancalMoneyOrderPayer"></charts-common>
                    <charts-common :apiAct="orderPayCount" text="支付次数" :showDev="showDev" :isInit="isInit" ref="cancalMoneyOrderPayCount"></charts-common>
                    <charts-common :apiAct="orderPayPrices" text="支付金额" :showDev="showDev":isInit="isInit"  :yName="yName" ref="cancalMoneyOrderPayPrices"></charts-common>
                </div>
            </div>

            <!--- 未支付订单 -->
            <div class="row" style="margin-top:-60px" v-show="actionType == 'orderNotPay'">
                <div class="wrapper">
                    <charts-common :apiAct="orderNotPayUser" text="未支付人数统计" :showDev="showDev" :isInit="isInit" ref="cancalOrderNotPay1"></charts-common>
                    <charts-common :apiAct="orderNotPayCount" text="未支付次数统计" :showDev="showDev" :isInit="isInit" ref="cancalOrderNotPay2"></charts-common>
                    <charts-common :apiAct="orderNotPayPrices" text="未支付金额统计" :showDev="showDev" :isInit="isInit" ref="cancalOrderNotPay3"></charts-common>
                    <charts-common :apiAct="orderTransformRate" text="下单转化率" :showDev="showDev" :yName="notYName" :formatter="formatter" :isInit="isInit" ref="cancalOrderNotPay4"></charts-common>
                </div>
            </div>

            <!--- 支出统计 -->
            <div class="row" style="margin-top:-60px" v-show="actionType == 'finishWithDraw'">
                <div class="wrapper">
                    <charts-common :apiAct="finishWithDraw" text="提现到账金额" :showDev="showDev" :isInit="isInit" ref="cancalfinishWithDraw1"></charts-common>
                    <charts-common :apiAct="notFinishWithDraw" text="提现未到账金额" :showDev="showDev" :isInit="isInit" ref="cancalfinishWithDraw2"></charts-common>
                </div>
            </div>

            <!-- 活跃度 -->
            <div class="row" style="margin-top:-60px" v-show="actionType == 'userActive'">
                <div class="wrapper">
                   <charts-common :apiAct="userActive" text="活跃度" :isInit="isInit" ref="userActive"></charts-common>
                </div>
            </div>

            <!-- 留存率 -->
            <div class="row" style="margin-top:-60px" v-show="actionType == 'userKeep'">
                <div class="wrapper">
                  <keep-charts :isInit="isInit"  ref="userKeep"></keep-charts>
                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .activeTag{
        color: #FFF;background: #2185D0
    }
</style>
<script>
    import usersCharts from 'components/statistics/users_charts';
    import chartsCommon from 'components/statistics/charts_common';
    import keepCharts from 'components/statistics/users_operation_charts_keep';

    import {
        orderPayer,orderPayCount,orderPayPrices,
        orderNotPayUser,orderNotPayCount,orderNotPayPrices,
        orderTransformRate,finishWithDraw,notFinishWithDraw
    } from 'api/moneyCharts';

    import apiCanalCharts from 'api/canalCharts';

    import {userActive} from 'api/usersOperation';

    import { Loading } from 'element-ui';

    const actMap = {
        new(context){
            let cancalUsersCharts = context.$refs['cancalUsersCharts'];
            console.log(cancalUsersCharts);
            cancalUsersCharts.handleSearch('new','新增用户数','历史总共新增',context.param);
           
        },
        newRegister(context){
            let cancalUsersCharts = context.$refs['cancalUsersCharts'];
            cancalUsersCharts.handleSearch('newRegister','新增注册数','历史新增注册用户数',context.param);
            
        },
        money(context){
             context.$refs['cancalMoneyOrderPayer'].handleSearch(context.param);
             context.$refs['cancalMoneyOrderPayCount'].handleSearch(context.param);
             context.$refs['cancalMoneyOrderPayPrices'].handleSearch(context.param);        
        },
        orderNotPay(context){
             context.$refs['cancalOrderNotPay1'].handleSearch(context.param);
             context.$refs['cancalOrderNotPay2'].handleSearch(context.param);
             context.$refs['cancalOrderNotPay3'].handleSearch(context.param);        
        },
        finishWithDraw(context){
             context.$refs['cancalfinishWithDraw1'].handleSearch(context.param);
             context.$refs['cancalfinishWithDraw2'].handleSearch(context.param);
        },
        userActive(context){
            context.$refs['userActive'].handleSearch(context.param);
        },
        userKeep(context){
            context.$refs['userKeep'].handleSearch(context.param);
        }
    };

    export default {
        name: 'canalCharts',
        components: {usersCharts,chartsCommon,keepCharts},
        data: function () {
            return {
                param: {
                    userType :'', //应用选择
                    channelCode:''
                },
                channelCodeOptions:[],
                actionType:'new',
                isMainContent:false,

                orderPayer,orderPayCount,orderPayPrices,
                showDev:false,
                yName:"单位（元）",

                orderNotPayUser,orderNotPayCount,orderNotPayPrices,orderTransformRate,
                notYName:'单位百分比',formatter:'%',
                finishWithDraw,notFinishWithDraw,
                isInit:false,
                userActive
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let loadingInstance = Loading.service();
                apiCanalCharts.listAppChannels(this).then(response=> {
                    let body = response.body;
                    loadingInstance.close();
                    if (body && body.code == 1) {
                        let data = body.data;
                        let temp = [{
                            channelCode:'',
                            channelName:'全部'
                        }];
                        for(let i = 0, _l = data.length; i < _l; i++){
                            let {channelCode,channelName} = data[i];
                            temp.push({
                                channelCode,
                                channelName:channelName+''
                            })
                        }
                        this.channelCodeOptions = Object.assign({},temp);
                    }
                }, response=>{
                    console.log('error:', response);
                });
            });
        },
        methods: {
            changeAction(type){
                let loadingInstance = Loading.service();
                let _this = this;
                setTimeout(()=>{
                    loadingInstance.close();
                    _this.actionType = type;
                    actMap[type](_this);
                },100);
            },
            selectChange(value){
                this.changeAction(this.actionType);
            }
        }
    }
</script>
