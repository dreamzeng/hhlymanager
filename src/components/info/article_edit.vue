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
                            <a href="javascript:;"  @click="back">内容管理</a>
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
                                <el-form-item label="原文链接" v-if="editType == 'seeker'">
                                    <a :href="urlLink"  target="_blank">{{urlLink}}</a>
                                </el-form-item>
                                <el-form-item label="标题" prop="title">
                                    <el-input  placeholder="标题,长度在 1 到 200 个字符" v-model="ruleForm.title"></el-input>
                                </el-form-item>
                                <el-form-item label="内容" prop="content">
                                    <webEditor ref="webEditor"></webEditor>
                                </el-form-item>
                                <el-form-item label="封面图预览">
                                    <span style="display:inline-block !important; padding: 5px;border: 1px solid #e2e2e4;">
                                        <img :src="ruleForm.backGroundPic" style="width: 100px;height: 100px">
                                    </span>
                                </el-form-item>
                                <el-form-item label="封面图片" id="form-data-case" prop="backGroundPic">
                                    <el-row>
                                        <el-col :span="4">
                                            <el-select placeholder="请选择" v-model="urlType">
                                                <el-option label="远程图片URL" value="1"></el-option>
                                                <el-option label="本地上传" value="2"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="20" v-if="urlType == 1">
                                            <input type="text" class="form-control" placeholder="远程URL" v-model="ruleForm.backGroundPic">
                                        </el-col>
                                        <el-col :span="20" v-if="urlType == 2">
                                            <vue-core-image-upload
                                                text="上传封面图片"
                                                inputOfFile="file"
                                                v-bind:class="['btn','btn-primary','btn-sm']"
                                                v-bind:crop="false"
                                                v-bind:url="uploadUrl"
                                                v-bind:isXhr="true"
                                                v-bind:data="{type:6}"
                                                extensions="png,gif,jpeg,jpg"
                                                v-on:imageuploaded="imageuploaded"
                                                v-on:imageuploading="imageuploading">
                                            </vue-core-image-upload>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="应用设备" prop="showDeviceKeys">
                                    <el-checkbox-group v-model="ruleForm.showDeviceKeys">
                                        <el-checkbox
                                            v-for="item in showDeviceKeys"
                                            :key="item.code"
                                            :label="item.code"
                                            :value="item.code">
                                            {{item.value}}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <!--<el-form-item label="应用端" prop="showUserKeys">
                                    <el-checkbox-group v-model="ruleForm.showUserKeys">
                                        <el-checkbox
                                            v-for="item in showUserKeys"
                                            :key="item.code"
                                            :label="item.code"
                                            :value="item.code">
                                            {{item.value}}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>-->
                                <el-form-item label="所属资讯分类" prop="categoryId">
                                    <el-select v-model="ruleForm.categoryId" placeholder="请选择">
                                        <el-option
                                            v-for="item in articleCategorys"
                                            :key="item.code"
                                            :label="item.value"
                                            :value="item.code">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否热门" prop="hotFlag">
                                    <el-radio-group v-model="ruleForm.hotFlag">
                                        <el-radio label="0">否</el-radio>
                                        <el-radio label="1">是</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="是否置顶" prop="isTop">
                                    <el-radio-group v-model="ruleForm.isTop">
                                        <el-radio label="0">否</el-radio>
                                        <el-radio label="1">是</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="success" @click="submitForm('ruleForm',0)">保存</el-button>
                                    <el-button type="warning" @click="submitForm('ruleForm',1)">发布</el-button>
                                    <el-button type="info" @click="showInfo()">预览</el-button>
                                    <el-button @click="back">返回</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 详情 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width: 850px">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">标题：{{showTitle}}</h4>
                    </div>
                    <div class="modal-body">
                        <div v-html="showContent"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                        <button type="button" id="btn_submit" class="btn btn-primary" data-dismiss="modal"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>确定</button>
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
    import webEditor from 'components/common/webEditor';

    import {article}  from 'api/info';

    export default {
        name: 'articleEdit',
        components: {'vue-core-image-upload': VueCoreImageUpload,'webEditor':webEditor},
        data: function () {
            return {
                type: 1, // type 为1时为添加，为2时修改
                typeTitle: '添加自建内容',
                ruleForm:{
                    title:'',	//Y	varchar	标题
                    content:'',	//Y	varchar	内容
                    categoryId:'',	//Y	int	分类ID
                    //showUserKeys:[],	//Y	int	展示的APP端：1 律师端；2 用户端
                    showDeviceKeys:[],	//Y	int	展示的终端：2.iOS；3.安卓
                    publishState:'',	//Y	int	发布状态：0 未发布；1 已发布
                    hotFlag:'0',	//Y	int	是否热门：0 否；1 是
                    backGroundPic:'',	//N	varchar	封面图
                    isTop:'0'	//N	int	是否置顶：0 否；1 是
                },
                rules: {
                    title:[
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        { min: 0, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                    ],
                    content:[
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    backGroundPic:[{required: true, message: '请上传图片', trigger: 'blur' }],
                    showDeviceKeys: [
                        { type: 'array', required: true, message: '请至少选择一种类型', trigger: 'change' }
                    ],
                   /* showUserKeys: [
                        { type: 'array', required: true, message: '请至少选择一种类型', trigger: 'change' }
                    ],*/
                    categoryId:[{required: true, message: '请选择所属资讯分类', trigger: 'change' }]
                },
                urlType:'2',
                uploadUrl:'',
                articleCategorys:[],//所属资讯分类
                //showUserKeys:[],
                showDeviceKeys:[],
                webEditor:null,
                showTitle:'',
                showContent:'',
                urlLink:''
            }
        },
        computed: {
            isEdit:function() {
                return this.$route.meta.isEdit; // 根据meta判断
            },
            editType:function(){
                return this.$route.meta.type;

            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {

                this.webEditor = this.$refs.webEditor;

                this.articleCategorys.length == 0 && this.getArticleCategorys();
                //this.showUserKeys.length == 0 &&this.getKeys('showUserKeys');
                this.showDeviceKeys.length == 0 &&this.getKeys('showDeviceKeys');
                this.uploadUrl = article.upload;

                if(this.isEdit){
                    this.type = 2;
                    this.typeTitle = '修改自建内容';
                    let id = this.$route.params.id;
                    $("body").mLoading("show");
                    this.getItem(id);
                }
            },
            getItem:function(id){
                let doAction = 'getRowItem';
                let param = {articleId:id};
                if(this.editType == 'seeker'){
                    doAction = 'getSeekerInfo';
                    param = id;
                }
                article[doAction](this, param).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1 && body.data) {
                        let data = body.data;
                        this.ruleForm = {
                            id : data.id,
                            title:data.title,	//Y	varchar	标题
                            content:data.content,	//Y	varchar	内容
                            categoryId:data.categoryId,	//Y	int	分类ID
                            //showUserKeys:data.showUserKeys && data.showUserKeys.split(',') || [],	//Y	int	展示的APP端：1 律师端；2 用户端
                            showDeviceKeys:data.showDeviceKeys && data.showDeviceKeys.split(',') || [],	//Y	int	展示的终端：2.iOS；3.安卓
                            publishState:data.publishState && data.publishState.code || 0,	//Y	int	发布状态：0 未发布；1 已发布
                            hotFlag:(data.hotFlag && data.hotFlag.code || 0)+'',	//Y	int	是否热门：0 否；1 是
                            backGroundPic:data.backGroundPic,	//N	varchar	封面图
                            isTop:(data.isTop || 0) + ''	//N	int	是否置顶：0 否；1 是
                        };
                        if(this.editType == 'seeker'){
                            this.urlLink = data.originalUrl;
                        }
                        this.webEditor.setContent(data.content);
                        return;
                    }
                    if (body && body.code == 0) {
                        this.$message.error({message: body.msg});
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            getKeys: function(key){
                article[key](this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        for(let i = 0,l=data.length;i<l;i++){
                            this[key].push({
                                code:data[i]['key'],
                                value:data[i]['value']
                            });
                        }
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            getArticleCategorys: function(){
                article.articleCategory(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        for(let i = 0,l=data.length;i<l;i++){
                            this.articleCategorys.push({
                                code:data[i]['categoryId'],
                                value:data[i]['categoryName']
                            });
                        }
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            submitForm:function(formName,publishState) {
                let _this = this;
                let commitType = 'add';
                if (this.type == 2) {
                    commitType = 'updateArticle';
                }else{
                    this.ruleForm.id &&  delete this.ruleForm.id;
                }
                this.ruleForm.content = this.webEditor.getContent();
                let formParam = Object.assign({}, this.ruleForm);
                //formParam['showUserKeys'] = formParam['showUserKeys'].join(',');
                formParam['showDeviceKeys'] = formParam['showDeviceKeys'].join(',');
                formParam['publishState'] = publishState;


                if(this.editType == 'seeker'){
                    commitType = 'seekerEdit';
                }

                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        $("body").mLoading("show");
                        article[commitType](_this, formParam).then(function (response) {
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
                    this.ruleForm.backGroundPic = data.url;
                    return;
                }
            },
            showInfo: function(){
                this.showTitle=this.ruleForm.title || '示命名标题';
                this.showContent=this.webEditor.getContent();
                $('#myModal').modal();
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
