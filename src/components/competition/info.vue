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
                            <a href="javascript:;"  @click="back">竞价列表</a>
                        </li>
                        <li>竞价详情</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">竞价详情</div>
                        <div class="panel-body" id="list-content">
                            <div class="panel">
                                <ul class="nav nav-pills nav-stacked">
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">头像</span><img alt="" :src="dataList.logo" height="120px"></div></li>
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">竟标状态</span>{{dataList.state && dataList.state.value }}</div></li>
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">用户名</span>{{dataList.realName}}</div></li>
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">发布时间</span>{{dataList.createTime}}</div></li>
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">地址</span>{{dataList.city}}</div></li>
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">案件类型</span>{{dataList.lawyerDemand && dataList.lawyerDemand.value }}</div></li>
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">案件信息</span>{{dataList.content}}</div></li>
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">案件需求</span> {{dataList.caseType && dataList.caseType.name }}</div></li>
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">竟标金额</span>{{dataList.price}}</div></li>
                                    <li><div class="live-details-s">
                                        <span class="label label-primary">备注信息</span>{{dataList.opinion}}</div></li>
                                </ul>
                            </div>
                            <div class="col-lg-12" style="border-top: 1px solid #ebeae6;padding-top: 15px">
                                <button type="button" class="btn btn-info" @click="back">确定</button>
                                <button class="btn btn-default" type="button" @click="back">返回</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .live-details-s {
        padding: 10px 15px;
        border-radius: 0;
        color: #89817f;
        border-left: 5px solid #fff
    }
    .live-details-s .label{
        margin-right: 15px; width: 100px;display: inline-block;
    }
</style>
<script>
    import apiCompetition from 'api/competition';

    export default {
        name: 'competitionInfo',
        data: function () {
            return {
                dataList: {

                },
                id: ''
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                this.id = this.id || this.$route.params.id;
                $('#list-content').mLoading("show");
                apiCompetition.getItem(this, this.id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.dataList = body.data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },

            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
