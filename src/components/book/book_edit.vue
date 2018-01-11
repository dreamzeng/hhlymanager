<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><a href="#"><i class="icon-home"></i> Home</a></li>
                        <li @click="back">
                            <a href="javascript:;">文书合同</a>
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
                                <div class="form-group" >
                                    <label class="col-lg-2 control-label">类型</label>
                                    <div class="col-lg-10" id="op-types">
                                        <select class="form-control m-bot15" v-model.trim="param.type">
                                            <option v-for="option in types" :value="option.id">{{option.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" id="form-data-case">
                                    <label class="col-lg-2 control-label">文件*</label>
                                    <div class="col-lg-10">
                                        <input type="file" name="file">
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
    import apiBook from 'api/book'
    import xhr from 'lib/xhr'

    export default {
        name: 'versionAdd',
        data: function () {
            return {
                param:{
                    type:'1'
                },
                types:{

                },
                uploadUrl:'',
                statusUpload:'未选择文件！',
                error: '',
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '新增合同'
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
                $('#op-types').mLoading("show");
                apiBook.typeList(this).then(function(response){
                    $('#op-types').mLoading("hide");
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.types = data;
                        return;
                    }
                },function(response){
                    console.log('error:', response);
                });
            });
        },
        methods: {
            init: function () {

            },
            save: function () {
                $("body").mLoading("show");
                let _this = this;
                let formData = new FormData($('form')[0]);
                formData.append('type', _this.param.type);
                xhr('POST',apiBook.bookAddUrl, {}, formData,function(res) {
                    $("body").mLoading("hide");
                    apiBook.tips(_this, {message: res.msg});
                    if (res && res.code == 1) {
                        _this.$router.go(-1);
                        return
                    }
                },true);

            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>

