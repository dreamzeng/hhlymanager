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
                        <li @click="back">
                            <a href="javascript:;">系统设置</a>
                        </li>
                        <li class="active">{{typeTitle}}</li>
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
                                    <label class="col-lg-2 control-label">参数KEY<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" required placeholder="请输入参数" v-model.trim="param.conKey">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">参数值<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" required placeholder="请输入参数值" v-model.trim="param.conValue">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">参数说明</label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入参数说明" v-model.trim="param.conComment">
                                    </div>
                                </div>
                                <div class="form-group has-error">
                                    <label class="col-lg-2 control-label"></label>
                                    <label class="control-label col-lg-10" v-show="error!=''">{{error}}</label>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-offset-2 col-lg-10">
                                        <button class="btn btn-info" type="submit">保存</button>
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
    import apiSystem from 'api/system'

    export default {
        name: 'configAdd',
        data: function () {
            return {
                dataList: [],
                param: {
                    conKey: '',
                    conValue: '',
                    conComment: ''
                },
                error: '',
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '新建参数'
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
                this.type = this.$route.params.type;
                if (this.type == 2) {
                    this.typeTitle = '修改参数';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiSystem.getRowConfigItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for (let k in body.data) {
                                this.param[k] = body.data[k];
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
            save: function () {
                if (!this.param.conKey) {
                    this.error = '请输入参数！';
                    return;
                }
                if (!this.param.conValue) {
                    this.error = '请输入参数值！';
                    return;
                }
                $("body").mLoading("show");
                let commitType = 'configAdd';
                if (this.type == 2) {
                    commitType = 'configPut';
                }
                let _this = this;
                apiSystem[commitType](this, this.param).then(function (response) {
                    let body = response.body;
                    apiSystem.tips(this, {message: body.msg});
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

