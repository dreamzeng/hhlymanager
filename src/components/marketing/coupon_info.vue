<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">营销管理</li>
                        <li @click="back"> <a href="javascript:void(0)">优惠券</a></li>
                        <li class="active">优惠券详情</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">优惠券详情<label style="color: #FF6C60">{{dataList.title}}</label></div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="profile-nav alt green-border" id="list-content">
                                <div class="panel">
                                    <div class="top" style="padding-left:93px; color:#4D4D4D;border-bottom: 1px solid #EFF2F7;">
                                        <h4>优惠券信息</h4>
                                        <ul v-if="resData.couponType==1">
                                            <li>优惠券名称：&ensp;<span>{{resData.couponName}}</span></li>
                                            <li>折扣额度：&ensp;<span>{{resData.couponRules[0].discountMoney}}</span>&ensp;折</li>
                                            <li>优惠券数量：&ensp;<span>{{resData.couponRules[0].number}}</span>&ensp;张</li>
                                            <li>最高抵扣：&ensp;<span>{{resData.couponRules[0].maxDiscountMoney}}</span>&ensp;元</li>
                                        </ul>
                                        <ul v-if="resData.couponType==2">
                                            <li>优惠券名称：&ensp;<span>{{resData.couponName}}</span></li>
                                            <li>优惠券金额：&ensp;<span>{{resData.couponRules[0].money}}</span>&ensp;元</li>
                                            <li>优惠券数量：&ensp;<span>{{resData.couponRules[0].number}}</span>&ensp;张</li>
                                            <li>满减条件：&ensp;满<span>{{resData.couponRules[0].limitMoney}}</span>元可用</li>
                                            <li>优惠券总金额：&ensp;<span>{{resData.couponRules[0].money*resData.couponRules[0].number}}</span>&ensp;元</li>
                                        </ul>
                                    </div>
                                    <div class="down" style="padding-left:93px; color:#4D4D4D;">
                                        <h4>基本信息</h4>
                                        <ul>
                                            <li>生效时间：&ensp;<span>{{resData.startUsetime}}</span></li>
                                            <li>失效时间：&ensp;<span>{{resData.endUsetime}}</span></li>
                                            <li v-if="resData.couponRules[0].usableServerType==1">可适用的服务：&ensp;<span>全部服务</span></li>
                                            <li v-if="resData.couponRules[0].usableServerType==2">可适用的服务：&ensp;<span>{{allCustomService}}</span></li>
                                            <li style="line-height:35px;"><div style="float:left">备注：&ensp;</div><div v-html="allRemarks" style="float:left;"></div></li>
                                        </ul>
                                    </div>

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
    .panel h4{line-height:75px;}
    .panel li{border-bottom:none;line-height:60px;}
</style>

<script>
    import marketing from 'api/marketing';
    export default {
        name: 'conponInfo',
        data: function () {
            return {
                //couponRemarks
                dataList: {
                    title:''
                },
                resData:{
                    "id":'',
                    "couponName": "",
                    "couponRemarks": [
                        // {
                        //     "id":6,
                        //     "couponId":10,
                        //     "content": "备注内容1",
                        //     "remarkstime": 1502448476684
                        // }
                    ],
                    "couponRules": [
                        {
                            "id":'',
                            "couponId":'',
                            "couponUsableServers": [
                                // {
                                //     "id":4,
                                //     "ruleId":3,
                                //     "serverId": 1001,
                                //     "serverName": "法律服务"
                                // }
                            ],
                            "limitMoney": '',
                            "maxDiscountMoney": '',
                            "money": '',
                            "number": '',
                            "usableServerType": ''
                        }
                    ],
                    "couponType": '',
                    "denominationType": '',
                    "endUsetime": '',
                    "startUsetime": ''
                },
            }
        },
        computed:{
            allCustomService:function(){
                var str="";
                var arr=this.resData.couponRules[0].couponUsableServers;
                arr.forEach(function(val,idx){
                    if(idx!=arr.length-1) str+=val.serverName+"，";
                    else str+=val.serverName;
                });
                return str;
            },
            allRemarks:function(){
                var str="";
                //要注意，后端没有评论数组数组的情况，会报错的
                if(this.resData.couponRemarks)
                {
                    this.resData.couponRemarks.forEach(function(val,idx){
                        str+=val.remarkstime+"&emsp;"+val.content+"；<br/>";
                    });
                }
                else
                {
                    str="（空）";
                }
                return str;
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
                marketing.conponInfo(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                        this.resData = body.data;
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
</script>
