<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><a href="#"><i class="icon-home"></i> Home</a></li>
                        <li>
                            <router-link :to="{name: 'info_index'}">首页轮播</router-link>
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
                            <form class="form-horizontal" role="form" @submit.prevent="save">
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">活动主题<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="活动主题" required v-model.trim="param.title">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">类型</label>

                                    <div class="col-lg-10">
                                        <select class="form-control" v-model.trim="param.type">
                                            <option value="" selected="">请选择</option>
                                            <option v-for="item in optionsTyps" :value="item.code">{{item.value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">状态</label>

                                    <div class="col-lg-10">
                                        <select class="form-control" v-model.trim="param.state">
                                            <option value="0">启用</option>
                                            <option value="1">禁用</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">权限</label>

                                    <div class="col-lg-10">
                                        <select class="form-control" v-model.trim="param.auth">
                                            <option value="0">游客</option>
                                            <option value="1">登录</option>
                                            <option value="2">VIP用户</option>
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
                                        <span style="display:inline-block !important; padding: 5px;border: 1px solid #e2e2e4;">
                                          <img :src="imgSrc" style="width:100px;height:100px;">
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">内嵌URL</label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="内嵌URL" v-model.trim="param.url">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">活动内容<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <textarea class="form-control" rows="3" required v-model.trim="param.content"></textarea>
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
    import apiInfo from 'api/info';
    import VueCoreImageUpload  from 'components/common/vue.core.file.upload';

    export default {
        name: 'infoIndexAdd',
        components: {
            'vue-core-image-upload': VueCoreImageUpload
        },
        data: function () {
            return {
                param: {
                    title: '',
                    type: '',
                    state:'0',
                    pic:'',
                    url:'',
                    content:'',
                    auth:'0'
                },
                optionsTyps:[],
                imgSrc: '',
                uploadUrl:'',
                error: '',
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '新建参数'
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                apiInfo.indexActivityTypes(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        this.optionsTyps = body.data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
                this.uploadUrl = apiInfo.indexUploadUrl();
                this.type = this.$route.params.type;
                if (this.type == 2) {
                    this.typeTitle = '修改参数';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiInfo.getRowIndexItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for (let k in body.data) {
                                this.param[k] = body.data[k];
                                if(k == 'pic'){
                                    this.imgSrc =  body.data[k];
                                }else if(k == 'type'){
                                    let type = body.data[k];
                                    this.param['type'] =  type.code;
                                }else if(k == 'auth'){
                                    let type = body.data[k];
                                    this.param['auth'] =  type.code;
                                }
                            }
                            return;
                        }
                        if (body && body.code == 0) {
                            apiSystem.tips(this, {message: body.msg});
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
                apiInfo.tips(this, {message: response.msg});
                if (response && response.code == 1) {
                    let data = response.data;
                    this.imgSrc = data;
                    return;
                }
            },
            save: function () {
                if (!this.param.title) {
                    this.error = '请输入活动主题！';
                    return;
                }
                if (!this.param.content) {
                    this.error = '请输入活动内容！';
                    return;
                }
                this.param.pic = this.imgSrc;
                $("body").mLoading("show");
                let commitType = 'indexAdd';
                if (this.type == 2) {
                    commitType = 'indexPut';
                }
                let _this = this;
                apiInfo[commitType](this, this.param).then(function (response) {
                    let body = response.body;
                    apiInfo.tips(this, {message: body.msg});
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

