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
                        <li>
                            <router-link :to="{name: 'role_list'}">角色管理</router-link>
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
                                    <label class="col-lg-2 control-label">名称<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" required placeholder="请输入名称" v-model.trim="param.name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">编码<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" required placeholder="请输入编码" v-model.trim="param.code">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">状态</label>

                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">启用</option>
                                            <option value="2">禁用</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">描述</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入描述" v-model.trim="param.description">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">权限</label>
                                    <div class="col-lg-10">
                                        <div id="resourceTree" style="height: 400px;overflow: auto;border: 1px solid #e2e2e4;"></div>
                                    </div>
                                </div>
                                <div class="form-group has-error">
                                    <label class="col-lg-2 control-label"></label>
                                    <label class="control-label col-lg-10" v-show="error!=''">{{error}}</label>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-offset-2 col-lg-10">
                                        <button type="submit" class="btn btn-info">提交</button>
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
        name: 'roleEdit',
        data: function () {
            return {
                dataList: [],
                param: {
                    name: '',
                    code: '',
                    description: '',
                    sysResourceIds:''
                },
                error: '',
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '添加角色'
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
                    this.typeTitle = '修改角色';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiSystem.getRoleItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for(let k in this.param){
                                this.param[k] = body.data.role[k];
                            }
                            this.param['id'] = body.data.role['id'];
                            let tree=$("#resourceTree").jstree({
                                "checkbox":{"keep_selected_style":false},
                                "core":{
                                    "multiple":true,
                                    "animation":0,
                                    "themes":{
                                        theme:"classic",
                                        "dots":true,
                                        "icons":true
                                    },
                                    "check_callback":true,
                                    'data':body.data.roleCurrentExistResource
                                },
                                "plugins":["wholerow","checkbox"]
                            });
                            return;
                        }
                        if (body && body.code == 0) {
                            apiSystem.tips(this, {message: '操作失败！'});
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }else{
                    $("body").mLoading("show");
                    apiSystem.resList(this).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            let tree=$("#resourceTree").jstree({
                                "checkbox":{"keep_selected_style":false},
                                "core":{
                                    "multiple":true,
                                    "animation":0,
                                    "themes":{
                                        theme:"classic",
                                        "dots":true,
                                        "icons":false
                                    },
                                    "check_callback":true,
                                    'data':body.data
                                },
                                "plugins":["wholerow","checkbox"]
                            });
                            return;
                        }
                        apiSystem.tips(this, {message: body.msg});
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
                if (!this.param.code) {
                    this.error = '请输入编码！';
                    return;
                }
                let array=$.jstree.reference('#resourceTree').get_selected(true);
                let ar=[];
                if(array){
                    for(let i=0; i<array.length; i++){
                        let a=array[i];
                        ar.push(a.id);
                        let parents = a.parents;
                        if(parents){
                            for(let j=0;j<parents.length;j++){
                                let b = parents[j];
                                if(b!="#"){
                                    ar.push(b);
                                }
                            }
                        }else{
                            if(a.parent!="#"){
                                ar.push(a.parent);
                            }
                        }
                    }
                }
                this.param.sysResourceIds = ar.join(",");

                $("body").mLoading("show");
                let commitType = 'roleAdd';
                if (this.type == 2) {
                    commitType = 'rolePut';
                }
                console.log(this.param);
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
            }
        }
    }
    //
</script>

