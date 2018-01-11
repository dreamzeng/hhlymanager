<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link>
                        </li>
                        <li class="active">系统设置</li>
                        <li>
                            <router-link :to="{name: 'city_list'}">热门城市</router-link>
                        </li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">设置热门城市</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a class="btn btn-info btn-sm" @click="setHotList">
                                        <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                        批量保存热门城市
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <form @submit.prevent="search">
                                            <div class="form-group">
                                                <label style="margin: 0 5px">城市</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="城市" v-model="param.name">
                                            </div>
                                            <button type="submit" class="btn btn-danger">搜索</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <table class="table table-rest table-striped table-bordered border-top dataTable table-hover">
                                        <thead>
                                        <tr>
                                            <th style="width: 1%;"><input type="checkbox" name="" @click="checkAll"></th>
                                            <th>城市名称</th>
                                            <th style="width: 120px"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td><input type="checkbox" :value="item.id" v-model="checkIds"></td>
                                            <td>{{item.name}}</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs" @click="setHot(item.id)"><i class="glyphicon glyphicon-plus"></i></button>
                                                <button class="btn btn-danger btn-xs" @click="confirm(item)"><i class="icon-trash"></i></button>
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
    import apiSystem from 'api/system';
    import confirm from 'components/common/confirm';

    export default {
        name: 'configSetHotList',
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
                    name: ''
                },
                isCheckAll: false,
                checkIds: [],
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
                apiSystem.cityList(this, param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 10) {//请先登录
                        apiSystem.logout(this);
                        return;
                    }
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
            setHot: function (id) {
                $('#list-content').mLoading("show");
                apiSystem.setCitytHot(this, {ids: id}).then(function (response) {
                    let body = response.body;
                    apiSystem.tips(this, {message: body.msg});
                });
            },
            setHotList: function () {
                if (this.checkIds.length > 0) {
                    let ids = this.checkIds.join(",");
                    this.setHot(ids);
                    this.checkIds = [];
                    return;
                }
                apiSystem.tips(this, {message: '请选择城市'});
            },
            checkAll: function () {
                this.isCheckAll = !this.isCheckAll;
                if (this.isCheckAll) { //如果为true 则为 全选
                    this.checkIds = [];
                    let _this = this;
                    this.dataList.forEach(function (item) {
                        _this.checkIds.push(item.id);
                    });
                } else {
                    this.checkIds = [];
                }
            },
            confirm: function (item) { //删除确认
                this.rowItemId = item.id;
                this.message = '城市名称：' + item.name;
                $('#myConfirm').modal();
            },
            deleteItem: function () {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiSystem.deleteCity(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiSystem.tips(this, {message: body.msg});
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

