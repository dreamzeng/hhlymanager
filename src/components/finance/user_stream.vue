<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">财务管理</li>
                        <li class="active">用户流水</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">用户流水</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <button type="button" class="btn btn-info" @click="exportExcel">导出</button>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <el-form :inline="true" :model="param">
                                        <el-form-item label="业务流水号">
                                            <el-input @keyup.13.native="search" type="text" v-model="param.bizId"></el-input>
                                        </el-form-item>
                                        <el-form-item label="第三方流水号">
                                            <el-input @keyup.13.native="search" type="text" v-model="param.tradeSerialNo"></el-input>
                                        </el-form-item>
                                        <el-form-item label="用户名">
                                            <el-input  @keyup.13.native="search" type="text" v-model="param.userName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="交易开始时间">
                                            <el-date-picker range-separator="  至  " v-model="createTime" @change="createTimes" type="datetimerange"  :picker-options="pickerOptions" placeholder="选择时间范围">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="交易完成时间">
                                            <el-date-picker range-separator="  至  " v-model="finalTime" @change="finalTimes" type="datetimerange" :picker-options="pickerOptions" placeholder="选择时间范围" align="right">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="用户类型">
                                            <el-select v-model="param.userType" class="input-class" clearable>
                                                <el-option label="律师" value="1"></el-option>
                                                <el-option label="用户" value="2"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="收支情况">
                                            <el-select v-model="param.accountEntry" class="input-class" clearable>
                                                <el-option label="收入" value="1"></el-option>
                                                <el-option label="支出" value="2"></el-option>
                                                <el-option label="全部" value=""></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="交易类型">
                                            <el-select v-model="param.bizType" class="input-class" clearable>
                                                <el-option label="支付" value="1"></el-option>
                                                <el-option label="提现" value="2"></el-option>
                                                <el-option label="退款" value="3"></el-option>
                                                <el-option label="打赏" value="4"></el-option>
                                                <el-option label="悬赏" value="5"></el-option>
                                                <el-option label="红包" value="6"></el-option>
                                                <el-option label="平台佣金" value="7"></el-option>
                                                <el-option label="手续费" value="8"></el-option>
                                                <el-option label="余额支付" value="9"></el-option>
                                                <el-option label="验收" value="10"></el-option>
                                                <el-option label="全部" value=""></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item >
                                            <button type="submit" @click="search" class="btn btn-danger">搜索</button>
                                        </el-form-item>
                                    </el-form>
                                    <tableList  @isPage="isPage"  :indexNo="indexNo" :select="select" :width="150" :page_total="page_total" :limit="param.limit" :table_data="table_data" :index_list="index_list" :prop_name="prop_name">
                                    </tableList>
                                </div>
                            </div>
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
                page_total:1,
                createTime:'',
                finalTime:'',
                param:{
                    bizId:'',
                    tradeSerialNo:'',
                    tradeNo:'',
                    userName:'',
                    userType:'',
                    createTimeStart:'',
                    createTimeEnd:'',
                    finishTimeStart:'',
                    finishTimeEnd:'',
                    bizType:'',
                    accountEntry:'',
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
                    {"label":"业务流水号"},
                    {"label":"第三方流水号"},
                    {"label":"用户类型"},
                    {"label":"用户名"},
                    {"label":"交易类型"},
                    {"label":"交易状态"},
                    {"label":"交易金额(元)"},
                    {"label":"账户总金额(元)"},
                    {"label":"可提现金额(元)"},
                    {"label":"订单信息"},
                    {"label":"订单编号"},
                    {"label":"交易开始时间"},
                    {"label":"交易完成时间"},
                    {"label":"来源"},
                ],
                prop_name:["bizId","tradeSerialNo","userType.value","userName","bizType.value","accountEntry","tradeFunds",
                "totalBalance","balance","subject","orderNo","createTime","finishTime","sourceName"],
            }
        },
        components:{
          tableList
        },
        methods:{
            exportExcel(){
                window.open(apiFinance.export_userTradeDetails("?bizId="+this.param.bizId+'&tradeSerialNo='+this.param.tradeSerialNo+'&createTimeStart='+this.param.createTimeStart+
                '&createTimeEnd='+this.param.createTimeEnd+'&finishTimeStart='+this.param.finishTimeStart+'&finishTimeEnd='+this.param.finishTimeEnd+'&userName='+this.param.userName+
                '&userType='+this.param.userType+'&bizType='+this.param.bizType+'&accountEntry='+this.param.accountEntry))
            },
            createTimes(data){
                this.param.createTimeStart=data.split("  至  ")[0];
                this.param.createTimeEnd=data.split("  至  ")[1];
            },
            finalTimes(data){
                this.param.finishTimeStart=data.split("  至  ")[0];
                this.param.finishTimeEnd=data.split("  至  ")[1];
            },
            isPage(data){
                this.param.page=data;
            },
            search(){
                this.init();
            },
            init(){
                apiFinance.user_tradeDetails(this,this.param).then(response=>{
                    if(response.body.data.items){
                        response.body.data.items.forEach(function (v,k) {
                           v.totalBalance=v.totalBalance/100;
                           v.balance=v.balance/100;
                           v.tradeFunds=v.tradeFunds/100;
                           if(!v.source || v.source.length === 0){
                               v.sourceName="未知"
                           }else{
                               v.sourceName=v.source.value;
                           }
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
