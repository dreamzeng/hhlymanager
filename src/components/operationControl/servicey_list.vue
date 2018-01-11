<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">业务管理</li>
                        <li class="active">所有服务</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">服务列表</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column type="index" width="50" align="center">
                                        </el-table-column>
                                        <el-table-column prop="bizId" label="业务ID" align="center">
                                        </el-table-column>
                                        <el-table-column prop="bizName" label="服务名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="bizPrice" label="价格" align="center">
                                        </el-table-column>
                                        <!-- <el-table-column label="价格">
                                            <template scope="item">
                                                {{item.row.priceConfirm == 0 ? item.row.priceStart : item.row.priceStart + '-' + item.row.priceEnd  }}
                                            </template>
                                        </el-table-column> -->
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
    import apiOperaCon from 'api/operationControl';
    // import confirm from 'components/common/confirm';

    export default {
        name: 'serviceyList',
        components: {Page: Page},
        data: function () {
            return {
                dataList: [
                    {
                       // "bizId": "a5c37906606141c88bbf301c4949c51f",
                       // "bizPrice": "2999.00",
                       // "bizName": "常年法律顾问 - C轮&大规模"
                   }
                ],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
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
                $('#list-content').mLoading("show");
                apiOperaCon.serviceyList(this, param).then(function (response) {
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
        }
    }
    //
</script>
