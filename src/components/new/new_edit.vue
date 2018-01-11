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
                                    <label class="col-lg-2 control-label">内嵌URL</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入内嵌URL" v-model.trim="param.pageUrl">
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
    import apiNew from 'api/new';
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
                    imageUrl:'',
                    pageUrl:''
                },
                editorOption:{

                },
                imgSrc: '',
                uploadUrl:'',
                error: '',
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '新增轮播图'
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
                this.uploadUrl = apiNew.newUploadUrl();
                this.type = this.$route.params.type;
                if (this.type == 2) {
                    this.typeTitle = '修改轮播图';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiNew.getRowNewItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for (let k in body.data) {
                                this.param[k] = body.data[k];
                                if(k == 'imageUrl'){
                                    this.imgSrc =  body.data[k];
                                }
                                if(k == 'state'){
                                    this.param[k] = body.data[k].code;
                                }
                            }
                            return;
                        }
                        if (body && body.code == 0) {
                            apiNew.tips(this, {message: body.msg});
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
                apiNew.tips(this, {message: response.msg});
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
                this.param.imageUrl = this.imgSrc;
                $("body").mLoading("show");
                let commitType = 'newAdd';
                if (this.type == 2) {
                    commitType = 'newPut';
                }
                let _this = this;
                apiNew[commitType](this, this.param).then(function (response) {
                    let body = response.body;
                    apiNew.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.$router.go(-1);
                        return
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
