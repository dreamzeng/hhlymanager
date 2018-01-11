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
                            <router-link :to="{name: 'version_list'}">版本列表</router-link>
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
                        <div class="panel-body">
                            <form @submit.prevent="save" class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">应用名<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入应用名" required  v-model.trim="param.name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">应用版本号<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入应用版本号" required v-model.trim="param.version">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">版本号<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入版本号" required v-model.trim="param.code">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">版本类型</label>

                                    <div class="col-lg-10">
                                        <select class="form-control m-bot15" v-model.trim="param.type">
                                            <option value="1">律师</option>
                                            <option value="2">用户</option>
                                            <option value="0">系统</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">应用平台</label>

                                    <div class="col-lg-10">
                                        <select class="form-control m-bot15" v-model.trim="param.platform">
                                            <option value="1">苹果</option>
                                            <option value="2">IPAD</option>
                                            <option value="3">安卓</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">状态</label>

                                    <div class="col-lg-10">
                                        <select class="form-control m-bot15" v-model.trim="param.state">
                                            <option value="0">锁定</option>
                                            <option value="1">计时</option>
                                            <option value="-1">未开始</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">是否强制更新</label>

                                    <div class="col-lg-10">
                                        <select class="form-control m-bot15" v-model.trim="param.forceUpdate">
                                            <option value="false">否</option>
                                            <option value="true">是</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" id="form-data-case">
                                    <label class="col-lg-2 control-label">版本文件*</label>

                                    <div class="col-lg-10">
                                        <vue-core-file-upload
                                            text="选择APP版本文件"
                                            inputOfFile="file"
                                            v-bind:class="['btn','btn-primary','btn-sm']"
                                            v-bind:crop="false"
                                            v-bind:url="uploadUrl"
                                            v-bind:isXhr="true"
                                            extensions=""
                                            inputAccept=""
                                            v-bind:maxFileSize="1024 * 1024 * 10000"
                                            v-on:imageuploaded="imageuploaded"
                                            v-on:imageuploading="imageuploading">
                                        </vue-core-file-upload>
                                        <span style="display:inline-block !important;">{{param.downUrl || statusUpload}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">版本描述</label>

                                    <div class="col-lg-10">
                                        <textarea class="form-control" placeholder="版本描述" v-model.trim="param.content"></textarea>
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
                            </form >
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!--main content end-->
</template>

<script>
    import VueCoreFileUpload  from 'components/common/vue.core.file.upload';
    import apiVersion from 'api/version'

    export default {
        name: 'versionAdd',
        components: {
            'vue-core-file-upload': VueCoreFileUpload
        },
        data: function () {
            return {
                param:{
                    name:'',
                    version:'',
                    code:'',
                    type:'1',
                    platform:'1',
                    state:'0',
                    forceUpdate:'false',
                    downUrl:'',
                    content:''
                },
                uploadUrl:'',
                statusUpload:'未选择文件！',
                error: '',
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '新增版本'
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
                this.uploadUrl = apiVersion.versionUploadUrl();

                this.type = this.$route.params.type;
                if (this.type == 2) {
                    this.typeTitle = '修改版本信息';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiVersion.getRowVersionItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for (let k in body.data) {
                                this.param[k] = body.data[k];
                                if(k == 'platform' || k == 'state' || k == 'type'){
                                    this.param[k] = body.data[k].code;
                                }
                            }
                            return;
                        }
                        if (body && body.code == 0) {
                            apiVersion.tips(this, {message: body.msg});
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
            },
            imageuploading:function(response) {
                this.statusUpload = '已选择文件，正在上传!';
                $('#form-data-case').mLoading({
                    text:'正在上传，请稍后...'
                });
            },
            imageuploaded:function(response) {
                console.log(response);
                $('#form-data-case').mLoading("hide");
                apiVersion.tips(this, {message: response.msg});
                if (response && response.code == 1) {
                    let data = response.data;
                    this.param['downUrl'] = data;
                    return;
                }
                this.statusUpload = response.msg;
            },
            save: function () {
                if (!this.param.name) {
                    this.error = '请输入应用名！';
                    return;
                }
                if (!this.param.version) {
                    this.error = '请输入应用版本号！';
                    return;
                }
                $("body").mLoading("show");
                let commitType = 'versionAdd';
                if (this.type == 2) {
                    commitType = 'versionPut';
                }
                let _this = this;
                apiVersion[commitType](this, this.param).then(function (response) {
                    let body = response.body;
                    apiVersion.tips(this, {message: body.msg});
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

