<template>
    <!--main content start-->
    <div id="main-content">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-12">
                    <!--breadcrumbs start -->
                    <ul class="breadcrumb">
                        <li><router-link :to="{name: 'index'}"><i class="icon-home"></i> Home</router-link></li>
                        <li>用户端内容管理</li>
                        <li>增编案例</li>
                    </ul>
                    <!--breadcrumbs end -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-heading">增编案例</div>
                        <div class="panel-body">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" label-position="right">
                                <el-form-item label="案情描述：" prop="title">
                                    <el-input type="textarea" v-model="ruleForm.title" :rows="8"></el-input>
                                </el-form-item>

                                <el-form-item label="是否发布：">
                                    <el-radio-group v-model="ruleForm.publishState">
                                      <el-radio :label="0">否</el-radio>
                                      <el-radio :label="1">是</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="分类：" prop="categoryUuid">
                                    <el-select v-model="ruleForm.categoryUuid" placeholder="请选择">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.id"
                                          :label="item.name"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                </el-form-item>
                                <el-form-item label="服务配置：" prop="serviceUuid" required>
                                    <el-input v-model="ruleForm.serviceUuid" style="width:200px" placeholder="请输入正确的服务ID（纯数字）"></el-input>
                                </el-form-item>

                                <el-form-item label="答案：">
                                    <div class="tabBtn">
                                        <!-- legalAnalysis -->
                                        <button type="button" class="btn" :class="{active2:btnActive=='legalAnalysis'}" @click="changeAct('legalAnalysis')">法律分析</button>
                                        <!-- actionProposal -->
                                        <button type="button" class="btn" :class="{active2:btnActive=='actionProposal'}" @click="changeAct('actionProposal')">行动建议</button>
                                        <!-- relevantLaws -->
                                        <button type="button" class="btn" :class="{active2:btnActive=='relevantLaws'}" @click="changeAct('relevantLaws')">相关法律</button>
                                    </div>
                                    <div>
                                        <webEditor editorId="serInfoEditor" ref="serInfoEditor"></webEditor>
                                    </div>
                                </el-form-item>
                                <el-form-item label="初始阅读数：" prop="initReadNum">
                                    <el-input v-model="ruleForm.initReadNum" style="width:380px"></el-input>
                                </el-form-item>
                                <el-form-item label="法律条文主标题：" prop="lawTitle">
                                    <el-input v-model="ruleForm.lawTitle" style="width:380px" placeholder="主标题"></el-input><br/>
                                </el-form-item>
                                <el-form-item label="法律条文副标题：" prop="lawSubtitle">
                                    <el-input v-model="ruleForm.lawSubtitle" style="width:380px" placeholder="副标题"></el-input>
                                </el-form-item>
                                <el-form-item label="真实案例主标题：" prop="caseTitle">
                                    <el-input v-model="ruleForm.caseTitle" style="width:380px" placeholder="主标题"></el-input><br/>
                                </el-form-item>
                                <el-form-item label="真实案例副标题：" prop="caseSubtitle">
                                    <el-input v-model="ruleForm.caseSubtitle" style="width:380px" placeholder="副标题"></el-input>
                                </el-form-item>

                                <h5 style="margin-left:110px;">案例基本信息（非必填）</h5>
                                <el-form-item label="案由：">
                                    <el-input v-model="ruleForm.basicinfo.cause " style="width:380px"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="审判时间：">
                                    <el-input v-model="ruleForm.basicinfo.judgeTime" style="width:380px"></el-input>
                                </el-form-item> -->
                                <el-form-item label="审判时间：">
                                    <!-- <el-input v-model="ruleForm.basicinfo.judgeTime" style="width:380px"></el-input> -->
                                    <el-date-picker
                                          v-model="time"
                                          type="date"
                                          @change="getTime"
                                          placeholder="选择日期">
                                        </el-date-picker>
                                </el-form-item>
                                <el-form-item label="案号：">
                                    <el-input v-model="ruleForm.basicinfo.causeNo" style="width:380px"></el-input>
                                </el-form-item>
                                <el-form-item label="审理程序：">
                                    <el-input v-model="ruleForm.basicinfo.proceeding" style="width:380px"></el-input>
                                </el-form-item>
                                <el-form-item label="审理法院：">
                                    <el-input v-model="ruleForm.basicinfo.trialCourt" style="width:380px"></el-input>
                                </el-form-item>
                                <el-form-item label="案例来源：">
                                    <el-input v-model="ruleForm.basicinfo.caseSource" style="width:380px"></el-input>
                                </el-form-item>
                                <el-form-item label="案例要旨：">
                                    <el-input :rows="5" size="medium" type="textarea" v-model="ruleForm.basicinfo.caseGist" style="width:50%" placeholder="副标题"></el-input>
                                </el-form-item>
                                <el-form-item label="案情简述：">
                                    <el-input :rows="5" size="medium" type="textarea" v-model="ruleForm.basicinfo.caseBrief" style="width:50%" placeholder="副标题"></el-input>
                                </el-form-item>
                                <el-form-item label="裁判结果：">
                                    <el-input :rows="5" size="medium" type="textarea" v-model="ruleForm.basicinfo.judgment" style="width:50%" placeholder="副标题"></el-input>
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
<style scoped>
.panel-heading {padding:8px 0 0;height:46px;clear:both;}
.panel-heading .tab{display:inline-block;width:100px;border:1px solid #dedede;background:#fff;line-height:36px;text-align:center;border-radius: 10px 10px 0 0;float:left;margin-left:-1px;cursor:pointer;}
.panel-heading>.active{border-bottom:none;line-height:37px;font-weight:bolder;}
.tabBtn{margin-bottom:5px;}
.tabBtn .active2{background:#20A0FF;color:#fff;}
.wrap{margin-top:20px;border-top:1px solid #dedede;padding-top:15px;margin-left:80px;margin-right:80px;}
</style>

<script>
    import apiOperaCon from 'api/userPlatform';
    import webEditor from 'components/common/webEditor';
    import VueCoreImageUpload from 'components/common/vue.core.file.upload';

    export default {
        components:{webEditor,VueCoreImageUpload},
        name: 'goodsEdit',
        data: function () {
            //阅读数量
            var checkMoney2 = (rule, value, callback) => {
              if (!value) {
                return callback();
              }
              setTimeout(() => {
                var reg=/^\d+$/;
                if (!reg.test(value))
                {
                  callback(new Error('请输入正整数'));
                }
                else callback();
              }, 1000);
            };
            var checkMoney = (rule, value, callback) => {
              if (!value) {
                return callback("服务ID不能为空");
              }
              setTimeout(() => {
                var reg=/^\d+$/;
                if (!reg.test(value))
                {
                  callback(new Error('请输入正整数'));
                }
                else callback();
              }, 1000);
            };
            return {

                btnActive:'legalAnalysis',
                time:'',
                // oldTemp:'legalAnalysis',
                options:[
                    {
                        // id:"1",
                        // name:"合同定制"
                    }
                ],
                commitType:'newCase',
                serInfoEditor:'',
                ruleForm:{
                    basicinfo:{
                        id:"",
                        uuid:"",
                        analysisUuid:"",
                        cause:"",
                        judgeTime:"",
                        causeNo:"",
                        proceeding:"",
                        trialCourt:"",
                        caseSource:"",
                        caseGist:"",
                        caseBrief:"",
                        judgment:"",
                    },
                    id:"",
                    uuid:"",
                    title:"",
                    publishState:1,
                    categoryUuid:'',
                    legalAnalysis:"",
                    actionProposal:"",
                    relevantLaws:"",
                    initReadNum:"",
                    lawTitle:"",
                    lawSubtitle:"",
                    caseSubtitle:"",
                    basicInfoUuid:"",
                    serviceUuid:"",

                },
                rules: {
                    title:[{required: true, message: '请输入文章名称', trigger: 'blur' },{ min: 1, max: 5000, message: '长度在 1 到 5000 个字符', trigger: 'blur' }],
                    lawTitle:[{required: true, message: '请输入主标题', trigger: 'blur' },{ min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }],
                    caseTitle:[{required: true, message: '请输入主标题', trigger: 'blur' },{ min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }],
                    lawSubtitle:[{required: true, message: '请输入副标题', trigger: 'blur' },{ min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }],
                    caseSubtitle:[{required: true, message: '请输入副标题', trigger: 'blur' },{ min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }],
                    categoryUuid:[{required: true, message: '请选择文章分类', trigger: 'blur',type:"number"}],
                    initReadNum:[{ validator: checkMoney2, trigger: 'blur' }],
                    serviceUuid:[{ validator: checkMoney, trigger: 'blur',}],
                    // serviceUuid:[{ validator: checkMoney, trigger: 'blur' ,required:true,message: '服务ID不能为空',}],
                }
            }
        },
        watch:{
            btnActive:function(newValue,oldValue){
                this.ruleForm[oldValue]=this.$refs['serInfoEditor'].getContent();
                this.$refs['serInfoEditor'].setContent(this.ruleForm[newValue]);
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            });
        },
        methods: {
            getTime(val){
                this.ruleForm.basicinfo.judgeTime=val;
            },
            changeAct(value){
                this.btnActive=value;
            },

            init: function () {

                // 基础信息-选择分类下拉框
                apiOperaCon.caseOptions(this).then(function (response) {
                    let body = response.body;
                    if (body&&body.data && body.code == 1) {
                        this.options=body.data;
                        return;
                    }
                }, function (response) {
                    console.log('error:', response);
                });
                if (this.$route.params.id!=-1) {
                    apiOperaCon.pullCase(this, this.$route.params.id).then(function (response) {
                        let body = response.body;
                        if (body && body.code == 1 && body.data) {
                            this.ruleForm = body.data;
                            this.ruleForm.categoryUuid = this.ruleForm.categoryUuid-0;
                            this.$refs['serInfoEditor'].setContent(this.ruleForm.legalAnalysis);
                            if(!body.data.basicinfo) this.ruleForm.basicinfo="";
                            // console.log("this.ruleForm");
                            // console.log(this.ruleForm);
                            return;
                        }
                        if (body && body.code == 0) {
                            this.$message.error({message: body.msg});
                        }
                    }, function (response) {
                        console.log('error:', response);
                    });
                }
            },
            // 表单提交
            submitForm:function(formName) {

                // 防止没有切换选项卡就点击提交按钮
                this.ruleForm[this.btnActive]=this.$refs['serInfoEditor'].getContent();
                if(this.ruleForm.legalAnalysis == '<p><br></p>') this.ruleForm.legalAnalysis = '';
                if(this.ruleForm.actionProposal == '<p><br></p>') this.ruleForm.actionProposal = '';
                if(this.ruleForm.relevantLaws == '<p><br></p>') this.ruleForm.relevantLaws = '';

                //判断是新增还是编辑，使用不同的提交接口函数
                if (this.$route.params.id != -1) {
                    this.commitType = 'editSaveCase';
                }

                if(this.ruleForm.legalAnalysis=="")
                {
                    this.$message.error("法律分析不能为空");
                    return;
                }
                if(this.ruleForm.actionProposal=="")
                {
                    this.$message.error("行动建议不能为空");
                    return;
                }
                if(this.ruleForm.relevantLaws=="")
                {
                    this.$message.error("相关法律不能为空");
                    return;
                }
                let _this = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        $("body").mLoading("show");
                        apiOperaCon[_this.commitType](_this, _this.ruleForm).then(function (response) {
                            let body = response.body;
                            this.$message(body.msg);
                            if (body && body.code == 1) {
                                this.$router.go(-1);
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
                this.$router.go(-1);
            },
        }
    }
    //
</script>
