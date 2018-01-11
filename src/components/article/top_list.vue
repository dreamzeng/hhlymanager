<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">文章管理</li>
                        <li class="active">热门文章</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">热门文章</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link :to="{name: 'released_list'}"  class="btn btn-info btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        添加热门文章
                                    </router-link >
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item class="el-form-item-rest" label="标题">
                                                <el-input v-model="param.title" placeholder="标题" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="状态">
                                                <el-select v-model="param.state" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="未发布" value="NEW"></el-option>
                                                    <el-option label="已发布" value="PUBLISH"></el-option>
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
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="title" label="标题">
                                        </el-table-column>
                                        <el-table-column label="状态" width="180">
                                            <template slot-scope="item">
                                                {{item.row.state&&item.row.state.value}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column  prop="createTime" label="创建时间">
                                        </el-table-column>
                                        <el-table-column prop="publishTime" label="发布时间">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="100">
                                            <template slot-scope="item">
                                                <button title="删除热门文章" class="btn btn-danger btn-xs" @click="confirm(item.row)"><i class="icon-trash"></i></button>
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
        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->


</template>

<script>
    import Page from 'components/common/Page';
    import apiArticle from 'api/article';
    import confirm from 'components/common/confirm';

    export default {
        name: 'topList',
        components: {Page: Page, confirm: confirm},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    title: '',
                    state:''//活动状态
                },
                rowItemId: -9999,
                message: '',
                title: '是否删除该条信息? '
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
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;

                for (let k in this.param) {
                    param[k] = this.param[k];
                }
                $('#list-content').mLoading("show");
                apiArticle.hotList(this, param).then(function (response) {
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
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            confirm: function (item) { //删除确认
                console.log(item);
                this.rowItemId = item.topId;
                this.message = '标题：' + item.title;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiArticle.hotDel(this, this.rowItemId).then(function (response) {
                 let body = response.body;
                    apiArticle.tips(this, {message: body.msg});
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

