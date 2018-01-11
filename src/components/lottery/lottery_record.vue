<template>
    <!--main content start-->
    <div class="row">
        <div class="col-lg-12">
            <div class="panel">
                <div class="dataTables_wrapper form-inline" id="list-content-record">
                    <!-- 搜索 -->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel-body">
                                <form @submit.prevent="search">
                                    <div class="form-group">
                                        <label style="margin: 0 5px">用户姓名</label>
                                        <input type="text" style="width: 150px" class="form-control" placeholder=" 用户姓名" v-model.trim="param.realName">
                                    </div>
                                    <div class="form-group">
                                        <label style="margin: 0 5px">电话号码</label>
                                        <input type="text" style="width: 150px" class="form-control" placeholder="电话号码" v-model.trim="param.phone">
                                    </div>
                                    <div class="form-group">
                                        <label style="margin: 0 5px">奖品名称</label>
                                        <input type="text" style="width: 150px" class="form-control" placeholder="奖品名称" v-model.trim="param.prizeName">
                                    </div>
                                    <button type="submit" class="btn btn-danger">搜索</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- 搜索结束 -->
                    <div class="table-scrollable">
                        <div class="panel-body panel-body-rest">
                            <table class="table table-rest table-striped table-bordered border-top dataTable table-hover">
                                <thead>
                                <tr>
                                    <th width="30%">用户姓名</th>
                                    <th width="30%">电话号码</th>
                                    <th width="20%">奖品名称</th>
                                    <th width="20%">中奖时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in dataList">
                                    <td>{{item.realName}}</td>
                                    <td>{{item.phone}}</td>
                                    <td>{{item.prizeName}}</td>
                                    <td>{{item.createTime}}</td>
                                </tr>
                                <tr v-show="dataList.length<1">
                                    <td colspan="11">无数据。。。</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page>
                </div>
            </div>
        </div>
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import apiLottery from 'api/lottery';

    export default {
        name: 'statisticsList',
        components: {Page: Page},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    prizeName: '',
                    realName: '',
                    phone:''
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
            });
        },
        methods: {
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;

                for (let k in this.param) {
                    param[k] = this.param[k];
                }
                $('#list-content-record').mLoading("show");
                apiLottery.recordList(this, param).then(function (response) {
                    $('#list-content-record').mLoading("hide");
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
            search: function () {
                this.getResource(1, this.todopage.limit);
            }
        }
    }
    //
</script>
