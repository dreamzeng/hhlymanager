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
                        <li class="active">第三方管理</li>
                        <li class="active">反馈列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">反馈列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param" @submit.prevent="">
                                            <el-form-item  label="用户名：">
                                                <el-input v-model="param.userName" placeholder="用户昵称" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="内容关键字：">
                                                <el-input v-model="param.content" placeholder="反馈内容" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="联系方式：">
                                                <el-input v-model="param.contact" placeholder="联系方式" style="width: 250px;"></el-input>
                                            </el-form-item>
                                            <!-- <el-form-item  label="案件类型：">
                                                <el-cascader
                                                    expand-trigger="click"
                                                    :options="options"
                                                    v-model="selectedOptions2"
                                                    @change="handleChange"
                                                    change-on-select>
                                                </el-cascader>
                                            </el-form-item> -->
                                            <el-form-item  label="反馈时间：">
                                                <el-date-picker
                                                  v-model="timeRange"
                                                  type="datetimerange"
                                                  placeholder="选择时间范围" @change="changeTime">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-button type="danger" @click="searchCou">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <table class="table table-rest table-striped table-bordered border-top dataTable table-hover">
                                        <thead>
                                        <tr>
                                            <th>序号</th>
                                            <th>用户ID</th>
                                            <th>用户昵称</th>
                                            <th>反馈内容</th>
                                            <th>联系方式</th>
                                            <th>时间</th>
                                            <th style="text-align:center">操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item,index) in dataList">
                                            <td>{{index+1}}</td>
                                            <td>{{item.userId}}</td>
                                            <td>{{item.userName}}</td>
                                            <td :title="item.content"><span style="max-width:800px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;display:inline-block">{{item.content}}</span></td>
                                            <td>{{item.contact}}</td>
                                            <td>{{item.createTime}}</td>
                                            <td style="text-align:center">
                                                <button type="button" class="btn btn-info btn-xs" @click="showInfo(item.id)">查看</button>
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

    </div>
    <!--main content end-->


</template>
<style scoped>
    th,td{text-align:center;}
</style>

<script>
    import Page from 'components/common/Page';
    import apiThird from 'api/third';


    export default {
        name: 'feedbackList',
        components: {Page: Page},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                timeRange:[],//时间范围
                param: {
                    contact:'',
                    userName:'',
                    content:'',
                    createTimeStart:'',
                    createTimeEnd:'',

                },
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
                apiThird.feedbackList(this, param).then(function (response) {
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
            // 日期插件开始时间和结束时间的数组分配给两个参数
            changeTime:function(val){
                this.param.createTimeStart=val.substring(0,19);
                this.param.createTimeEnd=val.substring(22);
            },
            //搜索按钮
            searchCou(){
                this.getResource(1,this.todopage.limit);
            },
            //查看跳转按钮
            showInfo: function (id) {
                this.$router.push({name:"feedback_info",params:{id:id}});
            },
        }
    }

    //
</script>

