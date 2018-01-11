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
                            <a href="javascript:;"  @click="back">热门帖子</a>
                        </li>
                        <li class="active">添加热门帖子</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">添加热门帖子</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a class="btn btn-info btn-sm" @click="setHotList">
                                        <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                        批量保存热门文章
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->

                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <table class="table table-rest table-striped table-bordered border-top dataTable table-hover">
                                        <thead>
                                        <tr>
                                            <th style="width: 1%;"><input type="checkbox" name="" @click="checkAll"></th>
                                            <th>内容</th>
                                            <th>创建时间</th>
                                            <th width="120px"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td><input type="checkbox" :value="item.id" v-model="checkIds"></td>
                                            <td>{{(item.content).substring(0,50)}}...</td>
                                            <td>{{item.createTime}}</td>
                                            <td>
                                                <button title="设置为热门文章" class="btn btn-primary btn-xs" @click="setHot(item.id)"><i class="glyphicon glyphicon-plus"></i></button>
                                            </td>
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
    import apiNew from 'api/new';

    export default {
        name: 'configSetHotList',
        components: {Page: Page},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                isCheckAll: false,
                checkIds: []
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
                apiNew.notTopList(this, param).then(function (response) {
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
            setHot: function (id) {
                $('#list-content').mLoading("show");
                apiNew.setHotBath(this, {ids: id}).then(function (response) {
                    let body = response.body;
                    apiNew.tips(this, {message: body.msg});
                    this.getResource(this.todopage.page, this.todopage.limit);
                });
            },
            setHotList: function () {
                if (this.checkIds.length > 0) {
                    let ids = this.checkIds.join(",");
                    this.setHot(ids);
                    this.checkIds = [];
                    return;
                }
                apiNew.tips(this, {message: '请选择帖子'});
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
            back:function(){
                this.$router.go(-1);
            }
        }
    }

    //
</script>
