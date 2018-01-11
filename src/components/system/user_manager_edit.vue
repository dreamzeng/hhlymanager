<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li>
                            <router-link :to="{name: 'index'}"><i class="icon-home"></i>Home</router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'user_manager_list'}">用户管理</router-link>
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
                                    <label class="col-lg-2 control-label">登录名<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" :disabled="type == 2" required placeholder="请输入登录名" v-model="param.loginName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">用户名<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" required placeholder="请输入用户名" v-model="param.userName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">电子邮件<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" required placeholder="电子邮件地址" v-model="param.email">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">联系方式<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" required placeholder="联系方式" v-model="param.phone">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">密码<span class="required">*</span></label>

                                    <div class="col-lg-10">
                                        <input type="password" class="form-control" required placeholder="密码" v-model="param.plainPassword">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">状态</label>

                                    <div class="col-lg-10">
                                        <select class="form-control" v-model="param.state">
                                            <option value="1">开启</option>
                                            <option value="0">锁定</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" id="roleList">
                                    <label class="col-lg-2 control-label">角色</label>

                                    <div class="col-lg-10">
                                        <label class="checkbox-inline" v-for="item in roleList">
                                            <input type="checkbox" :value="item.id" v-model="roleIds">{{item.name}}
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group has-error">
                                    <label class="col-lg-2 control-label"></label>
                                    <label class="control-label col-lg-10" v-show="error!=''">{{error}}</label>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-offset-2 col-lg-10">
                                        <button type="submit" class="btn btn-info">保存</button>
                                        <router-link class="btn btn-default" :to="{name: 'user_manager_list'}">取消</router-link>
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
    import apiSystem from 'api/system';
    export default {
        name: 'userManagerAdd',
        data: function () {
            return {
                roleList: [],
                roleIds: [],
                error: '',
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '新建参数',
                param: {
                    loginName: '',
                    userName: '',
                    email: '',
                    phone: '',
                    plainPassword: '',
                    state: '1'
                }
            }
        },
        computed: {
            loginName: function () {
                return this.param.loginName;
            }
        },
        watch: {
            loginName: function (nv, ov) {
                if (this.type == 1) {
                    apiSystem.userManagerIsexist(this, {'loginName': nv}).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 0) {
                            this.error = '用户已存在！';
                        } else {
                            this.error = '';
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
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
                this.type = this.$route.params.type;
                if (this.type == 2) {
                    this.typeTitle = '修改参数';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiSystem.getUserManagerItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for (let k in body.data) {
                                if (k == 'state') {
                                    this.param[k] = body.data[k]['code'];
                                } else if (k == 'roles') {
                                    for (let i = 0, l = body.data[k].length; i < l; i++) {
                                        this.roleIds.push(body.data[k][i]['id']);
                                    }
                                } else {
                                    this.param[k] = body.data[k];
                                }
                            }
                            return;
                        }
                        if (body && body.code == 0) {
                            apiSystem.tips(this, {message: '操作失败！'});
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
                $('#roleList').mLoading("show");
                apiSystem.roleList(this).then(function (response) {
                    $('#roleList').mLoading("hide");
                    let body = response.body;
                    if (body && body.code == 1) {
                        this.roleList = body.data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            save: function () {
                if (!this.param.loginName) {
                    this.error = '请输入登录名！';
                    return;
                }
                if (!this.param.userName) {
                    this.error = '请输入用户名！';
                    return;
                }
                if (!this.param.email) {
                    this.error = '请输入电子邮件！';
                    return;
                }
                if (!this.param.phone) {
                    this.error = '请输入联系方式！';
                    return;
                }
                if (!this.param.plainPassword) {
                    this.error = '请输入密码！';
                    return;
                }
                let commitType = 'userManagerAdd';
                if (this.type == 2) {
                    commitType = 'userManagerPut';
                }
                this.param['roleIds'] = this.roleIds.join(",");
                $("body").mLoading("show");
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

