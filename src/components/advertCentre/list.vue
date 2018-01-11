<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">广告中心</li>
                        <li class="active">banner管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">全部banner</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link class="btn btn-info btn-sm" :to="{name: 'advert_centre_add'}">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        添加
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item class="el-form-item-rest" label="应用类型">
                                                <el-select v-model="param.advertType" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option
                                                        v-for="item in types"
                                                        :key="item.code"
                                                        :label="item.value"
                                                        :value="item.code">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="banner名称">
                                                <el-input v-model="param.title" placeholder="banner名称" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="开始时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.validTimeStart" @change="starTimeChang"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="结束时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.validTimeEnd" @change="endTimeChang"></el-date-picker>
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
                                        <el-table-column prop="title" label="banner名称" width="180">
                                        </el-table-column>
                                        <el-table-column label="应用类型" width="180">
                                            <template slot-scope="item">
                                                {{item.row.advertType && item.row.advertType.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="应用模块" width="180">
                                            <template slot-scope="item">
                                                {{item.row.moduleType && item.row.moduleType.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="banner缩略图" width="150">
                                            <template slot-scope="item">
                                                <div style="margin: 5px;text-align: center">
                                                    <img :src="item.row.pic" height="36px">
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="url" label="链接地址" width="360">
                                        </el-table-column>
                                        <el-table-column prop="validTimeStart" label="生效时间" width="180">
                                        </el-table-column>
                                        <el-table-column prop="validTimeEnd" label="失效时间" width="180">
                                        </el-table-column>
                                        <el-table-column label="优先级" width="180">
                                            <template slot-scope="item">
                                                {{item.row.priority && item.row.priority.code }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="content" label="备注" width="360">
                                        </el-table-column>
                                        <el-table-column label="状态" width="180">
                                            <template slot-scope="item">
                                                {{item.row.advertState && item.row.advertState.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="300">
                                            <template slot-scope="item">
                                                <button title="上移" v-if="item.row.priority && item.row.priority.code != 8 && (item.row.advertState && item.row.advertState.code == 1)" class="btn btn-primary btn-xs" @click="doAction(item.row.id,'up')">上移</button>
                                                <button title="下移" v-if="item.row.priority && item.row.priority.code != 0 && (item.row.advertState && item.row.advertState.code == 1)" class="btn btn-warning btn-xs" @click="doAction(item.row.id,'down')">下移</button>
                                                <button title="置顶" v-if="item.row.priority && item.row.priority.code != 8 && (item.row.advertState && item.row.advertState.code == 1)" class="btn btn-danger btn-xs" @click="doAction(item.row.id,'top')">置顶</button>
                                                <button title="查看" class="btn btn-info btn-xs" @click="showInfo(item.row.id)">查看</button>
                                                <button title="编辑" class="btn btn-primary btn-xs" @click="modify(item.row.id)">编辑</button>
                                                <button title="禁用" v-if="item.row.advertState && item.row.advertState.code == 1"  class="btn btn-danger btn-xs" @click="doAction(item.row.id,'disable')">禁用</button>
                                                <button title="启用" v-if="item.row.advertState && item.row.advertState.code != 1"  class="btn btn-success btn-xs" @click="doAction(item.row.id,'enable')">启用</button>
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
    import apiAdvertCentre from 'api/advertCentre';
    import {cookieTools} from 'lib/utils'

    export default {
        name: 'advertCentreList',
        components: {Page: Page},
        data: function () {
            let _paramFrom =  cookieTools.get('paramFrom') || '{}';
            let paramFrom = JSON.parse(_paramFrom);
            let _todopage = cookieTools.get('todopage') || '{}';
            let todopage = JSON.parse(_todopage);
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: todopage['limit'] || 10,  //每页显示多少条 limit
                    page: todopage['page'] || 1 //当前页码 page
                },
                param: {
                    validTimeStart:paramFrom['validTimeStart'] ||'',
                    validTimeEnd: paramFrom['validTimeEnd'] ||'',
                    advertType:paramFrom['advertType'] ||'',
                    title:paramFrom['title'] ||''
                },
                types:[] //应用类型 广告中心类型枚举
            }
        },
        watch: {
            param:{
                //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
                handler:function(curVal,oldVal){
                    cookieTools.set('paramFrom',JSON.stringify(curVal));
                },
                deep:true
            },
            todopage:{
                handler:function(curVal,oldVal){
                    cookieTools.set('todopage',JSON.stringify(curVal));
                },
                deep:true
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                this.types.length == 0 && this.getTypes();
            },
            getTypes: function(){
                apiAdvertCentre.getTypes(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.types = data;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            starTimeChang:function (val) {
                this.param.validTimeStart = val;
            },
            endTimeChang: function(val) {
                this.param.validTimeEnd = val;
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
                apiAdvertCentre.list(this, param).then(function (response) {
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
            modify: function (id) {
                this.$router.push({name: 'advert_centre_modify', params: {id: id}});
            },
            showInfo: function (id) {
                this.$router.push({name: 'advert_centre_showInfo', params: {id: id}});
            },
            doAction: function(id,action){
                apiAdvertCentre[action](this,id).then(function (response) {
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
