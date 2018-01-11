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
                        <li class="active">第三方管理</li>
                        <li class="active">律师认证</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">律师认证</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
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
                                                <label style="margin: 0 5px">职业证号</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="职业证号" v-model.trim="param.code">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">姓名</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="姓名" v-model.trim="param.realName">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">备用电话</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="备用电话" v-model.trim="param.sparePhone">
                                            </div>
                                            <div class="form-group">
                                                <label style="margin: 0 5px">律师所</label>
                                                <input type="text" style="width: 150px" class="form-control" placeholder="律师所" v-model.trim="param.company">
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
                                            <th style="width: 5%;">职业证件</th>
                                            <th style="width: 120px;">身份证件</th>
                                            <th>职业证号</th>
                                            <th>身份证号</th>
                                            <th>姓名</th>
                                            <th>备用电话</th>
                                            <th>认证状态</th>
                                            <th>从事年限</th>
                                            <th>擅长领域</th>
                                            <!-- <th>最高费用</th>
                                            <th>律师所</th>
                                            <th>办公地址</th> -->
                                            <th style="width: 10%;"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item, index) in dataList" :key="index">
                                            <td><img alt="" :src="item.pic" @click="images=[item.pic]; imgIndex=0;" style="width: 42px;height: 42px;margin:auto 0;cursor: pointer;"></td>
                                            <td>
                                                <img alt="" :src="item.cardPic" v-if="item.cardPic" @click="images=[item.cardPic]; imgIndex=0;" style="width: 42px;height: 42px;margin:auto 0;cursor: pointer;">
                                                <img alt="" :src="item.cardBackPic" v-if="item.cardBackPic" @click="images=[item.cardBackPic]; imgIndex=0;" style="width: 42px;height: 42px;margin:auto 0;cursor: pointer;">
                                            </td>
                                            <td>{{item.code}}</td>
                                            <td>{{item.idCard}}</td>
                                            <td>{{item.realName}}</td>
                                            <td>{{item.sparePhone}}</td>
                                            <td style="color: #FF6C60">{{(item.isAuth && item.isAuth.value) || '未知'}}</td>
                                            <td>{{item.workTime}}</td>
                                            <td>{{item.caseList && item.caseList.length ? item.caseList.toString() : ''}}</td>
                                            <!-- <td>{{item.maxPrice||0}}</td>
                                            <td>{{item.company}}</td>
                                            <td>{{item.address}}</td> -->
                                            <td style="text-align: center">
                                                <button title="审核认证" class="btn btn-success btn-xs" @click="confirm(item,1)"><i class="icon-check">认证</i></button>
                                                <button title="驳回" class="btn btn-danger btn-xs" @click="reject(item)"><i class="glyphicon glyphicon-share-alt">驳回</i></button>
                                            </td>
                                        </tr>
                                        <tr v-show="dataList.length<1">
                                            <td colspan="12">无数据。。。</td>
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
            <!-- 认证确认 -->
            <confirm v-on:confirm="authAction" :message="message" :title="title"></confirm>


            <el-dialog :title="dialogTitle" v-model="dialogForm" size="tiny" >
                {{message}}
                <el-form ref="formParam" :model="formParam" :rules="formRules" label-width="120px" onsubmit="return false">
                    <el-form-item  prop="checkList">
                        <div v-for="(item, index) in  optionDictionaryList">
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
            <!-- 图片放大 -->
            <img-light-box :images="images" :index="imgIndex" @close="imgIndex = -1"></img-light-box>
        </div>
    </div>
    <!--main content end-->
</template>

<script>
    import Page from 'components/common/Page';
    import apiThird from 'api/third';
    import confirm from 'components/common/confirm';
    import imgLightBox from 'components/common/imgLightBox';

    export default {
        name: 'authList',
        components: {Page: Page, confirm: confirm, imgLightBox},
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
            return {
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    code: '', realName: '', sparePhone: '', company: ''
                },
                rowItemId: -9999,
                message: '',
                title: '',
                type: 1,
                optionDictionaryList:[{value:'执业证号不正确'},
                                    {value:'身份证号不正确'},
                                    {value:'身份证照片模糊'},
                                    {value:'身份证照片有遮挡'},
                                    {value:'身份证信息与认证申请人不符'},
                                    {value:'所有提交资料与认证申请人不符'},
                                    {value:'其它'}],
                dialogTitle:'驳回理由',
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
                //图片放大参数
                images:[],
                imgIndex:-1
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
                param['isAuth'] = 1;
                $('#list-content').mLoading("show");
                apiThird.lawyerAuthList(this, param).then(function (response) {
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
            reject:function(item){
                this.rowItemId = item.id;
                this.message = '姓名：' + item.realName;
                this.dialogForm = true;
            },
            submitForm:function(formName){
                let {checkList,other}= this.formParam;
                if( checkList.indexOf('其它') > -1 && other != ''){
                    checkList = other;
                }
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.formLoading = true;
                        apiThird['authFail'](_this, _this.rowItemId,checkList).then(function (response) {
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
            confirm: function (item, type) { //删除确认
                this.rowItemId = item.id;
                this.message = '姓名：' + item.realName;
                if (type == 1) {
                    this.title = '是否认证该条信息?';
                    this.type = 1;
                } else {
                    this.title = '是否驳回该条信息?';
                    this.type = 2;
                }
                $('#myConfirm').modal();
            },
            authAction: function () {
                if (this.rowItemId < 0) return;
                let typeAct = 'authSuccess';
                if (this.type == 2) {
                    typeAct = 'authFail';
                }
                $("body").mLoading("show");
                apiThird[typeAct](this, this.rowItemId).then(function (response) {
                    let body = response.body;
                    apiThird.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            }
        }
    }

    //
</script>

