<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li><router-link :to="{name:'live_list'}">活动管理</router-link></li>
                        <li class="active">直播活动人员</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4"><label style="color: #FF6C60">{{liveTitle}}</label> 人员审核</div>
                                <div class="col-md-6" style="text-align: right">
                                    <label style="margin-right: 5px; display: inline-block;">活动总人数：<span style="color:#FF6C60">{{patent.activityTotalNumber}}</span></label>
                                    <label style="margin-right: 5px; display: inline-block;">报名人数：<span style="color:#FF6C60">{{patent.activityRegisterNumber}}</span></label>
                                    <label style="margin-right: 5px; display: inline-block;">审核通过人数：<span style="color:#FF6C60">{{patent.activityPassNumber}}</span></label>
                                    <label style="margin-right: 5px; display: inline-block;">待审核人数：<span style="color:#FF6C60">{{patent.inAuthNumber}}</span></label>
                                </div>

                                <div class="col-md-2" style="text-align: right">
                                    <a class="btn btn-info  btn-sm" @click="auditList(1)">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        批量通过
                                    </a>
                                    <a class="btn btn-danger  btn-sm" @click="auditList(2)">
                                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                        批量拒绝
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item class="el-form-item-rest" label="审核状态">
                                                <el-select v-model="param.state" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="未审核" value="0"></el-option>
                                                    <el-option label="审核成功" value="1"></el-option>
                                                    <el-option label="已拒绝" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%" @selection-change="handleSelectionChange">
                                        <el-table-column type="selection" >
                                        </el-table-column>
                                        <el-table-column label="背景图" width="90">
                                            <template slot-scope="item">
                                                <img alt="" :src="item.row.user.logo" style="width: 50px;height: 50px">
                                            </template>
                                        </el-table-column>
                                        <el-table-column  label="姓名" width="380">
                                            <template slot-scope="item">
                                                {{item.row.user.realName}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="电话" width="180">
                                            <template slot-scope="item">
                                                {{item.row.user.phone}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="用户类别"  width="180">
                                            <template slot-scope="item">
                                                {{item.row.type == 'Lawyer' ? '律师':'用户' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="执业证号" width="180">
                                            <template slot-scope="item">
                                                {{item.row.lawyerDetail && item.row.lawyerDetail.code}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="任职律师所" width="180">
                                            <template slot-scope="item">
                                                {{item.row.lawyerDetail && item.row.lawyerDetail.company}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="审核">
                                            <template slot-scope="item" v-html="">
                                                <i v-if="item.row.playSignRecord.state == 0 ">未审核</i>
                                                <i class="icon-check-sign" v-if="item.row.playSignRecord.state == 1">审核成功</i>
                                                <i class="icon-remove" v-if="item.row.playSignRecord.state == 2">已拒绝</i>
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="100">
                                            <template slot-scope="item">
                                                <button title="通过" class="btn btn-primary btn-xs"  v-if="item.row.playSignRecord.state == 2 || item.row.playSignRecord.state == 0" @click="audit(item.row.playSignRecord.id,1)"><i class="icon-check-sign"></i></button>
                                                <button title="拒绝" class="btn btn-danger btn-xs"  v-if="item.row.playSignRecord.state == 1 || item.row.playSignRecord.state == 0" @click="audit(item.row.playSignRecord.id,2)"><i class="icon-remove"></i></button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>
<script>
    import Page from 'components/common/Page';
    import apiLive from 'api/live';

    export default {
        name: 'liveAuditUserList',
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
                    state:''//审核状态
                },
                multipleSelection: [], //多项选择
                patent:{},
                liveId:'',
                liveTitle:'',
                rowItemId: -9999,
                message: '',
                title: '是否删除该条信息? '
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.liveTitle = this.liveTitle || this.$route.params.title;
            });
        },
        methods: {
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                this.liveId = this.liveId || this.$route.params.id;
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;

                for (let k in this.param) {
                    if(this.param[k]){
                        param[k] = this.param[k];
                    }
                }
                $('#list-content').mLoading("show");
                apiLive.liveAuditUserList(this,this.liveId,param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        this.dataList = data.items;
                        this.patent = data.patent;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            audit: function(id,state){
                $('#list-content').mLoading("show");
                apiLive.liveAuditUserPut(this,this.liveId,id,{state:state}).then(function (response) {
                    let body = response.body;
                    apiLive.tips(this, {message: body.msg});
                    this.getResource(1, this.todopage.limit);
                }, function (response) {
                    console.log('error:', response);
                });
            },
            handleSelectionChange:function(val) {
                this.multipleSelection = [];
                for(let i = 0,l = val.length;i<l;i++){
                    if(val[i]['playSignRecord'] && val[i]['playSignRecord']['id']){
                        this.multipleSelection.push(val[i]['playSignRecord']['id']);
                    }
                }
            },
            auditList:function(state){
                let multipleSelection = this.multipleSelection;
                if(multipleSelection.length == 0){
                    apiLive.tips(this, {message: '请选择要审核的信息'});
                    return;
                }
                $('#list-content').mLoading("show");
                apiLive.batchAudit(this,this.liveId,{state:state,playSignIds:multipleSelection.toString()}).then(function (response) {
                    let body = response.body;
                    apiLive.tips(this, {message: body.msg});
                    this.getResource(1, this.todopage.limit);
                    this.multipleSelection = [];
                }, function (response) {
                    console.log('error:', response);
                });
            }
        }
    }
    //
</script>
