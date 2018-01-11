<template>
    <!--main content start-->
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
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeStart" @change="starTimeChang" style="width: 150px;"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="结束时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.createTimeEnd" @change="endTimeChang" style="width: 150px;"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="审核状态">
                                                <el-select v-model="param.examineState" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="审核中" value="1"></el-option>
                                                    <el-option label="审核通过" value="2"></el-option>
                                                    <el-option label="审核不通过" value="-1"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="律师姓名">
                                                <el-input v-model="param.lawyerName" placeholder="律师姓名" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="电话号码">
                                                <el-input v-model="param.lawyerPhone" placeholder="电话号码" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="服务内容">
                                                <el-input v-model="param.name" placeholder="服务内容" @keyup.enter.native="search" style="width: 150px;"></el-input>
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
                                        <el-table-column prop="lawyerId" label="律师ID">
                                        </el-table-column>
                                        <el-table-column prop="lawyerName" label="律师姓名">
                                        </el-table-column>
                                        <el-table-column prop="lawyerPhone" label="电话号码">
                                        </el-table-column>
                                        <el-table-column prop="name" label="服务内容">
                                        </el-table-column>
                                        <el-table-column label="价格">
                                            <template slot-scope="item">
                                                {{item.row.priceConfirm == 0 ? item.row.priceStart : item.row.priceStart + '-' + item.row.priceEnd  }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="审核状态">
                                            <template slot-scope="item">
                                                <el-tag
                                                    :type="item.row.examineState && (item.row.examineState.code == '1' ? 'warning' : item.row.examineState.code == '2' ? 'success' : 'danger') || '' "
                                                    close-transition>{{item.row.examineState && item.row.examineState.value}}</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="updateTime" label="修改时间">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" v-if="false">
                                            <template slot-scope="item">
                                                <button title="通过" v-if="item.row.examineState.code == '1' || item.row.examineState.code == '-1'" class="btn btn-primary btn-xs" @click="examine(item.row,2)">通过</button>
                                                <button title="审核不通过" v-if="item.row.examineState.code == '1' || item.row.examineState.code == '2'" class="btn btn-danger btn-xs" @click="examine(item.row,-1)">审核不通过</button>
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
    import apiCase from 'api/case';
    import apiOperaCon from 'api/operationControl';

    export default {
        name: 'caseTypeList',
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
                    createTimeEnd: '',
                    examineState:'',
                    lawyerName:'',
                    lawyerPhone:'',
                    name:''
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
                apiOperaCon.lawyerList(this, param).then(function (response) {
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
            examine: function(item,type){
                $('#list-content').mLoading("show");
                apiOperaCon.lawyerPut(this, {
                    id:item.id,
                    examineState:type
                }).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            }
        }
    }
    //
</script>
