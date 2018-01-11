<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
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
                                                <el-input v-model="param.realName" placeholder="真实姓名" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="身份证号">
                                                <el-input v-model="param.idCardNo" placeholder="身份证号" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="绑定手机号">
                                                <el-input v-model="param.phoneNo" placeholder="绑定手机号" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column
                                            type="index"
                                            width="100"
                                            label="序号">
                                        </el-table-column>
                                        <el-table-column prop="realName" label="真实姓名" width="180">
                                        </el-table-column>
                                        <el-table-column prop="idCardNo" label="身份证号" width="180">
                                        </el-table-column>
                                        <el-table-column prop="bankCardNo" label="银行卡号" width="180">
                                        </el-table-column>
                                        <el-table-column prop="phoneNo" label="绑定手机号" width="180">
                                        </el-table-column>
                                        <el-table-column prop="bankName" label="开户银行" width="180">
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="绑定时间" width="180">
                                        </el-table-column>
                                        <el-table-column label="是否删除" width="180">
                                            <template slot-scope="item">
                                                {{item.row.isDelete && item.row.isDelete.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="状态" width="180">
                                            <template slot-scope="item">
                                                {{item.row.status && item.row.status.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="remark" label="备注" width="180">
                                        </el-table-column>

                                        <el-table-column fixed="right" label="操作" width="220">
                                            <template slot-scope="item">
                                                <button title="锁定" class="btn btn-danger btn-xs" v-if="item.row.isLocked.code != 0" @click="lock(item.row.uuid)"><i class="icon-lock">锁定</i></button>
                                                <button title="解锁" class="btn btn-warning btn-xs" v-if="item.row.isLocked.code == 0" @click="unlock(item.row.uuid)"><i class="icon-unlock-alt">解锁</i></button>
                                                <button title="备注" class="btn btn-primary btn-xs" @click="addRemark(null,item.row.uuid)"><i class="icon-pencil"></i>备注</button>
                                                <button title="查看详情" class="btn btn-primary btn-xs" @click="showInfo(item.row)">查看详情</button>
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
        </div>

        <el-dialog title="查看详情" :visible.sync="dialogInfo" :before-close="infoClose">
            <el-row style="margin-bottom: 20px">
                <el-col :span="24"><div class="grid-content bg-purple"><span class="title-color">真实姓名：</span>{{infoItem.realName}}</div></el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                <el-col :span="12"><div class="grid-content bg-purple"><span class="title-color">身份证号：</span>{{infoItem.idCardNo}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light"><span class="title-color">银行卡号：</span>{{infoItem.bankCardNo}}</div></el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                <el-col :span="24"><div class="grid-content bg-purple"><span class="title-color">开户银行：</span>{{infoItem.bankName}}</div></el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                <el-col :span="12"><div class="grid-content bg-purple-light"><span class="title-color"> 绑定手机号：</span>{{infoItem.phoneNo}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple"><span class="title-color">是否解绑：</span>{{infoItem.isLocked && infoItem.isLocked.value}}</div></el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                <el-col :span="12"><div class="grid-content bg-purple"><span class="title-color">绑定时间：</span>{{infoItem.createTime}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light"><span class="title-color">解绑时间：</span>{{infoItem.unbindTime}}</div></el-col>
            </el-row>
            <el-row style="margin-bottom: 20px">
                <el-col :span="12"><div class="grid-content bg-purple"><span class="title-color">状态：</span>{{infoItem.status && infoItem.status.value}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light"><span class="title-color">备注：</span>{{infoItem.remark}}</div></el-col>
            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogInfo = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加备注" v-model="dialogRemark" size="tiny" >
            <el-form ref="remarkForm" :model="remarkForm" :rules="remarkRules" label-width="120px" onsubmit="return false">
                <el-form-item label="添加备注" prop="remark">
                    <el-input type="textarea" placeholder="请输入20字以内的备注" v-model="remarkForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRemark = false">取 消</el-button>
                <el-button  type="primary" @click="addRemark('remarkForm')" :loading="remarkLoading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .title-color{
        color: #b94a48;
        font-weight: bold;
    }
</style>
<script>
    import Page from 'components/common/Page';
    import apiFinance from 'api/finance';

    export default {
        name: 'financeBankManagerList',
        components: {Page: Page},
        data: function () {
            var validateRemark = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入备注'));
                } else {
                    if (value.length > 20) {
                        callback(new Error('请输入20字以内的备注'));
                    }
                    callback();
                }
            };
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    realName:'', //用户银行卡绑定真实姓名
                    phoneNo: '', //用户银行卡绑定手机号
                    idCardNo:'' //用户银行卡绑定身份证号
                },
                dialogInfo:false,
                infoItem:{},
                dialogRemark:false,
                remarkLoading:false,
                remarkForm:{
                    remark:'',
                    uuid:''
                },
                remarkRules:{
                    remark: [
                        { validator: validateRemark, trigger: 'blur' }
                    ]
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
            search: function () {
                this.getResource(1, this.todopage.limit);
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
                apiFinance.bankManagerList(this, param).then(function (response) {
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
            showInfo:function(item){
                this.infoItem = Object.assign({}, item);
                this.dialogInfo = true;
            },
            infoClose:function(){
                this.dialogInfo = false;
            },
            addRemark:function(formName,id){
                if(!formName){
                    this.remarkForm.uuid = id;
                    this.dialogRemark = true;
                    return;
                }
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.remarkLoading = true;
                        apiFinance.bankManagerRemark(_this, _this.remarkForm).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.remarkLoading = false;
                            if (body && body.code == 1) {
                                _this.remarkForm.uuid = '';
                                _this.remarkForm.remark = '';
                                _this.dialogRemark=false;
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                })
            },
            lock:function(id){
                let _this = this
                this.$confirm('锁定之后该银行卡不可用，是否锁定', '确认锁定', {
                    confirmButtonText: '确认锁定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiFinance.bankManagerLock(_this, {uuid:id}).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1) {
                            _this.$message('锁定成功！');
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }).catch(() => {

                });
            },
            unlock:function(id){
                apiFinance.bankManagerUnlock(this, {uuid:id}).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        _this.$message('解锁成功！');
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
