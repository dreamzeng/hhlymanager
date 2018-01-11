<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">系统设置</li>
                        <li class="active">系统参数</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">系统参数</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link :to="{name: 'system_edit',params: {type:1,id:1}}" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        添加参数
                                    </router-link>
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
                                                <label style="margin: 0 5px">参数key</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="参数key" v-model.trim="param.conKey">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px"> 参数值 </label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder=" 参数值" v-model.trim="param.conValue">
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
                                            <th>参数Key值</th>
                                            <th>参数值</th>
                                            <th>说明</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td style="color: red;">{{item.conKey}}</td>
                                            <td>{{item.conValue}}</td>
                                            <td>{{item.conComment}}</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs" @click="modify(item.id)"><i class="icon-pencil"></i></button>
                                                <button class="btn btn-danger btn-xs" @click="confirm(item)"><i class="icon-trash "></i></button>
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
        name: 'configList',
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
                    conKey: '',
                    conValue: ''
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
                apiSystem.configList(this, param).then(function (response) {
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
                this.message = '参数Key值：' + item.conKey;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiSystem.configDel(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiSystem.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            modify: function (id) {
                this.$router.push({name: 'system_edit', params: {type: 2, id: id}});
            }
        }
    }
    //
</script>

