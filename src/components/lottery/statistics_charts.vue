<template>
    <div>
        <div id="containerCharts" style="min-width:400px;height:2000px"></div>
    </div>
</template>
<script>
    import apiLottery from 'api/lottery';
    export default {
        name: 'statisticsCharts',
        data: function () {
            return {
                dataList: []
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                const Highcharts = require('highcharts');
                // 在 Highcharts 加载之后加载功能模块
                require('highcharts/modules/exporting')(Highcharts);
                require('highcharts/themes/grid-light')(Highcharts);

                let questionMap = [],answerMap = [];
                apiLottery.answersCharts(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        let flg = false;
                        for(let i = 0,lg=data.length;i<lg;i++){
                            flg = false;
                            for(let j = 0,jl = questionMap.length;j<jl;j++){
                                if(questionMap[j]['questionId'] == data[i]['questionId']){
                                    flg = true;
                                    break;
                                }
                            }
                            if(flg) continue;
                            questionMap.push({
                                questionId:data[i]['questionId'],
                                answerOptionValue:data[i]['questionContent']
                            });
                        }
                        for(let i = 0,lg=data.length;i<lg;i++){
                            flg = false;
                            for(let j = 0,jl = answerMap.length;j<jl;j++){
                                if(answerMap[j]['name'] == data[i]['userAnswerSelect']){
                                    answerMap[j].data.push({
                                        questionId:data[i]['questionId'],
                                        answerOptionValue:data[i]['questionContent'],
                                        total:data[i]['totalUserAnswerSelect']
                                    });
                                    flg = true;
                                    break;
                                }
                            }
                            if(flg) continue;
                            answerMap.push({
                                name:data[i]['userAnswerSelect'],
                                data:[{
                                    questionId:data[i]['questionId'],
                                    answerOptionValue:data[i]['questionContent'],
                                    total:data[i]['totalUserAnswerSelect']
                                }]
                            });
                        }
                        //console.log(questionMap,answerMap);
                        let src = {
                            A:[],B:[], C:[], D:[],E:[],F:[]
                        };
                        let categories = [];
                        for(let i = 0,lg = questionMap.length;i<lg;i++){
                            for(let j = 0,jl = answerMap.length;j<jl;j++){
                                let data = answerMap[j]['data'],flg = false;
                                for(let n = 0,nl = data.length;n<nl;n++){
                                    if(data[n]['questionId'] == questionMap[i]['questionId']){
                                        src[answerMap[j]['name']].push(data[n]['total']);
                                        flg = true;
                                        break;
                                    }
                                }
                                if(!flg){
                                    src[answerMap[j]['name']].push(null);
                                }
                            }
                            categories.push(questionMap[i]['answerOptionValue']);
                        }
                        let series = [];
                        for(let key in src){
                            series.push({
                                name:key,
                                data:src[key]
                            });
                        }

                        // 创建图表
                        Highcharts.chart('containerCharts', {
                            /*Highcharts 配置*/
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: '问卷统计'
                            },
                            xAxis: {
                                categories: categories,
                                title: {
                                    text: null
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '',
                                    align: 'high'
                                },
                                labels: {
                                    overflow: 'justify'
                                }
                            },
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        enabled: true,
                                        allowOverlap: true
                                    }
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            series: series
                        });
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            });
        },
        methods: {}
    }
</script>
