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
                        <li class="active">律师咨询</li>
                        <li class="active">用户咨询</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">用户咨询</div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <form @submit.prevent="search">
                                            <div class="form-group">
                                                <label style="margin: 0 5px">用户名</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="用户名" v-model.trim="param.userName">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">律师名</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="律师名" v-model.trim="param.lawyerName">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">套餐状态</label>
                                                <select class="form-control " style="width: 120px;" v-model.trim="param.isPackage">
                                                    <option value="">请选择</option> <option value="true">已使用</option> <option value="false">未使用</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">咨询来源</label>
                                                <select class="form-control " style="width: 120px;" v-model.trim="param.source">
                                                    <option value="">请选择</option> <option value="Advice">咨询</option> <option value="Document">代写文书</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">咨询状态</label>
                                                <select class="form-control " style="width: 120px;" v-model.trim="param.state">
                                                    <option  value="">请选择</option> <option value="NoStart">未开始</option> <option value="Disable">锁定</option> <option value="Enable">开启</option>
                                                </select>
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
                                            <th>用户名</th>
                                            <th>律师名</th>
                                            <th>预约时间</th>
                                            <th>累计时长（分）</th>
                                            <th>剩余时长（分）</th>
                                            <th>聊天开始时间</th>
                                            <th>咨询截止时间</th>
                                            <th>是否使用套餐</th>
                                            <th>咨询来源</th>
                                            <th>咨询状态</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td>{{item.userName}}</td>
                                            <td>{{item.lawyerName}}</td>
                                            <td>{{item.appointmentTime}}</td>
                                            <td>{{item.addTime}}</td>
                                            <td>{{item.overTime}}</td>
                                            <td>{{item.beginTime}}</td>
                                            <td>{{item.endTime}}</td>
                                            <td>{{item.isPackage?'已使用':'未使用'}}</td>
                                            <td>{{item.source&&item.source.value}}</td>
                                            <td>{{item.state&&item.state.value}}</td>

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
        </div>

    </div>
    <!--main content end-->


</template>

<script>
    import Page from 'components/common/Page';
    import apiAdvice from 'api/advice';

    export default {
        name: 'adviceList',
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
                    userName: '',
                    lawyerName: '',
                    isPackage:'',
                    source:'',
                    state:''
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
                $(".form_datetime").datetimepicker({
                    language: 'zh-CN',
                    format: "yyyy-mm-dd",
                    weekStart: 1,
                    todayBtn: 1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0
                });
            },
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
                $('#list-content').mLoading("show");
                apiAdvice.adviceList(this, param).then(function (response) {
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


