<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">直播活动</li>
                        <li class="active">活动管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">活动管理</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link :to="{name: 'live_edit',params: {type:1,id:1}}" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新建活动
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item class="el-form-item-rest" label="标题">
                                                <el-input v-model="param.title" placeholder="标题" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="讲师">
                                                <el-input v-model="param.lecturer" placeholder="讲师" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="开始时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.beginTime" @change="starTimeChang" style="width: 150px;"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="结束时间">
                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="param.endTime" @change="endTimeChang" style="width: 150px;"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="直播状态">
                                                <el-select v-model="param.playState" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="未开始" value="0"></el-option>
                                                    <el-option label="直播中" value="1"></el-option>
                                                    <el-option label="直播结束" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="活动状态">
                                                <el-select v-model="param.state" placeholder="请选择" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="未开始" value="0"></el-option>
                                                    <el-option label="报名中" value="1"></el-option>
                                                    <el-option label="报名已截止" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column label="背景图" width="90">
                                            <template slot-scope="item">
                                                <img alt="" :src="item.row.imageUrl" style="width: 40px;height: 40px">
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="title" label="标题" width="180">
                                        </el-table-column>
                                        <el-table-column prop="lecturer" label="讲师" width="180">
                                        </el-table-column>
                                        <el-table-column  prop="beginTime" label="开始时间" width="180">
                                        </el-table-column>
                                        <el-table-column prop="endTime" label="结束时间" width="180">
                                        </el-table-column>
                                        <el-table-column  prop="address" label="地址" width="180">
                                        </el-table-column>
                                        <el-table-column prop="scope" label="规模人数" width="120">
                                        </el-table-column>
                                        <el-table-column label="活动状态"  width="140">
                                            <template slot-scope="item">
                                                {{item.row.state == 0 ? '未开始':item.row.state == 1 ? '报名中' : '报名已截止' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="直播状态">
                                            <template slot-scope="item">
                                                {{item.row.playState == 0 ? '未开始':item.row.playState == 1 ? '直播中' : '直播结束' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="300">
                                            <template slot-scope="item">
                                                <button title="修改" class="btn btn-primary btn-xs" @click="modify(item.row.id)"><i class="icon-pencil"></i>修改</button>
                                                <button title="活动详情" class="btn btn-primary btn-xs" @click="info(item.row.id)"><i class="icon-external-link"></i>活动详情</button>
                                                <button title="人员审核" class="btn btn-info btn-xs" @click="auditUser(item.row.id,item.row.title)"><i class="icon-check"></i>人员审核</button>
                                                <button v-if="1!=1" title="直播列表" class="btn btn-primary btn-xs" @click="liveActionList(item.row.id,item.row.title)"><i class="icon-youtube-play"></i>直播列表</button>
                                                <button title="删除" class="btn btn-danger btn-xs" @click="confirm(item.row)"><i class="icon-trash"></i>删除</button>
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
        <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import apiLive from 'api/live';
    import confirm from 'components/common/confirm';

    export default {
        name: 'liveList',
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
                    lecturer:'',
                    beginTime:'',
                    endTime:'',
                    playState:'',
                    state:''//活动状态
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
                    if(this.param[k]){
                        param[k] = this.param[k];
                    }
                }
                $('#list-content').mLoading("show");
                apiLive.liveList(this, param).then(function (response) {
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
            starTimeChang:function (val) {
                this.param.beginTime = val;
            },
            endTimeChang: function(val) {
                this.param.endTime = val;
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            confirm: function (item) { //删除确认
                this.rowItemId = item.id;
                this.message = '标题：' + item.title;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiLive.liveDel(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiLive.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            info: function(id){
                this.$router.push({name: 'live_details_info', params: {id: id}});
            },
            auditUser: function(id,title){
                this.$router.push({name:'live_audit_user_list',params:{id:id,title:title}});
            },
            liveActionList:function(id,title){
                this.$router.push({name:'live_action_list',params:{id:id,title:title}});
            },
            modify: function (id) {
                this.$router.push({name: 'live_edit', params: {type: 2, id: id}});
            }
        }
    }
    //
</script>
