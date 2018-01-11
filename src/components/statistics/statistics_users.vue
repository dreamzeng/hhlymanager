<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">数据统计</li>
                        <li class="active">用户数据</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">用户数据</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">

                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest" style="margin-bottom: 20px">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="todayRegisterUserNumber" label="今日注册用户数量"   width="180">
                                        </el-table-column>
                                        <el-table-column prop="todayRegisterLawyerNumber" label="今日注册律师数量"  width="180">
                                        </el-table-column>
                                        <el-table-column  prop="todayRegisterAgentNumber" label="今日注册产权代理人数"  width="180">
                                        </el-table-column>
                                        <el-table-column  prop="todayAuthenticationLawyerNumber" label="今日认证律师数量"  width="180">
                                        </el-table-column>
                                        <el-table-column  prop="todayAuthenticationAgentNumber" label="今日认证产权代理人数"  width="180">
                                        </el-table-column>
                                        <el-table-column prop="userTotalNumber" label="注册用户总量"  width="180">
                                        </el-table-column>
                                        <el-table-column  prop="lawyerUserTotalNumber" label="注册律师总量"  width="180">
                                        </el-table-column>
                                        <el-table-column  prop="agentUserTotalNumber" label="注册产权代理人总量"  width="180">
                                        </el-table-column>
                                        <el-table-column prop="authenticationLawyerTotalNumber" label="认证律师用户总量"  width="180">
                                        </el-table-column>
                                        <el-table-column prop="authenticationAgentTotalNumber" label="认证产权代理人总量"  width="180">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>

<script>
    import apiStatistics from 'api/statistics';

    export default {
        name: 'statisticsUsers',
        data: function () {
            return {
                dataList: []
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                $('#list-content').mLoading("show");
                apiStatistics.users(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        this.dataList = [body.data];
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            }
        }
    }
    //
</script>
