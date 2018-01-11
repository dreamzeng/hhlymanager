<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li @click="reload">
                            <a href="javascript:;"><i class="icon-home"></i> Home</a>
                        </li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <span style="display: inline-block;margin-right: 5px;"><h3>华海乐盈</h3></span><span>律师运营管理平台</span>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="inbox-head" style="background: #00a8b3;">
                                        <div style="text-align: right">
                                            <div style="font-size: 34px">{{userData.userNum}}个</div>
                                            <div>用户</div>
                                        </div>
                                    </div>
                                    <div @click="goUser" class="clearfix" style="height: 26px;line-height: 26px;padding: 0 20px; cursor: pointer; background: #87e2e7">
                                        <div style="float: left;">查看用户</div>
                                        <div style="float: right;"><i class=" icon-long-arrow-right"></i></div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="inbox-head">
                                        <div style="text-align: right">
                                            <div style="font-size: 34px">{{userData.roleNum}}个</div>
                                            <div>角色</div>
                                        </div>
                                    </div>
                                    <div @click="goRole" class="clearfix" style="height: 26px;line-height: 26px;padding: 0 20px; cursor: pointer; background: #80d3d9">
                                        <div style="float: left;">查看角色</div>
                                        <div style="float: right;"><i class="icon-long-arrow-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <i class="icon-bar-chart"></i>&nbsp;应用下载量
                        </div>
                        <div class="panel-body">
                                <div>
                                    安卓：{{downloadTotal.android}}
                                </div>
                                <div>
                                    IOS：{{downloadTotal.ios}}
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
    import apiHome from 'api/home';
    export default {
        name: 'homeIndex',
        data: function () {
            return {
                userData:{

                },
                downloadTotal:{

                }
            }
        },
        watch: {

        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                apiHome.userRoleCount(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.userData = data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
                apiHome.downTotal(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.downloadTotal = data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            goUser: function(){
                this.$router.push({name: 'user_manager_list'});
            },
            goRole: function(){
                this.$router.push({name: 'role_list'});
            },
            reload: function(){
                this.$router.push({name: 'index'});
            },
            back: function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>

