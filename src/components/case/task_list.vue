<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">案件模块管理</li>
                        <li class="active">任务列表</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">任务列表</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a href="javascript:;" @click="caseAdd" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新建
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <div class="table-scrollable">
                                <div class="panel-body panel-body-rest">
                                    <!--表格-->
                                    <el-table :data="dataList" border style="width: 100%">
                                        <el-table-column prop="name" label="名称">
                                        </el-table-column>
                                        <el-table-column label="状态">
                                            <template slot-scope="item">
                                                {{item.row.state == 0 ? '未发布':item.row.state == 1 ? '已发布' : '停用' }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="path" label="关联">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="300">
                                            <template slot-scope="item">
                                                <button title="编辑" class="btn btn-primary btn-xs" @click="modify(item.row)"><i class="icon-pencil"></i>编辑</button>
                                                <button title="删除" class="btn btn-danger btn-xs" @click="confirm(item.row)"><i class="icon-trash"></i>删除</button>
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
        <!--新建类型-->
        <el-dialog :title="infoTitle" v-model="dialogVisible" size="tiny" >
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" onsubmit="return false">
                <el-form-item label="案件列表名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="关联案件类型" prop="parentId">
                    <el-select v-model="ruleForm.parentId" filterable placeholder="请选择">
                        <el-option
                            v-for="item in options"
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

        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import apiCase from 'api/case';
    import confirm from 'components/common/confirm';

    export default {
        name: 'caseTypeList',
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
                    level:2,
                    name: '',
                    state:''//活动状态
                },
                ruleForm:{
                    parentId:'',
                    name:''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    parentId:[
                        {required: true, type:'number', message: '请选择关联案件类型', trigger: 'change'}
                    ]
                },
                options: [],
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
                apiCase.cascade(this, 0).then(function (response) {
                    let body = response.body;
                    let opt = [];
                    if (body && body.code == 1) {
                        let data = body.data;
                        for (let i= 0,l = data.length;i<l;i++) {
                            opt.push({
                                value: data[i]['id'],
                                label: data[i]['name']
                            });
                        }
                        this.options = opt;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
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
                    if(this.param[k]){
                        param[k] = this.param[k];
                    }
                }
                $('#list-content').mLoading("show");
                apiCase.caseList(this, param).then(function (response) {
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
                this.message = '名称：' + item.name;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (this.rowItemId < 0) return;
                $("body").mLoading("show");
                apiCase.caseDel(this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            caseAdd: function(){
                this.dialogVisible = true;
                this.type = 1;
            },
            modify: function(item){
                this.dialogVisible = true;
                this.infoTitle = '修改';
                this.ruleForm.name = item.name;
                this.ruleForm.id = item.id;
                this.ruleForm.parentId = item.parentId;
                this.type = 2;
            },
            handleSave: function(formName){
                let _this = this;
                let commitType = 'caseAdd';
                if (this.type == 2) {
                    commitType = 'casePut';
                }
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.editLoading = true;
                        apiCase[commitType](_this, _this.ruleForm).then(function (response) {
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
            }
        }
    }
    //
</script>
