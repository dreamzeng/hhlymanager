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
                            <a href="javascript:;"  @click="back">活动管理</a>
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
                        <div class="panel-body" >
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="left">
                                <el-form-item label="播放地址(FLV)" prop="flvUrl">
                                    <el-input v-model="ruleForm.flvUrl"></el-input>
                                </el-form-item>
                                <el-form-item label="播放地址(HLS)" prop="hlsUrl">
                                    <el-input v-model="ruleForm.hlsUrl"></el-input>
                                </el-form-item>
                                <el-form-item label="推流地址" prop="pushUrl">
                                    <el-input v-model="ruleForm.pushUrl"></el-input>
                                </el-form-item>
                                <el-form-item label="播放地址(RTMP)" prop="rtmpUrl">
                                    <el-input v-model.number="ruleForm.rtmpUrl"></el-input>
                                </el-form-item>
                                <el-form-item label="过期时间" required>
                                    <el-col :span="5">
                                        <el-form-item prop="liveExpireTime">
                                            <el-date-picker type="datetime" placeholder="直播过期时间" v-model="ruleForm.liveExpireTime" @change="liveExpireTimeChang" style="width: 100%;"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
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
    </div>
    <!--main content end-->
</template>

<script>
    import apiLive from 'api/live';

    export default {
        name: 'liveActionEdit',
        data: function () {
            return {
                type: 1, // type 为1时为添加，为2时修改
                id: -9999,
                typeTitle: '新增活动',
                urlType:'1',
                liveId:'', //活动id
                liveTitle:'', //活动标题

                ruleForm:{
                    flvUrl:"",  /** 播放地址 (FLV) */
                    hlsUrl:"", /** 播放地址 (HLS) */
                    liveExpireTime:"", //过期时间
                    pushUrl:"", /** 推流地址 */
                    rtmpUrl:"" /** 播放地址 (RTMP) */
                },
                rules: {
                    flvUrl: [
                        { required: true, message: '请输入播放地址(FLV)', trigger: 'blur' }
                    ],
                    hlsUrl: [
                        { required: true, message: '请输入播放地址(HLS)', trigger: 'blur' }
                    ],
                    liveExpireTime:[
                        {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    pushUrl:[
                        { required: true, message: '请输入推流地址', trigger: 'blur' }
                    ],
                    rtmpUrl: [
                        { required: true, message: '请输入播放地址(RTMP) ', trigger: 'blur' }
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

                this.type = this.$route.params.type;

                this.liveTitle = this.liveTitle || this.$route.params.liveTitle;
                this.liveId = this.liveId || this.$route.params.liveId;

                console.log(this.$route.params);

                if (this.type == 2) {
                    this.typeTitle = '修改活动';
                    this.id = this.$route.params.id;
                    $("body").mLoading("show");
                    apiLive.getRowLiveItem(this, this.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            for (let k in body.data) {
                                if(k == 'state' || k == 'playState'){
                                    this.ruleForm[k] = body.data[k]+'';
                                }else{
                                    this.ruleForm[k] = body.data[k];
                                }
                            }
                            return;
                        }
                        if (body && body.code == 0) {
                            apiLive.tips(this, {message: body.msg});
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
            },
            starTimeChang:function (val) {
                this.ruleForm.beginTime = val;
            },
            endTimeChang: function(val) {
                this.ruleForm.endTime = val;
            },
            liveExpireTimeChang: function(val) {
                this.ruleForm.liveExpireTime = val;
            },
            submitForm:function(formName) {
                let commitType = 'liveActionAdd';
                if (this.type == 2) {
                    commitType = 'livePut';
                }
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        $("body").mLoading("show");
                        apiLive[commitType](_this,_this.liveId, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            apiLive.tips(_this, {message: body.msg});
                            if (body && body.code == 1) {
                                _this.$router.go(-1);
                                return;
                            }
                        }, function (response) {
                            console.log('error:', response);
                        });
                    }
                    return false;
                });
            },
            back:function(){
                this.$router.push({name:'live_action_list',params:{id:this.liveId,title:this.liveTitle}});
            }
        }
    }
    //
</script>
