<template>
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">财务管理</li>
                        <li class="active">提现审核管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">提现审核管理</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <button type="button" class="btn btn-info" @click="exportExcel">导出</button>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <el-form :inline="true" :model="param">
                                        <el-form-item label="提现流水号">
                                            <el-input @keyup.enter.native="search" type="text" v-model="param.bizId"></el-input>
                                        </el-form-item>
                                        <el-form-item label="用户名">
                                            <el-input @keyup.enter.native="search" type="text" v-model="param.userName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="状态">
                                            <el-select v-model="param.tradeStatus">
                                                <el-option label="全部" value=""></el-option>
                                                <el-option label="待审核" value="2"></el-option>
                                                <el-option label="审核失败" value="3"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="申请提现时间">
                                            <el-date-picker v-model="time" @change="chooseTime" range-separator="  至  " type="datetimerange" :picker-options="pickerOptions" placeholder="选择时间范围" align="right">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="提现银行">
                                            <el-input @keyup.enter.native="search" type="text" v-model="param.bankName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="银行卡号">
                                            <el-input @keyup.enter.native="search" type="text" v-model="param.bankCardNo"></el-input>
                                        </el-form-item>
                                        <el-form-item label="真实姓名">
                                            <el-input @keyup.enter.native="search" type="text" v-model="param.realName"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <button type="submit" @click="search" class="btn btn-danger">搜索</button>
                                            <button type="button"  class="btn btn-info" @click="click(4)">批量审核</button>
                                        </el-form-item>
                                    </el-form>
                                    <tableList @isPage="isPage"  ref="table" :indexNo="indexNo" :select="select" :width="170" :page_total="page_total" :limit="param.limit" :table_data="table_data" :index_list="index_list" :prop_name="prop_name">
                                        <el-table-column  label="操作" fixed="right" width="230">
                                            <template slot-scope="scope">
                                                <div>
                                                    <button class="btn btn-success btn-xs" v-if="scope.row.tradeStatus.code === 2" @click="click(1,scope.row)">审核</button>
                                                    <button class="btn btn-danger btn-xs" @click="click(2,scope.row)">备注</button>
                                                    <button class="btn btn-primary btn-xs" @click="click(3,scope.row)">查看详情</button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </tableList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog  v-model="isShow" size="tiny" :title="title">
                <div class="height" v-if="isType===1 || isType === 3">
                    <el-form :model="info">
                        <el-form-item label="提现流水号:">
                            {{info.bizId}}
                        </el-form-item>
                        <el-form-item label="用户ID:">
                            {{info.userId}}
                        </el-form-item>
                        <el-form-item label="用户名:">
                            {{info.userName}}
                        </el-form-item>
                        <el-form-item label="提现银行:">
                            {{info.bankName}}
                        </el-form-item>
                        <el-form-item label="银行卡号:">
                            {{info.bankCardNo}}
                        </el-form-item>
                        <el-form-item label="真实姓名:">
                            {{info.realName}}
                        </el-form-item>
                        <el-form-item label="申请提现金额:">
                            {{info.tradeFunds/100}}元
                        </el-form-item>
                        <el-form-item label="实际提现金额:">
                            {{info.toActualFunds/100}}元
                        </el-form-item>
                        <el-form-item label="平台承担手续费:">
                            {{info.sysProceduresFee/100}}元
                        </el-form-item>
                        <el-form-item label="申请提现时间:">
                            {{info.createTime}}
                        </el-form-item>
                        <el-form-item label="状态:">
                            {{info.tradeStatus.value}}
                        </el-form-item>
                        <el-form-item label="备注:">
                            {{info.remark}}
                        </el-form-item>
                        <el-form-item v-if="isSay">
                            <div>
                                <el-radio  v-model="radio" label="1">审核通过</el-radio>
                                <el-radio  v-model="radio" label="-1">审核不通过</el-radio>
                            </div>
                        </el-form-item>
                        <el-form-item label="审核说明:">
                            <el-input style="width: 300px" type="textarea"  autosize  placeholder="请输入100字以内的审核说明" v-model="desc" :maxlength="100" v-if="isType === 1"></el-input>
                            <div v-if="isType === 3">
                                {{info.extends1}}
                            </div>
                        </el-form-item>
                        <el-form-item v-if="isSay">
                            <div style="text-align: center">
                                <el-button type="primary" @click="confirm">审核确认</el-button>
                                <el-button @click="isShow=false">取消</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div  v-else style="text-align: center">
                    <div v-if="isType === 4" style="margin-bottom: 20px">
                        <el-radio  v-model="radio1" label="1">审核通过</el-radio>
                        <el-radio  v-model="radio1" label="-1">审核不通过</el-radio>
                    </div>
                    <el-input
                        @keyup.13.native="submit(isType)"
                        v-if="isType === 4"
                        style="padding-left: 50px;padding-right: 50px"
                        type="textarea"
                        :row="5"
                        placeholder="请输入100以内的审核说明"
                        v-model="allDesc" :maxlength="100">
                    </el-input>
                    <el-input
                        @keyup.13.native="submit(isType)"
                        v-if="isType === 2"
                        style="padding-left: 50px;padding-right: 50px"
                        type="textarea"
                        :row="5"
                        placeholder="请输入20以内的备注"
                        v-model="remark" :maxlength="20">
                    </el-input>
                    <div style="margin-top: 20px">
                        <el-button type="primary" @click="submit(isType)">确定</el-button>
                        <el-button @click="isShow=false">取消</el-button>
                    </div>
                </div>
            </el-dialog>
            <el-dialog v-model="chooseModel" title="选择银行模板">
                <div style="text-align: center">
                    <el-radio v-model="chooseRadio" label="1">招商银行</el-radio>
                    <el-radio v-model="chooseRadio" label="2">建设银行</el-radio>
                    <el-radio v-model="chooseRadio" label="3">工商银行</el-radio>
                    <el-radio v-model="chooseRadio" label="4">中国银行</el-radio>
                    <el-radio v-model="chooseRadio" label="0">全部数据</el-radio>
                    <div style="margin-top: 20px">
                        <el-button type="primary" @click="sureExport">确认导出</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<style scoped>
    .height{
        height: 600px;
        overflow-y: scroll;
    }
</style>
<script>
    import tableList from 'components/finance/Ele-table.vue'
    import apiFinance from 'api/finance';
    export default {
        data() {
            return {
                chooseModel:false,
                chooseRadio:'1',
                list:[],
                isShow:false,
                indexNo:true,
                select:true,
                isSay:false,
                isType:'',
                title:'',
                multipleSelection: [],
                desc:'',
                radio:'1',
                radio1:'1',
                tradeId:'',
                time:'',
                page_total:0,
                allDesc:'',
                remark:'',
                info:{
                    bizId:'',
                    userId:'',
                    userName:'',
                    bankName:'',
                    bankCardNo:'',
                    realName:'',
                    tradeFunds:'',
                    toActualFunds:'',
                    sysProceduresFee:'',
                    createTime:'',
                    tradeStatus:'',
                    remark:'',
                    extends1:''
                },
                param:{
                    bizId:'',
                    tradeStatus:'',
                    userName:'',
                    applyTimeStart:'',
                    applyTimeEnd:'',
                    bankName:'',
                    bankCardNo:'',
                    realName:'',
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
                    {"label":"提现流水号"},
                    {"label":"用户名"},
                    {"label":"真实姓名"},
                    {"label":"提现银行"},
                    {"label":"银行卡号"},
                    {"label":"申请提现金额(元)"},
                    {"label":"账户可提现余额(元)"},
                    {"label":"实际提现金额(元)"},
                    {"label":"手续费(元)"},
                    {"label":"申请提现时间"},
                    {"label":"状态"},
                    {"label":"备注"},
                ],
                prop_name:["bizId","userName","realName","bankName","bankCardNo","tradeFunds","balance",
                    "toActualFunds","sysProceduresFee","createTime","tradeStatus.value","remark"],
            }
        },
        components:{
            tableList
        },
        methods:{
            sureExport(param){
                    window.open(apiFinance.export_withdrawData()+this.list.join(",")+"&template="+this.chooseRadio);
            },
            exportExcel(){
                let data=[],multipleSelection=this.$refs.table.multipleSelection;
                if(multipleSelection.length === 0){
                    this.$alert('请选择导出条目', '注意事项', {
                        confirmButtonText: '确定',
                    });
                }else{
                    this.chooseModel=true;
                    multipleSelection.forEach(function (v,k) {
                        if(v.tradeId){
                            data.push(v.tradeId)
                        }
                    });
                    this.list=data;
                }
            },
            submit(type){
                if(type === 2){
                    apiFinance.setting_remark(this,{remark:this.remark,tradeId:this.tradeId}).then(response=>{
                        if(response.body.code === 1){
                            this.$message("添加备注成功！！！");
                            this.init();
                            this.isShow=false;
                        }else{
                            this.$message(response.body.msg)
                        }
                    })
                }else{
                    let data=[],param={},isContinue=[],multipleSelection=this.$refs.table.multipleSelection;
                    if(multipleSelection.length === 0){
                        this.$alert('请勾选条目', '注意事项', {
                            confirmButtonText: '确定',
                        });
                    }else{
                        multipleSelection.forEach(function (v,k) {
                            if(v.tradeId){
                                data.push(v.tradeId)
                            }
                            if(v.tradeStatus.code === 2){
                                isContinue.push(1)
                            }else{
                                isContinue.push(0)
                            }
                        });
                        Array.prototype.isHasTrue=function (data) {
                            for(let i in this){
                                if(this[i] === data) return true
                            }
                            return false
                        };
                        if(isContinue.isHasTrue(0)){
                            this.$alert('选取的订单有误', '注意事项', {
                                confirmButtonText: '确定',
                            });
                        }else{
                            param={
                                tradeIds:data,
                                auditDesc:this.allDesc,
                                auditResult:parseInt(this.radio1)
                            };
                            apiFinance.batch_withdrawAudit(this,JSON.stringify(param)).then(response=>{
                                this.init();
                                this.isShow=false;
                            })
                        }
                    }
                }
            },
            chooseTime(data){
                this.param.applyTimeStart=data.split("  至  ")[0];
                this.param.applyTimeEnd=data.split("  至  ")[1]
            },
            confirm(){
                apiFinance.single_withdrawAudit(this,{tradeId:this.tradeId,auditDesc:this.desc,auditResult:parseInt(this.radio)}).then(response=>{
                        if(response.body.code === 1){
                            this.init();
                            this.isShow=false;
                            this.$message("审核成功~！！！")
                        }else{
                            this.$message(response.body.msg)
                        }
                })
            },
            click(type,data){
                if(data){
                    this.tradeId=data.tradeId;
                }
                this.isShow=true;
                this.isType=type;
                if(type === 1){
                    this.title="审核";
                    this.isSay=true;
                    this.desc="";
                    this.radio="1";
                    this.info={
                        bizId:'',
                        userId:'',
                        userName:'',
                        bankName:'',
                        bankCardNo:'',
                        realName:'',
                        tradeFunds:'',
                        toActualFunds:'',
                        sysProceduresFee:'',
                        createTime:'',
                        tradeStatus:'',
                        remark:'',
                        extends1:''
                    };
                    this.detail(data.tradeId)
                }else if(type === 2){
                    this.title="备注";
                    this.remark=data.remark;
                }else if(type === 3){
                    this.isSay=false;
                    this.title="审核详情";
                    this.detail(data.tradeId)
                }else if(type === 4){
                    this.title="批量审核";
                    this.radio1="1";
                    this.allDesc="";
                }
            },
            detail(id){
                apiFinance.withdraw_detail(this,id).then(response=>{
                    this.info=response.body.data
                })
            },
            isPage(data){
                this.param.page=data;
            },
            search(){
              this.init();
            },
            init(){
                let _this=this;
                apiFinance.auditing_withdrawList(this,this.param).then(response=>{
                    let list=[];
                    if(response.body.code === 1){
                        response.body.data.items.forEach(function (v,k) {
                            v.tradeFunds=v.tradeFunds/100;
                            v.balance=v.balance/100;
                            v.toActualFunds=v.toActualFunds/100;
                            v.sysProceduresFee=v.sysProceduresFee/100;
                        });
                        this.table_data=response.body.data.items;
                        this.page_total=response.body.data.total;
                    }else{
                        this.$message(response.body.msg)
                    }
                })
            }
        },
        mounted(){
            this.init()
        },
        watch:{
            "param.page"(to,from){
                this.init();
            }
        }
    }
</script>
