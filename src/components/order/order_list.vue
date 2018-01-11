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
                    <router-link :to="{name: 'order_list'}">
                        <el-tag class="activeTag">订单列表</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_noPay'}">
                        <el-tag >未支付</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_havePay'}">
                        <el-tag>已支付</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_haveComplete'}">
                        <el-tag>已完成</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_haveClose'}">
                        <el-tag>已关闭</el-tag>
                    </router-link>
                    <router-link :to="{name: 'order_haveBack'}">
                        <el-tag>已退款</el-tag>
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
                                            <el-form-item  label="下单开始时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeStart" @change="starTimeChang" style="width: 220px;"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item  label="下单结束时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeEnd" @change="endTimeChang" style="width: 220px;"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item  label="订单主题">
                                                <el-input v-model="param.subject" placeholder="订单主题" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="订单编号">
                                                <el-input v-model="param.orderNo" placeholder="订单编号" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="用户名">
                                                <el-input v-model="param.userName" placeholder="用户名" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="律师名">
                                                <el-input v-model="param.lawyerName" placeholder="律师名" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="订单状态">
                                                <el-select v-model="param.state" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option value="Wait" label="待确定">待确定</el-option>
                                                    <el-option value="Create" label="待付款">待付款</el-option>
                                                    <el-option value="Pay" label="已付款">已付款</el-option>
                                                    <el-option value="USure" label="用户确认">用户确认</el-option>
                                                    <el-option value="LSure" label="律师确认">律师确认</el-option>
                                                    <el-option value="Finish" label="已完成">已完成</el-option>
                                                    <el-option value="Cancel" label="已取消">已取消</el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item  label="订单类型">
                                                <el-select v-model="param.type" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option value="Appointment" label="预约见面">预约见面</el-option>
                                                    <el-option value="Case" label="案件">案件</el-option>
                                                    <el-option value="Gift" label="红包">红包</el-option>
                                                    <el-option value="Combo" label="组合套餐">组合套餐</el-option>
                                                    <el-option value="GoodsService" label="律师服务">律师服务</el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item  label="订单来源">
                                                <el-select v-model="param.source" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option value="App"  label="APP订单">APP订单</el-option>
                                                    <el-option value="Pc"  label="PC订单">PC订单</el-option>
                                                </el-select>
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
                                        <el-table-column prop="subject" label="订单主题"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="orderNo" label="订单号"   width="180">
                                        </el-table-column>
                                        <el-table-column label="客户信息"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.userName + '：' + item.row.userPhone }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="律师信息"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.lawyerName + '：' + item.row.lawyerPhone }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="amount" label="订单金额"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="totalPrice" label="应付金额"   width="180">
                                        </el-table-column>
                                        <el-table-column label="订单来源"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.source && item.row.source.value  }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="订单状态"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.state && item.row.state.value  }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="支付方式"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.payType && item.row.payType.value  }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="订单类型"   width="180">
                                            <template slot-scope="item">
                                                {{item.row.type && item.row.type.value  }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="lawyerMoney" label="平台服务费"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="realMoney" label="实际收益"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="lawyerRate" label="提现百分率（%）"   width="180">
                                        </el-table-column>
                                        <el-table-column label="提现状态"   width="180">
                                            <template slot-scope="item">
                                                {{ mRender(item.row.isdrawCase)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="payTime" label="支付时间"   width="180">
                                        </el-table-column>

                                        <el-table-column prop="createTime" label="下单时间"   width="180">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作">
                                            <template slot-scope="item">
                                                <button title="查看" v-if="item.row.state != 1" class="btn btn-primary btn-xs" @click="showInfo(item.row)"><i class="icon-pencil"></i>查看</button>
                                                <button title="删除" v-if="0" class="btn btn-danger btn-xs" @click=""><i class="icon-trash"></i>删除</button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit"
                                  :page="todopage.page"></page>
                        </div>
                    </div>
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
    import Page from 'components/common/Page';
    import apiOrder from 'api/order';

    export default {
        name: 'orderList',
        components: {Page: Page},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    createTimeStart:'', //下单开始时间
                    createTimeEnd:'', //下单结束时间
                    subject: '', //订单主题
                    orderNo: '', //订单编号
                    userName: '', //用户名
                    lawyerName: '', //律师名
                    state: '', //订单状态
                    type: '',//订单类型
                    source: '' //订单来源
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
            starTimeChang:function (val) {
                this.param.createTimeStart = val;
            },
            endTimeChang: function(val) {
                this.param.createTimeEnd = val;
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;

                for (let k in this.param) {
                    param[k] = this.param[k];
                }
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


