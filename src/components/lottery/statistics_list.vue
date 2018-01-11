<template>
    <!--main content start-->
    <div class="row">
        <div class="col-lg-12">
            <div class="panel">
                <div class="dataTables_wrapper form-inline" id="list-content">
                    <div class="table-scrollable">
                        <div class="panel-body panel-body-rest">
                            <table class="table table-rest table-striped table-bordered border-top dataTable table-hover">
                                <thead>
                                <tr>
                                    <th>用户名</th>
                                    <th>联系方式</th>
                                    <th>城市</th>
                                    <th>年龄</th>
                                    <th>性别</th>
                                    <th>查看详情</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in dataList">
                                    <td>{{item.userName}}</td>
                                    <td>{{item.phone}}</td>
                                    <td>{{item.city}}</td>
                                    <td>{{item.age}}</td>
                                    <td>{{item.sex && item.sex.value}}</td>
                                    <td>
                                        <button title="查看" @click="info(item.id,item.userName)" class="btn btn-success btn-xs"><i class="icon-external-link"></i></button>
                                    </td>
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

                $('#list-content').mLoading("show");
                apiLottery.answerList(this, param).then(function (response) {
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
            },
            info:function(id,userName){
                this.$emit('answerInfo', id,userName);
            }
        }
    }
    //
</script>
