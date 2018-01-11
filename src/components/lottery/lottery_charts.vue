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
                        <li class="active">活动抽奖</li>
                        <li class="active">活动统计</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">活动统计</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <router-link :to="{name: 'lottery_edit'}" class="btn btn-primary btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        添加奖品
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-heading tab-bg-dark-navy-blue" style="background: #90b4e6;">
                            <ul class="nav nav-tabs">
                                <li class="active">
                                    <a data-toggle="tab" href="#answer">答题用户</a>
                                </li>
                                <li class="">
                                    <a data-toggle="tab" href="#answerCharts">答题统计</a>
                                </li>
                                <li class="">
                                    <a data-toggle="tab" href="#lotteryManager">中奖管理</a>
                                </li>

                            </ul>
                        </div>
                        <div class="panel-body">
                            <div class="tab-content">
                                <div id="answer" class="tab-pane active">
                                    <statisticsList v-on:answerInfo="answerInfo"></statisticsList>
                                </div>
                                <div id="answerCharts" class="tab-pane">
                                    <statisticsCharts></statisticsCharts>
                                </div>
                                <div id="lotteryManager" class="tab-pane">
                                    <lotteryRecord></lotteryRecord>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--查看详情-->
        <div class="modal fade " id="myModal-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width: 600px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{user}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <div style="height: 400px;max-height: 500px;overflow: auto">
                                <dl v-for="(item,index) in userAnswersInfo">
                                    <dt>{{index+1}}，{{item.questionContent}}</dt>
                                    <dd>{{item.answerSelect}}：{{item.optionValue}} {{item.answerContent ? '（'+item.answerContent+'）' : ''}}</dd>
                                    <dd v-for="more in item.more">{{more.answerSelect}}：{{more.optionValue}} {{more.answerContent}}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>

<script>
    import statisticsList from 'components/lottery/statistics_list'
    import statisticsCharts from 'components/lottery/statistics_charts'
    import lotteryRecord from 'components/lottery/lottery_record'
    import apiLottery from 'api/lottery';

    export default {
        name: 'lotteryCharts',
        components: {statisticsList: statisticsList,statisticsCharts:statisticsCharts,lotteryRecord:lotteryRecord},
        data: function () {
            return {
                dataList: [],
                userAnswersInfo:[],
                user:''
            }
        },
        mounted: function () {
            this.$nextTick(function () {

            });
        },
        methods: {
            init: function () {
            },
            answerInfo:function(id,user){
                this.user = user;
                $("body").mLoading("show");
                apiLottery.answers(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let items = body.data.items;
                        let temp = [],flg = false;
                        for(let i = 0,lg=items.length;i<lg;i++){
                            items[i]['more'] = [];
                            flg = false;
                            for(let j = 0,jl = temp.length;j<jl;j++){
                                if(temp[j]['questionId'] == items[i]['questionId']){
                                    temp[j]['more'].push(items[i]);
                                    flg = true;
                                    break;
                                }
                            }
                            if(flg) continue;
                            temp.push(items[i]);
                        }
                        this.userAnswersInfo =  temp;

                        $('#myModal-info').modal();
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            }
        }
    }
    //
</script>

