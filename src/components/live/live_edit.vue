<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li>
                            <a href="javascript:;"  @click="back">活动管理</a>
                        </li>
                        <li>{{typeTitle}}</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">{{typeTitle}}</div>
                        <div class="panel-body" >
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left">
                                <el-form-item label="图片预览">
                                    <span style="display:inline-block !important; padding: 5px;border: 1px solid #e2e2e4;">
                                            <img :src="ruleForm.imageUrl" style="width: 100px;height: 100px">
                                        </span>
                                </el-form-item>
                                <el-form-item label="活动图片" prop="imageUrl" required id="form-data-case">
                                    <el-col :span="2">
                                        <el-select placeholder="请选择" v-model="urlType">
                                            <el-option label="远程图片URL" value="1"></el-option>
                                            <el-option label="本地上传" value="2"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="22" v-if="urlType == 1">
                                        <input type="text" class="form-control" required placeholder="远程图片URL" v-model="ruleForm.imageUrl">
                                    </el-col>
                                    <el-col :span="22" v-if="urlType == 2">
                                        <vue-core-image-upload
                                            text="选择图片"
                                            inputOfFile="file"
                                            v-bind:class="['btn','btn-primary','btn-sm']"
                                            v-bind:crop="false"
                                            v-bind:url="uploadUrl"
                                            v-bind:isXhr="true"
                                            v-bind:data="{type:1}"
                                            extensions="png,gif,jpeg,jpg"
                                            v-on:imageuploaded="imageuploaded"
                                            v-on:imageuploading="imageuploading">
                                        </vue-core-image-upload>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="活动标题" prop="title">
                                    <el-input v-model="ruleForm.title"></el-input>
                                </el-form-item>
                                <el-form-item label="活动时间" required>
                                    <el-col :span="5">
                                        <el-form-item prop="beginTime">
                                            <el-date-picker type="datetime" :disabled='type == 2' placeholder="开始时间" v-model="ruleForm.beginTime" @change="starTimeChang" style="width: 100%;"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="line" :span="1" style="text-align: center">-</el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="endTime">
                                            <el-date-picker type="datetime" :disabled='type == 2' placeholder="结束时间" v-model="ruleForm.endTime" @change="endTimeChang" style="width: 100%;"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="活动状态" prop="state">
                                    <el-select v-model="ruleForm.state" style="width: 100%;">
                                        <el-option label="未开始" value="0"></el-option>
                                        <el-option label="报名中" value="1"></el-option>
                                        <el-option label="报名已截止" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="活动地点" prop="address">
                                    <el-input v-model="ruleForm.address"></el-input>
                                </el-form-item>
                                <el-form-item label="举办联系人" prop="contact">
                                    <el-input v-model="ruleForm.contact"></el-input>
                                </el-form-item>
                                <el-form-item label="联系手机号" prop="phone">
                                    <el-input v-model="ruleForm.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="规模人数" prop="scope">
                                    <el-input v-model.number="ruleForm.scope"></el-input>
                                </el-form-item>
                                <el-form-item label="直播状态" prop="playState">
                                    <el-select v-model="ruleForm.playState" style="width: 100%;">
                                        <el-option label="未开始" value="0"></el-option>
                                        <el-option label="直播中" value="1"></el-option>
                                        <el-option label="直播结束" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="活动讲师" prop="lecturer">
                                    <el-input v-model="ruleForm.lecturer"></el-input>
                                </el-form-item>
                                <el-form-item label="简介描述" prop="description">
                                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="info" @click="submitForm('ruleForm')">提交</el-button>
                                    <el-button @click="back">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            size="tiny">
            <div style="width: 400px; margin: auto;">
                <div style="margin-bottom: 20px">新建成功</div>
                <div style="margin-bottom: 20px">
                    Url地址：<a href="http://www.baidu.com" target="_blank">www.baidu.com</a>
                </div>
                <qr-code text="https://www.baidu.com"  :size="size"></qr-code>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    <!--main content end-->
</template>

<script>
    import apiLive from 'api/live';
    import VueCoreImageUpload  from 'components/common/vue.core.file.upload';

    export default {
        name: 'liveEdit',
        components: {
            'vue-core-image-upload': VueCoreImageUpload
        },
        data: function () {
            return {
                uploadUrl:'',
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '新增活动',
                urlType:'1',
                dialogVisible: false,
                size:400,
                ruleForm: {
                    title: '', //标题
                    beginTime: '', //活动开始时间
                    endTime: '', //活动结束时间
                    state:'0',//活动状态
                    address: '', //地点
                    contact: '', //举办联系人
                    phone: '', //联系手机号
                    scope: '', //规模人数
                    imageUrl: '', //图片地址
                    playState:'0', //直播状态
                    lecturer: '', // 讲师
                    description: '' // 简介描述,
                },
                rules: {
                    imageUrl:[
                        { required: true, message: '请选择图片', trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    beginTime: [
                        { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    endTime: [
                        { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    liveExpireTime:[
                        {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    state:[
                        { required: true, message: '请选择活动状态', trigger: 'blur' }
                    ],
                    address:[
                        { required: true, message: '请输入活动地点', trigger: 'blur' }
                    ],
                    contact: [
                        { required: true, message: '请输入举办联系人', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请选择活动联系手机号', trigger: 'blur' }
                    ],
                    scope: [
                        { required: true, message: '请输入规模人数'},
                        { type: 'number', message: '人数必须为数字值'}
                    ],
                    playState:[{required: true, message: '请选择直播状态', trigger: 'blur'}],
                    lecturer: [
                        { required: true, message: '请输入讲师名', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入简介描述', trigger: 'blur' }
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
                this.uploadUrl = apiLive.upload;
                this.type = this.$route.params.type;
                if (this.type == 2) {
                    this.typeTitle = '修改活动';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiLive.getRowLiveItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for (let k in body.data) {
                                if(k == 'state' || k == 'playState'){
                                    this.ruleForm[k] = body.data[k]+'';
                                }else{
                                    this.ruleForm[k] = body.data[k];
                                }
                            }
                            return;
                        }
                        if (body && body.code == 0) {
                            apiLive.tips(this, {message: body.msg});
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
            },
            imageuploading:function(response) {
                $('#form-data-case').mLoading({
                    text:'正在上传，请稍后...'
                });
            },
            imageuploaded:function(response) {
                $('#form-data-case').mLoading("hide");
                apiLive.tips(this, {message: response.msg});
                if (response && response.code == 1) {
                    let data = response.data;
                    this.ruleForm.imageUrl = data.url;
                    return;
                }
            },
            starTimeChang:function (val) {
                this.ruleForm.beginTime = val;
            },
            endTimeChang: function(val) {
                this.ruleForm.endTime = val;
            },
            liveExpireTimeChang: function(val) {
                this.ruleForm.liveExpireTime = val;
            },
            submitForm:function(formName) {
                let commitType = 'liveAdd';
                if (this.type == 2) {
                    commitType = 'livePut';
                }
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        $("body").mLoading("show");
                        apiLive[commitType](_this, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            apiLive.tips(_this, {message: body.msg});
                            if (body && body.code == 1) {
                                _this.$router.go(-1);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            handleClose: function(){
                this.dialogVisible = false;
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
