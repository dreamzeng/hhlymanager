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
                        <li class="active">系统设置</li>
                        <li class="active">资源管理</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>

            <div class="row" id="show-res">
                <div class="col-lg-3">
                    <div class="panel">
                        <div class="panel-body">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-md-4">资源结构树</div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div class="portlet-body" id="resTree"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="panel">
                        <div class="panel-body">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-md-4">资源详情</div>
                                    <div class="col-md-8" style="text-align: right">
                                        <a class="btn btn-info  btn-sm" @click="active('add',0)">
                                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                            新增父资源
                                        </a>
                                        <a class="btn btn-info  btn-sm" @click="active('add',1)">
                                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                            新增子资源
                                        </a>
                                        <a class="btn btn-primary  btn-sm" @click="active('put')">
                                            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                            编辑此资源
                                        </a>
                                        <a class="btn btn-danger  btn-sm" @click="confirm">
                                            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                            删除此资源
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <form class="form-horizontal" role="form" style="margin-top: 20px;" @submit.prevent="save">
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label" style="text-align: center;">名称<span class="required">*</span></label>
                                        <div class="col-lg-10">
                                            <input type="text" :disabled="isDisabled" required class="form-control" v-model.trim="param.name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label" style="text-align: center;">别名<span class="required">*</span></label>
                                        <div class="col-lg-10">
                                            <input type="text" :disabled="isDisabled" required class="form-control" v-model.trim="param.code">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label" style="text-align: center;">图标</label>
                                        <div class="col-lg-8">
                                            <input type="text" :disabled="isDisabled" class="form-control" v-model.trim="param.icon">
                                        </div>
                                        <div class="col-lg-2">
                                            <a :disabled="isDisabled" class="btn btn-info  btn-sm" @click="openIconList">
                                                <i class="icon-briefcase"></i>
                                                选择图标
                                            </a>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label" style="text-align: center;">类型<span class="required">*</span></label>
                                        <div class="col-lg-10">
                                            <select class="form-control" :disabled="isDisabled" v-model.trim="param.type">
                                                <option value="MENU">MENU</option>
                                                <option value="URL">URL</option>
                                                <option value="BUTTON" selected="selected">BUTTON</option>
                                                <option value="MOBILE">MOBILE</option>
                                                <option value="API">API</option>
                                                <option value="MODULE">MODULE</option>
                                                <option value="FUNCTION">FUNCTION</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label" style="text-align: center;">路由<span class="required">*</span></label>
                                        <div class="col-lg-10">
                                            <input type="text" :disabled="isDisabled" required class="form-control" v-model.trim="param.url">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label" style="text-align: center;">排序<span class="required">*</span></label>
                                        <div class="col-lg-10">
                                            <input type="text" :disabled="isDisabled" required class="form-control" v-model.trim="param.seq">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label" style="text-align: center;">状态<span class="required">*</span></label>
                                        <div class="col-lg-10">
                                            <select class="form-control" :disabled="isDisabled" v-model.trim="param.state">
                                                <option value="1">启用</option>
                                                <option value="0">不启用</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label" style="text-align: center;">操作<span class="required">*</span></label>
                                        <div class="col-lg-10">
                                            <label class="checkbox-inline">
                                                <input type="checkbox" name="method" :disabled="isDisabled" value="GET" v-model="methodArray">GET
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" name="method" :disabled="isDisabled" value="POST" v-model="methodArray">POST
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" name="method" :disabled="isDisabled" value="PUT" v-model="methodArray">PUT
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" name="method" :disabled="isDisabled" value="DELETE" v-model="methodArray">DELETE
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group has-error">
                                        <label class="col-lg-2 control-label"></label>
                                        <label class="control-label col-lg-10" v-show="error!=''">{{error}}</label>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-offset-2 col-lg-10">
                                            <button type="submit" class="btn btn-info" :disabled="isDisabled">提交</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除确认 -->
        <confirm v-on:confirm="deleteItem" :message="message" :title="title"></confirm>
        <!-- icon -->
        <iconList v-on:actIcon="actIcon"></iconList>
    </div>
</template>
<script>
    import Page from 'components/common/Page';
    import apiSystem from 'api/system';
    import confirm from 'components/common/confirm';
    import iconList from 'components/common/iconList';

    export default {
        name: 'resourceList',
        components: {Page: Page, confirm: confirm,iconList:iconList},
        data: function () {
            return {
                param:{
                    name:'',
                    supId:'',
                    code:'',
                    icon:'',
                    type:'BUTTON',
                    url	:'',
                    seq	:'',
                    state:'1',
                    method:''
                },
                item:{},//节点信息
                error: '',
                dataList:{},
                isDisabled:true,
                methodArray:['GET'],
                doType:'', //请求类型
                supId:-999, //将当前id设置为父id
                addType:0, //添加父节点 和 子节点的判断 0 为父节点，1 为子节点
                message: '',
                title: '确认要删除此资源及其下级所有资源吗？'
            }
        },
        watch: {
            param: {
                handler: function () {
                    this.error = '';
                },
                deep: true
            },
            methodArray:function(){
                this.error = '';
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            init: function () {
                let _this = this;
                $.jstree.destroy ("#resTree");
                apiSystem.resList(this).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        this.dataList = body.data;
                        $("#resTree").jstree({
                            "core":{
                                "animation":0,
                                "themes":{
                                    theme:"classic",
                                    "dots":true,
                                    "icons":false
                                },
                                "check_callback":true,
                                'data':body.data
                            },
                            "types" : {
                                "default" : {
                                    "valid_children" : ["default","file"],
                                    "icon" : "icon-file-text",
                                },
                                "checkbox":{  // 去除checkbox插件的默认效果
                                    tie_selection : false,
                                    keep_selected_style : false,
                                    whole_node : false
                                },
                                "file" : {
                                    "icon" : "glyphicon glyphicon-file",
                                    "valid_children" : []
                                }
                            },
                            "plugins" : [
                                "wholerow"
                            ]
                        }).on("changed.jstree", function (e, data) {
                            $("#show-res").mLoading("show");
                            _this.isDisabled = true;
                            _this.supId = data.selected[0];
                            this.item = {};
                            apiSystem.getRowResItem(_this,data.selected[0]).then(function (response) {
                                $("#show-res").mLoading("hide");
                                let body = response.body;
                                if (body && body.code == 1 && body.data) {
                                    this.item = body.data;
                                    this.param['icon'] = '';
                                    for (let k in body.data) {
                                        this.param[k] = body.data[k];
                                        if(k == 'methods'){
                                            _this.methodArray = body.data[k];
                                            _this.param[k] = '';
                                        }
                                        if(k == 'state'){
                                            _this.param[k] = body.data[k].code;
                                        }
                                        if(k == 'type'){
                                            _this.param[k] = body.data[k].value;
                                        }
                                    }
                                    return;
                                }
                                if (body && body.code == 0) {
                                    apiSystem.tips(_this, {message: body.msg});
                                }
                            },function (response) {
                                console.log('error:', response);
                            });
                        });
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            active:function(dotype,type){
                if(typeof dotype == 'undefined' || dotype == '') return;
                if(dotype == 'add'){
                    for (let k in this.param) {
                        this.param[k] = '';
                    }
                    this.param['type']='BUTTON';
                    this.param['state']='1';
                }
                this.addType = type;
                this.isDisabled = false;
                this.doType = dotype;
            },
            save: function () {
                if (!this.param.name) {
                    this.error = '请输入名称！';
                    return;
                }
                if (!this.param.code) {
                    this.error = '请输入编码！';
                    return;
                }
                if (this.param.code.length>64) {
                    this.error = '别名字符长度不能超过64位！';
                    return;
                }
                if (!this.param.type) {
                    this.error = '请选择类型！';
                    return;
                }
                if (!this.param.url) {
                    this.error = '请输入属性！';
                    return;
                }
                if (!this.param.seq) {
                    this.error = '请输入排序！';
                    return;
                }
                if (!this.param.state) {
                    this.error = '请选择状态！';
                    return;
                }
                if (!this.methodArray) {
                    this.error = '请选择操作类型！';
                    return;
                }

                let doType = this.doType;
                if(doType == '') return;
                //请求类型
                let actionType = {
                    add:'resAdd',
                    put:'resPut'
                };
                if(this.addType == 1){
                    this.param['supId'] = this.supId;
                }
                this.param['method'] = this.methodArray.toString();
                $("body").mLoading("show");
                apiSystem[actionType[doType]](this, this.param).then(function (response) {
                    let body = response.body;
                    $("body").mLoading("hide");
                    apiSystem.tips(this, {message: body.msg});
                    if(this.addType == 1 || this.addType == 0){
                        this.init();
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            confirm: function () { //删除确认
                if(typeof this.item.name == 'undefined'){
                    apiSystem.tips(this, {message: '未选择！'});
                    return;
                }
                this.message = '资源名称：' + this.item.name;
                $('#myConfirm').modal();
            },
            deleteItem: function (id) {
                if (typeof this.item.id == 'undefined') return;
                $("body").mLoading("show");
                apiSystem.deleteRes(this, this.item.id).then(function (response) {
                    let body = response.body;
                    apiSystem.tips(this, {message: body.msg});
                    if (body && body.code == 1) {
                        this.init();
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            openIconList: function(){
                $('#myIconList').modal();
            },
            actIcon: function(icon){
                this.param.icon = icon;
            }
        }
    }
    //
</script>


