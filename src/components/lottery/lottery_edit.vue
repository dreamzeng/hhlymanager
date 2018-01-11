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
                            <a href="javascript:;">活动统计</a>
                        </li>
                        <li class="active">添加奖品</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row" id="show-res">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-2">添加奖品</div>
                                <div class="col-md-6"></div>
                                <div class="col-md-4" style="text-align: right">
                                    <button class="btn btn-info" type="button" @click="init">刷新</button>
                                    <button class="btn btn-primary" type="button" @click="addRow">新增一行</button>
                                    <button class="btn btn-default" type="button" @click="back">返回</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-inline">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="panel-body">
                                        <form @submit.prevent="save">
                                            <div class="form-group">
                                                <label style="margin: 0 5px;font-weight: inherit;">活动时间</label>
                                                <input type="text" style="width: 200px;margin: 0 10px;" class="form-control form_datetime" required placeholder="开始时间" id="form-beginTime">
                                                <label style="margin: 0 5px">-</label>
                                                <input type="text" style="width: 200px;margin: 0 10px;" class="form-control form_datetime" required placeholder="结束时间" id="form-endTime">
                                                <button title="保存" class="btn btn-primary" type="submit"><i class="icon-save"></i>保存</button>
                                            </div>
                                        </form>
                                        <form style="margin: 10px 0;" v-for="(item , index ) in prizeList" @submit.prevent="savePrize(item)">
                                            <div class="form-group">

                                                <label style="margin: 0 10px;font-weight: inherit;">编码</label>
                                                <input type="text" style="width: 50px;margin: 0 10px;" class="form-control" v-model.trim="item.prizeLevel">


                                                <label style="margin: 0 10px;font-weight: inherit;">名称<span class="required">*</span></label>
                                                <input type="text" style="width: 150px;margin: 0 10px;" class="form-control" required placeholder="请输入名称" v-model.trim="item.prizeName">

                                                <label style="margin: 0 10px;font-weight: inherit;">库存<span class="required">*</span></label>
                                                <input type="number" style="width: 100px;margin: 0 10px;" class="form-control" required v-model.trim="item.prizeNumber" >

                                                <label style="margin: 0 10px;font-weight: inherit;">区间<span class="required">*</span></label>
                                                <input type="number" style="width: 100px" class="form-control" required placeholder="开始" v-model.trim="item.startWeightNumber">
                                                <label style="margin: 0 10px;font-weight: inherit;">-</label>
                                                <input type="number" style="width: 100px" class="form-control" required placeholder="结束" v-model.trim="item.endWeightNumber" >

                                                <label style="margin: 0 10px;font-weight: inherit;">类型<span class="required">*</span></label>
                                                <select style="width: 100px;margin: 0 10px;" class="form-control" v-model="item.prizeType">
                                                    <option value="E">实体奖品</option>
                                                    <option value="V">虚拟奖品</option>
                                                    <option value="L">安慰奖(参与奖)</option>
                                                </select>

                                                <label style="margin: 0 5px;font-weight: inherit;">概率</label>
                                                <input type="text" style="width: 100px;margin: 0 10px;" class="form-control" disabled :value="item.probability">
                                            </div>

                                            <button title="保存" class="btn btn-primary" type="submit"><i class="icon-save"></i></button>
                                            <button title="删除" class="btn btn-danger" type="button" @click="confirm(item)" v-if="prizeList.length > 1"><i class="icon-trash "></i></button>
                                        </form>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-12">
                                            <button class="btn btn-primary" type="button" @click="addRow">新增一行</button>
                                            <button class="btn btn-default" type="button" @click="back">返回</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                          <!--  <form class="form-horizontal" role="form" v-for="(item , index ) in prizeList" @submit.prevent="savePrize(item)">
                                <div class="form-group">
                                    <div class="col-lg-1">
                                        <label class="col-lg-7 control-label">编码</label>
                                        <div class="col-lg-5" style="margin: 0;padding: 0;">
                                            <input type="text" class="form-control" v-model.trim="item.prizeLevel">
                                        </div>
                                    </div>
                                    <div class="col-lg-2">
                                        <label class="col-lg-4 control-label">名称<span class="required">*</span></label>
                                        <div class="col-lg-8" style="margin: 0;padding: 0;">
                                            <input type="text" class="form-control" required placeholder="请输入名称" v-model.trim="item.prizeName">
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                        <label class="col-lg-8 control-label">库存<span class="required">*</span></label>
                                        <div class="col-lg-4" style="margin: 0;padding: 0;">
                                            <input type="text" class="form-control" style="padding: 3px;"  required v-model.trim="item.prizeNumber" >
                                            <span class="required"></span>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <label class="col-lg-3 control-label">区间<span class="required">*</span></label>
                                        <div class="col-lg-9" style="margin: 0;padding: 0;">
                                            <span style="display: inline-block;width: 48%">
                                                <input type="text" class="form-control" required placeholder="开始" v-model.trim="item.startWeightNumber" >
                                            </span>
                                            <span style="display: inline-block; width: 1%">-</span>
                                             <span style="display: inline-block;width: 48%">
                                                <input type="text" class="form-control" required placeholder="结束" v-model.trim="item.endWeightNumber" >
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-lg-2">
                                        <label class="col-lg-3 control-label">类型<span class="required"></span></label>
                                        <div class="col-lg-8" style="margin: 0;padding: 0;">
                                            <select class="form-control" v-model="item.prizeType">
                                                <option value="E">实体奖品</option>
                                                <option value="V">虚拟奖品</option>
                                                <option value="L">安慰奖(参与奖)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2">
                                        <label class="col-lg-3 control-label">概率<span class="required"></span></label>
                                        <div class="col-lg-8" style="margin: 0;padding: 0;">
                                            <input type="text" class="form-control" disabled :value="item.probability">
                                            <span class="required"></span>
                                        </div>
                                    </div>
                                    <div class="col-lg-1" style="padding-top: 5px;">
                                        <button title="保存" class="btn btn-primary btn-xs" type="submit"><i class="icon-save"></i></button>
                                        <button title="删除" class="btn btn-danger btn-xs" type="button" @click="confirm(item)" v-if="prizeList.length > 1"><i class="icon-trash "></i></button>
                                    </div>
                                </div>

                            </form>-->
                            <!--<div class="form-group">
                                <div class="col-lg-12">
                                    <button class="btn btn-primary" type="button" @click="addRow">添加</button>
                                    <button class="btn btn-default" type="button" @click="back">返回</button>
                                </div>
                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>
    </div>
    <!--main content end-->
</template>

<script>
    import apiLottery from 'api/lottery'
    import confirm from 'components/common/confirm';

    export default {
        name: 'lotteryEdit',
        components: {confirm: confirm},
        data: function () {
            return {
                prizeList: [],
                item:null,
                message: '',
                title: '是否删除该奖品？'
            }
        },
        watch: {

        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
                $(".form_datetime").datetimepicker({
                    language: 'zh-CN',
                    format: "yyyy-mm-dd HH:ii:ss",
                    weekStart: 1,
                    todayBtn: 1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0
                });
            });
        },
        methods: {
            init: function () {
                $("#show-res").mLoading("show");
                apiLottery['prizesList'](this).then(function (response) {
                    $("#show-res").mLoading("hide");
                    let body = response.body;
                    if(body && body.code == 1 && body.data && body.data.items && body.data.items.length>0){
                        let items = body.data.items;
                        this.prizeList = [];
                        for(let i= 0,lg=items.length;i<lg;i++) {
                            this.prizeList.push({
                                id:items[i]['id'],
                                prizeLevel: items[i]['prizeLevel'],  //编码
                                prizeName: items[i]['prizeName'],  //名称
                                prizeNumber: items[i]['prizeNumber'], //库存
                                prizeWeight:items[i]['prizeWeight'], //权重
                                startWeightNumber:items[i]['startWeightNumber'], //权重开始区间
                                endWeightNumber:items[i]['endWeightNumber'], //权重结束区间
                                probability: items[i]['probability'], //概率
                                prizeType:items[i]['prizeType']//奖品类型
                            });
                        }
                        return;
                    }
                    this.prizeList.push({
                        prizeLevel: '', //编码
                        prizeName: '', //名称
                        prizeNumber: '', //库存
                        startWeightNumber:'', //权重开始区间
                        endWeightNumber:'', //权重结束区间
                        probability:'', //概率
                        prizeType:'E'
                    });
                }, function (response) {
                    console.log('error:', response);
                });
                apiLottery['timesGet'](this).then(function (response) {
                    let body = response.body;
                    if(body && body.code == 1 && body.data){
                        $('#form-beginTime').val(body.data.startTime.conValue);
                        $('#form-endTime').val(body.data.endTime.conValue);
                    }
                });
            },
            save: function () {
                let param = {
                    startTime: $('#form-beginTime').val(),
                    endTime: $('#form-endTime').val()
                };
                $("#show-res").mLoading("show");
                apiLottery['timesPut'](this, param).then(function (response) {
                    $("#show-res").mLoading("hide");
                    let body = response.body;
                    apiLottery.tips(this, {message: body.msg});
                }, function (response) {
                    console.log('error:', response);
                });
            },
            back:function(){
                this.$router.go(-1);
            },
            savePrize: function(item){
                let reg = new RegExp("^[0-9]*$");
                let flg = false,msg = '';
                if (item.prizeName+'' == '') {
                    msg += '请输入名称！</br>';
                    flg = true;
                }
                if (item.prizeNumber+'' == '') {
                    msg += '请输入库存！</br>';
                    flg = true;
                }
                if (!reg.test(item.prizeNumber)) {
                    msg += '<span style="color: #FF6C60;">库存</span>&nbsp;数量只能为整数！</br>';
                    item.prizeNumber = '';
                    flg = true;
                }
                if (item.startWeightNumber+'' == '') {
                    msg += '请输入开始区间</br>';
                    flg = true;
                }
                if (item.endWeightNumber+'' == '') {
                    msg += '请输入结束区间</br>';
                    flg = true;
                }
                if (!reg.test(item.startWeightNumber)) {
                    msg += '<span style="color: #FF6C60;">开始区间</span>&nbsp;只能为整数！</br>';
                    item.startWeightNumber = '';
                    flg = true;
                }
                if (!reg.test(item.endWeightNumber)) {
                    msg += '<span style="color: #FF6C60;">结束区间</span>&nbsp;只能为整数！</br>';
                    item.endWeightNumber = '';
                    flg = true;
                }
                if (reg.test(item.startWeightNumber)&&reg.test(item.endWeightNumber) && item.startWeightNumber > item.endWeightNumber) {
                    msg += '开始区间<span style="color: #FF6C60;">大于</span>结束区间</br>';
                    flg = true;
                }
                if(flg){
                    apiLottery.tips(this, {message: msg});
                    return;
                }
                let commitType = 'prizesPut';
                if (typeof item.id == 'undefined') {
                    commitType = 'prizesAdd';
                }
                $("#show-res").mLoading("show");
                apiLottery[commitType](this, item).then(function (response) {
                    $("#show-res").mLoading("hide");
                    let body = response.body;
                    apiLottery.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.init();
                        return
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            addRow: function(){
                this.prizeList.push({
                    prizeLevel: '', //编码
                    prizeName: '', //名称
                    prizeNumber: '', //库存
                    prizeWeight:'', //权重
                    startWeightNumber:'', //权重开始区间
                    endWeightNumber:'', //权重结束区间
                    probability:'', //概率
                    prizeType:'E'
                });
            },
            confirm: function (item) { //删除确认
                if(typeof item.prizeName == 'undefined'){
                    apiLottery.tips(this, {message: '未选择！'});
                    return;
                }
                this.message = '奖品名称：' + item.prizeName;
                this.item = item;
                $('#myConfirm').modal();
            },
            deleteItem: function(){
                $("#show-res").mLoading("show");
                apiLottery['prizesDel'](this, this.item.id).then(function (response) {
                    $("#show-res").mLoading("hide");
                    let body = response.body;
                    apiLottery.tips(this, {message: body.msg});
                }, function (response) {
                    console.log('error:', response);
                });
                if(this.prizeList.length <= 1) return;
                var index = this.prizeList.indexOf(this.item);
                this.prizeList.splice(index,1);
            }
        }
    }
    //
</script>

