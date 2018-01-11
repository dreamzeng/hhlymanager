<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">律师咨询</li>
                        <li class="active">套餐列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">套餐列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link :to="{name: 'pack_edit',params: {type:1,id:1}}" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        设置套餐
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
                                                <label style="margin: 0 5px">套餐主题</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="套餐主题" v-model.trim="param.title">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">套餐类型</label>
                                                <select class="form-control " style="width: 120px;" v-model.trim="param.type">
                                                    <option value="">请选择</option>
                                                    <option value="PACK">包时</option>
                                                    <option value="TIMES">计时</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">开始时间</label>
                                                <input type="text" class="form-control form_datetime" style="width: 150px" value="" placeholder="开始时间" id="form-beginTime">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">结束时间</label>
                                                <input type="text" class="form-control form_datetime" style="width: 150px" value="" placeholder="结束时间" id="form-endTime">
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
                                            <th>套餐主题</th>
                                            <th>套餐类型</th>
                                            <th>价格</th>
                                            <th>单位</th>
                                            <th>有效起止时间</th>
                                            <th>有效截止时间</th>
                                            <th>创建时间</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td>{{item.title}}</td>
                                            <td>{{item.type&&item.type.value}}</td>
                                            <td>{{item.price}}</td>
                                            <td>{{item.unit&&item.unit.value}}</td>
                                            <td>{{item.beginTime}}</td>
                                            <td>{{item.endTime}}</td>
                                            <td>{{item.createTime}}</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs" @click="modify(item.id)"><i class="icon-pencil"></i></button>
                                                <button class="btn btn-danger btn-xs" @click="confirm(item)"><i class="icon-trash "></i></button>
                                            </td>
                                        </tr>
                                        <tr v-show="dataList.length<1">
                                            <td colspan="9">无数据。。。</td>
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
    import apiAdvice from 'api/advice';
    import confirm from 'components/common/confirm';

    export default {
        name: 'packList',
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
                    type: '',
                    beginTime:'',
                    endTime:''
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
                apiAdvice.packList(this, param).then(function (response) {
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
                this.message = '套餐主题：' + item.title;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiAdvice.packDel(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiAdvice.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            modify: function (id) {
                this.$router.push({name: 'pack_edit', params: {type: 2, id: id}});
            }
        }
    }
    //
</script>


