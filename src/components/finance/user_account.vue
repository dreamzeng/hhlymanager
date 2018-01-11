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
                                <div class="col-md-4">用户账户</div>
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
                                        <el-form-item label="用户ID">
                                            <el-input @keyup.13.native="search" type="text" v-model="param.userId"></el-input>
                                        </el-form-item>
                                        <el-form-item label="最小提现金额(元)">
                                            <el-input  @keyup.13.native="search" type="text" v-model="param.minUsableBalance"></el-input>
                                        </el-form-item>
                                        <el-form-item >
                                            <button type="submit" @click="search" class="btn btn-danger">搜索</button>
                                        </el-form-item>
                                    </el-form>
                                    <tableList  @isPage="isPage"  :indexNo="indexNo" :select="select"  :page_total="page_total" :limit="param.limit" :table_data="table_data" :index_list="index_list" :prop_name="prop_name">
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
<script>
    import tableList from 'components/finance/Ele-table.vue'
    import apiFinance from 'api/finance';
    export default {
        data() {
            return {
                indexNo:true,
                select:false,
                page_total:1,
                param:{
                    userId:'',
                    userName:'',
                    minUsableBalance:'',
                    limit:10,
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
                    {"label":"用户ID"},
                    {"label":"用户名"},
                    {"label":"可提现金额(元)"},
                    {"label":"冻结金额(元)"},
                    {"label":"待收金额(元)"},
                    {"label":"账户总金额(元)"},
                ],
                prop_name:["userId","userName","usableBalance","freezeaBalance","pendingBalance","accountBalance"],
            }
        },
        components:{
          tableList
        },
        methods:{
            exportExcel(){
//                console.log(apiFinance.export_userAccountList("?userId="+this.param.userId+'&userName='+this.param.userName+'&minUsableBalance='+(this.param.minUsableBalance*100).toFixed(0)));
                window.open(apiFinance.export_userAccountList("?userId="+this.param.userId+'&userName='+this.param.userName+'&minUsableBalance='+(this.param.minUsableBalance*100).toFixed(0)))
            },
            isPage(data){
                this.param.page=data;
            },
            search(){
                this.init();
            },
            init(){
                let data={};
                if(this.param.minUsableBalance>0){
                   data={
                       userId:this.param.userId,
                       userName:this.param.userName,
                       minUsableBalance:(this.param.minUsableBalance*100).toFixed(0),
                       limit:this.param.limit,
                       page:this.param.page,
                   }
                }else{
                    data=this.param
                }
                apiFinance.user_accountList(this,data).then(response=>{
                    if(response.body.data.items && response.body.code === 1){
                        response.body.data.items.forEach(function (v,k) {
                           v.usableBalance=v.usableBalance/100;
                           v.freezeaBalance=v.freezeaBalance/100;
                           v.pendingBalance=v.pendingBalance/100;
                            v.accountBalance=v.accountBalance/100;
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
