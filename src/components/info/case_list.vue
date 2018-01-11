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
                        <li class="active">法律咨询</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">法律咨询</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link :to="{name: 'case_edit',params: {type:1,id:1}}" class="btn btn-info btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        创建咨询
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">

                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <table class="table table-rest table-striped table-bordered border-top dataTable table-hover">
                                        <thead>
                                        <tr>
                                            <th style="width: 5%;">图标</th>
                                            <th>名称</th>
                                            <th>创建时间</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td><img alt="" :src="item.logo" style="width: 42px;height: 42px;margin:auto 0;"></td>
                                            <td>{{item.name}}</td>
                                            <td>{{item.createTime}}</td>
                                            <td>
                                                <button title="编辑" class="btn btn-primary btn-xs" @click="modify(item.id)"><i class="icon-pencil"></i></button>
                                                <button title="删除" class="btn btn-danger btn-xs" @click="confirm(item)"><i class="icon-trash "></i></button>
                                            </td>
                                        </tr>
                                        <tr v-show="dataList.length<1">
                                            <td colspan="5">无数据。。。</td>
                                        </tr>
                                        </tbody>
                                    </table>
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
    import apiInfo from 'api/info';
    import confirm from 'components/common/confirm';

    export default {
        name: 'caseList',
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
                apiInfo.caseList(this, param).then(function (response) {
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
                this.rowItemId = item.id;
                this.message = '名称：' + item.name;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) {
                    apiInfo.tips(this, {message: '参数错误！'});
                    return;
                }
                $("body").mLoading("show");

                apiInfo.caseDel(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiInfo.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            modify: function (id) {
                this.$router.push({name: 'case_edit', params: {type: 2, id: id}});
            }
        }
    }

    //
</script>

