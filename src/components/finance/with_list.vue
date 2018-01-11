<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link>
                        <li class="active">财务管理</li>
                        <li class="active">银行卡列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">银行卡列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a class="btn btn-info btn-sm" href="javascript:;" @click="triggerForm">
                                        <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>
                                        导出代付记录
                                    </a>
                                    <a class="btn btn-primary btn-sm" :href="exportBankList()">
                                        <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>
                                        导出记录
                                    </a>
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
                                                <label style="margin: 0 5px">提现流水号</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="提现流水号" v-model.trim="param.drawNo">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">银行卡号</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="银行卡号" v-model.trim="param.bankNo">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">创建时间</label>
                                                <input type="text" class="form-control form_datetime" style="width: 150px" value="" placeholder="开始时间" id="form-createTimeStart">
                                                <label style="margin: 0 5px">-</label>
                                                <input type="text" class="form-control form_datetime" style="width: 150px" value="" placeholder="结束时间" id="form-createTimeEnd">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">状态</label>
                                                <select class="form-control " style="width: 120px;" v-model.trim="param.status">
                                                    <option value="">请选择</option>
                                                    <option value="1">提现审核中</option>
                                                    <option value="2">提现成功</option>
                                                    <option value="2">提现失败</option>
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
                                    <table class="table table-rest table-striped table-bordered border-top dataTable">
                                        <thead>
                                        <tr>
                                            <th>提现流水号</th>
                                            <th>提现总金额</th>
                                            <th>实际提现金额</th>
                                            <th>平台费用</th>
                                            <th>卡属城市</th>
                                            <th>开户行</th>
                                            <th>银行卡号</th>
                                            <th>创建时间</th>
                                            <th>成功时间</th>
                                            <th>状态</th>
                                            <th>描述</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td>{{item.drawNo}}</td>
                                            <td>{{item.totalMoney}}</td>
                                            <td>{{item.drawMoney}}</td>
                                            <td>{{item.lawyerMoney}}</td>
                                            <td>{{item.city}}</td>
                                            <td>{{item.bankName}}</td>
                                            <td>{{item.bankNo}}</td>
                                            <td>{{item.createTime}}</td>
                                            <td>{{item.sucTime}}</td>
                                            <td>{{status(item.status)}}</td>
                                            <td>{{item.remark}}</td>
                                            <td>
                                                <button title="查看详情" class="btn btn-success btn-xs" @click="showInfo(item.id)"><i class="icon-external-link"></i></button>
                                                <button title="审核" class="btn btn-primary btn-xs" v-if="item.status == 1" @click="withdrawAuth(item)"><i class="icon-check"></i></button>
                                            </td>
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

        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width: 850px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">查看提现信息</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-2 control-label">提现流水号</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="showMessage.drawNo">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">城市</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="showMessage.city">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">银行卡号</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="showMessage.bankNo">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">开户行</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="showMessage.bankName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">提现总金额</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="showMessage.totalMoney">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">提现金额</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="showMessage.drawMoney">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">平台费用</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="showMessage.lawyerMoney">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">状态</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="status(showMessage.status)">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">创建时间</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="showMessage.createTime">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">成功时间</label>

                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled="disabled" :value="showMessage.sucTime">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">备注</label>

                                <div class="col-lg-10">
                                    <textarea class="form-control" rows="3">{{showMessage.remark}}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                        <button type="button" id="btn_submit" class="btn btn-primary" data-dismiss="modal"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>确定</button>
                    </div>
                </div>
            </div>
        </div>
        <form method="post" :action="exportDraw()" id="exportDramForm">
            <input name="status"  type="hidden" :value="param.status">
            <input name="drawNo"  type="hidden" :value="param.drawNo">
            <input name="bankNo"  type="hidden" :value="param.bankNo">
            <input name="createTimeStart" type="hidden" :value="param.createTimeStart">
            <input name="createTimeEnd" type="hidden" :value="param.createTimeEnd">
        </form>
    </div>
    <!--main content end-->


</template>

<script>
    import Page from 'components/common/Page';
    import apiFinance from 'api/finance';

    export default {
        name: 'withList',
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
                    drawNo: '',
                    bankNo: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    status: ''
                },
                showMessage:{},
                rowItemId: -9999,
                message: '',
                title: '是否删除该条信息? '
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
            doPage: function (dataList) {
                this.dataList = dataList;
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;
                this.param['createTimeStart'] = $('#form-createTimeStart').val();
                this.param['createTimeEnd'] = $('#form-createTimeEnd').val();
                for (let k in this.param) {
                    param[k] = this.param[k];
                }
                $('#list-content').mLoading("show");
                apiFinance.withList(this, param).then(function (response) {
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
            status: function (data) {
                if (data == 1) return '提现审核中';
                if (data == 2) return '提现成功';

                return '提现失败';
            },
            search: function () {
                this.getResource(1, this.todopage.limit);
            },
            showInfo: function (id) {
                $('body').mLoading("show");
                apiFinance.withdrawInfo(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.showMessage = {};
                        if (data) {
                            this.showMessage = data;
                        }
                        $('#myModal').modal();
                        return;
                    }
                    apiFinance.tips(this, {message: body.msg});
                }, function (response) {
                    console.log('error:', response);
                });
            },
            withdrawAuth:function(item){
                $('body').mLoading("show");
                apiFinance.withdrawAuth(this, item.id, {status: 2,userId:item.userId}).then(function (response) {
                    let body = response.body;
                    apiFinance.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            exportDraw:function(){
               return apiFinance.exportDraw();
            },
            triggerForm:function(){
                $('#exportDramForm').trigger("submit");
            },
            exportBankList:function(){
                return apiFinance.exportBankList();
            }
        }
    }

    //
</script>

