<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li @click="back">
                            <a href="javascript:;">文书管理</a>
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
                            <form class="form-horizontal" role="form" enctype="multipart/form-data" method="POST" @submit.prevent="save">

                                <div class="form-group">
                                    <label class="col-lg-2 control-label">名称<span class="required">*</span></label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" required placeholder="名称" v-model.trim="param.name">
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
    import apiBook from 'api/book';
    export default {
        name: 'bookTypesEdit',
        data: function () {
            return {
                param: {
                    name: ''
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
                    apiBook.getRowTypeItem(this, this.id).then(function (response) {
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
                if (!this.param.name) {
                    this.error = '请输入名称！';
                    return;
                }
                $("body").mLoading("show");
                let commitType = 'typeAdd';
                if (this.type == 2) {
                    commitType = 'typePut';
                }
                let _this = this;
                apiBook[commitType](this, this.param).then(function (response) {
                    let body = response.body;
                    apiBook.tips(this, {message: body.msg});
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
