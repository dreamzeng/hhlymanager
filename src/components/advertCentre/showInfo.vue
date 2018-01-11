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
                        <li>{{ruleForm.title}}</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">{{ruleForm.title}}</div>
                        <div class="panel-body" >
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">banner名称</div>
                                    </section>
                                </div>
                                <div class="col-lg-10">
                                    <section class="panel">
                                        <div class="panel-body">{{ruleForm.title}}</div>
                                    </section>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">应用类型</div>
                                    </section>
                                </div>
                                <div class="col-lg-10">
                                    <section class="panel">
                                        <div class="panel-body">{{ruleForm.advertType}}</div>
                                    </section>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">应用模块</div>
                                    </section>
                                </div>
                                <div class="col-lg-10">
                                    <section class="panel">
                                        <div class="panel-body">{{ruleForm.moduleType}}</div>
                                    </section>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">banner图预览</div>
                                    </section>
                                </div>
                                <div class="col-lg-10">
                                    <section class="panel">
                                        <div class="panel-body">
                                            <img :src="ruleForm.pic" height="200px">
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">链接类型</div>
                                    </section>
                                </div>
                                <div class="col-lg-10">
                                    <section class="panel">
                                        <div class="panel-body">{{ruleForm.urlType}}</div>
                                    </section>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">链接地址</div>
                                    </section>
                                </div>
                                <div class="col-lg-10">
                                    <section class="panel">
                                        <div class="panel-body">{{ruleForm.url}}</div>
                                    </section>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">生效时间</div>
                                    </section>
                                </div>
                                <div class="col-lg-10">
                                    <section class="panel">
                                        <div class="panel-body">{{ruleForm.validTimeStart}}</div>
                                    </section>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">失效时间</div>
                                    </section>
                                </div>
                                <div class="col-lg-10">
                                    <section class="panel">
                                        <div class="panel-body">{{ruleForm.validTimeEnd}}</div>
                                    </section>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">备注</div>
                                    </section>
                                </div>
                                <div class="col-lg-10">
                                    <section class="panel">
                                        <div class="panel-body">{{ruleForm.content}}</div>
                                    </section>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2">
                                    <section class="panel">
                                        <div class="panel-body text-align">
                                            <el-button type="info" @click="back">确定</el-button><el-button @click="back">返回</el-button>
                                        </div>
                                    </section>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .text-align{
        text-align: center;
        font-weight: bold;
    }
</style>
<script>
    import apiAdvertCentre from 'api/advertCentre';

    export default {
        name: 'advertCentreShowInfo',
        data: function () {
            return {
                ruleForm:{
                    title:'', //banner名称
                    advertType:'', //应用类型
                    moduleType:'', //应用模块
                    pic:'', //banner图预览
                    urlType:'1', //链接类型
                    url:'', //链接地址
                    validTimeStart:'', //生效时间
                    validTimeEnd:'', //失效时间
                    content:'' //备注
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
                let id = this.$route.params.id;
                $("body").mLoading("show");
                this.getItem(id);
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
                        this.ruleForm['content'] = data.content;
                        this.ruleForm['advertType'] = data.advertType.value;
                        this.ruleForm['urlType'] = data.urlType.value;
                        this.ruleForm['moduleType'] = data.moduleType.value;
                        return;
                    }
                    if (body && body.code == 0) {
                        this.$message.error({message: body.msg});
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
