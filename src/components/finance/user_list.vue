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
                        <li class="active">财务管理</li>
                        <li class="active">用户对账</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">用户对账</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a class="btn btn-info btn-sm" href="javascript:;" @click="createBillWin()">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        生成账单
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
                                                <label style="margin: 0 5px">主题</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="请输入主题" v-model.trim="param.title">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">开始时间</label>
                                                <input type="text" class="form-control form_datetime" style="width: 150px" placeholder="开始时间" id="form-beginTime">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">结束时间</label>
                                                <input type="text" class="form-control form_datetime" style="width: 150px" placeholder="结束时间" id="form-endTime">
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
                                            <th>主题</th>
                                            <th>开始时间</th>
                                            <th>结束时间</th>
                                            <th>状态</th>
                                            <th>对账时间</th>
                                            <th>操作人</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td>{{item.title}}</td>
                                            <td>{{item.beginTime}}</td>
                                            <td>{{item.endTime}}</td>
                                            <td>{{item.state && item.state.value}}</td>
                                            <td>{{item.createTime}}</td>
                                            <td>{{item.createUser}}</td>
                                            <td>
                                                <!--<button title="查看" class="btn btn-success btn-xs"><i class="icon-external-link"></i></button>-->
                                                <a title="下载" class="btn btn-primary btn-xs" :href="billDown(item.id)"><i class=" icon-download-alt"></i></a>
                                            </td>
                                        </tr>
                                        <tr v-show="dataList.length<1">
                                            <td colspan="8">无数据。。。</td>
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

        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">生成账单</h4>
                    </div>
                    <div class="modal-body">

                        <div class="form-group">
                            <label>开始时间</label>

                            <div class=" date form_datetime" style="width: 200px;">
                                <input type="text" class="form-control" value="" placeholder="开始时间" readonly>
                                <span class="add-on"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>结束时间</label>

                            <div class=" date form_datetime" style="width: 200px;">
                                <input type="text" class="form-control" value="" placeholder="结束时间" readonly>
                                <span class="add-on"><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                        <button type="button" id="btn_submit" class="btn btn-primary" data-dismiss="modal"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!--main content end-->


</template>

<script>
    import Page from 'components/common/Page';
    import apiFinance from 'api/finance';

    export default {
        name: 'financeList',
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
                    title: '',
                    beginTime: '',
                    endTime: ''
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
                $(".form_datetime").datetimepicker({
                    language: 'zh-CN',
                    format: "yyyy-mm-dd",
                    weekStart: 1,
                    todayBtn: 1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0
                });
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
                this.param['beginTime'] = $('#form-beginTime').val();
                this.param['endTime'] = $('#form-endTime').val();
                for (let k in this.param) {
                    param[k] = this.param[k];
                }
                $('#list-content').mLoading("show");
                apiFinance.userList(this, param).then(function (response) {
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
            billDown: function (id) {
                return apiFinance.billDown(id);
            },
            createBillWin: function () {
                $('#myModal').modal();
            }
        }
    }
    //
</script>


