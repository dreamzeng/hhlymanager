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
                        <li>营销管理</li>
                        <li class="active">优惠券</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">全部优惠券</div>
                                <div class="col-md-4 col-md-offset-4 text-right">
                                    <a class="btn btn-primary icon icon-plus" @click="couponAdd">新增优惠券</a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <form @submit.prevent="search">
                                            <div class="form-group">
                                                <label style="margin: 0 5px">优惠券名称：</label>
                                                <input type="text" style="width: 150px;margin-right:10px;" class="form-control" placeholder="优惠券" v-model.trim="param.couponName">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">有效期</label>
                                                <el-date-picker
                                                  v-model="value1"
                                                  type="datetimerange"
                                                  placeholder="选择时间范围" @change="changeTime">
                                                </el-date-picker>
                                            </div>
                                            <button type="submit" class="btn btn-danger" style="margin-left:10px;">搜索</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable" id="couponTable">
                                <div class="panel-body panel-body-rest">
                                    <table class="table table-rest table-striped table-bordered border-top dataTable table-hover table-responsive" style="vertical-align:middle; text-align: center;">
                                        <thead>
                                        <tr>
                                            <th>批次</th>
                                            <th>优惠券名称</th>
                                            <th>有效期</th>
                                            <th>优惠券数量</th>
                                            <th>优惠券总金额</th>
                                            <th>已领取优惠券数量</th>
                                            <th>已领取优惠券金额</th>
                                            <th>已使用优惠券数量</th>
                                            <th>已使用优惠券金额</th>
                                            <th>状态</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td>{{item.id}}</td>
                                            <td>{{item.couponName}}</td>
                                            <td>{{item.validityPeriod}}</td>
                                            <td>{{item.couponNumber}}</td>
                                            <td>{{item.totalMoney}}</td>
                                            <td>{{item.receivedNumber}}</td>
                                            <td>{{item.receivedMoney}}</td>
                                            <td>{{item.usedNumber}}</td>
                                            <td>{{item.usedMoney}}</td>
                                            <td>{{item.status==1?'启用':'禁用'}}</td>
                                            <td>
                                                <!-- <div style="display:inline-block"> -->
                                                    <button class="btn btn-default btn-xs btn-info" @click="showInfoId(item.id)" type="text">查看</button>
                                                    <button class="btn btn-default btn-xs btn-link" type="text" @click="modifyId(item.id)">编辑</button>
                                                    <button class="btn btn-default btn-xs" type="text" @click="conponListId(item.id)">码库明细</button>
                                                    <button class="btn btn-default btn-xs btn-danger" type="text" v-show="item.status==1" @click="forbiddenId(item.id)">禁用</button>
                                                    <button class="btn btn-default btn-xs btn-warning" type="text" v-show="item.status==2" @click="enableId(item.id)">启用</button>
                                                <!-- </div> -->
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
        </div>

    </div>
    <!--main content end-->

</template>
<style scoped>
    td,th{text-align: center!important;}
</style>

<script>
    import Page from 'components/common/Page';
    import marketing from 'api/marketing';

    export default {
        created:function(){
            // this.init();
            // this.getResource(1, this.todopage.limit);
        },
        name: 'coupon',
        components: {Page: Page},
        data: function () {
            return {
                dataList: [
                    {
                        "id": 1,
                        "couponName": '优惠券1',
                        "validityPeriod":'2017-08-1012: 10: 30至2017-08-14 12:10:30',
                        "couponNumber": '优惠券数量',
                        "totalMoney": '优惠券总金额',
                        "receivedNumber": '已经领取数量',
                        "receivedMoney":"已经领取优惠券金额" ,
                        "usedNumber": '已经领取数量',
                        "usedMoney": '已经使用优惠券金额',
                        "status": 1//：启用2：禁用,
                    },
                    {
                        "id": 2,
                        "couponName": '优惠券1',
                        "validityPeriod":'2017-08-1012: 10: 30至2017-08-14 12:10:30',
                        "couponNumber": '优惠券数量',
                        "totalMoney": '优惠券总金额',
                        "receivedNumber": '已经领取数量',
                        "receivedMoney":"已经领取优惠券金额" ,
                        "usedNumber": '已经领取数量',
                        "usedMoney": '已经使用优惠券金额',
                        "status": 2
                    }
                ],
                todopage: {
                    total: 3,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    startUsetime: '',
                    endUsetime: '',
                    couponName:''
                },
                value1:[],//日期插件开始时间和结束时间的数组
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

                for (let k in this.param) {
                    param[k] = this.param[k];
                }
                $('#list-content').mLoading("show");
                marketing.coupons(this, param).then(function (response) {
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
            //码库明细
            list: function(item){
                this.$router.push({name: 'marketing_conpon_list', params: {orderNo: item.orderNo}});
            },
            //添加优惠券
            couponAdd:function(){
                this.$router.push({name:'marketing_coupon_add'});
            },
            //日历range插件,将开始时间和结束时间分别赋给param的参数
            changeTime:function(val){
                this.param.startUsetime=val.substring(0,19);
                this.param.endUsetime=val.substring(22);
            },
            //禁用按钮
            forbiddenId:function(id){
                $("body").mLoading("show");
                marketing.forbidden(this,id).then(function(response){
                    let body=response.body;
                    this.$message(body.msg);
                    if(body&&body.code==1)
                    {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                },function(res){
                    console.log('error:',res);
                })
            },
            //启用按钮
            enableId:function(id){
                $("body").mLoading("show");
                marketing.enable(this,id).then(function(response){
                    let body=response.body;
                    this.$message(body.msg);
                    if(body&&body.code==1)
                    {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                },function(res){
                    console.log('error:',res);
                })
            },
            //查看按钮=>优惠券详情页
            showInfoId:function(id){
                this.$router.push({name: 'marketing_coupon_info', params: {id: id}});
            },
            //编辑按钮=>编辑优惠券页面
            modifyId: function (id) {
                this.$router.push({name: 'marketing_coupon_edit', params: {id: id}});
            },
            //码库明细按钮
            conponListId: function (id) {
                this.$router.push({name: 'marketing_coupon_list', params: {id: id}});
            },



        }
    }
    //
</script>


