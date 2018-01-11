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
                        <li class="active">案件数据</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">案件数据</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">

                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="cycleTime" label="周期" >
                                        </el-table-column>
                                        <el-table-column prop="everydayNewCaseNumber" label="每日竞标案件数量">
                                        </el-table-column>
                                        <el-table-column  prop="everydayPublishCaseLawyerNumber" label="每日应标律师数量">
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
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import apiStatistics from 'api/statistics';

    export default {
        name: 'statisticsUsers',
        components: {Page: Page, confirm: confirm},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
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
            },
            getResource: function (page, limit) {
                let param = {
                 page: page, limit: limit
                 };
                 this.todopage.limit = limit;
                 this.todopage.page = page;

                 $('#list-content').mLoading("show");
                 apiStatistics.cases(this, param).then(function (response) {
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
            }
        }
    }
    //
</script>
