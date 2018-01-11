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
                        <li class="active">业务类型</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">业务类型</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <a href="javascript:;" @click="caseAdd" class="btn btn-info  btn-sm">
                                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                        新增分类
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
                                        <el-table-column prop="name" label="分类名称">
                                        </el-table-column>
                                        <el-table-column prop="showName" label="手机显示名称">
                                        </el-table-column>
                                        <el-table-column label="是否上线">
                                            <template slot-scope="item">
                                                <el-tag
                                                    :type="item.row.state && (item.row.state.code == '1' ? 'success' : item.row.state.code == '2' ? 'warning' : 'danger') || '' "
                                                    close-transition>{{item.row.state && item.row.state.value}}</el-tag>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="sort" label="排序">
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作">
                                            <template slot-scope="item">
                                                <button title="编辑" class="btn btn-primary btn-xs" @click="modify(item.row)"><i class="icon-pencil"></i>编辑</button>
                                                <button title="删除" v-if="1!=1" class="btn btn-danger btn-xs" @click="confirm(item.row)"><i class="icon-trash"></i>删除</button>
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
                                <el-form-item label="图片预览">
                                    <span style="display:inline-block !important; padding: 5px;border: 1px solid #e2e2e4;">
                                            <img :src="ruleForm.iconUrl" style="width: 100px;height: 100px">
                                        </span>
                                </el-form-item>
                                <el-form-item label="分类展示图片" id="form-data-case">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-select placeholder="请选择" v-model="urlType">
                                                <el-option label="远程图片URL" value="1"></el-option>
                                                <el-option label="本地上传" value="2"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="16" v-if="urlType == 1">
                                            <input type="text" class="form-control" placeholder="远程图片URL" v-model="ruleForm.iconUrl">
                                        </el-col>
                                        <el-col :span="16" v-if="urlType == 2">
                                            <vue-core-image-upload
                                                text="分类展示图片"
                                                inputOfFile="file"
                                                v-bind:class="['btn','btn-primary','btn-sm']"
                                                v-bind:crop="false"
                                                v-bind:url="uploadUrl"
                                                v-bind:isXhr="true"
                                                v-bind:data="{type:3}"
                                                extensions="png,gif,jpeg,jpg"
                                                v-on:imageuploaded="imageuploaded"
                                                v-on:imageuploading="imageuploading">
                                            </vue-core-image-upload>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="分类名称" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="手机分类名称" prop="showName">
                                    <el-input v-model="ruleForm.showName"></el-input>
                                </el-form-item>
                                <el-form-item label="上级分类">
                                    <el-select placeholder="请选择" filterable v-model="ruleForm.parentId">
                                        <el-option label="顶级分类" :value="defOpt"></el-option>
                                        <el-option
                                            v-for="item in parentIds"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否显示">
                                    <el-switch on-text="是"
                                               off-text="否"
                                               v-model="ruleForm.state"
                                               on-value="1"
                                               off-value="-1">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item label="排序">
                                    <el-input v-model.number="ruleForm.sort"></el-input>
                                </el-form-item>
                                <el-form-item label="提成比例">
                                    <el-row>
                                        <el-col :span="20"><el-input v-model.number="ruleForm.rate"></el-input></el-col>
                                        <el-col :span="4">%</el-input></el-col>
                                    </el-row>
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
    import apiOperaCon from 'api/operationControl';
    import confirm from 'components/common/confirm';
    import VueCoreImageUpload  from 'components/common/vue.core.file.upload';

    export default {
        name: 'operaTypeList',
        components: {Page: Page, confirm: confirm,'vue-core-image-upload': VueCoreImageUpload},
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
                defOpt:0,
                ruleForm:{
                    parentId:0, //上级分类id
                    name:'', //分类名称
                    showName:'',//手机显示分类名称
                    state:'',//是否显示 1:是 .-1:否
                    iconUrl:'',//分类展示图片
                    sort:'',//排序
                    rate:''//提成比例
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    showName: [
                        {required: true, message: '请输入手机显示分类名称', trigger: 'blur'}
                    ],
                    sort: [
                        {required: true,type:'number', message: '请输入排序', trigger: 'blur'}
                    ],
                    rate: [
                        {required: true,type:'number', message: '请输入提成比例', trigger: 'blur'}
                    ],
                    iconUrl:[
                        { required: true, message: '请选择图片', trigger: 'blur' }
                    ]
                },
                parentIds:[],
                urlType:'2',
                uploadUrl:'',
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
                this.uploadUrl = apiOperaCon.upload;
            },
            //获取 父级信息
            gradeCategory: function(filter=-1){
                this.parentIds = [];
                apiOperaCon.gradeCategory(this, 0).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        for (let k in data) {
                            if(data[k]['id'] != filter){
                                this.parentIds.push({
                                    value: data[k]['id'],
                                    label: data[k]['name']
                                });
                            }
                        }
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
                apiOperaCon.categoryList(this, param).then(function (response) {
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
                apiOperaCon.categoryDel(this, this.rowItemId).then(function (response) {
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
                this.gradeCategory();
                this.dialogVisible = true;
                this.type = 1;
                this.infoTitle = '增加';
                this.ruleForm={
                    parentId:0, //上级分类id
                    name:'', //分类名称
                    showName:'',//手机显示分类名称
                    state:'1',//是否显示 1:是 .-1:否
                    iconUrl:'',//分类展示图片
                    sort:'',//排序
                    rate:''//提成比例
                };
            },
            modify: function(item){
                this.gradeCategory(item.id);
                this.dialogVisible = true;
                this.infoTitle = '修改';
                this.type = 2;
                this.ruleForm = {
                    parentId:item.parentId, //上级分类id
                    name:item.name, //分类名称
                    showName:item.showName,//手机显示分类名称
                    state:item.state&&item.state.code+''||2,//是否显示 1:是 .2:否
                    iconUrl:item.iconUrl,//分类展示图片
                    sort:item.sort,//排序
                    rate:item.rate,//提成比例
                    id:item.id
                }
            },
            handleSave: function(formName){
                let _this = this;
                let commitType = 'categoryAdd';
                if (this.type == 2) {
                    commitType = 'categoryPut';
                }else{
                    this.ruleForm.id &&  delete this.ruleForm.id;
                }
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.editLoading = true;
                        apiOperaCon[commitType](_this, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.editLoading = false;
                            if (body && body.code == 1) {
                                _this.dialogVisible=false;
                                _this.getResource(1, _this.todopage.limit);
                                _this.init();
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            updateState: function(id,state){
                $("body").mLoading("show");
                apiOperaCon.caseUpdateState(this, {id:id,state:state}).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    this.getResource(1, this.todopage.limit);
                }, function (response) {
                    console.log('error:', response);
                });
            },
            imageuploading:function(response) {
                $('#form-data-case').mLoading({
                    text:'正在上传，请稍后...'
                });
            },
            imageuploaded:function(response) {
                $('#form-data-case').mLoading("hide");
                this.$message(response.msg);
                if (response && response.code == 1) {
                    let data = response.data;
                    this.ruleForm.iconUrl = data.url;
                    return;
                }
            }
        }
    }
    //
</script>
