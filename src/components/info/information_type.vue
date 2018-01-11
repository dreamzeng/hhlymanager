<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">资讯管理</li>
                        <li class="active">资讯类型</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">资讯类型</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a href="javascript:;" @click="caseAdd" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新增类型
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="id" label="分类ID">
                                        </el-table-column>
                                        <!--<el-table-column label="设备">
                                            <template scope="item">
                                                {{item.row.showDevice && item.row.showDevice.value}}
                                            </template>
                                        </el-table-column>-->
                                        <el-table-column label="端口">
                                            <template slot-scope="item">
                                                {{item.row.showUserType && item.row.showUserType.value}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="categoryName" label="一级分类">
                                        </el-table-column>
                                        <el-table-column label="状态">
                                            <template slot-scope="item">
                                               {{item.row.status && item.row.status.value}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作">
                                            <template slot-scope="item">
                                                <button title="停用" v-if="item.row.status && item.row.status.code == 1 " class="btn btn-warning btn-xs" @click="changStatus(0,item.row.id)"><i class="icon-lock"></i>停用</button>
                                                <button title="启用"  v-if="item.row.status && item.row.status.code == 0 " class="btn btn-primary btn-xs" @click="changStatus(1,item.row.id)"><i class="icon-ok"></i>启用</button>
                                                <!--<button title="删除" class="btn btn-danger btn-xs" @click="confirm(item.row)"><i class="icon-trash"></i>删除</button>-->
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
            <!--新建类型-->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel-body">
                        <el-dialog :title="infoTitle" v-model="dialogVisible" size="tiny" >
                            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" onsubmit="return false">
                                <el-form-item label="一级分类" prop="categoryName">
                                    <el-input v-model="ruleForm.categoryName"></el-input>
                                </el-form-item>
                                <!--<el-form-item label="设备" prop="showDevice">
                                    <el-select  placeholder="请选择" filterable v-model="ruleForm.showDevice">
                                        <el-option
                                            v-for="item in showDeviceList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>-->
                                <el-form-item label="端口" prop="showUserType">
                                    <el-select  placeholder="请选择" filterable v-model="ruleForm.showUserType">
                                        <el-option
                                            v-for="item in showUserTypeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
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
        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import confirm from 'components/common/confirm';

    import {articleCategory,getArticleCategoryType,getArticleCategoryDevice,articleCategoryAdd,articleCategoryUpdate} from 'api/info';

    export default {
        name: 'informationType',
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
                    name: '',
                    state:''//活动状态
                },
                ruleForm:{
                    categoryName:'',//手机显示分类名称
                    showUserType:'',//端口
                    //showDevice:''//设备
                },
                rules: {
                    categoryName: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    showUserType: [
                        {required: true, message: '请选择端口', trigger: 'blur'}
                    ]/*,
                    showDevice: [
                        {required: true, message: '请选择设备', trigger: 'blur'}
                    ]*/
                },
                showUserTypeList:[], //端口选项
                //showDeviceList:[], //设备选项
                dialogVisible: false,
                editLoading: false,
                type:1,
                rowItemId: -9999,
                message: '',
                title: '是否删除该条信息? ',
                infoTitle:'新增'
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                //获取端口
                this.showUserTypeList.length ==0 && getArticleCategoryType(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        for (let k in data) {
                            this.showUserTypeList.push({
                                value: data[k]['key'],
                                label: data[k]['value']
                            });
                        }
                    }
                }, function (response) {
                    console.log('error:', response);
                });
                //获取设备
                /*this.showDeviceList.length ==0 && getArticleCategoryDevice(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 ) {
                        let data = body.data;
                        for (let k in data) {
                            this.showDeviceList.push({
                                value: data[k]['key'],
                                label: data[k]['value']
                            });
                        }
                    }
                }, function (response) {
                    console.log('error:', response);
                });*/
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
                articleCategory(this, param).then(function (response) {
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
            confirm: function (item) { //删除确认
                this.rowItemId = item.id;
                this.message = '名称：' + item.categoryName;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                articleCategoryUpdate(this, {delFlag:1}, this.rowItemId).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                        this.init();
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            caseAdd: function(){
                this.dialogVisible = true;
                this.type = 1;
                this.infoTitle = '增加';
                this.ruleForm={
                    categoryName:'',//手机显示分类名称
                    showUserType:'',//端口
                    //showDevice:''//设备
                };
            },
            handleSave: function(formName){
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.editLoading = true;
                        articleCategoryAdd(_this, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.editLoading = false;
                            if (body && body.code == 1) {
                                _this.dialogVisible=false;
                                _this.getResource(1, _this.todopage.limit);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            changStatus:function(value,id){
                let _this = this;
                articleCategoryUpdate(_this, {status:value},id).then(function (response) {
                    let body = response.body;
                    _this.$message(body.msg);
                    _this.editLoading = false;
                    if (body && body.code == 1) {
                        _this.dialogVisible=false;
                        _this.getResource(1, _this.todopage.limit);
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
