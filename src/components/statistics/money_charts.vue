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
                        <li class="active">金额统计</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <router-link :to="{name: 'statistics_money_charts'}">
                        <el-tag class="activeTag">已支付订单</el-tag>
                    </router-link>
                    <router-link :to="{name: 'statistics_orderNotPay_charts'}">
                        <el-tag>未支付订单</el-tag>
                    </router-link>
                    <router-link :to="{name: 'statistics_finishWithDraw_charts'}">
                        <el-tag>支出统计</el-tag>
                    </router-link>
                </div>
            </div>

            <charts-common :apiAct="orderPayer" text="支付人数" :showDev="showDev"></charts-common>
            <charts-common :apiAct="orderPayCount" text="支付次数" :showDev="showDev"></charts-common>
            <charts-common :apiAct="orderPayPrices" text="支付金额" :showDev="showDev" :yName="yName"></charts-common>
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
    import {orderPayer,orderPayCount,orderPayPrices} from 'api/moneyCharts';
    import chartsCommon from 'components/statistics/charts_common';

    export default {
        name: 'moneyCharts',
        components: {chartsCommon},
        data() {
            return {
                orderPayer,orderPayCount,orderPayPrices,
                showDev:false,
                yName:"单位（元）"
            };
        }
    }
</script>
