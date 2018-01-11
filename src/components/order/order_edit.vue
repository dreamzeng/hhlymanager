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
                            <a href="javascript:;"  @click="back">订单列表</a>
                        </li>
                        <li>订单详情</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">订单详情</div>
                        <div class="panel-body" style="position: relative;" id="list-content" v-if="showInfo">

                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="right">
                                <h3>基本信息</h3>
                                <div class="xf-space">
                                    <el-form-item>
                                        <el-row>
                                            <el-col :span="8"><div class="grid-content bg-purple">订单ID：{{dataList.id}}</div></el-col>
                                            <el-col :span="8"><div class="grid-content bg-purple-light">订单号：{{dataList.orderNo}}</div></el-col>
                                            <el-col :span="8"><div class="grid-content bg-purple">支付方式：{{dataList.payType1 && dataList.payType1.value}}</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8"><div class="grid-content bg-purple">订单状态：{{dataList.orderState && dataList.orderState.value}}</div></el-col>
                                            <el-col :span="8"><div class="grid-content bg-purple-light">下单时间：{{dataList.createTime}}</div></el-col>
                                            <el-col :span="8"><div class="grid-content bg-purple">支付时间：{{dataList.payTime || 'N'}}</div></el-col>
                                        </el-row>
                                    </el-form-item>
                                </div>
                                <h3>用户信息</h3>
                                <div class="xf-space">
                                    <div class="xf-edit" v-if="isShowEdit">
                                        <el-button type="primary" icon="edit" v-if="!modifyStart" @click="isModify(1)">编辑</el-button>
                                    </div>
                                    <el-form-item v-if="!modifyStart">
                                        <el-row>
                                            <el-col :span="12"><div class="grid-content bg-purple" style="font-weight: bold">用户信息</div></el-col>
                                            <el-col :span="12"><div class="grid-content bg-purple-light" style="font-weight: bold">律师信息</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12"><div class="grid-content bg-purple">用户昵称：{{dataList.userName}}</div></el-col>
                                            <el-col :span="12"><div class="grid-content bg-purple-light">律师名字：{{dataList.lawyerName}}</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12"><div class="grid-content bg-purple">联系方式：{{dataList.userPhone}}</div></el-col>
                                            <el-col :span="12"><div class="grid-content bg-purple-light">联系方式：{{dataList.lawyerPhone}}</div></el-col>
                                        </el-row>
                                    </el-form-item>
                                    <!-- edit s -->
                                    <el-form-item v-if="modifyStart">
                                        <el-row>
                                            <el-col :span="12"><div class="grid-content bg-purple" style="font-weight: bold">用户信息</div></el-col>
                                            <el-col :span="12"><div class="grid-content bg-purple-light" style="font-weight: bold">律师信息</div></el-col>
                                        </el-row>
                                        <el-col :span="12">
                                            <el-row>
                                                <el-col :span="4">用户昵称：</el-col>
                                                <el-col :span="12">
                                                    <el-form-item prop="userName">
                                                        <el-input placeholder="100" v-model="ruleForm.userName"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-row>
                                                <el-col :span="4">律师名字：</el-col>
                                                <el-col :span="12">
                                                    <el-form-item prop="lawyerName">
                                                    <el-input placeholder="100" v-model="ruleForm.lawyerName"></el-input></el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item v-if="modifyStart">
                                        <el-row>
                                            <el-col :span="12">
                                                <el-row>
                                                    <el-col :span="4">联系方式：</el-col>
                                                    <el-col :span="12">
                                                        <el-form-item prop="userPhone">
                                                            <el-input placeholder="100" v-model="ruleForm.userPhone"></el-input>
                                                            </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-row>
                                                    <el-col :span="4">联系方式：</el-col>
                                                    <el-col :span="12">
                                                        <el-form-item prop="lawyerPhone">
                                                        <el-input placeholder="100" v-model="ruleForm.lawyerPhone"></el-input>
                                                            </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <!-- edit e -->
                                </div>
                                <h3 v-if="isShowEdit">业务信息</h3>
                                <div class="xf-space" v-if="isShowEdit">
                                    <el-form-item>
                                        <el-row>
                                            <el-col :span="24"><div class="grid-content bg-purple">业务名称：{{dataList.goodsName}}</div></el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="24"><div class="grid-content bg-purple">价格：{{dataList.priceConfirm && (dataList.priceConfirm+'' == '0' ? dataList.priceStart : dataList.priceStart + '~' +dataList.priceEnd || '') || ''}}</div></el-col>
                                        </el-row>
                                        <el-row v-if="!modifyStart || !isModifyPrice">
                                            <el-col :span="6">订单价格：{{otherPrice}}/ {{dataList.unit || '项' }}</el-col>
                                            <el-col :span="14">
                                                <el-form-item>
                                                    <el-button type="success" icon="check" v-if="modifyStart" @click="submitForm('ruleForm')">保存</el-button>
                                                    <el-button type="warning" icon="close" v-if="modifyStart" @click="isModify(-1)">取消</el-button>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item v-if="modifyStart && isModifyPrice">
                                        <el-row>
                                            <el-col :span="2">订单价格：</el-col>
                                            <el-col :span="6"><el-form-item prop="amount">
                                                <el-input placeholder="100" v-model="ruleForm.amount"></el-input></el-form-item>
                                            </el-col>
                                            <el-col :span="2"> / {{dataList.unit || '项' }}</el-col>
                                            <el-col :span="14">
                                                <el-form-item>
                                                    <el-button type="success" icon="check" v-if="modifyStart" @click="submitForm('ruleForm')">保存</el-button>
                                                    <el-button type="warning" icon="close" v-if="modifyStart" @click="isModify(-1)">取消</el-button>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                </div>
                            </el-form>
                            <el-form label-width="160px" label-position="right">
                                <h3 v-if="dataList.memberFiles && isShowEdit ">用户上传的资料</h3>
                                <div class="xf-space" v-if="dataList.memberFiles && isShowEdit">
                                    <el-form-item>
                                        <div class="xf-user-image" v-for="item in dataList.memberFiles" @click="showImgBig(item)">
                                            <img :src="item.url" :alt="item.name" :title="item.name">
                                        </div>
                                    </el-form-item>
                                </div>
                                <h3 v-if="dataList.lawyerFiles && isShowEdit">律师上传的资料</h3>
                                <div class="xf-space" v-if="dataList.lawyerFiles && isShowEdit">
                                    <el-form-item>
                                        <div class="xf-user-image" v-for="item in dataList.lawyerFiles" @click="showImgBig(item)">
                                            <img :src="item.url" :alt="item.name" :title="item.name">
                                        </div>
                                    </el-form-item>
                                </div>
                                <el-form-item>
                                    <el-button type="info" @click="confirm" v-if="isShowEdit && isSubmit">提交</el-button>
                                    <el-button @click="back">返回</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="imgBig" :alt="imgName" :title="imgName">
            </el-dialog>
        </div>
    </div>
    <!--main content end-->
</template>
<style scoped>
    .xf-edit{
        position: absolute;right: 20px;top: -31px;z-index: 10;
    }
    .xf-space{
        position: relative; border-bottom: 1px solid #ccc;margin-bottom: 12px;padding: 12px 0;
    }
    .xf-user-image{
        float: left;width: 100px;height: 100px; border: 1px solid #ccc;margin: 5px;cursor: pointer
    }
    .xf-user-image img{
        width: 100%;
        height: 100%;
    }
</style>
<script>
    import apiOrder from 'api/order';

    export default {
        name: 'orderEdit',
        data: function () {
            return {
                id: -9999,
                dataList:{},
                ruleForm:{
                    orderNo:'', //订单号
                    amount:'', //订单价格
                    lawyerName:'', //律师名称
                    lawyerPhone:'', //律师手机号
                    userName:'', //用户名称
                    userPhone:'' //用户手机号
                },
                orderNo:false,
                showInfo:true,
                dialogVisible:false,
                otherPrice:'',
                isModifyPrice:false,
                modifyStart:false,
                isShowEdit:false,
                isSubmit:false,
                imgBig:'http://e.hiphotos.baidu.com/baike/w%3D268%3Bg%3D0/sign=ac992901d72a283443a6310d638eaed7/50da81cb39dbb6fd9ea6dc3a0a24ab18972b3728.jpg',
                imgName:'fasd',
                rules: {
                    amount:[
                        {required: true, message: '请输入价格', trigger: 'blur'}
                    ],
                    lawyerName:[
                        {required: true, message: '请输入律师名称', trigger: 'blur'}
                    ],
                    lawyerPhone:[
                        {required: true, message: '请输入律师手机号', trigger: 'blur'}
                    ],
                    userName:[
                        {required: true, message: '请输入用户名称', trigger: 'blur'}
                    ],
                    userPhone:[
                        {required: true, message: '请输入用户手机号', trigger: 'blur'}
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
                this.orderNo = this.orderNo || this.$route.params.orderNo;
                this.ruleForm.orderNo = this.orderNo;
                $('#list-content').mLoading("show");
                apiOrder.orderDetail(this, {
                    'orderNo':this.orderNo
                }).then(function (response) {
                    let body = response.body;
                    if (body && body.code == 1) {
                        let data = body.data;
                        this.dataList = data;

                        if(data.orderState && data.orderState.code == '9'){
                            this.isModifyPrice = true;
                        }
                        if(data.orderState && data.orderState.code == '10'){
                           this.isModifyPrice = true;
                        }
                        if(data.orderState && data.orderState.code == '11'){
                            this.isSubmit = true
                        }
                        if(typeof data.amount == 'undefined' ||  data.amount == '0.00'){
                           if(data.priceConfirm && data.priceConfirm == '0'){
                               this.otherPrice = data.priceStart;

                           }
                           else if(data.priceConfirm && data.priceConfirm == '1'){
                               this.otherPrice = data.priceStart + '~' + data.priceEnd;

                           }
                        }else{
                           this.otherPrice = data.amount;
                        }
                        if(data.type && data.type.code == '9'){
                            this.isShowEdit = true;
                        }

                       this.ruleForm = {
                           orderNo:this.orderNo, //订单号
                           amount:this.otherPrice, //订单价格
                           lawyerName:data.lawyerName, //律师名称
                           lawyerPhone:data.lawyerPhone, //律师手机号
                           userName:data.userName, //用户名称
                           userPhone:data.userPhone //用户手机号
                       };
                        return;
                    }
                    this.showInfo = false;
                    this.$message({
                        message: body.msg,
                        type: 'warning'
                    });
                }, function (response) {
                    console.log('error:', response);
                });
            },
            confirm:function() {
                let _this = this;
                this.$confirm('是否确认订单交易成功?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $("body").mLoading("show");
                    apiOrder['orderConfirm'](_this,{'orderNo':_this.orderNo}).then(function (response) {
                        let body = response.body;
                        _this.$message(body.msg);
                        if (body && body.code == 1) {
                            this.$router.go(-1);
                            return;
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '确认已取消'
                    });
                });
            },
            isModify:function(type){
                type == '1' ? this.modifyStart = true : this.modifyStart = false;
            },
            submitForm:function(formName) {
                let _this = this;
                let _ruleForm = Object.assign({}, _this.ruleForm);
                let am = _ruleForm['amount'];
                if(isNaN(am) || am*10 <= 0){
                    this.$message({
                        type: 'error',
                        message: '错误的价格类型'
                    });
                    return;
                }
                if(!_this.isModifyPrice){
                    _ruleForm.amount && delete  _ruleForm.amount;
                }
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        $("body").mLoading("show");
                        apiOrder['orderPut'](_this, _ruleForm).then(function (response) {
                            let body = response.body;
                            _this.$message(body.msg);
                            if (body && body.code == 1) {
                                _this.init();
                                _this.modifyStart = false;
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            showImgBig:function(item){
                this.imgBig = item.url;
                this.imgName = item.name;
                this.dialogVisible = true;
            },
            back:function(){
                this.$router.go(-1);
            }
        }
    }
    //
</script>
