<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="panel">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-lg-4">留存率</div>
                        <div class="col-lg-8" style="text-align: right">

                        </div>
                    </div>
                </div>
                <div class="form-inline">
                    <div class="row">
                        <div class="col-lg-2">
                            <div class="panel-body">
                                <a class="btn btn-sm" :class="[param.flag=='day' ? 'btn-danger' : 'btn-primary']" href="javascript:;" @click="dayData('day')">日留存</a>
                                <a class="btn btn-sm" :class="[param.flag=='week' ? 'btn-danger' : 'btn-primary']" href="javascript:;" @click="dayData('week')">周留存</a>
                                <a class="btn btn-sm" :class="[param.flag=='month' ? 'btn-danger' : 'btn-primary']" href="javascript:;" @click="dayData('month')">月留存</a>
                            </div>
                        </div>
                        <div class="col-lg-10">
                            <div class="panel-body" style="text-align: right">
                                <el-form :inline="true">
                                    <el-form-item label="设备">
                                        <el-row>
                                           <el-col :span="12"><div class="grid-content bg-purple">
                                                <el-select  v-model="param.osType"  placeholder="请选择">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="iOS" value="2"></el-option>
                                                    <el-option label="安卓" value="3"></el-option>
                                                </el-select>
                                            </div></el-col>
                                            <el-col :span="12"><div class="grid-content bg-purple-light">
                                                <el-select  v-model="param.userType"  placeholder="请选择">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="律师端" value="1"></el-option>
                                                    <el-option label="用户端" value="2"></el-option>
                                                </el-select>
                                            </div></el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item label="时间段">
                                        <el-row>
                                            <el-col :span="12"><div class="grid-content bg-purple">
                                                <el-date-picker type="date" placeholder="开始时间"  v-model="param.startTime" @change="startTime"></el-date-picker>
                                            </div></el-col>
                                            <el-col :span="12"><div class="grid-content bg-purple-light">
                                                <el-date-picker type="date" placeholder="结束时间"   v-model="param.endTime" @change="endTime"></el-date-picker>
                                            </div></el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-button type="danger" @click="search">搜索</el-button>
                                </el-form>

                            </div>
                        </div>
                    </div>

                    <div class="table-scrollable">
                    <div class="panel-body">
                        <!--表格-->
                        <el-table :data="dataList" v-loading.body="listLoading" border style="width: 100%">
                            <el-table-column >
                                <el-table-column
                                    prop="fistUseDate"
                                    label="首次使用时间"
                                    width="200">
                                </el-table-column>
                                <el-table-column
                                    prop="totalNewVisitNum"
                                    label="新增用户"
                                    width="100">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="留存率">
                                <el-table-column
                                    prop="aliveRate1"
                                    :label="labelList[0]">
                                </el-table-column>
                                <el-table-column
                                    prop="aliveRate2"
                                    :label="labelList[1]">
                                </el-table-column>
                                <el-table-column
                                    prop="aliveRate3"
                                    :label="labelList[2]">
                                </el-table-column>
                                <el-table-column
                                    prop="aliveRate4"
                                    :label="labelList[3]">
                                </el-table-column>
                                <el-table-column
                                    prop="aliveRate5"
                                    :label="labelList[4]">
                                </el-table-column>
                                <el-table-column
                                    prop="aliveRate6"
                                    :label="labelList[5]">
                                </el-table-column>
                                <el-table-column
                                    prop="aliveRate7"
                                    :label="labelList[6]">
                                </el-table-column>
                                <el-table-column
                                    prop="aliveRate8"
                                    :label="labelList[7]">
                                </el-table-column>
                                <el-table-column
                                    prop="aliveRate9"
                                    :label="labelList[8]">
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {userAliveRate} from 'api/usersOperation';
    export default {
        name: 'userOperChartsKeep',
        components: {},
         props: {
            isInit:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                dataList:[],
                param:{
                    osType:'',
                    userType:'',
                    startTime:'',
                    endTime:'',
                    flag:'day',
                    dayNum:'7'
                },
                listLoading: false,
                labelMap:{
                    day:['1天后','2天后','3天后','4天后','5天后','6天后','7天后','14天后','30天后'],
                    week:['1周后','2周后','3周后','4周后','5周后','6周后','7周后','8周后','9周后'],
                    month:['1月后','2月后','3月后','4月后','5月后','6月后','7月后','8月后','9月后']
                },
                dayNumMap:{
                    day:7,
                    week:7*7,
                    month:7*30
                },
                labelList:['1天后','2天后','3天后','4天后','5天后','6天后','7天后','14天后','30天后']
            };
        },
        mounted: function () {
            this.$nextTick(function () {
                if(this.isInit) this.getResource();
            });
        },
        methods: {
            getResource() {
                let param = {}
                for (let k in this.param) {
                    if(this.param[k]){
                        param[k] = this.param[k];
                    }
                }
                this.listLoading = true;
                userAliveRate(this, param).then(function (response) {
                    this.listLoading = false;
                    let body = response.body;
                    if (body && body.code == 1) {
                        this.dataList = body.data;
                        return;
                    }
                    this.$message(body.msg);
                }, function (response) {
                    console.log('error:', response);
                });
            },
            search(){
                this.param.dayNum = '';
                if(this.param.startTime == '' && this.param.endTime == ''){
                    this.param.dayNum = this.dayNumMap[this.param.flag];
                }
                this.getResource();
            },
            startTime(val){
                this.param.startTime = val;
            },
            endTime(val){
                this.param.endTime = val;
            },
            dayData(type){
                this.param.dayNum = '';
                if(this.param.startTime == '' && this.param.endTime == ''){
                    this.param.dayNum = this.dayNumMap[type];
                }
                this.labelList = this.labelMap[type];
                this.param.flag = type;
                this.getResource();
            },
            handleSearch(searchParam){
                if(searchParam) {
                    for (let k in searchParam) {
                        this.param[k] = searchParam[k];
                    }
                }
                 this.getResource();
            }
        }
    }
</script>
