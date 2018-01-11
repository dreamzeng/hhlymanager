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
                        <li class="active">阅读文章</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">文章列表</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <form @submit.prevent="search">
                                            <div class="form-group">
                                                <label style="margin: 0 5px">文章标题</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="文章标题" v-model.trim="param.title">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">发布人</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="发布人" v-model.trim="param.realName">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">文章状态</label>
                                                <select class="form-control " style="width: 120px;" v-model.trim="param.state">
                                                    <option value="">请选择</option>
                                                    <option value="NEW">开启</option>
                                                    <option value="PUBLISH">锁定</option>
                                                </select>
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
                                            <th>标题</th>
                                            <th>内容</th>
                                            <th>创建时间</th>
                                            <th>发布人</th>
                                            <th>状态</th>
                                            <th>阅读人数</th>
                                            <th>发布时间</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td>{{item.title}}</td>
                                            <td>{{(item.content).substring(0,20)}}</td>
                                            <td>{{item.createTime}}</td>
                                            <td>{{item.realName}}</td>
                                            <td>{{item.state&&item.state.value}}</td>
                                            <td>{{item.readNum}}</td>
                                            <td>{{item.publishTime}}</td>
                                            <td>
                                                <button title="文章详情" class="btn btn-success btn-xs" @click="showInfo(item.id,item.title)"><i class="icon-external-link"></i></button>
                                                <button title="删除热门文章" class="btn btn-danger btn-xs" @click="confirm(item)"><i class="icon-trash"></i></button>
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
        <!--查看详情-->
        <div class="modal fade " id="myModal-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width: 1000px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">查看详情：{{title_info}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <div v-html="content" style="height: 400px;max-height: 500px;overflow: auto"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
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
        name: 'articleList',
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
                    realName: '',
                    state:''
                },
                title_info:'',
                content:'',
                editorOption:{

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
                apiArticle.articleList(this, param).then(function (response) {
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
            showInfo: function(id,title){
                this.title_info = title;
                $('body').mLoading("show");
                apiArticle.articleContent(this, {id:id,type:'2'}).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.content = '';
                        if (data) {
                            this.content = body.data;
                        }
                        $('#myModal-info').modal();
                        return;
                    }
                    apiArticle.tips(this, {message: body.msg});
                }, function (response) {
                    console.log('error:', response);
                });
            },
            confirm: function (item) { //删除确认
                console.log(item);
                this.rowItemId = item.id;
                this.message = '标题：' + item.title;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiArticle.articleDel(this, this.rowItemId).then(function (response) {
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



