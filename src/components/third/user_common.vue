<template>
    <!--main content start-->
    <div id="main-content">
        <div v-bind:class="[{'wrapper2':isClass},'wrapper']">
            <div v-if="isStatus != 'push'" class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link>
                        </li>
                        <li class="active">第三方管理</li>
                        <li class="active">{{title}}</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div v-if="isStatus != 'push'" class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">{{title}}</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <button class="btn btn-info" type="button" @click="exportExcel">导出</button>
                                </div>
                            </div>
                        </div>
                        <div class="dataTables_wrapper form-inline" id="list-content">
                            <!-- 搜索 -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <el-form :inline="true" :model="param">
                                            <el-form-item label="地区">
                                                <v-distpicker hide-area wrapper="xaddress" @selected="onSelectedCity" @province="onProvince"></v-distpicker>
                                            </el-form-item>
                                            <el-form-item label="登录名">
                                                <el-input v-model="param.userName" placeholder="登录名" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item label="姓名">
                                                <el-input v-model="param.realName" placeholder="姓名" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item label="邮箱">
                                                <el-input v-model="param.email" placeholder="邮箱" @keyup.enter.native="search" style="width: 150px;"></el-input>
                                            </el-form-item>
                                            <el-form-item label="注册时间">
                                                <el-row>
                                                    <el-col :span="12"><div class="grid-content bg-purple">
                                                        <el-date-picker type="datetime" placeholder="开始时间" v-model="param.createTimeStart" @change="createTimeStart" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                    <el-col :span="12"><div class="grid-content bg-purple-light">
                                                        <el-date-picker type="datetime" placeholder="结束时间" v-model="param.createTimeEnd" @change="createTimeEnd" style="width: 200px;"></el-date-picker>
                                                    </div></el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item  label="性别">
                                                <el-select v-model="param.sex" placeholder="性别" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="男" value="Male"></el-option>
                                                    <el-option label="女" value="Female"></el-option>
                                                    <el-option label="未知" value="Nil"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item v-if="userType == '2'" label="状态">
                                                <el-select v-model="param.state" placeholder="状态" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="开启" value="1"></el-option>
                                                    <el-option label="锁定" value="0"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item v-if="userType == '1'" label="认证状态">
                                                <el-select v-model="param.isAuth" placeholder="认证状态" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="未认证" value="NEW"></el-option>
                                                    <el-option label="认证中" value="CERTIFICATION"></el-option>
                                                    <el-option label="认证通过" value="SUCCESS"></el-option>
                                                    <el-option label="认证失败" value="FAIL"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-button type="danger" @click="search">搜索</el-button>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <!-- 搜索结束 -->
                            <div class="table-scrollable">
                                <div class="panel-body">
                                    <!--表格-->
                                    <el-table :data="dataList" @selection-change="handleSelectionChange" border style="width: 100%">
                                        <el-table-column  type="selection" width="50">
                                        </el-table-column>
                                        <el-table-column  label="头像" width="150">
                                            <template slot-scope="item">
                                                <img alt="" :src="item.row.logo" style="width: 42px;height: 42px;margin:auto 0;">
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="userType == null"  label="类型" width="150">
                                            <template slot-scope="item">
                                                {{item.row.type && item.row.type.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="登录名" width="150">
                                            <template slot-scope="item">
                                                {{check(item.row.userName)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="realName" width="150" label="姓名">
                                        </el-table-column>
                                        <el-table-column prop="email" label="邮箱" width="150">
                                        </el-table-column>
                                        <el-table-column prop="phone" label="联系方式" width="150">
                                        </el-table-column>
                                        <el-table-column label="地区" width="150">
                                            <template slot-scope="item">
                                                {{area(item.row)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="name" v-if="userType == '2'" label="状态" width="100">
                                            <template slot-scope="item">
                                                {{item.row.state && item.row.state.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="name" v-if="userType == '1'" label="认证状态" width="150">
                                            <template slot-scope="item">
                                                {{(item.row.isAuth && item.row.isAuth.value) || '未知'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="在线状态" v-if="userType == '2'" width="150">
                                            <template slot-scope="item">
                                                {{item.row.isWork?'在线':'离线'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="性别" width="150">
                                            <template slot-scope="item">
                                                {{item.row.sex && item.row.sex.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="设备" width="150">
                                            <template slot-scope="item">
                                                {{item.row.registerDevice && item.row.registerDevice.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="禁用理由" width="150">
                                            <template slot-scope="item">
                                                {{ item.row.state && item.row.state.code != 1 && item.row.stateDesc || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-if="userType == '1'" prop="lawerName" label="律师所" width="150">
                                        </el-table-column>
                                        <el-table-column v-if="userType == '1'" prop="lawerAddress" label="律所地址" width="150">
                                        </el-table-column>
                                        <el-table-column v-if="userType == '1'" prop="title" label="职位" width="150">
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="注册时间" width="150">
                                        </el-table-column>
                                        <el-table-column prop="lastLoginIp" label="最后登录IP" width="150">
                                        </el-table-column>

                                        <el-table-column prop="changeNum" v-if="userType == '1'" label="更换次数" width="150">
                                        </el-table-column>
                                        <el-table-column prop="lawyerCompany" v-if="userType == '1'" label="律师公司" width="150">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="150" v-if="isStatus != 'push'">
                                            <template slot-scope="item">
                                                <button title="律师详情" v-if="userType == '1'" class="btn btn-success btn-xs" @click="showInfo(item.row.id)"><i class="icon-external-link"></i></button>
                                                <button title="禁用" class="btn btn-danger btn-xs" @click="activeLockConfirm(item.row.id)" v-if="item.row.state && item.row.state.code ==1"><i class="icon-lock">禁用</i></button>
                                                <button title="解除禁用" class="btn btn-info btn-xs" @click="activeUnlock(item.row.id)" v-if="item.row.state && item.row.state.code !=1"><i class="icon-unlock">解除禁用</i></button>
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
        <!-- 律师详情 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width: 850px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">律师信息</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>职业营照</label>
                            <div class="col-md-12" style="vertical-align: middle;padding: 5px;;margin-bottom:5px;border: 1px solid #e2e2e4;">
                                <span style="display:inline-block !important; padding: 5px;">
                                  <img :src="showMessage.pic" style="width:100px;height:100px;">
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>身份证件</label>
                            <div class="col-md-12" style="vertical-align: middle;padding: 5px;;margin-bottom:5px;border: 1px solid #e2e2e4;">
                                <span style="display:inline-block !important; padding: 5px;">
                                  <img :src="showMessage.cardPic" style="width:100px;height:100px;">
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-2" style="padding: 0;">姓名</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.realName">
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding: 0;">
                                    <div class="col-md-2" style="padding: 0;">联系方式</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.sparePhone">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-2" style="padding: 0;">认证状态</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.isAuth && showMessage.isAuth.value">
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding: 0;">
                                    <div class="col-md-2" style="padding: 0;">工作状态</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.isWork?'在线':'下线'">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-2" style="padding: 0;">职业证号</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.code">
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding: 0;">
                                    <div class="col-md-2" style="padding: 0;">身份证</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.idCard">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-2" style="padding: 0;">公司</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.company">
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding: 0;">
                                    <div class="col-md-2" style="padding: 0;">地址</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.address">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-2" style="padding: 0;">工作年限</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.workTime">
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding: 0;">
                                    <div class="col-md-2" style="padding: 0;">最高出场费</div>
                                    <div class="col-md-10">
                                        <input type="text" name="txt_departmentname" class="form-control" disabled="disabled" :value="showMessage.maxPrice">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12" style="padding-right: 0;">
                                    <div class="col-md-1">案件描述</div>
                                    <div class="col-md-11">
                                        <textarea class="form-control" rows="3" disabled="disabled">{{showMessage.introduce}}</textarea>
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
        <el-dialog title="禁用确认" v-model="dialogVisible" size="tiny" >
            <el-form ref="lockForm" :model="lockForm" :rules="lockFormRules" label-width="120px" onsubmit="return false">
                <el-form-item label="禁用理由" prop="lockReasonCode">
                    <el-select v-model="lockForm.lockReasonCode" placeholder="请选择活动区域">
                        <el-option label="用户屡次发表虚假信息,不文明用语" value="1"></el-option>
                        <el-option label="用户多次输入密码错误" value="2"></el-option>
                        <el-option label="用户刷单异常" value="3"></el-option>
                        <el-option label="用户恶意退款" value="4"></el-option>
                        <el-option label="其它" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="activeLock('lockForm')" :loading="editLoading">确认</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog v-model="isShow" title="请选择导出字段(默认全选)">
            <div style="margin-bottom: 20px;text-align: center">
                <el-radio  v-model="radio" label="1">全选用户数据</el-radio>
                <el-radio  v-model="radio" label="2">选中的用户数据</el-radio>
            </div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="margin-bottom: 20px">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            <div style="text-align: center">
                <el-button type="primary" @click="confirmExport">确认导出</el-button>
                <el-button @click="isShow=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .activeTag{
        color: #FFF;background: #2185D0
    }
    .el-checkbox{
        margin-left: 15px;
    }
    .el-checkbox+.el-checkbox{
        margin-top: 10px;
    }
    .wrapper2{
        margin-top: 0px;
    }
</style>

<script>
    import VDistpicker from 'components/common/distpicker/Distpicker'
    import Page from 'components/common/Page';
    import apiThird from 'api/third';
    export default {
        name: 'userCommon',
        components: {Page: Page,VDistpicker:VDistpicker},
        props: {
            userType: {
                type: String,
                default: '2' // 2 为用户 ， 1 为律师  3 全部用户
            },
            isStatus:{
                type:String,
                default:'' // 默认为空, push为推送消息
            },
            isClass:{
                type:Boolean,
                default:false
            }
        },
        data: function () {
            return {
                radio:"1",
                isShow:false,
                multipleSelection:[],
                checkAll: true,
                checkedCities: ["登录名","姓名","邮箱","联系方式","省","市","状态","性别","设备","禁用理由","注册时间","最后登录IP"],
                cities: ["登录名","姓名","邮箱","联系方式","省","市","状态","性别","设备","禁用理由","注册时间","最后登录IP"],
                U_list:[
                    {
                        label:"登录名",
                        value:"userName"
                    },
                    {
                        label:"姓名",
                        value:"realName"
                    },
                    {
                        label:"邮箱",
                        value:"email"
                    },
                    {
                        label:"联系方式",
                        value:"phone"
                    },
                    {
                        label:"省",
                        value:"province"

                    },
                    {
                        label:"市",
                        value:"city"
                    },
                    {
                        label:"状态",
                        value:"state"
                    },
                    {
                        label:"性别",
                        value:"sex"
                    },
                    {
                        label:"设备",
                        value:"registerDevice"
                    },
                    {
                        label:"禁用理由",
                        value:"stateDesc"
                    },
                    {
                        label:"注册时间",
                        value:"createTime"
                    },
                    {
                        label:"最后登录IP",
                        value:"lastLoginIp"
                    },
                ],
                headList:'userName,realName,email,phone,province,city,state,sex,registerDevice,stateDesc,createTime,lastLoginIp',
                isIndeterminate: true,
                dataList: [],
                todopage: {
                    total: 1,
                    limit: 10,  //每页显示多少条 limit
                    page: 1 //当前页码 page
                },
                param: {
                    userName: '',
                    realName: '',
                    email: '',
                    state: '',
                    sex: '',
                    isAuth:'',
                    city:'',
                    createTimeStart:'',
                    createTimeEnd:''
                },
                lockForm:{
                    id:'',
                    lockReasonCode:'1'
                },
                lockFormRules:{
                    lockReasonCode: [
                        {required: true, message: '请选择禁用理由', trigger: 'change'}
                    ]
                },
                title:'用户列表',
                showMessage: {},
                dialogVisible: false,
                editLoading: false,
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            confirmExport(){
                if(this.radio == 1){
                    if(this.headList.length>0){
                        window.open(apiThird.allOrder(this.headList+"&city="+this.param.city+"&userName="+this.param.userName+"&realName="+this.param.realName+"&email="+this.param.email+"&createTimeStart="+this.param.createTime
                            +"&createTimeEnd="+this.param.createTimeEnd+"&sex="+this.param.sex+"&state="+this.param.state+"&type="+this.userType));
                    }else{
                        this.$alert('请至少选择一个字段', '注意事项', {
                            confirmButtonText: '确定',
                        });
                    }
                }else{
                    if(this.multipleSelection.length>0){
                        let list=[];
                        this.multipleSelection.forEach(function (v,k) {
                            list.push(v.id)
                        });
                        if(this.headList.length>0){
                            window.open(apiThird.chooseOrder(this.headList+"&checkedId="+list.toString()))
                        }else{
                            this.$alert('请至少选择一个字段', '注意事项', {
                                confirmButtonText: '确定',
                            });
                        }
                    }else{
                        this.$alert('请选择导出记录', '注意事项', {
                            confirmButtonText: '确定',
                        });
                    }
                }
            },
            exportExcel(){
                    this.isShow=true;
            },
            handleCheckAllChange(event) {
                this.checkedCities = event.target.checked ? this.cities : [];
                this.isIndeterminate = false;
                if(this.checkedCities === []){
                    this.headList=""
                }else{
                    let list=[];
                    for (var s in this.checkedCities){
                        for(var x in this.U_list){
                            if(this.U_list[x].label==this.checkedCities[s]){
                                list.push(this.U_list[x].value);
                            }
                        }
                    }
                    this.headList=list.toString()
                }
            },
            handleCheckedCitiesChange(value) {
                let list=[]
                for (var s in value){
                    for(var x in this.U_list){
                        if(this.U_list[x].label==value[s]){
                            list.push(this.U_list[x].value);
                        }
                    }
                }
                this.headList=list.toString();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            init: function () {
                if(this.userType == 2){
                    this.title = '用户列表'
                    return;
                }
                if(this.userType == 1){
                    this.title = '律师列表'
                    return;
                }
                if(this.userType == 3){
                    this.title = '全部用户'
                    return;
                }
            },
            //page:当前页 ,limit: 每页显示多少条
            getResource: function (page, limit) {
                let param = {
                    page: page, limit: limit
                };
                this.todopage.limit = limit;
                this.todopage.page = page;

                for (let k in this.param) {
                    if(this.param[k] != ''){
                        param[k] = this.param[k];
                    }
                }
                param['type'] = this.userType;
                if(this.userType == 3){
                    delete param['type'];
                }
                $('#list-content').mLoading("show");
                apiThird.userList(this, param).then(function (response) {
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
            createTimeStart: function(val){
                this.param.createTimeStart = val;
            },
            createTimeEnd: function(val){
                this.param.createTimeEnd = val;
            },
            area:function(item){
                let _a = '';
                if(item.city){
                    _a +=' 市：'+item.city;
                }
                if(item.province){
                    _a +=' 省：'+item.province;
                }
                if(item.street){
                    _a +=' 街道：'+item.street;
                }
                if(item.district){
                    _a +=' 区：'+item.district;
                }
                return _a;
            },
            activeLockConfirm: function(id){
                this.lockForm = {
                    id:id,
                    lockReasonCode:'1'
                };
                this.dialogVisible = true;
            },
            activeLock: function(formName){
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.editLoading = true;
                        apiThird['userLock'](_this, _this.lockForm).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            _this.editLoading = false;
                            if (body && body.code == 1) {
                                _this.dialogVisible=false;
                                this.getResource(this.todopage.page, this.todopage.limit);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            activeUnlock: function (id) {
                if (this.id < 0) return;
                $("body").mLoading("show");
                apiThird['userUnlock'](this, id).then(function (response) {
                    let body = response.body;
                    this.$message(body.msg);
                    if (body && body.code == 1) {
                        this.getResource(this.todopage.page, this.todopage.limit);
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            showInfo: function (id) {
                $('body').mLoading("show");
                apiThird.lawyerSingle(this, id).then(function (response) {
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
                    apiThird.tips(this, {message: body.msg});
                }, function (response) {
                    console.log('error:', response);
                });
            },
            check: function (n) {
                /*if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(n))) {
                    return '游客';
                }*/
                return n;
            },
            onSelectedCity: function(data){
                this.param.city = data.city && data.city.value || '';
            },
            onProvince: function(data){
                this.param.city = '';
            }
        }
    }
    //
</script>
