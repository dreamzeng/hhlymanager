<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}">
                                <i class="icon-home"></i> Home</router-link>
                        </li>
                        <li class="active">第三方管理</li>
                        <li class="active">{{titleName}}</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">{{titleName}}</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <el-button type="info" @click="dialogAdd = true ; isShowPic = true">新建</el-button>
                                    <el-button class="btn btn-info" type="button" @click="exportExcel">导出</el-button>
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
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple">
                                                            <el-date-picker type="datetime" placeholder="开始时间" v-model="param.createTimeStart" @change="createTimeStart" style="width: 200px;"></el-date-picker>
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple-light">
                                                            <el-date-picker type="datetime" placeholder="结束时间" v-model="param.createTimeEnd" @change="createTimeEnd" style="width: 200px;"></el-date-picker>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                            <el-form-item label="性别">
                                                <el-select v-model="param.sex" placeholder="性别" style="width: 150px;">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option label="男" value="Male"></el-option>
                                                    <el-option label="女" value="Female"></el-option>
                                                    <el-option label="未知" value="Nil"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item  label="认证状态">
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
                                    <el-table :data="dataList" border style="width: 100%" @selection-change="handleSelectionChange">
                                        <el-table-column  type="selection" width="50">
                                        </el-table-column>
                                        <el-table-column label="头像" width="150">
                                            <template slot-scope="item">
                                                <img alt="" :src="item.row.logo" style="width: 42px;height: 42px;margin:auto 0;">
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="登录名" prop="userName" width="150">
                                        </el-table-column>
                                        <el-table-column v-if="userType == '1'" label="邮箱" prop="email" width="150">
                                        </el-table-column>
                                        <el-table-column v-if="userType == '1'" label="联系方式" prop="phone" width="150">
                                        </el-table-column>
                                        <el-table-column prop="realName" width="150" label="姓名">
                                        </el-table-column>
                                        <el-table-column prop="serviceAddress" label="服务城市" width="150">
                                        </el-table-column>
                                        <el-table-column label="认证状态" width="150">
                                            <template slot-scope="item">
                                                {{item.row.isAuth && item.row.isAuth.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="性别" prop="sex" width="150">
                                             <template slot-scope="item">
                                                {{item.row.sex && item.row.sex.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="设备" width="100">
                                            <template slot-scope="item">
                                                {{item.row.registerDevice && item.row.registerDevice.value || ''}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="stateDesc" label="禁用理由" width="150">
                                        </el-table-column>
                                        <el-table-column :label="lawyerCompany" prop="lawyerCompany" width="150">
                                        </el-table-column>
                                        <el-table-column :label="firmAddress" prop="firmAddress" width="150">
                                        </el-table-column>
                                        <el-table-column label="职位" prop="position" width="150">
                                        </el-table-column>
                                        <el-table-column label="注册时间" prop="createTime" width="150">
                                        </el-table-column>
                                        <el-table-column  prop="lastLoginIp" label="最后登录ip" width="150">
                                        </el-table-column>
                                        <el-table-column label="工作经历" width="150" align="center">
                                            <template slot-scope="item">
                                                <button title="工作经历"  class="btn btn-primary btn-xs" @click="showInfo(item.row.id,'jobExperience')">
                                                    <i class="icon-bookmark"></i> 查看
                                                </button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  label="教育经历" width="120" align="center">
                                            <template slot-scope="item">
                                                <button title="教育经历"  class="btn btn-success btn-xs" @click="showInfo(item.row.id,'eduExperience')">
                                                    <i class="icon-book"></i> 查看
                                                </button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column  label="擅长领域 " width="120" align="center">
                                            <template slot-scope="item">
                                                <button title="擅长领域"  class="btn btn-info btn-xs" @click="showInfo(item.row.id,'case')">
                                                    <i class="icon-thumbs-up"></i> 查看
                                                </button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="workTime" label="工作年限" width="120">
                                        </el-table-column>

                                        <el-table-column fixed="right" label="操作" width="200">
                                            <template slot-scope="item">

                                                <button title="禁用" class="btn btn-danger btn-xs" @click="activeLockConfirm(item.row.id)" v-if="item.row.state.code == 1">
                                                    <i class="icon-lock">禁用</i>
                                                </button>
                                               <button title="解除禁用" class="btn btn-info btn-xs" @click="activeUnlock(item.row.id)" v-if="item.row.state.code != 1">
                                                    <i class="icon-unlock">解除禁用</i>
                                                </button>
                                                <button title="编辑"  class="btn btn-primary btn-xs" @click="showEditAndView(item.row)">
                                                    <i class="icon-edit">编辑&查看</i>
                                                </button>
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

        <el-dialog title="禁用确认" v-model="dialogVisible" size="tiny">
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

        <el-dialog title="新建" :visible.sync="dialogAdd" size="tiny" @close="dialogClose">
            <el-form :model="formParam" :rules="formParamRules" ref="formParam" label-position="left" label-width="120px">
                <el-form-item label="资格证照片" prop="picFile">
                     <lawyer-upload
                        ref="laywerUpload"
                        :tips="laywerUploadObj.tips"
                        :name="laywerUploadObj.name"
                        width="120px"
                        height="120px"
                        v-if="isShowPic"
                        >
                    </lawyer-upload>
                </el-form-item>
                <el-form-item label="认证状态：" prop="code">
                    待认证
                </el-form-item>
                <el-form-item label="手机号码：" prop="phone">
                    <el-input v-model="formParam.phone" placeholder="输入手机号作为登录号码"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="userName">
                    <el-input v-model="formParam.userName" placeholder="输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码：" prop="idCardNO">
                    <el-input v-model="formParam.idCardNO" placeholder="输入身份证号码"></el-input>
                </el-form-item>
                <el-form-item label="资格证号码：" prop="certificateNO">
                    <el-input v-model="formParam.certificateNO"  :maxlength="maxlength" placeholder="输入资格证号码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd('formParam')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="查看&编辑" :visible.sync="dialogEdit" size="small" @close="dialogClose">
            <el-form :model="formEdit" :rules="formParamRules"  ref="formEdit"  label-position="left" label-width="120px">
                <el-row>
                    <el-form-item label="资格证照片" prop="picFile">
                        <lawyer-upload
                        ref="laywerUploadEdit"
                        :tips="laywerUploadObj.tips"
                        :name="laywerUploadObj.name"
                        width="120px"
                        height="120px"
                        :viewSrc="formEdit.pic" v-if="isShowPic">
                        </lawyer-upload>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item label="姓名：">
                                <el-input v-model="formEdit.realName" placeholder="姓名"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="登录名：">
                                <el-input v-model="formEdit.userName" placeholder="登录名" disabled="disabled"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item label="资格证号码：" prop="certificateNO">
                                 <el-input v-model="formEdit.certificateNO" :maxlength="maxlength" placeholder="资格证号码"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="认证状态：">
                                <el-input v-model="formEdit.isAuth" placeholder="认证状态" disabled="disabled"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item label="性别：">
                                <el-input v-model="formEdit.sex" placeholder="性别" disabled="disabled"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="设备：">
                                <el-input v-model="formEdit.registerDevice" placeholder="设备" disabled="disabled"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item :label="lawyerCompany+'：'">
                                <el-input v-model="formEdit.lawyerCompany" :placeholder="lawyerCompany"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple-light">
                            <el-form-item :label="firmAddress+'：'">
                                <el-input v-model="formEdit.firmAddress" :placeholder="firmAddress"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item label="职位：">
                                <el-input v-model="formEdit.position" placeholder="职位"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="注册时间：">
                                <el-input v-model="formEdit.createTime" placeholder="注册时间" disabled="disabled"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <el-form-item label="最后登录ip：">
                                <el-input v-model="formEdit.lastLoginIp" placeholder="最后登录ip" disabled="disabled"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="接单状态：">
                                <el-input v-model="formEdit.orderState" placeholder="接单状态" disabled="disabled"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <el-form-item label="服务城市：">
                               <v-distpicker hide-area wrapper="xaddress" :province="formEdit.serviceProvince" :city="formEdit.serviceCity" @selected="onSelectedCityEdit" @province="onProvinceEdit"></v-distpicker>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="禁用理由:">
                       {{formEdit.stateDesc}}
                    </el-form-item>
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="4">工作经历：</el-col>
                <el-col :span="20">
                    <button title="工作经历"  class="btn btn-primary btn-xs" @click="showInfo(formEdit.id,'jobExperience')">
                        <i class="icon-bookmark"></i> 查看
                      </button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">教育经历：</el-col>
                <el-col :span="20">
                    <button title="教育经历"  class="btn btn-success btn-xs" @click="showInfo(formEdit.id,'eduExperience')">
                        <i class="icon-book"></i> 查看
                      </button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">擅长领域：</el-col>
                <el-col :span="20">
                    <button title="擅长领域"  class="btn btn-info btn-xs" @click="showInfo(formEdit.id,'case')">
                        <i class="icon-thumbs-up"></i> 查看
                      </button>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdit = false">取 消</el-button>
                <el-button type="primary" @click="handleEditAndView('formEdit')" :loading="dialogFormVisible">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 教育 & 工作经历 & 查看擅长领域-->
        <el-dialog :title="statusMap[status].title" :visible.sync="dialogShow" size="small">
            <div v-if="status != 'case'">
                <el-row class="x-row">
                    <el-col :span="8"><div class="grid-title">时间</div></el-col>
                    <el-col :span="8"><div class="grid-title">{{statusMap[status].tabs[0]}}</div></el-col>
                    <el-col :span="8"><div class="grid-title">{{statusMap[status].tabs[1]}}</div></el-col>
                </el-row>
                <el-row class="x-row" v-for="(item, index) in showMessage"  :key="index">
                    <el-col :span="8"><div class="grid-content">{{item.beginTime}} - {{item.endTime}}</div></el-col>
                    <el-col :span="8"><div class="grid-content">{{item.name}}</div></el-col>
                    <el-col :span="8"><div class="grid-content">{{item.position}} {{item.eduBackground && '（'+item.eduBackground.value+')' || ''}}</div></el-col>
                </el-row>
            </div>
            <div v-else>
                <ul class="x-wrap">
                    <li class="item" v-for="(item, index) in showMessage"  :key="index">
                         <button type="button" class="btn btn-round btn-primary" >{{item.name}}</button>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShow = false">取 消</el-button>
                <el-button type="primary" @click="dialogShow = false">确 定</el-button>
            </div>
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .activeTag {
        color: #FFF;
        background: #2185D0;
    }
    .x-row {
        border-bottom: 1px solid #d3dce6;
        padding: 12px;
        .grid-title{
            font-weight: bold;
        }
    }
    .x-wrap{
        &:after {
            visibility: hidden;
            display: block;
            font-size: 0;
            content: " ";
            clear: both;
            height: 0;
        }
        .item{
            float:left;
            margin: 12px;
        }
    }
    .el-checkbox{
        margin-left: 15px;
    }
    .el-checkbox+.el-checkbox{
        margin-top: 10px;
    }
</style>

<script>
import VDistpicker from 'components/common/distpicker/Distpicker';
import Page from 'components/common/Page';
import apiThird ,{ agentApi ,lawyerUserApi} from 'api/third';
import { UploadAvatar } from 'components/common/upload';
import LawyerUpload from 'components/common/lawyerUpload';
import { Loading } from 'element-ui';
import {cookieTools} from 'lib/utils'

const checkPhone = (rule, value, callback) => {
    setTimeout(() =>{
        if(!/^1(3|2|4|5|7|8|9)\d{9}$/.test(value)){
            callback(new Error('请输入正确的手机号码'));
        }else{
            callback()
        }
    }, 200);
}

const checkCertificateNO = (rule, value, callback) => {
    setTimeout(() =>{
          if (value.length > 32) {
            callback(new Error('字符长度不能大于32位'));
        }else{
            callback()
        }
    }, 200);
}

export default {
    name: 'userCommon',
    components: { Page: Page, VDistpicker: VDistpicker ,UploadAvatar:UploadAvatar,LawyerUpload:LawyerUpload},
    /*props: {
        userType: {
            type: String,
            default: '3' // 2 为用户 ， 1 为律师  null 全部用户 3 知识产权代理人
        },
        titleName:{
            type:String,
            default:'知识产权代理人'
        }
    },*/
    data: function() {
        let _paramFrom =  cookieTools.get('paramFrom') || '{}';
        let paramFrom = JSON.parse(_paramFrom);
        let _todopage = cookieTools.get('todopage') || '{}';
        let todopage = JSON.parse(_todopage);
        return {
            radio:"1",
            isShow:false,
            multipleSelection:[],
            checkAll: true,
            checkedCities: ["登录名","姓名","服务城市","认证状态","状态","性别","设备","禁用理由","公司名称","公司地址","职位","工作经验","教育经验","注册时间","最后登录IP"],
            cities: ["登录名","姓名","服务城市","认证状态","状态","性别","设备","禁用理由","公司名称","公司地址","职位","工作经验","教育经验","注册时间","最后登录IP"],
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
                    label:"服务城市",
                    value:"serviceAddress"
                },
                {
                    label:"认证状态",
                    value:"isAuth"
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
                    label:"公司名称",
                    value:"company"
                },
                {
                    label:"公司地址",
                    value:"firmAddress"
                },
                {
                    label:"职位",
                    value:"position"
                },
                {
                    label:"工作经验",
                    value:"workExperience"
                },
                {
                    label:"教育经历",
                    value:"educationExperience"
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
            headList:'userName,realName,serviceAddress,isAuth,state,sex,registerDevice,stateDesc,company,firmAddress,position,workExperience,educationExperience,createTime,lastLoginIp',
            isIndeterminate: true,
            lockForm: {
                id: '',
                lockReasonCode: '1'
            },
            lockFormRules: {
                lockReasonCode: [
                    { required: true, message: '请选择禁用理由', trigger: 'change' }
                ]
            },
            showMessage: [],
            status:'jobExperience',
            statusMap:{
                jobExperience:{
                    title:'工作经历',
                    tabs:['单位','职位']
                },
                eduExperience:{
                    title:'教育经历',
                    tabs:['学校','学历']
                },
                case:{
                    title:'查看擅长领域'
                }
            },
            dialogVisible: false,
            editLoading: false,
            dataList: [],
            todopage: {
                total: 1,
                limit: todopage['limit'] || 10,  //每页显示多少条 limit
                page: todopage['page'] || 1 //当前页码 page
            },
            param: {
                userName: paramFrom['userName'] ||'',
                realName: paramFrom['realName'] ||'',
                email: paramFrom['email'] ||'',
                state: paramFrom['state'] ||'',
                sex: paramFrom['sex'] ||'',
                isAuth: paramFrom['isAuth'] ||'',
                city: paramFrom['city'] ||'',
                createTimeStart: paramFrom['createTimeStart'] ||'',
                createTimeEnd: paramFrom['createTimeEnd'] ||''
            },
            laywerUploadObj:{
                tips:'资格证照片',
                name:'seniorityPicFile'
            },
            //新建
            formParam: {
                picFile:'',
                phone:'',//电话号码（登录号）
                userName:'', //姓名
                idCardNO:'', //身份证号
                certificateNO:'' //资格证号
            },
            formParamRules: {
                picFile:[
                    { required: true, message: '请输上传文件', trigger: 'blur' }
                ],
                phone:[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: checkPhone, trigger: 'blur' }
                ],
                userName:[
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                idCardNO:[
                    { required: true, message: '请输入身份证号', trigger: 'blur' }
                ],
                certificateNO:[
                    { required: true, message: '请输入资格证号', trigger: 'blur' },
                    {validator:checkCertificateNO,trigger:'blur'}
                ]
            },
            dialogAdd: false,
            //编辑查看
            dialogEdit: false,
            formEdit:{

            },
            isShowPic:false,
            dialogFormVisible:false,
            dialogShow:false,
            maxlength:32
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
        },
        $route(){
            this.param = {
                userName: '',
                realName: '',
                email: '',
                state: '',
                sex: '',
                isAuth: '',
                city: '',
                createTimeStart: '',
                createTimeEnd: ''
            }
            this.getResource();
        }
    },
    computed:{
        api(){
            let _api = lawyerUserApi;
            if(this.userType == '3'){
                _api = agentApi;
            }
            return _api;
        },
        lawyerCompany(){
            let lawyerCompany = '公司';
            if(this.userType == '1'){
                lawyerCompany = '律所';
            }
            return lawyerCompany;
        },
        firmAddress(){
            let firmAddress = '公司地址';
            if(this.userType == '1'){
                firmAddress = '律所地址';
            }
            return firmAddress;
        },
        userType(){
            return this.$route.meta.userType || '3'; // 2 为用户 ， 1 为律师  null 全部用户 3 知识产权代理人
        },
        titleName(){
            return this.$route.meta.titleName || '知识产权代理人';
        }
    },
    mounted: function() {
        this.$nextTick(function() {
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
        init: function() {
            
        },
        //page:当前页 ,limit: 每页显示多少条
        getResource: function(page, limit) {
            let param = {
                page: page, limit: limit
            };
            this.todopage.limit = limit;
            this.todopage.page = page;

            for (let k in this.param) {
                if (this.param[k] != '') {
                    param[k] = this.param[k];
                }
            }

            $('#list-content').mLoading("show");
            this.api.list(this, param).then(function(response) {
                let body = response.body;
                if (body && body.code == 1) {
                    let data = body.data;
                    this.todopage.total = data.total;
                    this.dataList = data.items;
                    return;
                }
            }, function(response) {
                console.log('error:', response);
            });
        },
        search: function() {
            this.getResource(1, this.todopage.limit);
        },
        restParam: function(){
            this.formParam = {
                picFile:'',
                phone:'',//电话号码（登录号）
                name:'', //姓名
                idCardNO:'', //身份证号
                certificateNO:'' //资格证号
            }
        },
        handleAdd: function(formRef){
            const _this = this;
            const formData = new FormData();
            const _laywerUpload =  this.$refs['laywerUpload'];
            if(_laywerUpload.file){
                this.formParam.picFile = 'on';
                formData.append('picFile',_laywerUpload.file);
            }
            Object.keys(this.formParam).map(key => {
                if(key && key != 'picFile'){
                    formData.append(key, this.formParam[key]);
                }
            });

            this.$refs[formRef].validate(function(valid) {
                if (valid) {
                    let loading = Loading.service({text:"数据上传中，请等待..."});
                    _this.api.add(_this, formData).then(resData=>resData.body).then(res=>{
                        loading.close();
                        if(res.code == 1){
                            _this.$message.success("创建数据成功");
                            _this.dialogAdd = false;
                            _this.restParam();
                            _this.getResource(1, _this.todopage.limit);
                        }else{
                            _this.$message.error("创建数据失败：" + res.msg + "，请重新输入");
                        }
                    }).catch(res=>{
                         loading.close();
                        _this.$message.error("创建数据失败，请重试");
                    })
                }
                return false;
            });
        },
        dialogClose: function(){
           this.isShowPic = false; // hack 通过 if 去主动 销毁一个实例
        },
        //编辑查看
        showEditAndView: function(item){
            this.isShowPic = true;

            this.dialogEdit = true;
            this.formEdit={};
            let _formEdit = Object.assign({},item);
            Object.keys(_formEdit).map(key=>{
                if(typeof _formEdit[key] == 'object'){
                    this.formEdit[key] = _formEdit[key]['value'] || '';
                }else{
                    this.formEdit[key] = _formEdit[key];
                }
            });
            this.formEdit.picFile = this.formEdit.pic;
            this.formEdit.serviceProvince = '';
            this.formEdit.serviceCity = '';
            if(_formEdit['serviceAddress']){
                let address = _formEdit['serviceAddress'].split('-');
                this.formEdit.serviceProvince = address[0] || '';
                this.formEdit.serviceCity = address[1] || '';
            }
        },
        handleEditAndView: function(formEdit){
            let { id,realName,serviceProvince,serviceCity, lawyerCompany,firmAddress,position,certificateNO} = this.formEdit;
            let formParam = {
                id,
                serviceProvince,
                serviceCity,
                company:lawyerCompany,
                userName:realName,
                firmAddress,
                position,
                certificateNO
            };
            const formData = new FormData();
            const _laywerUpload =  this.$refs['laywerUploadEdit'];
            if(_laywerUpload.file){
                formData.append('picFile',_laywerUpload.file);
                this.formEdit.picFile = 'on';
            }
            Object.keys(formParam).map(key => {
                if(key && key != 'picFile'){
                    formData.append(key, formParam[key] || '');
                }
            });
            let _this = this;
            this.$refs[formEdit].validate(function(valid) {
                if (valid) {
                    _this.dialogFormVisible = true;
                    agentApi.update(_this, formData).then(resData=>resData.body).then(res=>{
                        _this.dialogFormVisible = false;
                        if(res.code == 1){
                            _this.$message.success(res.msg);
                            _this.dialogEdit = false;
                            _this.getResource( _this.todopage.page, _this.todopage.limit);
                        }else{
                            _this.$message.error("更新数据失败：" + res.msg + "，请重新输入");
                        }
                    }).catch(res=>{
                        _this.dialogFormVisible = false;
                        _this.$message.error("更新数据失败，请重试");
                    })
                }
            });
        },
        onProvinceEdit: function(data) {
            this.formEdit.serviceProvince = '';
            this.formEdit.serviceCity = '';
        },
        onSelectedCityEdit: function(data) {
            this.formEdit.serviceCity = data.city && data.city.value || '';
            this.formEdit.serviceProvince = data.province && data.province.value || '';
        },
        createTimeStart: function(val) {
            this.param.createTimeStart = val;
        },
        createTimeEnd: function(val) {
            this.param.createTimeEnd = val;
        },
        onSelectedCity: function(data) {
            this.param.city = data.city && data.city.value || '';
        },
        onProvince: function(data) {
            this.param.city = '';
        },
        activeLockConfirm: function(id) {
            this.lockForm = {
                id: id,
                lockReasonCode: '1'
            };
            this.dialogVisible = true;
        },
        activeLock: function(formName) {
            let _this = this;
            this.$refs[formName].validate(function(valid) {
                if (valid) {
                    _this.editLoading = true;
                    apiThird['userLock'](_this, _this.lockForm).then(function(response) {
                        let body = response.body;
                        _this.$message(body.msg);
                        _this.editLoading = false;
                        if (body && body.code == 1) {
                            _this.dialogVisible = false;
                            this.getResource(this.todopage.page, this.todopage.limit);
                            return;
                        }
                    }, function(response) {
                        console.log('error:', response);
                    });
                }
                return false;
            });
        },
        activeUnlock: function(id) {
            if (this.id < 0) return;
            $("body").mLoading("show");
            apiThird['userUnlock'](this, id).then(function(response) {
                let body = response.body;
                this.$message(body.msg);
                if (body && body.code == 1) {
                    this.getResource(this.todopage.page, this.todopage.limit);
                }
            }, function(response) {
                console.log('error:', response);
            });
        },
        showInfo: function(id,type) {
            this.dialogShow = true;
            this.status = type;
            agentApi[type](this, {id:id}).then(function(response) {
                let body = response.body;
                if (body && body.code == 1) {
                    this.showMessage = body.data;
                    return;
                }
            }, function(response) {
                console.log('error:', response);
            });
        }
    }
}
</script>
