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
                        <li class="active">热门城市</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">热门城市</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link class="btn btn-info btn-sm" :to="{name: 'city_set_hot'}">
                                        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                                        设置热门城市
                                    </router-link>
                                    <a class="btn btn-primary btn-sm" href="javascript:;" @click="addCityModal">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        添加城市
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
                                                <input type="text" style="width: 150px" class="form-control" placeholder="城市" v-model.trim="param.name">
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
                                            <th>城市名称</th>
                                            <th>创建时间</th>
                                            <th>更新日期</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td>{{item.name}}</td>
                                            <td>{{item.createTime}}</td>
                                            <td>-</td>
                                            <td>
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

        <div class="modal fade" id="addCityModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">添加城市</h4>
                    </div>
                    <form @submit.prevent="addCity">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="txt_departmentname">城市编码</label>
                                <input type="text" name="txt_departmentname" class="form-control" id="txt_departmentname" placeholder="城市编码" v-model.trim="addCityForm.code">
                            </div>
                            <div class="form-group">
                                <label for="txt_parentdepartment">城市名称</label>
                                <input type="text" name="txt_parentdepartment" class="form-control" id="txt_parentdepartment" placeholder="城市名称" v-model.trim="addCityForm.name">
                            </div>
                        </div>
                        <div class="form-group has-error">
                            <label class="control-label col-lg-12" v-show="error!=''">{{error}}</label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                            <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
                        </div>
                    </form>
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
                    name: ''
                },
                addCityForm: {
                    code: '',
                    name: '',
                    parentCode: 'xx'
                },
                error: '',
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
                apiSystem.cityHotList(this, param).then(function (response) {
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
            addCityModal: function () {
                $('#addCityModal').modal();
            },
            addCity: function () {
                if (!this.addCityForm.code) {
                    this.error = '请输入城市编码！';
                    return;
                }
                if (!this.addCityForm.name) {
                    this.error = '请输入城市名！';
                    return;
                }
                $("body").mLoading("show");
                apiSystem['addCity'](this, this.addCityForm).then(function (response) {
                    let body = response.body;
                    apiSystem.tips(this, {message: body.msg});
                }, function (response) {
                    console.log('error:', response);
                });
            },
            confirm: function (item) { //删除确认
                this.rowItemId = item.id;
                this.message = '城市名称：' + item.name;
                $('#myConfirm').modal();
            },
            deleteItem: function () {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiSystem.deleteHotCity(this, this.rowItemId).then(function (response) {
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

