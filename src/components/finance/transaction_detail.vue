<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">财务管理</li>
                        <li class="active">交易明细</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">交易明细</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <button type="button" class="btn btn-info" @click="exportExcel">导出</button>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <el-form :inline="true" :model="param">
                                        <el-form-item label="用户名">
                                            <el-input @keyup.13.native="search" type="text" v-model="param.userName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="订单号">
                                            <el-input @keyup.13.native="search" type="text" v-model="param.tradeNo"></el-input>
                                        </el-form-item>
                                        <el-form-item label="支付方式">
                                            <el-select v-model="param.paymentType" filterable default-first-option clearable>
                                                <el-option value="1" label="网银支付"></el-option>
                                                <el-option label="APP快捷支付" value="2"></el-option>
                                                <el-option label="PC快捷支付" value="3"></el-option>
                                                <el-option label="app微信支付" value="4"></el-option>
                                                <el-option label="微信扫码支付" value="5"></el-option>
                                                <el-option label="支付宝扫码支付" value="6"></el-option>
                                                <el-option label="余额支付" value="7"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="支付渠道">
                                            <el-select v-model="param.payChannel" clearable>
                                                <el-option value="1" label="通联"></el-option>
                                                <el-option value="2" label="海贝"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="下单时间">
                                            <el-date-picker v-model="time" @change="chooseTime" range-separator="  至  " type="datetimerange" :picker-options="pickerOptions" placeholder="选择时间范围" align="right">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item>
                                            <button type="submit" @click="search" class="btn btn-danger">搜索</button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <tableList  @isPage="isPage"  :indexNo="indexNo" :select="select" :width="150" :page_total="page_total" :limit="param.limit" :table_data="table_data" :index_list="index_list" :prop_name="prop_name">

                            </tableList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    import tableList from 'components/finance/Ele-table.vue'
    import apiFinance from 'api/finance';
    export default {
        data() {
            return {
                indexNo:true,
                select:false,
                time:'',
                param:{
                    userName:'',
                    tradeNo:'',
                    paymentType:'',
                    payChannel:'',
                    orderTimeStart:'',
                    orderTimeEnd:'',
                    limit:8,
                    page:1,
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                table_data:[],
                index_list:[
                    {"label":"业务订单号"},
                    {"label":"支付流水号"},
                    {"label":"用户ID"},
                    {"label":"用户名"},
                    {"label":"下单时间"},
                    {"label":"付款时间"},
                    {"label":"订单类型"},
                    {"label":"服务名称"},
                    {"label":"订单金额(元)"},
                    {"label":"支付方式"},
                    {"label":"支付渠道"},
                    {"label":"支付金额(元)"},
                    {"label":"优惠金额(元)"},
                    {"label":"服务费(元)"},
                    {"label":"支付手续费(元)"},
                    {"label":"订单状态"}
                ],
                prop_name:["tradeNo","thirdTrxNo","userId","userName","orderTime","payTime","orderType.value","tradeName","orderAmount","paymentType.value",
                "payChannel.value","tradeAmount","couponAmount","serviceFee","sysProceduresFee","orderState.value"],
                page_total:1,
            }
        },
        components:{
            tableList
        },
        methods:{
            exportExcel(){
                window.open(apiFinance.export_tradepayList('?tradeNo='+this.param.tradeNo+'&paymentType='+this.param.paymentType+'&payChannel='+this.param.payChannel+'&orderTimeStart='+this.param.orderTimeStart+'&orderTimeEnd='+this.param.orderTimeEnd+'&userName='+this.param.userName))
            },
            chooseTime(data){
                this.param.orderTimeStart=data.split("  至  ")[0];
                this.param.orderTimeEnd=data.split("  至  ")[1];
            },
            isPage(data){
                this.param.page=data;
            },
            search(){
                this.init();
            },
            init(){
                apiFinance.trade_payList(this,this.param).then(response=>{
                    if(response.body.data.items){
                        response.body.data.items.forEach(function (v,k) {
                            v. tradeAmount=v. tradeAmount/100
                        });
                        this.table_data=response.body.data.items;
                    }else{
                        this.table_data=[];
                    }
                    this.page_total=response.body.data.total;
                })
            }
        },
        mounted(){
            this.init();
        },
        watch:{
            "param.page"(to,from){
                this.init();
            }
        }
    }
</script>
