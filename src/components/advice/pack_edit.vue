<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><a href="#"><i class="icon-home"></i> Home</a></li>
                        <li><router-link :to="{name: 'pack_list'}">咨询套餐</router-link></li>
                        <li>
                            {{typeTitle}}
                        </li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">{{typeTitle}}</div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form"  @submit.prevent="save">
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">主题<span class="required">*</span></label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入主题" required  v-model.trim="param.title">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-lg-2 control-label">套餐类型</label>
                                    <div class="col-lg-10">
                                        <select class="form-control m-bot15" v-model.trim="param.type" :disabled="type == '2'">
                                            <option value="1">包时</option>
                                            <option value="2">计时</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- 包时  -->
                                <div class="form-group"  v-if="param.type == 1">
                                    <label class="col-lg-2 control-label">价格<span class="required">*</span></label>
                                    <div class="col-lg-10">
                                        <div class="col-lg-2" style=" padding-left: 0;padding-right: 0;">
                                            <div class="col-lg-10" style="padding-left: 0;padding-right: 0;">
                                                <input type="text" class="form-control" required v-model.trim="param.priceOne">
                                            </div>
                                            <label class="col-lg-2 control-label">元/</label>
                                        </div>
                                        <div class="col-lg-2" style="padding-left: 0;padding-right: 0;">
                                            <div class="col-lg-8" style="padding-left: 0;padding-right: 0;">
                                                <input type="text" class="form-control" required v-model.trim="param.minutesOne">
                                            </div>
                                            <div class="col-lg-4">
                                                <select class="form-control" style="width: 80px;" v-model.trim="param.unitOne" :disabled="type == '2'">
                                                    <option value="DAY">天</option>
                                                    <option value="WEEK">周</option>
                                                    <option value="MONTH">月</option>
                                                    <option value="YEAR">年</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 计时  -->
                                <div class="form-group"  v-if="param.type == 2">
                                    <label class="col-lg-2 control-label">价格<span class="required">*</span></label>
                                    <div class="col-lg-10">
                                        <div class="col-lg-2" style=" padding-left: 0;padding-right: 0;">
                                            <div class="col-lg-10" style="padding-left: 0;padding-right: 0;">
                                                <input type="text" class="form-control" required v-model.trim="param.priceTwo">
                                            </div>
                                            <label class="col-lg-2 control-label">元/</label>
                                        </div>
                                        <div class="col-lg-2" style="padding-left: 0;padding-right: 0;">
                                            <div class="col-lg-8" style="padding-left: 0;padding-right: 0;">
                                                <input type="text" class="form-control" required v-model.trim="param.minutesTwo">
                                            </div>
                                            <div class="col-lg-4">
                                                <select class="form-control" style="width: 80px;" v-model.trim="param.unitTwo" :disabled="type == '2'">
                                                    <option value="MIN">分钟</option>
                                                    <option value="HOUR">小时</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-lg-2 control-label">状态</label>
                                    <div class="col-lg-10">
                                        <select class="form-control m-bot15" v-model.trim="param.state">
                                            <option value="Enable">启用</option>
                                            <option value="Disable">禁用</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">开始时间</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control form_datetime" value="" placeholder="开始时间" value="" id="form-beginTime">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">结束时间</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control form_datetime" value="" placeholder="结束时间" value="" id="form-endTime">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">套餐描述</label>
                                    <div class="col-lg-10">
                                        <textarea class="form-control" placeholder="套餐描述" v-model.trim="param.content"></textarea>
                                    </div>
                                </div>
                                <div class="form-group has-error">
                                    <label class="col-lg-2 control-label"></label>
                                    <label class="control-label col-lg-10" v-show="error!=''">{{error}}</label>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-offset-2 col-lg-10">
                                        <button type="submit" class="btn btn-info">提交</button>
                                        <router-link class="btn btn-default" :to="{name: 'pack_list'}">取消</router-link>
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
    import apiAdvice from 'api/advice'

    export default {
        name: 'packAdd',
        data: function () {
            return {
                dataList: [],
                param: {
                    title: '',
                    type: '1',
                    priceOne:'',
                    minutesOne:'',
                    unitOne:'DAY',
                    priceTwo:'',
                    minutesTwo:'',
                    unitTwo:'MIN',
                    state:'Enable',
                    beginTime:'',
                    endTime:'',
                    content:'',
                    id:''
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
                $(".form_datetime").datetimepicker({
                    language: 'zh-CN',
                    format: "yyyy-mm-dd",
                    weekStart: 1,
                    todayBtn: 1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0
                });
                this.type = this.$route.params.type;
                if (this.type == 2) {
                    this.typeTitle = '修改参数';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiAdvice.getPackItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for (let k in body.data) {
                                if(k=='price'){
                                    this.param['priceOne'] = body.data[k];
                                    this.param['priceTwo'] = body.data[k];
                                }else if(k=='type'){
                                    this.param['type'] = body.data[k].code;
                                }else if(k=='minutes'){
                                    this.param['minutesOne'] = body.data[k];
                                    this.param['minutesTwo'] = body.data[k];
                                }else if(k=='beginTime'){
                                    this.param['beginTime'] = body.data[k];
                                    $('#form-beginTime').val(this.param['beginTime']);
                                }else if(k=='endTime'){
                                    this.param['endTime'] = body.data[k];
                                    $('#form-endTime').val(this.param['endTime']);
                                }else if(k=='state'){
                                    if(body.data[k].code == 1){
                                        this.param['state'] = 'Enable';
                                    }else{
                                        this.param['state'] = 'Disable';
                                    }
                                }else if(k == 'unit'){
                                    if(body.data[k].code == 1){
                                        this.param['unitOne'] = 'DAY';
                                    }else if(body.data[k].code == 2){
                                        this.param['unitOne'] = 'WEEK';
                                    }else if(body.data[k].code == 3){
                                        this.param['unitOne'] = 'MONTH';
                                    }else if(body.data[k].code == 4){
                                        this.param['unitOne'] = 'YEAR';
                                    }else if(body.data[k].code == 7){
                                        this.param['unitTwo'] = 'MIN';
                                    }else if(body.data[k].code == 8){
                                        this.param['unitTwo'] = 'HOUR';
                                    }
                                }
                                else{
                                    this.param[k] = body.data[k];
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
            save: function () {
                if (!this.param.title) {
                    this.error = '请输入主题！';
                    return;
                }
                if (!this.param.priceOne && this.param.type == '1') {
                    this.error = '请输入价格！';
                    return;
                }
                if (!this.param.minutesOne && this.param.type == '1') {
                    this.error = '请输入周期！';
                    return;
                }
                if (!this.param.priceTwo && this.param.type == '2') {
                    this.error = '请输入价格！';
                    return;
                }
                if (!this.param.minutesTwo && this.param.type == '2') {
                    this.error = '请输入周期！';
                    return;
                }
                this.param['beginTime'] = $('#form-beginTime').val();
                this.param['endTime'] = $('#form-endTime').val();

                $("body").mLoading("show");
                let commitType = 'packAdd';
                if (this.type == 2) {
                    commitType = 'packPut';
                }
                let _this = this;
                apiAdvice[commitType](this, this.param).then(function (response) {
                    let body = response.body;
                    apiAdvice.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.$router.go(-1);
                        return
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            }
        }
    }
    //
</script>

