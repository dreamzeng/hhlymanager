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
                        <li class="active">文章数据</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">文章数据</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">

                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest" style="margin-bottom: 20px">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="todayArticlePublishNumber" label="今日文章发布数量" >
                                        </el-table-column>
                                        <el-table-column prop="todayArticlePraiseNumer" label="今日文章点赞数量">
                                        </el-table-column>
                                        <el-table-column  prop="todayArticlePublishPersonNumber" label="今日文章发布人数">
                                        </el-table-column>
                                        <el-table-column prop="todayArticleReadingNumber" label="今日文章阅读数量">
                                        </el-table-column>
                                        <el-table-column  prop="todayExploreArticleReadingNumber" label="今日探索文章阅读量">
                                        </el-table-column>
                                        <el-table-column prop="todayExploreArticleCommentNumber" label="今日探索文章评论量">
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
                apiStatistics.articles(this).then(function (response) {
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
