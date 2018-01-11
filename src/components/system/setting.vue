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
                            <a href="javascript:;"  @click="back">业务管理</a>
                        </li>
                        <li>修改个人信息</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">修改个人信息</div>
                                <div class="col-md-4 col-md-offset-4" style="text-align: right">
                                    <el-button type="info" @click="dialogPas=true">修改密码</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body" >
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="right">
                                <el-form-item label="用户名" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式" prop="phone">
                                    <el-input v-model="ruleForm.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱" prop="email">
                                    <el-input v-model="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="info" @click="submitForm('ruleForm')">提交</el-button>
                                    <el-button @click="back">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="修改密码" v-model="dialogPas" size="tiny" >
            <el-form ref="passwordForm" :model="passwordForm" :rules="pwdRules" label-width="120px" onsubmit="return false">
                <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model="passwordForm.oldPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="passwordForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="passwordForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPas = false">取 消</el-button>
                <el-button  type="primary" @click="updatePassWord('passwordForm')" :loading="pasLoading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    <!--main content end-->
</template>

<script>
    import apiSetting from 'api/setting';
    import md5 from 'js-md5';

    export default {
        name: 'goodsEdit',
        data: function () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.passwordForm.checkPass !== '') {
                        this.$refs.passwordForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let _this = this;
            let user = this.$store.getters.getuser;
            let loginName = user.username;
            var validateOld = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    apiSetting.checkPassWord(_this,{
                        loginName:loginName,
                        password:md5(_this.passwordForm.oldPass)
                    }).then(function(response){
                        let body = response.body;
                        if (body && body.code == 0) {
                            callback(new Error(body.msg));
                            return;
                        }
                        callback();
                    });
                }
            };
            return {
                ruleForm:{
                    id:'',
                    name:'', //用户名
                    phone:'',//联系方式
                    email:'' //电子邮箱
                },
                rules: {
                    name:[{required: true, message: '请输入用户名', trigger: 'blur' }],
                    phone:[{required: true, message: '请输入联系方式', trigger: 'blur' }],
                    email:[{required: true, message: '请输入电子邮箱', trigger: 'blur' }]
                },
                dataList:{},
                dialogPas:false,
                pasLoading:false,
                passwordForm:{
                    id:'',
                    password:'',
                    checkPass:'',
                    oldPass:''
                },
                pwdRules:{
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    oldPass:[
                        { validator: validateOld,  trigger: 'blur' }
                    ]
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
                let user = this.$store.getters.getuser;
                this.passwordForm.id = user.userId;
                apiSetting.userList(this,user.userId).then(function(response){
                    let body = response.body;
                    if (body && body.code == 1) {
                        let {email,phone,userName} = body.data;
                        this.ruleForm = {
                            name:userName,
                            phone:phone,
                            email:email,
                            id:user.userId
                        };
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
            },
            submitForm:function(formName) {
                let _this = this;
                let param = {};
                for (let k in this.ruleForm) {
                    if(this.ruleForm[k]){
                        param[k] = this.ruleForm[k];
                    }
                }
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        $("body").mLoading("show");
                        apiSetting['updateInfo'](_this, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            this.$message(body.msg);
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            updatePassWord:function(formName){
                let {oldPass,password} = this.passwordForm;
                let user = this.$store.getters.getuser;
                let loginName = user.username;
                let param = {
                    loginName:loginName,
                    oldPassword:md5(oldPass),
                    newPassword:md5(password)
                };
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        _this.pasLoading = true;
                        apiSetting['updatePassWord'](_this,param).then(function (response) {
                            let body = response.body;
                            this.$message(body.msg);
                            this.pasLoading = false;
                            this.dialogPas=false;
                            this.passwordForm = {
                                id:'',
                                password:'',
                                checkPass:'',
                                oldPass:''
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
