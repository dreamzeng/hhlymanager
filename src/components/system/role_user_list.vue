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
                        <li>
                            <router-link :to="{name: 'role_list'}">角色管理</router-link>
                        </li>
                        <li class="active">{{title}}</li>
                        <li class="active">用户列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">用户列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">

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
                                                <label style="margin: 0 5px">登陆名</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="登陆名" v-model.trim="param.loginName">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">姓名</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="姓名" v-model.trim="param.userName">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">邮箱</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="邮箱" v-model.trim="param.email">
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
                                            <th style="width: 2%;"><input type="checkbox" name=""></th>
                                            <th>登陆名</th>
                                            <th>姓名</th>
                                            <th>邮箱</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td><input type="checkbox" name=""></td>
                                            <td>{{item.loginName}}</td>
                                            <td>{{item.userName}}</td>
                                            <td>{{item.email}}</td>
                                        </tr>
                                        <tr v-show="dataList.length<1">
                                            <td colspan="6">无数据。。。</td>
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
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import apiSystem from 'api/system';
    import confirm from 'components/common/confirm';

    export default {
        name: 'userManagerList',
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
                    loginName: '',
                    userName: '',
                    email: ''
                },
                title: ''
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                this.title = this.$route.params.name;
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
                apiSystem.roleSysUsers(this, this.$route.params.id, param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        console.log(this.todopage.total, data.total);
                        this.dataList = data.items;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            }
        }
    }

    //
</script>

