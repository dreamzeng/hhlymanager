<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">资讯管理</li>
                        <li class="active">评论审核</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">评论审核</div>
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
                                            <el-form-item class="el-form-item-rest" label="开始时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeStart" @change="starTimeChang"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="结束时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeEnd" @change="endTimeChang"></el-date-picker>
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
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column
                                            type="index"
                                            width="100"
                                            label="序号">
                                        </el-table-column>
                                        <!--<el-table-column prop="commentId" label="commentId">
                                        </el-table-column>-->
                                        <el-table-column prop="articleTitle" label="标题">
                                        </el-table-column>
                                        <el-table-column label="来源">
                                            <template slot-scope="item">
                                                {{item.row.commentCreator || '' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="commentContent" label="评论内容">
                                        </el-table-column>
                                        <el-table-column label="状态">
                                            <template slot-scope="item">
                                                {{item.row.showFlag && item.row.showFlag.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建日期">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="260">
                                            <template slot-scope="item">
                                                <button title="隐藏" v-if="item.row.showFlag && item.row.showFlag.code == 1" class="btn btn-danger btn-xs" @click="doAction({commentId:item.row.commentId,showFlag:0},'update','是否隐藏?')">隐藏</button>
                                                <button title="显示" v-if="item.row.showFlag && item.row.showFlag.code == 0"  class="btn btn-info btn-xs" @click="doAction({commentId:item.row.commentId,showFlag:1},'update','是否显示?')">显示</button>
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

<style scoped>
    .activeTag{
        color: #FFF;background: #2185D0
    }
</style>

<script>
    import Page from 'components/common/Page';
    import {comment} from 'api/info';

    export default {
        name: 'advertCentreList',
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
                    createTimeStart:'',
                    createTimeEnd: ''
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
            starTimeChang: function (val) {
                this.param.createTimeStart = val;
            },
            endTimeChang: function(val) {
                this.param.createTimeEnd = val;
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
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
                comment.list(this, param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        this.dataList = data.items;
                        return;
                    }
                    this.$message(body.msg);
                }, function (response) {
                    console.log('error:', response);
                });
            },
            doAction: function(param,action,msg){
                let _this = this;
                this.$confirm(msg, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    comment[action](_this,param).then(function (response) {
                        let body = response.body;
                        _this.$message(body.msg);
                        if (body && body.code == 1) {
                            _this.getResource(_this.todopage.page, _this.todopage.limit);
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }).catch(() => {

                });
            }
        }
    }
    //
</script>
