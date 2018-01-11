<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li @click="back"><a href="javascript:;">活动管理</a></li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">标题：<label style="color: #FF6C60">{{dataList.title}}</label></div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="profile-nav alt green-border" id="list-content">
                                <div class="panel">
                                    <ul class="nav nav-pills nav-stacked">
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">活动图片</span><img alt="" :src="dataList.imageUrl" height="120px"></div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">创建时间</span>{{dataList.createTime}}</div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">活动时间</span>{{dataList.beginTime}}<span style="margin: 0 10px">-</span>{{dataList.endTime}}</div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">活动状态</span>{{dataList.state}}</div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">活动地址</span>{{dataList.address}}</div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">举办联系人</span>{{dataList.contact}}</div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">联系号码</span>{{dataList.phone}}</div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">规模人数</span>{{dataList.scope}}</div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">报名人数</span>{{dataList.hasSign}}</div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">直播状态</span>{{dataList.playState == 0 ? '未开始':dataList.playState == 1 ? '直播中' : '直播结束' }}</div></li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">活动讲师</span>{{dataList.lecturer}}</div></li>
                                        <li v-if="dataList.playLives && dataList.playLives.length>0">
                                            <div class="live-details-s">
                                                <span class="label label-primary" style="vertical-align: top;">推流地址</span>
                                                <span style="display: inline-block;">
                                                    <p>过期时间：{{dataList.playLives[0].liveExpireTime}}</p>
                                                    <p>推流地址：{{dataList.playLives[0].pushUrl}}</p>
                                                    <p>播放地址(RTMP)：{{dataList.playLives[0].rtmpUrl}}</p>
                                                    <p>播放地址(FLV)：{{dataList.playLives[0].flvUrl}}</p>
                                                    <p>播放地址(HLS)：{{dataList.playLives[0].hlsUrl}}</p>
                                                    <p>直播码：{{dataList.playLives[0].liveCode}}</p>
                                                </span>
                                            </div>
                                        </li>
                                        <li><div class="live-details-s">
                                            <span class="label label-primary">简介描述</span>{{dataList.description}}</div></li>
                                    </ul>
                                </div>
                                <div class="col-lg-12" style="border-top: 1px solid #ebeae6;padding-top: 15px">
                                    <button type="button" class="btn btn-info" @click="back">确定</button>
                                    <button class="btn btn-default" type="button" @click="back">取消</button>
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

    import apiLive from 'api/live';

    export default {
        name: 'liveDetailsList',
        data: function () {
            return {
                dataList: {
                    title:''
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                let id = this.$route.params.id;
                $('#list-content').mLoading("show");
                apiLive.liveDetailsList(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
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
