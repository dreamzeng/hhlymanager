<template>

    <!--main content start-->
    <div :id="isMainContent == true ? 'main-content': '' ">
        <div class="wrapper">
            <div class="row" v-if="isMainContent">
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
            <div class="panel" v-if="isMainContent">
                <div class="panel-body">
                    <a href="javascript:;" @click="changeUser('new','新增用户数','历史总共新增')">
                        <el-tag :class="{ activeTag : userType=='new' }">新增用户数</el-tag>
                    </a>
                    <a href="javascript:;" @click="changeUser('newRegister','新增注册数','历史新增注册用户数')">
                        <el-tag :class="{ activeTag : userType=='newRegister' }">新增注册数</el-tag>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            -
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="inbox-head" style="background: #00a8b3;">
                                        <div style="text-align: right">
                                            <div style="font-size: 34px">{{today}}人</div>
                                            <div>今日新增</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="inbox-head">
                                        <div style="text-align: right">
                                            <div style="font-size: 34px">{{total}}人</div>
                                            <div>{{addNewUsers}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-lg-4">{{text}}</div>
                                <div class="col-lg-8" style="text-align: right">
                                    <a href="javascript:;" @click="changeDevice(3)"><el-tag :class="{activeTag : param.OsType == 3}">Android</el-tag></a>
                                    <a href="javascript:;" @click="changeDevice(2)"><el-tag :class="{activeTag : param.OsType == 2}">IOS</el-tag></a>
                                </div>
                            </div>
                        </div>
                        <div class="form-inline" id="list-content">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="panel-body">
                                        <a :class="['btn',dtype=='day' ? 'btn-danger' : 'btn-primary','btn-sm']" href="javascript:;" @click="dayData(1,'今日新增数','day')">今日新增数</a>
                                        <a :class="['btn',dtype=='week' ? 'btn-danger' : 'btn-primary','btn-sm']" href="javascript:;" @click="dayData(7,'最近7日新增','week')">最近7日新增</a>
                                        <a :class="['btn',dtype=='month' ? 'btn-danger' : 'btn-primary','btn-sm']" href="javascript:;" @click="dayData(30,'最近30日新增','month')">最近30日新增</a>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="panel-body" style="text-align: right">
                                        <el-form  ref="param" :model="param" :rules="formRules" :inline="true">
                                            <el-form-item label="时间段" required>
                                                <el-row>
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple">
                                                            <el-form-item  prop="startTime">
                                                                 <el-date-picker type="date" placeholder="开始时间" style="width: 200px;"  v-model="param.startTime" @change="startTime"></el-date-picker>
                                                            </el-form-item>
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple-light">
                                                            <el-form-item  prop="endTime">
                                                                <el-date-picker type="date" placeholder="结束时间"  style="width: 200px;"  v-model="param.endTime" @change="endTime"></el-date-picker>
                                                            </el-form-item>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-button type="danger" @click="search('param')">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <mix-charts :options="bar" ref="bar" auto-resize ></mix-charts>
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
    import apiUsersCharts from 'api/usersCharts';
    import mixCharts from 'components/common/charts/mixCharts';
    import {yType,legend,xAxis,initial} from 'components/common/charts/index';

    export default {
        name: 'usersCharts',
        components: {mixCharts},
        props: {
            isMainContent:{
                type:Boolean,
                default:true
            }
        },
        data: function () {
            return {
                bar: initial,
                chartsText:'今日新增数',
                today:'',
                total:'',
                userType:'new',
                text:'今日新增',
                addNewUsers:'历史总共新增',
                actMap:{
                    new:{
                        list:'newUserList',
                        countNum:'countVisiterNum'
                    },
                    newRegister:{
                        list:'newRegisterList',
                        countNum:'countRegisterNum'
                    }
                },
                param: {
                    OsType:'3', //访问终端
                    dayNum:'1',
                    startTime:'',
                    endTime:''
                },
                formRules:{
                    startTime: [
                        { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    endTime: [
                        { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                    ]
                },
                dtype:''
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init(){
                this.chart();
            },
            chart(){
                let param = {};
                for (let k in this.param) {
                    if(this.param[k] != ''){
                        param[k] = this.param[k];
                    }
                }
                let bar = this.$refs.bar;
                bar.showLoading();
                let _this = this;
                let act = this.actMap[this.userType];
                apiUsersCharts[act['list']](this,param).then(response=> {
                    let body = response.body;
                    bar.hideLoading();
                    if (body && body.code == 1) {
                        let yaxis = body.data.yaxis;
                        if (yaxis.length <= 0) {
                            _this.$message('暂无数据');
                            return;
                        }
                        let nameList = [], series = [];
                        for (let i = 0, l = yaxis.length; i < l; i++) {
                            nameList.push(yaxis[i]['source']);
                            series.push(yType(yaxis[i]['source'], yaxis[i]['data']));
                        }

                        let async = {
                            title: {
                                text: _this.chartsText
                            },
                            legend: legend(nameList),
                            xAxis: xAxis(body.data.xaxis),
                            yAxis: {
                                axisLabel: {show: true}
                            },
                            series: series
                        };
                        bar.mergeOptions(async);
                        return;
                    }
                    _this.$message(body.msg);
                }, response=>{
                    console.log('error:', response);
                });
                apiUsersCharts[act['countNum']](this,param).then(response=>{
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.today = data.todayNum || 0;
                        this.total = data.totalNum || 0;
                        return;
                    }
                    _this.$message(body.msg);
                }, response=> {
                    console.log('error:', response);
                });
            },
            restTime(){
                this.param['startTime'] = '';
                this.param['endTime'] = '';
            },
            dayData(val,text,dtype){
                this.restTime();
                this.param.dayNum = val;
                this.chartsText = text;
                this.dtype = dtype;
                this.chart();
            },
            changeDevice(val){
                this.param.OsType = val;
                this.chart();
            },
            startTime(val){
                this.param.startTime = val;
            },
            endTime(val){
                this.param.endTime = val;
            },
            changeUser(val,text,addNewUsers){
                this.param.OsType = 3;
                this.userType = val;
                this.text = text;
                this.addNewUsers = addNewUsers;
                this.chart();
            },
            search(formName){
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.param.dayNum = '';
                        _this.chartsText = _this.param.startTime+'---'+_this.param.endTime;
                        _this.chart();
                    }
                    return false;
                });
            },
            handleSearch(val,text,addNewUsers,searchParam){
                if(searchParam) {
                    for (let k in searchParam) {
                        this.param[k] = searchParam[k];
                    }
                }
                this.changeUser(val,text,addNewUsers);
            }
        }
    }
</script>
