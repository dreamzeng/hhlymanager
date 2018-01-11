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
                        <li class="active">用户路径分析</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <router-link :to="{name: 'statistics_path_analyse_charts'}">
                        <el-tag class="activeTag">点击事件</el-tag>
                    </router-link>
                    <router-link :to="{name: 'statistics_path_page'}">
                        <el-tag>页面事件</el-tag>
                    </router-link>
                    <router-link :to="{name: 'statistics_path_behavior'}">
                        <el-tag>行为事件</el-tag>
                    </router-link>
                </div>
            </div>

            <div class="panel">
                <div class="panel-body">
                   <el-form ref="param" :model="param" :rules="formRules" :inline="true">
                       <el-form-item label="选择APP">
                            <el-select v-model="param.sourceType" placeholder="请选择App">
                                 <el-option
                                    v-for="item in sourceList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="选择页面">
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                       <el-form-item>
                                            <el-select v-model="param.behaviorId" placeholder="行为" @change="getUserPagesByBehaviorId(param.behaviorId)">
                                                <el-option
                                                    v-for="item in userBehaviors"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <el-form-item>
                                            <el-select v-model="param.pagesId" placeholder="页面">
                                                <el-option
                                                    v-for="item in userPages"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="时间段" required>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item  prop="startTime">
                                            <el-date-picker 
                                                type="date" 
                                                placeholder="开始时间" 
                                                style="width: 200px;"  
                                                v-model="param.startTime" 
                                                @change="startTime"></el-date-picker>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <el-form-item  prop="endTime">
                                            <el-date-picker
                                                type="date"
                                                placeholder="结束时间"
                                                style="width: 200px;"
                                                v-model="param.endTime"
                                                @change="endTime"></el-date-picker>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-button type="danger" @click="search('param')">搜索</el-button>
                    </el-form>
                </div>
            </div>
            <charts-units ref="pathAnalyseCharts" :apiAct="pathAnalyseApi.getClick" :isInit="isInit" v-on:getAsync="getAsync">
                <div class="row" slot="header">
                    <div class="col-lg-4">点击事件管理</div>
                </div>
            </charts-units>

            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-body">
                            <!--表格-->
                            <el-table :data="dataList" v-show="labelList.length > 7" v-loading.body="listLoading" border style="width: 100%">
                                <el-table-column
                                    fixed
                                    prop="source"
                                    width="200">
                                </el-table-column>
                                <el-table-column 
                                    v-for="(item, index) in labelList"
                                    :label="item"
                                    :key="index"
                                    width="200">
                                    <template slot-scope="scope">
                                        {{scope.row.data[index]}}
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-table :data="dataList" v-show="labelList.length <= 7"  v-loading.body="listLoading" border style="width: 100%">
                                <el-table-column
                                    prop="source">
                                </el-table-column>
                                <el-table-column 
                                    v-for="(item, index) in labelList"
                                    :label="item"
                                    :key="index">
                                    <template slot-scope="scope">
                                        {{scope.row.data[index]}}
                                    </template>
                                </el-table-column>
                            </el-table>
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
    import {pathAnalyseApi} from 'api/statistics';
    import chartsUnits from 'components/statistics/charts_units';
    
    const formatDate = ()=>{
        let d = new Date();
        let y =  d.getFullYear();
        let m = d.getMonth()+1;
        let day =  d.getDate();

        return y+'-'+m+'-'+day;
    };
    export default {
        name: 'pathAnalyse',
        components: {chartsUnits},
        data() {
            return {
                isInit:false,
                pathAnalyseApi,
                param:{
                    sourceType:'3',
                    behaviorId:'',// 用户行为ID
                    pagesId:'',//统计的页面ID
                    startTime:formatDate(),//统计开始时间
                    endTime:formatDate()//统计结束时间
                },
                formRules:{
                    startTime: [
                        { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    endTime: [
                        { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                    ]
                },
                sourceList:[/*{
                    value: '1',
                    label: '律师端APP-IOS'
                },{
                    value: '2',
                    label: '律师端APP-安卓'
                },*/{
                    value: '3',
                    label: '用户端APP-IOS'
                },{
                    value: '4',
                    label: '用户端APP-安卓'
                }],
                userBehaviors:[],
                userPages:[],

                dataList:[],
                listLoading: false,
                labelList:[formatDate()]
            };
        },
         mounted: function () {
            this.$nextTick(function () {
               if(this.userBehaviors.length == 0) this.getUserBehaviors();
            });
        },
        methods: {
            getUserBehaviors(){
                pathAnalyseApi.getUserBehaviors(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        for(let i = 0, l = data.length; i < l; i++ ){
                            this.userBehaviors.push({
                                value: data[i]['id']+'',
                                label:  data[i]['behaviorName']
                            });
                            if(this.param.behaviorId == ''){
                                this.param.behaviorId = data[i]['id']+'';
                            }
                        }
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            getUserPagesByBehaviorId(id){
                pathAnalyseApi.getUserPagesByBehaviorId(this,{bId:id}).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.userPages = [];
                        for(let i = 0, l = data.length; i < l; i++ ){
                            this.userPages.push({
                                value: data[i]['id']+'',
                                label:  data[i]['functionDescribe']
                            });
                            if(i == 0){
                                this.param.pagesId = data[i]['id']+'';
                            }
                        }
                        this.search('param');
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },

            startTime(val){
                this.param.startTime = val;
            },
            endTime(val){
                this.param.endTime = val;
            },
            search(formName){
                let pathAnalyseCharts = this.$refs.pathAnalyseCharts;
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        pathAnalyseCharts.chart(_this.param);
                        _this.listLoading = true;
                    }
                    return false;
                });
            },
            getAsync(async){
                this.dataList = async && async.yaxis;
                this.labelList = async && async.xaxis;
                this.listLoading = false;
            }
        }
    }
</script>
