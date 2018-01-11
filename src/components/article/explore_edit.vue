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
                            <a href="javascript:;"  @click="back">探索文章</a>
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
                        <div class="panel-body" id="form-data-case">
                            <form class="form-horizontal" @submit.prevent="save">
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">标题<span class="required">*</span></label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" required placeholder="请输入标题" v-model.trim="param.title">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">状态</label>
                                    <div class="col-lg-10">
                                        <select class="form-control m-bot15"  v-model.trim="param.state">
                                            <option value="0">新建</option>
                                            <option value="1">发布</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">图标</label>
                                    <div class="col-lg-10">
                                        <vue-core-image-upload
                                            text="选择图片"
                                            inputOfFile="file"
                                            v-bind:class="['btn','btn-primary','btn-sm']"
                                            v-bind:crop="false"
                                            v-bind:url="uploadUrl"
                                            v-bind:isXhr="true"
                                            extensions="png,gif,jpeg,jpg"
                                            v-on:imageuploaded="imageuploaded"
                                            v-on:imageuploading="imageuploading">
                                        </vue-core-image-upload>
                                        <span  style="display:inline-block !important; padding: 5px;border: 1px solid #e2e2e4;">
                                            <img :src="imgSrc" style="width: 100px;height: 100px">
                                        </span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-lg-2 control-label">文章内容<span class="required">*</span></label>
                                    <div class="col-lg-10">
                                        <div id="web-editor" style="height: 300px; max-height:300px;"></div>
                                    </div>
                                </div>

                                <div class="form-group has-error">
                                    <label class="col-lg-2 control-label"></label>
                                    <label class="control-label col-lg-10" v-show="error!=''">{{error}}</label>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-offset-2 col-lg-10">
                                        <button type="submit" class="btn btn-info">提交</button>
                                        <button class="btn btn-default" type="button" @click="back">取消</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!--main content end-->
</template>

<script>
    import apiArticle from 'api/article';
    import VueCoreImageUpload  from 'components/common/vue.core.file.upload';

    export default {
        name: 'caseAdd',
        components: {
            'vue-core-image-upload': VueCoreImageUpload
        },
        data: function () {
            return {
                param: {
                    title: '',
                    state: '0',
                    backGroundPic:'',
                    content:''
                },
                webEditor:null,
                imgSrc: '',
                uploadUrl:'',
                error: '',
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '新增文章'
            }
        },
        watch: {
            param: {
                handler: function () {
                    this.error = '';
                },
                deep: true
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                // 富文本上传 配置
                let editor = new wangEditor('web-editor');
                let _config = ['menus','uploadImgUrl','uploadImgFileName'];
                let _configList = apiArticle.getWebEditorCfg();
                for(let i= 0;i<4;i++){
                    editor.config[_config[i]] = _configList[_config[i]];
                }
                editor.config.uploadImgFns.onload = function (resultText, xhr) {
                    if(typeof resultText == 'undefined' || resultText == '') return;
                    let result = JSON.parse(resultText);
                    if(result.code == 1){
                        let data = result.data;
                        editor.command(null, 'insertHtml', '<img src="' + data.url + '" alt="' + data.name + '" style="max-width:100%;"/>');
                    }else{
                        apiArticle.tips(this, {message: result.msg});
                    }
                };
                this.webEditor = editor;
                editor.create();
                // 富文本上传 配置 结束
                this.uploadUrl = apiArticle.exploreUploadUrl();
                this.type = this.$route.params.type;
                if (this.type == 2) {
                    this.typeTitle = '修改文章';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiArticle.getRowExploreItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for (let k in body.data) {
                                this.param[k] = body.data[k];
                                if(k == 'backGroundPic'){
                                    this.imgSrc =  body.data[k];
                                }
                                if(k == 'state'){
                                    this.param[k] = body.data[k].code;
                                }
                            }
                            this.webEditor.$txt.html(this.param.content);
                            return;
                        }
                        if (body && body.code == 0) {
                            apiArticle.tips(this, {message: body.msg});
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
                apiArticle.tips(this, {message: response.msg});
                if (response && response.code == 1) {
                    let data = response.data;
                    this.imgSrc = data;
                    return;
                }
            },
            save: function () {
                if (!this.param.title) {
                    this.error = '请输入标题！';
                    return;
                }
                let _content = this.webEditor.$txt.html();
                if (!(this.webEditor.$txt.text())) {
                    this.error = '请输入文章内容！';
                    return;
                }
                this.param.content = _content;
                this.param.backGroundPic = this.imgSrc;
                $("body").mLoading("show");
                let commitType = 'exploreAdd';
                if (this.type == 2) {
                    commitType = 'explorePut';
                }
                let _this = this;
               apiArticle[commitType](this, this.param).then(function (response) {
                    let body = response.body;
                    apiArticle.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.$router.go(-1);
                        return
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            getHtml:function(){
                console.log(this.webEditor.$txt.html());
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
