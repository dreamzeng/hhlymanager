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
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item class="el-form-item-rest" label="真实姓名">
                                                <el-input v-model="param.realName" placeholder="用户银行卡绑定真实姓名" @keyup.enter.native="search"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="手机号">
                                                <el-input v-model="param.phoneNo" placeholder="用户银行卡绑定手机号" @keyup.enter.native="search"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="身份证号">
                                                <el-input v-model="param.idCardNo" placeholder="用户银行卡绑定身份证号" @keyup.enter.native="search"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                   <!-- <table class="table table-rest table-striped table-bordered border-top dataTable table-hover">
                                        <thead>
                                        <tr>
                                            <th>律师名称</th>
                                            <th>身份证号</th>
                                            <th>银行卡号</th>
                                            <th>省</th>
                                            <th>市</th>
                                            <th>区</th>
                                            <th>开户行</th>
                                            <th>是否已被删除</th>
                                            <th>创建时间</th>
                                            <th>状态</th>
                                            <th>描述</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in dataList">
                                            <td>{{item.userName}}</td>
                                            <td>{{item.cardNo}}</td>
                                            <td>{{item.bankCard}}</td>
                                            <td>{{item.province}}</td>
                                            <td>{{item.city}}</td>
                                            <td>{{item.area}}</td>
                                            <td>{{item.bankName}}</td>
                                            <td>{{isDelete(item.isDelete)}}</td>
                                            <td>{{item.createTime}}</td>
                                            <td>{{status(item.status)}}</td>
                                            <td>{{item.remark}}</td>
                                            <td>
                                                <button title="查看详情" class="btn btn-success btn-xs" @click="showInfo(item.id)"><i class="icon-external-link"></i></button>
                                                <button title="审核" class="btn btn-primary btn-xs" v-if="item.status == 1" @click="bankCardAuth(item.id)"><i class="icon-check"></i></button>
                                                <button title="删除" class="btn btn-danger btn-xs" v-if="item.isDelete == 1" @click="confirm(item)"><i class="icon-trash"></i></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>-->

                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="bankCardNo" label="用户银行卡号" width="180">
                                        </el-table-column>
                                        <el-table-column prop="bankName" label="用户银行卡所在行" width="180">
                                        </el-table-column>
                                        <el-table-column label="是否删除" width="180">
                                            <template slot-scope="item">
                                                {{item.row.deleteState && item.row.deleteState.value}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="idCardNo" label="绑定身份证号" width="180">
                                        </el-table-column>
                                        <el-table-column label="银行卡状态" width="180">
                                            <template slot-scope="item">
                                                {{item.row.lockedState && item.row.lockedState.value}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="phoneNo" label="绑定手机号" width="180">
                                        </el-table-column>
                                        <el-table-column prop="realName" label="绑定真实姓名" width="180">
                                        </el-table-column>
                                        <el-table-column prop="remark" label="备注" width="180">
                                        </el-table-column>
                                        <el-table-column label="审核状态" width="180">
                                            <template slot-scope="item">
                                                {{item.row.reviewState && item.row.reviewState.value}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间" width="180">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="180">
                                            <template slot-scope="item">
                                                <button title="锁定" v-if="item.row.lockedState && item.row.lockedState.code == 1"  class="btn btn-danger btn-xs" @click="doAction(item.row.uuid,'lockBank',item.row.bankCardNo)">锁定</button>
                                                <button title="解锁" v-if="item.row.lockedState && item.row.lockedState.code !== 1"   class="btn btn-success btn-xs" @click="doAction(item.row.uuid,'unlockBank',item.row.bankCardNo)">解锁</button>
                                                <button title="备注" class="btn btn-success btn-xs" @click="doAction(item.row.uuid,'remark',item.row.bankCardNo)">备注</button>

                                                <button title="查看详情" class="btn btn-success btn-xs" @click="showInfo(item.row)"><i class="icon-external-link"></i></button>
                                                <!--<button title="审核" class="btn btn-primary btn-xs" v-if="item.row.reviewState && item.row.reviewState.code == 1" @click="bankCardAuth(item.row.uuid)"><i class="icon-check"></i></button>-->
                                               <!-- <button title="删除" class="btn btn-danger btn-xs" v-if="item.row.deleteState && item.row.deleteState.code == 1" @click="confirm(item.row)"><i class="icon-trash"></i></button>-->
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <page v-on:todoPage="getResource" :total="todopage.total" :limit="todopage.limit" :page="todopage.page"></page>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 删除确认 -->
            <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>

            <!-- 锁定和解锁 -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel-body">
                        <el-dialog :title="infoTitle" v-model="dialogVisible" size="tiny" >
                            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" onsubmit="return false">
                                <el-form-item label="备注" prop="remark">
                                    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleSave('ruleForm')" :loading="editLoading">确认</el-button>
                                    <el-button @click="dialogVisible = false">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>

        <!-- 详情 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width: 980px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">查看信息</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12" style="padding-right: 0;">
                                    <div class="col-md-1" style="padding: 0;">绑定真实姓名</div>
                                    <div class="col-md-11">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.realName">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-2" style="padding: 0;">用户银行卡号</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.bankCardNo">
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding: 0;">
                                    <div class="col-md-2" style="padding: 0;">用户银行卡所在行</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.bankName">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-2" style="padding: 0;">是否删除</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.deleteState && showMessage.deleteState.value">
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding: 0;">
                                    <div class="col-md-2" style="padding: 0;">绑定身份证号</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.idCardNo">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-2" style="padding: 0;">银行卡状态</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.lockedState && showMessage.lockedState.value">
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding: 0;">
                                    <div class="col-md-2" style="padding: 0;">绑定手机号</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.phoneNo">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-2" style="padding: 0;">审核状态</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.reviewState && showMessage.reviewState.value">
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding: 0;">
                                    <div class="col-md-2" style="padding: 0;">创建时间</div>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" value="" disabled="disabled" :value="showMessage.createTime">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12" style="padding-right: 0;">
                                    <div class="col-md-1" style="padding: 0;">备注</div>
                                    <div class="col-md-11">
                                        <textarea class="form-control" rows="3" disabled="disabled">{{showMessage.remark}}</textarea>
                                    </div>
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

    </div>
    <!--main content end-->


</template>

<script>
    import Page from 'components/common/Page';
    import apiFinance from 'api/finance';
    import {apiBank} from 'api/finance';
    import confirm from 'components/common/confirm';

    export default {
        name: 'financeBankList',
        components: {Page: Page, confirm: confirm},
        data: function () {
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    realName: '',
                    phoneNo: '',
                    idCardNo: ''
                },
                showMessage: {},
                rowItemId: -9999,
                message: '',
                title: '是否删除该条信息? ',
                dialogVisible:false,
                ruleForm:{
                    remark:'',
                    uuid:null
                },
                rules:{
                    remark: [
                        {required: true, message: '请输入备注', trigger: 'blur'}
                    ]
                },
                editLoading:false,
                infoTitle:'锁定',
                editType:'',
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
                    if(this.param[k]){
                        param[k] = this.param[k];
                    }
                }
                $('#list-content').mLoading("show");
                apiBank.getBankList(this, param).then(function (response) {
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
            isDelete: function (data) {
                if (data == 0) {
                    return '是';
                }
                return '否';
            },
            status: function (data) {
                if (data == 1) return '审核中';
                if (data == 2) return '审核成功';

                return '审核失败';
            },
            showInfo: function (row) {
                this.showMessage = row;
                $('#myModal').modal();
            },
            confirm: function (item) { //二次确认
                this.rowItemId = item.uuid;
                this.message = '用户银行卡号：' + item.bankCardNo;
                $('#myConfirm').modal();
            },
            deleteItem: function () {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiFinance.bankCardDel(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiFinance.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            bankCardAuth: function (id) {
                apiFinance.bankCardAuth(this, id, {status: 2}).then(function (response) {
                    let body = response.body;
                    apiFinance.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            doAction: function(uuid,type,bankCardNo){
               this.ruleForm = {
                    remark:'',
                    uuid:null
                };
                this.dialogVisible = true;
                let titleMap = {
                    lockBank : `锁定 （银行卡：${bankCardNo}）`,
                    unlockBank: `解锁 （银行卡：${bankCardNo}）`,
                    remark:`备注 （银行卡：${bankCardNo}）`
                };
                this.editType = type;
                this.infoTitle = titleMap[type];
                this.ruleForm.uuid = uuid;
            },
            handleSave: function(formName){
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.editLoading = true;
                        apiBank[_this.editType](_this, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.editLoading = false;
                            if (body && body.code == 1) {
                                _this.dialogVisible=false;
                                _this.getResource(this.todopage.page, _this.todopage.limit);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            }
        }
    }

    //
</script>

