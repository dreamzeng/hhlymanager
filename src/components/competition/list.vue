<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">竞价管理</li>
                        <li class="active">竞价列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">竞价列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">

                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column label="头像" width="90">
                                            <template slot-scope="item">
                                                <img alt="" :src="item.row.logo" style="width: 40px;height: 40px">
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="realName" label="用户名">
                                        </el-table-column>
                                        <el-table-column label="竟标状态">

                                            <template slot-scope="item">
                                                <el-tag
                                                    :type="item.row.state && (item.row.state.code == '0' ? 'success' : item.row.state.code == '2' ? 'warning' : 'danger') || '' "
                                                    close-transition>{{item.row.state && item.row.state.value }}</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="lawyerDemand" label="案件类型">
                                            <template slot-scope="item">
                                                {{item.row.lawyerDemand && item.row.lawyerDemand.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="readNum" label="案件需求">
                                            <template slot-scope="item">
                                                {{item.row.caseType && item.row.caseType.name }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="city" label="地址">
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="发布时间">
                                        </el-table-column>
                                        <el-table-column prop="readNum" label="阅读数量">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作">
                                            <template slot-scope="item">
                                                <button title="详情" class="btn btn-primary btn-xs" @click="info(item.row.id)"><i class="icon-pencil"></i>详情</button>
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
    import apiCompetition from 'api/competition';
    import confirm from 'components/common/confirm';

    export default {
        name: 'competitionList',
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
                    name: '',
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
                apiCompetition.compList(this, param).then(function (response) {
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
                this.message = '用户名：' + item.realName;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiCompetition.compDel(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                        this.init();
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            info: function(id){
                this.$router.push({name: 'competition_info', params: {id: id}});
            }
        }
    }
    //
</script>
