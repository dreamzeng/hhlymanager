<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li class="active">用户模块</li>
                        <li class="active">认证管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="panel">
                <div class="panel-body">
                    <a href="javascript:;" @click="handleChange('1')">
                        <el-tag :class="{ activeTag : activeTag == '1' }">律师认证</el-tag>
                    </a>
                    <a href="javascript:;" @click="handleChange('2')">
                        <el-tag :class="{ activeTag : activeTag == '2' }">知识产权代理人认证</el-tag>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">认证管理</div>
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
                                            <el-form-item class="el-form-item-rest" label="身份证号">
                                                <el-input v-model="param.idCardNO" placeholder="身份证号" @keyup.enter.native="search" ></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="姓名">
                                                <el-input v-model="param.userName" placeholder="姓名" @keyup.enter.native="search" ></el-input>
                                            </el-form-item>
                                            <el-form-item class="el-form-item-rest" label="资格证号码">
                                                <el-input v-model="param.certificateNO" placeholder="资格证号码" @keyup.enter.native="search"></el-input>
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
                                        <el-table-column label="资格证照片" width="150">
                                            <template slot-scope="item">
                                                <div style="margin: 5px;text-align: center">
                                                    <img :src="item.row.pic" height="36px">
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="realName" label="姓名">
                                        </el-table-column>
                                        <el-table-column prop="sparePhone" label="联系方式">
                                        </el-table-column>
                                        <el-table-column prop="idCard" label="身份证号码">
                                        </el-table-column>
                                        <el-table-column label="资格证号码">
                                            <template slot-scope="item">
                                                {{item.row.code }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="认证状态">
                                            <template slot-scope="item">
                                                {{item.row.isAuth && item.row.isAuth.value }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="200">
                                            <template slot-scope="item">
                                                <button title="审核认证" class="btn btn-success btn-xs" @click="doAction(item.row,'authSuccess')"><i class="icon-check">认证</i></button>
                                                <button title="驳回" class="btn btn-danger btn-xs" @click="doAction(item.row,'authFail')"><i class="glyphicon glyphicon-share-alt">驳回</i></button>
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

        <el-dialog title="驳回理由" v-model="dialogForm" size="tiny" >
            {{message}}
            <el-form ref="formParam" :model="formParam" :rules="formRules" label-width="120px" onsubmit="return false">
                <el-form-item  prop="checkList">
                    <div v-for="(item, index) in  optionDictionaryList" :key="index">
                        <label style="cursor: pointer;font-weight: normal;">
                            <span>
                                <input type="radio" class="checkboxes" :value="item.value" v-model="formParam.checkList">
                            </span>
                            <span style="margin-left: 12px" >
                                <div style="display: inline-block">{{index+1}}、{{item.value}}</div>
                                <div style="display: inline-block" v-if="index == optionDictionaryList.length-1">
                                    <input type="text" class="form-control" v-model="formParam.other"  style=" border-top: none;border-left: none; border-right: none;">
                                </div>
                            </span>
                        </label>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm = false">取 消</el-button>
                <el-button  type="primary" @click="submitForm('formParam')" :loading="formLoading">确 定</el-button>
            </div>
        </el-dialog>

    </div>
    <!--main content end-->
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    .activeTag {
        color: #FFF;
        background: #2185D0;
    }
</style>
<script>
    import Page from 'components/common/Page';
    import {cookieTools} from 'lib/utils';
    import { authAgentApi,lawyerAuthApi } from 'api/third';
    import { Loading } from 'element-ui';

    export default {
        name: 'thirdAuthAgentList',
        components: {Page: Page},
        data: function () {
            let _this = this;
            let validateCheckList = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('请选择理由'));
                } else {
                    if(value == '其它' && _this.formParam.other.length == 0){
                        callback(new Error('请输入理由'));
                    }else{
                        callback();
                    }

                }
            };
            let _paramFrom =  cookieTools.get('paramFrom') || '{}';
            let paramFrom = JSON.parse(_paramFrom);
            let _todopage = cookieTools.get('todopage') || '{}';
            let todopage = JSON.parse(_todopage);
            return {
                activeTag:'2', // tab 标签切换 , 1 律师认证 , 2 知识产权代理人认证
                dataList: [],
                todopage: {
                    total: 1,
                    limit: todopage['limit'] || 10,  //每页显示多少条 limit
                    page: todopage['page'] || 1 //当前页码 page
                },
                param: {
                    idCardNO:paramFrom['idCardNO'] ||'',
                    userName: paramFrom['userName'] ||'',
                    certificateNO:paramFrom['certificateNO'] ||''
                },

                message: '',
                optionDictionaryList:[{value:'执业证号不正确'},
                                    {value:'身份证号不正确'},
                                   /* {value:'身份证照片模糊'},
                                    {value:'身份证照片有遮挡'},*/
                                    {value:'身份证信息与认证申请人不符'},
                                    {value:'所有提交资料与认证申请人不符'},
                                    {value:'其它'}],
                dialogForm:false,
                formLoading:false,
                formParam:{
                    checkList:'',
                    other:''
                },
                formRules:{
                    checkList: [
                        { validator: validateCheckList, trigger: 'change' }
                    ]
                },
                rowItemId:''
            }
        },
        watch: {
            param:{
                //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
                handler:function(curVal,oldVal){
                    cookieTools.set('paramFrom',JSON.stringify(curVal));
                },
                deep:true
            },
            todopage:{
                handler:function(curVal,oldVal){
                    cookieTools.set('todopage',JSON.stringify(curVal));
                },
                deep:true
            }
        },
        computed:{
            api(){
                let _api = lawyerAuthApi;
                if(this.activeTag == '2'){
                    _api = authAgentApi;
                }
                return _api;
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
                this.api.list(this, param).then(function (response) {
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
            submitForm:function(formName){
                let _this = this;
                let {checkList,other}= this.formParam;
                if( checkList.indexOf('其它') > -1 && other != ''){
                    checkList = other;
                }
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.formLoading = true;
                        _this.api['authFail'](_this, _this.rowItemId,checkList).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.formLoading = false;
                            if (body && body.code == 1) {
                                _this.formParam = {
                                    checkList:'',
                                    other:''
                                };
                                _this.dialogForm=false;
                                _this.getResource(_this.todopage.page, _this.todopage.limit);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            doAction: function(item,action){
                if(action == 'authSuccess'){
                    this.$confirm('是否认证：姓名：' + item.realName + '？', '确定认证', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let loading = Loading.service({text:"数据提交中，请等待..."});
                        this.api[action](this, item.id).then(function (response) {
                            loading.close();
                            let body = response.body;
                            this.$message(body.msg);
                            if (body && body.code == 1) {
                                this.getResource(this.todopage.page, this.todopage.limit);
                            }
                        }, function (response) {
                            loading.close();
                            console.log('error:', response);
                        });
                    }).catch(() => {

                    });
                    return;
                }
                this.message = '姓名：' + item.realName;
                this.dialogForm = true;
                this.rowItemId = item.id;
            },
            handleChange: function(type){
                this.param = {
                    idCardNO:'',
                    userName: '',
                    certificateNO:''
                };
                this.activeTag = type;
                this.getResource(this.todopage.page, this.todopage.limit);
            }
        }
    }
    //
</script>