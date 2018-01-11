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
                            <a href="javascript:;"  @click="back">banner管理</a>
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
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="right">
                                <el-form-item label="banner名称" prop="title">
                                    <el-input  placeholder="banner名称,长度在 1 到 50 个字符" v-model="ruleForm.title"></el-input>
                                </el-form-item>
                                <el-form-item label="应用类型" prop="advertType">
                                    <el-select v-if="isEdit" disabled v-model.number="ruleForm.advertType"  placeholder="请选择">
                                        <el-option
                                            v-for="item in types"
                                            :key="item.code"
                                            :label="item.value"
                                            :value="item.code">
                                        </el-option>
                                    </el-select>
                                    <el-select v-else v-model.number="ruleForm.advertType" placeholder="请选择">
                                        <el-option
                                            v-for="item in types"
                                            :key="item.code"
                                            :label="item.value"
                                            :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="应用模块" prop="moduleType">
                                    <el-radio-group  v-if="isEdit" disabled v-model.number="ruleForm.moduleType">
                                        <el-radio v-for="item in ModuleTypes" :label="item.code" :key="item.code" :value="item.code" class="normal">{{item.value}}</el-radio>
                                    </el-radio-group>
                                    <el-radio-group  v-else v-model.number="ruleForm.moduleType">
                                        <el-radio  v-for="(item,index) in ModuleTypes" v-if="index === 0 || index === 1 || (index === 2 && ruleForm.advertType > 4)" :label="item.code" :key="item.code" :value="item.code" class="normal">{{item.value}} <el-button v-if="index === 0 && ruleForm.moduleType === index+1 && [1,3].indexOf(ruleForm.advertType) != -1" type="text">建议尺寸(750*300px)</el-button> <el-button v-if="index === 0 && ruleForm.moduleType === index+1 && [2,4].indexOf(ruleForm.advertType) != -1" type="text">建议尺寸(750*230px)</el-button> <el-button v-if="index === 1 && ruleForm.moduleType === index+1 && [1,3,5,8].indexOf(ruleForm.advertType) != -1" type="text">建议尺寸(750*298px)</el-button></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="banner图预览">
                                    <span style="display:inline-block !important; padding: 5px;border: 1px solid #e2e2e4;">
                                        <img :src="ruleForm.pic" style="width: 100px;height: 100px">
                                    </span>
                                </el-form-item>
                                <el-form-item label="banner" id="form-data-case" prop="pic">
                                    <el-row>
                                        <el-col :span="4">
                                            <el-select placeholder="请选择" v-model="urlType">
                                                <el-option label="远程图片URL" value="1"></el-option>
                                                <el-option label="本地上传" value="2"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="20" v-if="urlType == 1">
                                            <input type="text" class="form-control" placeholder="远程URL" v-model="ruleForm.pic">
                                        </el-col>
                                        <el-col :span="20" v-if="urlType == 2">
                                            <vue-core-image-upload
                                                text="上传banner展示图片"
                                                inputOfFile="file"
                                                v-bind:class="['btn','btn-primary','btn-sm']"
                                                v-bind:crop="false"
                                                v-bind:url="uploadUrl"
                                                v-bind:isXhr="true"
                                                v-bind:data="{type:5}"
                                                :maxFileSize="maxFileSize"
                                                extensions="png,gif,jpeg,jpg"
                                                v-on:imageuploaded="imageuploaded"
                                                v-on:imageuploading="imageuploading">
                                            </vue-core-image-upload>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="链接地址" required>
                                    <el-row>
                                        <el-col :span="4">
                                            <el-form-item prop="urlType">
                                                <el-select placeholder="链接类型" v-model="ruleForm.urlType">
                                                    <el-option label="超链接" value="1"></el-option>
                                                    <el-option label="原生模块链接" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="20">
                                            <el-form-item prop="url">
                                                <input type="text" class="form-control" placeholder="链接地址" v-model="ruleForm.url">
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="生效时间" prop="validTimeStart">
                                    <el-date-picker v-if="!isModifyStartTime" disabled type="datetime" v-model="ruleForm.validTimeStart" @change="starTimeChang" placeholder="选择日期"></el-date-picker>
                                    <el-date-picker v-else  type="datetime" v-model="ruleForm.validTimeStart" @change="starTimeChang" placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="失效时间" prop="validTimeEnd">
                                    <el-date-picker v-if="!isModifyEndTime" disabled type="datetime" v-model="ruleForm.validTimeEnd"  @change="endTimeChang" placeholder="选择日期"></el-date-picker>
                                    <el-date-picker v-else type="datetime" v-model="ruleForm.validTimeEnd"  @change="endTimeChang" placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="备注" prop="content">
                                    <el-input type="textarea" placeholder="备注,长度在 1 到 100 个字符" v-model="ruleForm.content"></el-input>
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
    </div>
    <!--main content end-->
</template>
<style scoped>
    .normal{
        font-weight: normal;
    }
</style>
<script>
    import VueCoreImageUpload  from 'components/common/vue.core.file.upload';
    import apiAdvertCentre from 'api/advertCentre';

    export default {
            name: 'advertCentreAdd',
        components: {'vue-core-image-upload': VueCoreImageUpload},
        data: function () {
            return {
                type: 1, // type 为1时为添加，为2时修改
                typeTitle: '添加banner',
                ruleForm:{
                    title:'', //banner名称
                    advertType:'', //应用类型
                    moduleType:1, //应用模块
                    pic:'', //banner图预览
                    urlType:'1', //链接类型
                    url:'', //链接地址
                    validTimeStart:'', //生效时间
                    validTimeEnd:'', //失效时间
                    content:'' //备注
                },
                rules: {
                    title:[
                        {required: true, message: '请输入banner名称', trigger: 'blur'},
                        { min: 0, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    advertType:[{required: true, type:'number', message: '请选择应用类型', trigger: 'change' }],
                    moduleType:[{required: true, type:'number', message: '请选择应用模块', trigger: 'change' }],
                    pic:[{required: true, message: '请上传图片', trigger: 'blur' }],
                    urlType:[{required: true, message: '请选择链接类型', trigger: 'change'  }],
                    url:[
                        {required: true, message: '请输入url链接地址', trigger: 'blur'},
                        { min: 0, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
                    ],
                    validTimeStart:[{required: true, message: '请选择生效时间', trigger: 'change' }],
                    validTimeEnd:[{required: true, message: '请选择失效时间', trigger: 'change' }],
                    content:[
                        { min: 0, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ]
                },
                urlType:'2',
                uploadUrl:'',
                types:[], //应用类型 广告中心类型枚举
                ModuleTypes:[], //广告中心应用模块类型枚举列表接口
                isModifyStartTime:true,
                isModifyEndTime:true,
                maxFileSize:1024*1024*12
            }
        },
        computed: {
            isEdit:function() {
                return this.$route.meta.isEdit; // 根据meta判断
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                this.types.length == 0 && this.getTypes();
                this.ModuleTypes.length == 0 && this.getModuletypes();
                this.uploadUrl = apiAdvertCentre.upload;
                if(this.isEdit){
                    this.type = 2;
                    this.typeTitle = '修改活动';
                    let id = this.$route.params.id;
                    $("body").mLoading("show");
                    this.getItem(id);
                }
            },
            getItem:function(id){
                apiAdvertCentre.getItem(this, id).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                        let data = body.data;
                        this.ruleForm['id'] = data.id;
                        this.ruleForm['title'] = data.title;
                        this.ruleForm['pic'] = data.pic;
                        this.ruleForm['url'] = data.url;
                        this.ruleForm['validTimeStart'] = data.validTimeStart;
                        this.ruleForm['validTimeEnd'] = data.validTimeEnd;
                        this.ruleForm['content'] = data.content || '';
                        this.ruleForm['advertType'] = data.advertType.code;
                        this.ruleForm['urlType'] = data.urlType.code+'';
                        this.ruleForm['moduleType'] = data.moduleType.code;
                        let todayTime = data.todayTime || '';
                        if(todayTime > data.validTimeStart){
                           this.isModifyStartTime = false;
                        }
                        if(todayTime > data.validTimeEnd){
                            this.isModifyEndTime = false;
                        }
                        return;
                    }
                    if (body && body.code == 0) {
                        this.$message.error({message: body.msg});
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            getTypes: function(){
                apiAdvertCentre.getTypes(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.types = data;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            getModuletypes: function(){
                apiAdvertCentre.getModuletypes(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.ModuleTypes = data;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            submitForm:function(formName) {
                let _this = this;
                let commitType = 'add';
                if (this.type == 2) {
                    commitType = 'modify';
                }else{
                    this.ruleForm.id &&  delete this.ruleForm.id;
                }
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        $("body").mLoading("show");
                        apiAdvertCentre[commitType](_this, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            this.$message(body.msg);
                            if (body && body.code == 1) {
                                this.$router.go(-1);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            starTimeChang:function (val) {
                this.ruleForm.validTimeStart = val;
            },
            endTimeChang: function(val) {
                this.ruleForm.validTimeEnd = val;
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
                    this.ruleForm.pic = data.url;
                    return;
                }
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
