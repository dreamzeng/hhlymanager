<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">用户端内容管理</li>
                        <li class="active">案例列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">案例列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a href="javascript:;" @click="caseAddEdit('-1')" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新增案例
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item  label="案例标题：" style="margin-bottom:0">
                                                <el-input v-model="param.title" placeholder="案例标题" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="title" label="标题"></el-table-column>
                                        <el-table-column prop="goodsId" label="状态">
                                            <template slot-scope="item">
                                                <span v-if="item.row.publishState">已发布</span>
                                                <span v-else>未发布</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间"></el-table-column>
                                        <el-table-column prop="publishTime" label="发布时间"></el-table-column>
                                        <el-table-column label="操作" width="300">
                                            <template slot-scope="item">
                                                <el-button size="mini" type="primary" @click="caseAddEdit(item.row.uuid)">编辑</el-button>
                                                <el-button size="mini" type="danger" @click="confirm(item.row.uuid,item.row.title)">移除</el-button>
                                                <el-button v-if="item.row.hot==0" size="mini" type="warning" @click="recommend(item.row.uuid)">推荐到首页</el-button>
                                                <el-button v-if="item.row.hot==1" size="mini" type="warning" :disabled="true">已推荐首页</el-button>
                                                <el-button size="mini" type="success" @click="showHide(item.row.uuid,item.row.publishState)">{{item.row.publishState?"取消显示":"使其显示"}}</el-button>
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
        <confirm v-on:confirm="deleteItem()" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->
</template>
<style>
    /* .el-form-item{margin-bottom:0;} */
</style>

<script>
    import Page from 'components/common/Page';
    import apiOperaCon from 'api/userPlatform';
    import confirm from 'components/common/confirm';
    import VueCoreImageUpload  from 'components/common/vue.core.file.upload';

    export default {
        name: 'operaTypeList',
        components: {Page: Page, confirm: confirm,'vue-core-image-upload': VueCoreImageUpload},
        data: function () {
            return {
                options:[],
                dataList:[
                    {
                        id:1,
                        uuid:2,
                        title:"hehe",
                        publishState:1,
                        publishTime:"heheh",
                        createTime:"hah",
                        hot:1
                    }
                ],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    title:'',
                },
                goodsIds:[],
                urlType:'2',
                uploadUrl:'',
                // dialogVisible: false,
                editLoading: false,
                type:-1,//用来并判断是新增还是编辑
                rowItemId: -9999,
                message: '',
                title: '是否删除该条信息? ',
                infoTitle:'新增',
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                 this.getResource(1, this.todopage.limit);
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
                for (let k in this.param) {
                    if(this.param[k]){
                        param[k] = this.param[k];
                    }
                }
                $('#list-content').mLoading("show");
                apiOperaCon.caseList(this, param).then(function (response) {
                    let body = response.body;
                    if (body.data&&body && body.code == 1) {
                        let data = body.data;
                        this.todopage.total = data.total;
                        this.dataList = data.items;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            confirm: function (itemId,itemName) { //删除确认
                this.rowItemId = itemId;
                this.message = '案例标题：' + itemName;
                $('#myConfirm').modal();
            },
            deleteItem: function () {
                $("body").mLoading("show");
                apiOperaCon.deleteCase(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            caseAddEdit: function(id){
                this.$router.push({name:"case_add_edit3",params:{id:id}});
            },
            showHide: function(id,state){
                let publishState=state==0?1:0;
                let params={publishState};
                apiOperaCon.showHideCase(this, id,params).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            recommend: function(id){

                apiOperaCon.recommendCase(this,id).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },


        }
    }
</script>
