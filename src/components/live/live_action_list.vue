<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li>
                            <router-link :to="{name: 'live_list'}"> 活动管理</router-link>
                        </li>
                        <li class="active">直播管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">{{liveTitle}}</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a href="javascript:;" @click="dialogFormVisible = true" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新建直播
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">

                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="liveExpireTime" label="过期时间" width="180"></el-table-column>
                                        <el-table-column prop="pushUrl" label="推流地址" width="300"></el-table-column>
                                        <el-table-column prop="rtmpUrl" label="播放地址(RTMP)" width="300"></el-table-column>
                                        <el-table-column  prop="flvUrl" label="播放地址(FLV)" width="300"></el-table-column>
                                        <el-table-column prop="hlsUrl" label="播放地址(HLS)" width="300"></el-table-column>
                                        <el-table-column  prop="liveCode" label="直播码"></el-table-column>

                                        <el-table-column fixed="right" label="操作" width="100">
                                            <template slot-scope="item">
                                                <button title="删除" class="btn btn-danger btn-xs" @click="confirm(item.row)"><i class="icon-trash"></i></button>
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
        <!--- 添加直播 -->
        <el-dialog title="新建直播" :visible.sync="dialogFormVisible" size="tiny" :before-close="handleClose">
            <el-form :model="editFrom" :rules="rules" ref="editFrom" label-width="80px">
                <el-form-item label="过期时间" prop="liveExpireTime">
                    <el-date-picker type="datetime" placeholder="直播过期时间" v-model="editFrom.liveExpireTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave('editFrom')" :loading="editLoading">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import apiLive from 'api/live';
    import confirm from 'components/common/confirm';

    export default {
        name: 'liveActionList',
        components: {Page: Page, confirm: confirm},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                editFrom:{
                    liveExpireTime:"" //过期时间
                },
                rules:{
                    liveExpireTime:[
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ]
                },
                dialogFormVisible: false,
                editLoading: false,
                liveId:'',
                liveTitle:'',
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

                this.liveTitle = this.liveTitle || this.$route.params.title;
                this.liveId = this.liveId || this.$route.params.id;

                $('#list-content').mLoading("show");
                apiLive.liveActionList(this,this.liveId,param).then(function (response) {
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
            confirm: function (item) { //删除确认
                this.rowItemId = item.id;
                this.message = '过期时间：' + item.liveExpireTime;
                $('#myConfirm').modal();
            },
            deleteItem: function () {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiLive.liveActionDel(this,this.liveId, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiLive.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            handleSave: function(formName) {
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.editLoading = true;
                        apiLive['liveActionAdd'](_this,_this.liveId, [_this.editFrom]).then(function (response) {
                            let body = response.body;
                            apiLive.tips(_this, {message: body.msg});
                            _this.editLoading = false;
                            _this.dialogFormVisible = false;
                            _this.getResource(1, this.todopage.limit);
                            _this.editFrom = {liveExpireTime:""};
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            handleClose:function(){
                this.editLoading = false;
                this.dialogFormVisible= false;
            }
        }
    }
    //
</script>
